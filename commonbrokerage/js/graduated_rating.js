// ** Graduated Rating section start 09-03-2021 @vaishnavi **//

// ** Disable Graduated Rate button 09-03-2021 @vaishnavi **//

function disable_graduated_rating(action) {

    //var accid = localStorage.getItem('accid');
    var exposure_value = 0;
    var exposure_rate = 0;
    var exposure_from = 0;
    var class_Codes = [];
    var userid = localStorage.getItem('usernumericid');

    $.ajax({
        type: "post",
        url: laravel_url + "/disable_graduated_rating",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': rqbi_id,
            'userid': userid
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data);
            var disable_type = obj['Type'];
            var grad_rating_enable = obj['grad_rating_enable'];
            var Msg = obj['Msg'];

            $('.ExposureTo_1').val('');
            $('.ExposureRate_1').val('');
            if (Msg != "Failure" || grad_rating_enable != 0) {
                if (disable_type == "CompositeRating") {
                    exposure_value = obj['exposure'];
                    exposure_rate = obj['developed_rate'];
                    class_code_id = obj['class_code_id'];
                    $('.ExposureFrom_1').val('$ ' + exposure_from);
                    $('.ExposureTo_1').val('$ ' + exposure_value);
                    $('.ExposureRate_1').val('$ ' + exposure_rate);
                    $('#class_code_id').val(class_code_id);
                    $(".classbuildGraduatedRating").removeClass("disabled");

                } else if (disable_type == "ClassBuilder") {
                    exposure_value = obj['exposure'];
                    exposure_rate = obj['developed_rate'];
                    class_code_id = obj['class_code_id'];
                    $('.ExposureFrom_1').val('$ ' + exposure_from);
                    $('.ExposureTo_1').val('$ ' + exposure_value);
                    $('.ExposureRate_1').val('$ ' + exposure_rate);
                    $('#class_code_id').val(class_code_id);
                    $(".classbuildGraduatedRating").removeClass("disabled");

                } else {
                    $("#cbGraduatedTable").hide();
                    $('.Add_GraduatedRating_div').css('display', 'none');
                    $('.cbGraduatedTableDiv').hide();
                    $('.classbuildGraduatedRating').addClass('disabled');
                    $('#class_code_id').val('');
                }

            } else {

                $("#cbGraduatedTable").hide();
                $('.Add_GraduatedRating_div').css('display', 'none');
                $('.cbGraduatedTableDiv').hide();
                $('.classbuildGraduatedRating').addClass('disabled');
                $('#class_code_id').val('');
            }
        },
        error: function () {
            new PNotify({
                title: 'Error',
                text: 'Getting error',
                delay: 1500,
                type: 'error'
            });
        },
        complete: function () {
            if (action == 'add_first_row') {
                add_first_grad_row();
            } else {
                var class_code_id = $('#class_code_id').val();
                if (class_code_id != "") {
                    retrive_graduated_rating('null');
                }

            }
        }
    });

}

function add_first_grad_row() {
    //var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    var trlength = $('.graduatedRow').length;
    var grad_rate_rowid = $('.graduatedRow_1').attr('data-rowid');
    var grad_rate_rid = $('.graduatedRow_1').attr('data-rid');
    var class_code_id = $('#class_code_id').val();
    if (grad_rate_rid == undefined) {
        grad_rate_rid = 0;
    }
    var ExposureFrom = $('.ExposureFrom_1').val().replace('$', '').replace(/,/g, '');
    var ExposureTo = $('.ExposureTo_1').val().replace('$', '').replace(/,/g, '');
    var ExposureRate = $('.ExposureRate_1').val().replace('$', '').replace(/,/g, '');
    if (ExposureTo != '' && ExposureTo != 0 && ExposureRate != '' && class_code_id != '' && ExposureRate != 0) {
        $.ajax({
            type: "post",
            url: laravel_url + "/First_rqbi_graduated_rate_save",
            data: {
                'accid': accid,
                'com_id': com_id,
                'rqbi_id': rqbi_id,
                'userid': userid,
                'exposure_from': ExposureFrom,
                'exposure_to': ExposureTo,
                'exposure_rate': ExposureRate,
                'class_code_id': class_code_id,
                'grad_rate_rowid': grad_rate_rowid,
                'grad_rate_rid': grad_rate_rid
            },
            success: function (data) {
                var obj = jQuery.parseJSON(data);
                var db_rid = obj.rid;
                var db_exposure_from = obj.exposure_from;
                if (obj.exposure_to != "" && obj.exposure_to != undefined) {
                    var db_exposure_to = numberWithCommas(obj.exposure_to);
                } else {
                    var db_exposure_to = obj.exposure_to;
                }
                if (obj.exposure_rate != "" && obj.exposure_rate != undefined) {
                    var db_exposure_rate = numberWithCommas(obj.exposure_rate);
                } else {
                    var db_exposure_rate = obj.exposure_rate;
                }

                $('#gradRatingDelRow_1').remove();
                $('.graduatedRow_1').attr('data-rid', db_rid);
                $('.ExposureFrom_1').val('$ ' + db_exposure_from);
                $('.ExposureTo_1').val('$ ' + db_exposure_to);
                $('.ExposureRate_1').val('$ ' + db_exposure_rate);
                $('#class_code_id').val(class_code_id);
                $('#gradRatingAddRow_1').attr('data-rid', db_rid);
                $('#gradRatingDelRow_1').attr('data-rid', db_rid);
                $('#gradRatingAddRow_1').removeClass('disabled');
                if (obj.message != "Update is Success") {
                    $('#rowId').val(grad_rate_rowid);
                }
            }
        });
    }
}

