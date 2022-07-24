var host = window.location.hostname;
var protocol = window.location.protocol;
var base_url = protocol+"//"+host;

var laravel_url = protocol+"//"+host+"/brokerage.be/public/index.php/api";


var global_maj_link = '';
var global_forms_management_link = '';


var dateversioning = Date.now();

var uniqueid=null;
var com_id=null;
var rqbi_id=null;
var rqbi_coverage =null;
var forms_frontend_rules ='';
var quote_ver_status = null;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

$.ajax({
  url:protocol+"//"+host+"/brokerage/brokerage_dragdrop_v2/config_ajax.php?"+dateversioning,
  type: 'GET',
  success:function(res){    
    var obj = jQuery.parseJSON(res);
    global_maj_link = obj.majesco_url;
    global_forms_management_link = obj.forms_management_url;
    doc_api_url = obj.doc_url;
    global_site_url = obj.site_url;
    global_pdf_lib_path = obj.pdf_lib_path;
    global_pdf_str_path = obj.pdf_str_path;
    global_read_only_user = obj.read_only_user;
    global_pdf_save_file_path = obj.pdf_save_file_path;
    global_pdf_save_icon_path = obj.pdf_save_icon_path;
    global_pdf_viewer_key = obj.pdf_viewer_key;
    global_pdf_new_viewer = obj.pdf_new_viewer;
    global_liquor_cc = obj.lll_cc;
    global_ocp_cc = obj.ocp_cc;
  }
});


var specific_person_hideshow = ['asic.underwriter1@gmail.com'];

var specific_diable_style = '';
if ( $.inArray( localStorage.getItem('userid'), specific_person_hideshow )!='-1' ) {
	specific_diable_style = " style='pointer-events: none!important;' ";
}else{
	specific_diable_style = "";
}


$.ajax({
    url: laravel_url+"/forms_frontend_rules",
    type:'get',
    success:function(response) {
        forms_frontend_rules = JSON.parse(response);
    }
});


function getcurrentdate(){
	var formattedDate = new Date();
	var d = formattedDate.getDate();
	var m =  formattedDate.getMonth();
	m += 1;  // JavaScript months are 0-11
	if(m<10){
	    m='0'+m;
	}

	if(d<10){
	    d='0'+d;
	}
	
	var y = formattedDate.getFullYear();
	return y + "-" + m + "-" + d;
}


function formatedate(unfarmatteddate){

	if (unfarmatteddate == null) {
		return '';
	}else{
		var formattedDate = new Date(unfarmatteddate);
		var d = formattedDate.getDate();
		var m =  formattedDate.getMonth();
		m += 1;  // JavaScript months are 0-11
		if(m<10){
		    m='0'+m;
		}
		if(d<10){
		    d='0'+d;
		}
		var y = formattedDate.getFullYear();
		return m + "-" + d + "-" + y;
	}
	
}

function formatedatepicker(unfarmatteddate){
	var formattedDate = new Date(unfarmatteddate);
	var d = formattedDate.getDate();
	var m =  formattedDate.getMonth();
	m += 1;  // JavaScript months are 0-11
	if(m<10){
	    m='0'+m;
	} 
	if(d<10){
	    d='0'+d;
	}
	var y = formattedDate.getFullYear();
	return y + "-" + m + "-" + d;
}

function formatedatepicker_mdy(unfarmatteddate){
	var formattedDate = new Date(unfarmatteddate);
	var d = formattedDate.getDate();
	var m =  formattedDate.getMonth();
	m += 1;  // JavaScript months are 0-11
	if(m<10){
	    m='0'+m;
	} 
	if(d<10){
	    d='0'+d;
	}
	var y = formattedDate.getFullYear();
	return m + "-" + d + "-" + y;
}

