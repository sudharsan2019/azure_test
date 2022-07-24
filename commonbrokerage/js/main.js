/* Author : Vetri,Shakina,Veera,nanthakumar */
var usertype = '';
var permission = localStorage.getItem('permission');
permission = JSON.parse(permission);

$(document).ready( function() {
    $('.new_notesbtn').addClass('btn-primary');

    $('[data-toggle="tooltip"]').tooltip({
        trigger : 'hover'
    });

    $('#upSplit').change(function(){
    if($(this.checked))
        $('#upLiv').prop('checked',false);
    });

    $('#upNo').change(function(){
    if($(this.checked))
        $('#upLiv').prop('checked',false);
    });
    $('#upLiv').change(function(){
        if($(this.checked)){
            $('#upSplit').prop('checked',false);
            $('#upNo').prop('checked',false);
        }
    });

    $('.poliAddIcon i').addClass('fa-plus');

    $(document).find('#accounttable_filter').parent().addClass("datatable_search_design");
    $(document).find('#accounttable_filter').addClass("datatable_search");
    $(document).find('#accounttable_filter').css('display','block');
    $(document).find('#archivetable_filter').parent().addClass("datatable_search_design");
    $(document).find('#archivetable_filter').addClass("datatable_search");
    $(document).find('#archivetable_filter').css('display','block');
    $(document).find('.archivetable_btn').hide();
    $(document).find('.accounttable_btn').hide();

    $(document).find('.datatable_search').append('<div class="input-group-btn col-md-1 pull-right onload_Searchbar table_searchbar_design_button_group brok_searchbar_btn_div"><button class="btn btn-primary brok_acc_search_btn search_icon_button_design" type="button" data-select2-open="single-append-text"><span class="fa fa-search text-white"></span></button><button class="btn btn-primary brok_filter_btn filter_btn_align show_search_filter_btn hide_submission_btn" type="button" data-select2-open="single-append-text"><span class=""><i class="fa fa-filter text-white" aria-hidden="true"></i></span></button><button type="button" class="btn btn-primary btn-md brok_setting_btn search_setting_btn setting_searchbutton_show curosor_pointer"><span class=""><i class="fa fa-cogs text-white" aria-hidden="true"></i></span></button></div>');

    $('.upSplit').dblclick(function(){ $(this).prop('checked',false)})
          
    $(document).on('click', '.setting_searchbutton_show',function() {
        //alert();
        $('.filter_div').hide();
        $('.account_div_form').hide();
        $('.archive_custom_field_filter').hide();
        $('.setting_filter_div').toggle();
        $('.archive_custom_fields_filter_sec').hide();
        $('.custom_fields_filter_sec').show();
        setTimeout(function(){ 
          $('.app-body').toggleClass('filterclose_click_setting');
          $('.app-body').removeClass('filterclose_click');
        }, 10);
    });

  $(document).on('click', '.setting_archie_searchbutton_show',function() {
        //alert();
        $('.filter_div').hide();
        $('.account_div_form').hide();
        $('.custom_fields_filter_sec').hide();
        $('.custom_field_filter').hide();
        $('.setting_filter_div').toggle();
        $('.archive_custom_fields_filter_sec').show();
        $('.archive_custom_field_filter').show();

        setTimeout(function(){ 
            $('.app-body').toggleClass('filterclose_click_setting');
            $('.app-body').removeClass('filterclose_click');
        }, 10);
   });

    $(document).on('click','.new_notesbtn',function(){
        $('.account_type_newnote').show();
        $('.new_notesbtn').hide();

        var dtToday = getcurrentdate();
        $(".notedte").datepicker('remove');
        
        $(".notedte").datepicker({ 
            autoclose: true,
            format: 'mm-dd-yyyy',
            // startDate: dtToday
        });
        $(".notedte").datepicker().on("changeDate", function (e) {
            $('.notes_date').removeClass('redBorder');
        });
        $('.notes_date').removeClass('redBorder');
    });    

    $(document).on('click','.new_notesclosebtn',function(){
        $('.account_type_newnote').hide();
        $('.new_notesbtn').show();
    });

    $(document).on('click','.accTabs',function(){
        if(!$(this).hasClass('accNotes')){
            $('.new_notesbtn').text('New Note');
            $('.new_notesbtn').removeClass('btn-danger');
            $('.account_type_newnote').hide();
        }

        inc = 1;
        $('.add_more_btn').show();
    });

    $('.ac_mainTabs').on('click','a',function(e){
        e.preventDefault();
        if(!$(this).hasClass('addTab')){
          $(this).tab('show');
        }
    });

    $(document).on('click','.ac_mainTabs_loader',function(){
        $('.loader').show();
    });

    $(document).on('click','.addTab',function(e){
        e.preventDefault();
        $('.ac_tname_frmgrp, .ac_lob_frmgrp, .ac_tname_frmgrp, .business_unit_frmgrp, .ac_tstatus_frmgrp, .ac_tpass_frmgrp, .brokerageDba_frmgrp, .ac_mailAdd_zip_frmgrp, .ac_mailAdd_state_frmgrp, .ac_mailAdd_city_frmgrp, .ac_mailAdd_frmgrp, .bind_brokers_frmgrp, .insuredType_frmgrp, .businessDescription_frmgrp, .business_segment_frmgrp, .njTransaction_frmgrp').removeClass('readonly_disabled');
        $('.bind_brokers_frmgrp #ac_tbroker, .ac_lob_frmgrp .ac_lob').removeAttr('disabled');


        $('#ac_tstatus').val('quote');
        $("#ac_tname").focus();
        $("#ac_quteNo").val("");
        $("#ac_poliNo").val("");
        var tid = $('.ac_mainTabs').children().length;
        var tabId = 'acTab'+tid;

        $('.session_hide_tab li:not(:last-child)').not('.ac_mainTabs_loader').remove();

        var parentid = $('.session_hide_tab li:first-child').find('input').val();

        $(this).closest('li').before('<li class="nav-item ac_mainTabs"><a class="nav-link"  data-parentid="'+parentid+'" data-toggle="tab" href="#acTab'+tid+'" role="tab"><span class=" bind_monthyear bind_monthyear'+tid+'"></span><span> <i class="fa fa-close ml-1 text-danger delTab"></i> </span><input type="hidden" class="form-control accountid" id="accountid_'+tid+'" value=""></a></li>');

        $('.session_hide_tab').find('li:nth-last-child(2) a').click();
        $('.addTabnav').hide();

        $('.session_hide_tab').find('.active').find('.bind_monthyear').text(getmonthyear());
        $('.session_hide_tab').find('.active').find('.bind_monthyear').attr('data-monthyearval',getnumbermonthyear());
        $('#submit_btn1').text('Create');
        checkaccount_selected();
        var expire_dt = $('#expire_dt').val();

        parts = expire_dt.split('-'),
        dayy = parseInt(parts[1], 10);
        var monthh = parseInt(parts[0], 10);
        var yearr = parseInt(parts[2], 10);

        if (expire_dt == '' || expire_dt == null) {
          $('#effect_dt').datepicker("setDate", null);
          $('#expire_dt').datepicker("setDate", null);
        }else{
          $('#effect_dt').datepicker('setDate', expire_dt);
        }
        /// ******* Start Renewal tab is showing TBD before create is selected. *********** //////////
        if(expire_dt!=null && expire_dt!=''){
            if (expire_dt == '01') { tabmonth = 'Jan'}
            if (expire_dt == '02') { tabmonth = 'Feb'}
            if (expire_dt == '03') { tabmonth = 'Mar'}
            if (expire_dt == '04') { tabmonth = 'Apr'}
            if (expire_dt == '05') { tabmonth = 'May'}
            if (expire_dt == '06') { tabmonth = 'Jun'}
            if (expire_dt == '07') { tabmonth = 'Jul'}
            if (expire_dt == '08') { tabmonth = 'Aug'}
            if (expire_dt == '09') { tabmonth = 'Sep'}
            if (expire_dt == '10') { tabmonth = 'Oct'}
            if (expire_dt == '11') { tabmonth = 'Nov'}
            if (expire_dt == '12') { tabmonth = 'Dec'}

            $('.session_hide_tab').find('.active').find('.bind_monthyear').text(tabmonth  + "-" + yearr);
        }else{
            $('.session_hide_tab').find('.active').find('.bind_monthyear').text("TBD-"+ new Date().getFullYear());
        }

        //// ****** End ********////

        $('#pills-tab li:first-child a').tab('show');
         
        $('.loader').hide();
    });

    $(document).on('click','.delTab',function(){
        $(this).closest('li').remove();
        $('.session_hide_tab').find('li:nth-last-child(2) a').click();
        $('.addTabnav').show();
    })

    $('.resetbtn_account').click(function(){ 
        $('.empty_value').val('');
        $('#filter_brokername').multiselect('clearSelection');
        $('#primary_assignee_filter').multiselect('clearSelection');
        $('#secondary_assignee_filter').multiselect('clearSelection');
        $('#multi-select-demo-three').multiselect('clearSelection');
        $('#multi-select-demo-four').multiselect('clearSelection');
        $('#filter_status').multiselect('clearSelection');

        $('.filter_div').css('display', 'none');

    });

    $('.resetbtn_esubmission').click(function(){ 
        $('.empty_value_emailsubmission').val('');
        $('#multi-select-esubmission-broker').multiselect('clearSelection');
        $('#multi-select-esubmission-underwriter').multiselect('clearSelection');
        $('#multi-select-esubmission-flag').multiselect('clearSelection');
    });   

    $(document).on('click', '.setting_filter_remove_btn',function() {
        $('.setting_filter_div').hide();
    });

    $(document).on('click', '.show_search_filter_btn', function() {
        $('#filter_brokername').multiselect('clearSelection');
        $('#multi-select-demo-three').multiselect('clearSelection');
        $('#primary_assignee_filter').multiselect('clearSelection');

        $(document).find('.filter_div').addClass("search_filter_section");
        $(document).find('.filter_div').removeClass("accountlist_filters");
        $(document).find('.filter_div').toggle();
        $(document).find('.show_field_accountlist_filters').hide();

        $('.submission_div_form').show();
        $('.account_div_form').hide();
        setTimeout(function(){ 
            $(document).find('.app-body').toggleClass('filterclose_click');
            $(document).find('.app-body').removeClass('filterclose_click_setting');
        }, 10);
    });

    function textboxnumberWithCommas(value) {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $('.total_premimum_amount').text('$'+numberWithCommas(10000));

    $("#range_01").ionRangeSlider({
        grid: true,
        from: 0,
        values: [
          "1/2/2/1", "1/3/3/1",
          "1/4/4/1", "2/2/2/2",
          "2/3/3/2", "2/4/4/2"
        ]
    });

    $("#range_02").ionRangeSlider({
        grid: true,
        from: 0,
        values: [
          "0", "5,000",
          "10,000", "25,000",
          "50,000", "100,000"
        ]
    });

    $("#range_03").ionRangeSlider({
        grid: true,
        from: 0,
        values: [
          "1/2/2/1", "1/3/3/1",
          "1/4/4/1", "2/2/2/2",
          "2/3/3/2", "2/4/4/2"
        ]
    });

    $("#range_04").ionRangeSlider({
        grid: true,
        from: 0,
        values: [
          "0", "5,000",
          "10,000", "25,000",
          "50,000", "100,000"
        ]
    });

    //$('#multiselect').multiselect();
    $('#multiselect0').multiselect();
    $('#multiselect1').multiselect();
    $('#multiselect2').multiselect();
    $('#multiselect3').multiselect();
    $('#multiselect4').multiselect();
    $('#multiselect5').multiselect();
    $('#multiselect6').multiselect();
    $('#multiselect7').multiselect();
    $('#multiselect8').multiselect();
    $('#multiselect9').multiselect();

    $('#multi-select-demo').multiselect(); 
    $('#multi-select-esubmission-flag').multiselect({
        includeSelectAllOption : true,
        nonSelectedText: 'Please Select'
    });
  
    $('#multi-select-esubmission-broker').multiselect();
    $('#multi-select-esubmission-underwriter').multiselect();
    $('#multi-select-demo-two').multiselect();

    $('#multi-select-demo-three').multiselect({
        includeSelectAllOption : true,
        nonSelectedText: 'Please Select'
    });    

    $('#filter_status').multiselect({
        includeSelectAllOption : true,
        nonSelectedText: 'Please Select'
    });

    $('#multi-select-demo-ACCOUNTS').multiselect({
        includeSelectAllOption : true,
        nonSelectedText: 'Please Select'
    });

    $('#multi-select-demo-four').multiselect({
        includeSelectAllOption : true,
        nonSelectedText: 'Please Select'
    });

    $('#multi-select-demo-primary').multiselect();
    $('#multi-select-demo-secondray').multiselect();
    $('#multi-select-demo-five').multiselect();
    $('#multi-select-demo-six').multiselect();

    $('.filter_remove_btn').click(function(){
        $('.filter_div').hide();
    });

    $('.indication_btn_trigger').click(function(){
        $('.accSubsum_trigger').trigger('click');
    });

    $('.quote_btn_trigger').click(function(){
        $('.quoteNote_trigger').trigger('click');
    });

    $('.bind_btn_trigger').click(function(){
        $('.bindNote_trigger').trigger('click');
    });

    $('.issues_btn_trigger').click(function(){
        $('.issueNote_trigger').trigger('click');
    });

    $('.policy_btn_trigger').click(function(){
        $('.policy_trigger').trigger('click');
    });

    //// Send Email Account Section Start
    /// Indicate
    $(document).on('click', '.sendemail_reset_btn', function(){
        if( $('.indicatesendEmail_wrap').css('display') == 'none' ) {
            $('.indi_closesendemail_btn').hide();
            $('.indicatesendEmail_wrap').hide();
            $('.indi_sendemail_btn').show();
        } else {
            $('.indi_closesendemail_btn').hide();
            $('.indicatesendEmail_wrap').hide();
            $('.indi_sendemail_btn').show();
        }

        if( $('.quotesendEmail_wrap').css('display') == 'none' ) {
            $('.quote_closesendemail_btn').hide();
            $('.quotesendEmail_wrap').hide();
            $('.quote_sendemail_btn').show();
        } else {
            $('.quote_closesendemail_btn').hide();
            $('.quotesendEmail_wrap').hide();
            $('.quote_sendemail_btn').show();
        }

        if( $('.bindsendEmail_wrap').css('display') == 'none' ) {
            $('.bind_closesendemail_btn').hide();
            $('.bindsendEmail_wrap').hide();
            $('.bind_sendemail_btn').show();
        } else {
            $('.bind_closesendemail_btn').hide();
            $('.bindsendEmail_wrap').hide();
            $('.bind_sendemail_btn').show();
        }
    });

    $('.indi_sendemail_btn').click(function(){
        $('.indi_closesendemail_btn').show();
        $('.indicatesendEmail_wrap').show();
        $('.indi_sendemail_btn').hide();
        $('.sendmail_closebtn').hide();
        $('.indi_upload_close_btn').hide();
        $('#upload_collapse').hide();
        $('.indi_upload_btn').show();
    });

    $('.indi_closesendemail_btn').click(function(){
        $('.indi_closesendemail_btn').hide();
        $('.indicatesendEmail_wrap').hide();
        $('.indi_sendemail_btn').show();
        $('.indi_upload_close_btn').hide();
        $('#upload_collapse').hide();
        $('.indi_upload_btn').show();
    });

    //// Quote
    $('.quote_sendemail_btn').click(function(){
        $('.quotesendEmail_wrap').show();
        $('.quote_closesendemail_btn').show();
        $('.quote_sendemail_btn').hide();
        $('.sendmail_closebtn').hide();
        $('.quote_upload_btn').show();
        $('.quote_closeupload_btn').hide();
        $('#Q_upload_collapse').hide();
    });

    $('.quote_closesendemail_btn').click(function(){
        $('.quote_closesendemail_btn').hide();
        $('.quotesendEmail_wrap').hide();
        $('.quote_sendemail_btn').show();
        $('.quote_upload_btn').show();
        $('.quote_closeupload_btn').hide();
        $('#Q_upload_collapse').hide();
    });

    //// Bind 
    $('.bind_sendemail_btn').click(function(){
        $('.bindsendEmail_wrap').show();
        $('.bind_closesendemail_btn').show();
        $('.bind_sendemail_btn').hide();
        $('.sendmail_closebtn').hide();
        $('.bind_upload_btn').show();
        $('.bind_closeupload_btn').hide();
        $('#b_upload_collapse').hide();
    });

    $('.bind_closesendemail_btn').click(function(){
        $('.bind_closesendemail_btn').hide();
        $('.bindsendEmail_wrap').hide();
        $('.bind_sendemail_btn').show();
        $('.bind_upload_btn').show();
        $('.bind_closeupload_btn').hide();
        $('#b_upload_collapse').hide();
    });

    //// Send Email Account Section End

    ///// Amount 1K and commas

    $(document).on('change','.prem_money',function(){
        $('.prem_money').simpleMoneyFormat();

        $(".prem_money").blur(function(){
            var fname = $(this).val();
            firstChar = fname.charAt(0);
            if($.isNumeric(firstChar)) {
                if (fname.includes("k")) {
                    $(this).val(fname.replace("k", "000"));
                    $('.prem_money').simpleMoneyFormat();
                }

                if (fname.includes("K")) {
                    $(this).val(fname.replace("K", "000"));
                    $('.prem_money').simpleMoneyFormat();
                }

                if (fname.includes("m")) {
                    $(this).val(fname.replace("m", "000000"));
                    $('.prem_money').simpleMoneyFormat();
                }

                if (fname.includes("M")) {
                    $(this).val(fname.replace("M", "000000"));
                    $('.prem_money').simpleMoneyFormat();
                }

                if(fname.includes("b")){
                    $(this).val(fname.replace("b", "000000000"));
                    $('.prem_money').simpleMoneyFormat();
                }

                if(fname.includes("B")){
                    $(this).val(fname.replace("B", "000000000"));
                    $('.prem_money').simpleMoneyFormat();
                }

                if(fname.includes("t")){
                    $(this).val(fname.replace("t", "000000000000"));
                    $('.prem_money').simpleMoneyFormat();
                }

                if(fname.includes("T")){
                    $(this).val(fname.replace("T", "000000000000"));
                    $('.prem_money').simpleMoneyFormat();
                }
            }else{
                $('.prem_money').val('');
            }
        });
    }); 

    //// End Amount 1k and commas

    /// Datepicker code start
    $("#acc_filter_date_from").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });

    $("#acc_filter_date_to").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });


    $("#acc_filter_date_effecfrom").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });

    $("#acc_filter_date_effecto").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });

    $("#acc_filter_emailform").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });

    $("#acc_filter_emailto").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });

    $("#acc_filter_date_from").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });

    $("#acc_filter_date_to").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });


    $("#acc_filter_date_effecfrom").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });

    $("#acc_filter_date_effecto").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });

    $("#acc_filter_emailform").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });

    $("#acc_filter_emailto").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    });

    $("#datepicker_quickquote").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    }).datepicker('update', new Date());

    $("#effect_dt").datepicker({ 
        autoclose: true, 
        todayHighlight: true,
        format: 'mm-dd-yyyy',
        clearBtn: true,
        enableOnReadonly: true
    }).on('changeDate', function (selected) {
    //alert();
     
    var leapp_check = $(this).val();
    parts = leapp_check.split('-'),
    dayy = parseInt(parts[1], 10);
    var monthh = parseInt(parts[0], 10);
    var yearr = parseInt(parts[2], 10);
    //alert(monthh);
    //alert(yearr)
    if(leapp_check!=null && leapp_check!='') {
        if (monthh == '01') { tabmonth = 'Jan'}
        if (monthh == '02') { tabmonth = 'Feb'}
        if (monthh == '03') { tabmonth = 'Mar'}
        if (monthh == '04') { tabmonth = 'Apr'}
        if (monthh == '05') { tabmonth = 'May'}
        if (monthh == '06') { tabmonth = 'Jun'}
        if (monthh == '07') { tabmonth = 'Jul'}
        if (monthh == '08') { tabmonth = 'Aug'}
        if (monthh == '09') { tabmonth = 'Sep'}
        if (monthh == '10') { tabmonth = 'Oct'}
        if (monthh == '11') { tabmonth = 'Nov'}
        if (monthh == '12') { tabmonth = 'Dec'}
        $('.session_hide_tab').find('.active').find('.bind_monthyear').text(tabmonth  + "-" + yearr);
    }else {
        $('.session_hide_tab').find('.active').find('.bind_monthyear').text("TBD-"+ new Date().getFullYear());
    }
          
    yearr = yearr+1;
    if(dayy<10)
        dayy = "0"+dayy;
    if(monthh<10)
        monthh = "0"+monthh;
        var fin_date = monthh+"-"+dayy+"-"+yearr;
		$('#expire_dt').datepicker('setStartDate', new Date($("#effect_dt").val()))
        $('#expire_dt').datepicker('setDate', fin_date);
        $('.submitBtn1').attr('disabled',false);
    }); 


    $("#expire_dt").datepicker({ 
        autoclose: true, 
        todayHighlight: true,
        format: 'mm-dd-yyyy',
        clearBtn: true,
        enableOnReadonly: true
    }).on('changeDate', function (selected) {
        $('.submitBtn1').attr('disabled',false);
    });

    $("#datepicker_submission").datepicker({ 
        autoclose: true, 
        todayHighlight: true,
        enableOnReadonly: true
    }).on('changeDate', function (selected) {
        var minDate1 = new Date(selected.date.valueOf()+ (1000 * 60 * 60 * 24 * 366));
        $('#datepicker_submission1').datepicker('setDate', minDate1);
    }); 

    $("#datepicker_submission1").datepicker({ 
        autoclose: true, 
        todayHighlight: true,
        clearBtn: true,
        startDate: '+1Y'
    });
  
    $("#submission_datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    }).datepicker('update', new Date());

    $("#bind_datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    }).datepicker('update', new Date())
    .on('changeDate', function(e) {
        $('.newnoteForm').bootstrapValidator('revalidateField', 'notes_date');
    }); 

    $("#indication_datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    }).datepicker('update', new Date())
    .on('changeDate', function(e) {
        $('.newnoteForm').bootstrapValidator('revalidateField', 'notes_date');
    }); 

    $("#issue_datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    }).datepicker('update', new Date())
    .on('changeDate', function(e) {
        $('.newnoteForm').bootstrapValidator('revalidateField', 'notes_date');
    }); 

    $("#quote_datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    }).datepicker('update', new Date())
    .on('changeDate', function(e) {
        $('.newnoteForm').bootstrapValidator('revalidateField', 'notes_date');
    }); 

    $("#policy_datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true
    }).datepicker('update', new Date())
    .on('changeDate', function(e) {
        $('.newnoteForm').bootstrapValidator('revalidateField', 'notes_date');
    }); 
    ///// Date picker End

    $(window).on('load', function() {      
        if($('.animated').hasClass('account_list_sectiondiv')){
            $('.app-body').addClass('backgroundd_color');
            $('.search_icon_button_design').removeClass('btn_full_widthalign');
            $('.searchbar_div').removeClass('width_127perc');

            $('.searchbar_div').removeClass('searchbar_div2');
            $('.hide_submission_btn').show();
            $('.hide_acount_btn').hide();
            $('.submission_div_form').show();
            $('.account_div_form').hide();
        }else {
            $('.app-body').removeClass('backgroundd_color');
            $('.search_icon_button_design').removeClass('btn_full_widthalign');
            $('.hide_submission_btn').hide();
            $('.hide_acount_btn').hide();
            $('.submission_div_form').hide();
            $('.account_div_form').show();
        }
    }); 

    $('.addd_notesbtn').click(function(){
        setTimeout(function(){ $('.policy_notes_tab').trigger('click'); }, 10);
        setTimeout(function(){ $('.policy_notes_open').trigger('click'); }, 10);
    }); 

    $(document).on('click','.policy_notes_tab',function(){
        var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');
        if (tabvalue == "archivetabdiv") {
            $('.tagPage').hide();
            $('.poliAddCate').hide();
        } else {
            $('.tagPage').show();
            $('.poliAddCate').show();
        }
    });

    $('.new_notesbtn').click(function(){
        $('.account_type_newnote').show();
        $('.account_type_icon_btn').show();
        $('.vat').focus();
    });

    $('.account_type_icon_btn').click(function(){
        $('.account_type_newnote').hide();
    });

    $('.asideIndi_note').click(function(){
        setTimeout(function(){ $('.indicate_note').trigger('click'); }, 5);

        setTimeout(function(){ $('.indi_notes').trigger('click'); }, 5);

        setTimeout(function(){ $('.newnote_btn').trigger('click'); }, 5);
    });

    $('.asideQuote_note').click(function(){
        setTimeout(function(){ $('.quoteTab').trigger('click'); }, 5);

        setTimeout(function(){ $('.quoteNote').trigger('click'); }, 5);

        setTimeout(function(){ $('.quoteNoteBtn').trigger('click'); }, 5);
    });

    $('.asideBind_note').click(function(){
        setTimeout(function(){ $('.bindTab').trigger('click'); }, 5);

        setTimeout(function(){ $('.bindNote').trigger('click'); }, 5);

        setTimeout(function(){ $('.bindNoteBtn').trigger('click'); }, 5);
    });

    $('.asideIssue_note').click(function(){
        setTimeout(function(){ $('.issueTab').trigger('click'); }, 5);

        setTimeout(function(){ $('.issueNote').trigger('click'); }, 5);

        setTimeout(function(){ $('.issueNoteBtn').trigger('click'); }, 5);
    })

    $('.show_savepdf_btn').click(function(){
        $('.send_email_btn').show();
    });

    /// Confrim pop modal Start
    $('.yes_delete_btn').click(function(){
        $('body').css("overflow", "hidden");  
    }); 

    $('.ok_delete_btn').click(function(){
        $('body').removeAttr("style");
    }); 

    $('.delete_btn_icon').click(function(){
        $('.trigger_todelete').trigger('click');
    });
    /// Confrim pop modal End

    /// Indication Tab New Note Button 
    $('.indication_newnote_btn').click(function(){
        $('.indication_newnote_close_btn').show();
        $('#newNote_collapse').show();
        $('.indication_newnote_btn').hide();
        $('.vat').focus();
    });

    $('.indication_newnote_close_btn').click(function(){
        $('.indication_newnote_close_btn').hide();
        $('#newNote_collapse').hide();
        $('.indication_newnote_btn').show();
    });

    $('.indi_upload_btn').click(function(){
        $('.indi_upload_close_btn').show();
        $('#upload_collapse').show();
        $('.indi_upload_btn').hide();
        $('.indi_closesendemail_btn').hide();
        $('.indicatesendEmail_wrap').hide();
        $('.indi_sendemail_btn').show();
    });

    $('.indi_upload_close_btn').click(function(){
        $('.indi_upload_close_btn').hide();
        $('#upload_collapse').hide();
        $('.indi_upload_btn').show();
        $('.indi_closesendemail_btn').hide();
        $('.indicatesendEmail_wrap').hide();
        $('.indi_sendemail_btn').show();
    });

    $('.indi_upload_email_btn').click(function(){
        $('.indi_upload_closeemail_btn').show();
        $('#upload_collapse_e').show();
        $('.indi_upload_email_btn').hide();
    });

    $('.indi_upload_closeemail_btn').click(function(){
        $('.indi_upload_closeemail_btn').hide();
        $('#upload_collapse_e').hide();
        $('.indi_upload_email_btn').show();
    });

    //// Quote Tab New Note Button
    $('.quoteNoteBtn').click(function(){
        $('.closequoteNoteBtn').show();
        $('#Q_newNote_collapse').show();
        $('.quoteNoteBtn').hide();
        $('.vat').focus();
    });

    $('.closequoteNoteBtn').click(function(){
        $('.closequoteNoteBtn').hide();
        $('#Q_newNote_collapse').hide();
        $('.quoteNoteBtn').show();
    });


    $('.quote_upload_btn').click(function(){
        $('.quote_closeupload_btn').show();
        $('#Q_upload_collapse').show();
        $('.quote_upload_btn').hide();
        $('.quote_closesendemail_btn').hide();
        $('.quotesendEmail_wrap').hide();
        $('.quote_sendemail_btn').show();
    });

    $('.quote_closeupload_btn').click(function(){
        $('.quote_closeupload_btn').hide();
        $('#Q_upload_collapse').hide();
        $('.quote_upload_btn').show();
        $('.quote_closesendemail_btn').hide();
        $('.quotesendEmail_wrap').hide();
        $('.quote_sendemail_btn').show();
    });

    $('.quote_email_btn').click(function(){
        $('.quote_closeemail_btn').show();
        $('#Q_upload_collapse_e').show();
        $('.quote_email_btn').hide();
    });

    $('.quote_closeemail_btn').click(function(){
        $('.quote_closeemail_btn').hide();
        $('#Q_upload_collapse_e').hide();
        $('.quote_email_btn').show();
    });

    //// Bind Tab New Note Button
    $('.bindNoteBtn').click(function(){
        $('.newnote_close_btn_bind').show();
        $('#b_newNote_collapse').show();
        $('.bindNoteBtn').hide();
        $('.vat').focus();
    });

    $('.newnote_close_btn_bind').click(function(){
        $('.newnote_close_btn_bind').hide();
        $('#b_newNote_collapse').hide();
        $('.bindNoteBtn').show();
    });

    $('.bind_upload_btn').click(function(){
        $('.bind_closeupload_btn').show();
        $('#b_upload_collapse').show();
        $('.bind_upload_btn').hide();
        $('.bind_closesendemail_btn').hide();
        $('.bindsendEmail_wrap').hide();
        $('.bind_sendemail_btn').show();
    });

    $('.bind_closeupload_btn').click(function(){
        $('.bind_closeupload_btn').hide();
        $('#b_upload_collapse').hide();
        $('.bind_upload_btn').show();
        $('.bind_closesendemail_btn').hide();
        $('.bindsendEmail_wrap').hide();
        $('.bind_sendemail_btn').show();
    });

    $('.bind_email_btn').click(function(){
        $('.bind_closeemail_btn').show();
        $('#b_upload_collapse_e').show();
        $('.bind_email_btn').hide();
    });

    $('.bind_closeemail_btn').click(function(){
        $('.bind_closeemail_btn').hide();
        $('#b_upload_collapse_e').hide();
        $('.bind_email_btn').show();
    });

    //// Issues Tab New Note Button
    $('.issueNoteBtn').click(function(){
        $('.close_issueNoteBtn').show();
        $('#I_newNote_collapse').show();
        $('.issueNoteBtn').hide();
        $('.vat').focus();
    });

    $('.close_issueNoteBtn').click(function(){
        $('.close_issueNoteBtn').hide();
        $('#I_newNote_collapse').hide();
        $('.issueNoteBtn').show();
    });


    $('.issue_upload_btn').click(function(){
        $('.issue_closeupload_btn').show();
        $('#I_upload_collapse').show();
        $('.issue_upload_btn').hide();
    });

    $('.issue_closeupload_btn').click(function(){
        $('.issue_closeupload_btn').hide();
        $('#I_upload_collapse').hide();
        $('.issue_upload_btn').show();
    });


    $('.issue_emailupl_btn').click(function(){
        $('.issue_closeemailupl_btn').show();
        $('#I_upload_collapse_e').show();
        $('.issue_emailupl_btn').hide();
    });

    $('.issue_closeemailupl_btn').click(function(){
        $('.issue_closeemailupl_btn').hide();
        $('#I_upload_collapse_e').hide();
        $('.issue_emailupl_btn').show();
    });

    //// Policy Tab New Note Button
    $('.policynewnote_btn_show').click(function(){
        $('.policynewnote_close_btn').show();
        $('#PnewNote_collapse').show();
        $('.policynewnote_btn_show').hide();
    });

    $('.policynewnote_close_btn').click(function(){
        $('.policynewnote_close_btn').hide();
        $('#PnewNote_collapse').hide();
        $('.policynewnote_btn_show').show();
    });


    $('.policy_upload_btn').click(function(){
        $('.policy_closeupload_btn').show();
        $('#pDoc_div').show();
        $('#pEmail_div').hide();
        $('.policy_emailup_btn').show();
        $('.policy_upload_btn').hide();
        $('.policy_closeemail_btn').hide();
        $('#collapseOne').addClass("show");
        $('#collapseTwo').removeClass("show");
        $('#collapseThree').removeClass("show");
        $('#collapseOne').trigger('click');
        $('.docTabArrow').addClass('fa-chevron-down');
        $('.mailTabArrow').removeClass('fa-chevron-down');
        $('.noteTabArrow').removeClass('fa-chevron-down');
    });

    $('.policy_closeupload_btn').click(function(){
        $('.policy_closeupload_btn').hide();
        $('#pDoc_div').hide();
        $('#pEmail_div').hide();
        $('.policy_emailup_btn').show();
        $('.policy_upload_btn').show();
        $('.policy_closeemail_btn').hide();
        $('#collapseOne').removeClass("show");
        $('#collapseTwo').addClass("show");
        $('#collapseThree').removeClass("show");
        $('.docTabArrow').removeClass('fa-chevron-down');
        $('.mailTabArrow').addClass('fa-chevron-down');
        $('.noteTabArrow').removeClass('fa-chevron-down');
    });

    $('.policy_emailup_btn').click(function(){
        $('.policy_closeemail_btn').show();
        $('#pDoc_div').hide();
        $('#pEmail_div').show();
        $('.policy_emailup_btn').hide();
        $('.policy_closeupload_btn').hide();
        $('.policy_upload_btn').show();
        // $('.policy_upload_btn').hide();
        $('#collapseOne').removeClass("show");
        $('#collapseTwo').addClass("show");
        $('#collapseThree').removeClass("show");
        $('.docTabArrow').removeClass('fa-chevron-down');
        $('.mailTabArrow').addClass('fa-chevron-down');
        $('.noteTabArrow').removeClass('fa-chevron-down');
    });

    $('.policy_closeemail_btn').click(function(){
        $('.policy_closeemail_btn').hide();
        $('#pDoc_div').hide();
        $('#pEmail_div').hide();
        $('.policy_emailup_btn').show();
        $('.policy_closeupload_btn').hide();
        $('.policy_upload_btn').show();
        $('#collapseOne').removeClass("show");
        $('#collapseTwo').addClass("show");
        $('#collapseThree').removeClass("show");
    });
});


$('[data-toggle="tooltip"]').tooltip()
    //PDF file name
    $('.file_name_wrap').hide();
    $(document).on('click', '.save_pdf', function(){
    $('.file_name_wrap').show();
});

//Cancel for save pdf file
$(document).on('click', '.cancel_savepdf', function(){
    $('.file_name_wrap').hide();
    $('.file_name').val('');
});

//Send email
$('.sendEmail_wrap').hide();

$(document).on('click', '.send_email_btn', function(){
    $('.sendEmail_wrap').show();
    $('.tomailid').find('input').focus();

    getbrokeremail();
});

$(document).on('change', '#ac_tbroker', function(){
    $broker = $(this).val();
    getbrokeremail();
    check_valid_brok();
    check_program_broker($broker);
});


function getbrokeremail(){
    var brokerid = $('#ac_tbroker').val();
    var ac_tname = $('#ac_tname').val();

    var quote_id = $('.showquote_id').text();
    var tp_comma = $('.tp_comma').text();

    if (quote_id == '') {
        var quote_id1 = '';
    }else{
        var quote_id1 = ' - '+quote_id;
    }

    if (tp_comma == '') {
        var tp_comma1 = '';
    }else{
        var tp_comma1 = ' - $'+tp_comma;
    }

    $('.emailsubject').val('');
    $('.emailsubject').val(ac_tname+quote_id1+tp_comma1);

    var ccmailss = localStorage.getItem('userid');

    $('input[name="ccmailid"]').val(ccmailss);
    $('input[name="ccmailid"]').amsifySuggestags();

    if (brokerid) {
        $.ajax({
            url: laravel_url+"/getbrokeremail",
            type:'get',
            data:{brokerid:brokerid},
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(response){
                var obj = jQuery.parseJSON(response);
                $('input[name="tomailid"]').val('');
                $('input[name="tomailid"]').val(obj.brokeremail);
                $('input[name="tomailid"]').amsifySuggestags();
            }
        });
    }
}

$(document).on('click', '.sendmail_closebtn', function(){
    $('.sendEmail_wrap').hide();
});

// Issue Majesco Link
                    
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

//Account details save
$(document).on('click', '.close_accountdetails_div', function(){
    $("ac_tname").focus();
    $('.new_notesbtn').removeClass('btn-danger');
    $('.new_notesbtn').text('New Note');
    $('.account_type_newnote').hide();
    // alert();
    // $(document).find('.searchbar_div').hide();
    $('.notedit_modal').trigger('click');
    $('.are_delete').empty();
    $('.are_delete').html('Are you sure want to close?');
});

//Actions restore
$(document).on('click','.restore_btn', function(){
    $('.restorePopup').trigger('click');
    $('.restorePopup_text').empty();
    $('.restorePopup_text').html('Are you sure to reopen the account ?');
});

$(document).on('click','.poliArrowIcon', function(){
  $('.hidePoliMenus').toggleClass('d-block', 'slow');
});



$(document).on('click','.add_more_submission', function(){
    var rowlength = $('.remove_div_more').length;
    var inc = rowlength+1;
    inc_rowid = $('[data-location_id]').length+1;
     var dis_val=1;
     var html = $(".copy").html();
     var checkk = true;
     $(".exposure_row").each(function () {
         exposuree = $(this).find(".Qexposure_amount").val();
         exposuree = exposuree.replace(/([,.$])+/g, '');
         SIC_business_classs = $(this).find(".Qclass_code_submission").val();
         zip_codee = $(this).find(".Qzip_code_submission").val();
         locatt = $(this).find(".loc_add").val();
    });
   
  
$("input").removeClass("highlight");
$(".get_code_account").prop('disabled',false);

var textArr=$("input[type=text][id^=Qclass_code_submission]").get();
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
		if(textArr[outer].value.substring(0, 5)==textArr[inner].value.substring(0, 5))
		{
			if(textArr1[outer].value==textArr1[inner].value)
			{
			if(textArr2[outer].value.toLowerCase()==textArr2[inner].value.toLowerCase())
			{
			if(jQuery.inArray( textArr[outer].value.substring(0, 5), dupArr )==-1 || jQuery.inArray( textArr1[outer], dupArr1 )==-1 || jQuery.inArray( textArr2[outer].toLowerCase(), dupArr2 )==-1)
			{
				dupArr.push(textArr[outer]);
				dupArr1.push(textArr1[outer]);
				dupArr2.push(textArr2[outer]);
				
			}
			if(jQuery.inArray( textArr[inner].value.substring(0, 5), dupArr )==-1 || jQuery.inArray( textArr1[inner], dupArr1 )==-1 || jQuery.inArray( textArr2[inner].toLowerCase(), dupArr2 )==-1)
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
		    dis_val=0;	
		}else{
    		for(p=1;p< dupArr.length;p++){
    			$("#"+dupArr[p].id).addClass("highlight");
    			$("#"+dupArr1[p].id).addClass("highlight");
    			$("#"+dupArr2[p].id).addClass("highlight");
    		} 
		    dis_val=1;
            $(".get_code_account").prop('disabled',true);
		}
		
        if (zip_codee == '' || SIC_business_classs == '' || exposuree == '' || locatt=='' || $('.Qzip_code_submission ').hasClass('errorBorder')) {
            checkk = false;
        }
  
        if(checkk == false)
        {
            iso_pricing_addr_validation();
            
            new PNotify({ title: 'Error', text: 'Please fill mandatory fields', delay: 1000, type: 'error' });
            return false;
        }
        else{	
  			if(dis_val == 0){
                $(".get_code_account").prop('disabled',false);
    			$("input").removeClass("highlight");
                var unique_id = Math.floor((new Date()).getTime() / 1000);
              
    		   $('.copy_addd').append('<div class="remove_div_more" id="cov_clsCd_row'+inc+'"><div class="form-row exposure_row subformrow" data-subrowid="'+inc_rowid+'" data-unique_id='+unique_id+'><div class="col-3"><div class="form-group add_more_details_mb"> <input type="text" class="classcode_tbox form-control Qclass_code_submission subClassCode" name="Qclass_code_submission[]" id="Qclass_code_submission'+inc+'" data-ptype="iso" data-qclassid="'+inc+'"  placeholder="Enter Classcode"></div><small class="text-muted appendText class_ctext" id="ctext'+inc+'" data-qctext="'+inc+'"></small> <small class="text_color class_isotext" id="isotext'+inc+'" data-qisotext="'+inc+'"></small><p class="pt-1 text-left pull-left text-danger width100_perc font80_perc iso_qq_cc_invalid_msg" id="iso_qq_cc_invalid_msg_'+inc+'" style="display: none;">Invalid Class Code</p><div><input type="hidden" class="Qclass_code_coverage" name="Qclass_code_coverage[]" id="Qclass_code_coverage'+inc+'" data-rowid="'+inc+'"></div></div><div class="col-2"><div class="form-group"><div class="input-group"><input type="text" class="zipcode_tbox form-control Qzip_code_submission subZipCode" data-qzipid="'+inc+'" name="Qzip_code_submission[]" id="Qzip_code_submission'+inc+'" placeholder="Enter Zip" maxlength="5"></div><span id="isopricing_zip_err_msg'+inc+'" class="text-danger isopricing_zip_err_msg" style="display:none;">Invalid</span><small class="text-muted city_label" id="ziptext'+inc+'" data-qziptext="'+inc+'"></small><br /></div></div><div class="form-group col-2"><div class="isocityname" id="city_name_td'+inc+'"></div><select class="form-control city_name_hide city city'+inc+'" name="city"><option value="City1"></option></select></div><div class="col-2"><div class="form-group"> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text loc_add_text locAddText1" data-location_id="'+inc_rowid+'"> L'+inc_rowid+' </div> </div><input type="text" name="loc_add" id="loc_add'+inc+'" class="form-control loc_add subLocAdd" autocomplete="data-off" placeholder="Enter Location"></div></div></div><div class="col-2"><div class="form-group"><div class="input-group"><input type="text" class="form-control subExpos prem_money Qexposure_amount" id="Qexposure_amount'+inc+'" name="Qexposure_amount[]" maxlength="9" placeholder="Enter Exposure"></div><small class="text-muted premium_base" id="pbtext'+inc+'" data-qpbtext="'+inc+'"></small> <br /></div></div><div class="col-lg-1 col-md-6 align-items-center add_more_removebtn subBtns"><div class="form-group"><button type="button" class="btn btn-primary btn-xs add_more_btn add_more_submission" id="add_more_btn'+inc+'" data-toggle="tooltip" data-placement="top" title="Add Location" name="sub"> <span> <i class="fa fa-plus" aria-hidden="true"></i> </span> </button> <button type="button" class="btn btn-xs btn-warning subCloneBtn" data-toggle="tooltip" data-placement="top" title="Clone"> <i class="fa fa-copy" aria-hidden="true"></i></button> <button type="button" class="btn btn-danger btn-xs remove_more_btn" title="Remove" name="Qsub"> <i class="fa fa-remove" aria-hidden="true"></i></button> <button type="button" class="btn btn-danger btn-xs remove_more_btn1" title="Remove" name="Qsub1" style="display:none"> <i class="fa fa-remove" aria-hidden="true"></i></button> </div></div></div></div></div>');
                // inc++;
                serialize_iso_row_no();
  			}else{
      			new PNotify({ title: 'Error', text: 'Duplicate value is exists', delay: 2000, type: 'error' });
      			return false;
  			}
        }
        $('[data-toggle="tooltip"]').tooltip();

        // if(inc >= 10 ) {
        //    $('.add_more_btn').hide();
        // } else {
        //    $('.add_more_btn').show();
        // }
    });

    function serialize_iso_row_no() {
        row_no = 1;
        ccid_no = 0;
        $(".exposure_row").each(function () {
            $(this).attr('data-subrowid', row_no);
            $(this).find('.qqrowid').attr('data-location_id', row_no);
            $(this).find('input').attr('data-qclassid', ccid_no);
            $(this).find('input').attr('data-qzipid', ccid_no);
            $(this).find('.class_ctext').attr('id', 'ctext'+ccid_no);
            $(this).find('.class_ctext').attr('data-qctext', ccid_no);
            $(this).find('.class_isotext').attr('id', 'isotext'+ccid_no);
            $(this).find('.class_isotext').attr('data-qisotext', ccid_no);
            $(this).find('.city_label').attr('id', 'ziptext'+ccid_no);
            $(this).find('.city_label').attr('data-qziptext', ccid_no);
            $(this).find('.isocityname').attr('id', 'city_name_td'+ccid_no);
            $(this).find('.qqcityname').attr('id', 'city_name_td'+ccid_no);
            $(this).find('.Qclass_code_coverage').attr('id', 'Qclass_code_coverage'+ccid_no);
            $(this).find('.Qqclass_code_coverage').attr('id', 'Qqclass_code_coverage'+ccid_no);
            $(this).find('.loc_add_text').attr('id', 'locAddText'+ccid_no);
            $(this).find('.loc_add_text').attr('data-location_id', row_no);
            $(this).find('.Qclass_code_submission').attr('id','Qclass_code_submission'+ccid_no);
            $(this).find('.Qzip_code_submission').attr('id','Qzip_code_submission'+ccid_no);
            $(this).find('.loc_add').attr('id','loc_add'+ccid_no);
            $(this).find('.Qexposure_amount').attr('id','Qexposure_amount'+ccid_no);
            $(this).find('.iso_qq_cc_invalid_msg').attr('id','iso_qq_cc_invalid_msg_'+ccid_no);
            row_no++;
            ccid_no++;
        });
    }
     
    count = 111;
    $(document).on('click', '.subCloneBtn',function(){
        var clonesec = $(this).attr('data-section');
		var checkk = true;
		$(".exposure_row").each(function () {
    		exposuree = $(this).find(".Qexposure_amount").val();
    		exposuree = exposuree.replace(/([,.$])+/g, '');
    	    SIC_business_classs = $(this).find(".Qclass_code_submission").val();
    		zip_codee = $(this).find(".Qzip_code_submission").val();
    		locatt = $(this).find(".loc_add").val();
		});
		 
		if (zip_codee == '' || SIC_business_classs == '' || exposuree == '' || locatt=='' || $('.Qzip_code_submission ').hasClass('errorBorder')) {
            checkk = false;
        }
    		
      	if(checkk == false){
            iso_pricing_addr_validation();
      		new PNotify({ title: 'Error', text: 'Please fill mandatory fields', delay: 1000, type: 'error' });
      	    return false;
      	}
    	else{
			var dupArr4;
			var class_current = $(this).closest('.exposure_row').find('.Qclass_code_submission').val();
			var high_id = $(this).closest('.exposure_row').find('.Qclass_code_submission').attr('data-qclassid');
			var class_prev = $(this).closest('.exposure_row').prev().find('.Qclass_code_submission').val();
      				
      		if(class_prev!=undefined && class_current!=undefined){
				var class_current_sub=class_current.substring(0, 5);
				var class_prev_sub=class_prev.substring(0, 5);
        		if(class_current_sub==class_prev_sub){
        			new PNotify({ title: 'Error', text: 'Duplicate value is exists', delay: 2000, type: 'error' });
        			$('#Qclass_code_submission'+high_id).addClass("highlight");
        			dupArr4=1;
        		}else{
        			dupArr4=0;
        		}
      		}else{
      			dupArr4=0;
      		}

    		if(dupArr4 == 0){
                var clone_tbl = $(this).closest('.form-row');
                var clone_tableprop = clone_tbl.clone();

                var cityval = $(this).closest('.form-row').find('.city').val();

                if ( clonesec = 'ac' ) {
                    $('.copy_addd').append(clone_tableprop);
                    
                    setTimeout(function(){  
                        rowid = $('[data-location_id]').length;

                        $('.copy_addd').find('.loc_add_text').last().text('L'+rowid);
                        $('.copy_addd').find('.exposure_row').last().attr('data-subrowid', rowid);
                        $('.copy_addd').find('.loc_add_text').last().attr('data-location_id', rowid);

                        $('.copy_addd').find("select.city option[value='"+cityval+"']").attr("selected","selected");
                    }, 500);
                }

                if ( clonesec = 'qq' ) {
                    $('.Qcopy').append(clone_tableprop);

                    setTimeout(function(){  
                        incrowid = $('[data-location_id]').length;
                        $('.Qcopy').find('.qqrowid').last().attr('data-location_id', incrowid);
                        $('.Qcopy').find("select.city option[value='"+cityval+"']").attr("selected","selected");
                    }, 500);
                }

                clone_tbl.find(".Qzip_code_submission").attr('disabled',true);
                clone_tbl.find('select[name="city"]').attr('disabled',true);
                clone_tbl.find(".loc_add").attr('disabled',true);
                clone_tableprop.find(".Qclass_code_submission").attr('id', 'Qclass_code_submission'+count).val('');
                clone_tableprop.find(".Qclass_code_coverage").attr('id', 'Qclass_code_coverage'+count).val('');
                clone_tableprop.find(".Qzip_code_submission").attr('id', 'Qzip_code_submission'+count).attr('disabled',true);
      		    clone_tableprop.find(".Qclass_code_submission").attr('data-qclassid',count);
                clone_tableprop.find('select[name="city"]').attr('disabled',true);
                clone_tableprop.find(".class_ctext").attr('id', 'ctext'+count).text('');
          	    clone_tableprop.find(".class_ctext").attr('data-qctext', count);
          	    clone_tableprop.find(".class_isotext").attr('id', 'isotext'+count).text('');
          	    clone_tableprop.find(".class_isotext").attr('data-qisotext', count);
                clone_tableprop.find(".iso_qq_cc_invalid_msg").attr('id', 'iso_qq_cc_invalid_msg_'+count);
          	    clone_tableprop.find(".premium_base").attr('id', 'pbtext'+count).text('');
          	    clone_tableprop.find(".premium_base").attr('data-qpbtext', count);
                clone_tableprop.find(".loc_add").attr('id', 'loc_add'+count).attr('disabled',true);
                clone_tableprop.find(".loc_add_text").val('L'+ (inc+1)).attr('disabled',true); 
                clone_tableprop.find(".Qexposure_amount").attr('id', 'Qexposure_amount'+count).val('');
                clone_tableprop.find(".remove_more_btn1").show();
                clone_tableprop.find(".remove_more_btn").hide(); 

          		// clone_tableprop.find(".Qexposure_amount").attr('onfocusout', 'last_row_check('+count+')');
          		clone_tableprop.find(".add_more_btn").attr('id', 'add_more_btn'+count);
              
                count++;
    		}
    	}
    });
	 
    $(document).on("click",".remove_more_btn",function(){ 

        $(".get_code").prop('disabled',false);
        $(".get_code_account").prop('disabled',false);

        inc--; 

        // if(inc <= 10) {
        //     $('.add_more_btn').show();
        // } else {
        //     $('.add_more_btn').hide();
        // }
        $(this).parents(".form-row").remove();
       
        rearrage_subIds();
        serialize_iso_row_no();
        var arate_length = $('.get_arate_length').length;
        if (arate_length > 0) {
            $('.get_code').addClass('disabled');
        } else {
            $('.get_code').removeClass('disabled');
        }
        var iso_rate_length = $('.get_iso_rate_length').length;
        if (iso_rate_length > 0) {
            $('.get_code_account').addClass('disabled');
        } else {
            $('.get_code_account').removeClass('disabled');
        }
    });

    $(document).on("click",".remove_more_btn1",function(){ 

        $(".get_code").prop('disabled',false);
        $(".get_code_account").prop('disabled',false);

        count--;
        $(this).parents(".form-row").remove();
        rearrage_subIds();
    });

    $(document).on("click",".sumCloseBtn",function(){ 
       $(this).parents(".remove_this_tr").remove();
    });

    $(document).on("click","button",function(){
        $(this).tooltip('hide');
    })

	function rearrage_subIds()
    {
        inc=0;
        unique_id_array = [];
        $('.exposure_row').each(function(){     
            unique_id = $(this).attr('data-unique_id');
            if($('[data-unique_id="'+unique_id+'"]').length>1)
            {           
                if(jQuery.inArray(unique_id, unique_id_array) == -1) 
                {
                    $(this).find('.locAddText1').text('L'+(inc+1));
                    $(this).find('.subClassCode').attr('id','Qclass_code_submission'+inc);
                    $(this).find('.subZipCode').attr('data-qzipid'+inc);
                    $(this).find('.subZipCode').attr('id','Qzip_code_submission'+inc);
                    $(this).find('.subLocAdd').attr('id','loc_add'+inc);
                    $(this).find('.subExpos').attr('id','Qexposure_amount'+inc);
                    $(this).prev('div').attr('id','cov_clsCd_row'+inc);
                    inc++;
                    unique_id_array.push(unique_id);
                }
                else
                {
                    $(this).find('.locAddText1').text('L'+(inc)); 
                }
                return;
            }
            $(this).find('.subClassCode').attr('id','Qclass_code_submission'+inc);
            $(this).find('.subZipCode').attr('data-qzipid'+inc);
            $(this).find('.subZipCode').attr('id','Qzip_code_submission'+inc);
            $(this).find('.subLocAdd').attr('id','loc_add'+inc);
            $(this).find('.subExpos').attr('id','Qexposure_amount'+inc);
            $(this).find('.locAddText1').text('L'+(inc+1));  

            $(this).find('.subZipCode').removeAttr('disabled');
            $(this).find('select[name="city"]').removeAttr('disabled');
            $(this).find('.subLocAdd').removeAttr('disabled');

            inc++;
        });
                  
        $(".get_code").removeClass('disabled');
        $(".get_code_account").removeClass('disabled');
    }

    // function last_row_check(inc){
	   //  if(inc == 10) {
		  //   var btn_id=inc-1;
    //         $('#add_more_btn'+btn_id).trigger('click');
		  //   return false;
    //     } 
    // }

    $(document).on('click','.addnewbrokers',function(){

        var brokName = $('.brokName').val();

        var brokEmail = $('.brokEmail').val();

        var brokPrimary = $('#addbrok_primary').val();
        var brok_lob1 = $('.brok_lob1_multiselect').val();
        var brok_lob2 = $('.brok_lob2_multiselect').val();
   
        if(IsEmaill(brokEmail) == false){
            new PNotify({ title: 'Error', text: 'Not a valid Email', delay: 2000, type: 'error' });
            return false;
        }

        if(brokName != "" && brokEmail != ""){
            $.ajax({
                url: laravel_url+"/addnewbrokers",
                type:'post',
                data:{brokName:brokName, brokEmail:brokEmail, brokPrimary:brokPrimary,brok_lob1:brok_lob1, brok_lob2:brok_lob2},
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success:function(response){
                    new PNotify({ title: 'Success', text: response , delay: 1000, type: 'success' });
                    location.reload();
                }
            });
        }
        else{
            new PNotify({ title: 'Alert', text: "Please Fill Fields" , delay: 1000, type: 'error' });
        }
    });


    function IsEmaill(brokEmail) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(brokEmail)) {
            return false;
        } else {
            return true;
        }
    }

    $(document).on('click','.changebrokstatus',function(){

        var brokid = $(this).data('brokid');
        var status = $(this).data('isdeleted');
  
        $.ajax({
            url: laravel_url+"/changebrokstatus",
            type:'post',
            data:{brokid:brokid, status:status},
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success:function(response){
                new PNotify({ title: 'Success', text: response , delay: 1000, type: 'success' });
                $('#brokerTable').DataTable().ajax.reload(null, false);
             
            }
        });
    });

    // color pick
    var colorList = [ '', '#000000', '#333399', '#336633', '#c22727', '#FF8C00', '#FFD700', '#21a95e', '#20B2AA', '#4682B4', '#BA55D3' ];

    var picker = $('.color-picker');

    for (var i = 0; i < colorList.length; i++ ) {
        if(i==0){
            picker.append('<li class="color-item" data-hex="' + colorList[i] + '" style="background-color:' + colorList[i] + ';" title="' + colorList[i] + '"><span class="colorEmpty"> <i class="fa fa-times fa-lg"></i> </span></li>');  
        }else {
            picker.append('<li class="color-item" data-hex="' + colorList[i] + '" style="background-color:' + colorList[i] + ';" title="' + colorList[i] + '"></li>');  
        }
        
    }

    $('body').click(function () {
        picker.fadeOut();
    });
    
    $(document).on('click','.colorPick',function(event){
        event.stopPropagation();
        picker.fadeIn();
        picker.children('li').click(function() {
            var codeHex = $(this).data('hex');

            if(!codeHex){
                $('.colorEmptyDiv').show();
                $('.colorPick').css('background-color','');      
            }else {
                $('.colorEmptyDiv').hide();
                $('.colorPick').css('background-color', codeHex);    
            }
            $('.colorPick').val(codeHex);
        });
    });

    $(document).on('click','.primary_log_details_remove_btn', function(){
        $('.primary_log_details_section').hide();
        $('.primary_log_btn_design').removeClass('disabled');
    });

    function check_program_broker(broker) {
        $.ajax({
          url: laravel_url+"/check_program_broker",
          type:'post',
          data:{broker:broker},
          success:function(response) {
            var display_status = $('.has_program').css('display');
            if(response.program == 1){
                if(display_status == 'none'){
                    $('.has_program').css('display','block');
                }
            }else{
                if(display_status == 'block'){
                    $('.has_program').css('display','none');
                    $('.has_program').val('');
                }
            }
          },
          error: function() {
          }
        });
      }

    