$(document).on('keyup', '.ExposureFrom, .ExposureTo', function () {
    var value = $(this).val().replace('$', '').replace(/,/g, '');
    var class_name = $(this).hasClass('ExposureTo');
    var rowid = $(this).attr('data-rowid');
    if (parseInt(value.length) > 20) {
        if (class_name != false) {
            $('.show_exposure_to_max_valdtn_' + rowid).css('display', 'block');
            $('.show_exposure_to_max_valdtn_' + rowid).css('color', 'red');
            $('.ExposureTo' + rowid).addClass('redBorder');
            $('.gradRatingAddRow').addClass('disabled');
            $('.removeRow').addClass('disabled');
        } else if (class_name == false) {
            $('.show_exposure_from_max_valdtn_' + rowid).css('display', 'block');
            $('.show_exposure_from_max_valdtn_' + rowid).css('color', 'red');
            $('.gradRatingAddRow').addClass('disabled');
            $('.removeRow').addClass('disabled');
        } else {
            $('.show_exposure_from_max_valdtn_' + rowid).css('display', 'none');
            $('.show_exposure_to_max_valdtn_' + rowid).css('display', 'none');
            $('.gradRatingAddRow').removeClass('disabled');
            $('#gradRatingDelRow_' + rowid).removeClass('disabled');
        }
    } else {
        $('.show_exposure_from_max_valdtn_' + rowid).css('display', 'none');
        $('.show_exposure_to_max_valdtn_' + rowid).css('display', 'none');
        $('.gradRatingAddRow').removeClass('disabled');
        $('#gradRatingDelRow_' + rowid).removeClass('disabled');
    }
});

$(document).on('focusout', '.ExposureFrom, .ExposureTo, .ExposureRate', function () {
    Error_validation_retrieve();
    //var accid = localStorage.getItem('accid');
    var id = $(this).attr('id');
    var id1 = id.split('_');
    var grad_rate_rowid = id1[1];
    var set_value = 0;
    var grad_rate_rid = $('.graduatedRow_' + grad_rate_rowid).attr('data-rid');
    if (grad_rate_rid == undefined) {
        grad_rate_rid = 0;
    }
    var exposure_from = $('.ExposureFrom_' + grad_rate_rowid).val().replace(' ', '').replace('$', '').replace(/,/g, '');
    var exposure_to = $('.ExposureTo_' + grad_rate_rowid).val().replace(' ', '').replace('$', '').replace(/,/g, '');
    var exposure_rate = $('.ExposureRate_' + grad_rate_rowid).val().replace(' ', '').replace('$', '').replace(/,/g, '');
    var class_code_id = $('#class_code_id').val();
    
    if (parseInt(exposure_from.length) > 20) {
        set_value = 0;
        $('.gradRatingAddRow').addClass('disabled');
    } else if (parseInt(exposure_to.length) > 20) {
        set_value = 0;
        $('.gradRatingAddRow').addClass('disabled');
    } else {
        set_value = 1;
        if ($('#show_exposure_greater_' + grad_rate_rowid).css('display') == 'block') {
            $('.show_exposure_to_max_valdtn').css("display", "none");
            $('.gradRatingAddRow').addClass('disabled');
            $('.removeRow').addClass('disabled');
        } else {
            $('.gradRatingAddRow').removeClass('disabled');
            $('#gradRatingDelRow_' + grad_rate_rowid).removeClass('disabled');
        }

    }

    if (exposure_from != exposure_to && exposure_from != '' && exposure_rate != '' && class_code_id != '' && set_value == 1 ) {
        Rqbi_graduated_rate_save(exposure_from, exposure_to, exposure_rate, class_code_id, grad_rate_rowid, grad_rate_rid);
    } 


});

