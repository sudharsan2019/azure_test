var policy_status;
var majesco_transaction_id;
var term_status;
var global_limit_slider = 1221;
var global_deduct_slider = 0;
var class_code_length = 0;
var cc_global, mjq = 0;
var sub_switch_status = "submission";
var http = window.location.href
var base_url = http
var qq_today = mm + '-' + dd + '-' + yyyy;

$('#Qaddsubmission_form').bootstrapValidator({
    //        live: 'disabled',
    message: 'This value is nsaveot valid',
    feedbackIcons: {
        validating: 'glyphicon glyphicon-refresh'
    },

    fields: {

        Qclass_code_submission: {
            validators: {
                notEmpty: {
                    message: 'Please Enter Class Code'
                },
                regexp: {
                    regexp: /^[0-9a-zA-Z-\s]*$/,
                    message: 'Class Code should be Number and Character only'
                }
            }
        },

        Qzip_code_submission: {
            validators: {
                notEmpty: {
                    message: 'Please Enter Zip Code'
                },
                digits: {
                    message: 'Zip Code should be in numbers only'
                },
                stringLength: {
                    min: 1,
                    max: 5,
                    message: 'Max length 5'
                }
            }
        },

        Qexposure_amount: {
            validators: {
                notEmpty: {
                    message: 'Exposure Amount Cannot be blank'
                },
                regexp: {
                    regexp: /^[0-9k,m$,-\s]*$/,
                    message: 'Amount format is 1k or 1m'
                },
                stringLength: {
                    min: 1,
                    max: 9,
                    message: ' Please fill Maximum 100000000'
                },
            }
        },
    }
});

function iso_pricing_addr_validation () {
    $(".Qclass_code_submission").each( function() {
            var value = $(this).val();
            if (value == "" || value == 0) {
                $(this).addClass('redBorder');
            }else{
                $(this).removeClass('redBorder');
            }
        });            

        $(".Qzip_code_submission").each( function() {
            var value = $(this).val();
            if (value == "" || value == 0) {
                $(this).addClass('redBorder');
            }else{
                $(this).removeClass('redBorder');
            }
        });            

        $(".subLocAdd").each( function() {
            var value = $(this).val();
            if (value == "" || value == 0) {
                $(this).addClass('redBorder');
            }else{
                $(this).removeClass('redBorder');
            }
        });            

        $(".subExpos").each( function() {
            var value = $(this).val();
            if (value == "" || value == 0) {
                $(this).addClass('redBorder');
            }else{
                $(this).removeClass('redBorder');
            }
        });
}

$('#Qaddsubmission_form').bootstrapValidator();

var inc = 1;
$(document).on('click', '.add_more', function () {

    var checkk = true;
    $(".exposure_row").each(function () {
        exposuree = $(this).find(".Qexposure_amount").val();
        exposuree = exposuree.replace(/([,.$])+/g, '');
        SIC_business_classs = $(this).find(".Qclass_code_submission").val();
        zip_codee = $(this).find(".Qzip_code_submission").val();
        locatt = $(this).find(".loc_add").val();
    });

    $("input").removeClass("highlight");
    $(".get_code").prop('disabled', false);
    var textArr = $("input[type=text][id^=Qclass_code_submission]").get();
    var textArr1 = $("input[type=text][id^=Qzip_code_submission]").get();
    var textArr2 = $("input[type=text][id^=loc_add]").get();

    var len = textArr.length;
    var inner = 0,
        outer = 0,
        index = 0,
        dupLen = 0;
    var dupArr = new Array();
    var dupArr1 = new Array();
    var dupArr2 = new Array();

    for (outer = 0; outer < len; outer++) {
        for (inner = outer + 1; inner < len; inner++) {
            if (textArr[outer].value.substring(0, 6).trim() == textArr[inner].value.substring(0, 6).trim()) { /*Naics update*/
                if (textArr1[outer].value == textArr1[inner].value) {
                    if (textArr2[outer].value.toLowerCase() == textArr2[inner].value.toLowerCase()) {
                        if (jQuery.inArray(textArr[outer].value.substring(0, 6).trim(), dupArr) == -1 || jQuery.inArray(textArr1[outer], dupArr1) == -1 || jQuery.inArray(textArr2[outer].toLowerCase(), dupArr2) == -1) { /*Naics update*/
                            dupArr.push(textArr[outer]);
                            dupArr1.push(textArr1[outer]);
                            dupArr2.push(textArr2[outer]);

                        }
                        if (jQuery.inArray(textArr[inner].value.substring(0, 6).trim(), dupArr) == -1 || jQuery.inArray(textArr1[inner], dupArr1) == -1 || jQuery.inArray(textArr2[inner].toLowerCase(), dupArr2) == -1) { /*Naics update*/
                            dupArr.push(textArr[inner]);
                            dupArr1.push(textArr1[inner]);
                            dupArr2.push(textArr2[inner]);

                        }
                        dis_val = 1;
                    } else {
                        dis_val = 1;
                    }
                } else {
                    dis_val = 1;
                }
            } else {
                dis_val = 1;
            }
        }
    }

    if (dupArr.length == 0 && dupArr1.length == 0 && dupArr2.length == 0) {
        dis_val = 0;
    } else {
        for (p = 1; p < dupArr.length; p++) {
            $("#" + dupArr[p].id).addClass("highlight");
            $("#" + dupArr1[p].id).addClass("highlight");
            $("#" + dupArr2[p].id).addClass("highlight");
        }
        dis_val = 1;
        $(".get_code").prop('disabled', true);
    }


    if (zip_codee == '' || SIC_business_classs == '' || exposuree == '' || locatt == '' || $('.Qzip_code_submission ').hasClass('errorBorder')) {
        checkk = false;
    }

    if (checkk == false) {
        iso_pricing_addr_validation();
        new PNotify({
            title: 'Error',
            text: 'Please fill mandatory fields',
            delay: 2000,
            type: 'error'
        });
        return false;

    } else {
        if (dis_val == 0) {
            inc_rowid = $('[data-location_id]').length + 1;
            $(".get_code").prop('disabled', false);
            $("input").removeClass("highlight");
            var unique_id = Math.floor((new Date()).getTime() / 1000);

            $('.Qcopy').append('<div class="remove_div_more"  id="Qqcov_clsCd_row'+inc+'"><div class="form-row exposure_row qqexprow" data-unique_id=' + unique_id + '><div class="col-3 qqrowid" data-location_id="' + inc_rowid + '"><div class="form-group add_more_details_mb"> <input type="text" class="classcode_tbox form-control Qclass_code_submission subClassCode" name="Qclass_code_submission" id="Qclass_code_submission' + inc + '" data-ptype="qq" data-qclassid="' + inc + '"  placeholder="Enter Classcode"></div><small class="text-muted appendText class_ctext" id="ctext' + inc + '" data-qctext="' + inc + '"></small><small class="text_color appendText class_isotext" id="isotext' + inc + '" data-qisotext="' + inc + '"></small><p class="pt-1 text-left pull-left text-danger width100_perc font80_perc iso_qq_cc_invalid_msg" id="iso_qq_cc_invalid_msg_'+inc+'" style="display: none;">Invalid Class Code</p> <div><input type="hidden" class="Qqclass_code_coverage" name="Qqclass_code_coverage[]" id="Qqclass_code_coverage' + inc + '" data-rowid="'+inc+'"></div></div><div class="col-2"><div class="form-group"><div class="input-group"><input type="text" class="zipcode_tbox form-control subZipCode Qzip_code_submission" data-qzipid="' + inc + '" name="Qzip_code_submission" id="Qzip_code_submission' + inc + '" placeholder="Enter Zip" maxlength="5"></div><span id="quickQuote_zip_err_msg' + inc + '" class="text-danger quickQuote_zip_err_msg" style="display:none;">Invalid</span><small class="text-muted city_label" id="ziptext' + inc + '" data-qziptext="' + inc + '"></small></div></div><div class="col-2"> <div class="form-group"><div class="qqcityname" id="city_name_td' + inc + '"></div><select class="form-control city city_name_hide" id="city" name="city"><option value="City1"></option></select></div></div><div class="col-2"><div class="form-group"><div class="input-group"><input type="text" class="form-control Qexposure_amount prem_money subExpos arate_exp" id="Qexposure_amount' + inc + '" name="Qexposure_amount" maxlength="9" placeholder="Enter Exposure"></div><small class="text-muted premium_base" id="pbtext' + inc + '" data-qpbtext="' + inc + '"></small> <br /></div></div><div class="col-1 qqBtns"><div class="form-group"> <button type="button" class="btn btn-primary btn-xs add_more_btn add_more" name="Qsub" id="add_more_btn' + inc + '"> <i class="fa fa-plus" aria-hidden="true"></i></button> <button type="button" class="btn btn-xs btn-warning subCloneBtn" data-toggle="tooltip" data-placement="top" title="Clone"> <i class="fa fa-copy"></i> </button> <button type="button" class="btn btn-danger btn-xs remove_more_btn" data-html="true"> <i class="fa fa-remove" aria-hidden="true"></i></button><button type="button" class="btn btn-danger btn-xs remove_more_btn1" title="Remove" name="Qsub1" style="display:none"> <i class="fa fa-remove" aria-hidden="true"></i></button> </div></div></div></div></div>');
            inc++;
        } else {
            new PNotify({
                title: 'Error',
                text: 'Duplicate value is exists',
                delay: 2000,
                type: 'error'
            });
            return false;
        }

    }
    $('[data-toggle="tooltip"]').tooltip();

    if (inc >= 10) {
        $('.add_more_btn').hide();
    } else {
        $('.add_more_btn').show();
    }
});


