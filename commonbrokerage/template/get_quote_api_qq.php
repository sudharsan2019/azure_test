
<?php

error_reporting(0);
ini_set('display_errors', 1);
include('../config.php');


$key = $_REQUEST['app_key'];
$quote_id = $_REQUEST['quote_id'];
$method = $_REQUEST['method'];

//Insured Name, Address 
$insured_object = $_REQUEST['insured_object'];

//Producer Object
$producer_object = $_REQUEST['producer_object'];

//Insured location - multiple location
$business_location = $_REQUEST['business_location'];

$trans_id = '';

$effective_datee = $_REQUEST['effective_date'];
$effective_date = str_replace('-', '/', $effective_datee);

$effective_term = $_REQUEST['effective_term'];
$expiry_date = date('m/d/Y', strtotime($effective_date.'+1 years')); 
$GLOBALS['limits'] = $limits = $_REQUEST['limits']; 
$GLOBALS['deductible'] = $deductible = $_REQUEST['deductible'];
$GLOBALS['res'] = [];


if($deductible== null)
{
$GLOBALS['deductible'] =$deductible= 0;
}


$action = 'CreateQuote';

if($trans_id!= null)
{
$action ='RedoQuote';
}


$transaction_var= start_transaction($method,$trans_id,$action);
  

if($method == 'businessnlocation' || $method  == 'quick_quote')
{  
$transaction_var= start_transaction($method,$trans_id,$action);

update_policy($transaction_var,$effective_date,$expiry_date);
add_producer_object($transaction_var,$producer_object); 
add_insured_object($insured_object,$transaction_var);
add_business_location($business_location,$transaction_var);
}



if($method=='basic_quote_info')
{
//Effective date and insurance term is posted in update_policy
update_policy($transaction_var,$effective_date,$expiry_date);
add_producer_object($transaction_var,$producer_object); 
add_insured_object($insured_object,$transaction_var); 
print_r(json_encode($transaction_var));

}


if($method == 'insured_objects')
{
add_insured_object($insured_object,$transaction_var);   
}

if($method=='calculate')
{
premops_prodcops($transaction_var);  
}



function start_transaction($method,$trans_id,$action)
{

$start_counter = 1;
start_transaction:

  
//A.Start Transaction
$postfields = '';
$header=array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
   
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/startNewTransaction?transactionName=$action&productCode=GL&entityType=QUOTE&transactionID=$trans_id&logLevel=&sendHiddenAttributes=Y",$method ="GET",$header,$postfields);



$clientid= $response->clientID;
$transactionid = $response->transactionID;
$sendHiddenAttributes = $response->sendHiddenAttributes;
$policyid = $response->objectFieldValuesList[0]->GID;

	if($clientid==null && $start_counter <= 3)
    {
    $start_counter++;    
    sleep(2);
    goto start_transaction;
    }
    if($clientid == null)
    {
    print_r(json_encode(['clientID'=>'error']));
    exit;
    }

 $res = ['clientid'=>$clientid,'transactionid'=>$transactionid,'sendHiddenAttributes'=>$sendHiddenAttributes,'policyid'=>$policyid];
 return $res;
}

