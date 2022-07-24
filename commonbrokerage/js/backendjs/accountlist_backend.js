
// $(document).ready(function(){
var quote_total_premium = null;


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

setTimeout(function(){ 

$.ajax({
  url: laravel_url+"/getprimary_asignee",
  type:'get',
  // data:{accid:accid},
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
  success:function(response){
    $('.bind_primary_assignee').html('');
    $('.bind_primary_assignee').html(response);
    var loggeduserid = localStorage.getItem("usernumericid");
    $('#ac_tpass').val(loggeduserid);
  }
});

$.ajax({
  url: laravel_url+"/getsecondary_asignee",
  type:'get',
  // data:{accid:accid},
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
  success:function(response){
    $('.bind_secondary_assignee').html('');
    $('.bind_secondary_assignee').html(response);
    var loggeduserid = localStorage.getItem("usernumericid");
    $('#ac_tsass').val(loggeduserid);
  }
});


// Get brokerage list api

var dateversioning = Date.now();

$.ajax({
  url: laravel_url+"/getallbrokers?"+dateversioning,
  type:'get',
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
  success:function(response){
    $('.bind_brokers').html('');
    $('.bind_brokers').html(response);
  }
});

// Get brokerage for filter
$.ajax({
  url: laravel_url+"/getallbrokersfilter?"+dateversioning,
  type:'get',
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
  success:function(response){
    $('.bind_filter_brokers').html('');
    $('.bind_filter_brokers').html(response);

    // $('#filter_brokername').multiselect();
     $('#filter_brokername').multiselect({
       includeSelectAllOption : true,
       nonSelectedText: 'Please Select'
     });
    // $('.bind_filter_brokers .multiselect-selected-text').text('Select Broker');

  }
});

$.ajax({
  url: laravel_url+"/getprimary_asignee_filter",
  type:'get',
  // data:{accid:accid},
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
  success:function(response){
    $('.bind_filterprimary_assignee').html('');
    $('.bind_filterprimary_assignee').html(response);

    // $('#primary_assignee_filter').multiselect();
    // $('.bind_filterprimary_assignee .multiselect-selected-text').text('Select Assignee');
    $('#primary_assignee_filter').multiselect({
       includeSelectAllOption : true,
       nonSelectedText: 'Please Select'
     });

  }
});

$.ajax({
  url: laravel_url+"/getsecondary_asignee_filter",
  type:'get',
  // data:{accid:accid},
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
  success:function(response){
    $('.bind_filtersecondary_assignee').html('');
    $('.bind_filtersecondary_assignee').html(response);

    // $('#secondary_assignee_filter').multiselect();
    // $('.bind_filtersecondary_assignee .multiselect-selected-text').text('Select Assignee');
    $('#secondary_assignee_filter').multiselect({
       includeSelectAllOption : true,
       nonSelectedText: 'Please Select'
     });
  }
});

}, 1000);


function allsubmission_coverfn(){
	//submission_clear(); /*Commented by Gopi on 30sep21 V5 req
}

function allindication_coverfn(){
 
   getallindication_summary();
   if( $('#newNote_collapse').css('display') == 'block' ) {
        $('.indication_newnote_close_btn').hide();
        $('#newNote_collapse').hide();
        $('.indication_newnote_btn').show();
  } else {
     $('.indication_newnote_close_btn').hide();
        $('#newNote_collapse').hide();
        $('.indication_newnote_btn').show();
  }
   // getallindication_notes();
   // getallindication_emails();
   // getallindication_docs();
}

function allquote_coverfn(){
   getallquote_notes();
   if( $('#Q_newNote_collapse').css('display') == 'block' ) {
        $('.closequoteNoteBtn').hide();
        $('#Q_newNote_collapse').hide();
        $('.quoteNoteBtn').show();
  } else {
     $('.closequoteNoteBtn').hide();
        $('#Q_newNote_collapse').hide();
        $('.quoteNoteBtn').show();
  }
   // getallquote_majescourl();
   // getallquote_emails();
   // getallquote_docs();
}

function allbind_coverfn(){
   getallbind_notes();
   if( $('#b_newNote_collapse').css('display') == 'block' ) {
        $('.newnote_close_btn_bind').hide();
        $('#b_newNote_collapse').hide();
        $('.bindNoteBtn').show();
  } else {
     $('.newnote_close_btn_bind').hide();
        $('#b_newNote_collapse').hide();
        $('.bindNoteBtn').show();
  }
   // getallbind_majescourl();
   // getallbind_emails();
   // getallbind_docs();
}

function allissue_coverfn(){
   getallissue_notes();
   if( $('#I_newNote_collapse').css('display') == 'block' ) {
        $('.close_issueNoteBtn').hide();
        $('#I_newNote_collapse').hide();
        $('.issueNoteBtn').show();
  } else {
     $('.close_issueNoteBtn').hide();
        $('#I_newNote_collapse').hide();
        $('.issueNoteBtn').show();
  }
   // getallissue_majescourl();
   // getallissue_emails();
   // getallissue_docs();
}

function allpolicy_coverfn(){

  getmain_subcategory();

  $('.bind_archive_restore').html('');
  setTimeout(function(){ 
      var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');
      getpolicycategory(tabvalue);
  }, 1000);

  // getallpolicy_notes();

  reset_filedetails();
  reset_policynotes();
  gettaggedpage_lists();
  policyFileReset();

  // getall_email_doc_notes('submission');

   if( $('#PnewNote_collapse').css('display') == 'block' ) {
        $('.policynewnote_close_btn').hide();
        $('#PnewNote_collapse').hide();
        $('.policynewnote_btn_show').show();
  } else {
     $('.policynewnote_close_btn').hide();
        $('#PnewNote_collapse').hide();
        $('.policynewnote_btn_show').show();
  } 
   
   $('.policy_btn_collaps2').trigger('click');
   // $('#Po-list-sub-list').trigger('click');

   $('.hidePoliMenus').removeClass('d-block','slow');

   // getall_document_email_notes_count();
   $('#viewer').html('');
   // $('.colorPick').val('#ffffff');
   $('.color-holder').css('background-color','');
   $('.colorPick').val('');
   $('.colorEmptyDiv').show();
   $('.collapseBtn').click();
   menu_permission();
}

function policyFileReset(){
  $('#policyList .card-body').slideUp();
  $('.downTab').children('i').removeClass('fa-chevron-down text-warning');
  $('.cateAddSel option:first').prop('selected', true);
  $('.newCateDiv, .newSubCateDiv').slideUp();
  $('.sideFilesDiv, .sideNotesDiv, .colHide2, .viewerMaxICon').hide();
}

function refreshallmajescourls(){
  // getallquote_majescourl();
  // getallbind_majescourl();
  getallissue_majescourl();
}

function refreshallnotes(){
  getallaccount_notes();
  // getallindication_notes();
  // getallquote_notes();
  // getallbind_notes();
  // getallissue_notes();
  // getallpolicy_notes();
}

var parent_acc_id = null;
$(document).on('click','.getspecificaccount',function(){
	// var accid = $(this).data('accid');
  var acc_id = $(this).data('accid');
	var quick_accid = $(this).data('accid');
  var check_parent_child = 1;
  getspecificaccount(acc_id,check_parent_child);
  setTimeout(function(){ 
      $(document).find('.accountlist_section_div_hide').hide();
  }, 10);
  $('.filter_div').hide();
//  $('#ac_tname').focus();
$('.loader').show();

var quote_status = get_account_status(acc_id);
if(quote_status == 'new' || quote_status == 'quote' || quote_status == 'bind'){
    var qot_status = 1;
}else{
    var qot_status = 0;
}
if(qot_status ==1){
    var acct_id = $(this).attr('data-accid');
    check_primary_asignee(acct_id);
}
});


$(document).on('blur','#ac_tname',function(){

  var parentid  =  $('.session_hide_tab li').find('input').val();

    var ac_tname = $(this).val();
     //alert(parentid);
    if (ac_tname != '') {
        $.ajax({
            url: laravel_url+"/check_acc_name",
            type:'post',
            data:{ac_tname:ac_tname,parentid:parentid},
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(response){
                var obj = jQuery.parseJSON(response);
                if (obj.status == 'ok') {
                  new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
                }
            }
        });
    }else{
      new PNotify({ title: 'Error', text: 'Account Name is Empty', delay: 1500, type: 'error' });
    }
  // }

  
});


$(document).on('change','.getthisaccount',function(){
  // var accid = $(this).val();
  var acc_id = $(this).val();
  getspecificaccount(acc_id);
  setTimeout(function(){ 
      $(document).find('.accountlist_section_div_hide').hide();
  }, 10);
  $('.filter_div').hide();
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
  return m + "-" + d + "-" + y;
}

function getspecificaccount_rqbi(accid){

    $.ajax({
        url: laravel_url+"/getspecificaccount_rqbi",
        type:'post',
        data:{accid:accid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
          var obj = jQuery.parseJSON(response);
          $('#rqbiSubmission').html('');
          $('#rqbiSubmission').html(obj.opt);
        }
    });
}

function gettpa_data(accid,tpaval){

    $.ajax({
        url: laravel_url+"/gettpa_data",
        type:'post',
        data:{accid:accid,tpaval:tpaval},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
          var obj = jQuery.parseJSON(response);
          $('#rqbiTpaAddress').val('');
          $('#rqbiTpaContactName').val('');
          $('#rqbiTpaMobileNo').val('');
          $('#rqbiTpaEmailid').val('');

          $('#rqbiTpaAddress').val(obj.address);
          $('#rqbiTpaContactName').val(obj.contact_name);
          $('#rqbiTpaMobileNo').val(obj.mobile_no);
          $('#rqbiTpaEmailid').val(obj.email_id);

        }
    });
}


function setTriaValues(obj='') {
    
    $('#rqbiTriaPercAmount').removeAttr('readonly');
    $('#rqbiTriaAmount').removeAttr('readonly');
    $('#rqbiTriaPercAmount').val(obj.tria_percentage);
    //$('#rqbiTriaAmount').val(obj.tria_premium);    
    $('#rqbiTriaReject').removeAttr('checked');
    $('#rqbiTriaAccept').attr('checked',true);
}

function getspecificaccount(acc_id,check_parent_child){

  if(acc_id == 'parent'){
    var parentid = $('.session_hide_tab .ac_mainTabs').eq( 0 ).find('.accountid').val();
    acc_id = parentid;
  }
  accid = acc_id;
  localStorage.setItem("accid", acc_id);

  var count = check_parent_child; 
  count++;
  if(acc_id != ""){
     $.ajax({
        url: laravel_url+"/getspecificaccount",
        type:'post',
        data:{accid:acc_id,check_parent_child:check_parent_child},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){

        setTimeout(function(){ 
          var obj = jQuery.parseJSON(response);
          
        $('.session_hide_tab').find('.active').find('.accountid').val('');
        $('.session_hide_tab').find('.active').find('.accountid').val(obj.id);
        $('#ac_tname').val(obj.accountname);
        $('#hidden_id').val(accid);
        // $('#ac_tbroker').val(obj.broker);
        if (obj.broker == null){
          var selected_brok = '';
          $('.invalid_brok_alert').removeAttr('style').css('display','grid');
          $('#ac_tbroker').addClass('errorBorder');
          $('#ac_tbroker').val('');
        } else{
          var selected_brok = obj.broker;
          var brok_opt = $('#ac_tbroker option[value="'+selected_brok+'"]').length;
          if (brok_opt>0) {
            $('#ac_tbroker').val(selected_brok);
            var selected_brok_name = $('#ac_tbroker option[value="'+selected_brok+'"]').html();
            if (selected_brok_name != obj.broker_name) {
              $('#ac_tbroker option[value="'+selected_brok+'"]').html(obj.broker_name);
            }
          } else{
            var append_opt = "<option class='invalid_broker' value='' selected>"+obj.broker_name+"</option>";
            $('#ac_tbroker').append(append_opt);
          }
        }
        
        // $('#ac_tbroker').val(selected_brok);
        $('#ac_ttype').val(obj.accounttype);
        $('#singleselect').val(obj.lob);
        $('#ac_tstatus').val(obj.accountstatus);
        $('#ac_tpass').val(obj.primary_assignee);
        $('#ac_tsass').val(obj.secondary_assignee);
        $('#ac_tpri').val(obj.priority);
        $('#ac_tipre').val(obj.indication_premium);
        $('#ac_tqpre').val(obj.quote_premium);
        $('#business_unit').val(obj.business_unit);
        $('#brokerageDba').val(obj.dba);
        $('#insuredType').val(obj.insured_type);
        $('#businessDescription').val(obj.business_description);
        $('#njTransaction').val(obj.nj_transaction);
        $('#pg_policyNumber').val(obj.program_policy_number)

        var submission_number = obj.submission_number;
                if(obj.policy_number != null) {
                  submission_number = obj.policy_number;
                  $('#sub_text').html('Policy # : <strong>'+submission_number+'</strong>');
                  $('#policy_no').text(submission_number);
                } else {
                  $('#sub_text').html('Submission # : <strong>'+submission_number+'</strong>');
                  $('#sub_number').text(submission_number);
                }

        menu_permission();


        if (obj.insured_type_other != null) {
          $('.insuredtype_other_div').show();
          $('.insuredType_Other').val(obj.insured_type_other)
        } else{
          $('.insuredType_Other').val('')
          $('.insuredtype_other_div').hide();
        } 

        $('.primary_log_details_remove_btn').click();

        
        if (obj.acc_effective_date != null) {
        $('#effect_dt').datepicker('setDate', formatedate(obj.acc_effective_date));
        } else{
        $('#effect_dt').datepicker("setDate", null);
        } 

        if (obj.acc_expiry_date != null) {
        $('#expire_dt').datepicker('setDate', formatedate(obj.acc_expiry_date));
        }else{
          $('#expire_dt').datepicker("setDate", null);
        }



        $('#ac_mailAdd').val(obj.acc_address);
        $('#ac_mailAdd_zip').val(obj.acc_zip);

        if (obj.acc_city != '') {
            append_city1_retrival(obj.acc_zip,obj.acc_city);
            isopricing_mail(accid);
        }


        if (obj.child_accountid == null) {
            getchildaccount(obj.id);
        }

        // $('#ac_mailAdd_city').val(obj.acc_city);
        $('#ac_mailAdd_state').val(obj.acc_state);
        $('#ac_quteNo').val(obj.quote_number);
        $('#ac_poliNo').val(obj.policy_number);

        var indval = $('#rqbiSubmission').val();
        if (indval != 0) {
          
        } else {
           
            
            var rqbitab = setInterval (function () {
                $('#pills-rqbi-tab').trigger('click');
                clearInterval(rqbitab);
            },200);
        }

          if (obj.business_segment == null) {
            $("#business_segment option:first").prop('selected', true);
          }else{
            $('#business_segment').val(obj.business_segment);
          }
          
          $('#acc_crdate').text(formatedate(obj.createdate)); 

          var archivebindval = '';
          var action_reason = '';
          if(obj.action_reason !== null) {
             action_reason = obj.action_reason;
          } else {
             action_reason = 'Deleted';
          }
          
          if (obj.is_lost == 1) {
            archivebindval = 'Lost';
          }
          else if (obj.is_lost == 2) {
            archivebindval = 'Declined';
          }
          else if (obj.is_lost == 3) {
            archivebindval = 'Cancel';
          }
          else if (obj.is_lost == null && obj.status == 1) {
            archivebindval = 'Deleted';

          }

          if(archivebindval != '') {

            var archived_date = obj.deleted_on;

            if(archived_date !== null) {
              var archived_date_spl = archived_date.split(' '); 
              var month_day_year_spl = archived_date_spl[0].split('-');
              var month_day_year = month_day_year_spl[1]+'/'+month_day_year_spl[2]+'/'+month_day_year_spl[0];
              $('.archivebindval').text('');
              $('.archivebindval').html('<span class="fontweight500">'+archivebindval+':</span> '+month_day_year+' ('+action_reason+')' );
            } else {
              $('.archivebindval').text(''); 
            }

          } else {
              $('.archivebindval').text(''); 
          }
          
          

          // $('.archivebindval').text('');
          // $('.archivebindval').text(archivebindval);



          $('.user').show();
          $('.qid').show();

          $('.bindacc_nametop').html('');
          $('.bindbroker_nametop').html('');
		      $('.bindquoteid_top qid').html('');
          $('.bindacc_nametop').html(": <b>"+obj.accountname+"</b>");
          $('.bindbroker_nametop').html(": <b>"+obj.broker_name+"</b>");
		  var chek_quote_id=obj.quote_id;
		  if(chek_quote_id!=null && chek_quote_id!=''){
			  $('.bindquoteid_top').html(": <b>"+chek_quote_id+"</b>");
		  }else{
			  $('.bindquoteid_top').html('');
		  }
		  
          var childmounthyear = obj.acc_effective_date;
          if(childmounthyear != null){
            var childmonth = obj.acc_effective_date.split('-');
            
          if (childmonth[1] == '01') { tabmonth = 'Jan'}
          if (childmonth[1] == '02') { tabmonth = 'Feb'}
          if (childmonth[1] == '03') { tabmonth = 'Mar'}
          if (childmonth[1] == '04') { tabmonth = 'Apr'}
          if (childmonth[1] == '05') { tabmonth = 'May'}
          if (childmonth[1] == '06') { tabmonth = 'Jun'}
          if (childmonth[1] == '07') { tabmonth = 'Jul'}
          if (childmonth[1] == '08') { tabmonth = 'Aug'}
          if (childmonth[1] == '09') { tabmonth = 'Sep'}
          if (childmonth[1] == '10') { tabmonth = 'Oct'}
          if (childmonth[1] == '11') { tabmonth = 'Nov'}
          if (childmonth[1] == '12') { tabmonth = 'Dec'}

             $('.session_hide_tab').find('.active').find('.bind_monthyear').text(tabmonth+'-'+childmonth[0]);
          }else{
           
             $('.session_hide_tab').find('.active').find('.bind_monthyear').text("TBD-"+ new Date().getFullYear());
          }
          
          $('.session_hide_tab').find('.active').find('.bind_monthyear').data('monthyearval',obj.monthyeartab);

          $('#submit_btn1').text('Update');

		  
		  var specific_person_hideshow = ['asic.underwriter1@gmail.com'];

			var specific_diable_style = '';
			if ( $.inArray( localStorage.getItem('userid'), specific_person_hideshow )!='-1' ) {
				$('#submit_btn1').attr('disabled','disabled');
			}else{
				$('#submit_btn1').removeAttr('disabled');
			}

          /*  $("#multiselect").multiselect("clearSelection");


        if (obj.lob == null ) {
          $('#multiselect').multiselect('deselect',['GL']);
        }else{


         var multival = obj.lob.split(',');
       
       if(multival.length!=0)
       {
         $('#multiselect').multiselect('deselect',['GL']);
       }
          for (var i = 0; i < multival.length; i++) {

            if (multival[i] == 'GL') {
             
              $('#multiselect').multiselect('select',multival[i]);

            }

            if (multival[i] == 'DBD') {
              $('#multiselect').multiselect('select',multival[i]);
            }

            if (multival[i] == 'IM') {
              $('#multiselect').multiselect('select',multival[i]);
            }

            if (multival[i] == 'Crime') {
              $('#multiselect').multiselect('select',multival[i]);
            }

            if (multival[i] == 'PrimaryProperty') {
              $('#multiselect').multiselect('select',multival[i]);  
            }

            if (multival[i] == 'XSLiability') {
               $('#multiselect').multiselect('select',multival[i]);
            }

            if (multival[i] == 'XSProperty') {
              $('#multiselect').multiselect('select',multival[i]);
            }

          }

        } */

          //$('#pills-tab li:first-child a').tab('show');

          $('#account_list_add_btn').trigger('click');
          $('.alert_hiddenval').val('');

          getallaccount_notes();

          $('.session_hide_tab li:not(:last-child)').not('.ac_mainTabs_loader').remove();

          getspecificaccount_recent_quoteid(accid);
          
          $("ac_tname").focus();
         // $('#sub_number').focus();
          $('.addTabnav').show();
          $('.delTab').hide();
          get_quote_version_status();
          setTimeout(function(){ $('.loader').hide(); }, 3000);
          if(count == 2){
          getspecificaccount(accid);
            if(obj.id != accid){
              setTimeout(function(){
                $('.parentclass').removeClass('active');
                $('[data-child="'+accid+'"]').find('a').addClass('active');
                
              },500);
            }
          }
          }, 1000);

         

        }
    });
}

    if($('#pills-rqbi-tab').hasClass('active')) {

          $('#pills-rqbi-tab').click();
    }
    
    
    $('.rqbi_rhspane_section').hide();
    $('.rqbi_according_section').addClass('col-md-12');
    $('.rqbi_according_section').removeClass('col-md-10');
    $('.composite_class_code_div').removeClass('col-md-4');
    $('.composite_class_code_div').addClass('col-md-5');
    $('.quote_policy_details_btn').show();
    getallsubmission_pdf(accid);

    setTimeout(function(){
      updateQuoteNameBasedTotalPremium();
    },500);
    if ($('#singleselect').val()=='XSLiability') {
        xl_lob_change = true;
    } else {
        xl_lob_change = false;
    }  
}
function getspecificaccount_recent_quoteid(accid){
      $.ajax({
          url: laravel_url+"/getspecificaccount_recent_quoteid",
          type:'post',
          data:{accid:accid},
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success:function(response){
              var obj = jQuery.parseJSON(response);
              if (obj) {
                  $('.bindquoteid_top').html('');
                  $('.bindquoteid_top').html(obj.majesco_transaction_id);
                }else{
                  $('.bindquoteid_top').html('');
                }
          }
      });
}

function getchildaccount(accid){
      $.ajax({
          url: laravel_url+"/getchildaccount",
          type:'post',
          data:{accid:accid},
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success:function(response){
            // $('.addTab').closest('li').before('');
            $('.session_hide_tab li:not(:first-child):not(:last-child)').remove();
            $('.addTab').closest('li').before(response);
          }
      });
}


function check_accountid_monthyear(accountid,renwal_monthyear){
    $.ajax({
        url: laravel_url+"/check_accountid_monthyear",
        type:'post',
        data:{accountid:accountid,renwal_monthyear:renwal_monthyear},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
          var obj = jQuery.parseJSON(response);

            if (obj!= null) {
              getspecificaccount(obj.id);
            }
            
        }
    });
}

function getparentaccount(accid){
      $.ajax({
          url: laravel_url+"/getparentaccount",
          type:'post',
          data:{accid:accid},
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success:function(response){

            if (response) {
              $('.childaccount_div').show();
              $('.bind_childname').html('');
              $('.bind_childname').html('Main Account');

              $('.bind_childaccounts').html('');
              $('.bind_childaccounts').html(response);
            }else{
              $('.childaccount_div').hide();
              $('.bind_childname').html('');
              $('.bind_childaccounts').html('');
            }

              
          }
      });
}

// function getlatestchild_account(accid){
//       $.ajax({
//           url: laravel_url+"/getlatestchild_account",
//           type:'post',
//           data:{accid:accid},
//           headers: {
//               'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//           },
//           success:function(response){
//             var obj = jQuery.parseJSON(response);

//             if (obj!= null) {
              // alert('child1');
//               getspecificaccount(obj.id);
//             }else{
              // alert('child2');
//               getspecificaccount(accid);
//             }

            
//           }
//       });
// }



