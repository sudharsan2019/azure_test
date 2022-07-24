
<?php
include('../config.php');

$base_url = CRM_BASEURL;
$user_name = CRM_USERNAME;
$password =  CRM_PASSWORD;


$dbhost = DB_HOST_v2;
$dbuser = DB_USERNAME_v2;
$dbpassword = DB_PASSWORD_v2;
$database = DB_NAME_v2;
$db_conn = mysqli_connect($dbhost, $dbuser, $dbpassword, $database);

//The comments written will be helpfull for understanding suiteCRM API for getting data and insert data.. THe end point will be common for all get and all set.. We will changing the module name for getting Accounts we will use Module_name Accounts for leads we use Module_name Leads for submission we use Opportunities
//Authentication
 $postfields = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"input_type\"\r\n\r\nJSON\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"response_type\"\r\n\r\nJSON\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"method\"\r\n\r\nlogin\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"rest_data\"\r\n\r\n{\"user_auth\":{\"user_name\":\"$user_name\",\"password\":\"$password\",\"encryption\":\"PLAIN\"},\"application\":\"MyRestAPI\"}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";
$res =curl_convertlead($base_url,$postfields);
$session_id = $res->id;
//echo "<br>";




//Get leads FOr getting data use method get_entry_list( In Restdata i have give module_name Leads if you want accounts data give it as Accounts For Submission use Opportunities)
$postfields ="------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"input_type\"\r\n\r\nJSON\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"response_type\"\r\n\r\nJSON\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"method\"\r\n\r\nget_entry_list\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"rest_data\"\r\n\r\n{\"session\":\"$session_id\",\"module_name\":\"Accounts\",\"query\":\"\",\"order_by\":\"\",\"offset\":\"0\",\"select_fields\":[\"id\",\"name\",\"email1\",\"date_entered\",\"phone_office\"],\"link_name_to_fields_array\":[],\"max_results\":\"1000\",\"deleted\":\"0\",\"Favorites\":false}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";
// echo "<pre>"; print_r($postfields);
$res =curl_convertlead($base_url,$postfields);


// $name_value_id[] = $res->entry_list[0]->name_value_list->id;
// $name_value_name[] = $res->entry_list[0]->name_value_list->name;

$name_value_id = array();
 $name_value_name = array();

foreach ($res->entry_list as $keys => $value) {
   $name_value_id[] = $value->name_value_list->id;
   $name_value_name[] = $value->name_value_list->name;
   $name_value_email[] = $value->name_value_list->email1;
 
}

//$merge = array_merge($name_value_id,$name_value_name);
$merge = $name_value_id;
// print_r($name_value_id);


 // print_r($merge);

$get_entry_val = array();
$i=0;
foreach ($merge as $key => $val) {
  $get_entry_val[$i]['id'] = $merge[$key]->value;
  $get_entry_val[$i]['name'] = $name_value_name[$key]->value;
  $get_entry_val[$i]['email'] = $name_value_email[$key]->value;
  $i++;
}

$select = "SELECT * from crmbrokers";

$result = mysqli_query($db_conn,$select);

while($row = mysqli_fetch_assoc($result)) {
    $row1[] = $row['brokerid'];
}

foreach ($get_entry_val as $key => $value) {
  $brokerid = $get_entry_val[$key]['id'];
  $brokername = $get_entry_val[$key]['name'];
  $brokeremail = $get_entry_val[$key]['email'];

  if (in_array($brokerid, $row1)) {
    echo "already inserted <br/>";
  }else{
    $Insert = "INSERT INTO crmbrokers (brokerid, brokername, brokeremail) values('".$brokerid."','".$brokername."','".$brokeremail."')";

    if (mysqli_query($db_conn,$Insert)) {
      echo "inserted <br/>";
    }else{
      echo "not inserted <br/>";
    }
  }
  
}


// $table="<select class='form-control' id='ac_tbroker' name='ac_tbroker'>";
// foreach ($get_entry_val as $key => $value) {
// $table.="<option value='".$value['id']."'> ".$value['name']."</option>";
// }
// $table.="</select>";
// echo $table;

 
 // echo json_encode($get_entry_val);



function curl_convertlead($base_url,$postfields)
{
$curl = curl_init();    
curl_setopt_array($curl, array(
  CURLOPT_URL => $base_url."/service/v4_1/rest.php",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => $postfields,
  CURLOPT_HTTPHEADER => array(
    "Cache-Control: no-cache",
    "Postman-Token: c4321aca-3305-4d55-9e7f-5d4f231decc3",
    "content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  ),
));
$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  return json_decode($response);
}
}