function add_insured_object($insured_object,$transaction_var)
{  



     $policyid = $transaction_var['policyid'];
     $clientid = $transaction_var['clientid'];
     $transactionid = $transaction_var['transactionid'];
  
   $Business_Description = $insured_object['business_description'];
   $Business_Name = $insured_object['business_name'];
   $SicCode = '0111';
    $Line1 = $insured_object['insured_line1'];
    $Insured_Zip = $insured_object['insured_zip'];
	$Insured_City = $insured_object['insured_city'];
 
  $us_zip =json_decode(file_get_contents('us_zip.json'));

  foreach($us_zip as $key=> $value)
  {
  if($value->zip == $Insured_Zip)
  {
  $zip_key = $key;
  }
  }
   $zip_data =$us_zip[$zip_key];
   $StateCode= $zip_data->state;
   if($Insured_City=='' && $Insured_City==null){
	$Insured_City = $zip_data->city;   
   }
   
   $StateDesc = '';

   $_SESSION['GeneralLiabilityId'] =add_general_liablity($transaction_var,$StateCode);

 
  $postfields = "{\r\n    \"Insured\": {\r\n      \"NameType\": \"Commercial\",\r\n      \"BusinessName\":\"$Business_Name\",\r\n      \"SicCode\":\"$SicCode\"\r\n    }\r\n}";

$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/Insured/421/",$method ="POST",$header,$postfields);
 $insuredid = $response->objectFieldValuesList[0]->sourceSystemID;

//D. Add Insured Address
	
	//$postfields = "{\n  \"Address\": {\n      \"Country\": \"United States\",\n      \"Line1\": \"$Line1\",\n      \"Line2\": \"1\",\n      \"City\": \"$Insured_City\",\n      \"StateCode\":\"$StateCode\",\n      \"StateDesc\": \"$StateDesc\",\n      \"ZipCode\": \"$Insured_Zip\",\n      \"AcptNewadd\": \"Y\"\n }\n}"; //commented on 29oct2019

  $postfields = "{\n  \"Address\": {\n      \"Country\": \"United States\",\n      \"Line1\": \"$Line1\",\n      \"City\": \"$Insured_City\",\n      \"StateCode\":\"$StateCode\",\n      \"StateDesc\": \"$StateDesc\",\n      \"ZipCode\": \"$Insured_Zip\",\n      \"AcptNewadd\": \"Y\"\n }\n}";

$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
    "sendHiddenAttributes: Y",
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/Insured/$insuredid/Address/595/",$method ="POST",$header,$postfields);
$Addressid = $response->objectFieldValuesList[0]->sourceSystemID;

 }

function update_policy($transaction_var,$effective_date,$expiry_date)
{   
     
     $policyid = $transaction_var['policyid'];
     $clientid = $transaction_var['clientid'];
     $transactionid = $transaction_var['transactionid'];

  $EffectiveDate = $effective_date;
  $ExpirationDate = $expiry_date;
  $CompanyName = 'Ategrity Specialty Insurance Company';

//B. Update Policy
 $postfields = "{\r\n    \"Policy\": {\r\n      \"EffectiveDate\": \"$EffectiveDate\",\r\n    \t\"ExpirationDate\": \"$ExpirationDate\",\r\n    \t\"CompanyName\": \"$CompanyName\",\r\n    \t\"CompanyCode\": \"01\"\r\n    }\r\n}";
$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
    "transactionID: $transactionid",
  ); 
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/",$method ="PUT",$header,$postfields);
}