function getall_document_email_notes_count(){
  $('.loader').show();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
    $.ajax({
        url: laravel_url+"/getall_document_email_notes_count",
        type:'post',
        data:{accid:accid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
          var obj = jQuery.parseJSON( response);
          $('.sub_policy_count').html('');    
          $('.sub_policy_count').html(obj.submission); 

          $('.ind_policy_count').html('');    
          $('.ind_policy_count').html(obj.indication);  

          $('.quote_policy_count').html('');    
          $('.quote_policy_count').html(obj.quote); 

          $('.bind_policy_count').html('');    
          $('.bind_policy_count').html(obj.bind); 

          $('.tria_policy_count').html('');    
          $('.tria_policy_count').html(obj.tria); 

          $('.poli_policy_count').html('');    
          $('.poli_policy_count').html(obj.policy); 

          $('.endro_policy_count').html('');    
          $('.endro_policy_count').html(obj.endorsement); 

          $('.sov_policy_count').html('');    
          $('.sov_policy_count').html(obj.sov);

          $('.insp_policy_count').html('');    
          $('.insp_policy_count').html(obj.inspection);

          $('.prem_policy_count').html('');    
          $('.prem_policy_count').html(obj.premiumaudit);

          $('.reins_policy_count').html('');    
          $('.reins_policy_count').html(obj.reinsurance);

          $('.general_policy_count').html('');    
          $('.general_policy_count').html(obj.general);

          $('.claim_policy_count').html('');    
          $('.claim_policy_count').html(obj.claims);

          $('.renewal_policy_count').html('');    
          $('.renewal_policy_count').html(obj.renewal);

          $('.pay_policy_count').html('');    
          $('.pay_policy_count').html(obj.payments);


          var alltotalcount = obj.submission + obj.indication + obj.quote + obj.bind + obj.tria + obj.policy + 
          obj.endorsement + obj.sov + obj.inspection + obj.premiumaudit + obj.reinsurance + obj.general  + obj.claims  + obj.renewal  + obj.payments ;

          $('.all_files_count').html('');
          $('.all_files_count').html(alltotalcount);


        }
    });
    $('.loader').fadeOut('slow');
}

function checkaccount_selected(){
  // var heig = $('#submissionpdf').height(); 
  // var wid = $('#submissionpdf').width(); 
  //    $('.backdrop').width(wid);
  //    $('.backdrop').height(heig);
  

  var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
  if (accountid == '') {
     //alert('empty1');
    $('#submissionpdf').css('pointer-events','none');
    $('.backdrop_div').addClass('backdrop_account');
    $('.freezee_bg_div').addClass('freezee_bg');
    $('.backdrop_account').show();
    $('.need_aacount_title').removeClass('display_none');
    //$('.session_hide_tab').find('.active').find('.bind_monthyear').text(getmonthyear());
    $('.session_hide_tab').find('.active').find('.bind_monthyear').text("TBD-"+ new Date().getFullYear());
    $('.session_hide_tab').find('.active').find('.bind_monthyear').attr('data-monthyearval',getnumbermonthyear());
    $('#submit_btn1').text('Create');

    var loggeduserid = localStorage.getItem("usernumericid");
    $('#ac_tpass').val(loggeduserid);
    $('#ac_tsass').val(loggeduserid);

  }else{
     //alert('not empty1');
    $('#submissionpdf').css('pointer-events','unset');
    $('.backdrop_div').removeAttr('style');
    $('.backdrop_div').removeClass('backdrop_account');
    $('.freezee_bg_div').removeClass('freezee_bg');
    $('.need_aacount_title').addClass('display_none');
    get_tbd_tab_name(accountid);
    check_program_account(accountid);
  }

}



$(document).on('click','.savenotes',function(){
  if(event.detail === 0 || event.detail === 1) {
    var userid = localStorage.getItem('userid');
    var username = localStorage.getItem('username');
    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var vat = $(this).closest('.topnotediv').find('.vat').val();
    var btntype = $(this).attr('data-notebtn');
    var qleditor = '';

    if( btntype == 'account_note_savebtn' ) {

      qleditor =  $('.account_note_editor .ql-editor').text();

    } else {

      qleditor = $('.ad_note_editor .ql-editor').text();

    }

    var type_notes = $(this).closest('.topnotediv').find('.type_notes').val();
    var selectcategory = $(this).closest('.topnotediv').find('.selectcategory').val();
    var notes_date = $(this).closest('.topnotediv').find('.notes_date').val();

    if (selectcategory == undefined) {
      selectcategory = 'account';
    }else{
      selectcategory = selectcategory;
    }

    var descriptionval1 =$(this).closest('.topnotediv').find('.ql-container').attr('id');

    var descriptionval = $('#'+descriptionval1).text();

    if (descriptionval != '' && type_notes != '' && vat != ''  && notes_date != '') {
      var date_valid = 1;
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      var current_date = mm+'-'+dd+'-'+yyyy;

      if (new Date(notes_date) < new Date(current_date)) {
        date_valid = 0;
      }

      if (date_valid == 1) {
        $(this).closest('.topnotediv').find('.notes_date').removeClass('redBorder');
        $.ajax({
          url: laravel_url+"/savenotes",
          type:'post',
          data:{accountid:accountid,userid:userid,vat:vat,qleditor:qleditor,type_notes:type_notes,selectcategory:selectcategory,username:username,notes_date:notes_date},
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success:function(response){
              var obj = jQuery.parseJSON(response);
              if (obj.status == 'ok') {
                 refreshallnotes();
                  new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
                  $('.pollicytesting').trigger('click');
                  // getall_document_email_notes_count();
              }else{
                  new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
              }
              $('.savenotes').closest('.topnotediv').find('.selectcategory option:first').attr('selected',true);
              $('.savenotes').removeAttr('disabled');

              $('.account_type_newnote').hide();
              $('.new_notesbtn').show();

              $('.new_note_name, .type_notes, .account_note_editor .ql-editor, .ad_note_editor .ql-editor, .account_selectcategory').removeClass('redBorder').removeAttr('style');
          }
        });
      }else {
        $(this).closest('.topnotediv').find('.notes_date').addClass('redBorder');
        new PNotify({ title: 'Error', text: 'Cannot set past date', delay: 1500, type: 'error' });
      }
      
    }else{
        if(qleditor == '') {
            if( btntype == 'account_note_savebtn' ) {
                $('.account_note_editor .ql-editor').css('border', '1px solid red');
            } else {
                $('.ad_note_editor .ql-editor').css('border', '1px solid red');
            }
        } else {
            if( btntype == 'account_note_savebtn' ) {
                $('.account_note_editor .ql-editor').removeAttr('style');
            } else {
                $('.ad_note_editor .ql-editor').removeAttr('style');
            }
        }

        if(type_notes == '') {
            $(this).closest('.topnotediv').find('.type_notes').addClass('redBorder');
        } else {
            $(this).closest('.topnotediv').find('.type_notes').removeClass('redBorder');
        }        

        if(vat == '') {
            $(this).closest('.topnotediv').find('.vat').addClass('redBorder');
        } else {
            $(this).closest('.topnotediv').find('.vat').removeClass('redBorder');
        }        

        if(btntype == 'ad_note_savebtn') {
            setTimeout( function() {
                if(selectcategory == '') {
                    $('.account_selectcategory').addClass('redBorder');
                } else {
                    $('.account_selectcategory').removeClass('redBorder');
                }
            },1500);
        }
        new PNotify({ title: 'Error', text: 'Fields should not be Empty', delay: 1500, type: 'error' });
        $('.savenotes').removeAttr('disabled');
    }

    $('.policy_tab_active').removeClass('policy_sidemenu_btn');
  }
});

function getallindication_notes(){
    $('.loader').show();
    resetnoteform();
    $('.indication_selectcategory').val('indication');

    $('.notes_date').val(getcurrentdate());    

    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();

    var table = $('#notes_accIndi_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getnotes/indication/"+accountid+"",
        "columns": [
          // { "data": "id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.createddate);
           }
          },
          {
           "render": function(data, type, row) {
              if (row.subjectname) {
                return row.subjectname;
              }else{
                return row.content;
              }
           }
          },
          { "data": "username" },
          // { "data": "note_type_text" },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0);" class="getspecific_notes" data-noteid="'+row.id+'" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> | '+
            '<a href="javascript:void(0);" '+specific_diable_style+' onclick="deletenotes_popup('+row.id+')" data-notetype="indication" data-noteid="'+row.id+'" ><i class="fa fa-trash color_red" aria-hidden="true"></i></a>';
           }
          },
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });

    datatable_sifn(table);


    if( $('#newNote_collapse').css('display') == 'block' ) {
        $('.indication_newnote_close_btn').hide();
        $('#newNote_collapse').hide();
        $('.indication_newnote_btn').show();
  } else {
     $('.indication_newnote_close_btn').hide();
        $('#newNote_collapse').hide();
        $('.indication_newnote_btn').show();
  }
  $('.loader').fadeOut('slow');
}

function getallquote_notes(){
    $('.loader').show();
    resetnoteform();

    $('.quote_selectcategory').val('quote');

    $('.notes_date').val(getcurrentdate());    

    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#quote_accIndi_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getnotes/quote/"+accountid+"",
        "columns": [
          // { "data": "id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.createddate);
           }
          },
          {
           "render": function(data, type, row) {
              if (row.subjectname) {
                return row.subjectname;
              }else{
                return row.content;
              }
           }
          },
          { "data": "username" },
          // { "data": "note_type_text" },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0);" class="getspecific_notes" data-noteid="'+row.id+'" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> | '+
            '<a '+specific_diable_style+' href="javascript:void(0);" data-notetype="quote" onclick="deletenotes_popup('+row.id+')" data-noteid="'+row.id+'" ><i class="fa fa-trash color_red" aria-hidden="true"></i></a>';
           }
          },
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });

    datatable_sifn(table);


    if( $('#Q_newNote_collapse').css('display') == 'block' ) {
        $('.closequoteNoteBtn').hide();
        $('#Q_newNote_collapse').hide();
        $('.quoteNoteBtn').show();
  } else {
     $('.closequoteNoteBtn').hide();
        $('#Q_newNote_collapse').hide();
        $('.quoteNoteBtn').show();
  }
$('.loader').fadeOut('slow');
}

function getallbind_notes(){
  $('.loader').show();
  resetnoteform();
   
  $('.bind_selectcategory').val('bind');
  $('.notes_date').val(getcurrentdate());
  var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#bind_accIndi_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getnotes/bind/"+accountid+"",
        "columns": [
          // { "data": "id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.createddate);
           }
          },
          {
           "render": function(data, type, row) {
              if (row.subjectname) {
                return row.subjectname;
              }else{
                return row.content;
              }
           }
          },
          { "data": "username" },
          // { "data": "note_type_text" },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0);" class="getspecific_notes" data-noteid="'+row.id+'" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> | '+
            '<a '+specific_diable_style+' href="javascript:void(0);" data-notetype="bind" onclick="deletenotes_popup('+row.id+')" data-noteid="'+row.id+'" ><i class="fa fa-trash color_red" aria-hidden="true"></i></a>';
           }
          },
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });
    datatable_sifn(table);

    if( $('#b_newNote_collapse').css('display') == 'block' ) {
        $('.newnote_close_btn_bind').hide();
        $('#b_newNote_collapse').hide();
        $('.bindNoteBtn').show();
  } else {
     $('.newnote_close_btn_bind').hide();
        $('#b_newNote_collapse').hide();
        $('.bindNoteBtn').show();
  }
  $('.loader').fadeOut('slow');
}

function getallissue_notes(){
  $('.loader').show();
  resetnoteform();

  $('.issue_selectcategory').val('issue');
  $('.notes_date').val(getcurrentdate());
    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#issue_accIndi_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getnotes/issue/"+accountid+"",
        "columns": [
          // { "data": "id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.createddate);
           }
          },
          {
           "render": function(data, type, row) {
              if (row.subjectname) {
                return row.subjectname;
              }else{
                return row.content;
              }
           }
          },
          { "data": "username" },
          // { "data": "note_type_text" },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0);" class="getspecific_notes" data-noteid="'+row.id+'" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> | '+
            '<a '+specific_diable_style+' href="javascript:void(0);" data-notetype="issue" onclick="deletenotes_popup('+row.id+')" data-noteid="'+row.id+'" ><i class="fa fa-trash color_red" aria-hidden="true"></i></a>';
           }
          },
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });

    datatable_sifn(table);

    if( $('#I_newNote_collapse').css('display') == 'block' ) {
        $('.close_issueNoteBtn').hide();
        $('#I_newNote_collapse').hide();
        $('.issueNoteBtn').show();
  } else {
     $('.close_issueNoteBtn').hide();
        $('#I_newNote_collapse').hide();
        $('.issueNoteBtn').show();
  }
  $('.loader').fadeOut('slow');
}


function getallaccount_notes(){
  $('#side_note_editor .ql-editor').blur().removeClass('editor_focus');
  
  resetnoteform();

  // $('.account_selectcategory').val('account');
  $('.notes_date').val(getcurrentdate());
  //$('#accnotescover').show();
  var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();

    var table = $('#accountNotesTable').DataTable({
        "bLengthChange": true,
        "bPaginate": false,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getnotes/account/"+accountid+"",
        "columns": [
          // { "data": "id" },
          // {  "render": function(data, type, row) {  return '';   }    },
          { "data": "editedby", "class": "details-control" },
          {
           "render": function(data, type, row) {
            return formatedate(row.createddate);
           }
          },
          { "data": "subjectname" },
          { "data": "note_type_text" },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0);" class="getspecific_notes" data-noteid="'+row.id+'" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> '+
            '<a '+specific_diable_style+' href="javascript:void(0);" class="accNotesDelete" data-notetype="account" onclick="deletenotes_popup('+row.id+')" data-noteid="'+row.id+'" ><i class="fa fa-trash color_red" aria-hidden="true"></i></a>';
           }
          },
        ],
        "fnRowCallback": function() {
          setTimeout(function(){
            $('#accountNotesTable tbody').find('.details-control').each(function() { 
              var tr = $(this).parents('tr');
              var detailsRow = table.row(tr);
              detailsRow.child( format(detailsRow.data()) ).show();
            });
            
            $('.note_desc').each(function(element){
              var th = $(this);
              th.addClass('reducePara');
              if(th.height() > 60 ){
                th.after('<a href="javascript:void(0);" class="note_descShow"> Read more </a>'); 
              }
              th.removeClass('reducePara');
            });

            $('#accnotescover').hide();

          },1000);
          
        },
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          menu_permission();
          $('.loader').fadeOut('slow');
        }
    });

    // datatable_sifn(table);
//    $('#ac_tname').focus();
}

function format(d) {
  return '<table class="notesdesctable" cellpadding="6" cellspacing="0" border="0" class="width100_perc"  style="border-bottom: 1px solid #c7cbd5;" >'+
        '<tr>'+
            '<td colspan="5" class="note_desc"> '+ d.content +'</td>'+
        '</tr>'+
    '</table>';
}

$(document).on('click', '.note_desc', function() {
  if ($(this).hasClass('reducePara')) {
    $(this).removeClass('reducePara');
    $(this).closest('tr').find('.note_descShow').text('Read more').removeClass('note_descLess');
  } else {
    $(this).addClass('reducePara');
    $(this).closest('tr').find('.note_descShow').text('Read less').addClass('note_descLess');
  }
});
$(document).on('click','.note_descShow',function(){
  if ($(this).hasClass('note_descLess')) {
    $(this).closest('tr').find('.note_desc').removeClass('reducePara');
    $(this).text('Read more');
    $(this).removeClass('note_descLess');
  } else {
    $(this).closest('tr').find('.note_desc').addClass('reducePara');
    $(this).text('Read less');
    $(this).addClass('note_descLess');
  }
});

function getallpolicy_notes(){

$('.loader').show();
  resetnoteform();
  $('.policy_selectcategory').val('policy');
  var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#policy_note_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getnotes/policy/"+accountid+"",
        "columns": [
          // { "data": "id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.createddate);
           }
          },
          {
           "render": function(data, type, row) {
              if (row.subjectname) {
                return row.subjectname;
              }else{
                return row.content;
              }
           }
          },
          { "data": "username" },
          // { "data": "note_type_text" },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0);" class="getspecific_notes" data-noteid="'+row.id+'" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> | '+
            '<a href="javascript:void(0);" data-notetype="policy" onclick="deletenotes_popup('+row.id+')" data-noteid="'+row.id+'" ><i class="fa fa-trash color_red" aria-hidden="true"></i></a>';
           }
          },
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });

    datatable_sifn(table);
    $('.loader').fadeOut('slow');
}


function deletenotes_popup(note_id){
  $('.hiddennoteid').val('');
  $('.hiddennoteid').val(note_id);
  $('.trigger_notes_todelete').trigger('click');
  $('#side_note_editor .ql-editor').blur().removeClass('editor_focus');
}

$(document).on('click','.deletenotes',function(){

    var noteid = $('.hiddennoteid').val();
    // var accid = localStorage.getItem('accid');
    // var accid = accid;
    $.ajax({
        url: laravel_url+"/deletenotes",
        type:'post',
        data:{noteid:noteid,accid:accid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              refreshallnotes();
              $('.pollicytesting').trigger('click');
              getall_document_email_notes_count();
              new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
            }else{
              new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
            }
        }
    });
});


$(document).on('click','.updatenotes',function(){
    
    var userid = localStorage.getItem('userid');
    // var accid = localStorage.getItem('accid');
    // var accid = accid;
    var username = localStorage.getItem('username');
    var updatenoteid = $('.updatenoteid').val();
    var vat = $(this).closest('.topnotediv').find('.vat').val();
    var qleditor = $(this).closest('.topnotediv').find('.ql-editor').html();
    var type_notes = $(this).closest('.topnotediv').find('.type_notes').val();
    var notes_date = $(this).closest('.topnotediv').find('.notes_date').val();
    var selectcategory = $(this).closest('.topnotediv').find('.selectcategory').val();

    var descriptionval1 =$(this).closest('.topnotediv').find('.ql-container').attr('id');

    var descriptionval = $('#'+descriptionval1).text();

    if (selectcategory == undefined) {
      selectcategory = 'account';
    }else{
      selectcategory = selectcategory;
    }


    if (descriptionval != '' && type_notes != '' && vat != ''  && notes_date != '') {
      var date_valid = 1;
      var saved_note_date = check_notedate_valid(accid, updatenoteid);
      if (new Date(notes_date) < new Date(saved_note_date)) {
        date_valid = 0;
      }
      if (date_valid == 1) {
        $(this).closest('.topnotediv').find('.notes_date').removeClass('redBorder');
        $.ajax({
          url: laravel_url+"/updatenotes",
          type:'post',
          data:{accid:accid,updatenoteid:updatenoteid,vat:vat,qleditor:qleditor,type_notes:type_notes,selectcategory:selectcategory,userid:userid,username:username,notes_date:notes_date},
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success:function(response){
              var obj = jQuery.parseJSON(response);

              if (obj.status == 'ok') {
                  refreshallnotes();
                  $('.pollicytesting').trigger('click');
                  // getall_document_email_notes_count();
                  new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
              }else{
                  new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
              }

              $('.account_type_newnote').hide();
              $('.new_notesbtn').show();
          }
        });
      } else {
        $(this).closest('.topnotediv').find('.notes_date').addClass('redBorder');
        new PNotify({ title: 'Error', text: 'Cannot set past date', delay: 1500, type: 'error' });
      }
      
    }else{
      new PNotify({ title: 'Error', text: 'Fields should not be Empty', delay: 1500, type: 'error' });
    }

    $('.policy_tab_active').removeClass('policy_sidemenu_btn');
    
});


$(document).on('click','.getspecific_notes',function(){
    $('#side_note_editor .ql-editor').blur().removeClass('editor_focus');
    $('.notes_date').removeClass('redBorder');
    var noteid = $(this).data('noteid');  
    // var accid = localStorage.getItem('accid');
    // var accid = accid;
    $('.indication_newnote_btn').trigger('click');
    $('.quoteNoteBtn').trigger('click');
    $('.bindNoteBtn').trigger('click');
    $('.issueNoteBtn').trigger('click');
    $('.policynewnote_btn_show').trigger('click');
    $.ajax({
        url: laravel_url+"/getspecific_notes",
        type:'post',
        data:{noteid:noteid,accid:accid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
          var obj = jQuery.parseJSON(response);
          $('.vat').val(obj.subjectname);
          $('.type_notes').val(obj.note_type_text);
          // var data = obj.content;

          // Convert the string to bytes
          // var bytes = new Uint8Array(data.length / 2);

          // for (var i = 0; i < data.length; i += 2) {
          //     bytes[i / 2] = parseInt(data.substring(i, i + 2),  base =  16);
          // }

          // // Make a Blob from the bytes
          // var blob = new Blob([bytes]);

          // // Use createObjectURL to make a URL for the blob
          // var image = new Image();
          // image.src = URL.createObjectURL(blob);
          // document.body.appendChild(image);
          $('.ql-editor').html(obj.content);
         // $('.ql-editor').html(obj.content);
          // var notes_date = obj.createddate;
          // var notes_dates = notes_date.split(" ");
          // var notes_date_spl = notes_dates[0].split("-");
          // var notes_date_new = notes_date_spl[2]+'-'+notes_date_spl[1]+'-'+notes_date_spl[0];
          // $('.notes_date').val(notes_date_new);

          var notes_date = formatedatepicker_mdy(obj.createddate);
          $(".notedte").datepicker('remove');

          $(".notedte").datepicker({ 
              autoclose: true,
              format: 'mm-dd-yyyy',
              // startDate: notes_date
          });
          
          $('.notedte').datepicker('setDate', notes_date);
          $('.notes_date').val(notes_date);

          $(".notedte").datepicker().on("changeDate", function (e) {
            $('.notes_date').removeClass('redBorder');
          });

          $('.savenote_div').hide();
          $('.updatenote_div').show();
          $('.updatenoteid').val(obj.id);

          if (obj.type == 'indication') {
             if ($('.newnote_btn').attr('aria-expanded') == 'false') {
               $('.indication_newnote_btn').trigger('click');
             }
           }else if (obj.type == 'quote') {
             if ($('.quoteNoteBtn').attr('aria-expanded') == 'false') {
               $('.quoteNoteBtn').trigger('click');
             }
           }else if (obj.type == 'bind') {
             if ($('.bindNoteBtn').attr('aria-expanded') == 'false') {
               $('.bindNoteBtn').trigger('click');
             }
           }else if (obj.type == 'issue') {
             if ($('.issueNoteBtn').attr('aria-expanded') == 'false') {
               $('.issueNoteBtn').trigger('click');
             }
           }else if (obj.type == 'account') {
             $('.account_type_newnote').show();
           }else{
             if ($('.newnote_btn').attr('aria-expanded') == 'false') {
               $('.policynewnote_btn_show').trigger('click');
             }
         }
         $('.new_notesbtn').hide();
         $('.vat').focus();
          $('html, body').animate({
            scrollTop: $('.account_type_newnote').offset().top-120
          }, 800);
        }
    });
    
});

function resetnoteform(status=''){
  $('.vat').val('').removeClass('redBorder');
  $('.type_notes').val('').removeClass('redBorder');
  $('.ql-editor').html('').removeClass('redBorder');
  $('.updatenoteid').val('').removeClass('redBorder');
  $('.notes_date').val(getcurrentdate());

  $('.savenote_div').show();
  $('.updatenote_div').hide(); 
  $('.account_type_newnote').hide();
  $('.new_notesbtn').show();

  if(status != '') {
    $('html, body').animate({
            scrollTop: $('#pills-accNotes').offset().top-120
  }, 800);
  }

}

