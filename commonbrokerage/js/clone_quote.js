/****** Coverage and Limit Code ************/
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();


function get_lastQuote_details() {

        //var accountid = localStorage.getItem("accid");

        $('.cloneQuoteBtn').attr('disabled',true);
        $('.qvSpinner').show();
        var accountid = accid;
        today = mm + '/' + dd + '/' + yyyy;
          $.ajax({
              url: laravel_url+"/get_last_quote_name",
              type:'post',
              data:{accountid:accountid},
              success:function(response){
                  var obj =JSON.parse(response);
                  if(obj.data){
                    console.log(obj.data);
                    if(obj.data.length > 0){
                      var dta_splt =obj.data[0].quote_name.split("-");
              
                      var char_second = dta_splt[0].substring(1);
                      var quote_name_incrmnt = parseInt(char_second)+parseInt(1);
                      var quote_version_incrmnt = parseInt(obj.data[0].quote_version)+parseInt(1);
                      var new_cr_quote_name = "Q"+quote_name_incrmnt+"-$0-"+today;
                      var new_cr_quote_version = quote_version_incrmnt;
                      var new_uni_com_id = (new Date).getTime();
                      clone_Quote(quote_version_incrmnt,new_cr_quote_name,new_cr_quote_version,new_uni_com_id);

                      $('#pills-rqbi-tab').click();
                    }  
                  }
                  
              },complete : function(){

                  $('.cloneQuoteBtn').removeAttr('disabled');
                  $('.qvSpinner').hide();
                
              },error:function(data){
                
              }
          });
}


function clone_Quote(new_quote_version_incrmnt,new_cr_quote_name,new_cr_quote_version,new_uni_com_id){
  //var get_curnt_acc_id  = localStorage.getItem("accid");
  var get_curnt_acc_id = accid;
  var get_curnt_rqbi_id = $('#rqbiQuoteVersion').val();
  var current_user      = localStorage.getItem('usernumericid');

  $.ajax({
    url: laravel_url+"/clone_Quote",
    type:'post',
    data:{
      com_id                    : com_id,
      get_curnt_acc_id          : get_curnt_acc_id,
      get_curnt_rqbi_id         : get_curnt_rqbi_id,
      new_quote_version_incrmnt : new_quote_version_incrmnt,
      new_cr_quote_name         : new_cr_quote_name,
      new_cr_quote_version      : new_cr_quote_version,
      new_uni_com_id            : new_uni_com_id,
      current_user              : current_user
    },
    success:function(response){
       
    },complete : function(){
      
    },error:function(data){
      
    }
  });
}