// $(document).on('keyup','',function(){
//     id_inputcc = $(this).attr('id');
//     var awecomp = $("#"+id_inputcc).val();
//     class_awesome(id_inputcc,awecomp);
// });

// function class_awesome (awecomp, rowid) {
//         previousclasscode_input = (document.getElementById('cbClasscode_'+rowid));
//         previousclasscode_global1 = ["1001 - Ada"];
//         if(jQuery.isEmptyObject(awesomplete_classcode[rowid])){
//             awesomplete_classcode[rowid] = new Awesomplete(previousclasscode_input, {
//                 list: previousclasscode_global1,
//                 minChars: 1,
//                 maxItems: 500,
//                 autoFirst: false
//             });
//         }

//         var coverage_type_array = [];
//     $("input[name='isoCoverageType']:checked").each(function(){
//         var value = $(this).val();
//         coverage_type_array.push(value);
//     });

//     var coverage_class = coverage_type_array.toString();

//     $("input").removeClass("highlight");
//     $(".get_code").prop('disabled',false);
//     $(".get_code_account").prop('disabled',false);
//     cc = $(this).val();
//     cid = $(this).attr('data-qclassid');
//     var qctext = $('#ctext'+cid).attr('data-qctext');
//     var qisotext = $('#isotext'+cid).attr('data-qisotext');
//     var qpbtext = $('#pbtext'+cid).attr('data-qpbtext');
//     cc = cc.substring(0, 5);
//     if(cc.length == 5){
//          $.ajax({
//             url: 'get_class_description_v5.php',
//             method: 'GET',
//             data:{
//                 'class_code': cc,
//                 'coverage': coverage_class
//             },
//             dataType: 'JSON',
//             success: function(res){
//                 var check_num=res[0]['rid'];
//                 if(check_num!=0) {
//                     $('#ctext'+qctext).text(res[0]['classname']);
//                     //$('#isotext'+qisotext).text(res.ISO_RATE);
//                     $('#pbtext'+qpbtext).text("PremBase: "+res[0]['premium_base1']);
//                     $('#Qclass_code_coverage'+cid).val(res[0]['class_code_type1']);
//                     $('#Qqclass_code_coverage'+cid).val(res[0]['class_code_type1']);
//                 } else {
//                     $('#Qclass_code_submission'+cid).val('');
//                     $('#Qclass_code_coverage'+cid).val('');
//                     $('#Qqclass_code_coverage'+cid).val('');
//                     $('#ctext'+qctext).text('');
//                     $('#isotext'+qisotext).text('');
//                     $('#pbtext'+qpbtext).text('');
//                     new PNotify({ title: 'Error', text: 'Class code is incorrect. Please enter correct code', delay: 2000, type: 'error' });  
//                     return false;
//                 }
//             }
//         })
//     }
// }