// $('.newnote_btn').click(function() {
//   if($('#PnewNote_collapse').hasClass('show')) {
//     $('.newnote_close_btn').hide();
//   } else {
//     $('.newnote_close_btn').show();
//   }
// });


// $('.newnote_btn').click(function() {
//   if($('#newNote_collapse').hasClass('show')) {
//     $('.newnote_close_btn').hide();
//   } else {
//     $('.newnote_close_btn').show();
//   }
// });


// Majesco URL

function getallquote_majescourl(){
    $('.urlval').val('');
    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#quote_majexcourl').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getmajescourls/quote/"+accountid+"",
        "columns": [
          // { "data": "id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            var str1 = row.urls;
            var str2 = "http";
            if(str1.indexOf(str2) != -1){
                return "<a href='"+row.urls+"' target='_blank'>"+row.urls+"</a>";
            }else{
                return "<a href='//"+row.urls+"' target='_blank'>"+row.urls+"</a>";
            }
           }
          },
          {
           "render": function(data, type, row) {
            // return  '<a href="javascript:void(0);" class="getspecific_majescourls" data-urlid="'+row.id+'" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> | '+
              return '<a '+specific_diable_style+' href="javascript:void(0);" data-urlid="'+row.id+'" onclick="deletemajescourl_popup('+row.id+')"><i class="fa fa-trash color_red" aria-hidden="true"></i></a>';
           }
          },
        ]
        
    });
    datatable_sifn(table);
}

function getallbind_majescourl(){
    $('.urlval').val('');
    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#bind_majexcourl').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getmajescourls/bind/"+accountid+"",
        "columns": [
          // { "data": "id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            var str1 = row.urls;
            var str2 = "http";
            if(str1.indexOf(str2) != -1){
                return "<a href='"+row.urls+"' target='_blank'>"+row.urls+"</a>";
            }else{
                return "<a href='//"+row.urls+"' target='_blank'>"+row.urls+"</a>";
            }
           }
          },
          {
           "render": function(data, type, row) {
            // return  '<a href="javascript:void(0);" class="getspecific_majescourls" data-urlid="'+row.id+'" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> | '+
            return  '<a '+specific_diable_style+' href="javascript:void(0);" data-urlid="'+row.id+'" onclick="deletemajescourl_popup('+row.id+')"><i class="fa fa-trash color_red" aria-hidden="true"></i></a>';
           }
          },
        ]
        
    });
    datatable_sifn(table);
}


function getallissue_majescourl(){

    $('.urlval').val('');
    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();

    var table = $('#issue_majexcourl_v3').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getmajescourls/"+accountid,
        "columns": [
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            var str1 = row.urls;
            var str2 = "http";
            if(str1.indexOf(str2) != -1){
                return "<a href='"+row.urls+"' target='_blank'>"+row.urls+"</a>";
            }else{
                return "<a href='//"+row.urls+"' target='_blank'>"+row.urls+"</a>";
            }
           }
          },
          {
           "render": function(data, type, row) {
            return  '<a '+specific_diable_style+' href="javascript:void(0);" data-urlid="'+row.id+'" onclick="deletemajescourl_popup('+row.id+')"><i class="fa fa-trash color_red" aria-hidden="true"></i></a>';
           }
          },
        ]
        
    });

    datatable_sifn(table);
}




$(document).on('click','.checkurl',function(){
  $(this).attr('disabled',true);
  
  var urlval = $(this).closest('.majescourldiv').find('.urlval').val();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
  
  if (urlval == '') {

    $(this).closest('.majescourldiv').find('.urlval').css('border','1px solid red');
    new PNotify({ title: 'Error', text: 'Field Not be Empty', delay: 1500, type: 'error' });

  }else{

    $(this).closest('.majescourldiv').find('.urlval').css('border','1px solid #e4e6eb');
    // var category = $(this).data('category');

    $.ajax({
        url: laravel_url+"/savemajescourls",
        type:'post',
        // data:{urlval:urlval,category:category,accid:accid},
        data:{urlval:urlval,accid:accid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);

            if (obj.status == 'ok') {
              new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
              refreshallmajescourls();
            }else{
              new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
            }
            $('.checkurl').removeAttr('disabled');
        }
    });

  }
});


function deletemajescourl_popup(url_id){
  $('.hiddenurlid').val('');
  $('.hiddenurlid').val(url_id);
  $('.trigger_majesco_todelete').trigger('click');
}

$(document).on('click','.deletemajescourl',function(){
    var urlid = $('.hiddenurlid').val();

    $.ajax({
        url: laravel_url+"/deletemajescourl",
        type:'post',
        data:{urlid:urlid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);

            if (obj.status == 'ok') {
              refreshallmajescourls();      
              new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });          
            }else{
              new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
            }
        }
    });
});

// $(document).on('click','.getspecific_majescourls',function(){
//     var urlid = $(this).data('urlid');

//     $.ajax({
//         url: laravel_url+"/getspecific_majescourls",
//         type:'post',
//         data:{urlid:urlid},
//         headers: {
//             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//         },
//         success:function(response){
//             var obj = jQuery.parseJSON(response);
//             $('.urlval').val(obj.urls);
//         }
//     });
// });




function getallsubmission_pdf(accid){
  var total_premium = $('.totpremium').text();
  if(accid != ""){
    var laravel_ajax = laravel_url+"/getsavedpdf/submission/"+accid;
  }
    $('#submission_pdf_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_ajax,
        "columns": [
          {
           "render": function(data, type, row) {
              var pdf_name = row.pdfname;
              var res = pdf_name.replaceAll(/\s/g,'');
              var res1 = res.replaceAll("/", "-");
            return '<center><input type="checkbox" class="attachpdfmail" data-pdfname="'+row.pdfname+'" data-pdfurl="'+laravel_url+'/get_quote_pdf/'+row.id+'-'+res1+'" ></center>';
           }
          },
          {
           "render": function(data, type, row) {
            return formatedate(row.created_at);
           }
          },
          {
           "render": function(data, type, row) {  

              var pdf_name = row.pdfname;
              var res = pdf_name.replaceAll(/\s/g,'');
              var res1 = res.replaceAll("/", "-");
              return '<a href="'+laravel_url+'/get_quote_pdf/'+row.id+'-'+res1+'" target="_blank" class="viewsavedpdf" data-pdfid="'+row.id+'" >'+res+'</a>';
           }
          },
          // {
          //  "render": function(data, type, row) {
          //   return '<center><label>'+total_premium+'</label></center>';
          //  }
          // },
        ]
        
    });
}

$(document).on('click','.file_name_savebtn',function(){
  
  var file_name = $('.file_name').val();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();

  $('.loading_btn').show();

  if (file_name == "") {
    // $(".pdf_errormsg").html('Field Should Not be Empty!').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
    new PNotify({ title: 'Error', text: 'Field Should Not be Empty!', delay: 1500, type: 'error' });
    $('.loading_btn').hide();
    return false;
  }else{

   
   $('.file_name_savebtn').removeClass('btn-success');
   $('.file_name_savebtn').addClass('btn-secondary');
   // $('.file_name_savebtn').attr('disabled',true);

    // html2canvas(document.querySelector("#pills-tabContent"),{height: 2500, width: 700}).then(canvas => {
    // html2canvas(document.querySelector("#pills-tabContent"),{height: 3700, width: 1500, x: 15, y: 15 }).then(canvas => {

    html2canvas(document.querySelector("#addsubmission_form"),{height: 3000, width: 1800, x: 50, y: 600 }).then(canvas => {


        // document.body.appendChild(canvas)
        // $('.pdf_errormsg').html(canvas);
          getCanvas = canvas;
          var imgageData = getCanvas.toDataURL("image/png");
          var newData = imgageData.replace(/^data:image\/png;base64,/, "");

          var maj_transid = $('.showquote_id').text();
          // var maj_transid = 'Q01GL0000822510003';


          //Ajax 
          var savetype = 'submission';
          email_id = $('.email_id').val();
          $.ajax({
              url: laravel_url+'/save_pdf_image',
              data: {'image': newData,'accid': accid,'filename': file_name,'savetype': savetype, maj_transid:maj_transid },
              method: 'POST',
              // dataType: 'json',
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              success: function(response) {
                var obj = jQuery.parseJSON(response);

                if (obj.status == 'ok') {
                  $('.file_name').val('');
                  // $(".pdf_errormsg").html(obj.message).css('color','Green').fadeIn('fast').delay(1500).fadeOut('slow');  
                  new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
                  
                  getallsubmission_pdf(accid); 
                  $('.submission_pdf_table').show();
                  $('.send_email_btn').attr('disabled',false);
                  $('.loading_btn').hide();
                  $('.file_name_savebtn').addClass('btn-success');
                  $('.file_name_savebtn').removeClass('btn-secondary');
                  // $('.file_name_wrap').hide().delay(1500);
                  // $('.cancel_savepdf').click();

                }else{
                    // alert(obj.message);
                    new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
                }

                $('.loading_btn').hide();
                $('.file_name_savebtn').addClass('btn-success');
                $('.file_name_savebtn').removeClass('btn-secondary');
                 
              }
          });

    });

  }
});

$(document).on('click','.deletepdf',function(){
    var pdfid = $(this).data('pdfid');
    // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
    
    $.ajax({
        url: laravel_url+"/deletepdf",
        type:'post',
        data:{pdfid:pdfid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              getallsubmission_pdf(accid);
              $('.submission_pdf_table').show();
            }else{
                alert(obj.message);
            }
        }
    });
});


function resetaccountform(){
  $('.session_hide_tab').find('.active').find('.accountid').val('');
  $('#accountdetailsform')[0].reset();
  $('.bindacc_nametop').html('');
  $('.bindbroker_nametop').html('');
  $('.bindquoteid_top').html('');


  $('#ac_mailAdd_state').val('');
  $('#ac_mailAdd_zip').val('');
  $('#accCity_row').html('');

   $('#multiselect').multiselect('deselectAll', true);
   // $("#multiselect").multiselect("clearSelection");
  append_city1_retrival(null,null);
  $('#pills-tab li:first-child a').tab('show');

}


function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(email)) {
    return false;
  }else{
    return true;
  }
}

$(document).on('click','.pdfsubmissionmail',function(){

  
  var fromemail = localStorage.getItem('userid');

  var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
  var ac_tname = $('#ac_tname').val();

  var reply_to = [];
  var reply_cc = [];

  $(".tomailid .amsify-select-tag").each(function() {
    if ( $.inArray( $(this).data('val'), reply_to )!='-1' ) {

    }else{

      if(IsEmail($(this).data('val'))==false){
        new PNotify({ title: 'Error', text: 'Not a valid Email', delay: 2000, type: 'error' });
        return false;
      }else{
        reply_to.push($(this).data('val'));
      }

      
    }
     
  });

  $(".ccmailid .amsify-select-tag").each(function() {

    if ( $.inArray( $(this).data('val'), reply_cc )!='-1' ) {

    }else{

      if(IsEmail($(this).data('val'))==false){
        new PNotify({ title: 'Error', text: 'Not a valid Email', delay: 2000, type: 'error' });
        return false;
      }else{
        reply_cc.push($(this).data('val'));
      }

      
    }

     
  });

  var description = $('#editor').find('.ql-editor').html();

  var emailsubject = $('.emailsubject').val();

  var pdflinks = [];

  $( ".attachpdfmail" ).each(function( index ) {
 
    if($(this).prop('checked') == true) {
       var  pdfname = $( this ).data('pdfname');
       var pdfurl = $( this ).data('pdfurl');
       pdflinks.push('<a href="'+pdfurl+'">'+pdfname+'</a>');
    }

  });

if (reply_to.length > 0) {
  // if (pdflinks.length > 0) {
    $('.loader').show();
    $.ajax({
          url: laravel_url+"/submissionpdfmail",
          type:'post',
          data:{ fromemail:fromemail,reply_to:reply_to,reply_cc:reply_cc,emailsubject:emailsubject,description:description,pdf_links:pdflinks,accountid:accountid,ac_tname:ac_tname },
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success:function(response){
              var obj = jQuery.parseJSON(response);
              if (obj.status == 'ok') {
                new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });

                $('.emailsubject').val('');
                $('#editor').find('.ql-editor').html('');
                $('.amsify-remove-tag').click();
                $('.sendmail_closebtn').click();
                $('.loader').hide();
              }else{
                new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
                $('.loader').hide();
              }
          }
      });
  // }else{
  //   new PNotify({ title: 'Error', text: 'Please selet atleast one attachment', delay: 2000, type: 'error' });
  // }
}else{
  new PNotify({ title: 'Error', text: 'To Address Should not be Empty', delay: 2000, type: 'error' });
}

});



// Email

function getallindication_emails(){
  $('.loader').show();
  $('.indi_emailselect').val('indication');
    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#indication_emailtable').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getaccoutemails/indication/"+accountid+"",
        "columns": [
          // { "data": "ten_email_id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.date_email);
           }
          },
          { "data": "from_email" },
          { "data": "to_email" },
          { "data": "subject_email" },
          {  
            "render": function(data, type, row) {  
              if (row.dragtype == null) {
                var dragtypeval = '';
              }else{
                var dragtypeval = row.dragtype;
              }
              return '<input type="text" '+specific_diable_style+' class="form-control email_dragtype emtrag_wid" value="'+dragtypeval+'" data-emailid="'+row.ten_email_id+'" >';   
            }    
          },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0)"  class="getemailattachment" data-emailid="'+row.ten_email_id+'" >'+
                    '<span class="mr-1 text-danger"><i class="fa fa-paperclip" ></i> </span>'+
                  '</a>'+
                  '<span '+specific_diable_style+' class="mr-1 reAssign_clr assignemailto" data-docid="'+row.ten_email_id+'"><span data-toggle="modal" data-target="#email_reassign"><i class="fa fa-retweet" data-toggle="tooltip" data-html="true" data-placement="left" title="" data-original-title="<em> Reassign </em>"></i> </span></span><br/>'+

                  '<a href="javascript:void(0)" class="view_emails" data-emailid="'+row.ten_email_id+'">'+
                    '<span class="mr-1"><i class="fa fa-eye" ></i> </span>'+
                  '</a>'+
                  '<a '+specific_diable_style+' href="javascript:void(0)" onclick="deleteemail_popup('+row.ten_email_id+')" data-deleteid="'+row.ten_email_id+'" >'+
                    '<span class="mr-1 text-danger"><i class="fa fa-trash color_red" ></i> </span>'+
                  '</a>'  ;
           }
          }
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
        
    });

    datatable_sifn(table);

    if($('#upload_collapse_e').css('display') == 'block' ) {
        $('.indi_upload_closeemail_btn').hide();
        $('#upload_collapse_e').hide();
        $('.indi_upload_email_btn').show();
  } else {
        $('.indi_upload_closeemail_btn').hide();
        $('#upload_collapse_e').hide();
        $('.indi_upload_email_btn').show();
  } 
  $('.loader').fadeOut('slow');
}


// function getemailattachment(tenmaildid){

  $(document).on('click','.getemailattachment',function(){

    var tenmaildid = $(this).data('emailid');
      $(this).closest('tr').next('.remove_this_tr').remove();
      var closetable =  $(this).closest('tr');

        $.ajax({
            url: laravel_url+"/getemailattachment",
            type:'post',
            data:{tenmaildid:tenmaildid},
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(response){
              if (response == 'Fail') {
                new PNotify({ title: 'Error', text: 'No Attachment Found', delay: 2000, type: 'error' });
              }else{  
                // $(this).closest('tr').next('.remove_this_tr').remove();
                $('.remove_this_tr').remove();
                $('<tr class="remove_this_tr"><td colspan="7">'+response+'</td></tr>').insertAfter(closetable);
              }
              
            }
        }); 
  });



// }

function getallquote_emails(){
  $('.loader').show();
  $('.quote_emailselect').val('quote');
    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#quote_emailtable').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getaccoutemails/quote/"+accountid+"",
        "columns": [
          // { "data": "ten_email_id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.date_email);
           }
          },
          { "data": "from_email" },
          { "data": "to_email" },
          { "data": "subject_email" },
          {  
            "render": function(data, type, row) {  
              if (row.dragtype == null) {
                var dragtypeval = '';
              }else{
                var dragtypeval = row.dragtype;
              }
              return '<input type="text" '+specific_diable_style+' class="form-control email_dragtype emtrag_wid" value="'+dragtypeval+'" data-emailid="'+row.ten_email_id+'">';   
            }    
          },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0)" class="getemailattachment" data-emailid="'+row.ten_email_id+'" >'+
                    '<span class="mr-1 text-danger"><i class="fa fa-paperclip" ></i> </span>'+
                  '</a>'+
                  '<span '+specific_diable_style+' class="mr-1 reAssign_clr assignemailto" data-docid="'+row.ten_email_id+'"><span data-toggle="modal" data-target="#email_reassign"><i class="fa fa-retweet" data-toggle="tooltip" data-html="true" data-placement="left" title="" data-original-title="<em> Reassign </em>"></i> </span></span><br/>'+
                  '<a href="javascript:void(0)" class="view_emails" data-emailid="'+row.ten_email_id+'">'+
                    '<span class="mr-1"><i class="fa fa-eye" ></i> </span>'+
                  '</a>'+
                  '<a '+specific_diable_style+' href="javascript:void(0)" onclick="deleteemail_popup('+row.ten_email_id+')" data-deleteid="'+row.ten_email_id+'" >'+
                    '<span class="mr-1 text-danger"><i class="fa fa-trash color_red" ></i> </span>'+
                  '</a>'   ;
           }
          }
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });
    datatable_sifn(table);

    if( $('#Q_upload_collapse_e').css('display') == 'block' ) {
        $('.quote_closeemail_btn').hide();
        $('#Q_upload_collapse_e').hide();
        $('.quote_email_btn').show();
  } else {
     $('.quote_closeemail_btn').hide();
        $('#Q_upload_collapse_e').hide();
        $('.quote_email_btn').show();
  } 
  $('.loader').fadeOut('slow');
}

function getallbind_emails(){
  $('.loader').show();
  $('.bind_emailselect').val('bind');
    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
     var table = $('#bind_emailtable').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getaccoutemails/bind/"+accountid+"",
        "columns": [
          // { "data": "ten_email_id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.date_email);
           }
          },
          { "data": "from_email" },
          { "data": "to_email" },
          { "data": "subject_email" },
          {  
            "render": function(data, type, row) {  
              if (row.dragtype == null) {
                var dragtypeval = '';
              }else{
                var dragtypeval = row.dragtype;
              }
              return '<input type="text" '+specific_diable_style+' class="form-control email_dragtype emtrag_wid" value="'+dragtypeval+'" data-emailid="'+row.ten_email_id+'">';   
            }    
          },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0)" class="getemailattachment" data-emailid="'+row.ten_email_id+'" >'+
                    '<span class="mr-1 text-danger"><i class="fa fa-paperclip" ></i> </span>'+
                  '</a>'+
                  '<span '+specific_diable_style+' class="mr-1 reAssign_clr assignemailto" data-docid="'+row.ten_email_id+'"><span data-toggle="modal" data-target="#email_reassign"><i class="fa fa-retweet" data-toggle="tooltip" data-html="true" data-placement="left" title="" data-original-title="<em> Reassign </em>"></i> </span></span><br/>'+
                  '<a href="javascript:void(0)" class="view_emails" data-emailid="'+row.ten_email_id+'">'+
                    '<span class="mr-1"><i class="fa fa-eye" ></i> </span>'+
                  '</a>'+
                  '<a '+specific_diable_style+' href="javascript:void(0)" onclick="deleteemail_popup('+row.ten_email_id+')" data-deleteid="'+row.ten_email_id+'" >'+
                    '<span class="mr-1 text-danger"><i class="fa fa-trash color_red" ></i> </span>'+
                  '</a>' ;
           }
          }
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });

    datatable_sifn(table);

    if( $('#b_upload_collapse_e').css('display') == 'block' ) {
        $('.bind_closeemail_btn').hide();
        $('#b_upload_collapse_e').hide();
        $('.bind_email_btn').show();
  } else {
     $('.bind_closeemail_btn').hide();
        $('#b_upload_collapse_e').hide();
        $('.bind_email_btn').show();
  } 
  $('.loader').fadeOut('slow');
}

function getallissue_emails(){
   $('.loader').show();
  $('.issue_emailselect').val('issue');
    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#issue_emailtable').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getaccoutemails/issue/"+accountid+"",
        "columns": [
          // { "data": "ten_email_id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.date_email);
           }
          },
          { "data": "from_email" },
          { "data": "to_email" },
          { "data": "subject_email" },
          {  
            "render": function(data, type, row) {  
              if (row.dragtype == null) {
                var dragtypeval = '';
              }else{
                var dragtypeval = row.dragtype;
              }
              return '<input type="text" '+specific_diable_style+' class="form-control email_dragtype emtrag_wid" value="'+dragtypeval+'" data-emailid="'+row.ten_email_id+'">';   
            }    
          },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0)" class="getemailattachment" data-emailid="'+row.ten_email_id+'" >'+
                    '<span class="mr-1 text-danger"><i class="fa fa-paperclip" ></i> </span>'+
                  '</a>'+
                  '<span '+specific_diable_style+' class="mr-1 reAssign_clr assignemailto" data-docid="'+row.ten_email_id+'"><span data-toggle="modal" data-target="#email_reassign"><i class="fa fa-retweet" data-toggle="tooltip" data-html="true" data-placement="left" title="" data-original-title="<em> Reassign </em>"></i> </span></span><br/>'+
                  '<a href="javascript:void(0)" class="view_emails" data-emailid="'+row.ten_email_id+'">'+
                    '<span class="mr-1"><i class="fa fa-eye" ></i> </span>'+
                  '</a>'+
                  '<a '+specific_diable_style+' href="javascript:void(0)" onclick="deleteemail_popup('+row.ten_email_id+')" data-deleteid="'+row.ten_email_id+'" >'+
                    '<span class="mr-1 text-danger"><i class="fa fa-trash color_red" ></i> </span>'+
                  '</a>' ;
           }
          }
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });

    datatable_sifn(table);

    if( $('#I_upload_collapse_e').css('display') == 'block' ) {
        $('.issue_closeemailupl_btn').hide();
        $('#I_upload_collapse_e').hide();
        $('.issue_emailupl_btn').show();
  } else {
     $('.issue_closeemailupl_btn').hide();
        $('#I_upload_collapse_e').hide();
        $('.issue_emailupl_btn').show();
  } 
  $('.loader').fadeOut('slow');
}

function datatable_sifn(table){
  table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

}
// function datatable_sifn_checkbox(table){
//   table.on( 'order.dt search.dt', function () {
//         table.column(1, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
//             cell.innerHTML = i+1;
//         } );
//     } ).draw();

// }