// ** Save Graduated Rate button 16-03-2021 @vaishnavi **//
function Rqbi_graduated_rate_save(exposure_from, exposure_to, exposure_rate, class_code_id, grad_rate_rowid, grad_rate_rid) {
    //var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    $.ajax({
        type: "post",
        url: laravel_url + "/Rqbi_graduated_rate_save",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': rqbi_id,
            'userid': userid,
            'exposure_from': exposure_from,
            'exposure_to': exposure_to,
            'exposure_rate': exposure_rate,
            'class_code_id': class_code_id,
            'grad_rate_rowid': grad_rate_rowid,
            'grad_rate_rid': grad_rate_rid
        },
        success: function (data) {

            /*remove accordion  highlight start*/
            $('.cbAccordHeader').removeAttr('style');
            $('.cbAccordHeader a').removeAttr('style');
            /*remove accordion  highlight end*/

            var obj = jQuery.parseJSON(data);
            var db_rid = obj.rid;
            var db_exposure_from = numberWithCommas(obj.exposure_from);
            var db_exposure_rate = numberWithCommas(obj.exposure_rate);
            var class_code_id = obj.class_code_id;
            if (obj.exposure_to != null) {
                var db_exposure_to = numberWithCommas(obj.exposure_to);
                $('.ExposureTo_' + grad_rate_rowid).val('$ ' + db_exposure_to);
            } else {
                var db_exposure_to = "";
                $('.ExposureTo_' + grad_rate_rowid).val('');
            }

            $('.graduatedRow_' + grad_rate_rowid).attr('data-rid', db_rid);
            $('.ExposureFrom_' + grad_rate_rowid).val('$ ' + db_exposure_from);
            $('.ExposureRate_' + grad_rate_rowid).val('$ ' + db_exposure_rate);
            $('#class_code_id').val(class_code_id);
            $('#gradRatingAddRow_' + grad_rate_rowid).attr('data-rid', db_rid);
            $('#gradRatingDelRow_' + grad_rate_rowid).attr('data-rid', db_rid);
            if ($('#show_exposure_greater_' + grad_rate_rowid).css('display') == 'block') {
                $('.show_exposure_to_max_valdtn').css("display", "none");
                $('.gradRatingAddRow').addClass('disabled');
            } else {
                $('.gradRatingAddRow').removeClass('disabled');
            }
            $('.removeRow').addClass('disabled');
            var last_row_id = $('tr.graduatedRow:last').attr('data-rowid');
            if (last_row_id != 1 && last_row_id != 0) {
                $('#gradRatingDelRow_1').remove();
                $('#gradRatingDelRow_' + last_row_id).removeClass('disabled');
            }
        },
        error: function () {
            new PNotify({
                title: 'Error',
                text: 'Getting error',
                delay: 1500,
                type: 'error'
            });
        },
        complete: function () {}
    });
}