$(document).on('blur', '.Qclass_code_submission', function (e) {
    e.preventDefault();

    var cur_ccode = $(this).val();
    var qclassid = $(this).attr('data-qclassid');
    var page_type = $(this).attr('data-ptype');

    if(cur_ccode!= '') {
        $(this).removeClass('redBorder');
    } 

    var coverage_type_array = [];

    if (page_type == 'iso') {
        $("input[name='isoCoverageType']:checked").each(function () {
            var value = $(this).val();
            coverage_type_array.push(value);
        });
    } else {
        $("input[name='qqCoverageType']:checked").each(function () {
            var value = $(this).val();
            coverage_type_array.push(value);
        });
    }

    var coverage_class = coverage_type_array.toString();

    cur_ccode = cur_ccode.substring(0, 6).trim();/*Naics update*/
    if (coverage_class != "") {
        if (cur_ccode.length >= 5) {
            $.ajax({
                url: 'get_class_description_v5.php',
                method: 'POST',
                data: {
                    'class_code': cur_ccode,
                    'coverage': coverage_class
                },
                dataType: 'JSON',
                success: function(res){
                    if(res.length > 0) {
                        $('#isotext'+qclassid).show();
                        $('#Qclass_code_submission'+qclassid).val(cur_ccode);
                        $('#ctext'+qclassid).show().text('').text(res[0]['classname']);
                        $('#pbtext'+qclassid).show().text("PremBase: "+res[0]['premium_base1']);
                        $('#Qclass_code_coverage'+qclassid).val(res[0]['class_code_type1']);
                        $('#Qqclass_code_coverage'+qclassid).val(res[0]['class_code_type1']);
                        $('#Qclass_code_coverage'+qclassid).attr('data-rowid',qclassid);
                        $('#Qqclass_code_coverage'+qclassid).attr('data-rowid',qclassid);
                        $('#iso_qq_cc_invalid_msg_'+qclassid).removeAttr('style').hide();
                    } else {
                        // $('#Qclass_code_coverage'+qclassid).val('');
                        // $('#Qqclass_code_coverage'+qclassid).val('');
                        $('#ctext' + qclassid).text('');
                        $('#isotext' + qclassid).text('');
                        $('#pbtext' + qclassid).text('');
                        new PNotify({
                            title: 'Error',
                            text: 'Class code is incorrect. Please enter correct code',
                            delay: 2000,
                            type: 'error'
                        });
                        $('#Qclass_code_submission'+qclassid).val('');
                        $('#Qzip_code_submission'+qclassid).val('');
                        $('#city_name_td'+qclassid).html('<select class="form-control city cityVisible" name="city"><option value="">Please Select</option></select>');
                        return false;
                    }
                }
            });

        } else {
            if ($('.Qclass_code_submission').val() != '') {
                setTimeout(function(){ 
                    if ($('.Qclass_code_submission').is(':focus')) {
                        $('#iso_qq_cc_invalid_msg_'+qclassid).removeAttr('style').hide();
                    } else {
                        $('#iso_qq_cc_invalid_msg_'+qclassid).removeAttr('style').show();
                        $('#Qclass_code_submission'+qclassid).val('');
                    }
                },50);
            }
        }
    } else {

        new PNotify({
            title: 'Error',
            text: 'Coverages Required',
            delay: 2000,
            type: 'error'
        });

    }
});

var awesomplete_classcode = {};
$(document).on('keyup', '.Qclass_code_submission', function () {
    var clcode = $(this).val();
    var qclassid = $(this).attr('data-qclassid');
    class_awesome(clcode, qclassid);
    $(this).focus();
});

function class_awesome(clcode, qclassid) {
    classcode_input = (document.getElementById('Qclass_code_submission' + qclassid));
    classcode_global1 = ["1001 - Ada"];
    if (jQuery.isEmptyObject(awesomplete_classcode[qclassid])) {
        awesomplete_classcode[qclassid] = new Awesomplete(classcode_input, {
            list: classcode_global1,
            minChars: 1,
            maxItems: 500,
            autoFirst: true
        });
    }

    var class_code = $('#Qclass_code_submission' + qclassid).val();
    var page_type = $('#Qclass_code_submission' + qclassid).attr('data-ptype');

    var coverage_type_array = [];

    if (page_type == 'iso') {
        $("input[name='isoCoverageType']:checked").each(function () {
            var value = $(this).val();
            coverage_type_array.push(value);
        });
    } else {
        $("input[name='qqCoverageType']:checked").each(function () {
            var value = $(this).val();
            coverage_type_array.push(value);
        });
    }
    var coverage_class = coverage_type_array.toString();

    $("input").removeClass("highlight");
    $(".get_code").prop('disabled', false);
    $(".get_code_account").prop('disabled', false);
    var qctext = $('#ctext' + qclassid).attr('data-qctext');
    var qisotext = $('#isotext' + qclassid).attr('data-qisotext');
    var qpbtext = $('#pbtext' + qclassid).attr('data-qpbtext');

    $('#ctext' + qctext).hide();
    $('#isotext' + qisotext).hide();
    $('#pbtext' + qpbtext).hide();

    cc = class_code.substring(0, 6).trim();/*Naics update*/
    if (cc.length >= 1) {
        $.ajax({
            url: 'get_class_description_v5.php',
            method: 'GET',
            data: {
                'class_code': class_code,
                'coverage': coverage_class
            },
            dataType: 'JSON',
            success: function (res) {
                var check_num = res[0]['rid'];
                if (check_num != 0) {
                    suggestionList = res;
                    finalSuggestArray = [];
                    $.each(suggestionList, function (index, value) {

                        finalSuggestArray[index] = [
                            [value.classcode_gl + ' - ' + value.classname],
                            [value.classcode_gl + ' - ' + value.classname]
                        ];
                    });

                    hasoption = 1;
                    awesomplete_classcode[qclassid].list = finalSuggestArray;
                } else {
                    $('#Qclass_code_submission' + qclassid).val('');
                    $('#Qclass_code_coverage' + qclassid).val('');
                    $('#Qqclass_code_coverage' + qclassid).val('');
                    $('#ctext' + qctext).text('');
                    $('#isotext' + qisotext).text('');
                    $('#pbtext' + qpbtext).text('');
                    new PNotify({
                        title: 'Error',
                        text: 'Class code is incorrect. Please enter correct code',
                        delay: 2000,
                        type: 'error'
                    });
                    return false;
                }

                awesomplete_classcode[qclassid] = '';
            }
        })
    }
}

//    accounts page zip auto
$(document).on('blur', '.ac_mailAdd_zip', function () {
    
    id_inputcc = $(this).attr('id');
    var cccode1 = $("#" + id_inputcc).val();
    var cc_input = document.getElementById(id_inputcc);

    if (cccode1.length > 0) {
        getZipCode_Details(cccode1)
    } else {
        $('#ac_mailAdd_city option').empty();
        $('#ac_mailAdd_state').val('');
    }
});

$(document).on('keyup', '.ac_mailAdd_zip', function () {
    $('#ac_mailAdd_zip').removeClass('errorBorder');
    $('#ac_mailAdd_zip_err_msg').hide();
    $('#acZipId').removeClass('text-danger');

    var zipcodeVal = $(this).val();
    var numberval = numberonly(zipcodeVal); 
    $(this).val(numberval);
    id_inputcc = $(this).attr('id');
    var cccode1 = $("#" + id_inputcc).val();
    if (cccode1 != "") {
        if(cccode1.length == 5) {
            getZipCode_Details(cccode1);
        }
    } else {
        $('#ac_mailAdd_city option').empty();
        $('#ac_mailAdd_state').val('');
    }
});

function getZipCode_Details(cccode1) {

    $.ajax({
        url: 'get_zipcode.php',
        method: 'GET',
        async: false,
        data: {
            'search_string': cccode1
        },
        dataType: 'json',
        success: function (response1) {
            cc_global1 = response1;
        },
    })
    append_city1(cccode1);
}