// document
function getallindication_docs(){
  $('.loader').show();
  $('.indi_docselect').val('indication');
  $('.dragname').val('');
  $('.dragtype').val('');

    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#indi_dragdrop_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getaccoutdocs/indication/"+accountid+"",
        "columns": [
          // {  "render": function(data, type, row) {  
          //   return '<input type="checkbox" class="form-control mt-1 indiDoc_check" name="indiDoc_check">';   }    
          // },
          {  "render": function(data, type, row) {  return '';   }    },
          
          {
           "render": function(data, type, row) {
            return formatedate(row.created_at);
           }
          },
          { "data": "doc_name" },
          {  
            "render": function(data, type, row) {  
              return '<input type="text" '+specific_diable_style+' class="form-control doccustom_filename" value="'+row.dragname+'" data-docid="'+row.emial_doc_id+'">';   
            }    
          },
          { "data": "addedby_name" },
          {  
            "render": function(data, type, row) {  
              return '<input type="text" '+specific_diable_style+' class="form-control doccustom_dragtype" data-toggle="tooltip" data-placement="top" title="'+row.dragtype+'" value="'+row.dragtype+'" data-docid="'+row.emial_doc_id+'">';   
            }    
          },
          {
           "render": function(data, type, row) {
            var docuname =  "'"+row.doc_name.replace("'", "")+"'";

            return '<span '+specific_diable_style+' class="mr-2 reAssign_clr assigndocumentto " data-docid="'+row.emial_doc_id+'"><span data-toggle="modal" data-target="#document_reassign"><i class="fa fa-retweet" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Reassign </em>"></i></span></span>'+
                  '<a href="javascript:void(0)" class="view_doc" onClick="view_docmentpopup('+row.emial_doc_id+','+docuname+')" data-docid="'+row.emial_doc_id+'" >'+
                    '<span class="mr-2"><i class="fa fa-eye" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> View </em>"></i> </span>'+
                  '</a>'
                  +'<a '+specific_diable_style+' href="javascript:void(0)" onclick="deletendoc_popup('+row.emial_doc_id+')" data-deleteid="'+row.emial_doc_id+'" >'+
                    '<span class="mr-2 text-danger"><i class="fa fa-trash color_red" ></i> </span>'+
                  '</a>'
                  ;
           }
          }
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });
    // datatable_sifn_checkbox(table);
    datatable_sifn(table);

    if( $('#upload_collapse').css('display') == 'block' ) {
        $('.indi_upload_close_btn').hide();
        $('#upload_collapse').hide();
        $('.indi_upload_btn').show();
  } else {
     $('.indi_upload_close_btn').hide();
        $('#upload_collapse').hide();
        $('.indi_upload_btn').show();
  } 
  $('.loader').fadeOut('slow');
}


//Document file open in popup

// function view_docmentpopup(doc_id,doc_name){
//   //alert(doc_id);
//   //alert(doc_name);
//   //var seturl=base_url+"/ddviewfiles?id="+id;
// var seturl = laravel_url+"/view_docmentpopup?doc_id="+doc_id;
//     var page_header = doc_name.substring(0, doc_name.lastIndexOf("."));
//      fileExtension = doc_name.replace(/^.*\./, ''); 
//     console.log('HEadre',page_header);
//     console.log('subheader',fileExtension);

    
//         $('#filesource').attr('src','');
//         $("#documentview").modal('show');

//         if(fileExtension == 'pdf'){
//           $('#filesource').attr('src',seturl);
//           $('#mdheader').html(page_header);        
//         }
//         else{     
//           $('#filesource').attr('src','../brokerage_dragdrop_v2/Upload/'+doc_name);
//           $('#mdheader').html(page_header);
//         }

//       $.ajax({
//         url: laravel_url+"/view_docmentpopup",
//          type:"GET",
//         data:{doc_id:doc_id},
//        // dataType: 'json',
//         headers: {
//             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//         },
//         success:function(response){
          
         
//         }
//     });

// }


function view_docmentpopup(doc_id,doc_name){
  
   
   
  //alert(doc_id);
  //alert(doc_name);
  //var seturl=base_url+"/ddviewfiles?id="+id;


// var seturl = laravel_url+"/view_docmentpopup?doc_id="+doc_id;
//     var page_header = doc_name.substring(0, doc_name.lastIndexOf("."));
     
//     console.log('HEadre',page_header);
//     console.log('subheader',fileExtension);

    
//         $('#filesource').attr('src','');
//         $("#documentview").modal('show');

//         if(fileExtension == 'pdf'){
//           $('#filesource').attr('src',seturl);
//           $('#mdheader').html(page_header);        
//         }
//         else{     
//           $('#filesource').attr('src','../brokerage_dragdrop_v2/Upload/'+doc_name);
//           $('#mdheader').html(page_header);
//         }

 $('#filesource').attr('src','');
 //$("#documentview").modal('show');
  var page_header = doc_name.substring(0, doc_name.lastIndexOf("."));
  fileExtension = doc_name.replace(/^.*\./, ''); 
      $.ajax({
        url: laravel_url+"/view_docmentpopup",
         type:"GET",
        data:{doc_id:doc_id},
       // dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){

           if (fileExtension != 'png' && fileExtension != 'jpeg' && fileExtension != 'jpg' && fileExtension != 'pdf' ) {
              $('#filesource').attr('src','data:text/'+fileExtension+';base64,'+response);
             $('#mdheader').html(page_header);
             $('.download_docfile').removeAttr('href');
             $('.download_docfile').attr('href', '../brokerage_dragdrop_v2/Upload/'+doc_name);
             //$('.download_docfile').trigger('click');

             var anchor = document.createElement('a');
             anchor.href =laravel_url+"/view_docmentpopup?doc_id="+doc_id;
             anchor.target = '_blank';
             anchor.download = doc_name;
             anchor.click();
           }else if(fileExtension == 'pdf'){
           //$('#filesource').attr('src','data:application/pdf;base64,'+response);
       $('#filesource').attr('src',laravel_url+"/view_docmentpopup?doc_id="+doc_id);
           $('#mdheader').html(page_header);
           $("#documentview").modal('show');
         }else{
            $('#filesource').attr('src','data:image/png;base64,'+response);
           $('#mdheader').html(page_header);
           $("#documentview").modal('show');
         }
           
         
        }
    });

}


function view_docmentpopup1(doc_id,doc_name){

 $('#filesource').attr('src','');
 //$("#documentview").modal('show');
  var page_header = doc_name.substring(0, doc_name.lastIndexOf("."));
  fileExtension = doc_name.replace(/^.*\./, ''); 
      $.ajax({
        url: laravel_url+"/view_docmentpopup1",
         type:"GET",
        data:{doc_id:doc_id},
       // dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){

           if (fileExtension != 'png' && fileExtension != 'jpeg' && fileExtension != 'jpg' && fileExtension != 'pdf'  && fileExtension != 'html' ) {
              $('#filesource').attr('src','data:text/'+fileExtension+';base64,'+response);
             $('#mdheader').html(page_header);
             $('.download_docfile').removeAttr('href');
             $('.download_docfile').attr('href', '../brokerage_dragdrop_v2/Upload/'+doc_name);
             //$('.download_docfile').trigger('click');

             var anchor = document.createElement('a');
             anchor.href =laravel_url+"/view_docmentpopup1?doc_id="+doc_id;
             anchor.target = '_blank';
             anchor.download = doc_name;
             anchor.click();
           }else if(fileExtension == 'pdf'){
           //$('#filesource').attr('src','data:application/pdf;base64,'+response);
       $('#filesource').attr('src',laravel_url+"/view_docmentpopup1?doc_id="+doc_id);
           $('#mdheader').html(page_header);
           $("#documentview").modal('show');
         }
         else if(fileExtension == 'html'){
             $('#filesource').attr('src',laravel_url+"/view_docmentpopup1?doc_id="+doc_id);
           $('#mdheader').html(page_header);
           $("#documentview").modal('show');
         }

         else{
            $('#filesource').attr('src','data:image/png;base64,'+response);
           $('#mdheader').html(page_header);
           $("#documentview").modal('show');
         }
           
         
        }
    });

}


function getallquote_docs(){
  $('.loader').show();
  $('.quote_docselect').val('quote');
  $('.dragname').val('');
  $('.dragtype').val('');

    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#quote_dragdrop_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getaccoutdocs/quote/"+accountid+"",
        "columns": [
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.created_at);
           }
          },
          { "data": "doc_name" },
          {  
            "render": function(data, type, row) {  
              return '<input type="text" '+specific_diable_style+' class="form-control doccustom_filename" value="'+row.dragname+'" data-docid="'+row.emial_doc_id+'">';   
            }    
          },
          { "data": "addedby_name" },
          {  
            "render": function(data, type, row) {  
              return '<input type="text" '+specific_diable_style+' class="form-control doccustom_dragtype" value="'+row.dragtype+'" data-docid="'+row.emial_doc_id+'">';   
            }    
          },
          {
           "render": function(data, type, row) {
            // var docuname =  "'"+row.doc_name+"'";
            var docuname =  "'"+row.doc_name.replace("'", "")+"'";
            return '<span '+specific_diable_style+' class="mr-2 reAssign_clr assigndocumentto " data-docid="'+row.emial_doc_id+'"><span data-toggle="modal" data-target="#document_reassign"><i class="fa fa-retweet" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Reassign </em>"></i></span></span>'+
                  '<a href="javascript:void(0)" class="view_doc" onClick="view_docmentpopup('+row.emial_doc_id+','+docuname+')" data-docid="'+row.emial_doc_id+'" >'+
                    '<span class="mr-2"><i class="fa fa-eye" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> View </em>"></i> </span>'+
                  '</a>'
                  +'<a '+specific_diable_style+' href="javascript:void(0)" onclick="deletendoc_popup('+row.emial_doc_id+')" data-deleteid="'+row.emial_doc_id+'" >'+
                    '<span class="mr-2 text-danger"><i class="fa fa-trash color_red" ></i> </span>'+
                  '</a>'
                  ;
           }
          }
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });
    datatable_sifn(table);

    if( $('#Q_upload_collapse').css('display') == 'block' ) {
        $('.quote_closeupload_btn').hide();
        $('#Q_upload_collapse').hide();
        $('.quote_upload_btn').show();
  } else {
     $('.quote_closeupload_btn').hide();
        $('#Q_upload_collapse').hide();
        $('.quote_upload_btn').show();
  } 
  $('.loader').fadeOut('slow');
}


function getallbind_docs(){
  $('.loader').show();
  $('.bind_docselect').val('bind');
  $('.dragname').val('');
  $('.dragtype').val('');

    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#bind_dragdrop_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getaccoutdocs/bind/"+accountid+"",
        "columns": [
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.created_at);
           }
          },
          { "data": "doc_name" },
          {  
            "render": function(data, type, row) {  
              return '<input type="text" '+specific_diable_style+' class="form-control doccustom_filename" value="'+row.dragname+'" data-docid="'+row.emial_doc_id+'">';   
            }    
          },
          { "data": "addedby_name" },
          {  
            "render": function(data, type, row) {  
              return '<input type="text" '+specific_diable_style+' class="form-control doccustom_dragtype" value="'+row.dragtype+'" data-docid="'+row.emial_doc_id+'">';   
            }    
          },
          {
           "render": function(data, type, row) {
            // var docuname =  "'"+row.doc_name+"'";
            var docuname =  "'"+row.doc_name.replace("'", "")+"'";
            return '<span '+specific_diable_style+' class="mr-2 reAssign_clr assigndocumentto " data-docid="'+row.emial_doc_id+'"><span data-toggle="modal" data-target="#document_reassign"><i class="fa fa-retweet" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Reassign </em>"></i></span></span>'+
                  '<a href="javascript:void(0)" class="view_doc" onClick="view_docmentpopup('+row.emial_doc_id+','+docuname+')" data-docid="'+row.emial_doc_id+'" >'+
                    '<span class="mr-2"><i class="fa fa-eye" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> View </em>"></i> </span>'+
                  '</a>'
                  +'<a '+specific_diable_style+' href="javascript:void(0)" onclick="deletendoc_popup('+row.emial_doc_id+')" data-deleteid="'+row.emial_doc_id+'" >'+
                    '<span class="mr-2 text-danger"><i class="fa fa-trash color_red" ></i> </span>'+
                  '</a>'
                  ;
           }
          }
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });
    datatable_sifn(table);

    if( $('#b_upload_collapse').css('display') == 'block' ) {
        $('.bind_closeupload_btn').hide();
        $('#b_upload_collapse').hide();
        $('.bind_upload_btn').show();
  } else {
    $('.bind_closeupload_btn').hide();
        $('#b_upload_collapse').hide();
        $('.bind_upload_btn').show();
  } 
  $('.loader').fadeOut('slow');
}

function getallissue_docs(){
  $('.loader').show();
  $('.issue_docselect').val('issue');
  $('.dragname').val('');
  $('.dragtype').val('');

    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#issue_dragdrop_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getaccoutdocs/issue/"+accountid+"",
        "columns": [
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.created_at);
           }
          },
          { "data": "doc_name" },
          {  
            "render": function(data, type, row) {  
              return '<input type="text" '+specific_diable_style+' class="form-control doccustom_filename" value="'+row.dragname+'" data-docid="'+row.emial_doc_id+'">';   
            }    
          },
          { "data": "addedby_name" },
          {  
            "render": function(data, type, row) {  
              return '<input type="text" '+specific_diable_style+' class="form-control doccustom_dragtype" value="'+row.dragtype+'" data-docid="'+row.emial_doc_id+'">';   
            }    
          },
          {
           "render": function(data, type, row) {
            // var docuname =  "'"+row.doc_name+"'";
            var docuname =  "'"+row.doc_name.replace("'", "")+"'";
            return '<span '+specific_diable_style+' class="mr-2 reAssign_clr assigndocumentto " data-docid="'+row.emial_doc_id+'"><span data-toggle="modal" data-target="#document_reassign"><i class="fa fa-retweet" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Reassign </em>"></i></span></span>'+
                  '<a href="javascript:void(0)" class="view_doc" onClick="view_docmentpopup('+row.emial_doc_id+','+docuname+')" data-docid="'+row.emial_doc_id+'" >'+
                    '<span class="mr-2"><i class="fa fa-eye" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> View </em>"></i> </span>'+
                  '</a>'
                  +'<a '+specific_diable_style+' href="javascript:void(0)" onclick="deletendoc_popup('+row.emial_doc_id+')" data-deleteid="'+row.emial_doc_id+'" >'+
                    '<span class="mr-2 text-danger"><i class="fa fa-trash color_red" ></i> </span>'+
                  '</a>'
                  ;
           }
          }
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });
    datatable_sifn(table);

     if( $('#I_upload_collapse').css('display') == 'block' ) {
        $('.issue_closeupload_btn').hide();
        $('#I_upload_collapse').hide();
        $('.issue_upload_btn').show();
  } else {
    $('.issue_closeupload_btn').hide();
        $('#I_upload_collapse').hide();
        $('.issue_upload_btn').show();
  } 
  $('.loader').fadeOut('slow');
}




// Policy tab start

function getall_email_doc_notes(category){
  $('.dragname').val('');
  $('.dragtype').val('');
 // $('.loader').show();
   $('.loader1').show();

  resetnoteform();

  // $('.policy_docselect').val(category);
  // $('.policy_emailselect').val(category);
  // $('.policy_selectcategory').val(category);

// alert('hai');
// policy_selectcategory
  $('.policy_selectcategory').val(category);
  $('.policy_docselect').val(category);
  $('.policy_emailselect').val(category);

  $('.notes_date').val(getcurrentdate());

    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var table = $('#policy_doc_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getaccoutdocs/"+category+"/"+accountid+"",
        "columns": [
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.created_at);
           }
          },
          { "data": "doc_name" },
          {  
            "render": function(data, type, row) {  
              return '<input type="text" '+specific_diable_style+' class="form-control doccustom_filename" value="'+row.dragname+'" data-docid="'+row.emial_doc_id+'">';   
            }    
          },
          { "data": "addedby_name" },
          {  
            "render": function(data, type, row) {  
              return '<input type="text" '+specific_diable_style+' class="form-control doccustom_dragtype" value="'+row.dragtype+'" data-docid="'+row.emial_doc_id+'">';   
            }    
          },
          {
           "render": function(data, type, row) {
            var docuname =  "'"+row.doc_name.replace("'", "")+"'";

            return '<span '+specific_diable_style+' class="mr-2 reAssign_clr assigndocumentto " data-docid="'+row.emial_doc_id+'"><span data-toggle="modal" data-target="#document_reassign"><i class="fa fa-retweet" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Reassign </em>"></i></span></span>'+
                  '<a href="javascript:void(0)" class="view_doc" onClick="view_docmentpopup('+row.emial_doc_id+','+docuname+')" data-docid="'+row.emial_doc_id+'" >'+
                    '<span class="mr-2"><i class="fa fa-eye" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> View </em>"></i> </span>'+
                  '</a>'
                  +'<a '+specific_diable_style+' href="javascript:void(0)" onclick="deletendoc_popup('+row.emial_doc_id+')" data-deleteid="'+row.emial_doc_id+'" >'+
                    '<span class="mr-2 text-danger"><i class="fa fa-trash color_red" ></i> </span>'+
                  '</a>'
                  ;
           }
          }
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
        // "initComplete": function( settings, json ) {
          
        // }
    });

    var table1 = $('#policy_email_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getaccoutemails/"+category+"/"+accountid+"",
        "columns": [
          // { "data": "ten_email_id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.date_email);
           }
          },
          { "data": "from_email" },
          { "data": "to_email" },
          { "data": "subject_email" },
          {  
            "render": function(data, type, row) {  
              if (row.dragtype == null) {
                var dragtypeval = '';
              }else{
                var dragtypeval = row.dragtype;
              }
              return '<input type="text" '+specific_diable_style+' class="form-control email_dragtype emtrag_wid" value="'+dragtypeval+'" data-emailid="'+row.ten_email_id+'">';   
            }    
          },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0)" class="getemailattachment" data-emailid="'+row.ten_email_id+'" >'+
                    '<span class="mr-1 text-danger"><i class="fa fa-paperclip" ></i> </span>'+
                  '</a>'+
                  '<span '+specific_diable_style+' class="mr-1 reAssign_clr assignemailto" data-docid="'+row.ten_email_id+'"><span data-toggle="modal" data-target="#email_reassign"><i class="fa fa-retweet" data-toggle="tooltip" data-html="true" data-placement="left" title="" data-original-title="<em> Reassign </em>"></i> </span></span><br/>'+
                  '<a href="javascript:void(0)" class="view_emails" data-emailid="'+row.ten_email_id+'">'+
                    '<span class="mr-1"><i class="fa fa-eye" ></i> </span>'+
                  '</a>'+
                  '<a '+specific_diable_style+' href="javascript:void(0)" onclick="deleteemail_popup('+row.ten_email_id+')" data-deleteid="'+row.ten_email_id+'" >'+
                    '<span class="mr-1 text-danger"><i class="fa fa-trash color_red" ></i> </span>'+
                  '</a>' ;
           }
          }
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
        // "initComplete": function( settings, json ) {
        //   $('.loader1').fadeOut('slow');
        // }
    });


    var table2 = $('#policy_note_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getnotes/"+category+"/"+accountid,
        "columns": [
          // { "data": "id" },
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.createddate);
           }
          },
          {
           "render": function(data, type, row) {
              if (row.subjectname) {
                return row.subjectname;
              }else{
                return row.content;
              }

           }
          },
          { "data": "username" },
          // { "data": "note_type_text" },
          {
           "render": function(data, type, row) {
            return '<a href="javascript:void(0);" class="getspecific_notes" data-noteid="'+row.id+'" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> | '+
            '<a '+specific_diable_style+' href="javascript:void(0);" data-notetype="'+category+'" onclick="deletenotes_popup('+row.id+')" data-noteid="'+row.id+'" ><i class="fa fa-trash color_red" aria-hidden="true"></i></a>';
           }
          },
        ],
        'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    });



    $.ajax({
        url: laravel_url+"/doc_email_notes_count",
        type:'post',
        data:{accountid:accountid,category:category},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){

          var obj = jQuery.parseJSON(response);
          $('.docu_count').html('');
          $('.email_count').html('');
          $('.notes_count').html('');
          $('.docu_count').html(obj.documentcount);
          $('.email_count').html(obj.emailcount);
          $('.notes_count').html(obj.notescount);
        }
    });


    datatable_sifn(table);
    datatable_sifn(table1);
    datatable_sifn(table2);

    $('.loader1').fadeOut('slow');
}


function deletendoc_popup(doc_id){
  $('.hiddendocid').val('');
  $('.hiddendocid').val(doc_id);
  $('.trigger_docs_todelete').trigger('click');
  getall_document_email_notes_count();
}

$(document).on('click','.deletedocs',function(){
    var deleteid = $('.hiddendocid').val();

    $.ajax({
        url: laravel_url+"/deletedocs",
        type:'post',
        data:{deleteid:deleteid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              getallindication_docs();
              getallquote_docs();
              getallbind_docs();
              getallissue_docs();
              $('.pollicytesting').trigger('click');
              getall_document_email_notes_count();
              new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
            }else{
              new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }
        }
    });
});



function deleteemail_popup(doc_id){
  $('.hiddenemailid').val('');
  $('.hiddenemailid').val(doc_id);
  $('.trigger_email_todelete').trigger('click');
  getall_document_email_notes_count();
}

$(document).on('click','.delete_emails',function(){
    var deleteid = $('.hiddenemailid').val();

    $.ajax({
        url: laravel_url+"/delete_emails",
        type:'post',
        data:{deleteid:deleteid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              getallindication_emails();
              getallquote_emails();
              getallbind_emails();
              getallissue_emails();
              $('.pollicytesting').trigger('click');
              getall_document_email_notes_count();
              new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
            }else{
              new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }
        }
    });
});


$(document).on('click','.view_emails',function(){
    var emailid = $(this).data('emailid');

    $.ajax({
        url: laravel_url+"/view_emails",
        type:'post',
        data:{emailid:emailid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
          let newWindow = open("../../brokerage.be/pdf_image/drag_email.html", 'example', 'location=yes,toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=800,height=700')
          newWindow.focus();
        }
    });
});

$(document).on('click','.assigndocumentto',function(){
  var docid = $(this).data('docid');
  $('.reassigndocumentid').val('');
  $('.reassigndocumentid').val(docid);
});

$(document).on('click','.assignemailto',function(){
  var docid = $(this).data('docid');
  $('.reassignemilid').val('');
  $('.reassignemilid').val(docid);
});

$(document).on('change','.documentselect',function(){
  var id = $('.reassigndocumentid').val();
  var category = $(this).val();

  $.ajax({
        url: laravel_url+"/reassigndocument",
        type:'post',
        data:{id:id,category:category},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              getallindication_docs();
              getallquote_docs();
              getallbind_docs();
              getallissue_docs();
              $('.reassignclose').trigger('click');
              new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
            }else{
              $('.reassignclose').trigger('click');
              new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }
        }
    });

});



function getnotesdata(noteid){
  $('.bind_notes_data').html('');
  // $(".loader").show();

    $.ajax({
        url: laravel_url+"/getnotesdata",
        type:'post',
        data:{noteid:noteid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
          $('.bind_notes_data').html('');
          $('.bind_notes_data').html(response);
          // $(".loader").hide();
        }
    });
}



