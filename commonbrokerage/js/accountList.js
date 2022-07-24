
var class_code_global=[];
var class_code_and_desc_global=[];
  
$(document).ready( function() {
    $('.lob_multiselect .btn-group').addClass('col-md-12 p-0');
    //Localstorage value for New account
    var nacc_val = localStorage.getItem("new_account");
    var tabstatus = localStorage.getItem("tabstatus");
    var new_emailid = localStorage.getItem("new_emailid");
    var old_emailid = localStorage.getItem("old_emailid");
    var goto_specific_acc = localStorage.getItem("goto_specific_acc");
	var goto_specific_accid = localStorage.getItem("goto_specific_accid");
    var renwal_monthyear = localStorage.getItem("renwal_monthyear");
    var renewalcreation = localStorage.getItem("renewalcreation");
	var broker_email= localStorage.getItem("broker_emailid");
       
    setTimeout( function() { 
        if (nacc_val == 'localstorage_val') {
            document.getElementById('account_list_add_btn').click();
            if (tabstatus == 'accountassign') {
                getspecificaccount(old_emailid);
            }
            if (renewalcreation == 'renewalcreation') {
                check_accountid_monthyear(old_emailid,renwal_monthyear);
                getparentaccount(old_emailid);
            }
            if (goto_specific_accid == 'complete') {
                getspecificaccount(goto_specific_acc);
            }
        }
    }, 500);

    $('#search_bar2').select2 ({
        placeholder:"Broker name, Account name , etc..",
        allowClear: false,
        closeOnSelect: false,
        selectOnClose: true,
        container: ".search_barr"
    });

    $('.popup_section').hide(); 

    $('.account_list_add_btn').click( function() {       
        $('.accountdetail_div').show(); 
        $('.popup_section').show(); 
        $('.account_list_add_btn').hide();
        $('.account_list_hide').hide();
        $('.searchbar_div').hide();
        setTimeout( function() { 
            $(document).find('.accountlist_section_div_hide').hide();
        }, 20);

        $('.filter_div').hide();
        
        checkaccount_selected ();
        //$('#multiselect').multiselect('refresh');
        $('.addTabnav').hide();
        menu_permission();
    });

    $('.close_btn_acdetail').click( function() {
        $('.loader').show();
        $('.session_hide_tab li:not(:first-child):not(:last-child)').hide();

        if( $('.account_type_newnote').css('display') == 'block' ) {
            $('.account_type_newnote').hide();        
        } else {
            $('.account_type_newnote').hide(); 
        }

        $('.session_hide_tab').find('.active').find('.accountid').val('')
        $('.account_list_add_btn').show();
        $('.popup_section').hide(); 
        $('.accountdetail_div').hide();
        $('.account_list_hide').show();
        $('.searchbar_div').hide();
        $(document).find('.accountlist_section_div_hide').show();

        resetlocalstorage();
        resetaccountform();

        var specific_person_hideshow = ['asic.underwriter1@gmail.com'];

        if ( $.inArray( localStorage.getItem('userid'), specific_person_hideshow )!='-1' ) {
            $('.controls').val("");
            setTimeout(function(){
                $('.aos-item__inner').find('ul').hide();
            }, 10);
            $('#select2-accounttable_length-fq-container').hide();
            $('#account_list_add_btn').hide();
            $('#accounttable').find('tbody').hide();
            $('.dataTables_info').hide();
            $('#accounttable_paginate').hide();
        } else {
            accounttablelist ();
        }

        // accounttablelist(); 
        location.reload ();
        return false;       
        $('#accountdetailsform').data('bootstrapValidator').resetForm ();
    });

    $('.tab2_archive').click( function() {
       $('.account_list_add_btn').show();
       $('.popup_section').hide();
       $('.accountdetail_div').hide();
       $('.filter_div').hide();
       $('.show_field_accountlist_filters').hide();
    });

    $('.tab_account_btn').click( function() {
        $('.filter_div').hide();
        $('.show_field_accountlist_filters').hide();
    });

    var extract_info = localStorage.getItem("extract_quote_info");

    $("#range_08").ionRangeSlider( function() {
        var val = $('.irs-single').text();
    });

    $("#range_08").ionRangeSlider({
        skin: "big",
        min: 0,
        max: 10,
        from: 5,
        onStart: function (data) {
            alert('onStart');
            // fired then range slider is ready
        },
        onChange: function (data) {
            alert('onChange');
            // fired on every range slider update
        },
        onFinish: function (data) {
            alert('onFinish');
            // fired on pointer release
        },
        onUpdate: function (data) {
            alert('onUpdate');
            // fired on changing slider with Update method
        }
    });
	
	var email_id = localStorage.getItem("email_id");
	var zip_code = localStorage.getItem("zip_code");
    var revenue = localStorage.getItem("revenue");
	
	if (zip_code!='' && zip_code!=null && zip_code!='null')	{
		$('.Qzip_code_submission').val(zip_code);
	} else {
		$('.Qzip_code_submission').val('');
	}

	if (revenue!='' && revenue!=null && revenue!='null') {
	   $('.Qexposure_amount').val(revenue);
	} else{
		$('.Qexposure_amount').val('');
	}
	
    $.ajax({
        url: base_url+'/brokerage/template/cc_class_code.php',
        type:'get',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            class_code_global = response;
        }
    });
    
    $.ajax({
        url:base_url+'/brokerage/template/cc.php',
        method: 'GET',
        dataType: 'JSON',
        success: function (response1) {
            class_code_and_desc_global=response1;
        }
    });
});

