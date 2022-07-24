
/*right hand side value append starts here*/
function get_righthandpanel_value(){
	//var acct_id	= localStorage.getItem("accid");
    var acct_id   = accid;
	get_rhs_classbuilder(acct_id);  // class builder right side	
}
/*right hand side value append end here*/

function get_rhs_classbuilder(acct_id){
	var userid = localStorage.getItem('usernumericid');
    if (acct_id !="") {
		$.ajax({
	      url: laravel_url+"/get_rhs_classbuilder",
	      type:'post',
	      data:{'acct_id':acct_id,'com_id' : com_id,'rqbi_id' : rqbi_id,'userid' : userid},
	      success:function(data){
	            var obj = JSON.parse(data); 
                var submission_number = obj.submission_number;
                if(obj.policy_number != null) {
                  submission_number = obj.policy_number;
                  $('.rhs_submission_policy_no').text('');
                  $('.rhs_submission_policy_no').text(submission_number);
                } else {
                  $('.rhs_submission_policy_no').text('');
                  $('.rhs_submission_policy_no').text(submission_number);
                }
	            if(obj.rightside_bind_gl != ""){
		            $('.gl_toggled_content').html(obj.rightside_bind_gl);             
		            $('.glTotalAmt').html(obj.gl_premium);     
                    $('.gl_rhs_head').show();
	            } else{
	            	$('.gl_rhs_head').hide();
	            }
	            if(obj.rightside_bind_liq != ""){
	            	$('.liquor_toggled_content').html(obj.rightside_bind_liq);   
	            	$('.liquorTotalAmt').html(obj.liquor_premium); 
                    $('.liquor_rhs_head').show();
	            }else{
	            	$('.liquor_rhs_head').hide();
	            }  
	            if(obj.rightside_bind_ocp != ""){
		            $('.ocp_toggled_content').html(obj.rightside_bind_ocp);  
		            $('.ocpTotalAmt').html(obj.ocp_premium);  
                    $('.ocp_rhs_head').show();        
	            }else{
	            	$('.ocp_rhs_head').hide();
	            }   


                if(obj.oc_premium !== null){
                    $('.rhs_oc_premium').text(obj.oc_premium);
                } else {
                    $('.rhs_oc_premium').text('');
                }     

	            if(obj.ai_premium !== null){
                    $('.rhs_ai_premium').text(obj.ai_premium);
                } else {
                    $('.rhs_ai_premium').text('');
                }

                if(obj.common_premium !== null){
                    $('.rhs_common_premium').text(obj.common_premium);
                } else {
                    $('.rhs_common_premium').text('');
                }

                if(obj.all_forms_premium !== null){
                    $('.rhs_allforms_premium').text(obj.all_forms_premium);
                } else {
                    $('.rhs_allforms_premium').text('');
                }

                if(obj.manuscript_premium !== null){
                    $('.rhs_manuscript_premium').text(obj.manuscript_premium);
                } else {
                    $('.rhs_manuscript_premium').text('');
                }

                if(obj.tria_premium !== null){
                    $('.rhs_tria_premium').text(obj.tria_premium);
                } else {
                    $('.rhs_tria_premium').text('');
                }

                if(obj.commission !== null){
                    $('.rhs_commission').text(obj.commission);
                } else {
                    $('.rhs_commission').text('');
                }

                if(obj.total_premium !== null){
                    $('.rhs_total_premium').text(obj.total_premium);
                    $('.totalPremiumLabel').text(obj.total_premium);
                } else {
                    $('.rhs_total_premium').text('');
                }

                if(obj.total_commission !== null){
                    $('.rhs_total_commission').text(obj.total_commission);
                } else {
                    $('.rhs_total_commission').text('');
                }
                getAdditionalAcctPremium();
                updateQuoteNameBasedTotalPremium();
	                            
	      },
	      complete: function() {
	          
	      }

	    });
	}else{
		new PNotify({ title: 'Error', text: 'Quote Version Should not Empty', delay: 1500, type: 'error' });	
	}
}