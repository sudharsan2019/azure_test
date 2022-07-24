$(document).ready(function () {
    $('.agenBrokerSelect').multiselect({
        includeSelectAllOption : true,
        nonSelectedText: 'Please Select'
    });
    get_all_agency(false);
});

function get_all_agency(agent_stay_value) {
    if($('#agency_table').DataTable()){
        $('#agency_table').DataTable().destroy();
    }
    
    $.ajax({
        url: laravel_url+"/get_all_agency",
        type: 'post',
        success:function(response){
            if (response.status == 1) {
                $('.agency_tbody').html(response.agency_tbody);
                $('#agency_table').DataTable({
                    "responsive": true,
                    "pageLength": 10,
                    "autoWidth": false,
                    "destroy": true,
                    "searching": true,
                    "language": { search: "" },
                    "stateSave": agent_stay_value,
                    "columnDefs": [
                    { "width": "25%", "targets": 0 },
                    { "width": "15%", "targets": 1 },
                    { "width": "5%", "targets": 2 },
                    { "width": "5%", "targets": 3 },
                    { "width": "10%", "targets": 4 },
                    { "width": "100%", "targets": 5 },
                    { "width": "0%", "targets": 6 },
                    { "width": "0%", "targets": 7 },
                    { "width": "0%", "targets": 8 }
                    ]
                });
            }
        },
        complete: function() {
            
        }
    });
}

$(document).on('click', '.new_addagency', function() {
    $('.agent_title').html('Add Agency');
    $('.add_new_agency_section').hide();
    $('.addAgencySec').show();
    list_brokers();
    list_underwriter(1);
    $(".datepicker").datepicker("setDate", new Date());
    $('.percn_input').removeAttr('readonly');
    $('.percn_input').removeClass('not_clickable');
    $('.commission_datepicker').removeClass('not_clickable');
    var update_agency_visibility = $('.update_agency').css('display');
    var save_agency_visibility = $('.save_agency').css('display');
    if (update_agency_visibility == 'inline-block'){
        $('.update_agency').css('display','none');
    }
    if (save_agency_visibility == 'none'){
        $('.save_agency').css('display','initial');
    }
});     

$(document).on('click', '.close_add_agency_btn', function() {
    $('.add_new_agency_section').show();
    $('.addAgencySec').hide();
    $('.program_checkbox').removeAttr('style');
    $('.commission_div').removeAttr('style');
    get_all_agency(true);
    // $('#agency_table').DataTable().ajax.reload();
    reset_agency_fields();
    $('.agencyName').removeClass('redBorder');
    $('.agencyCode').removeClass('redBorder');
    $('.agencyZip').removeClass('redBorder');
    $('.agencyCity').removeClass('redBorder');
    $('#agencyAddr').removeClass('redBorder');
    $('.agenBrokerSelect_div .btn-group .multiselect').removeClass('redBorder');
});  


$(document).on('click', '.hist_lists', function() {
    var visibility = $('.hist_div').css('display')
    if (visibility == 'block') {
        $('.hist_div').hide();
    }
    var commission_id = $('.commission_rid').val();
    var coverage_type = $(this).attr('data-coverage');
    if(commission_id != ''){
        $.ajax({
            url: laravel_url+"/get_commission_history",
            type: 'post',
            data: {commission_id : commission_id, coverage : coverage_type},
            success:function(response) {
                if(response.commission_tbody != ''){
                    $('.list_hist_tbody').html(response.commission_tbody);
                    $('.hist_div').show();
                }else{
                    new PNotify({ title: 'Error', text: 'No history to display' , delay: 1500, type: 'error' });
                }
            }
        });
    }else{
        new PNotify({ title: 'Error', text: 'No history to display' , delay: 1500, type: 'error' }); 
    }
    
});  

$(document).on('click', '.agen_hist_close', function() {
    $('.hist_div').hide();
});

$('.datepicker').datepicker({
    todayHighlight: true
});