function getmonthyear(){
	var formattedDate = new Date();
	// var d = formattedDate.getDate();
	var m =  formattedDate.getMonth();
	m += 1;  // JavaScript months are 0-11
	if(m<10){
	    m='0'+m;
	}

	if (m == '01') { 
		m = 'Jan';
	}else if(m == '02'){
		m = 'Feb';
	}else if(m == '03'){
		m = 'Mar';
	}else if(m == '04'){
		m = 'Apr';
	}else if(m == '05'){
		m = 'May';
	}else if(m == '06'){
		m = 'Jun';
	}else if(m == '07'){
		m = 'Jul';
	}else if(m == '08'){
		m = 'Aug';
	}else if(m == '09'){
		m = 'Sep';
	}else if(m == '10'){
		m = 'Oct';
	}else if(m == '12'){
		m = 'Nov';
	}else{
		m = 'Dec';
	}

	var y = formattedDate.getFullYear();
	return m + "-" + y;
}

function getnumbermonthyear(){
	var formattedDate = new Date();
	// var d = formattedDate.getDate();
	var m =  formattedDate.getMonth();
	m += 1;  // JavaScript months are 0-11
	if(m<10){
	    m='0'+m;
	}
	var y = formattedDate.getFullYear();
	return m + "-" + y;
}

// var tab_monthyearval = $('.session_hide_tab').find('.active').find('.bind_monthyear').data('monthyearval');
// var tab_accountid = $('.session_hide_tab').find('.active').find('.accountid').val();


function monthyearformats(renwal_monthyear){
	var result = renwal_monthyear.split('-');
	var m = result[0];
	var y = result[1];

	if (m == '01') { 
		m = 'Jan';
	}else if(m == '02'){
		m = 'Feb';
	}else if(m == '03'){
		m = 'Mar';
	}else if(m == '04'){
		m = 'Apr';
	}else if(m == '05'){
		m = 'May';
	}else if(m == '06'){
		m = 'Jun';
	}else if(m == '07'){
		m = 'Jul';
	}else if(m == '08'){
		m = 'Aug';
	}else if(m == '09'){
		m = 'Sep';
	}else if(m == '10'){
		m = 'Oct';
	}else if(m == '12'){
		m = 'Nov';
	}else{
		m = 'Dec';
	}

	return m + "-" + y;
}



function datedifference(fromdate,todate){
	// var From_date = new Date(fromdate);
	// var To_date = new Date(todate);
	// var diff_date =  To_date - From_date;
	 
	// var years = Math.floor(diff_date/31536000000);
	// var months = Math.floor((diff_date % 31536000000)/2628000000);
	// var days = Math.floor(((diff_date % 31536000000) % 2628000000)/86400000);

	// return days;



	var startDay = new Date(fromdate);
	var endDay = new Date(todate);
	var millisecondsPerDay = 1000 * 60 * 60 * 24;

	var millisBetween = endDay.getTime() - startDay.getTime();
	var days1 = millisBetween / millisecondsPerDay;

	// Round down.
	var days =  Math.floor(days1);

	return days;

}

setTimeout(function(){ 
	read_onlyuser_v2();
}, 3000);


function read_onlyuser_v2(){

	var specific_person_hideshow = ['asic.underwriter1@gmail.com'];
	if ( $.inArray( localStorage.getItem('userid'), specific_person_hideshow )!='-1' ) {
		$(".downloadBtnDiv").hide();
		$(".bind_archive_restore").hide();
		$(".upload_dragdrop0").hide();
		$(".addmaincategory_btn").hide();
		$(".addsubcategory_btn").hide();
		$(".cateAddSel").hide();
		$(".openEditBar").hide();
	}else{
		console.log(localStorage.getItem('userid'));
	}
	
	// $(".downloadBtn").attr("style", "pointer-events:none!important")
	
}


function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}



function resetlocalstorage(){
	localStorage.removeItem("new_account");
    localStorage.removeItem("new_emailid");
    localStorage.removeItem("old_emailid");
    localStorage.removeItem("tabstatus");
    localStorage.removeItem("renwal_monthyear");
    localStorage.removeItem("goto_specific_acc");
    localStorage.removeItem("goto_specific_accid");
    localStorage.removeItem("renwal_monthyear");
    localStorage.removeItem("renewalcreation");
    localStorage.removeItem("zip_code");
    localStorage.removeItem("revenue");
    //testing 
}