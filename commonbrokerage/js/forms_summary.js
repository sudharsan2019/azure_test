var dateversioning = Date.now();

function get_formsummary(accid, rqbi_id){
    var acctid = accid;
    var rqbi_id_val = rqbi_id;
    var current_user = localStorage.getItem('usernumericid');

        $.ajax({
            url: laravel_url+"/get_formsummary?"+Date.now(),
            type:'get',
            data:{ acctid:acctid, rqbi_id:rqbi_id_val, current_user:current_user },
            success:function(response){
                $('.bind_forms_summary').html('');
                $('.bind_forms_summary').html(response);
            }
        });

}