$(document).on('click', '.save_new_agency', function() {
    var data = {};
    var agency_rid = $('.agency_rid').val();
    var agent_status = $('.agentStatus').val();
    if (agency_rid != '') {
        data.rid = agency_rid;
        if(agent_status == 1){
            data.updated_by = localStorage.getItem('usernumericid');
        }else{
            data.deleted_by = localStorage.getItem('usernumericid');
        }
    } else {
        data.created_by = localStorage.getItem('usernumericid');
    }

    var agent_name = $('.agencyName').val();
    var agent_code = $('.agencyCode').val();
    var agent_zip = $('.agencyZip').val();
    var agent_city = $('.agencyCity').val();
    data.agent_state = $('.agencyState').val();
    var agent_address = $('#agencyAddr').val();
    var agent_program = $('#programCkbx').prop('checked');
    var selected_brok = '';
    var brok_i = 1;

    $("#agenBrokerSelect option:selected").each(function() {
        if(brok_i == 1) {
            selected_brok += $(this).val();
        } else {
            selected_brok += ',' + $(this).val();
        }
        brok_i ++;
    });

    var brokers = selected_brok;

    if (agent_program == true) {
        data.program = 1;
    } else {
        data.program = 0;
    }
    
    $('.hist_div').hide();

    if ($('.commission_div').css('display') == 'none'){
       var commission_valid = 1;
       var com_isvisible = 0;
    } else {
        var com_isvisible = 1;
        var gl_percentage = $('.gl_percentage').val();
        var gleff_date = $('.gl_eff_date').val();
        var gl_date_split = gleff_date.split('-');
        var  gl_eff_date = gl_date_split[2] + '-' + gl_date_split[0] + '-' + gl_date_split[1];
        var xl_percentage = $('.xl_percentage').val();
        var xleff_date = $('.xl_eff_date').val();
        var xl_date_split = xleff_date.split('-');
        var  xl_eff_date = xl_date_split[2] + '-' + xl_date_split[0] + '-' + xl_date_split[1];
        var ocp_percentage = $('.ocp_percentage').val();
        var ocpeff_date = $('.ocp_eff_date').val();
        var ocp_date_split = ocpeff_date.split('-');
        var  ocp_eff_date = ocp_date_split[2] + '-' + ocp_date_split[0] + '-' + ocp_date_split[1];

        if (gl_percentage == '' || gl_eff_date == '' || xl_percentage == '' || xl_eff_date == '' || ocp_percentage == '' || ocp_eff_date == ''){
            var commission_valid = 0;
            if (gl_percentage == ''){
                $('.gl_percentage').addClass('redBorder');
            } else {
                $('.gl_percentage').removeClass('redBorder');
            }
    
            if (gl_eff_date == ''){
                $('.gl_eff_date').addClass('redBorder');
            } else {
                $('.gl_eff_date').removeClass('redBorder');
            }
    
            if (xl_percentage == ''){
                $('.xl_percentage').addClass('redBorder');
            } else {
                $('.xl_percentage').removeClass('redBorder');
            }
    
            if (xl_eff_date == ''){
                $('.xl_eff_date').addClass('redBorder');
            } else {
                $('.xl_eff_date').removeClass('redBorder');
            }
    
            if (ocp_percentage == ''){
                $('.ocp_percentage').addClass('redBorder');
            } else {
                $('.ocp_percentage').removeClass('redBorder');
            }
    
            if (ocp_eff_date == ''){
                $('.ocp_eff_date').addClass('redBorder');
            } else {
                $('.ocp_eff_date').removeClass('redBorder');
            }
        } else {
            var com_data = {};
            var commission_valid = 1;
            var commission_id = $('.commission_rid').val();
            if (commission_id != ''){
                com_data.rid = commission_id;
                com_data.updated_by = localStorage.getItem('usernumericid');
            } else {
                com_data.created_by = localStorage.getItem('usernumericid');
            }

            com_data.gl_percentage = gl_percentage;
            com_data.gl_effective_date = gl_eff_date;
            com_data.xl_percentage = xl_percentage;
            com_data.xl_effective_date = xl_eff_date;
            com_data.ocp_percentage = ocp_percentage;
            com_data.ocp_effective_date = ocp_eff_date;
        }
    }

    
    if (agent_name.trim() != '' && agent_code.trim() != '' && agent_zip != '' && agent_city !='' && agent_address.trim() != '' && brokers != '' && agent_status !='' && commission_valid == 1) {
        data.agent_name = agent_name;
        data.agent_code = agent_code;
        data.agent_zip = agent_zip;
        data.agent_city = agent_city;
        data.agent_address = agent_address;
        data.brokers = brokers;
        data.is_active = agent_status;
        save_update_agency(data,com_data,com_isvisible);
    } else {
        if (agent_name.trim() == ''){
            $('.agencyName').addClass('redBorder');
        } else {
            $('.agencyName').removeClass('redBorder');
        }

        if (agent_code.trim() == ''){
            $('.agencyCode').addClass('redBorder');
        } else {
            $('.agencyCode').removeClass('redBorder');
        }

        if (agent_zip == ''){
            $('.agencyZip').addClass('redBorder');
        } else {
            $('.agencyZip').removeClass('redBorder');
        }

        if (agent_city == ''){
            $('.agencyCity').addClass('redBorder');
        } else {
            $('.agencyCity').removeClass('redBorder');
        }

        if (agent_address.trim() == ''){
            $('#agencyAddr').addClass('redBorder');
        } else {
            $('#agencyAddr').removeClass('redBorder');
        }

        if (brokers == ''){
            $('.agenBrokerSelect_div .btn-group .multiselect').addClass('redBorder');
        } else {
            $('.agenBrokerSelect_div .btn-group .multiselect').removeClass('redBorder');
        }
    }
});