function add_producer_object($transaction_var,$producer_object)
{
     
     $policyid = $transaction_var['policyid'];
     $clientid = $transaction_var['clientid'];
     $transactionid = $transaction_var['transactionid'];
     $ProducerCode = '0000999998';

$postfields = "{\r\n    \"Producer\": {\r\n      \"ProducerCode\": \"$ProducerCode\",\r\n    \"ProducerOfRecord\": \"Y\"\r\n    }\r\n}";


$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
    "sendHiddenAttributes: Y",
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/Producer/742/",$method ="POST",$header,$postfields);
$Producerid = $response->objectFieldValuesList[0]->sourceSystemID;




}
function add_business_location($business_location,$transaction_var)
{

        $policyid = $transaction_var['policyid'];
        $clientid = $transaction_var['clientid'];
        $transactionid = $transaction_var['transactionid'];

    

$class_code_json = json_decode($_REQUEST['class_code_json']);
$zip_code_json = json_decode($_REQUEST['zip_code_json']);
$exposure_json = json_decode($_REQUEST['exposure_json']);
$city_json = json_decode($_REQUEST['city_json']);
$Line11 = json_decode($business_location['line1']);
$location = json_decode($_REQUEST['location_no']);
$loc_len = count($location);
$gen = false; $liq =false;
$l_array = [];
for($i=0;$i<$loc_len;$i++)
{
 $Insured_Zip = $zip_code_json[$i];

 $territory_code = get_territory_code($Insured_Zip);  
 $Line1 = $Line11[$i];
 $class_code = $class_code_json[$i];
 $exposure = $exposure_json[$i];
 $class_location_no = $i+1;
 $selected_city = $city_json[$i];
$location_no =$location[$i];



  $ll = [70412,50911,59211,58161,58168,58165,58166];
  $res = in_array($class_code, $ll);
 
  

  if($res!=true && $liq==false)
  {
    $GLOBALS['coverage'] = 'general'; 
    $gen = true;  
  }
  if($res==true && $gen==true || ($res!=true && $liq==true))
  {
    $GLOBALS['coverage'] = 'GLLL'; 
    $liq = true; 
  }

  if($res==true && $gen==false)
  {
    $GLOBALS['coverage'] = 'LiqLib'; 
    $liq = true; 
  }




$GeneralLiabilityId = 742;

  $us_zip =json_decode(file_get_contents('us_zip.json'));

  foreach($us_zip as $key=> $value)
  {
  if($value->zip == $Insured_Zip)
  {
  $zip_key = $key;
  }
  }
   $zip_data =$us_zip[$zip_key];
   $StateCode= $zip_data->state;
   {
   add_general_liablity($transaction_var,$StateCode);
   }
   $Insured_City = $zip_data->city;
   $StateDesc = '';

if(!in_array($location_no,$l_array))
{
	
	array_push($l_array,$location_no);
 $GLLocationsId = "50$location_no"; 
 $GLLocationsId = 500+$location_no;

$postfields =  "{\r\n    \"GLLocations\": {\r\n      \"LocationNo\": \"$location_no\",\r\n      \"TerritoryCode\": \"$territory_code\",\r\n      \"TerritoryDescription\": \"$selected_city \"\r\n    }\r\n}";

$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
    "sendHiddenAttributes: Y",
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLLocations/$GLLocationsId",$method ="POST",$header,$postfields);

//H. Add Address

 //$postfields =  "{\r\n  \"Address\": {\r\n      \"Country\": \"United States\",\r\n      \"CountryCode\": \"USA\",\r\n      \"Line1\": \"$Line1\",\r\n      \"Line2\": \"1\",\r\n      \"County\": \"\",\r\n      \"City\": \"$selected_city\",\r\n      \"StateCode\":\"$StateCode\",\r\n      \"StateDesc\": \"$StateDesc\",\r\n      \"ZipCode\": \"$Insured_Zip\",\r\n      \"AcptNewadd\":\"Y\",\r\n      \"AddressType\":\"Location\"\r\n    }\r\n}"; //commented on 29oct2019
 
 $postfields =  "{\r\n  \"Address\": {\r\n      \"Country\": \"United States\",\r\n      \"CountryCode\": \"USA\",\r\n      \"Line1\": \"$Line1\",\r\n      \"County\": \"\",\r\n      \"City\": \"$selected_city\",\r\n      \"StateCode\":\"$StateCode\",\r\n      \"StateDesc\": \"$StateDesc\",\r\n      \"ZipCode\": \"$Insured_Zip\",\r\n      \"AcptNewadd\":\"Y\",\r\n      \"AddressType\":\"Location\"\r\n    }\r\n}";


$address_id = 120+$location_no;


$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
    "sendHiddenAttributes: Y",
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLLocations/$GLLocationsId/Address/$address_id/",$method ="POST",$header,$postfields);
 $LocAddressId = $response->objectFieldValuesList[0]->sourceSystemID;

//J. Add GLLocationInlineOBJ

$postfields =  "{\n  \"GLLocationInlineOBJ\" :{\n    \"ConstructionDate\":\"N\",\n    \"SysExposureIsUnits\": \"N\"\n  }\n}";
$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
   
    "transactionID: $transactionid",
  );


$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLLocations/$GLLocationsId/GLLocationInlineOBJ/991/",$method ="POST",$header,$postfields);
}

premops_prodcops($transaction_var,$exposure,$class_code,$GLLocationsId,$class_location_no);
}

}