// ** Retrieve Graduated Rate button 17-03-2021 @vaishnavi **//
function retrive_graduated_rating(action) {
    //var accid = localStorage.getItem('accid');
    var get_rqbi_id = $('#rqbiQuoteVersion').val();
    $.ajax({
        type: "post",
        url: laravel_url + "/retrive_graduated_rating",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': get_rqbi_id
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data);
            var retrive_value = '';
            if (obj.count == 0) {
                var rowid = 1;

                retrive_value += '<tr class="graduatedRow graduatedRow_' + rowid + '" data-rowId="' + rowid + '">';

                retrive_value += '<td class="pl-3 text-left expfromVal_' + rowid + '"> <div class="txttooltip expfrom_value_' + rowid + '"><input type="text" class="form-control ExposureFrom ExposureFrom_' + rowid + '" name="exposurefrom_' + rowid + '" id="exposurefrom_' + rowid + '" value="" disabled=""></div><div class="show_exposurefrom_error" id="show_exposurefrom_error_' + rowid + '" style="display:none;text-align:center;color:red;"></div><div class="show_exposure_from_max_valdtn show_exposure_from_max_valdtn_' + rowid + '"  style="display:none;text-align:center;color:red;">Invalid</div></td>';

                retrive_value += '<td class="pl-3 text-left"><div class="txttooltip"><input type="text" class="gradExpLabel form-control mt-2 mr-2 mb-2 gradExpEditInput gradExpEditInput_' + rowid + ' ExposureTo ExposureTo_' + rowid + '" data-rowId="' + rowid + '" name="gradExpEditInput_' + rowid + '" id="gradExpEditInput_' + rowid + '" value="" disabled=""></div><div class="show_exposure_greater" id="show_exposure_greater_' + rowid + '" style="display:none; text-align: left;">Should be greater than Exposure From Value</div><div class="show_exposure_to_max_valdtn show_exposure_to_max_valdtn_' + rowid + '"  style="display:none;text-align:left;">Invalid</div></td>';

                retrive_value += '<td class="pl-3 text-left"><div class="txttooltip"><input type="text" class="gradRateLabel form-control mt-2 mr-2 mb-2 gradRateEditInput gradRateEditInput_' + rowid + ' ExposureRate ExposureRate_' + rowid + '" data-rowId="' + rowid + '" name="gradRateEditInput_' + rowid + '" id="gradRateEditInput_' + rowid + '" value="" disabled=""></div></td>';

                retrive_value += '<td class="text-left graduate_actions"><button id="gradRatingAddRow_' + rowid + '" type="button" data-rowid="' + rowid + '" class="btn btn-sm btn-primary ml-1 cbAddTier gradRatingAddRow disabled"><i class="fa fa-plus-circle" aria-hidden="true"></i></button><button type="button" id="gradRatingDelRow_' + rowid + '" class="btn btn-sm btn-danger removeRow disabled" data-rowId="' + rowid + '" data-rid="0" data-html="true" data-toggle="tooltip" data-original-title="<em>Remove</em>"><i class="fa fa-trash" aria-hidden="true"></i></button></td></tr>';

                $("#appendRow").html(retrive_value);
                $('.AddGraduatedRating').removeClass('disabled');
                $('.AddGraduatedRating').removeClass('enable_grad_rating');
                $(".GradRatingTbody").hide();

            } else {
                var get_graduated_loc = new Array();

                for (var i in obj.data) {

                    // var a = parseInt(i);
                    // var b = parseInt(1);
                    // var grad_rowid = a + b;
                    var grad_rowid = parseInt(i) + 1;

                    retrive_value += '<tr class = "graduatedRow graduatedRow_' + grad_rowid + '" data-rowId="' + grad_rowid + '" data-rid="' + obj.data[i].rid + '">';

                    retrive_value += '<td class="pl-3 text-left expfromVal_' + grad_rowid + '"> <div class="txttooltip expfrom_value_' + grad_rowid + '"><input type="text" class="form-control ExposureFrom ExposureFrom_' + grad_rowid + '" name="exposurefrom_' + grad_rowid + '" id="exposurefrom_' + grad_rowid + '" value="" disabled="disabled"></div><div class="show_exposurefrom_error" id="show_exposurefrom_error_' + grad_rowid + '" style="display:none;text-align:center;color:red;"> </div><div class="show_exposure_from_max_valdtn show_exposure_from_max_valdtn_' + grad_rowid + '" style="display:none;text-align:center;color:red;"> Invalid</div></td>';

                    retrive_value += '<td class="pl-3 text-left"><div class="txttooltip"><input type="text" class="gradExpLabel form-control mt-2 mr-2 mb-2 gradExpEditInput gradExpEditInput_' + grad_rowid + ' ExposureTo ExposureTo_' + grad_rowid + '" data-rowId="' + grad_rowid + '" name="gradExpEditInput_' + grad_rowid + '" id="gradExpEditInput_' + grad_rowid + '" disabled="disabled"></div><div class="show_exposure_greater" id="show_exposure_greater_' + grad_rowid + '" style="display: none;text-align:left;color:red;">Should be greater than Exposure From Value</div><p class="ExposureToMandatoryMsg_' + grad_rowid + '"></p><div class="show_exposure_to_max_valdtn show_exposure_to_max_valdtn_' + grad_rowid + '" style="display:none;text-align:left;">Invalid</div></td>';

                    retrive_value += '<td class="pl-3 text-left"><div class="txttooltip"><input type="text" class="gradRateLabel form-control mt-2 mr-2 mb-2 gradRateEditInput gradRateEditInput_' + grad_rowid + ' ExposureRate ExposureRate_' + grad_rowid + '" data-rowId="' + grad_rowid + '" name="gradRateEditInput_' + grad_rowid + '" id="gradRateEditInput_' + grad_rowid + '"  disabled="disabled"></div><p class="mb-1 ExposureRateMandatoryMsg_' + grad_rowid + '"></p></td>';
                    
                    retrive_value += '<td class="text-left graduate_actions"><button id="gradRatingAddRow_' + grad_rowid + '" type="button" data-rowid="' + grad_rowid + '" class="btn btn-sm btn-primary ml-1 cbAddTier gradRatingAddRow disabled"><i class="fa fa-plus-circle" aria-hidden="true"></i></button><button type="button" id="gradRatingDelRow_' + grad_rowid + '" class="btn btn-sm btn-danger removeRow disabled" data-rowId="' + grad_rowid + '" data-rid="' + obj.data[i].rid + '"  data-html="true" data-toggle="tooltip" data-original-title="<em>Remove</em>"><i class="fa fa-trash" aria-hidden="true"></i></button> </td></tr>';

                    retrive_value += '</tr>';

                    var data = {};
                    data.rowid = grad_rowid;
                    data.exposure_from = numberWithCommas(obj.data[i].casting_exposurefrom);
                    data.exposure_rate = numberWithCommas(obj.data[i].exposure_rate.toFixed(2));
                    if (obj.data[i].casting_exposureto != "" && obj.data[i].casting_exposureto != null) {
                        data.exposure_to = numberWithCommas(obj.data[i].casting_exposureto);
                    } else {
                        data.exposure_to = 0;
                    }

                    get_graduated_loc.push(data);
                    $("#appendRow").html(retrive_value);
                }

                setTimeout(function () {
                    $(".AddGraduatedRating").click();
                    $(".GradRatingTbody").show();
                    $('.AddGraduatedRating').addClass('disabled');
                    $('.AddGraduatedRating').addClass('enable_grad_rating');
                }, 1000);

                var json_com_Array = JSON.stringify(get_graduated_loc);

                $.each(JSON.parse(json_com_Array), function () {

                    var myrowid = this.rowid;
                    var exposure_from = this.exposure_from;
                    var exposure_to = this.exposure_to;
                    var exposure_rate = this.exposure_rate;
                    var class_code_id = this.class_code_id;
                    var preceding_rowid = parseInt(myrowid) - 1;

                    $('.ExposureFrom_' + myrowid).val('$ ' + exposure_from);
                    $('.ExposureRate_' + myrowid).val('$ ' + exposure_rate);

                    exposure_from = exposure_from.replace(/,/g, '');

                    if (exposure_to != 0) {
                        $('.ExposureTo_' + myrowid).val('$ ' + exposure_to);
                        exposure_to = exposure_to.replace(/,/g, '');
                    } else {
                        $('.ExposureTo_' + myrowid).val('');
                    }

                    $('#gradRatingDelRow_1').remove();
                    $('#gradRatingAddRow_' + myrowid).removeClass('disabled');
                    $("#rowId").val(myrowid);
                    $("#class_code_id").val(class_code_id);
                    var last_row_id = $('tr.graduatedRow:last').attr('data-rowid');
                    if (last_row_id > 1) {
                        $('.removeRow').addClass('disabled');
                        $('#gradRatingDelRow_1').remove();
                        $('#gradRatingDelRow_' + last_row_id).removeClass('disabled');
                    }
                });


                $('#gradRatingAddRow_' + obj.count).removeClass('disabled');

            }
            
            menu_permission();

        },
        error: function () {
            new PNotify({
                title: 'Error',
                text: 'Getting error',
                delay: 1500,
                type: 'error'
            });
        },
        complete: function () {
            var rowId = $('#rowId').val();
            if (rowId > 1) {
                if (action == "edit_grad_rate") {
                    $('.ExposureTo').removeAttr('disabled');
                    $('.ExposureRate').removeAttr('disabled');
                    $('.ExposureFrom').removeAttr('disabled');
                    $('.ExposureFrom').addClass('redBorder');
                    $('.ExposureTo').addClass('redBorder');
                    $('.ExposureTo_1').removeClass('redBorder');
                    $('.ExposureFrom_1').removeClass('redBorder');
                    $('.ExposureTo_1').prop('disabled', 'false');
                    $('.ExposureFrom_1').prop('disabled', 'true');
                    $('.ExposureRate_1').prop('disabled', 'true');
                    $('.gradRatingAddRow').addClass('disabled');
                    $('.classbuildGraduatedRating').addClass('redBorder');
                }

                Error_validation_retrieve();
            } else {
                $('.modify_exposure_rate').css('display', 'none');
                $('.classbuildGraduatedRating').removeClass('redBorder');
            }
        }
    });

}