//Redirection of new account
function redirect_newaccount (eid) {
    if(eid!='') {
        localStorage.setItem('new_account', 'localstorage_val');
        localStorage.setItem('new_emailid', eid);
		localStorage.setItem('broker_emailid', broker_id);
        window.location.href = "accountList.php";
    } else {
        new PNotify({ title: 'Warning', text: 'Please Choose E-Submission', delay: 1000, type: 'warning' });
    }
}

//Redirection of old account
function redirect_oldaccount () {
    $('.session_hide_tab').find('.active').find('.accountid').val('')
    resetlocalstorage ();
    window.location.href = "accountList.php";
}



function changeAccountStatus () {
    $('#ac_tstatus').val('issue');
}

//   side arrow
$(document).on('click','.docTab', function (e) {
    docTabFun ();
});

$(document).on('click','.mailTab', function (e) {
    mailTabFun ();
});

$(document).on('click','.noteTab', function (e) {
    noteTabFun ();
});

$(document).on('click', '.htmlToPdfBtn', function (e) {
    $('.save_indication_loader').show(); 
    $('.htmlToPdfBtn').addClass('d-none');    
    // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();    
    var account_name = $('#ac_tname').val();
    var ac_lob = $('.ac_lob').val();
    if(ac_lob != null){
       ac_lob = ac_lob.toString();
    } 
    var ac_mailAdd_zip = $('#ac_mailAdd_zip').val();
    var inlineradios1 = $('#inline-radios1').val();
    var inlineradios1 = inlineradios1.split(';');
    var inlineradios1 = inlineradios1[0];
    var new_var = '';
    for (let i = 0;i<inlineradios1.length;i++) {
        new_var += inlineradios1[i]+'/';
    }

    limits = new_var.substring(0,(new_var.length-1));
    var ac_mailAdd_state = $('#ac_mailAdd_state').val();
    var ac_mailAdd_city = $('#ac_mailAdd_city').val();
    var effect_dt = $('.iso_eff_date').val();
    var action = 'createHtmlFile';
    classCode = '';

    var classCode = $('.subClassCode').map( function (idx, elem) {
        return $(elem).val();
    }).get().join('&&');

    var cls_spl = classCode.split('&&');
    var classCode_len = cls_spl.length;

    var exposure = $('.Qexposure_amount').map( function (idx, elem) {
        return $(elem).val();
    }).get().join('&&');

    var get_Ccode = $('.get_Ccode').map( function (idx, elem) {
        return $(elem).text();
    }).get().join('&&');

    var get_pc = $('.get_pc').map( function (idx, elem) {
        return $(elem).text();
    }).get().join('&&');

    var get_lc = $('.get_lc').map( function (idx, elem) {
          return $(elem).text();
    }).get().join('&&');

    var get_lcm = $('.get_lcm').map( function (idx, elem) {
        return $(elem).text();
    }).get().join('&&');

    var get_br = $('.get_br').map( function (idx, elem) {
        return $(elem).text();
    }).get().join('&&');

    var get_ilf = $('.get_ilf').map( function (idx, elem) {
        return $(elem).text();
    }).get().join('&&');

    var get_abr = $('.get_abr').map( function (idx, elem) {
        return $(elem).text();
    }).get().join('&&');

    var get_premium = $('.get_premium').map( function (idx, elem) {
        return $(elem).text();
    }).get().join('&&');

    var total_premium = $('.totpremium').text();

    var territory_code = $('.city_label').map( function (idx, elem) {
        return $(elem).text();
    }).get().join('&&');

    var exposure_basis = $('.premium_base').map( function (idx, elem) {
        return $(elem).text();
    }).get().join('&&');
    
    var userhtp = localStorage.getItem('username');
    var userhtpid = localStorage.getItem('usernumericid');

    $.ajax({
        url: '../brokerage_dragdrop_v2/htmltopdf.php',
        type:'post',
        data:{
            account_name:account_name,
            accid:accid,
            ac_lob:ac_lob,
            ac_mailAdd_zip:ac_mailAdd_zip,
            ac_mailAdd_state:ac_mailAdd_state,
            ac_mailAdd_city:ac_mailAdd_city,
            limits:limits,
            classCode:classCode,
            classCode_len: classCode_len,
            exposure:exposure,
            effect_dt:effect_dt,
            get_Ccode:get_Ccode,
            get_pc:get_pc,
            get_lc:get_lc,
            get_lcm:get_lcm,
            get_br:get_br,
            get_ilf:get_ilf,
            get_abr:get_abr,
            get_premium:get_premium,
            total_premium:total_premium,
            territory_code:territory_code,
            exposure_basis:exposure_basis,
            action:action,
            userhtp:userhtp,
            userhtpid:userhtpid
        },

        success: function (response) {
            $('.save_indication_loader').hide();
            getallsubmission_pdf(accid);
            var obj = JSON.parse(response);
            if(obj.status == '1'){
                new PNotify({ title: 'Success', text: 'Successfully Created', delay: 2000, type: 'success' });
            } else {
                new PNotify({ title: 'Error', text: 'Process Failed', delay: 2000, type: 'error' });
            }
        },
        complete : function () {
            bind_add_quote_list(accid);
        }
    });
});