function allTabs(category){

  // alert(category);
  var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
  $(".loader").show();
  $.ajax({
        url: laravel_url+"/getcategoryallfiles",
        type:'post',
        data:{accountid:accountid,category:category},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){

          if (category == 'submission') {
            $('.bind_all_submission_data').html('');
            $('.bind_all_submission_data').html(response);
          }

          if (category == 'indication') {
            $('.bind_all_indication_data').html('');
            $('.bind_all_indication_data').html(response);
          }

          if (category == 'quote') {
            $('.bind_all_quote_data').html('');
            $('.bind_all_quote_data').html(response);
          }

          if (category == 'bind') {
            $('.bind_all_bind_data').html('');
            $('.bind_all_bind_data').html(response);
          }

          if (category == 'tria') {
            $('.bind_all_tria_data').html('');
            $('.bind_all_tria_data').html(response);
          }

          if (category == 'policy') {
            $('.bind_all_policy_data').html('');
            $('.bind_all_policy_data').html(response);
          }


          if (category == 'endorsement') {
            $('.bind_all_endorsement_data').html('');
            $('.bind_all_endorsement_data').html(response);
          }


          if (category == 'sov') {
            $('.bind_all_sov_data').html('');
            $('.bind_all_sov_data').html(response);
          }

          if (category == 'inspection') {
            $('.bind_all_inspection_data').html('');
            $('.bind_all_inspection_data').html(response);
          }

          if (category == 'premiumaudit') {
            $('.bind_all_premiumaudit_data').html('');
            $('.bind_all_premiumaudit_data').html(response);
          }

          if (category == 'reinsurance') {
            $('.bind_all_reinsurance_data').html('');
            $('.bind_all_reinsurance_data').html(response);
          }

          if (category == 'general') {
            $('.bind_all_general_data').html('');
            $('.bind_all_general_data').html(response);
          }

          if (category == 'claims') {
            $('.bind_all_claims_data').html('');
            $('.bind_all_claims_data').html(response);
          }

          if (category == 'renewal') {
            $('.bind_all_renewal_data').html('');
            $('.bind_all_renewal_data').html(response);
          }

          if (category == 'payments') {
            $('.bind_all_payments_data').html('');
            $('.bind_all_payments_data').html(response);
          }

          $(".loader").hide();
        }
    });
}





$(document).on('change','.emailselect',function(){
  var id = $('.reassignemilid').val();
  var category = $(this).val();

  $.ajax({
        url: laravel_url+"/reassignemail",
        type:'post',
        data:{id:id,category:category},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              getallindication_emails();
              getallquote_emails();
              getallbind_emails();
              getallissue_emails();
              $('.reassignclose').trigger('click');
              new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
            }else{
              $('.reassignclose').trigger('click');
              new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }
        }
    });

});

$(document).on('click','.changeaccount_status',function(){

  if ($('.session_hide_tab').find('.active').find('.accountid').val() == '') {
    var accountid = $(this).data('accid');
  }else{
    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
  }

  var islostval = $(this).data('islostval');
  var select = $(this).data('select');
  var selectreason = $("#"+select).val();

  $.ajax({
        url: laravel_url+"/changeaccount_status",
        type:'post',
        data:{accountid:accountid,islostval:islostval,selectreason:selectreason},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              $('.accountcancel').trigger('click');
              accounttablelist();
              $('.changeaccount_status').removeAttr('data-accid');
              $('.accountdelete').removeAttr('data-accid');
              new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
            }else{
              $('.accountcancel').trigger('click');
              accounttablelist();
              $('.changeaccount_status').removeAttr('data-accid');
              $('.accountdelete').removeAttr('data-accid');
              new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }
        }
    });

});


// Advance Account Filter search start
$(document).on('click','.accountfiltersearch',function(){

	$('#account_list_loader').show();
	var filter_status = $('#filter_status').val();

	$(document).find('.search_icon_button_design').removeClass('btn_full_widthalign');
	var brokerid = $(this).closest('.submission_div_form').find('.filter_brokername').val();
	var cr_date_from = $(this).closest('.submission_div_form').find('#cr_date_from').val();
	var cr_date_to = $(this).closest('.submission_div_form').find('#cr_date_to').val();
	var eff_date_from = $(this).closest('.submission_div_form').find('#eff_date_from').val();
	var eff_date_to = $(this).closest('.submission_div_form').find('#eff_date_to').val();
	var primary_assignee_filter = $(this).closest('.submission_div_form').find('.primary_assignee_filter').val();
	// var secondary_assignee_filter = $(this).closest('.submission_div_form').find('.secondary_assignee_filter').val();
	var account_status = $(this).closest('.submission_div_form').find('#multi-select-demo-three').val();
	// var account_priority = $(this).closest('.submission_div_form').find('#multi-select-demo-four').val();

	if (brokerid == '' && cr_date_from == '' && cr_date_to == '' && eff_date_from == '' && eff_date_to == '' && 
	primary_assignee_filter == '' && account_status == '' && filter_status == '') {
		new PNotify({ title: 'Error', text: 'Please select atleast one field', delay: 2000, type: 'error' });
	} else {

		if (datedifference(cr_date_from,cr_date_to) < 0) {
			new PNotify({ title: 'Error', text: 'Created To-date cannot be high than From date', delay: 2000, type: 'error' });
		} else {
			if (datedifference(eff_date_from,eff_date_to) < 0) {
				new PNotify({ title: 'Error', text: 'Effective To-date cannot be high than From date', delay: 2000, type: 'error' });
			}else{
				$('#accounttable').DataTable().destroy();
				$('#defaultCheck3').prop("checked", true);
				$('#defaultCheck4').prop("checked", true);

				fill_datatable(brokerid, cr_date_from, cr_date_to, eff_date_from, eff_date_to, primary_assignee_filter, account_status,filter_status);
				$(document).find('#accounttable_filter').parent().addClass("datatable_search_design");
				$(document).find('#accounttable_filter').addClass("datatable_search");
				$(document).find('#accounttable_filter').css('display','block');
        $(document).find('.datatable_search input').css('min-width','586%');
        
				setTimeout(function(){ 
					$(document).find('.datatable_search').append('<div class="input-group-btn col-md-1 pull-right accounttable_btn table_searchbar_design_button_group"><button class="btn btn-primary search_icon_button_design brok_acc_search_btn" data-toggle="tooltip" data-original-title="Search" type="button" data-select2-open="single-append-text"><span class="fa fa-search text-white"></span></button><button class="btn btn-primary brok_filter_btn filter_btn_align show_search_filter_btn hide_submission_btn" type="button" data-toggle="tooltip" data-original-title="Filter" data-select2-open="single-append-text"><span class=""><i class="fa fa-filter text-white" aria-hidden="true"></i></span></button><button type="button" class="btn btn-primary btn-md brok_setting_btn search_setting_btn setting_searchbutton_show" data-toggle="tooltip" data-original-title="Settings"> <span><i class="fa fa-cogs text-white" aria-hidden="true"></i></span></button></div>');
					// $(document).find('.datatables-footer').hide();
				}, 10);

        setTimeout(function(){ 
          $(document).find('#accounttable_filter').find('.table_searchbar_design_button_group').css('margin','-35px -253% 0 0');
        }, 100);

				$('[data-toggle="tooltip"]').tooltip();

			}
		}
	}
	$('.filter_div').css('display', 'none');
});


// function fill_datatable(brokerid, cr_date_from, cr_date_to, eff_date_from, eff_date_to, primary_assignee_filter, secondary_assignee_filter, account_status, account_priority ){
function fill_datatable(brokerid, cr_date_from, cr_date_to, eff_date_from, eff_date_to, primary_assignee_filter, account_status,filter_status){

	var filteracc_table = $('#accounttable').DataTable( {
		"bProcessing": true,
		"responsive": true,
		"serverSide": true,
		"bPaginate": true,
		"bInfo": true,
		"bLengthChange": true,
		"autoWidth": false,
		"order": [[0,"desc"]],  
		"pageLength": 50,
		"destroy": true,
    "language": { search: "" },
		"ajax": {
			"url": laravel_url+"/getallaccounts_info_filter",
			"type": "post",
			data: {
				brokerid : brokerid, 
				cr_date_from : cr_date_from, 
				cr_date_to : cr_date_to, 
				eff_date_from : eff_date_from, 
				eff_date_to : eff_date_to, 
				primary_assignee_filter : primary_assignee_filter, 
				// secondary_assignee_filter : secondary_assignee_filter ,
				account_status : account_status,
				filter_status : filter_status
				// account_priority : account_priority
			}
		},
		"columns": [
			{  "render": function(data, type, row) {  return '';   }   },
			{
				"render": function(data, type, row) {
					return formatedate(row.createdate);
				}
			},
			{
				"render": function(data, type, row) {
					return '<a href="javascript:void(0);" class="getspecificaccount" data-accid="'+row.id+'" >'+row.accountname+'</a>';
				}
			},
			{ "data": "policy_number" },
			{ "data": "lob" },
			{ "data": "broker_name" },
			{
				"render": function(data, type, row) {
					return formatedate(row.acc_effective_date);
				}
			},
			{ "data": "accountstatus" },
			{
				"render": function(data, type, row) {
					if (row.is_lost == '1') {
						return 'Lost | <a href="javascript:void(0);" onclick="accountrevoke_popup('+row.id+')" >Restore</a> ';
					} else if (row.is_lost == '2') {
						return 'Declined | <a href="javascript:void(0);" onclick="accountrevoke_popup('+row.id+')" >Restore</a>';
					} else if (row.is_lost == '3') {
						return 'Cancel | <a href="javascript:void(0);" onclick="accountrevoke_popup('+row.id+')" >Restore</a>';
					} else if(row.status == '1') {
						return 'Deleted | <a href="javascript:void(0);" onclick="accountrevoke_popup('+row.id+')" >Restore</a>';  
					} 
					else {
						return '<div class="input-group icons ml-1">'+
						'<span class="mr-1 curosor_pointer pull-left front_acc_actions tooltip" data-toggle="modal" data-accid="'+row.id+'" data-target="#LostPop"><i class="fa fa-thumbs-down text-warning"></i><span class="tooltiptext"> Lost</span> </span>'+
						'<span class="mr-1 curosor_pointer pull-left front_acc_actions tooltip" data-toggle="modal" data-accid="'+row.id+'" data-target="#cancelPop"><i class="fa fa-remove text-danger"></i> <span class="tooltiptext"> Cancel</span> </span>'+
						'<span class="mr-1 curosor_pointer pull-left front_acc_actions tooltip" data-toggle="modal" data-accid="'+row.id+'" data-target="#declinePop"><i class="fa fa-ban text-primary"></i> <span class="tooltiptext"> Decline</span> </span>'+
						'<span class="mr-1 pull-left front_acc_actions tooltip" data-accid="'+row.id+'" ><i class="fa fa-trash text-danger delete_btn_icon"  data-toggle="modal" data-target="#tabledeletepopup_modal"></i> <span class="tooltiptext"> Delete</span></span>'+
						'</div>';
					}
				}
			},
			{ "data": "primary_assignee_name" }
		],
		'beforeSend': function () {
			$('.loader').show();
		},
		complete: function() {
			$('.loader').fadeOut('slow');
      menu_permission();
		}
	} );
	// for table index
	filteracc_table.on('draw.dt', function () {
		var info = filteracc_table.page.info();
		filteracc_table.column(0, { search: 'applied', order: 'applied', page: 'applied' }).nodes().each(function (cell, i) {
		cell.innerHTML = i + 1 + info.start;
		});
	});

	var loadersec = setInterval ( function () {
		$('#account_list_loader').hide();
		clearInterval (loadersec);
	}, 1000);
}
// Advance Filter search End


// Advance Archive Filter search start
$(document).on('click','.archivefiltersearch',function(){
$(document).find('.search_icon_button_design').removeClass('btn_full_widthalign');
  var brokerid = $(this).closest('.submission_div_form').find('.filter_brokername').val();
  var cr_date_from = $(this).closest('.submission_div_form').find('#cr_date_from').val();
  var cr_date_to = $(this).closest('.submission_div_form').find('#cr_date_to').val();
  var eff_date_from = $(this).closest('.submission_div_form').find('#eff_date_from').val();
  var eff_date_to = $(this).closest('.submission_div_form').find('#eff_date_to').val();
  var primary_assignee_filter = $(this).closest('.submission_div_form').find('.primary_assignee_filter').val();
  // var secondary_assignee_filter = $(this).closest('.submission_div_form').find('.secondary_assignee_filter').val();
  var account_status = $(this).closest('.submission_div_form').find('#multi-select-demo-three').val();
  // var account_priority = $(this).closest('.submission_div_form').find('#multi-select-demo-four').val();



// if (brokerid == '' && cr_date_from == '' && cr_date_to == '' && eff_date_from == '' && eff_date_to == '' && 
//   primary_assignee_filter == '' && secondary_assignee_filter == '' && account_status == '' && account_priority == '') {
if (brokerid == '' && cr_date_from == '' && cr_date_to == '' && eff_date_from == '' && eff_date_to == '' && 
  primary_assignee_filter == '' && account_status == '' ) {

  new PNotify({ title: 'Error', text: 'Please select atleast one field', delay: 2000, type: 'error' });

}else{
	
    if (datedifference(cr_date_from,cr_date_to) < 0) {
      new PNotify({ title: 'Error', text: 'Created To-date cannot be high than From date', delay: 2000, type: 'error' });
    }else{
      if (datedifference(eff_date_from,eff_date_to) < 0) {
        new PNotify({ title: 'Error', text: 'Effective To-date cannot be high than From date', delay: 2000, type: 'error' });
      }else{
          $('#archivetable').DataTable().destroy();
          // archive_fill_datatable(brokerid, cr_date_from, cr_date_to, eff_date_from, eff_date_to, primary_assignee_filter, secondary_assignee_filter, account_status, account_priority);
          archive_fill_datatable(brokerid, cr_date_from, cr_date_to, eff_date_from, eff_date_to, primary_assignee_filter, account_status);
          $(document).find('#archivetable_filter').parent().addClass("datatable_search_design");
          $(document).find('#archivetable_filter').addClass("datatable_search");
          $(document).find('#archivetable_filter').css('display','block');
          $(document).find('.datatable_search input').css('min-width','578%');

          setTimeout(function(){ 

          $('[data-toggle="tooltip"]').tooltip();
          $(document).find('.datatable_search').append('<div class="input-group-btn col-md-1 pull-right accounttable_btn table_searchbar_design_button_group"><button class="btn btn-primary search_icon_button_design brok_acc_search_btn" data-toggle="tooltip" data-original-title="Search" type="button" data-select2-open="single-append-text"><span class="fa fa-search text-white"></span></button><button class="btn btn-primary brok_filter_btn filter_btn_align show_search_filter_btn hide_submission_btn" type="button" data-toggle="tooltip" data-original-title="Filter" data-select2-open="single-append-text"><span class=""><i class="fa fa-filter text-white" aria-hidden="true"></i></span></button><button type="button" class="btn btn-primary btn-md brok_setting_btn search_setting_btn setting_archie_searchbutton_show" data-toggle="tooltip" data-original-title="Settings"> <span><i class="fa fa-cogs text-white" aria-hidden="true"></i></span></button></div>');
          }, 10);

          setTimeout(function(){ 
            $(document).find('#accounttable_filter').find('.table_searchbar_design_button_group').css('margin','-35px -253% 0 0');
          }, 100);

          $(document).find('.datatables-footer').hide();
      }

    }

  }

});


  // function archive_fill_datatable(brokerid, cr_date_from, cr_date_to, eff_date_from, eff_date_to, primary_assignee_filter, secondary_assignee_filter, account_status, account_priority ){
  function archive_fill_datatable(brokerid, cr_date_from, cr_date_to, eff_date_from, eff_date_to, primary_assignee_filter, account_status ){
    var filterarchive_table = $('#archivetable').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": laravel_url+"/getallaccounts_archive_filter",
            "type": "post",
            "async": false,
            data: {
                    brokerid : brokerid, 
                    cr_date_from : cr_date_from, 
                    cr_date_to : cr_date_to, 
                    eff_date_from : eff_date_from, 
                    eff_date_to : eff_date_to, 
                    primary_assignee_filter : primary_assignee_filter, 
                    // secondary_assignee_filter : secondary_assignee_filter ,
                    account_status : account_status
                    // account_priority : account_priority
                  }
        },
        "columns": [
         {  "render": function(data, type, row) {  
            return $('#archivetable').DataTable().column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
              } ); 
          }    
         },
         {
          "render": function(data, type, row) {
           return formatedate(row.createdate);
          }
         },
         {
          "render": function(data, type, row) {
           return formatedate(row.createdate);
          }
         },
         {
          "render": function(data, type, row) {
           return '<a href="javascript:void(0);" class="getspecificaccount" data-accid="'+row.id+'" >'+row.accountname+'</a>';
          }
         },
        /* {
          "render": function(data, type, row) {

            if (row.majesco_transaction_id != "" && row.majesco_transaction_id != null ) {
              return '<a style="color:#152abe;" target="_blank" href="'+global_maj_link+'/pct#!entityType=QUOTE&amp;entityReference='+row.majesco_transaction_id+'">'+row.majesco_transaction_id+'</a>';
            }else{
              return '';
            }
           
          }
         },*/
         { "data": "policy_number" },
         { "data": "lob" },
         { "data": "broker_name" },
         {
          "render": function(data, type, row) {
           return formatedate(row.acc_effective_date);
          }
         },
         // { "data": "accounttype" },
         { "data": "accountstatus" },
          {  
            "render": function(data, type, row) {  

              if (row.is_lost == '1') {
                  return 'Lost | <a href="javascript:void(0);" onclick="accountrevoke_popup('+row.id+')" >Restore</a> ';
              }else if (row.is_lost == '2') {
                  return 'Declined | <a href="javascript:void(0);" onclick="accountrevoke_popup('+row.id+')" >Restore</a>';
              }else if (row.is_lost == '3') {
                  return 'Cancel | <a href="javascript:void(0);" onclick="accountrevoke_popup('+row.id+')" >Restore</a>';
              }else{
                  return 'Deleted | <a href="javascript:void(0);" onclick="accountrevoke_popup('+row.id+')" >Restore</a>';  
              }

            }    
          },
         { "data": "primary_assignee_name" },
       ],
       'beforeSend': function () {
            $('.loader').show();
        },
        complete: function() {
          $('.loader').fadeOut('slow');
        }
    } );

    // datatable_sifn(filterarchive_table);
  }

// Advance Filter search End


$(document).on('click','.accountdelete',function(){
    
    if ($('.session_hide_tab').find('.active').find('.accountid').val() == '') {
      var accountid = $(this).data('accid');
    }else{
      var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
    }

  $.ajax({
        url: laravel_url+"/accountdelete",
        type:'post',
        data:{accountid:accountid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              $('.accountdeletecancel').trigger('click');
              accounttablelist();
              $('.changeaccount_status').removeAttr('data-accid');
              $('.accountdelete').removeAttr('data-accid');
              redirect_oldaccount();
              new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
            }else{
              $('.accountdeletecancel').trigger('click');
              accounttablelist();
              $('.changeaccount_status').removeAttr('data-accid');
              $('.accountdelete').removeAttr('data-accid');
              new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }
        }
    });

});



$(document).on('click','.indiSummary',function(){
   getallindication_summary();
});

// get all indicative premium summary tab
function getallindication_summary(){

    var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();

    var summarydatatable = $('#summarydatatable').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "async": false,
        "sAjaxSource": laravel_url+"/getallindications/"+accountid+"",
        "columns": [
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.effective_date);
           }
          },
          { "data": "majesco_transaction_id" },
          { "data": "total_premium" },
          // {
          //  "render": function(data, type, row) {
          //   return 'Total Amount';
          //  }
          // },
          {
           "render": function(data, type, row) {

            return '<a  class="mpas_link" '+specific_diable_style+'  target="_blank" href = "'+global_maj_link+'pct#!entityType=QUOTE&entityReference='+row.majesco_transaction_id+'">MPas</a>'+
                    ' | <a href="javascript:void(0);" data-quoteid="'+row.acc_rep_id+'" class="addRow" >View</a>'+
                    ' | <a href="'+laravel_url+'/generate_quote_pdf_majtransid/'+row.majesco_transaction_id+'?'+new Date().getMilliseconds()+'" target="_blank">PDF</a>';
           }
          },
        ]
    });

    datatable_sifn(summarydatatable);
} 


$(document).on('click','.addRow',function(){

  var quoteid = $(this).data('quoteid');
  $(this).closest('tr').next('.remove_this_tr').remove();
  var closetable =  $(this).closest('tr');

    $.ajax({
        url: laravel_url+"/getspecificquote",
        type:'post',
        data:{quoteid:quoteid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
          $('.remove_this_tr').remove();
          $('<tr class="remove_this_tr"><td colspan="5">'+response+'</td></tr>').insertAfter(closetable);
        }
    });
});


$(document).on('focusout','.doccustom_filename',function(){
  var docid = $(this).data('docid');
  var docname = $(this).val();

  $.ajax({
        url: laravel_url+"/doccustom_filename",
        type:'post',
        data:{docid:docid,docname:docname},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              archivetablelist();
              new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
            }else{
              archivetablelist();
              new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }
        }
    });

});

$(document).on('focusout','.doccustom_dragtype',function(){
  var docid = $(this).data('docid');
  var doctype = $(this).val();

  $.ajax({
        url: laravel_url+"/doccustom_dragtype",
        type:'post',
        data:{docid:docid,doctype:doctype},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              archivetablelist();
              new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
            }else{
              archivetablelist();
              new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }
        }
    });

});

$(document).on('focusout','.email_dragtype',function(){
  var emailid = $(this).data('emailid');
  var emailtype = $(this).val();

    $.ajax({
        url: laravel_url+"/email_dragtype",
        type:'post',
        data:{emailid:emailid,emailtype:emailtype},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
            }else{
              new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }
        }
    });

});


$(document).on('click','.revokeaccount',function(){
  // var accid = $('his).data('accid');
  // var accid = $('.hiddenrevokeid').val();

  $.ajax({
        url: laravel_url+"/revokeaccount",
        type:'post',
        data:{accid:accid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              archivetablelist();
              window.location.reload();
              new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
            }else{
              archivetablelist();
              new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }
        }
    });

});

$(document).on('click','.front_acc_actions',function(){
  // var accid = $(this).data('accid');

  $('.changeaccount_status').removeAttr('data-accid');
  $('.accountdelete').removeAttr('data-accid');

  $('.changeaccount_status').attr('data-accid',accid);
  $('.accountdelete').attr('data-accid',accid);
});

//quick code section is started

var policy_status;
var majesco_transaction_id='';
var term_status;
var global_limit_slider=1221;
var global_deduct_slider = 0;
var class_code_length = 0;
var cc_global,mjq=0;
var sub_switch_status = "submission";
var host = window.location.hostname;
var protocol = window.location.protocol;
var base_url = protocol+"//"+host;
var accountid;
var email_db_id;


$(document).on('click', '.get_code_account', function () {
    get_a_ratedcodes('rate_click');
    var timer = setInterval(function() {
        if ($('tbody').hasClass('rate_table')) {
            $('.rate_table').show();
            $('.totpremium').show();
            clearInterval(timer);
        }
    }, 200);
});