function Error_validation_retrieve() {
    var rowId = $('#rowId').val();
    var from_valid = 0;
    var to_valid = 0;
    for (var i = 2; i <= rowId; i++) {
        var Exposure_from = $('.ExposureFrom_' + i).val().replace(' ', '').replace('$', '').replace(/,/g, '');
        var Exposure_to = $('.ExposureTo_' + i).val().replace(' ', '').replace('$', '').replace(/,/g, '');
        var Exposure_Rate = $('.ExposureRate_' + i).val().replace(' ', '').replace('$', '').replace(/,/g, '');

        var preceding_i = parseInt(i) - 1;
        var preceding_Exposure_to = $('.ExposureTo_' + preceding_i).val().replace(' ', '').replace('$', '').replace(/,/g, '');    
        var expfrom_length_valid = (Exposure_from).length;
        var expto_length_valid = (Exposure_to).length;;

        if(preceding_Exposure_to != ""){            
            var current_Exposure_from = BigInt(preceding_Exposure_to)+BigInt(1);
        } else {
            var current_Exposure_from = "";
        }

        if (expfrom_length_valid > 20) {
            from_valid = 0;
            $('.show_exposure_from_max_valdtn_' + i).css("display", "block");
            $('#show_exposurefrom_error_' + i).css("display", "none");
            $('#show_exposure_greater_' + i).css("display", "none");
            $('.ExposureFrom_' + i).removeattr('disabled', 'disabled');

        } else if (Exposure_from != "" && Exposure_from == current_Exposure_from) {
            $('.ExposureFrom_' + i).attr('disabled', 'disabled');
            if(Exposure_to != ""){
                $('.ExposureTo_' + i).attr('disabled', 'disabled');
            }
            $('#show_exposurefrom_error_' + i).css("display", "none");
            $('#show_exposurefrom_error_' + i).empty();
            $('.gradRatingAddRow').removeClass('disabled');
            from_valid = 1;

        } else {
            $('.ExposureFrom_' + i).removeAttr('disabled');
            $('.Exfrom_validposureTo_' + i).removeAttr('disabled');
            $('.ExposureRate_' + i).removeAttr('disabled');
            if ($('.show_exposure_from_max_valdtn').is(":visible") == false && $('.show_exposure_to_max_valdtn').is(":visible") == false) {            
                $('#show_exposurefrom_error_' + i).css("display", "block");
                $('#show_exposurefrom_error_' + i).empty().append("Must be " + numberWithCommas('$ ' + current_Exposure_from));
            } else {
                $('.show_exposurefrom_error').css("display", "none"); 
            }
            $('.gradRatingAddRow').addClass('disabled');
            from_valid = 0;
        }
        if (Exposure_to != "") {
            if (expto_length_valid > 20){
                to_valid = 0;
                $('.show_exposure_to_max_valdtn_' + i).css("display", "block");
                $('#show_exposure_greater_' + i).css("display", "none");
                $('#show_exposurefrom_error_' + i).css("display", "none");

            } else if (BigInt(Exposure_to) > BigInt(Exposure_from)) {
                if (Exposure_from != ""){
                    $('.ExposureFrom_' + i).attr('disabled', 'disabled');
                }
                $('.ExposureTo_' + i).attr('disabled', 'disabled');
                $('#show_exposure_greater_' + i).css("display", "none");
                to_valid = 1;

            } else if (BigInt(Exposure_to) < BigInt(Exposure_from)) {
                $('.ExposureTo_' + i).addClass('redBorder');
                $('.ExposureRate_' + i).removeAttr('disabled');
                $('.ExposureTo_' + i).removeAttr('disabled');
                if ($('.show_exposure_from_max_valdtn').is(":visible") == false && $('.show_exposure_to_max_valdtn_').is(":visible") == false) { 
                    $('#show_exposure_greater_' + i).css("display", "block");
                    $('.show_exposure_to_max_valdtn_' + i).css("display", "none");
                }
                to_valid = 0;
            } else if(BigInt(Exposure_to) == BigInt(Exposure_from)) {
                $('.ExposureTo_' + i).addClass('redBorder');
                $('.ExposureRate_' + i).removeAttr('disabled');
                $('.ExposureTo_' + i).removeAttr('disabled');
                if ($('.show_exposure_from_max_valdtn').is(":visible") == false && $('.show_exposure_to_max_valdtn').is(":visible") == false) { 
                    $('#show_exposure_greater_' + i).css("display", "block");
                    $('.show_exposure_to_max_valdtn_' + i).css("display", "none");
                }
                to_valid = 0;
            } 

        } else if (Exposure_to == "") {
            var last_row = $('.GradRatingTbody tr.graduatedRow:last').attr('data-rowid');
            if (last_row > 1) {
                if(last_row == i){                    
                    $('.ExposureTo_' + i).removeClass('redBorder');
                    $('#show_exposure_greater_' + rowId).css("display", "none");
                    to_valid = 1;
                } else {
                    to_valid = 0;
                }
            } 
        }

        if(Exposure_Rate !=''){
            //$('.ExposureRate_' + i).attr('disabled', 'disabled');
            $('.ExposureRate_' + i).removeClass('redBorder');
            rate_valid = 1;
        }else{
             rate_valid = 0;
        }

        if (from_valid == 1 && to_valid == 1 && rate_valid==1) {
            $('.ExposureFrom_' + i).attr('disabled', 'disabled');
            $('.ExposureTo_' + i).attr('disabled', 'disabled');
            if ($('.ExposureFrom_' + i).is(':disabled') == true && $('.ExposureTo_' + i).is(':disabled') == true) {
                $('.ExposureRate_' + i).attr('disabled', 'disabled');
            } else {
                $('.ExposureRate_' + i).removeAttr('disabled');
            }
            $('.gradRatingAddRow').removeClass('disabled');
            $('.ExposureFrom_' + i).removeClass('redBorder');
            $('.ExposureTo_' + i).removeClass('redBorder');

        } else if ((from_valid == 0 && to_valid == 1 && rate_valid==1)||(from_valid == 0 && to_valid == 0 && rate_valid==1)||(from_valid == 0 && to_valid == 1 && rate_valid==0)) {

            $('.ExposureFrom_' + i).removeAttr('disabled');
            $('.ExposureTo_' + i).removeAttr('disabled');
            $('.ExposureRate_' + i).removeAttr('disabled');
            $('.gradRatingAddRow').addClass('disabled');
            $('.ExposureFrom_' + i).addClass('redBorder');
            $('.ExposureTo_' + i).addClass('redBorder');

        } else if (from_valid == 1 && to_valid == 0 && rate_valid==1) {

            $('.ExposureTo_' + i).removeAttr('disabled');
            //$('.ExposureRate_' + i).removeAttr('disabled');
            $('.gradRatingAddRow').addClass('disabled');
            $('.ExposureFrom_' + i).removeClass('redBorder');
            $('.ExposureTo_' + i).addClass('redBorder');

        } else if (from_valid == 0 && to_valid == 0 && rate_valid==1) {

            $('.ExposureFrom_' + i).removeAttr('disabled');
            $('.ExposureTo_' + i).removeAttr('disabled');
            $('.ExposureRate_' + i).removeAttr('disabled');
            $('.gradRatingAddRow').addClass('disabled');
            $('.ExposureFrom_' + i).addClass('redBorder');
            $('.ExposureTo_' + i).addClass('redBorder');


        }else if(from_valid == 1 && to_valid == 0 && rate_valid==0){

            $('.ExposureTo_' + i).removeAttr('disabled');
            $('.ExposureRate_' + i).removeAttr('disabled');
            $('.gradRatingAddRow').addClass('disabled');
            $('.ExposureFrom_' + i).removeClass('redBorder');
            $('.ExposureTo_' + i).addClass('redBorder');

        }else if(from_valid == 1 && to_valid == 1 && rate_valid==0){

            $('.gradRatingAddRow').addClass('disabled');
            //$('.ExposureTo_' + i).addClass('redBorder');
            $('.ExposureFrom_' + i).removeClass('redBorder');

        }else {

            $('.ExposureFrom_' + i).removeAttr('disabled');
            $('.ExposureTo_' + i).removeAttr('disabled');
            $('.ExposureRate_' + i).removeAttr('disabled');
            $('.gradRatingAddRow').addClass('disabled');
            $('.ExposureFrom_' + i).addClass('redBorder');
            $('.ExposureTo_' + i).addClass('redBorder');
        }
    }

    $('.ExposureTo_' + rowId).removeAttr('disabled');
    $('.ExposureRate_' + rowId).removeAttr('disabled');
    $('.ExposureFrom_1').attr('disabled', 'disabled');
    $('.ExposureTo_1').attr('disabled', 'disabled');
    $('.ExposureRate_1').attr('disabled', 'disabled');

    var error_msg = $('.GradRatingTbody').find('tr td input').hasClass('redBorder');
    if (error_msg != false) {
        $('.classbuildGraduatedRating').addClass('redBorder');
        if (rowId > 1) {
            $('.modify_exposure_rate').css('display', 'block');
            $('.classbuildGraduatedRating').addClass('redBorder');
        }
    } else {
        $('.classbuildGraduatedRating').removeClass('redBorder');
        $('.modify_exposure_rate').css('display', 'none');
        $('.modify_exposure_rate p').empty();
    }

}