function add_general_liablity($transaction_var,$StateCode)
{
//E. Add General Liablity
     $policyid = $transaction_var['policyid'];
     $clientid = $transaction_var['clientid'];
     $transactionid = $transaction_var['transactionid'];
     $CoveragePartLiquor = 'CG';
     $PremisesOperations = 'Y';
     $ProdCompOp = 'Y';
     $LiquorCoverage = 'N';

$Coverage = $GLOBALS['coverage'];

if($Coverage=='general')
{
$LiquorCoverage = 'N';
$PremisesOperations = 'Y';
$ProdCompOp = 'Y';
}


if($Coverage == 'LiqLib')
{

$LiquorCoverage = 'Y';
$PremisesOperations = 'N';
$ProdCompOp = 'N';
$CoveragePartLiquor = 'LI';
}

if($Coverage == 'GLLL')
{
$LiquorCoverage = 'Y';
$PremisesOperations = 'Y';
}



$postfields = "";
$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
    "sendHiddenAttributes: Y",
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/742/",$method ="POST",$header,$postfields);
$GeneralLiabilityId = $response->objectFieldValuesList[0]->sourceSystemID;

//F. Update General Liablity


$postfields =  "{\r\n    \"GeneralLiability\": {\r\n      \"CoveragePartLiquor\": \"$CoveragePartLiquor\",\r\n      \"CoverageType\" :\"General\",\r\n      \"IsExpRating\": \"N\",\r\n      \"PremisesOperations\":\"$PremisesOperations\",\r\n      \"ProdCompOp\":\"$ProdCompOp\",\r\n      \"EmpBenefitLiab\":\"N\",\r\n      \"LiabWithdrawExpe\": \"N\",\r\n      \"LiquorCoverage\": \"$LiquorCoverage\",\r\n      \"LobCode\":\"GL\",\r\n      \"PollutionCoverage\":\"N\",\r\n      \"ElectronicDataCov\": \"N\",\r\n      \"SportsParticipantsCov\":\"N\",\r\n      \"Terrorism\":\"N\",\r\n      \"ProductWithdrawalLiab\":\"N\",\r\n      \"PrincProtecLiab\":\"N\",\r\n      \"InjuryLeasWorkersCov\":\"N\",\r\n      \"MiscCoverage\":\"N\",\r\n      \"PrimaryStateCode\": \"$StateCode\"\r\n    }\r\n}";


$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
    "sendHiddenAttributes: Y",
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/",$method ="PUT",$header,$postfields);
 

return $GeneralLiabilityId;

}