$(document).on('click', '.discard_agency', function () {
    var agency_rid = $('.agency_rid').val();
    if (agency_rid != '') {
        list_brokers(agency_rid);
        get_agency_details(agency_rid);
    } else {
        reset_agency_fields();
    }
});

$(document).on('focusout', '.agencyZip', function () {
    var zipcode = $(this).val();
    if (zipcode.length == 5) {
        $.ajax({
            url: laravel_url+"/get_zipcode_base_details",
            type:'post',
            data:{
                'zipcode': zipcode,
            },
            success: function(response) {
                if (response.length > 0) {
                    var city_option = '';
                    for (i = 0; i<response.length; i++) {
                        if (response.length > 1 && i == 0) {
                            city_option += "<option value=''>Please Select</option>"
                        }
                        city_option += "<option value='"+response[i].us_city+"'>"+response[i].us_city+"</option>"
                    }
                    $('.agencyCity').html(city_option);
                    var state = response[0].us_state_desc;
                    $('.agencyState').val(state);
                } else {
                    new PNotify({ title: 'Error', text: 'Invalid Zipcode' , delay: 1500, type: 'error' }); 
                    $('.agencyZip').val('');
                    $('.agencyCity').html("<option value=''>City</option>");
                    $('.agencyState').val('');
                }
            }
        });
    } else {
        $('.agencyZip').val('');
        $('.agencyCity').html("<option value=''>City</option>");
        $('.agencyState').val('');
    }
    
});