// ** Delete Graduated Rate button 17-03-2021 @vaishnavi **//

function delete_graduated_rating(rid) {

    //var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    $.ajax({
        type: "post",
        url: laravel_url + "/delete_graduated_rating",
        data: {
            'accid': accid,
            'com_id': com_id,
            'del_id': rid,
            'userid': userid
        },

        success: function (data) {

        },
        error: function () {
            new PNotify({
                title: 'Error',
                text: 'Getting error',
                delay: 1500,
                type: 'error'
            });
        },
        complete: function () {
            retrive_graduated_rating('null');
        }

    });

}
// ** Delete Graduated Rate button 17-03-2021 @vaishnavi **//

function get_gradrat_quote() {

    //var accid = localStorage.getItem('accid');
    var get_rqbi_id = $('#rqbiQuoteVersion').val();

    $.ajax({
        type: "post",
        url: laravel_url + "/get_gradrat_quote",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': get_rqbi_id
        },

        success: function (data) {
            if (data == "" || data == 0) {
                $('.cbGraduatedTableDiv').hide();
                $('.classbuildGraduatedRating').addClass('disabled');
                $('.Add_GraduatedRating_div').css('display', 'none');
                $('.modify_exposure_rate').css('display', 'none');
            } else {
                $('.cbGraduatedTableDiv').show();
                $('.classbuildGraduatedRating').removeClass('disabled');
                $('.Add_GraduatedRating_div').css('display', 'block');
                retrive_graduated_rating();

            }
        },
        error: function () {
            new PNotify({
                title: 'Error',
                text: 'Getting error',
                delay: 1500,
                type: 'error'
            });
        },
        complete: function () {}

    });

}