function limits()
{

$postfields =  "{\n    \"GLPremOpsAndProdCoCoverage\": {\n      \"OccCoverageBasis\": \"Y\",\n      \"ClaimsMadeCovBasis\": \"N\",\n      \"CombinedSingleLimit\": \"Y\",\n      \"DispEachOccLimitCsl\": \"$DispEachOccLimitCsl\",\n      \"DispGenAggLimitCsl\": \"$DispGenAggLimitCsl\",\n      \"DispPrdcoAgglimitCsl\":\"$DispPrdcoAgglimitCsl\",\n      \"DamagePrmsRntdLimit\": \"BL\",\n      \"MedExpenseLimit\": \"5000\",\n      \"PersAndAdvIncExcl\": \"IN\",\n      \"PersonalAdInjuryLimit\": \"1000000\",\n      \"DeductLiabInsurance\": \"Y\",\n      \"DeductibleApplication\":\"OCC\",\n      \"PremOpDeduct\":\"COMBINED\",\n      \"PremOpsBiPdCombDeduct\":\"$deductible\",\n      \"ProductsDeduct\":\"COMBINED\",\n      \"ProductsBiPdCombDeduct\":\"$deductible\",\n      \"Exclusion\": \"CG 21 07\"\n    }\n}";

$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
   
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLPremOpsAndProdCoCoverage/42/",$method ="POST",$header,$postfields);
$GLPremOpsAndProdCoCoverageId = $response->objectFieldValuesList[0]->sourceSystemID;
}

 function premops_prodcops($transaction_var,$exposure,$class_code,$GLLocationsGID,$location_no)
{
     $policyid = $transaction_var['policyid'];
     $clientid = $transaction_var['clientid'];
     $transactionid = $transaction_var['transactionid'];

     
$GeneralLiabilityId = 742;
$deductible = $GLOBALS['deductible'];
$Glclass = "24$location_no";
$Glclass = 240+$location_no;

   //M. Add GLLiquorLiabilityCoverage


 $postfields =  "{\n    \"GLLiquorLiabilityCoverage\": {\n      \"OccCoverageBasis\": \"Y\"\n    }\n}";
$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
   
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLLiquorLiabilityCoverage/402/",$method ="POST",$header,$postfields);
$GLLiquorLiabilityCoverageId = $response->objectFieldValuesList[0]->sourceSystemID;

//N. Add GLLiquorLiabilityCoverage/GLClassification


  $postfields = "{\n    \"GlClassifications\": {\n        \"ClassCode\": \"$class_code\",\n           \"Exposure\":\"$exposure\",\n       \"LocationId\": \"$GLLocationsGID\"\n    }\n}";
$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
   
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLLiquorLiabilityCoverage/$GLLiquorLiabilityCoverageId/GLClassifications/$Glclass/",$method ="POST",$header,$postfields);

//O. Add GLOptionalProvisionsInformation


 $postfields =  "{\n    \"GLOptionalProvisionsInformation\": {\n      \"AmendmentLimitProv\": \"N\",\n      \"CovAmendmentProv\": \"N\",\n      \"ExclusiveProvision\": \"N\",\n      \"OptlProvAll\": \"N\",\n      \"SpecialProvision\": \"N\",\n      \"SpecialProvClmMdCov\": \"N\",\n      \"TermAndSuspProvision\": \"N\"\n    }\n}";
$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
   
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLOptionalProvisionsInformation/122/",$method ="POST",$header,$postfields);


if($GLOBALS['limits']!=null)
{
    $limits = [$GLOBALS['limits']];
}
else
{
  
  $limits = ['1221','2442','1331','2222','1441','2332'];
  
}




  foreach($limits as $value){

      switch ($value) {
  case '1221':
$DispEachOccLimitCsl = 1000000;
$DispGenAggLimitCsl =  2000000;
$DispPrdcoAgglimitCsl = 2000000;
$PersonalAdInjuryLimit = 1000000;
    break;  

    case '2442':
$DispEachOccLimitCsl = 2000000;
$DispGenAggLimitCsl =  4000000;
$DispPrdcoAgglimitCsl = 4000000;
$PersonalAdInjuryLimit = 2000000;
    break;

    case '1331':
$DispEachOccLimitCsl = 1000000;
$DispGenAggLimitCsl =  3000000;
$DispPrdcoAgglimitCsl = 3000000;
$PersonalAdInjuryLimit = 1000000;
    break;
    case '1441':
$DispEachOccLimitCsl = 1000000;
$DispGenAggLimitCsl =  4000000;
$DispPrdcoAgglimitCsl = 4000000;
$PersonalAdInjuryLimit = 1000000;
    break;
    case '2222':
$DispEachOccLimitCsl = 2000000;
$DispGenAggLimitCsl =  2000000;
$DispPrdcoAgglimitCsl = 2000000;
$PersonalAdInjuryLimit = 2000000;
    break;
      case '2332':
$DispEachOccLimitCsl = 2000000;
$DispGenAggLimitCsl =  3000000;
$DispPrdcoAgglimitCsl = 3000000;
$PersonalAdInjuryLimit = 2000000;
    break;

  
  default:
$DispEachOccLimitCsl = 1000000;
$DispGenAggLimitCsl =  2000000;
$DispPrdcoAgglimitCsl = 2000000;
$PersonalAdInjuryLimit = 1000000;
    break;
}

  $ll = [70412,50911,59211,58161,58168,58165,58166];
  $res = in_array($class_code, $ll);

  if($res!=true)
  {


//// Add GLPremOpsAndProdCoCoverage

    $postfields =  "{\n    \"GLPremOpsAndProdCoCoverage\": {\n      \"OccCoverageBasis\": \"Y\",\n      \"ClaimsMadeCovBasis\": \"N\",\n      \"CombinedSingleLimit\": \"Y\",\n      \"DispEachOccLimitCsl\": \"$DispEachOccLimitCsl\",\n      \"DispGenAggLimitCsl\": \"$DispGenAggLimitCsl\",\n      \"DispPrdcoAgglimitCsl\":\"$DispPrdcoAgglimitCsl\",\n      \"DamagePrmsRntdLimit\": \"BL\",\n      \"MedExpenseLimit\": \"5000\",\n      \"PersAndAdvIncExcl\": \"IN\",\n      \"PersonalAdInjuryLimit\": \"$PersonalAdInjuryLimit\",\n      \"DeductLiabInsurance\": \"Y\",\n      \"DeductibleApplication\":\"OCC\",\n      \"PremOpDeduct\":\"COMBINED\",\n      \"PremOpsBiPdCombDeduct\":\"$deductible\",\n      \"ProductsDeduct\":\"COMBINED\",\n      \"ProductsBiPdCombDeduct\":\"$deductible\",\n      \"CPersAndAdvDeduct\":\"$deductible\",\n      \"Exclusion\": \"CG 21 07\"\n    }\n}";




$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
   
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLPremOpsAndProdCoCoverage/42/",$method ="POST",$header,$postfields);


$GLPremOpsAndProdCoCoverageId = $response->objectFieldValuesList[0]->sourceSystemID;


//L. Add GLPremOpsAndProdCoCoverage?GLClassification
$cd = get_class_desc($class_code);
$class_description = $cd['DESCRIPTION'];



  // $postfields =  "{\n    \"GlClassifications\": {\n      \"ClassCode\": \"$class_code\",\n      \"ClassDescription\": \"$class_description\",\n      \"Exposure\": \"$exposure\",\n      \"LocationId\": \"$GLLocationsGID\"\n    }\n}";
  

   $postfields =  "{\n    \"GlClassifications\": {\n      \"ClassCode\": \"$class_code\",\n           \"Exposure\": \"$exposure\",\n      \"LocationId\": \"$GLLocationsGID\"\n    }\n}";


$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
   
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLPremOpsAndProdCoCoverage/$GLPremOpsAndProdCoCoverageId/GLClassifications/$Glclass",$method ="POST",$header,$postfields);



 $_SESSION['GLClassificationId']=$GLClassificationId = $response->objectFieldValuesList[0]->sourceSystemID;
 }


   $postfields =  "";
   $header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
   
    "transactionID: $transactionid",
  );
$response_premops_prodcops[$value] = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLPremOpsAndProdCoCoverage/$GLPremOpsAndProdCoCoverageId/GLClassifications/$GLClassificationId/GLClassRatingDetails/",$method ="GET",$header,$postfields);
$GLClassRatingDetailsId = $response->objectFieldValuesList[0]->sourceSystemID;
$GLClassRatingDetailsId = $Glclass;


$limits = $value;
 get_rating($transaction_var,$GeneralLiabilityId='742',$GLPremOpsAndProdCoCoverageId='42',$GLClassificationId,$limits,$transactionid,$cd,$exposure,$response,$location_no,$class_code);


  }

