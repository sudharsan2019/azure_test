function unsupported_to_supported(submission_no,rqbi_id , com_id){    

    var updated_by = localStorage.getItem('usernumericid');
    var created_by = localStorage.getItem('usernumericid');
    var gl_submission_no = submission_no;
    var xl_account_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    var xl_rqbi_id = rqbi_id;
    var xl_com_id = com_id
        var import_flag = 1; //inital account;s

        try {  
            $.ajax({
                url: laravel_url+"/unsupported_to_supported",
                type:'post',
                data:{gl_submission_no : gl_submission_no, xl_account_id : xl_account_id, xl_rqbi_id: xl_rqbi_id, xl_com_id :xl_com_id, import_flag: import_flag, created_by : created_by , updated_by: updated_by},
                success: function (response) {
                  updateQuoteNameBasedTotalPremium();
                  save_ugl_default_accord(xl_com_id, xl_rqbi_id);
              },
              success: function (response) {
                  clear_ugl();
                  get_rqbiLocations (xl_account_id,xl_rqbi_id,'');    
                  updateeffexpdate();
                  get_quotashare(xl_com_id);   
                  brok_xl_retrieve(xl_com_id); 
                  check_xl_supported(xl_rqbi_id);


              }

          });
        }
        catch(err) {
          console.log(err);

      }


  }

  function updatequotashare(){
    $(".xlQuoteTable").attr('data-retreivequota', 0);
    var updated_by = localStorage.getItem('usernumericid');
    $.ajax({
        type:"POST",
        url: laravel_url+"/updatequotashare",
        data:{ accid:accid, rqbi_id : rqbi_id, updated_by: updated_by},
        success:function(response) {    console.log(response);
         
        }
    });
}

function updateeffexpdate(){

    var updated_by = localStorage.getItem('usernumericid');
    $.ajax({
        type:"POST",
        url: laravel_url+"/updateeffandexpdate",
        data:{ accid:accid, rqbi_id : rqbi_id, updated_by: updated_by},
        success:function(response) {    console.log(response);
            var obj = response;
            var rqbi_efft_dt = obj.rqbi_effective_date;
            var rqbi_exp_dt = obj.rqbi_expiry_date;
            if(rqbi_efft_dt === null){
                $('#rqbieffdate').val('');
            } else {
                var rqbi_eff_dt_spl = rqbi_efft_dt.split('-');
                var rqbi_efft_dt_org = rqbi_eff_dt_spl[1]+'-'+rqbi_eff_dt_spl[2]+'-'+rqbi_eff_dt_spl[0];
                $('#rqbieffdate').val(rqbi_efft_dt_org);
                $("#rqbi_effect_dt").datepicker({ 
                    autoclose: true, 
                }).datepicker('update', new Date(rqbi_efft_dt_org));
            }
            if(obj.rqbi_expiry_date === null){
                $('#rqbiexpdate').val('');
            } else {
                var rqbi_exp_dt_spl = rqbi_exp_dt.split('-');
                var rqbi_exp_dt_org = rqbi_exp_dt_spl[1]+'-'+rqbi_exp_dt_spl[2]+'-'+rqbi_exp_dt_spl[0];
                $('#rqbiexpdate').val(rqbi_exp_dt_org);
                $("#rqbi_expir_dt").datepicker({ 
                    autoclose: true, 
                }).datepicker('update', new Date(rqbi_exp_dt_org));
            }

        }
    });

}