function reset_graduated_rating() {
    //var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    $.ajax({
        type: "post",
        url: laravel_url + "/reset_graduated_rating",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': rqbi_id,
            'userid': userid
        },

        success: function (data) {},
        error: function () {
            new PNotify({
                title: 'Error',
                text: 'Getting error',
                delay: 1500,
                type: 'error'
            });
        },
        complete: function () {
            $('.cbGraduatedTableDiv').hide();
            $('.Add_GraduatedRating_div').hide();
            $('.AddGraduatedRating').removeClass('disabled');
            $('.AddGraduatedRating').removeClass('enable_grad_rating');
            $('.GradRatingTbody').hide();
            $('#rowId').val('');
            $('#class_code_id').val('');
            $('.classbuildGraduatedRating').removeClass('redBorder');
            $('.modify_exposure_rate').css('display', 'none');
            $('.modify_exposure_rate p').empty();
            disable_graduated_rating('null');
        }

    });
}

$(document).on('click', '.ResetGraduatedRating', function () {
    var rowId = $('#rowId').val();
    var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');
    var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');
    if (enable_grad_rating == true || gr_disabled == true) {
        $('.graduatedresetPopup').trigger('click');
    }
});

$(document).on("click", "#graduatedresetPopup_ok, #compositeaddPopup_ok, #cbaddPopup_ok, #included_ok, #ifany_ok, #cr_uncheck_Popup_ok", function () {
    var rowId = $('#rowId').val();
    var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');
    var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');
    var get_input_value = $(this).attr('id');

    if (enable_grad_rating == true || gr_disabled == true) {
        reset_graduated_rating();
    }

    if (get_input_value == "included_ok") {
        var ti_rowid = $('.includedPopup').attr('data-rowid');
        var rid = $('.includedPopup').attr('data-rid');
        var ti_includedd = $('.includedPopup').attr('data-value');
        included_update_and_reset(ti_rowid, rid, ti_includedd);
        $('.includedPopup').removeAttr('data-rowid');
        $('.includedPopup').removeAttr('data-rid');
        $('.includedPopup').removeAttr('data-value');

    } else if (get_input_value == "ifany_ok") {
        var ti_rowid = $('.ifanyPopup').attr('data-rowid');
        var rid = $('.ifanyPopup').attr('data-rid');
        var ti_ifanyy = $('.ifanyPopup').attr('data-value');
        var checkstatus = $('.ifanyPopup').attr('data-checkstatus');
        ifany_update_and_reset(ti_rowid, rid, ti_ifanyy, checkstatus);
        $('.ifanyPopup').removeAttr('data-rowid');
        $('.ifanyPopup').removeAttr('data-rid');
        $('.ifanyPopup').removeAttr('data-value');
    }
});