$gl_id = ['GeneralLiabilityId'=>$GeneralLiabilityId,"GLPremOpsAndProdCoCoverageId"=>$GLPremOpsAndProdCoCoverageId,"GLClassificationId"=>$GLClassificationId];

}


function get_rating($transaction_var,$GeneralLiabilityId='742',$GLPremOpsAndProdCoCoverageId='42',$GLClassificationId='12',$limits,$trans_id,$cd,$exposure,$response_ct,$location_no,$class_code)
{    
//P. Validate Transaction



  $ll = [70412,50911,59211,58161,58168,58165,58166];
  $res = in_array($class_code, $ll);
  
 
 if($res!= true)
{

$postfields =  "";
$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
  
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/validateTransaction",$method ="GET",$header,$postfields);
     
     $method = '';
     $action = 'RedoQuote';
     $policyid = $transaction_var['policyid'];
     $clientid = $transaction_var['clientid'];
     $transactionid = $transaction_var['transactionid'];


   $postfields =  "";
   $header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
   
    "transactionID: $transactionid",
  );
   $response_premops_prodcops = [];
$response_premops_prodcops[$location_no] = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLPremOpsAndProdCoCoverage/$GLPremOpsAndProdCoCoverageId/GLClassifications/$GLClassificationId/GLClassRatingDetails",$method ="GET",$header,$postfields);

$GLClassRatingDetailsId = $response->objectFieldValuesList[0]->sourceSystemID;

if($cd['PREMIUM_BASE']=='Admissions, Products/Completed Operations are included'||$cd['PREMIUM_BASE']=='Units, Products/Completed Operations are included')
{

 $response_premops_prodcops[$location_no]->objectFieldValuesList[0]->TransactionPremium = $response_premops_prodcops[$location_no]->objectFieldValuesList[0]->AdjBaseRate*$exposure;
 $response_premops_prodcops[$location_no]->objectFieldValuesList[1]->TransactionPremium = $response_premops_prodcops[$location_no]->objectFieldValuesList[1]->AdjBaseRate*$exposure;
 $response_premops_prodcops['completeTransaction'] = $response_ct;
}
else
{
 $response_premops_prodcops[$location_no]->objectFieldValuesList[0]->TransactionPremium=  $response_premops_prodcops[$location_no]->objectFieldValuesList[0]->AdjBaseRate*$exposure/1000;
 $response_premops_prodcops[$location_no]->objectFieldValuesList[1]->TransactionPremium=  $response_premops_prodcops[$location_no]->objectFieldValuesList[1]->AdjBaseRate*$exposure/1000;
 $response_premops_prodcops['completeTransaction'] = $response_ct;
}
}
else
{
$GLClassificationId = 240+$location_no;
$postfields =  "";
$header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
  
    "transactionID: $transactionid",
  );