function quote_api_ajax(class_code, zip, loc_array, exp, transaction_id, api_method, limits, deductible, api_url, class_code_length,city_array,locat_array,class_coverage_array,term,a_source) {
	
asy_op = false;
if(api_method=='basic_quote_info')
{
    asy_op = true;
}

effective_date_gl = $('.effective_from').val()
ac_tname = $('#ac_tname').val();
ac_mailAdd = $('#ac_mailAdd').val();
ac_mailAdd_zip = $('#ac_mailAdd_zip').val();
ac_mailAdd_city = $('#ac_mailAdd_city').val();
var check1=true;

    setTimeout(function () {

        var jqXHR = $.ajax({

            url: api_url,
            method: 'post',
            async: asy_op,
            data: {
                "insured_object": {
                    "business_description": "New Business",
                    "business_name": ac_tname,
                    "insured_zip": ac_mailAdd_zip,
                    "insured_line1": ac_mailAdd,
					          "insured_city": ac_mailAdd_city
                    },
                    "business_location": {
                    "class_code": "",
                    "insured_zip": "",
                    "line1": locat_array,
                    "exposure": ""
                    },
                    "method": api_method,
                    "transaction_id": transaction_id,
                    "limits": limits,
                    "deductible": deductible,
                    "effective_date": effective_date_gl,
                    "effective_term": term_status,
            				"class_code_json": class_code,
            				"zip_code_json": zip,
            				"exposure_json": exp,
            				"city_json":city_array,
            				"location_no": loc_array,
                    'coverage':class_coverage_array,
                    'term':term
				            },
            dataType: 'json',
            success: function (response) {
                if(response){
                    var arate_count = 0;
                    var res_leng = response['result'].length;
                    var cc_array_res = $.map(response['result'], function(value, index){
                        return [value];
                    });

                    for (i = 0; i < res_leng; i++) {  
                        var jc = i+1;
                        var lli_coverage = cc_array_res[i]["coverage"];
                        if(lli_coverage == 'CGL,PCO' || lli_coverage == 'CGL'){

                            var israte_premOps = cc_array_res[i][jc]["Result"]["PremOps"]['Is_arate'];
                            var israte_prodCops = cc_array_res[i][jc]["Result"]["ProdCops"]['Is_arate'];
                            var isIlfrate_premOps = cc_array_res[i][jc]["Result"]["PremOps"]['Is_ILF_arate'];
                            var isIlfrate_prodCops = cc_array_res[i][jc]["Result"]["ProdCops"]['Is_ILF_arate'];
                            var premops_final = "N";
                            var prodcops_final = "N";
                            var is_arate = "N";

                            if (israte_premOps == 'Y' || isIlfrate_premOps == 'Y') {
                                premops_final = "Y";            
                            }

                            if (israte_prodCops == 'Y' || isIlfrate_prodCops == 'Y') {
                                prodcops_final = "Y";
                            }

                            if  (premops_final == "Y" && prodcops_final == "Y") {
                                is_arate = "Y";
                            }

                            if (is_arate == "Y") {
                                arate_count = arate_count + 1;
                                $('#isotext' + i).text('* A Rates');
                                $('#isotext' + i).addClass('get_iso_rate_length');
                            } else {
                                $('#isotext' + i).text('');
                                $('#isotext' + i).removeClass('get_iso_rate_length');
                            }
                       
                        }else if(lli_coverage == 'LLL'){

                            var is_arate = cc_array_res[i][jc]["Result"]["LiquorLiability"]['Is_arate'];
                            if (is_arate == "Y") {
                                arate_count = arate_count + 1;
                                $('#isotext' + i).text('* A Rates');
                                $('#isotext' + i).addClass('get_iso_rate_length');
                            } else {
                                $('#isotext' + i).text('');
                                $('#isotext' + i).removeClass('get_iso_rate_length');
                            }

                        } else if (lli_coverage == 'OCP') {

                            var is_arate = cc_array_res[i][jc]["Result"]["OCP"]['Is_arate'];
                            if (is_arate == "Y") {
                                arate_count = arate_count + 1;
                                $('#isotext' + i).text('* A Rates');
                                $('#isotext' + i).addClass('get_iso_rate_length');
                            } else {
                                $('#isotext' + i).text('');
                                $('#isotext' + i).removeClass('get_iso_rate_length');
                            }

                        }
                    }

                    if (arate_count > 0) {           
                        $('.get_code_account').addClass('disabled'); 
                        $('.quickcodeloading_btn').css('display','none');
                    } else {
                        $('.get_code_account').removeClass('disabled');
                        cc = JSON.parse(SIC_business_class)
                        rate_table_display(response['result'],cc);

                        majesco_transaction_id = Math.floor(1000000000 + Math.random() * 9000000000);
        				        response_json = JSON.stringify(response);
        				      
              				 var data = {        
              					'majesco_transaction_id': 'v5-'+majesco_transaction_id,
              					'email_db_id': email_db_id,
              					'prem_res':response_json,
              					'total_pre_val':quote_total_premium
              				 };
        				        
                      
                        if (a_source == 'rate_click'){
                          quote_data_insert(data); 
                          $('.htmlToPdfBtn').removeClass('d-none'); 
                            if(quote_total_premium){
                              new PNotify({ title: 'Success', text: 'Premium is generated Successfully', delay: 2000, type: 'success' });
                            }
                        }
                        
                    }

                  } else {
                      new PNotify({ title: 'Error', text: 'Premium is not generated', delay: 2000, type: 'error' });
                  }
              },


          });

  }, 0);


}