function append_city1(zip_code) {

    $('#accCity_row').html('');
    $.ajax({
        url: laravel_url + "/get_zipcode_base_details",
        type: 'post',
        data: {
            'zipcode': zip_code,
        },
        success: function (response) {
            console.log("ACC City : ", response);
            console.log("City length : ", response.length);
            var appended_city = response;
            if (appended_city.length > 0) {
                c1 = '<select class="form-control city_name_hide1" id="ac_mailAdd_city" name="ac_mailAdd_city">';
                if (appended_city.length > 1)
                    c1 += '<option value=""> Please select </option>';
                for (app_c = 0; app_c < appended_city.length; app_c++) {

                    city = appended_city[app_c]["us_city"];

                    c1 += '<option value="' + city + '">' + city + '</option>';
                }

                c1 += '</select>';
                $('#accCity_row').html('');
                $('#accCity_row').append(c1);

                for (app_c = 0; app_c < appended_city.length; app_c++) {
                    state = appended_city[app_c]["us_state_desc"];
                    s1 = '<input type="text" name="ac_mailAdd_state" id="ac_mailAdd_state" class="form-control city_name_hide1 bg-white" value="' + state + '" readonly>';
                }

                $('#accState_row').html('');
                $('#accState_row').append(s1);
            } else {
                c1 = '<select class="form-control city_name_hide1" id="ac_mailAdd_city" name="ac_mailAdd_city">';
                c1 += '<option value=""> Please select </option>';
                c1 += '</select>';
                $('#ac_mailAdd_city option').empty();
                $('#ac_mailAdd_state').val('');
                $('#ac_mailAdd_zip').addClass('errorBorder');
                $('#acZipId').addClass('text-danger');
                $('#accCity_row').html('');
                $('#accCity_row').append(c1);
                $('#ac_mailAdd_zip_err_msg').show();
            }
        }
    });
}

function append_city1_retrival(zip_code, ret_city) {

    $('#accCity_row').html('');
    $.ajax({
        url: '/brokerage/template/insured_city.php',
        data: {
            search_string: zip_code
        },
        method: 'get',
        dataType: 'json',
        async: false,
        success: function (response) {
            //  console.log(response);
            var appended_city = response;

            if (appended_city != 'empty') {
                c1 = '<select class="form-control city_name_hide1" id="ac_mailAdd_city" name="ac_mailAdd_city">';
                if (appended_city.length > 1)
                    c1 += '<option value=""> Please select </option>';

                for (app_c = 0; app_c < appended_city.length; app_c++) {

                    city = appended_city[app_c]["city"];

                    if (ret_city == city) {
                        var sselected = 'selected';
                    } else {
                        var sselected = '';
                    }

                    c1 += '<option value="' + city + '" ' + sselected + ' >' + city + '</option>';
                }
                c1 += '</select>';

                loccity = '<select class="form-control locCity loc_city_name_hide_1" id="locCity_1" name="loc_city_name_hide_1"></div>';
                if (appended_city.length > 1)
                    loccity += '<option value=""> Please select </option>';
                for (app_c = 0; app_c < appended_city.length; app_c++) {

                    city = appended_city[app_c]["city"];

                    if (ret_city == city) {
                        var sselected = 'selected';
                    } else {
                        var sselected = '';
                    }

                    loccity += '<option value="' + city + '" ' + sselected + ' >' + city + '</option>';
                }

                loccity += '</select>';

                $('#accCity_row').html('');
                $('#accCity_row').append(c1);

                for (app_c = 0; app_c < appended_city.length; app_c++) {
                    state = appended_city[app_c]["State Desc"];
                    s1 = '<input type="text" name="ac_mailAdd_state" id="ac_mailAdd_state" class="form-control city_name_hide1 bg-white" value="' + state + '" readonly>';
                }

                $('#accState_row').html('');
                $('#accState_row').append(s1);
            } else {
                $('#accCity_row').html('<select class="form-control city_name_hide1" id="ac_mailAdd_city" name="ac_mailAdd_city"></select>');
                $('#ac_mailAdd_city option').empty();
                $('#ac_mailAdd_state').val('');
                $('#ac_mailAdd_zip').val('');
            }
        }
    });
}

$(document).on('keyup', '.Qzip_code_submission', function () {
    aid = $(this).attr('data-qzipid');
    $('#isopricing_zip_err_msg'+ aid).hide();
    $('#quickQuote_zip_err_msg'+ aid).hide();
    $('#Qzip_code_submission'+ aid).removeClass('errorBorder');
    id_inputcc = $(this).attr('id');
    var cccode1 = $("#" + id_inputcc).val();
    var cc_input = document.getElementById(id_inputcc);
    if (cccode1.length == 5) {
        $.ajax({
            url: 'get_zipcode_v5.php',
            method: 'GET',
            data: {
                'search_string': cccode1
            },
            dataType: 'JSON',
            success: function (response1) {
                cc_global1 = response1;
                new Awesomplete(cc_input, {
                    list: cc_global1,
                    minChars: 1,
                    maxItems: 10,
                });

                $("#" + id_inputcc).focus();
                $('.awesomplete .visually-hidden').empty()
            }
        })
        row_id = $(this).attr('data-qzipid');
        append_city(cccode1, row_id);
    }
});

function append_city(zip_code, row_id) {
    var disab = $('#city_name_td' + row_id).find('select').attr('disabled');
    $('#city_name_td' + row_id).html('');
    $('.city_name_hide').css('display', 'none');

    $.ajax({
        url: laravel_url + "/get_zipcode_base_details",
        type: 'post',
        data: {
            'zipcode': zip_code,
        },
        success: function (response) {
            var appended_city = response;
            if (appended_city != 'empty') {

                $('.cityVisible').css('display', 'block');

                c = '<select class="form-control city cityVisible" name="city"></div>';
                for (app_c = 0; app_c < appended_city.length; app_c++) {
                    city = appended_city[app_c]["us_city"];
                    c += '<option value="' + city + '">' + city + '</option>';
                }

                c += '</select>';

                $('#city_name_td' + row_id).html('');
                $('#city_name_td' + row_id).append(c);

                if (typeof disab !== 'undefined') {
                    $('#city_name_td' + row_id).find('select').attr('disabled', 'disabled');
                }

                loccity = '<select class="form-control locCity city" id="locCity_' + row_id + '" name="city"></div>';
                for (app_c = 0; app_c < appended_city.length; app_c++) {
                    city = appended_city[app_c]["us_city"];
                    loccity += '<option value="' + city + '">' + city + '</option>';
                }

                loccity += '</select>';
            } else {

                $('.cityVisible').css('display', 'none');
                $('.city_name_hide').css('display', 'block');
                $('.loc_city_name_hide_' + row_id).css('display', 'block');
                $('#Qzip_code_submission' + row_id).val('');
                $('#ziptext' + row_id).text('');
            }
        },
    });
}

$(document).on('click', '.get_code', function () {
    get_qq_a_ratedcodes('qrate_click');
    var timer = setInterval(function() {
        if ($('tbody').hasClass('rate_table')) {
            $('.rate_table').show();
            $('.totpremium').show();
            clearInterval(timer);
        }
    }, 200);
});