function docTabFun () {
    var exDoc = $('.docTab').attr('aria-expanded');
    if (exDoc == 'true') {
        $('.docTabArrow').addClass('fa-chevron-down');
    } else {
        $('.docTabArrow').removeClass('fa-chevron-down');
    }
}

function mailTabFun () {
    var exMail = $('.mailTab').attr('aria-expanded');
    if (exMail == 'true') {
        $('.mailTabArrow').addClass('fa-chevron-down');
    } else {
        $('.mailTabArrow').removeClass('fa-chevron-down');
    }
}

function noteTabFun () {
    var exNot = $('.noteTab').attr('aria-expanded');
    if (exNot == 'true') {
        $('.noteTabArrow').addClass('fa-chevron-down');
    } else {
        $('.noteTabArrow').removeClass('fa-chevron-down');
    }
}

/// Policy According Arrow 
$(document).on('click', '.allTabs', function (e) {
    $('.allTabs').each( function () {
        $($(this).find('span i')[0]).removeClass('fa-chevron-down');
    });

    if($(this).hasClass('collapsed'))
        $($(this).find('span i')[0]).removeClass('fa-chevron-down');
    else       
        $($(this).find('span i')[0]).addClass('fa-chevron-down');
});

$(document).on('keydown', '.Qexposure_amount', function() {
    // Allow only backspace and delete
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9) {
        // let it happen, don't do anything
    } else {
        // Ensure that it is a number and stop the keypress
        if (event.keyCode >= 48 && event.keyCode <= 57) {

        } else if (event.keyCode >= 96 && event.keyCode <= 105) {

        } else if (event.keyCode == 75 || event.keyCode == 77 || event.keyCode == 66 || event.keyCode == 84 || event.keyCode == 110 || event.keyCode == 188) {

        } else {
            event.preventDefault();
        }
    }
});    

/*Start Get RQBI policy status and display this status in coverage & limits */
function rqbi_policy_status () {
    var policy_type =  $("input[name='rqbiPolicytype']:checked").val();

    if (policy_type == '1') {
       $('.selfInsuredSmall').text('( Occurrence )');
    } else {
       $('.selfInsuredSmall').text('( Claims Made )');
    }
}

$(document).on('change', '.rqbi_policy_type', function () {
    rqbi_policy_status();
});
/*End*/







    