$response_premops_prodcops[$location_no] = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/validateTransaction",$method ="GET",$header,$postfields);

 
     
     $method = '';
     $action = 'RedoQuote';
     $policyid = $transaction_var['policyid'];
     $clientid = $transaction_var['clientid'];
     $transactionid = $transaction_var['transactionid'];


   $postfields =  "";
   $header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
   
    "transactionID: $transactionid",
  );
   $response_premops_prodcops = [];
$response_premops_prodcops[$location_no] = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/Policy/$policyid/GeneralLiability/$GeneralLiabilityId/GLLiquorLiabilityCoverage/402/GLClassifications/$GLClassificationId/GLClassRatingDetails",$method ="GET",$header,$postfields);
$response_premops_prodcops[$location_no]->objectFieldValuesList[0]->TransactionPremium=  $response_premops_prodcops[$location_no]->objectFieldValuesList[0]->AdjBaseRate*$exposure/1000;
 $response_premops_prodcops[$location_no]->objectFieldValuesList[1]->TransactionPremium=  $response_premops_prodcops[$location_no]->objectFieldValuesList[1]->AdjBaseRate*$exposure/1000;
 $response_premops_prodcops['completeTransaction'] = $response_ct;
}

array_push($GLOBALS['res'],$response_premops_prodcops);

}