function quote_api_ajax(class_code, zip, loc_array, exp, transaction_id, api_method, limits, deductible, api_url, class_code_length, city_array, locat_array, qclass_coverage_array, term, a_source) {

    asy_op = false;

    if (api_method == 'basic_quote_info') {
        asy_op = true;
    }
    effective_date_gl = $('.effective_from').val();

    setTimeout(function () {
        var jqXHR = $.ajax({
            url: api_url,
            method: 'post',
            async: asy_op,
            data: {
                "insured_object": {
                    "business_description": "New Business",
                    "business_name": "Test One",
                    "insured_zip": "85054",
                    "insured_line1": "3939 N. Drinkwater Blvd"
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
                "city_json": city_array,
                "location_no": loc_array,
                'coverage': qclass_coverage_array,
                'term': term
            },
            dataType: 'json',
            success: function (response) {
                if (response) {
                    var arate_count = 0;
                    var res_leng = response['result'].length;
                    var cc_array_res = $.map(response['result'], function (value, index) {
                        return [value];
                    });

                    for (i = 0; i < res_leng; i++) {
                        var jc = i + 1;
                        var lli_coverage = cc_array_res[i]["coverage"];
                        if (lli_coverage == 'CGL,PCO' || lli_coverage == 'CGL') {

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
                                $('#isotext' + i).addClass('get_arate_length');
                            } else {
                                $('#isotext' + i).text('');
                                $('#isotext' + i).removeClass('get_arate_length');
                            }

                        } else if (lli_coverage == 'LLL') {

                            var is_arate = cc_array_res[i][jc]["Result"]["LiquorLiability"]['Is_arate'];
                            if (is_arate == "Y") {
                                arate_count = arate_count + 1;
                                $('#isotext' + i).text('* A Rates');
                                $('#isotext' + i).addClass('get_arate_length');
                            } else {
                                $('#isotext' + i).text('');
                                $('#isotext' + i).removeClass('get_arate_length');
                            }

                        } else if (lli_coverage == 'OCP') {

                            var is_arate = cc_array_res[i][jc]["Result"]["OCP"]['Is_arate'];
                            if (is_arate == "Y") {
                                arate_count = arate_count + 1;
                                $('#isotext' + i).text('* A Rates');
                                $('#isotext' + i).addClass('get_arate_length');
                            } else {
                                $('#isotext' + i).text('');
                                $('#isotext' + i).removeClass('get_arate_length');
                            }

                        }
                    }
                    if (arate_count > 0) {
                        $('.get_code').addClass('disabled');
                        $('.quickcodeloading_btn').css('display', 'none');
                        $('.totpremium').hide();

                    } else {
                        $('.get_code').removeClass('disabled');
                        $('.quickcodeloading_btn').css('display','none');
                        cc = JSON.parse(SIC_business_class);
                        rate_table_display(response['result'], cc);
                        if (a_source == 'qrate_click'){
                            if (total_premium) {
                                new PNotify({
                                    title: 'Success',
                                    text: 'Premium is generated Successfully',
                                    delay: 2000,
                                    type: 'success'
                                });
                            }

                        }
                    }


                } else {
                    new PNotify({
                        title: 'Error',
                        text: 'Premium is not generated',
                        delay: 2000,
                        type: 'error'
                    });
                }

            },
        });

    }, 0);
}