function list_brokers(agency_id) {
    data = {};
    if(agency_id != ''){
        data.rid = agency_id
    }
    try {
        $.ajax({
            url: laravel_url+"/list_eff_brokers",
            type:'post',
            data : data,
            async: false,
            success:function(response) {
                $('.agenBrokerSelect').multiselect('destroy');
                $('.agenBrokerSelect').find('option').remove();  
                var option = response.brok_option;
                $('.agenBrokerSelect').append(option);
            },
            complete: function() {
                $('.agenBrokerSelect').multiselect({
                    includeSelectAllOption : true,
                    maxHeight: 100,
                    nonSelectedText: 'Please Select'
                });
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function save_update_agency(data, com_data, com_visible) {
    try {
        var data = data;
        $.ajax({
            url: laravel_url+"/save_update_agency",
            type: 'post',
            async: false,
            data: data,
            success:function(response){
                if(response.status == 1) {
                    agent_id = response.rid;
                    $('.agency_rid').val(agent_id);
                    
                }
                if (response.status == 1 || response.status == 2)
                    if (com_visible == 1) {
                        if (response.status == 2){
                            agent_id = data.rid;
                        }
                        com_data.agent_id = agent_id;
                        save_update_commission(com_data);
                    }
                    if (data.program == 0) {
                        $('.program_checkbox').attr('style','display:none');
                        var user_role = localStorage.getItem('userroles');
                        if(user_role == 2){
                            $('.percn_input').attr('readonly',true);
                            $('.percn_input').addClass('not_clickable');
                            $('.commission_datepicker').addClass('not_clickable');
                        }else{
                            $('.percn_input').removeAttr('readonly');
                            $('.percn_input').removeClass('not_clickable');
                            $('.commission_datepicker').removeClass('not_clickable');
                        }
                    }
                    new PNotify({ title: 'Success', text: 'Saved Sucessfully' , delay: 1500, type: 'success' });
            },
            complete: function() {
                $('.close_add_agency_btn').trigger('click');
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

$(document).on('click', '.add_brokers', function () {
    $('.broker_title').html("ADD NEW BROKER");
    $('.new_brok_modal').click();
    var user_role = localStorage.getItem('userroles');
    if (user_role == 2) {
        $('.brok_eff_date').datepicker('remove');
        $('.brok_eff_date').datepicker({
            startDate : 'd',
            todayHighlight: true
        });
    }
    if (user_role == 1) {
        $('.brok_eff_date').datepicker('remove');
        $('.brok_eff_date').datepicker({
            todayHighlight: true
        });
    }
});

$(document).on('focusout', '.agencyName', function () {
    data = {};
    var agency = $(this).val()
    var agent_id = $('.agent_rid').val();
    if (agent_id != ''){
        data.rid = agent_id;
    }
    if (agency.trim() != '') {
        agency_name = agency.replace(/[-_@&#\s]/g, '');
        data.agency_name = agency_name;
        $.ajax({
            url: laravel_url+"/duplicate_agency_check",
            type: 'post',
            data: data,
            success:function(response){
                if(response.isexist > 0) {
                    new PNotify({ title: 'Error', text: 'Agency Name already exist' , delay: 1500, type: 'error' });
                }
            }
        });
    }
});

function list_underwriter(type) {
    try {
        $.ajax({
            url: laravel_url+"/list_underwriter",
            type:'post',
            success:function(response) {
                if (type == 1) {
                    $('.addnew_brok_underwriter').html(response.option);
                } else {
                    $('.edit_brok_underwriter').html(response.option);
                }
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

$(document).on('click', '.save_new_brok', function () {
    data = {};
    var broker_id = $('.broker_rid').val();
    if (broker_id != '') {
        data.id = broker_id;
        var brok_name = $('.edit_brok_name').val();
        var brok_email = $('.edit_brok_email').val();
        if (brok_email.trim() != '') {
            var broker_email_valid = email_validation (brok_email, error_msg_class = 'brok_invalid_email_edit', email_txtbx_class = 'edit_brok_email');
        }
        var brok_underwriter = $('.edit_brok_underwriter').val();
        var effdate = $('.edit_brok_eff_date').val();
        var date_split = effdate.split('-');
        var  brok_effdate = date_split[2] + '-' + date_split[0] + '-' + date_split[1];
        var broker_status = $(".broker_status").val();
        var selected_brok = [];
        if (broker_status == 1) {
            data.updated_by = localStorage.getItem('usernumericid');
        } else {
            data.deleted_by = localStorage.getItem('usernumericid');
        }
    } else {
        var brok_name = $('.addnew_brok_name').val();
        var brok_email = $('.addnew_brok_email').val();
        if (brok_email.trim() != '') {
            var broker_email_valid = email_validation (brok_email, error_msg_class = 'adnew_brok_invalid_email', email_txtbx_class = 'addnew_brok_email');
        }
        var brok_underwriter = $('.addnew_brok_underwriter').val();
        var effdate = $('.brok_eff_date').val();
        var date_split = effdate.split('-');
        var  brok_effdate = date_split[2] + '-' + date_split[0] + '-' + date_split[1];
        var selected_brok = [];
        selected_brok = $("#agenBrokerSelect").val();
        var broker_status = 1;
        data.created_by = localStorage.getItem('usernumericid');
    }
    

    if (brok_name.trim() != '' && brok_email.trim() != '' && broker_email_valid == true && brok_effdate != '' && broker_status != '') {
        data.brokername = brok_name;
        data.brokeremail = brok_email;
        data.underwriter_id = brok_underwriter;
        data.effective_date = brok_effdate;
        data.status = broker_status;

        save_broker(data, selected_brok);
        
    } else {
        if (broker_id != '') {
            if (brok_name.trim() == '') {
                $('.edit_brok_name').addClass('redBorder');
            }else{
                $('.edit_brok_name').removeClass('redBorder');
            }
    
            if (brok_email.trim() == '') {
                $('.edit_brok_email').addClass('redBorder');
            } else {
                email_validation (brok_email, error_msg_class = 'brok_invalid_email_edit', email_txtbx_class = 'edit_brok_email');
            }
    
            // if (brok_underwriter == '') {
            //     $('.edit_brok_underwriter').addClass('redBorder');
            // }else{
            //     $('.edit_brok_underwriter').removeClass('redBorder');
            // }
    
            if (brok_effdate == '') {
                $('.edit_brok_eff_date').addClass('redBorder');
            }else{
                $('.edit_brok_eff_date').removeClass('redBorder');
            }
    
            if (broker_status == '') {
                $('.broker_status').addClass('redBorder');
            }else{
                $('.broker_status').removeClass('redBorder');
            }
        } else{
            if (brok_name.trim() == '') {
                $('.addnew_brok_name').addClass('redBorder');
            }else{
                $('.addnew_brok_name').removeClass('redBorder');
            }
    
            if (brok_email.trim() == '') {
                $('.addnew_brok_email').addClass('redBorder');
            } else {
                email_validation (brok_email, error_msg_class = 'adnew_brok_invalid_email', email_txtbx_class = 'addnew_brok_email');
            }
    
            // if (brok_underwriter == '') {
            //     $('.addnew_brok_underwriter').addClass('redBorder');
            // }else{
            //     $('.addnew_brok_underwriter').removeClass('redBorder');
            // }
    
            if (brok_effdate == '') {
                $('.brok_eff_date').addClass('redBorder');
            }else{
                $('.brok_eff_date').removeClass('redBorder');
            }
    
            if (broker_status == '') {
                $('.broker_status').addClass('redBorder');
            }else{
                $('.broker_status').removeClass('redBorder');
            }
        }
        
    }
    
});

$(document).on('focusout', '.addnew_brok_name, .addnew_brok_email, .edit_brok_email, .brok_eff_date, .agencyName, .agencyCode, .agencyZip, .agencyCity, #agencyAddr, #agenBrokerSelect', function() {
    var check_val = $(this).val();
    if ($(this).hasClass('agenBrokerSelect')) {
        if (check_val == '') {
            $('.agenBrokerSelect_div .btn-group .multiselect').addClass('redBorder');
        } else {
            $('.agenBrokerSelect_div .btn-group .multiselect').removeClass('redBorder');
        }
    }else{
        if (check_val.trim() == '') {
            $(this).addClass('redBorder');
        }else{
            $(this).removeClass('redBorder');
        }
    }
    if ($(this).hasClass('addnew_brok_email')) {
        email_validation (check_val, error_msg_class = 'adnew_brok_invalid_email', email_txtbx_class = 'addnew_brok_email');
    }    
    if ($(this).hasClass('edit_brok_email')) {
        email_validation (check_val, error_msg_class = 'brok_invalid_email_edit', email_txtbx_class = 'edit_brok_email');
    }
});

$(document).on('click', '.cancel_new_brok' , function() {
    var brok_rid = $('.broker_rid').val();
    if(brok_rid == ''){
        $('.add_broker_close').trigger('click');
    }else{
        get_broker_details(brok_rid);
    }
});


$(document).on('click', '.add_broker_close' , function() {
    reset_broker_fields(1);
});

$(document).on('click', '.edit_broker_close' , function() {
    $('.add_new_agency_section').show();
    $('.edit_broker_div').hide();
    reset_broker_fields(2);
});

function reset_broker_fields(type) {
    $('.broker_rid').val('');
    if(type == 1){
        $('.addnew_brok_name').val('');
        $('.addnew_brok_email').val('');
        $('.addnew_brok_underwriter').val('');
        $('.brok_eff_date').datepicker('setDate', new Date());
    
        $('.addnew_brok_name').removeClass('redBorder');
        $('.addnew_brok_email').removeClass('redBorder');
        //$('.addnew_brok_underwriter').removeClass('redBorder');
        $('.brok_eff_date').removeClass('redBorder');

        $('.brok_eff_date').datepicker('remove');
        $('.brok_eff_date').datepicker({
            startDate: 'd',
            todayHighlight: true
        });
    }else{
        $('.edit_brok_name').val('');
        $('.edit_brok_email').val('');
        $('.edit_brok_underwriter').val('');
        $('.edit_brok_eff_date').datepicker('remove');
        $('.edit_brok_eff_date').datepicker({
            startDate: 'd',
            todayHighlight: true
        });
    
        $('.edit_brok_name').removeClass('redBorder');
        $('.edit_brok_email').removeClass('redBorder');
        // $('.edit_brok_underwriter').removeClass('redBorder');
        $('.edit_brok_eff_date').removeClass('redBorder');
        $('.broker_status').removeClass('redBorder');
    }
    if($('#invalid_broker_msg').css('display') == 'block')
        $('#invalid_broker_msg').css('display','none');
    $('.broker_status').val('1');
}

function save_broker(brok_data, selected_brok) {
    $.ajax({
        url: laravel_url+"/save_broker",
        type: 'post',
        async: false,
        data: brok_data,
        success:function(response){
            new_brok_id = response.new_brok_id;
            action = response.status;
            if (action == 1){
                var agency_rid = $('.agency_rid').val();
                list_brokers(agency_rid);
            }
        },
        complete: function() {
            if (action == 1){
                if (selected_brok != null) {
                    for (i = 0; i < selected_brok.length; i++) {
                        $(".agenBrokerSelect").multiselect('select',selected_brok[i]);
                    }
                }
                $(".agenBrokerSelect").multiselect('select',new_brok_id);
                $(".agenBrokerSelect").multiselect("refresh");
                $('.add_broker_close').trigger('click');
            } else {
                $('.edit_broker_close').trigger('click');
                get_all_brokers(true);
            }
            
        }
    });
}

function reset_agency_fields() {
    $('.agency_rid').val('');
    $('.commission_rid').val('');
    $('.agencyName').val('');
    $('.agencyCode').val('');
    $('.agencyZip').val('');
    $('.agencyCity').html("<option value=''>City</option>");
    $('.agencyState').val('');
    $('#agencyAddr').val('');
    $("#agenBrokerSelect").val('');
    $(".agenBrokerSelect").multiselect("refresh");
    $('#programCkbx').prop('checked',false);
    $('.agent_status_div').hide();
    $('.agentStatus').val(1);
    $('.hist_div').hide();
    $('.percn_input').val('17.5');
    $('.commission_div').attr('style','display : block');
}

$(document).on('click', '.edit_agency', function () {
    var agency_id = $(this).data('rid');
    $('.agent_status_div').show();
    get_agency_details(agency_id);
    list_brokers(agency_id);
    list_underwriter(1);
    $(".datepicker").datepicker("setDate", new Date());
    var user_role = localStorage.getItem('userroles');
    if(user_role == 2){
        $('.percn_input').attr('readonly',true);
        $('.percn_input').addClass('not_clickable');
        $('.commission_datepicker').addClass('not_clickable');
    }else{
        $('.percn_input').removeAttr('readonly');
        $('.percn_input').removeClass('not_clickable');
        $('.commission_datepicker').removeClass('not_clickable');
    }
    var update_agency_visibility = $('.update_agency').css('display');
    var save_agency_visibility = $('.save_agency').css('display');
    if (update_agency_visibility == 'none'){
        $('.update_agency').css('display','initial');
    }
    if (save_agency_visibility == 'inline-block'){
        $('.save_agency').css('display','none');
    }
});

function get_agency_details(agency_id) {
    try {
        $.ajax({
            url: laravel_url+"/get_agency_details",
            type:'post',
            data : {'rid' : agency_id},
            success:function(response) {
                $('.agent_title').html('Edit Agency');
                city = '';
                if (response.agent_details != null) {
                    agent = response.agent_details;
                    $('.agency_rid').val(agency_id);
                    $('.agencyName').val(agent['agent_name']);
                    $('.agencyCode').val(agent['agent_code']);
                    $('.agencyZip').val(agent['agent_zip']).trigger('focusout');
                    city = agent['agent_city'];
                    $('#agencyAddr').val(agent['agent_address']);
                    var selected_brok = agent['brokers'].split(",");
                    for (i = 0; i < selected_brok.length; i++) {
                        $(".agenBrokerSelect").multiselect('select',selected_brok[i]);
                    }
                    $(".agenBrokerSelect").multiselect("refresh");
                    if (agent['program'] == 0) {
                        $('.program_checkbox').attr('style','display:none');
                        var user_role = localStorage.getItem('userroles');
                        if(user_role == 2){
                            $('.percn_input').attr('readonly',true);
                            $('.percn_input').addClass('not_clickable');
                            $('.commission_datepicker').addClass('not_clickable');
                        }else{
                            $('.percn_input').removeAttr('readonly');
                            $('.percn_input').removeClass('not_clickable');
                            $('.commission_datepicker').removeClass('not_clickable');
                        }
                        get_commission_details(agency_id);
                    } else {
                        $("#programCkbx").prop('checked', true);
                        $('.commission_div').attr('style','display : none');

                        $('.percn_input').removeAttr('readonly');
                        $('.percn_input').removeClass('not_clickable');
                        $('.commission_datepicker').removeClass('not_clickable');
                    }
                    $('.agentStatus').val(agent['is_active']).prop('selected',true);
                }
            },
            complete : function() {
                setTimeout(function(){ 
                    $('.agencyCity').val(city).prop('selected',true);
                }, 500);
                $('.add_new_agency_section').hide();
                $('.addAgencySec').show();
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

$(document).on('click', '#programCkbx', function () {
    var check_status = $(this).prop('checked');
    if (check_status == true) {
        $('.commission_div').attr('style','display : none');
    }else{
        $('.commission_div').removeAttr('style'); 
    }
});

$(document).on('click', '.agencyBrokTab', function() {
    $('.agencyBrokTab').removeClass('active');
    get_all_brokers(false);
    $(this).addClass('active');
});

function save_update_commission(data) {
    try {
        $.ajax({
            url: laravel_url+"/save_update_commission",
            type: 'post',
            data: data,
            success:function(response){
                if(response.status == 1) {
                    $('.commission_rid').val(response.rid);
                }
            },
            complete: function() {
                
            }
        });
        
    }
    catch(err) {
		console.log(err);
		
	}
}

function get_commission_details(agency_id) {
    try {
        $.ajax({
            url: laravel_url+"/get_commission_details",
            type:'post',
            data : {'agent_id' : agency_id},
            success:function(response) {
                var commission_details = response.commission_details;
                if(commission_details != null){
                    $('.commission_rid').val(commission_details.rid);
                    $('.gl_percentage').val(commission_details.gl_percentage);
                    var gl_effdate = commission_details.gl_effective_date;
                    var gl_date_split = gl_effdate.split('-');
                    var  gl_eff_date = gl_date_split[1] + '-' + gl_date_split[2] + '-' + gl_date_split[0];
                    $('.gl_eff_date').val(gl_eff_date);
                    $('.xl_percentage').val(commission_details.xl_percentage);
                    var xl_effdate = commission_details.xl_effective_date;
                    var xl_date_split = xl_effdate.split('-');
                    var  xl_eff_date = xl_date_split[1] + '-' + xl_date_split[2] + '-' + xl_date_split[0];
                    $('.xl_eff_date').val(xl_eff_date);
                    $('.ocp_percentage').val(commission_details.ocp_percentage);
                    var ocp_effdate = commission_details.ocp_effective_date;
                    var ocp_date_split = ocp_effdate.split('-');
                    var  ocp_eff_date = ocp_date_split[1] + '-' + ocp_date_split[2] + '-' + ocp_date_split[0];
                    $('.ocp_eff_date').val(ocp_eff_date);
                }
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function get_all_brokers(broker_stay_value) {
    try {
        if($('#broker_table').DataTable()){
            $('#broker_table').DataTable().destroy();
        }
        $.ajax({
            url: laravel_url+"/get_all_brokers",
            type: 'post',
            success:function(response){
                $('.brokers_tbody').html(response.broker_tbody);
                $('#broker_table').DataTable({
                    "responsive": true,
                    "pageLength": 10,
                    "autoWidth": false,
                    "destroy": true,
                    "searching": true,
                    "stateSave": broker_stay_value,
                    "language": { search: "" },
                    "columnDefs": [
                    { "width": "22%", "targets": 0 },
                    { "width": "10%", "targets": 1 },
                    { "width": "20%", "targets": 2 },
                    { "width": "11%", "targets": 3 },
                    { "width": "5%", "targets": 4 },
                    { "width": "5%", "targets": 5 }
                    ]
                });
            }
        });
        
    }
    catch(err) {
        console.log(err);   
    }
}

$(document).on('click', '.edit_broker', function() {
    var brok_id = $(this).attr('data-rid');
    $('.inactive_date_div').hide();
    $('#').html('brok_inactive_date');
    get_broker_details(brok_id);
    list_underwriter(2);
});

function get_broker_details(brok_id) {
    try {
        $.ajax({
            url: laravel_url+"/get_broker_details",
            type: 'post',
            async: false,
            data :{rid : brok_id},
            success:function(response){
                if(response.broker_details != null){
                    var brok = response.broker_details;
                    $('.broker_rid').val(brok_id);
                    $('.edit_brok_name').val(brok['brokername']);
                    $('.edit_brok_email').val(brok['brokeremail']);
                    setTimeout(function(){ 
                        var opt_length =$(".edit_brok_underwriter option[value='"+brok['underwriter_id']+"']").length;
                        if (opt_length > 0) {
                            $('.edit_brok_underwriter').val(brok['underwriter_id']);
                        } else {
                            $('.edit_brok_underwriter').val('');
                        }
                    }, 500);
                    
                    var eff_date = brok['effective_date'];
                    var eff_date_split = eff_date.split('-');
                    var brok_eff_date  = eff_date_split[1] + '-' + eff_date_split[2] + '-' + eff_date_split[0];
                    var user_role = localStorage.getItem('userroles');
                    if (user_role == 2) {
                        $('.edit_brok_eff_date').datepicker('remove');
                        $('.edit_brok_eff_date').datepicker({
                            startDate : new Date(brok_eff_date)
                        });
                    }
                    if (user_role == 1) {
                        $('.edit_brok_eff_date').datepicker('remove');
                        $('.edit_brok_eff_date').datepicker({
                            todayHighlight: true
                        });
                    }
                    
                    $('.edit_brok_eff_date').val(brok_eff_date);
                    $('.broker_status').val(brok['status']);
                    if (brok['status'] == 0){
                        $('.inactive_date_div').show();
                        $('.brok_inactive_date').html();
                        if(brok['deleted_on'] != null && brok['deleted_on'] != '0000-00-00 00:00:00') {
                            var inactive_time_split = brok['deleted_on'].split(' ');
                            var date_split = inactive_time_split[0].split('-');
                            var inactive_date  = date_split[1] + '-' + date_split[2] + '-' + date_split[0];
                        } else {
                            var inactive_date = '';
                        }
                        $('#brok_inactive_date').html(inactive_date);
                    }
                }
            },
            complete: function() {
                $('.add_new_agency_section').hide();
                $('.edit_broker_div').show();
            }
        });
        
    }
    catch(err) {
		console.log(err);
		
	}
}

$(document).on('focusout', '.addnew_brok_email, .edit_brok_email', function() {
    data = {};
    var brokeremail = $(this).val();
    var event = this;
    data.brokeremail = brokeremail;
    var broker_id = $('.broker_rid').val();
    if (broker_id != ''){
        data.id = broker_id;
    }
    if(brokeremail.trim() != ''){
        $.ajax({
            url: laravel_url+"/duplicate_brokermail_check",
            type: 'post',
            data: data,
            success:function(response){
                if(response.isexist == 1) {
                    $(event).val('');
                    $(event).next().css('display','block');
                } else{
                    $(event).next().css('display','none');
                }
            }
        });
    }
});

$(document).on('keypress', '.gl_percentage, .xl_percentage, .ocp_percentage', function(e) {
    check_decimalNum(e);
});

function check_decimalNum(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 
    && (charCode < 48 || charCode > 57))
        evt.preventDefault();

    return true;
}

$(document).on('focusout', '.percn_input', function(e) {
    var percent_val = $(this).val();
    if(percent_val > 100){
        $(this).val('');
        $(this).addClass('redBorder');
        new PNotify({ title: 'Error', text: 'Invalid value' , delay: 1500, type: 'error' });
    }else{
        $(this).removeClass('redBorder');
    }
});