function rate_table_display(response,class_code) {
  
    var res_leng = response.length;

     var cc_array_res = $.map(response, function(value, index){
        return [value];
    });

    for (i = 0; i < res_leng; i++) {  

      var jc = i+1;

		var lli_coverage = cc_array_res[i]["coverage"];
   
    var class_app=class_code[i];

		 if(lli_coverage == 'CGL,PCO' || lli_coverage == 'CGL'){

         var premium = cc_array_res[i][jc]["Result"]["PremOps"]['ProPremium'];
         //var is_arate = cc_array_res[i][jc]["Result"]["PremOps"]['Is_arate'];
            premium = Math.ceil(premium);
            coverage = "PremOps";
            total_premium.push(premium);
          var israte_premOps = cc_array_res[i][jc]["Result"]["PremOps"]['Is_arate'];
          var israte_prodCops = cc_array_res[i][jc]["Result"]["ProdCops"]['Is_arate'];
          var isIlfrate_premOps = cc_array_res[i][jc]["Result"]["PremOps"]['Is_ILF_arate'];
          var isIlfrate_prodCops = cc_array_res[i][jc]["Result"]["ProdCops"]['Is_ILF_arate'];
          var premops_final = "N";
          var prodcops_final = "N";
          var is_arate = "N";

          if (israte_premOps == 'Y' || isIlfrate_premOps == 'Y') {
              premops_final = "Y";            
          }

          if (israte_prodCops == 'Y' || isIlfrate_prodCops == 'Y') {
              prodcops_final = "Y";
          }

          if  (premops_final == "Y" && prodcops_final == "Y") {
              is_arate = "Y";
          }


            if(is_arate == "Y"){
              $('#isotext'+i).text('* A Rates');
            }else{
              $('#isotext'+i).text('');
            }

            var tr_code = cc_array_res[i][jc]["Result"]["Tcode"];
            var trr_ch = $('#ziptext'+i).text();
            trr_ch = trr_ch.replace('TC:-','TC:'+tr_code+',',trr_ch);

            $('#ziptext'+i).text('').text(trr_ch);

            var LossCost1 = parseFloat(cc_array_res[i][jc]["Result"]["PremOps"]['LossCost']);
            var LossCostMultiplier1 = parseFloat(cc_array_res[i][jc]["Result"]["PremOps"]["LostcostModifier"]);
            var BaseRate1 = parseFloat(cc_array_res[i][jc]["Result"]["PremOps"]['BaseRate']);
            var IncLmtLessDedFact1 = parseFloat(cc_array_res[i][jc]["Result"]["PremOps"]['IncLimitFactor']);
            var AdjBaseRate1 = parseFloat(cc_array_res[i][jc]["Result"]["PremOps"]['AdjBaseRate']);
            
            coverage2 = 'ProdCops';
            var premium2 = cc_array_res[i][jc]["Result"]["ProdCops"]['ProPremium'];
            premium2 = Math.ceil(premium2);
            total_premium.push(premium2);            
            
            var LossCost12 = parseFloat(cc_array_res[i][jc]["Result"]["ProdCops"]['LossCost']);
            var LossCostMultiplier12 = parseFloat(cc_array_res[i][jc]["Result"]["ProdCops"]["LostcostModifier"]);
            var BaseRate12 = parseFloat(cc_array_res[i][jc]["Result"]["ProdCops"]['BaseRate']);
            var IncLmtLessDedFact12 = parseFloat(cc_array_res[i][jc]["Result"]["ProdCops"]['IncLimitFactor']);
            var AdjBaseRate12 = parseFloat(cc_array_res[i][jc]["Result"]["ProdCops"]['AdjBaseRate']);
            
            var LC = parseFloat(LossCost1)+parseFloat(LossCost12);
            LC = (LC).toLocaleString();

            var BR = parseFloat(BaseRate1)+parseFloat(BaseRate12);
            BR = (BR).toLocaleString();

            var ABR = parseFloat(AdjBaseRate1)+parseFloat(AdjBaseRate12);
            ABR = (ABR).toLocaleString();

            var LCM = LossCostMultiplier1;     
            var Total_Pre = premium + premium2;
            var ILF = IncLmtLessDedFact1+'/'+IncLmtLessDedFact12;
         
        $('.rate_table').append('<tr class="remove_prem Iso_gl_prem_rw"><td style="text-align:left;" class="get_Ccode">' + class_app + '</td><td class="get_pc">' + coverage + '</td><td class="get_lc" style="text-align:right;">' + LossCost1 + '</td><td class="get_lcm" style="text-align:right;">' + LossCostMultiplier1 + '</td><td class="get_br" style="text-align:right;">' + BaseRate1 + '</td><td class="get_ilf" style="text-align:right;">' + IncLmtLessDedFact1 + '</td><td class="get_abr" style="text-align:right;">' + AdjBaseRate1 + '</td><td class="get_premium" style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + premium + '</span></td></tr>');
        $('.prem_comma').simpleMoneyFormat();

        $('.rate_table').after().append('<tr class="Iso_gl_prem_rw"><td style="text-align:left;" class="get_Ccode"></td><td class="get_pc">' + coverage2 + '</td><td class="get_lc" style="text-align:right;">' + LossCost12 + '</td><td class="get_lcm" style="text-align:right;">' + LossCostMultiplier12 + '</td><td class="get_br" style="text-align:right;">' + BaseRate12 + '</td><td class="get_ilf" style="text-align:right;">' + IncLmtLessDedFact12 + '</td><td class="get_abr" style="text-align:right;">' + AdjBaseRate12 + '</td><td class="get_premium" style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + premium2 + '</span></td></tr><tr class="Iso_total_prem"><td class="text-left fontweight500">Total</td><td></td><td  style="text-align:right;">'+LC+'</td><td style="text-align:right;">'+LCM+'</td><td  style="text-align:right;">'+BR+'</td><td style="text-align:right;">'+ILF+'</td><td  style="text-align:right;">'+ABR+'</td><td style="text-align:right;font-weight:bold;">$<span class="prem_comma" >'+Total_Pre+'</td></tr>');
        $('.prem_comma').simpleMoneyFormat();

   
      }else if(lli_coverage == 'LLL'){

            var premium = cc_array_res[i][jc]["Result"]["LiquorLiability"]['ProPremium'];
            premium = Math.ceil(premium);
            coverage = "LiquorLiability";
            total_premium.push(premium);
            var is_arate = cc_array_res[i][jc]["Result"]["LiquorLiability"]['Is_arate'];

              if(is_arate == "Y"){
                $('#isotext'+i).text('* A Rates');
              }else{
                $('#isotext'+i).text('');
              }

              var tr_code = cc_array_res[i][jc]["Result"]["Tcode"];
              var trr_ch = $('#ziptext'+i).text();
              trr_ch = trr_ch.replace('TC:-','TC:'+tr_code+',',trr_ch);

              var LossCost1 = parseFloat(cc_array_res[i][jc]["Result"]["LiquorLiability"]['LossCost']);
              var LossCostMultiplier1 = parseFloat(cc_array_res[i][jc]["Result"]["LiquorLiability"]["LostcostModifier"]);
              var BaseRate1 = parseFloat(cc_array_res[i][jc]["Result"]["LiquorLiability"]['BaseRate']);
              var IncLmtLessDedFact1 = parseFloat(cc_array_res[i][jc]["Result"]["LiquorLiability"]['IncLimitFactor']);
              var AdjBaseRate1 = parseFloat(cc_array_res[i][jc]["Result"]["LiquorLiability"]['AdjBaseRate']);

                $('.rate_table').append('<tr class="remove_prem Iso_liq_prem_rw"><td style="text-align:left;" class="get_Ccode">' + class_app + '</td><td class="get_pc">' + coverage + '</td><td class="get_lc" style="text-align:right;">' + LossCost1 + '</td><td class="get_lcm" style="text-align:right;">' + LossCostMultiplier1 + '</td><td class="get_br" style="text-align:right;">' + BaseRate1 + '</td><td class="get_ilf" style="text-align:right;">' + IncLmtLessDedFact1 + '</td><td class="get_abr" style="text-align:right;">' + AdjBaseRate1 + '</td><td class="get_premium" style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + premium + '</span></td></tr><tr><td class="text-left fontweight500">Total</td><td></td><td  style="text-align:right;">'+LossCost1+'</td><td style="text-align:right;">'+LossCostMultiplier1+'</td><td  style="text-align:right;">'+BaseRate1+'</td><td style="text-align:right;">'+IncLmtLessDedFact1+'</td><td  style="text-align:right;">'+AdjBaseRate1+'</td><td style="text-align:right;font-weight:bold;">$<span class="prem_comma" >'+premium+'</td></tr>');
        $('.prem_comma').simpleMoneyFormat();

      }else if(lli_coverage== 'OCP'){

            var premium = cc_array_res[i][jc]["Result"]["OCP"]['ProPremium'];
            premium = Math.ceil(premium);
            coverage = "OCP";
            total_premium.push(premium);
            var is_arate = cc_array_res[i][jc]["Result"]["OCP"]['Is_arate'];

               if(is_arate == "Y"){
                  $('#isotext'+i).text('* A Rates');
                }else{
                $('#isotext'+i).text('');
              }

              var tr_code = cc_array_res[i][jc]["Result"]["Tcode"];
              var trr_ch = $('#ziptext'+i).text();
              trr_ch = trr_ch.replace('TC:-','TC:'+tr_code+',',trr_ch);

              var LossCost1 = parseFloat(cc_array_res[i][jc]["Result"]["OCP"]['LossCost']);
              var LossCostMultiplier1 = parseFloat(cc_array_res[i][jc]["Result"]["OCP"]["LostcostModifier"]);
              var BaseRate1 = parseFloat(cc_array_res[i][jc]["Result"]["OCP"]['BaseRate']);
              var IncLmtLessDedFact1 = parseFloat(cc_array_res[i][jc]["Result"]["OCP"]['IncLimitFactor']);
              var AdjBaseRate1 = parseFloat(cc_array_res[i][jc]["Result"]["OCP"]['AdjBaseRate']);

                $('.rate_table').append('<tr class="remove_prem Iso_ocp_prem_rw"><td style="text-align:left;" class="get_Ccode">' + class_app + '</td><td class="get_pc">' + coverage + '</td><td class="get_lc" style="text-align:right;">' + LossCost1 + '</td><td class="get_lcm" style="text-align:right;">' + LossCostMultiplier1 + '</td><td class="get_br" style="text-align:right;">' + BaseRate1 + '</td><td class="get_ilf" style="text-align:right;">' + IncLmtLessDedFact1 + '</td><td class="get_abr" style="text-align:right;">' + AdjBaseRate1 + '</td><td class="get_premium" style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + premium + '</span></td></tr><tr><td class="text-left fontweight500">Total</td><td></td><td  style="text-align:right;">'+LossCost1+'</td><td style="text-align:right;">'+LossCostMultiplier1+'</td><td  style="text-align:right;">'+BaseRate1+'</td><td style="text-align:right;">'+IncLmtLessDedFact1+'</td><td  style="text-align:right;">'+AdjBaseRate1+'</td><td style="text-align:right;font-weight:bold;">$<span class="prem_comma" >'+premium+'</td></tr>');
        $('.prem_comma').simpleMoneyFormat();

        }

        quote_total_premium = quote_total_premium + premium;
        $('.rate_table').hide();
    
    }
  //$('.htmlToPdfBtn').removeClass('d-none');
  
}

function quote_data_insert(data) {
	
    $.ajax({
        url: laravel_url+"/get_quote_majescoapi",
        data: data,
        method: 'post',
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function () {

        },
        success: function (response) {
			
        },
        error: function () {


        },
        complete: function () {
            $('.loader').hide();
            var premium_sum = 0;
            total_premium_fn();
        }

    });
}

function total_premium_fn() {
    var premium_sum = 0;
    for (i = 0; i < total_premium.length; i++) {
        if (total_premium[i] != '') {
            premium_sum += parseInt(total_premium[i]);
        }

    }

    //$('.totpremium').show();
    $('.totpremium').html('$<span class="tp_comma">' + premium_sum + '</span>');
    $('.tp_comma').simpleMoneyFormat();
    $('.exposure_money').val(premium_sum);
    //$('.ac_tipre').simpleMoneyFormat();
    $('.quickcodeloading_btn').hide();
    $('.show_savepdf_btn').show();
    if ($('.quick_quote').data('sstatus') == 'qq') {
        $('.save_this_quote').show()
    }

}







setTimeout(function(){ $('.notes_date').val(getcurrentdate());}, 5000);



// });


/* ISO Pricing section reset */

function submission_clear(){ 

$(".iso_eff_date").val('');
 $('.copy_addd').html('');
 $('.exposure_row').not(':first').remove();
 $(".Qexposure_amount").val('');
 $(".Qzip_code_submission").val('');
 $(".Qclass_code_submission").val('');
 $(".city").val('');
 $("#loc_add0").val('');
 $("#ctext0").text('');
 $('#ziptext0').text('');
 $('#pbtext0').text('');
 $('#isotext0').text('');
 $('.rate_table').empty();
 $('.tp_comma').empty();
 $('.showquote_id').empty();
 $('.exposure_money').val('');
 $('.totpremium').html('');
 $('input[id="switchValue"]').prop('checked', false);
 $('#premises_operations').attr('checked', true);
 $('#prod_comp_op').attr('checked', true);
 $('#liquor_lib').attr('checked', false);
 var $slider = $("#addsubmission_form").find("#inline-radios1");
 var slider_instance = $slider.data("ionRangeSlider");
 slider_instance.reset();
 $(".Qzip_code_submission").attr('disabled',false);
 $('select[name="city"]').attr('disabled',false);
 $(".loc_add").attr('disabled',false);
 $('.show_savepdf_btn').hide();
 $('.file_name_wrap').hide();
 $('#file_name').val('');
 $('.sendmail_closebtn').trigger('click');
 $('.Qclass_code_coverage').val('');
 $('.get_code_account').removeClass('disabled'); 
 $('.htmlToPdfBtn').addClass('d-none');
 $('#isoLiquor').attr('checked', false);
 $('#isoOCP').attr('checked', false);
 }

function bind_add_quote_list (acc_id) {
    return $.ajax({
        url: laravel_url+"/bind_add_quote_list",
        type:'post',
        data:{acc_id:acc_id},
        success:function(response){
            var obj =JSON.parse(response);
            var quote_pdf_names='<a href="javascript:void(0);" class="slect_qte_list" data-id="new" data-accountid="'+acc_id+'" id="new_quoteVersion"> New </a>';
            if(obj.data){
              if(obj.data.length > 0){
                for(var i in obj.data){
                  if (obj.data[i].lob == "GL") {
                    quote_pdf_names +='<a href="javascript:void(0);" class="slect_qte_list" data-id="'+obj.data[i].id+'" data-accountid="'+obj.data[i].accountid+'">'+ obj.data[i].pdfname+'</a>'
                  }
                }
              } 
            }

            $('#add_quote_list').html(quote_pdf_names);

        },

        complete: function () {

        }
    });
}

function generate_first_Quoteversion() { 
  var qversion = $('.rqbiQuoteVersion').val();
  if(qversion == ''){
    $('#new_quoteVersion').click();
  }
}


$(document).ready(function(){

    $(document).on('click', '.slect_qte_list', function(){
      $('.slect_qte_list').addClass('disable_click_quote_new',);
      var check_brokvalid = check_account_brok_valid();
      if(check_brokvalid == 1){
        $('.qvSpinner').show();
        today = mm + '/' + dd + '/' + yyyy;

        var ten_pdfhistory_id = $(this).attr('data-id');
        var accountid = $(this).attr('data-accountid');
        var get_click_name = $(this).text();
        var get_indication_no = $(this).data('id');
        var indication_hide_id = $('#indication_hide_id').val(ten_pdfhistory_id);
        var policy_type ='1';
          /*Close all accordion except Location details accordion*/
          $('.rqbi_all_tabs').addClass('collapsed');
          $('#coverageLimitAccord, #cbAccord, #additionalAccAccord, #subjectivitiesAccord, #ocAccord, #additionalInsuredAccord, #selectFormsAccord, #selectFormsAccord, #optionalCovAccord, #manuscriptAccord, #quoteAccord, #bindAccord, #issueAccord').removeClass('show');

          $('.locDetAccord').removeClass('collapsed');
          $('#locationAccord').addClass('show');
          
          $.ajax({
              url: laravel_url+"/get_last_quote_name",
              type:'post',
              data:{accountid:accountid,ten_pdfhistory_id:ten_pdfhistory_id},
              success:function(response){
                  var obj =JSON.parse(response);
                  if(obj.data){

                    if(obj.data.length > 0){
                      var dta_splt =obj.data[0].quote_name.split("-");
                      
                      if(dta_splt[0].charAt(2)){
                        var char_second = dta_splt[0].charAt(1)+dta_splt[0].charAt(2);
                      }else{
                        var char_second = dta_splt[0].charAt(1);
                      }
                      var quote_name_incrmnt = parseInt(char_second)+parseInt(1);
                      var quote_version_incrmnt = parseInt(obj.data[0].quote_version)+parseInt(1);
                      var cr_quote_name = "Q"+quote_name_incrmnt+"-$0-"+today;
                      var cr_quote_version = quote_version_incrmnt;
                      add_rqbi(accountid,policy_type,cr_quote_name,cr_quote_version,ten_pdfhistory_id,get_click_name,get_indication_no);
                    }
                    else{
                      var cr_quote_version = 1;
                      var cr_quote_name = "Q1-$0-"+today;
                      add_rqbi(accountid,policy_type,cr_quote_name,cr_quote_version,ten_pdfhistory_id,get_click_name,get_indication_no);

                    }

                  }
                  
              },complete : function(){
                
                $('.qvSpinner').hide();
                $('.slect_qte_list').addClass('rqbinewaccount');
                $('.cbGraduatedTableDiv').hide();
                $('.classbuildGraduatedRating').addClass('disabled');
                $('.modify_exposure_rate').css('display','none');
                $('.AddGraduatedRating').removeClass('enable_grad_rating');
                $('.AddGraduatedRating').removeClass('disabled');
                if (xl_lob_change == true){
                  $(".xlQuoteTable").attr('data-retreivequota', 0);
                  clear_coverages(1);
                  $('#coverageLimit_sec').attr('data_coverage_retrieved', 0);
                }
                $('.cov_gl_type').prop('checked', false);
                $('.slect_qte_list').removeClass('disable_click_quote_new');
              },error:function(data){
                $('.qvSpinner').hide();
                $('.slect_qte_list').removeClass('disable_click_quote_new');
              }
          });

          if(ten_pdfhistory_id == "new"){

            $('.loc_input_fields_wrap').html('<div data-locrowid="1" data-locno="1" class="col-md-12 pull-left p-0 locbigdiv locDiv incRow locMainDiv locMainDiv_'+inc_rowid+'"><div class="pull-left col-md-11 p-0"><div class="pull-left locCount"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">L1</label></div></div><div class="col-md-3 pull-left pl-0"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Address 1</label><div class="txttooltip"><input type="text" class="form-control locAddress1 get_loc_onblr" data-column="address1" data-Lid="1" id="locAddress1_1" name="locAddress1" placeholder="Enter Address 1"></div></div></div><div class="col-md-2 pull-left"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Address 2 </label><div class="txttooltip"><input type="text" class="form-control locAddress2 get_loc_onblr" data-column="address2" data-Lid="1" id="locAddress2_1" placeholder="Address 2"></div></div></div><div class="col-md-2 pull-left"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Zip Code</label><input type="text" class="form-control locZipcode get_loc_onblr" data-column="zip" data-Lid="1" id="locZipcode_1" data-rowid="1" placeholder="Zip Code"></div></div><div class="col-md-2 pull-left"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">City</label><span class="locationCity_1 locCitySpan_1"><select class="form-control loc_city_name_hide_1 locCity location_cty_onchg" data-Lid="1" id="locCity_1" name="loc_city_name_hide_1" placeholder="City"></select></span></div></div><div class="col-md-2 pull-left"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">State</label><div class="txttooltip"><input readonly type="text" class="form-control locState get_loc_onblr" data-column="state" data-Lid="1" id="locState_1" placeholder="State"></div></div></div></div><div class="pull-left col-md-1 p-0" style="position: relative; right: -6px;"><div class="pull-left mt35 p-0 position_relative"><span class="mt-1 mr-1 locAdd loc_add_field_button"  data-add-rowid="1" data-toggle="tooltip" data-html="true" data-placement="top" data-total-count="1" data-original-title="<em> Add </em>" ><i class="fa fa-plus-circle" aria-hidden="true"></i></span><span id="locDelete_1" style="display:none;" class="bg-danger mt-1 mr-1 locDelete remove_field" data-rowid="1" data-toggle="tooltip" data-html="true"  data-placement="top" data-original-title="<em> Delete </em>"><i class="fa fa-minus-circle" aria-hidden="true"></i></span><span class="mt-1 bg-info locClone" data-loccloneid="1" data-rowid="1"  data-toggle="tooltip" data-html="true" data-placement="top" data-original-title="<em> Clone </em>"><i class="fa fa-files-o" aria-hidden="true"></i></span></div></div></div>');
          }else{
            $('#copyAddrCheck').prop('checked',false);
          }
        
      }
        

    });

});


function add_rqbi (accountid,policy_type,cr_quote_name,cr_quote_version,ten_pdfhistory_id,get_click_name,get_indication_no){

    var created_by =localStorage.getItem('usernumericid');
    var created_on = yyyy+'-'+mm+'-'+dd;
    var quote_id = $('#sub_number').text();
    var uni_com_id = (new Date).getTime();
    
    
    $.ajax({
      url: laravel_url+"/add_rqbi",
      type:'post',
      data:{acct_id:accountid,quote_id:quote_id,quote_name:cr_quote_name,quote_version:cr_quote_version,policy_type:policy_type,created_by:created_by,created_on:created_on,com_id:uni_com_id,get_click_name:get_click_name},
      success:function(response){
        var obj =JSON.parse(response);
        get_inserted_comid = obj.data[0].com_id;
        get_inserted_rqbiid = obj.data[0].rid;
        $('.subjAccordHeader').addClass('collapsed');
				$('#subjectivitiesAccord').removeClass('show');
				$('.subjAccordHeader').removeAttr('sub_retrieved');
				$('.SubjListTable').html("");
				$(".addSubjDiv").html("");
        $(".rqbiAddDueDate ").html('');
        $(".locZipcode").removeAttr('data-previous_zip');
        $(".cbClasscode").removeAttr('data-previous_classcode');
      },
      complete: function() {
          get_quote_version_list(accountid,ten_pdfhistory_id,get_click_name,get_indication_no);
          if (xl_lob_change == true) {
            var checked = $('#xlCov_gl').prop('checked');
            var PrimaryState = $("#covPrimaryState").val();
            $("#xlTypeLead").prop("checked", true);
            var type = ($("input[name='xlType']:checked").val() == "lead") ? 1 : 2; 
            var supportedtype = ($("input[name='supportRadio']:checked").val() == "supportEx") ? 0 : 1; 
            coverage_limit_insert({ primary_state : PrimaryState, type: type, is_supported: supportedtype, com_id : get_inserted_comid,rqbi_id : get_inserted_rqbiid });
            if (checked == true) {
              save_ugl_default_accord(get_inserted_comid, get_inserted_rqbiid);
            }
          }
        $('.slect_qte_list').removeClass('disable_click_quote_new');
      }

    });


}

function get_rqbitable_Details(accid,quote_version_name) {

    $.ajax({
        url: laravel_url+"/get_rqbitable_Details",
        type:'post',
        data:{accid:accid,quote_id:quote_version_name},
        success:function(response){
            var obj =JSON.parse(response);
            getRqbieffDate(obj,0);
            if(obj.data[0].policy_type == 1) {

                $('#rqbiOccurance').prop('checked',true);

            } else {

                $('#rqbiClaims').prop('checked',true); 
            }


            if(obj.data[0].form_select_override == 1) {

                $('.override_required').prop('checked',true);

            } else {

                $('.override_required').prop('checked',false);
            }
           
        },
        complete: function() {

        }

    });

}


function getRqbieffDate(obj,i) {


            $('#rqbieffdate').removeClass('errorBorder');
            $('#rqbiexpdate').removeClass('errorBorder');
            $('#effDateEmptyValid').hide();
            $('#expDateValid').hide();
            var rqbi_efft_dt = obj.data[i].rqbi_effective_date;
            var rqbi_exp_dt = obj.data[i].rqbi_expiry_date;

            if(rqbi_efft_dt === null || rqbi_efft_dt == '0000-00-00'){
                $('#rqbieffdate').val('');
            } else {
                var rqbi_eff_dt_spl = rqbi_efft_dt.split('-');
                var rqbi_efft_dt_org = rqbi_eff_dt_spl[1]+'-'+rqbi_eff_dt_spl[2]+'-'+rqbi_eff_dt_spl[0];
                $('#rqbieffdate').val(rqbi_efft_dt_org);
                $("#rqbi_effect_dt").datepicker({ 
                    autoclose: true, 
                }).datepicker('update', new Date(rqbi_efft_dt_org));
            }

            if(rqbi_exp_dt === null || rqbi_exp_dt == '0000-00-00'){
                $('#rqbiexpdate').val('');
            } else {
                var rqbi_exp_dt_spl = rqbi_exp_dt.split('-');
                var rqbi_exp_dt_org = rqbi_exp_dt_spl[1]+'-'+rqbi_exp_dt_spl[2]+'-'+rqbi_exp_dt_spl[0];
                $('#rqbiexpdate').val(rqbi_exp_dt_org);
                $("#rqbi_expir_dt").datepicker({ 
                    autoclose: true, 
                }).datepicker('update', new Date(rqbi_exp_dt_org));
                $('#rqbi_expir_dt').datepicker('setStartDate', new Date(rqbi_efft_dt_org))
            }
}

function get_quote_version_list(accountid,ten_pdfhistory_id,get_click_name,get_indication_no) {

    $.ajax({
      url: laravel_url+"/get_quote_version_list",
      type:'post',
      data:{accid:accountid},
      success:function(response){
          $('.rqbi_rhspane_section').hide();
          $('.rqbi_according_section').addClass('col-md-12');
          $('.rqbi_according_section').removeClass('col-md-10');
          $('.composite_class_code_div').removeClass('col-md-4');
          $('.composite_class_code_div').addClass('col-md-5');
          $('.quote_policy_details_btn').show();

          removeAccordionHighlights();


          //$('.cbAccordHeader').click();

          var obj =JSON.parse(response);
          var chs_vl ="";
          var chs_comid="";
          var policy_type="";
          var quote_version_option='';
          var get_click_name ='';
          var quote_append_name = '';

          var form_select_override = 0;
          
          if(obj.data.length < 1){
              $('.aiFormsAccord, .commonFormsAccord, .rqbi_allforms_tabs').addClass('accordDisabled');
          }
          
          if(obj.data){
            if(obj.data.length > 0){
              $('.rqbi_all_tabs, #locationAccord, .cbContinueFullquote').removeClass('accordDisabled');
              
              var chs_vl1 = obj.last_chs_val;
              var last_com_id1 = obj.last_com_id;

              for(var i in obj.data){

                quote_version_option +='<option value="'+obj.data[i].rid+'">'+obj.data[i].quote_name+'</option>';
                chs_comid = obj.data[i].com_id;
                chs_vl = obj.data[i].rid;
                policy_type=obj.data[i].policy_type;
                get_click_name=obj.data[i].quote_click_name;
                rqbi_coverage=obj.data[i].coverages;
                form_select_override = obj.data[i].form_select_override;

              }
              getRqbieffDate(obj,i);
            } else {
              quote_version_option+='<option value=""> Select </option>';
              $('.rqbi_all_tabs, #locationAccord, .cbContinueFullquote').addClass('accordDisabled');
              //$('.glLiquor').prop('checked',true);
              generate_first_Quoteversion();
            }
          }

          var last_val = '';
          if (chs_vl1 == '') {

              last_val = chs_vl;

          } else {

              last_val = chs_vl1;
          }

          var last_com_id_val = '';

          if (last_com_id1 == '') {

              last_com_id_val = chs_comid;

          } else {

              last_com_id_val = last_com_id1;
          }
          
          $('#rqbiQuoteVersion').html(quote_version_option);
          $('#rqbiQuoteVersion').val(last_val);
          $('.indication_label').remove();
          if(get_click_name !="New"){
            $('#rqbi_tab_rightSide').append('<br><span class="indication_label text-primary">'+get_click_name+'</span>');
            $('#copyAddrCheck').prop('checked',false);
          }else {
            $('#copyAddrCheck').prop('checked',true);
          }
          

          rqbi_id = last_val;
          com_id = last_com_id_val;
          if(policy_type == 1) {
            $('#rqbiOccurance').prop('checked',true);
          }
          if(policy_type == 2) {
            $('#rqbiClaims').prop('checked',true); 
          }

          if(form_select_override == 1) {
            $('.override_required').prop('checked',true);
          } else {
            $('.override_required').prop('checked',false);
          }
      },
      complete: function() {

        var qversion = $('.rqbiQuoteVersion').val();
        if ( qversion != '' ) {
          var slct_version_name = $('#rqbiQuoteVersion').val();
           $.when(get_rqbiLocations(accountid,slct_version_name,'')).then( function () { 
                rqbi_class_code_retrive (com_id,accountid);
            });
          
          if(ten_pdfhistory_id !="" && ten_pdfhistory_id !="new"){
            get_store_location(accountid,ten_pdfhistory_id);
          }else {
            get_coverageLimit(accountid,slct_version_name);
          }
          
          //get_quote_version_status();
          get_continueFullQuote_status();
          remove_errorHighlited_accordion();
          checkFormsAccord();
         // get_rqbitable_Details(accountid,qversion);
          update_state_specific_forms(accountid);

          getspecificaccount_additionalAccountDetails(accountid,qversion);
          updateQuoteNameBasedTotalPremium(); 

          $.when(get_primary_state()).then( function () { 
            get_state_specific_details();
            checkContinueToFullQuoteStatus();
          });

          coverage_typeBase_show();
          get_endorsetype();
          endorse_visible_process();
          
        } else {  
          check_quote_versionList();
        }
        if(get_click_name){ 
          get_name_click =get_click_name.trim(); 
          if(get_name_click == "New"){
            check_copy_from_address('new_click');
          } else {
            getTermsExpDate(get_indication_no);
          }
        }

        setTimeout(function(){
          $('#cbAccord').removeClass('show');
        },1000);
        if (xl_lob_change == true) {
					check_xl_supported(slct_version_name);
				}

      }

    });
}

function onchng_quote_version (rqbiQuoteVersion='') {
    $('.qvSpinner').show();
    $('.rqbi_all_tabs, #locationAccord, .cbContinueFullquote').addClass('accordDisabled');

    /*Close all accordion except Location details accordion*/
    $('.rqbi_all_tabs').addClass('collapsed');
    $('.aiFormsAccord').addClass('collapsed');
    $('.commonFormsAccord').addClass('collapsed');
    $('.rqbi_allforms_tabs').addClass('collapsed');
    $('#coverageLimitAccord, #cbAccord, #additionalAccAccord, #subjectivitiesAccord, #ocAccord, #additionalInsuredAccord, #selectFormsAccord, #selectFormsAccord, #optionalCovAccord, #manuscriptAccord, #quoteAccord, #bindAccord, #issueAccord').removeClass('show');

    $('.locDetAccord').removeClass('collapsed');
    $('#locationAccord').addClass('show');


    $('.rqbi_rhspane_section').hide();
    $('.rqbi_according_section').addClass('col-md-12');
    $('.rqbi_according_section').removeClass('col-md-10');
    $('.composite_class_code_div').removeClass('col-md-4');
    $('.composite_class_code_div').addClass('col-md-5');
    $('.quote_policy_details_btn').show();
    
    
    remove_errorHighlited_accordion();
    EachandGnrl_error_removed();

    var accountid = $('#acnt_id').val();
    rqbi_id = parseInt(rqbiQuoteVersion);
    onchnge_set_comid(rqbiQuoteVersion,accountid);
    get_comprat_quote();
    get_gradrat_quote();
    checkFormsAccord();
    getsaved_menuscriptforms();
    //get_quote_version_status();
    get_continueFullQuote_status();
    get_rqbitable_Details(accountid,rqbiQuoteVersion);
    getspecificaccount_additionalAccountDetails(accountid,rqbiQuoteVersion);
    update_state_specific_forms(accountid);
    checkContinueToFullQuoteStatus();
    
    var clslob = $("#singleselect").val();
    if(clslob == "XSLiability"){
      $(".xlQuoteTable").attr('data-retreivequota', 0);
      clear_coverages(1);
      $('#coverageLimit_sec').attr('data_coverage_retrieved', 0);
      check_xl_supported(rqbiQuoteVersion);
    }
    $('.subjAccordHeader').addClass('collapsed');
    $('#subjectivitiesAccord').removeClass('show');
    $('.subjAccordHeader').removeAttr('sub_retrieved');
    $('.SubjListTable').html("");
    $(".addSubjDiv").html("");
    $(".rqbiAddDueDate ").html('');
    $(".locZipcode").removeAttr('data-previous_zip');
    $(".cbClasscode").removeAttr('data-previous_classcode');
}

function onchnge_set_comid(rqbi_id,accountid){

  $.ajax({
    url: laravel_url+"/onchnge_set_comid",
    type:'post',
    data:{rqbi_id:rqbi_id},
    success:function(response){
        var obj = JSON.parse(response);
        if(obj.com_id !=""){
          com_id = obj.com_id;
          $('.indication_label').remove();
          if(obj.get_click_name !="New"){
            $('#rqbi_tab_rightSide').append('<br><span class="indication_label text-primary">'+obj.get_click_name+'</span>');
            $('#copyAddrCheck').prop('checked',false);
          }else { $('#copyAddrCheck').prop('checked',true); }
          var accountid = $('#acnt_id').val();
          rqbi_coverage= obj.coverage_type;
        }
    },

    complete : function(){
      $.when(get_rqbiLocations(accountid,rqbi_id,'indication_click')).then( function () { 
        rqbi_class_code_retrive (com_id,accountid);
            });
      get_coverageLimit (accountid,rqbi_id);
    }
  });
}


function checkContinueToFullQuoteStatus() {

              $('#quoteAccord').removeClass('show');
              $('#bindAccord').removeClass('show');
              $('#issueAccord').removeClass('show');

              if ($('.cfqspinner').css('display') == 'none') {

                    $('.rqbiGenerateQuoteBtn').removeClass('disabled'); 
              } else {

                    $('.rqbiGenerateQuoteBtn').addClass('disabled');               
              }
}


$(document).on('click','.primary_log_btn_design', function(){

  $('.primary_log_btn_design').addClass('disabled');

  var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();

  $.ajax({
    url: laravel_url+"/get_primary_assignee_log",
    type:'get',
    data:{accountid:accountid},
    success:function(response){
      $('.primary_log_bind').html('');
      $('.primary_log_bind').html(response);
    },
    complete : function(){
      $('.primary_log_details_section').show();
    }
  });

});


$(document).on('click', '.isopricing', function() {

  if(($(this).hasClass('active'))) {

    // var accid = localStorage.getItem('accid');
    // var accid = accid;

      isopricing_mail(accid);
      isotabclick();      
  } 

});


function isopricing_mail(accid){

  if(accid){
    
    $.ajax({
      url: laravel_url+"/get_iso_mailling_details",
      type:'post',
      data:{accid:accid},
      dataType: "json",
      success:function(response){
       $('#Qzip_code_submission0').val(response[0]['acc_zip']);
       append_city(response[0]['acc_zip'],0);
       var iso_city = '';
       if (response[0]['acc_city']) {
        iso_city = response[0]['acc_city'];
       }
       var iso_state = '';
       if(response[0]['acc_state']) {
        iso_state = response[0]['acc_state'];
       }
       
       $('#ziptext0').text("TC:- "+iso_city+", "+iso_state);
       setTimeout (function () {           

         $('.city option[value="'+iso_city+'"]').attr("selected", "selected");                  
              
        }, 1000);

      },
      complete : function(){
        menu_permission();
      }

    });
  }

}

/*User Permissions (1-no access, 2-readonly, 3-process)*/
function menu_permission() {
  $(permission).each(function(key,val) {
      if(val.name.trim() == "RQBI"){
  
          if( val.id == 1 ) {
              $('#pills-rqbi-tab').addClass('readonly_disabled').attr('style','pointer:none');
          } else if ( val.id == 2 ) { 
                $('#pills-rqbi-tab').removeClass('readonly_disabled');
      
                $('.ischeckedfunc').parent('div').parent('td').addClass('readonly_disabled');
                $('.override_required_ck').show().addClass('readonly_disabled');

                $('.allFrmsPremLbl, .isflatfullcheckedfunc, .allforms_readonly, .rqbiQuoteVersion, #rqbieffdate, #rqbiexpdate, .rqbi_policy_type, #rqbi_tab_rightSide, #locationAccord, .pstateSec, .stateSpecficSec, .covckbx, .rqbiEachOccurDiv_frmgrp, .rqbiGeneralAggrDiv_frmgrp, .rqbiProdGeneralAggr_frmgrp, .rqbiPersonalInjury_frmgrp, .rqbiMedicalExp_frmgrp, .rqbiDamagetoPrem_frmgrp, .rqbiLiquorSicCode_frmgrp, .deductTbleSection, .sirTblSection, .rqbiTpa, .cbClasscode, .cbLocSelect, .rqbiExposure, .rqbiFinalRate, .cbAction, .rqbiRemarks, .rqbiCreditDebit, .ifany_radiobtn, .included_radiobtn, .rqbiPremium, .multipleClasscodeDiv, .bind_compostive_loction, .compositeExposure, .bind_premium_basis, .composite_actions, .bind_compostive_class_code_singleselect, .compositeDevRate, .compositepremium, .ExposureFrom, .gradExpEditInput, .gradRateEditInput, .graduate_actions, .Add_GraduatedRating_div, .cbContinueFullquote, .triaAcceptReject, .rqbiTriaPercAmount, .rqbiTriaAmount, .rqbiInspectionFee, .rqbiCommission, .rqbiPaymentTerm, #fullyEarnedDate, .rqbiMinPremium, .rqbiMinDeposit, .rqbiAuditableDiv, .rqbiAuditFreq, .rqbiDesigContractor, #subjectivitiesAccord, .rqbiGenerateQuoteBtn, .rqbiGenBindBtn, .rqbiGenIssueBtn, .manuFrmsAddRow, .manuscriptFrmTable, .deductibleInsuredDiv, .op_forms_coverages, .all_add_btn, .allfrmsrepeatable_close, .manuFrmuploadInput, .allFrmsEdition, .gl_type_div').addClass('readonly_disabled');

                tabKey_restrictions();
          } else { 
                $('#pills-rqbi-tab').removeClass('readonly_disabled');
              
                $('.ischeckedfunc').parent('div').parent('td').removeClass('readonly_disabled');
                $('.override_required_ck').show().removeClass('readonly_disabled'); 

                $('.allFrmsPremLbl, .isflatfullcheckedfunc, .allforms_readonly, .rqbiQuoteVersion, #rqbieffdate, #rqbiexpdate, .rqbi_policy_type, #rqbi_tab_rightSide, #locationAccord, .pstateSec, .stateSpecficSec, .covckbx, .rqbiEachOccurDiv_frmgrp, .rqbiGeneralAggrDiv_frmgrp, .rqbiProdGeneralAggr_frmgrp, .rqbiPersonalInjury_frmgrp, .rqbiMedicalExp_frmgrp, .rqbiDamagetoPrem_frmgrp, .rqbiLiquorSicCode_frmgrp, .deductTbleSection, .sirTblSection, .rqbiTpa, .cbClasscode, .cbLocSelect, .rqbiExposure, .rqbiFinalRate, .cbAction, .rqbiRemarks, .rqbiCreditDebit, .ifany_radiobtn, .included_radiobtn, .rqbiPremium, .multipleClasscodeDiv, .bind_compostive_loction, .compositeExposure, .bind_premium_basis, .composite_actions, .bind_compostive_class_code_singleselect, .compositeDevRate, .compositepremium, .ExposureFrom, .gradExpEditInput, .gradRateEditInput, .graduate_actions, .Add_GraduatedRating_div, .cbContinueFullquote, .triaAcceptReject, .rqbiTriaPercAmount, .rqbiTriaAmount, .rqbiInspectionFee, .rqbiCommission, .rqbiPaymentTerm, #fullyEarnedDate, .rqbiMinPremium, .rqbiMinDeposit, .rqbiAuditableDiv, .rqbiAuditFreq, .rqbiDesigContractor, #subjectivitiesAccord, .rqbiGenerateQuoteBtn, .rqbiGenBindBtn, .rqbiGenIssueBtn, .manuFrmsAddRow, .manuscriptFrmTable, .deductibleInsuredDiv, .op_forms_coverages, .all_add_btn, .allfrmsrepeatable_close, .manuFrmuploadInput, .allFrmsEdition, .gl_type_div').removeClass('readonly_disabled');

                $('.rqbiQuoteList').find('.quoteDocsList').find('input').removeAttr('disabled');
                $('.rqbiBindList').find('.bind_binder_docurl').find('input').removeAttr('disabled');
                $('.rqbiIssueList').find('.bind_issue_docurl').find('input').removeAttr('disabled');
          }
      } 

      if(val.name.trim() == "RQBI-Override Required Checkbox"){
          if( val.id == 1 ) {
              $('.override_required_ck').hide();
          } else if ( val.id == 2 ) { 
              $('.override_required_ck').show().addClass('readonly_disabled');
              tabKey_restrictions();
          } else { 
              $('.override_required_ck').show().removeClass('readonly_disabled');
          }
      }  

      if(val.name.trim() == "Upload"){
          if( val.id == 1 ) {
              $('#pills-upload-tab').addClass('readonly_disabled').attr('style','pointer:none');;
          } else if ( val.id == 2 ) {
              $('#pills-upload-tab').removeClass('readonly_disabled');
              $('#pills-upload').addClass('readonly_disabled'); 
              $('.colorPickText').attr('readonly', 'readonly').css('background-color','#e9ecef00');
              tabKey_restrictions();
          } else {
              $('.colorPickText').removeAttr('readonly');
              $('#pills-upload-tab, #pills-upload').removeClass('readonly_disabled');
          }
      }

      if(val.name.trim() == "Policy File"){
          if( val.id == 1 ) {
            $('#pills-policy-tab').addClass('readonly_disabled').attr('style','pointer:none');;
          } else if ( val.id == 2 ) { 
            $('#pills-policy-tab').removeClass('readonly_disabled');
            $('.colHide2, .cateAddSel, .policyCheck, .filecounts, .downloadBtnDiv, .bind_archive_restore').addClass('readonly_disabled');
            tabKey_restrictions();
          } else { 
            $('#pills-policy-tab').removeClass('readonly_disabled');
            $('.colHide2, .cateAddSel, .policyCheck, .filecounts, .downloadBtnDiv, .bind_archive_restore').removeClass('readonly_disabled');
          }
      }

      if(val.name.trim() == "Add Note"){
          if( val.id == 1 ) {
              $('#pills-addNoteTab-tab').addClass('readonly_disabled').attr('style','pointer:none');;
          } else if ( val.id == 2 ) { 
              $('#pills-addNoteTab-tab').removeClass('readonly_disabled');
              $('#pills-addNoteTab').addClass('readonly_disabled');
              $('.new_note_name').attr('readonly', 'readonly').css('background-color','#e9ecef00');
              $('#ad_note').keypress(function(event) {
                  event.preventDefault();
                 return false;
              });
          } else { 
              $('.new_note_name').removeAttr('readonly', 'readonly');
              $('#pills-addNoteTab-tab, #pills-addNoteTab, #ad_note').removeClass('readonly_disabled');
          }
      } 

      if(val.name.trim() == "Upper level account Details"){
          if( val.id == 1 ) {
              $('.acc_tab_list, #accountdetailsform').hide();
          } else if ( val.id == 2 ) { 
              $('.acc_tab_list, #accountdetailsform').show();
              $('#accountdetailsform .form-group').not('.plog').addClass('readonly_disabled');
              $('.accDetSection, .nenewAction, .acc_tab_list').addClass('readonly_disabled');
              tabKey_restrictions();
          } else { 
              $('.acc_tab_list, #accountdetailsform').show();
              $('.accDetSection, .nenewAction, .acc_tab_list, #accountdetailsform .form-group').removeClass('readonly_disabled');
          }
      }

      if(val.name.trim() == "Account Notes"){
          if( val.id == 1 ) {
              $('#pills-accNotes-tab').addClass('readonly_disabled').attr('style','pointer:none');;
              $('#pills-accNotes').hide();
          } else if ( val.id == 2 ) {
              $('#pills-accNotes-tab').removeClass('readonly_disabled');
              $('#pills-accNotes').show();
              $('#pills-accNotes').addClass('readonly_disabled');
              tabKey_restrictions();
          } else {
              $('#pills-accNotes-tab, #pills-accNotes').removeClass('readonly_disabled');
              $('#pills-accNotes').show();
          }
      } 

      if(val.name.trim() == "ISO Pricing"){
          if( val.id == 1 ) {
              $('.isopricing').addClass('readonly_disabled').attr('style','pointer:none');;
          } else if ( val.id == 2 ) {
              $('.isopricing').removeClass('readonly_disabled');
              $('#isocoveragessec, #addsubmission_form, .send_email_btn, #submission_pdf_table_wrapper').addClass('readonly_disabled');
              $('#addsubmission_form input[type="text"]').addClass('readonly_disabled');
              $('.Qclass_code_submission').attr('readonly', 'readonly').css('background-color','#e9ecef00');
              tabKey_restrictions();
          } else { 
              $('.isopricing').removeClass('readonly_disabled');
              $('.Qclass_code_submission').removeAttr('readonly');
              $('#isocoveragessec, #addsubmission_form, .send_email_btn, #submission_pdf_table_wrapper').removeClass('readonly_disabled');
          }
      } 
  
      if(val.name.trim() == "Accounts Screen"){
          if( val.id == 1 ) {
              $('#accounttable tbody').hide();
              $('#accounttable tbody .front_acc_actions').parent('div').parent('td').addClass('readonly_disabled');
              $('#accounttable tbody .getspecificaccount').addClass('readonly_disabled');
          } else if ( val.id == 2 ) { 
              $('#accounttable tbody').show();
              $('#accounttable tbody .front_acc_actions').parent('div').parent('td').addClass('readonly_disabled');
              $('#accounttable tbody .getspecificaccount').removeClass('readonly_disabled');
              tabKey_restrictions();
          } else { 
              $('#accounttable tbody').show();
              $('#accounttable tbody .front_acc_actions').parent('div').parent('td').removeClass('readonly_disabled');
              $('#accounttable tbody .getspecificaccount').removeClass('readonly_disabled');
          }
      } 

      if(val.name.trim() == "Account/Archive Search"){
          if( val.id == 1 ) {
              $('#accounttable_filter label, .brok_acc_search_btn').addClass('readonly_disabled');
              $('#accounttable_filter label').css('pointer-events', 'none');
          } else if ( val.id == 2 ) { 
              $('#accounttable_filter label, .brok_acc_search_btn').show();
              $('#accounttable_filter label, .brok_acc_search_btn, .brok_acc_search_btn').removeClass('readonly_disabled');
              $('#accounttable_filter label').css('pointer-events', 'initial');
              tabKey_restrictions();
          } else { 
              $('#accounttable_filter label, .brok_acc_search_btn').show();
              $('#accounttable_filter label, .brok_acc_search_btn').removeClass('readonly_disabled');
              $('#accounttable_filter label').css('pointer-events', 'initial');
          }
      }  

      if(val.name.trim() == "Account Name link"){
          if( val.id == 1 ) {
              $('.getspecificaccount').addClass('readonly_disabled');
          } else if ( val.id == 2 ) { 
              $('.getspecificaccount').removeClass('readonly_disabled');
              $('.front_acc_actions').parent('div').parent('td').addClass('readonly_disabled');
              tabKey_restrictions();
          } else { 
              $('.getspecificaccount').removeClass('readonly_disabled');
              $('.front_acc_actions').parent('div').parent('td').removeClass('readonly_disabled');
          }
      }  

      if(val.name.trim() == "Account tab - New Account Button"){
          if( val.id == 1 ) {
              $('.new_acc_quick_btn').hide();
          } else if ( val.id == 2 ) {
              $('.new_acc_quick_btn').hide();
              tabKey_restrictions();
          } else { 
              $('.new_acc_quick_btn').show().removeClass('readonly_disabled');
          }
      }  

      if(val.name.trim() == "Account tab - Filter & Column buttons"){
          if( val.id == 1 ) {
              $('.brok_filter_btn, .brok_setting_btn').addClass('readonly_disabled');
          } else if ( val.id == 2 ) { 
              $('.brok_filter_btn, .brok_setting_btn').addClass('readonly_disabled');
              tabKey_restrictions();
          } else { 
              $('.brok_filter_btn, .brok_setting_btn').removeClass('readonly_disabled');
          }
      }

      if(val.name.trim() == "Archive"){
        if( val.id == 1 ) {
          $('.account_archive_tab').addClass('readonly_disabled').attr('style','pointer:none');;
        } else if ( val.id == 2 ) { 
          $('.account_archive_tab').removeClass('readonly_disabled');
          $('.expandBtn').addClass('readonly_disabled');
          tabKey_restrictions();
        } else { 
          $('.account_archive_tab').removeClass('readonly_disabled');
        }
    }
      
  });

  $('[role="tabpanel"]').removeAttr('style');

  if ( quote_ver_status == 'issue' ) {

    $('.acc_tab_list, #accountdetailsform').show();
    $('#accountdetailsform .form-group').not('.plog').addClass('readonly_disabled');

    $('#pills-rqbi-tab').removeClass('readonly_disabled');
      
    $('.ischeckedfunc').parent('div').parent('td').addClass('readonly_disabled');
    $('.override_required_ck').show().addClass('readonly_disabled');
    $('.cbCompRating, .classbuildGraduatedRating').addClass('disabled');
    $('.cbCompRating, .classbuildGraduatedRating').addClass('readonly_disabled');

    var grad_row = $('.AddGraduatedRating').hasClass('enable_grad_rating');
    if (grad_row == true) {
      $('.cbGraduatedTableDiv').show();
    }

    var comprow = $('.comprow').attr('data-rid');
    if (comprow != undefined && comprow !="" ) {
      $('.compositeRateDiv').show();
    }

    $('.allFrmsPremLbl, .isflatfullcheckedfunc, .allforms_readonly, .rqbiQuoteVersion, #rqbieffdate, #rqbiexpdate, .rqbi_policy_type, #rqbi_tab_rightSide, #locationAccord, .pstateSec, .stateSpecficSec, .covckbx, .rqbiEachOccurDiv_frmgrp, .rqbiGeneralAggrDiv_frmgrp, .rqbiProdGeneralAggr_frmgrp, .rqbiPersonalInjury_frmgrp, .rqbiMedicalExp_frmgrp, .rqbiDamagetoPrem_frmgrp, .rqbiLiquorSicCode_frmgrp, .deductTbleSection, .sirTblSection, .rqbiTpa, .triaAcceptReject, .rqbiTriaPercAmount, .rqbiTriaAmount, .rqbiInspectionFee, .rqbiCommission, .rqbiPaymentTerm, #fullyEarnedDate, .rqbiMinPremium, .rqbiMinDeposit, .rqbiAuditableDiv, .rqbiAuditFreq, .rqbiDesigContractor, #subjectivitiesAccord, .rqbiGenerateQuoteBtn, .rqbiGenBindBtn, .rqbiGenIssueBtn, .manuFrmsAddRow, .manuscriptFrmTable, .deductibleInsuredDiv, .op_forms_coverages, .all_add_btn, .allfrmsrepeatable_close, .manuFrmuploadInput, .accDetSection, .nenewAction, .allFrmsEdition, .gl_type_div').addClass('readonly_disabled');

      setTimeout (function () { 
        $('.cbClasscode, .cbLocSelect, .rqbiExposure, .rqbiFinalRate, .cbAction, .rqbiRemarks, .rqbiCreditDebit, .ifany_radiobtn, .included_radiobtn, .rqbiPremium, .multipleClasscodeDiv, .bind_compostive_loction, .compositeExposure, .bind_premium_basis, .composite_actions, .bind_compostive_class_code_singleselect, .compositeDevRate, .compositepremium, .ExposureFrom, .gradExpEditInput, .gradRateEditInput, .graduate_actions, .Add_GraduatedRating_div, .cbContinueFullquote').addClass('readonly_disabled');
      }, 1000);
    tabKey_restrictions();
  }  

  if ( quote_ver_status == null ) {
        $('.acc_tab_list, #accountdetailsform').show();

        $('.accDetSection, .nenewAction, #accountdetailsform .form-group').removeClass('readonly_disabled');
  }
}

$(document).on('focusout', '.Qexposure_amount, .subClassCode', function() {
    var class_code = "";
    var class_code_array = [];
    var scode = $('.subClassCode').val();
    var zval1 = $('.Qzip_code_submission').val();
    var lval1 = $('.loc_add').val();
    var expval = $(this).val();

    if($(this).hasClass('subExpos')) {
      if(expval!= '') {
          $(this).removeClass('redBorder');
      } 
    }

    if ( $(this).val() != "" && scode.length >= 5 && zval1 != '' && zval1.length == 5 && lval1 != '') {
        get_a_ratedcodes('rate_focus');
    }
    
});

function get_a_ratedcodes(source){
    if ( ( $('#isoGL').prop('checked') == false ) && ( $('#isoLiquor').prop('checked') == false ) && ( $('#isoOCP').prop('checked') == false ) ) {
          $('html, body').animate({
          scrollTop: $('#isocoveragessec').offset().top-120
        }, 1000);

        $('.isoCovMandatoryMsg').show().text('').text('( Atleast one coverage should be checked )');
    } else {
        $('.htmlToPdfBtn').addClass('d-none');
        var check = true;
        total_premium = [];
        quickquote_response_arr = [];
        loader_inc = 1;
        cc_array = [];
        exposure_array = new Array();
        zip_array = new Array();
        city_array = new Array();
        locat_array = new Array();
        loc_array=new Array();
        class_coverage_array = new Array();

        var iso_coverage_type_array = [];
          $("input[name='isoCoverageType']:checked").each( function () {
            var value = $(this).val();
          iso_coverage_type_array.push(value);
        });
        var iso_coverage_type = iso_coverage_type_array.toString();
        if(iso_coverage_type==""){ 
          iso_coverage_type ='1';
        } else if(iso_coverage_type == "1,2"){
          iso_coverage_type = 4;
        }
        var effective_from = $('.effective_from').val();
        var accountid;
        email_db_id =  accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
        var limits = global_limit_slider;
        var deductible = global_deduct_slider
        var class_zip_length = $('.-').length
      
        var term;
        var isChecked=document.getElementById("switchValue").checked;
          if(isChecked==true){
          term=6;
        }
        else{
          term=12;
        }

        $('.remove_prem,.tp_tr').remove(); // need to check
        $('.rate_table').empty();
        $('.tp_comma').empty();
        $('.showquote_id').empty();
        $('.exposure_money').val('');
        majesco_transaction_id='';
      
      
        quote_total_premium = 0;
        $(".exposure_row").each(function () { 
            exposure = $(this).find(".Qexposure_amount").val();
            exposure = exposure.replace(/([,.$])+/g, '').replace(/,/g, '').replace(/^0+/, "");
        
            exposure_array.push(exposure);
            zip_code = $(this).find(".Qzip_code_submission").val();

            zip_array.push(zip_code);
            SIC_business_class = $(this).find(".Qclass_code_submission").val();
            SIC_business_class = SIC_business_class.substring(0, 6).trim();//Naics update

            class_coverage = $(this).find(".Qclass_code_coverage").val(); //v5
            class_coverage_array.push(class_coverage);

            cc_array.push(SIC_business_class);
            city = $(this).find(".city").val();
            city_array.push(city);
            locat = $(this).find(".loc_add").val();
            locat_array.push(locat);
        
          //loc = $(this).find('.loc_add_text').attr('data-location_id');
            loc = $(this).attr('data-subrowid');
            loc_array.push(loc);
        
            if (zip_code == '' || SIC_business_class == '' || exposure == '' || locat =='' || effective_from == '') {
                check = false;
            }
            api_method = 'businessnlocation';
        });
      
      if(check == false)
      {
          if (source == 'rate_click'){
            new PNotify({ title: 'Error', text: 'Information not sufficient to generate a Quick Quote.Please enter the required fields to create a Quick Quote', delay: 2000, type: 'error' });
            return false;
          }
      }
      else{
            var textArr = $("input[type=text][id^=Qclass_code_submission]").get();
            var textArr1=$("input[type=text][id^=Qzip_code_submission]").get();
            var textArr2=$("input[type=text][id^=loc_add]").get();
            
            var len=textArr.length;
            var inner=0,outer=0,index=0,dupLen=0;
            var dupArr=new Array();
            var dupArr1=new Array();
            var dupArr2=new Array();
            
            for(outer=0;outer<len;outer++)
            {
              for(inner=outer+1;inner<len;inner++)
              {
                if(textArr[outer].value.substring(0, 6).trim()==textArr[inner].value.substring(0, 6).trim())/*Naics update*/
                {
                  if(textArr1[outer].value==textArr1[inner].value)
                  {
                  if(textArr2[outer].value.toLowerCase()==textArr2[inner].value.toLowerCase())
                  {
                  if(jQuery.inArray( textArr[outer].value.substring(0, 6).trim(), dupArr )==-1 || jQuery.inArray( textArr1[outer], dupArr1 )==-1 || jQuery.inArray( textArr2[outer].toLowerCase(), dupArr2 )==-1) /*Naics update*/
                  {
                    dupArr.push(textArr[outer]);
                    dupArr1.push(textArr1[outer]);
                    dupArr2.push(textArr2[outer]);
                    
                  }
                  if(jQuery.inArray( textArr[inner].value.substring(0, 6).trim(), dupArr )==-1 || jQuery.inArray( textArr1[inner], dupArr1 )==-1 || jQuery.inArray( textArr2[inner].toLowerCase(), dupArr2 )==-1) /*Naics update*/
                  {
                    dupArr.push(textArr[inner]);
                    dupArr1.push(textArr1[inner]);
                    dupArr2.push(textArr2[inner]);
                    
                  }
                  dis_val=1;
                  }else{
                  dis_val=1;
                  }
                  }else{
                  dis_val=1;
                  }
                }else{
                  dis_val=1;
                }
              }
            }
            
            if(dupArr.length == 0 && dupArr1.length ==0 && dupArr2.length ==0){
              
                exposure_array = exposure =  JSON.stringify(exposure_array);
                zip_array = zip_code = JSON.stringify(zip_array);
                cc_array = SIC_business_class = JSON.stringify(cc_array);
                city_array = JSON.stringify(city_array);
                locat_array = JSON.stringify(locat_array);
                loc_array = JSON.stringify(loc_array);
                class_coverage_array = JSON.stringify(class_coverage_array);
                api_url = base_url +'/brokerage/template/get_quote_api_qq_v5.php';
                nsm = $('.email-list-item_' + email_db_id).find('h6').text();

                quote_api_ajax(SIC_business_class, zip_code, loc_array, exposure, majesco_transaction_id, api_method, limits, deductible, api_url, class_code_length,city_array,locat_array,class_coverage_array,term,source);  

                  if (source == 'rate_click'){

                    if (policy_status == 0) {
                    policy_status = 1
                    }
                    var data = {
                      'zip_code': zip_array,
                      'city': city_array,
                      'location':locat_array,
                      'sales': $('input[name="revenue"').val(),
                      'payroll': $('input[name="payroll"').val(),
                      'SIC_business_class': cc_array,
                      'majesco_transaction_id': majesco_transaction_id,
                      'limits': global_limit_slider,
                      'exposure': exposure_array,
                      'effective_from': effective_from,
                      'email_db_id': email_db_id,
                      'deductible': deductible,
                      'term': term,
                      'non_submission_name': nsm,
                      'quickquote_response': quickquote_response_arr,
                      'policy_status': policy_status,
                      'iso_coverage_type': iso_coverage_type,
                      'cc_coverage' :class_coverage_array //coverage
                   };
                    data_json = JSON.stringify(data);
                    quote_data_insert(data); 
                    $('.quickcodeloading_btn').show();  
                  }  
            
            }else{
                
                for(p=1;p< dupArr.length;p++){
                   $("#"+dupArr[p].id).addClass("highlight");
                   $("#"+dupArr1[p].id).addClass("highlight");
                   $("#"+dupArr2[p].id).addClass("highlight");
                } 
                $(".get_code_account").prop('disabled',true);
                new PNotify({ title: 'Error', text: 'Duplicate value is exists', delay: 2000, type: 'error' });
                return false;
              
            }
        }
    }
}

function tabKey_restrictions(){

    $(document).keydown(function(obj) {
        if ( $('.st_issue').hasClass('completed') == true && $('#pills-rqbi-tab').hasClass('active') == true ){
            if (obj.keyCode == 9) {  
                obj.preventDefault(); 
            }
        }       
    })
}


function check_valid_brok(){
  var brok_val = $('#ac_tbroker').val();
  $('.invalid_broker').remove();
  if (brok_val != '') {
    $('.invalid_brok_alert').removeAttr('style').css('display','none');
    $('#ac_tbroker').removeClass('errorBorder');
  }
}

function check_account_brok_valid() {
  try {
    var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    return_value = 1;
    $.ajax({
      url: laravel_url+"/check_account_brok_valid",
      type:'post',
      "async": false,
      data:{acct_id:acc_id},
      success:function(response) {
        if (response.brok_valid == 0) {
          console.log('Account Section - Broker');
          $('#ac_tbroker').addClass('errorBorder');
          $('html,body').animate({
            scrollTop: $("#ac_tbroker").offset().top - 200},'slow');
          new PNotify({ title: 'Error', text: "Please change Broker and update by clicking update button", delay: 1500, type: 'error' });
          return_value = 0;
        }else{
          $('#ac_tbroker').removeClass('errorBorder');
          return_value = 1;
        }
      },
      error: function() {
      }
    });
    return return_value;
  }
  catch(err) {
  console.log(err);

  }
}
    
/* ISO Pricing effective date click trigger */

$("#datepicker_submission").datepicker({ 
        autoclose: true, 
  }).on('changeDate', isoeffectDateChanged);

function isoeffectDateChanged() {
  if ($('.iso_eff_date').val()!='' && $('#Qexposure_amount0').val()!='' && $('#Qclass_code_submission0').val()!='' && $('#Qzip_code_submission0').val()!='' && $('#loc_add0').val()!='' && $('#Qclass_code_submission0').val().length >= 5){
    $('#Qexposure_amount0').trigger('focusout');
  }
}

function check_program_account(acct_id) {
  try{
    $.ajax({
      url: laravel_url+"/check_program_account",
      type:'post',
      data:{acct_id:acct_id},
      success:function(response) {
        var txtbox_display_status = $('.has_program').css('display');
        if(response.program == 1){
          $('#pills-rqbi-tab').addClass('display_none');
          if(txtbox_display_status == 'none')
            $('.has_program').css('display','block');
        }else{
          $('#pills-rqbi-tab').removeClass('display_none');
          if(txtbox_display_status == 'block')
            $('.has_program').css('display','none');
            $('.has_program').val('');
        }
      },
      error: function() {
      }
    });
  }
  catch(err) {
  console.log(err);
  }
}

function get_tbd_tab_name(acct_id) {
  try{
    $.ajax({
      url: laravel_url+"/get_tbd_tab_name",
      type:'post',
      data:{acct_id:acct_id},
      success:function(response) {
        //alert("response"+response.tbd_name);
        if( response.tbd_name !="" ){
          $('.session_hide_tab').find('.active').find('.bind_monthyear').text(response.tbd_name);
        }
      },
      error: function() {
      }
    });
  }
  catch(err) {
  console.log(err);
  }
}

/*Account notes - tab key function from date to editor*/
$(".account_type_newnote").on('keydown', '.notes_date', function(e) { 
  var keyCode = e.keyCode || e.which; 

  if ( keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40 ) { 
    $('#side_note_editor .ql-editor').blur().removeClass('editor_focus');
  } else if ( keyCode == 9 ) { 
    $('#side_note_editor .ql-editor').focus().addClass('editor_focus');
  } 
  
});

$(".account_type_newnote").on('focus', '.notes_date', function(e) { 
  var keyCode = e.keyCode || e.which; 

  if ( keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40 ) { 
    event.preventDefault();
  } 
  
});

$(".add_note_section").on('keydown', '.notes_date', function(e) { 
  var keyCode = e.keyCode || e.which; 

  if ( keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40 ) { 
    $('#ad_note .ql-editor').blur().removeClass('editor_focus');
  } else if ( keyCode == 9 ) { 
    $('#ad_note .ql-editor').focus().addClass('editor_focus');
  } 
  
});

$(".add_note_section").on('focus', '.notes_date', function(e) { 
  var keyCode = e.keyCode || e.which; 

  if ( keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40 ) { 
    event.preventDefault();
  } 
  
});

$(document).on('focus', '.new_note_name, .type_notes, .notes_date, .savenotes, .clearnotes, .updatenotes', function() {
    $('#side_note_editor .ql-editor').blur().removeClass('editor_focus');
});

function check_notedate_valid(accid, updatenoteid) {
  try{
    $.ajax({
      url: laravel_url+"/check_notedate_valid",
      type:'post',
      "async": false,
      data:{accid:accid, updatenoteid:updatenoteid},
      success:function(response) {
        var update_date = response.note_date;
        var date_time_split = update_date.split(" ");
        var date_split = date_time_split[0].split("-");
        return_note_date = date_split[1]+'-'+date_split[2]+'-'+date_split[0];
      },
      error: function() {
      }
    });
    return return_note_date;
  }
  catch(err) {
    console.log(err);
  }
}