//Complete Transaction
  $postfields =  "";
  $header = array(
    "Accept: application/json",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    
    "clientID: $clientid",
  
    "transactionID: $transactionid",
  );
$response = curl_function($GLOBALS['majesco_user_name'],$GLOBALS['majesco_password'],$url=$GLOBALS['majesco_url']."/microservices/completeTransaction",$method ="GET",$header,$postfields);
print_r(json_encode($GLOBALS['res']));


function get_territory_code($zipcode)
{   
  //Should not use echo or print_r as response territory code is used in front end
  $territory_code = json_decode(file_get_contents('territory_code.json'));
  $zip_array = array_column($territory_code, 'ZIP');
  $as =array_search($zipcode, $zip_array); 
   
  $len = strlen($territory_code[$as]->TERRITORY);
  $tc = $territory_code[$as]->TERRITORY;
  switch ($len) {
    case '1':
     $tc = "00".$territory_code[$as]->TERRITORY;
      break;
    
    case '2':
  
      $tc = "0".$territory_code[$as]->TERRITORY;
      break;

    case '3':
      $tc = $territory_code[$as]->TERRITORY;
      break;

  }

  return $tc;
}

function curl_function($username,$password,$url,$method,$header,$postfields)
{

$curl = curl_init();
//$curl_log = $GLOBALS['curl_log']; // open file for READ and write
$curl_log  = fopen($GLOBALS['curl_log_loc'], 'w+'); // open file for READ and write

curl_setopt($curl, CURLOPT_USERPWD, $username . ":" . $password);
curl_setopt($curl, CURLOPT_VERBOSE, true);

curl_setopt($curl, CURLOPT_STDERR, $curl_log);
curl_setopt_array($curl, array(
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_SSL_VERIFYPEER => false,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => $method,
   CURLOPT_POSTFIELDS => $postfields,
  CURLOPT_HTTPHEADER => $header,
));

$response = curl_exec($curl);

rewind($curl_log);
$output= fread($curl_log, 2048);
fwrite($GLOBALS['curl_log_location'], $output);

$output = addslashes($output);
$user_id = $_REQUEST['user_id'] ?: $_SESSION['userid'];
$needle = 'transactionID';
$ret = array_keys(array_filter($header, function($var) use ($needle){
    return strpos($var, $needle) !== false;
}));
$key = $ret[0];
$transactionid = $header[$key];
$transactionid = explode('transactionID:', $transactionid);
$transactionid = $transactionid[1];
$needle = 'clientID';
$ret = array_keys(array_filter($header, function($var) use ($needle){
    return strpos($var, $needle) !== false;
}));
$key = $ret[0];
$clientid = $header[$key];
$clientid = explode('clientID:', $clientid);
$clientid = $clientid[1];
$asic_id = $_REQUEST['asic_id'] ?: $_SESSION['asic_id'];
$api_url = $url;

$ip_address=$GLOBALS['local_IP_Address'];



$err = curl_error($curl);



curl_close($curl);
fclose($curl_log);

if ($err) {
echo json_decode($err);
} else {
$header = json_encode($header);

  
   $query_log = "INSERT INTO majesco_curl_log (asic_id,majesco_transaction_id,client_id,hostname,user_id,url,curl_info,header,api_response,http_method) VALUES ('".$asic_id."','".$transactionid."','".$clientid."','".$ip_address."','".$user_id."','".$api_url."','".$output."','".$header."','".$response."','".$method."')";

  $res = mysqli_query($GLOBALS['conn_log'], $query_log);

   $response =(json_decode($response));
 return $response;
}
}


function get_class_desc($class_code)
{


  $cc_array_main = json_decode(file_get_contents('business_class_code.json'));
  $cc_array = array_column($cc_array_main, 'CLASS CODE');
  $as = array_search($class_code, $cc_array);
  $class_code1 = json_encode($cc_array_main[$as]);

                $c=(json_decode($class_code1)); 
                $c = (array)$c;
                return $c;
 
}