function graduated_rating_exposure_edit(get_type_name) {
    //var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    var get_rqbi_id = $('#rqbiQuoteVersion').val();
    var rid = $('.graduatedRow_1').attr('data-rid');
    var rowid = $('#rowId').val();
    var edit_flag = 0;
    var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');
    var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');

    $.ajax({
        type: "post",
        url: laravel_url + "/graduated_rating_exposure_edit",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': get_rqbi_id,
            'get_type_name': get_type_name,
            'rid': rid,
            'userid': userid
        },

        success: function (res) {
            if (res != "") {
                if (res['exposure'] != "") {
                    var ExposureTo = numberWithCommas(res['exposure']);
                }
                if (res['exposurerate'] != "") {
                    var ExposureRate = numberWithCommas(res['exposurerate']);
                }
                if (enable_grad_rating == true && gr_disabled == true) {
                    if (ExposureTo != 0 && ExposureRate != 0) {
                        if (rowid > 1) {
                            $('.modify_exposure_rate').css('display', 'block');
                            $('.modify_exposure_rate p').empty().text('Please modify the graduated rating, as the exposure/final rate has been modified');
                            $('.classbuildGraduatedRating').addClass('redBorder');
                            $('.GradRatingTbody').show();
                        } else {
                            $('.modify_exposure_rate').css('display', 'none');
                            $('.modify_exposure_rate p').empty();
                            $('.classbuildGraduatedRating').removeClass('redBorder');
                        }
                        var rid = $('.graduatedRow_1').attr('data-rid');
                        Exposure_To_Save = (ExposureTo).replace('$', '').replace(/,/g, '');
                        Exposure_Rate_Save = (ExposureRate).replace('$', '').replace(/,/g, '');
                        edit_flag = 1;
                        $('.ExposureTo_1').val(numberWithCommas('$ ' + ExposureTo));
                        $('.ExposureRate_1').val(numberWithCommas('$ ' + ExposureRate));

                    } else if (ExposureTo == 0 && ExposureRate == 0) {
                        $('.modify_exposure_rate').css('display', 'block');
                        $('.modify_exposure_rate p').empty().text('Impact in Graduated rating: Please fill mandatory fields, the exposure/final rate cannot be empty');
                        $('.classbuildGraduatedRating').addClass('redBorder');
                    }

                } else {
                    $('.modify_exposure_rate').css('display', 'none');
                    $('.modify_exposure_rate p').empty();
                    $('.classbuildGraduatedRating').removeClass('redBorder');
                }
            } else {
                $('.modify_exposure_rate').css('display', 'none');
                $('.modify_exposure_rate p').empty();
                $('.classbuildGraduatedRating').removeClass('redBorder');
            }


        },
        error: function () {
            new PNotify({
                title: 'Error',
                text: 'Getting error',
                delay: 1500,
                type: 'error'
            });
        },
        complete: function () {

            if (edit_flag == 1) {
                retrive_graduated_rating('edit_grad_rate');
            }

        }

    });
}

$(document).on("click", "#cr_uncheck_Popup_ok", function () {
    var compo_rate_rowid = $('.cr_uncheck_Popup').attr('data-rowid');
    var compo_rate_rid = $('.cr_uncheck_Popup').attr('data-rid');
    $('.cr_uncheck_Popup').removeAttr('data-rowid');
    $('.cr_uncheck_Popup').removeAttr('data-rid');
    setlocation_basedon_classcode(compo_rate_rowid);
    get_MainMulticode_classcode(compo_rate_rowid);
    get_premium_from_cbclasscode(compo_rate_rowid);
    Rqbi_compostive_rate_save(compo_rate_rowid, compo_rate_rid);
});

$(document).on("click", "#cr_uncheck_Popup_cancel", function () {
    var compo_rate_rowid = $('.cr_uncheck_Popup').attr('data-rowid');
    var compo_rate_rid = $('.cr_uncheck_Popup').attr('data-rid');
    $('.cr_uncheck_Popup').removeAttr('data-rid');
    $('.cr_uncheck_Popup').removeAttr('data-rowid');
    retrive_compostive_rating();
});

$(document).on("click", "#cbaddPopup_cancel, #cbrow_delete_cancel", function () {
    rqbi_class_code_retrive(com_id, accid);
});


$(document).on("click", "#included_cancel", function () {
    var ti_rowid = $('.includedPopup').attr('data-rowid');
    $('input[type="checkbox"]#rqbiIncluded_' + ti_rowid).prop('checked', false);
    $('.includedPopup').removeAttr('data-rowid');
    $('.includedPopup').removeAttr('data-rid');
    $('.includedPopup').removeAttr('data-value');
    $('#rqbiFinalRate_' + ti_rowid).removeAttr("disabled");
    $('#rqbiPremium_' + ti_rowid).removeAttr("disabled");
    $('#rqbiCreditDebit_' + ti_rowid).removeAttr("disabled");
    $('#rqbiExposure_' + ti_rowid).removeAttr("disabled");

});


$(document).on("click", "#ifany_cancel", function () {
    var ti_rowid = $('.ifanyPopup').attr('data-rowid');
    $('input[type="checkbox"]#rqbiIfany_' + ti_rowid).prop('checked', false);
    $('.ifanyPopup').removeAttr('data-rowid');
    $('.ifanyPopup').removeAttr('data-rid');
    $('.ifanyPopup').removeAttr('data-checkstatus');
    $('.ifanyPopup').removeAttr('data-value');
    $('#rqbiPremium_' + ti_rowid).removeAttr("disabled");
    $('#rqbiExposure_' + ti_rowid).removeAttr("disabled");
    $('#rqbiFinalRate_' + ti_rowid).removeAttr("disabled");
    $('#rqbiCreditDebit_' + ti_rowid).removeAttr("disabled");
});


function coverage_based_delete_grad_rat(del_coverage_ret, source) {
    //var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    var exposure = $('.ExposureTo_1').val();

    if (exposure != "") {

        $.ajax({
            type: "post",
            cache: false,
            url: laravel_url + "/coverage_based_delete_grad_rat",
            data: {
                'accid': accid,
                'com_id': com_id,
                'userid': userid,
                'coverage': del_coverage_ret,
                'source': source
            },

            success: function (data) {

            },
            error: function () {

            },
            complete: function () {
                retrive_graduated_rating();
            }

        });

    }

}