function rate_table_display(response, class_code) {
    var res_leng = response.length;
    var cc_array_res = $.map(response, function (value, index) {
        return [value];
    });

    for (i = 0; i < res_leng; i++) {

        var jc = i + 1;

        var lli_coverage = cc_array_res[i]["coverage"];

        var class_app = class_code[i];

        if (lli_coverage == 'CGL,PCO' || lli_coverage == 'CGL') {

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

            if (is_arate == "Y") {
                $('#isotext' + i).text('* A Rates');
            } else {
                $('#isotext' + i).text('');
            }

            var tr_code = cc_array_res[i][jc]["Result"]["Tcode"];
            var trr_ch = $('#ziptext' + i).text();
            trr_ch = trr_ch.replace('TC:-', 'TC:' + tr_code + ',', trr_ch);

            $('#ziptext' + i).text('').text(trr_ch);

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

            var LC = parseFloat(LossCost1) + parseFloat(LossCost12);
            LC = (LC).toLocaleString();

            var BR = parseFloat(BaseRate1) + parseFloat(BaseRate12);
            BR = (BR).toLocaleString();

            var ABR = parseFloat(AdjBaseRate1) + parseFloat(AdjBaseRate12);
            ABR = (ABR).toLocaleString();

            var LCM = LossCostMultiplier1;
            var Total_Pre = premium + premium2;
            var ILF = IncLmtLessDedFact1 + '/' + IncLmtLessDedFact12;


            $('.rate_table').append('<tr class="remove_prem Qq_gl_prem_rw"><td style="text-align:left;" class="get_Ccode">' + class_app + '</td><td class="get_pc">' + coverage + '</td><td class="get_lc" style="text-align:right;">' + LossCost1 + '</td><td class="get_lcm" style="text-align:right;">' + LossCostMultiplier1 + '</td><td class="get_br" style="text-align:right;">' + BaseRate1 + '</td><td class="get_ilf" style="text-align:right;">' + IncLmtLessDedFact1 + '</td><td class="get_abr" style="text-align:right;">' + AdjBaseRate1 + '</td><td class="get_premium" style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + premium + '</span></td></tr>');
            $('.prem_comma').simpleMoneyFormat();

            $('.rate_table').after().append('<tr><td style="text-align:left;" class="get_Ccode"></td><td class="get_pc">' + coverage2 + '</td><td class="get_lc" style="text-align:right;">' + LossCost12 + '</td><td class="get_lcm" style="text-align:right;">' + LossCostMultiplier12 + '</td><td class="get_br" style="text-align:right;">' + BaseRate12 + '</td><td class="get_ilf" style="text-align:right;">' + IncLmtLessDedFact12 + '</td><td class="get_abr" style="text-align:right;">' + AdjBaseRate12 + '</td><td class="get_premium" style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + premium2 + '</span></td></tr><tr><td class="fontweight500">Total</td><td></td><td  style="text-align:right;">' + LC + '</td><td style="text-align:right;">' + LCM + '</td><td  style="text-align:right;">' + BR + '</td><td style="text-align:right;">' + ILF + '</td><td  style="text-align:right;">' + ABR + '</td><td style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + Total_Pre + '</td></tr>');
            $('.prem_comma').simpleMoneyFormat();
            $('.loader').hide();

        } else if (lli_coverage == 'LLL') {

            var premium = cc_array_res[i][jc]["Result"]["LiquorLiability"]['ProPremium'];
            premium = Math.ceil(premium);
            coverage = "LiquorLiability";
            total_premium.push(premium);
            var is_arate = cc_array_res[i][jc]["Result"]["LiquorLiability"]['Is_arate'];

            if (is_arate == "Y") {
                $('#isotext' + i).text('* A Rates');
            } else {
                $('#isotext' + i).text('');
            }

            var tr_code = cc_array_res[i][jc]["Result"]["Tcode"];
            var trr_ch = $('#ziptext' + i).text();
            trr_ch = trr_ch.replace('TC:-', 'TC:' + tr_code + ',', trr_ch);

            $('#ziptext' + i).text('').text(trr_ch);

            var LossCost1 = parseFloat(cc_array_res[i][jc]["Result"]["LiquorLiability"]['LossCost']);
            var LossCostMultiplier1 = parseFloat(cc_array_res[i][jc]["Result"]["LiquorLiability"]["LostcostModifier"]);
            var BaseRate1 = parseFloat(cc_array_res[i][jc]["Result"]["LiquorLiability"]['BaseRate']);
            var IncLmtLessDedFact1 = parseFloat(cc_array_res[i][jc]["Result"]["LiquorLiability"]['IncLimitFactor']);
            var AdjBaseRate1 = parseFloat(cc_array_res[i][jc]["Result"]["LiquorLiability"]['AdjBaseRate']);

            $('.rate_table').append('<tr class="remove_prem Qq_liq_prem_rw"><td style="text-align:left;" class="get_Ccode">' + class_app + '</td><td class="get_pc">' + coverage + '</td><td class="get_lc" style="text-align:right;">' + LossCost1 + '</td><td class="get_lcm" style="text-align:right;">' + LossCostMultiplier1 + '</td><td class="get_br" style="text-align:right;">' + BaseRate1 + '</td><td class="get_ilf" style="text-align:right;">' + IncLmtLessDedFact1 + '</td><td class="get_abr" style="text-align:right;">' + AdjBaseRate1 + '</td><td class="get_premium" style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + premium + '</span></td></tr><tr><td class="fontweight500">Total</td><td></td><td  style="text-align:right;">' + LossCost1 + '</td><td style="text-align:right;">' + LossCostMultiplier1 + '</td><td  style="text-align:right;">' + BaseRate1 + '</td><td style="text-align:right;">' + IncLmtLessDedFact1 + '</td><td  style="text-align:right;">' + AdjBaseRate1 + '</td><td style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + premium + '</td></tr>');
            $('.prem_comma').simpleMoneyFormat();
            $('.loader').hide();
        } else if (lli_coverage == 'OCP') {

            var premium = cc_array_res[i][jc]["Result"]["OCP"]['ProPremium'];
            premium = Math.ceil(premium);
            coverage = "OCP";
            total_premium.push(premium);
            var is_arate = cc_array_res[i][jc]["Result"]["OCP"]['Is_arate'];

            if (is_arate == "Y") {
                $('#isotext' + i).text('* A Rates');
            } else {
                $('#isotext' + i).text('');
            }

            var tr_code = cc_array_res[i][jc]["Result"]["Tcode"];
            var trr_ch = $('#ziptext' + i).text();
            trr_ch = trr_ch.replace('TC:-', 'TC:' + tr_code + ',', trr_ch);

            $('#ziptext' + i).text('').text(trr_ch);

            var LossCost1 = parseFloat(cc_array_res[i][jc]["Result"]["OCP"]['LossCost']);
            var LossCostMultiplier1 = parseFloat(cc_array_res[i][jc]["Result"]["OCP"]["LostcostModifier"]);
            var BaseRate1 = parseFloat(cc_array_res[i][jc]["Result"]["OCP"]['BaseRate']);
            var IncLmtLessDedFact1 = parseFloat(cc_array_res[i][jc]["Result"]["OCP"]['IncLimitFactor']);
            var AdjBaseRate1 = parseFloat(cc_array_res[i][jc]["Result"]["OCP"]['AdjBaseRate']);

            $('.rate_table').append('<tr class="remove_prem Qq_ocp_prem_rw"><td style="text-align:left;" class="get_Ccode">' + class_app + '</td><td class="get_pc">' + coverage + '</td><td class="get_lc" style="text-align:right;">' + LossCost1 + '</td><td class="get_lcm" style="text-align:right;">' + LossCostMultiplier1 + '</td><td class="get_br" style="text-align:right;">' + BaseRate1 + '</td><td class="get_ilf" style="text-align:right;">' + IncLmtLessDedFact1 + '</td><td class="get_abr" style="text-align:right;">' + AdjBaseRate1 + '</td><td class="get_premium" style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + premium + '</span></td></tr><tr><td class="fontweight500">Total</td><td></td><td  style="text-align:right;">' + LossCost1 + '</td><td style="text-align:right;">' + LossCostMultiplier1 + '</td><td  style="text-align:right;">' + BaseRate1 + '</td><td style="text-align:right;">' + IncLmtLessDedFact1 + '</td><td  style="text-align:right;">' + AdjBaseRate1 + '</td><td style="text-align:right;font-weight:bold;">$<span class="prem_comma" >' + premium + '</td></tr>');
            $('.prem_comma').simpleMoneyFormat();
            $('.loader').hide();
        }

    }
    $('.rate_table').hide();
    $('.totpremium').hide();

    total_premium_fn();

}

function quote_data_insert(data) {
    $.ajax({
        url: base_url + "/get_quote_majescoapi",
        data: data,
        method: 'post',
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function () {

        },
        success: function (response) {
            // display_quote(response)
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

function save_non_submissions(data) {
    $.ajax({
        url: base_url + "/save_non_submissions",
        data: data,
        method: 'post',
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function () {

        },
        success: function (response) {
            non_submission_id = response['ins_id']

        },
        error: function () {

        },
        complete: function () {
            $('.loader').hide();

            total_premium_fn();
        }
    });
    if (data['status'] == 1) {
        generate_majesco_queue(data)
    }
}

function generate_majesco_queue(data) {
    $.ajax({
        url: base_url + "/generate_majesco_queue",
        data: data,
        method: 'post',
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function () {

        },
        success: function (response) {
            majesco_transaction_id = majesco_queue = response['majesco_transaction_id']
        },
        error: function () {

        },
        complete: function () {
            $('.loader').hide();
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
    $('.quickcodeloading_btn').hide();
    if ($('.quick_quote').data('sstatus') == 'qq') {
        $('.save_this_quote').show()
    }
}

$(document).on("focusout", '.Qzip_code_submission', function () {

    $("input").removeClass("highlight");
    $(".get_code").prop('disabled', false);
    $(".get_code_account").prop('disabled', false);
    zip = $(this).val();
    aid = $(this).attr('data-qzipid');
    rid = $(this).attr('data-rowid');

    if(zip!= '') {
        $(this).removeClass('redBorder');
    } 

    if (zip.length == 5) {
        $('#isopricing_zip_err_msg'+ aid).hide();
        $('#quickQuote_zip_err_msg'+ aid).hide();
        $('#Qzip_code_submission'+ aid).removeClass('errorBorder');
        $.ajax({
            url: 'get_city_name_v5.php',
            method: 'GET',
            data: {
                'zip': zip
            },
            dataType: 'JSON',
            success: function (res) {
                if(res['status'] != "fail"){
                    if (res[0]['city'] != '') {
                        $('#ziptext' + aid).text("TC:- " + res[0]['city'] + ", " + res[0]['state_code']);
                        $('#locState_' + rid).val(res[0]['state_code']);
                    } 
                } else {
                    new PNotify({
                        title: 'Error',
                        text: 'Zip code is incorrect. Please enter correct code',
                        delay: 2000,
                        type: 'error'
                    });
                    $('#ziptext' + aid).text("");
                    $('#locState_' + rid).val('');
                    $('#Qzip_code_submission' + aid).val('');
                }                
            }
        })
    } else {
        // $('#Qzip_code_submission' + aid).val('');
        $('#ziptext' + aid).text("");
        $('#locState_' + rid).val('');
        var option_val = '<select class="form-control city cityVisible" name="city"><option value="" ></option></select>';
        $('#city_name_td' + aid).html(option_val);
        $('#isopricing_zip_err_msg' + aid).show();
        $('#quickQuote_zip_err_msg' + aid).show();
        $('#Qzip_code_submission'+ aid).addClass('errorBorder');
        if(zip.length == 0){
            $('#Qzip_code_submission'+ aid).removeClass('errorBorder');
            $('#isopricing_zip_err_msg' + aid).hide();
            $('#quickQuote_zip_err_msg' + aid).hide();
        }
    }

})

// function last_row_check(inc) {
//     if (inc == 10) {
//         var btn_id = inc - 1;
//         $('#add_more_btn' + btn_id).trigger('click');
//         return false;
//     }
// }

$(document).on("focusout", '.loc_add', function () {
    $("input").removeClass("highlight");
    var addr = $(".loc_add").val();
    if (($(".get_code").prop('disabled') == true) || ($(".get_code_account").prop('disabled') == true)) {
        $(".get_code").prop('disabled', false);
        $(".get_code_account").prop('disabled', false);
    }

    if(addr!= '') {
        $(this).removeClass('redBorder');
    } 
});


$(document).on('click', '.irs.irs-with-grid, .irs-bar, .irs-slider, .irs-line, .irs-line-left, .irs-line-mid, .irs-line-right', function () {
    setTimeout(function () {
        var range_val = $('.irs-from').text();

        if (range_val == '1/3/3/1' || range_val == '1/4/4/1' || range_val == '2/2/2/2' || range_val == '2/3/3/2' || range_val == '2/4/4/2') {
            $('.irs-min').hide();
        } else {
            $('.irs-min').show();
        }
    }, 200);
});


$(document).on('focusout', '.arate_exp, .classcode_tbox', function () {
    var class_code = "";
    var class_code_array = [];
    var ctval = $('.classcode_tbox').val();
    var zval = $('.Qzip_code_submission').val();
    var lval = $('.loc_add').val();
    if ($(this).val() != "" && ctval.length >= 5 && zval != '' && zval.length == 5 && lval != '') {
        get_qq_a_ratedcodes('qrate_focus');
        $('.quickcodeloading_btn').hide();
    }

});

function get_qq_a_ratedcodes(source) {

    if (($('#qqGL').prop('checked') == false) && ($('#qqLiquor').prop('checked') == false) && ($('#qqOCP').prop('checked') == false)) {
        $('html, body').animate({
            scrollTop: $('#qqcoveragessec').offset().top - 120
        }, 1000);

        $('.qqCovMandatoryMsg').show().text('').text('( Atleast one coverage should be checked )');
    } else {
        var check = true;
        total_premium = [];
        quickquote_response_arr = [];
        loader_inc = 1;
        cc_array = [];

        exposure_array = new Array();
        zip_array = new Array();
        city_array = new Array();
        locat_array = new Array();
        loc_array = new Array();
        qclass_coverage_array = new Array();

        var effective_from = $('.effective_from').val();
        var email_db_id = $('.email_id').val();
        var limits = global_limit_slider;
        var deductible = global_deduct_slider
        var class_zip_length = $('.-').length

        var term;
        var isChecked = document.getElementById("switchValue").checked;
        if (isChecked == true) {
            term = 6;
        } else {
            term = 12;
        }

        $('.remove_prem,.tp_tr').remove(); // need to check
        $('.rate_table').empty();
        $('.tp_comma').empty();

        $(".exposure_row").each(function () {

            exposure = $(this).find(".Qexposure_amount").val();
            exposure = exposure.replace(/([,.$])+/g, '').replace(/,/g, '').replace(/^0+/, "");
            exposure_array.push(exposure);
            zip_code = $(this).find(".Qzip_code_submission").val();
            zip_array.push(zip_code);
            SIC_business_class = $(this).find(".Qclass_code_submission").val();
            SIC_business_class = SIC_business_class.substring(0, 6);/*Naics update*/
            cc_array.push(SIC_business_class);
            city = $(this).find(".city").val();
            city_array.push(city);
            locat = $(this).find(".loc_add").val();
            locat_array.push(locat);
            loc = $(this).find('.qqrowid').attr('data-location_id');
            loc_array.push(loc);

            qclass_coverage = $(this).find(".Qqclass_code_coverage").val(); //v5
            qclass_coverage_array.push(qclass_coverage);

            if (zip_code == '' || SIC_business_class == '' || exposure == '' || locat == '') {

                check = false;
            }
            api_method = 'businessnlocation';
        });

        if (check == false) {
            if (source == 'qrate_click'){
                new PNotify({ title: 'Error', text: 'Information not sufficient to generate a Quick Quote.Please enter the required fields to create a Quick Quote', delay: 2000, type: 'error' });
                return false;
            }
        } else {
            var textArr = $("input[type=text][id^=Qclass_code_submission]").get();
            var textArr1 = $("input[type=text][id^=Qzip_code_submission]").get();
            var textArr2 = $("input[type=text][id^=loc_add]").get();

            var len = textArr.length;
            var inner = 0,
                outer = 0,
                index = 0,
                dupLen = 0;
            var dupArr = new Array();
            var dupArr1 = new Array();
            var dupArr2 = new Array();

            for (outer = 0; outer < len; outer++) {
                for (inner = outer + 1; inner < len; inner++) {
                    if (textArr[outer].value.substring(0, 6).trim() == textArr[inner].value.substring(0, 6).trim()) { /*Naics Update*/
                        if (textArr1[outer].value == textArr1[inner].value) {
                            if (textArr2[outer].value.toLowerCase() == textArr2[inner].value.toLowerCase()) {
                                if (jQuery.inArray(textArr[outer].value.substring(0, 6).trim(), dupArr) == -1 || jQuery.inArray(textArr1[outer], dupArr1) == -1 || jQuery.inArray(textArr2[outer].toLowerCase(), dupArr2) == -1) {/*Naics Update*/
                                    dupArr.push(textArr[outer]);
                                    dupArr1.push(textArr1[outer]);
                                    dupArr2.push(textArr2[outer]);
                                }
                                if (jQuery.inArray(textArr[inner].value.substring(0, 6).trim(), dupArr) == -1 || jQuery.inArray(textArr1[inner], dupArr1) == -1 || jQuery.inArray(textArr2[inner].toLowerCase(), dupArr2) == -1) {/*Naics update*/
                                    dupArr.push(textArr[inner]);
                                    dupArr1.push(textArr1[inner]);
                                    dupArr2.push(textArr2[inner]);
                                }
                                dis_val = 1;
                            } else {
                                dis_val = 1;
                            }
                        } else {
                            dis_val = 1;
                        }
                    } else {
                        dis_val = 1;
                    }
                }
            }

            if (dupArr.length == 0 && dupArr1.length == 0 && dupArr2.length == 0) {
                exposure_array = exposure = JSON.stringify(exposure_array);
                zip_array = zip_code = JSON.stringify(zip_array);
                cc_array = SIC_business_class = JSON.stringify(cc_array);
                city_array = JSON.stringify(city_array);
                locat_array = JSON.stringify(locat_array);
                loc_array = JSON.stringify(loc_array);
                qclass_coverage_array = JSON.stringify(qclass_coverage_array);
                api_url = base_url + '/brokerage/template/get_quote_api_qq_v5.php';
                nsm = $('.email-list-item_' + email_db_id).find('h6').text();

                quote_api_ajax(SIC_business_class, zip_code, loc_array, exposure, majesco_transaction_id, api_method, limits, deductible, api_url, class_code_length, city_array, locat_array, qclass_coverage_array, term, source);

                if (source == 'qrate_click'){
                    $('.quickcodeloading_btn').show();    
                }
                
            } else {
                for (p = 1; p < dupArr.length; p++) {
                    $("#" + dupArr[p].id).addClass("highlight");
                    $("#" + dupArr1[p].id).addClass("highlight");
                    $("#" + dupArr2[p].id).addClass("highlight");
                }

                $(".get_code").prop('disabled', true);
                new PNotify({
                    title: 'Error',
                    text: 'Duplicate value is exists',
                    delay: 2000,
                    type: 'error'
                });
                return false;
            }
        }
    }
}


$(document).on('change', '[name="qqCoverageType"]', function() {

    var this_data_id = $(this).attr('id');
    var cov_val = $(this).val();

    if ( $('#qqGL').prop('checked') == true && $('#qqLiquor').prop('checked') == false ) {

        if (this_data_id != 'qqGL' && this_data_id != 'qqOCP') {
            QqcovPopup_show('liquor_uncheck', this_data_id, cov_val);
        }
    }

    if ( $('#qqGL').prop('checked') == false && $('#qqLiquor').prop('checked') == true ) {
        
        if (this_data_id != 'qqLiquor' && this_data_id != 'qqOCP') {
            QqcovPopup_show('gl_uncheck', this_data_id, cov_val);
        }
    }

    if ( $('#qqGL').prop('checked') == false && $('#qqLiquor').prop('checked') == false && $('#qqOCP').prop('checked') == false ) {
        QqcovPopup_show('total_uncheck', this_data_id, cov_val);
    }
 
});


function QqcovPopup_show(uncheck_details, get_id_name, cov_val) {
    $('#QqcovWarningCancel').attr('data-unChk-id',get_id_name);
    $('#QqcovWarningOk').attr('data-unChk-id',get_id_name);
    $('#QqcovWarningOk').attr('data-cov-val',cov_val);
    $('.QqcovPopup').trigger('click');
}


/***** Iso warning popup cancel click event *******/
$(document).on('click', '#QqcovWarningCancel', function () {
    var uncheck_id_name = $(this).attr('data-unChk-id');
    $('#'+uncheck_id_name).click();
});

/***** Iso warning popup Ok click event *******/
$(document).on('click', '#QqcovWarningOk', function () {
    var cov_val = $(this).attr('data-cov-val');
    var uncheck_id_name = $(this).attr('data-unChk-id');
    reset_Qq_indication(cov_val, uncheck_id_name);
});


function reset_Qq_indication(cov_val, uncheck_id_name) {
    var qqCoverage_type_array = [];

    $("input[name='qqCoverageType']:checked").each( function () {
        var value = $(this).val();
        qqCoverage_type_array.push(value);
    });

    var qqCoverage_type = qqCoverage_type_array.toString();
    var iso_coverages = qqCoverage_type;
    var reset_QqcovValue = "reset_all";
    

    if (qqCoverage_type == "1" && cov_val == "2") {
        reset_QqcovValue = 2;
    } else if (qqCoverage_type == "2" && cov_val == "1") {
        reset_QqcovValue = 1;
    } 
    
    var hiddn_length = $('.Qqclass_code_coverage').length;
    
    $(".Qqclass_code_coverage").each(function() {
        var cov_typ     = $(this).val();
        var data_rowid  = $(this).attr('data-rowid');
        if (hiddn_length > 1) {
            if (cov_typ == reset_QqcovValue || reset_QqcovValue == "reset_all") {
               removeQq_CovDiv(data_rowid)
            }

        } else {
            if (cov_typ == reset_QqcovValue || reset_QqcovValue == "reset_all") {
                $('.remove_more_btn').hide();
                $('.remove_more_btn1').hide();
                $('.Qclass_code_submission').val('');
                $('.Qzip_code_submission').val('');
                $('.city_label').text('');
                $('.loc_add').val('');
                $('.Qexposure_amount').val('');
                $('.class_isotext').text("");
                $('.qq_eff_date').datepicker('setDate',qq_today).val(qq_today);
                qq_limit_slide_reset();
                qq_term_reset();
                $('.Qq_gl_prem_rw').remove();
                $('.Qq_liq_prem_rw').remove();
                $('.Qq_ocp_prem_rw').remove();
                $('#Qq_tboady_prem').html("");
                $('.tp_comma').html("");
                $('.city_name_hide').show();
                $('.cityVisible').hide();
                $('.premium_base').text('');
                $('.class_ctext').text("");

                serialize_iso_row_no();
            }
        }
    });

}


function removeQq_CovDiv(data_rowid) {
    var hdnLngth = $('.Qqclass_code_coverage').length;
    if (hdnLngth > 1) {
        $('#Qqcov_clsCd_row'+data_rowid).remove();
        if (data_rowid == 1) {
            $('.Qq_gl_prem_rw').remove();
        } else if (data_rowid == 2) {
            $('.Qq_liq_prem_rw').remove();
        } else {
            $('.Qq_ocp_prem_rw').hide();
        }
    } else {
        $('.remove_more_btn').hide();
        $('.remove_more_btn1').hide();
        $('.Qclass_code_submission').val('');
        $('.Qzip_code_submission').val('');
        $('.city_label').text('');
        $('.loc_add').val('');
        $('.Qexposure_amount').val('');
        $('.class_isotext').text("");
        qq_limit_slide_reset();
        qq_term_reset();
        $('.Qq_gl_prem_rw').remove();
        $('.Qq_liq_prem_rw').remove();
        $('.Qq_ocp_prem_rw').remove();
        $('#Qq_tboady_prem').html("");
        $('.tp_comma').html("");
        $('.city_name_hide').show();
        $('.cityVisible').hide();
        $('.premium_base').text('');
        $('.class_ctext').text("");

        serialize_iso_row_no();
    }
}

function qq_limit_slide_reset() {
    let my_range = $("#inline-radios1").data("ionRangeSlider");
    my_range.update({
        from: 0,    
    });
    global_limit_slider = limits[0]

    my_range.reset();

    my_range.destroy();

    ion_range_slider();
}


function qq_term_reset() {
    var switchStatus = false;
    if ($("#switchValue").is(':checked')) {
        switchStatus = true;
    }
    
    if(switchStatus) {
        $('#switchValue').trigger('click');
    }
}