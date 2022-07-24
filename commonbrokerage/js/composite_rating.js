// ** Compostive Rating section start 30-12-2020 @kabilan **//

$(document).on('keyup', '.compositeLocation, .compositeExposure, .compositeExpBasis, .compositeDevRate, .compositepremium ', function () {

    if ($(this).val() != '') {
        $(this).removeClass('redBorder');
    } else {
        $(this).addClass('redBorder');
    }

});

$(document).on('change', '.multipleClasscodeDiv .compositeMultiCcode', function () {
    if ($(this).val() != '') {
        $('.multipleClasscodeDiv').find('.btn-group .multiselect.dropdown-toggle').removeClass('redBorder');
        $('.compositeLocation').removeClass('redBorder');
    } else {
        $('.multipleClasscodeDiv').find('.btn-group .multiselect.dropdown-toggle').addClass('redBorder');
        $('.compositeLocation').addClass('redBorder');
    }
});

$(document).on('change', '.compositeLocation ', function () {

    if ($(this).val() != '') {
        $(this).removeClass('redBorder');
    } else {
        $(this).addClass('redBorder');
    }
});

$(document).on('change', '.compositeMainCcode ', function () {

    if ($(this).val() != '') {
        $(this).removeClass('redBorder');
        $('.compositepremium').removeClass('redBorder');
    } else {
        $(this).addClass('redBorder');
    }
});


// ** Disable Compostive Rate button 30-12-2020 @kabilan **//

function disable_compostive_rating() {
    //var accid = localStorage.getItem('accid');

    $.ajax({
        type: "post",
        cache: false,
        url: laravel_url + "/disable_compostive_rating",
        data: {
            'accid': accid,
            'com_id': com_id
        },
        success: function (data) {
            if (data < 1) {
                $("#cbCompRating").addClass("disabled");
                $('.compositeRateDiv').css('display', 'none');
            } else {
                $("#cbCompRating").removeClass("disabled");
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

        }
    });
}

// ** Get Class Code - Compostive Rate button 30-12-2020 @kabilan **//

function get_classcode_compostive_rating(rowid) {

    //var accid = localStorage.getItem('accid');

    $.ajax({
        type: "post",
        cache: false,
        url: laravel_url + "/get_classcode_rating",
        data: {
            'accid': accid,
            'com_id': com_id
        },
        success: function (data) {
            var datas = jQuery.parseJSON(data);
            if (rowid) {
                $('.compositeMultiCcode_' + rowid).multiselect('destroy');
                $('.compositeMultiCcode_' + rowid).find('option').remove();
                $('.compositeMultiCcode_' + rowid).append(datas.multiselect);

            } else {
                $('.compositeMultiCcode').multiselect('destroy');
                $('.compositeMultiCcode').find('option').remove();
                $('.compositeMultiCcode').append(datas.multiselect);

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
            if (rowid) {
                $('.compositeMultiCcode_' + rowid).multiselect({
                    includeSelectAllOption: true,
                    nonSelectedText: 'Please Select'
                });
            } else {
                $('.compositeMultiCcode').multiselect({
                    includeSelectAllOption: true,
                    nonSelectedText: 'Please Select'
                });
            }
            rqbi_responsive();
        }
    });

}

// ** Get Location - Compostive Rate button 30-12-2020 @kabilan **//

function get_location_compostive_rating(rowid) {

    //var accid = localStorage.getItem('accid');

    $.ajax({
        type: "post",
        cache: false,
        url: laravel_url + "/get_location_compostive_rating",
        data: {
            'accid': accid,
            'com_id': com_id
        },
        success: function (data) {
            if (rowid) {
                $('#compositeLocation_' + rowid).find('option').remove();
                $('#compositeLocation_' + rowid).append(data);
            } else {
                $('#compositeLocation').find('option').remove();
                $('#compositeLocation').append(data);
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

        }
    });

}

//** Get Rqbi Premium basis 01-01-2021 @kabilan **//

function get_premium_basis(rowid) {

    //var accid = localStorage.getItem('accid');

    $.ajax({
        type: "post",
        cache: false,
        url: laravel_url + "/get_premium_basis",
        data: {
            'accid': accid,
            'com_id': com_id
        },
        success: function (data) {
            $(".compositeExpBasis_" + rowid).find('option').remove();
            $(".compositeExpBasis_" + rowid).append(data);
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

        }
    });

}

//** Get Rqbi Compostive Rating Common Save 01-01-2021 @kabilan **//

$(document).on('focusout', '.compositeExposure, .compositeDevRate, .compositepremium', function () {
    var compo_rate_rowid = $(this).attr('data-rowid');
    var compo_rate_rid = $(this).attr('data-rid');
    var exposure = $('.compositeExposure_' + compo_rate_rowid).val();
    var dev_rate = $('.compositeDevRate_' + compo_rate_rowid).val();
    var premium = $('.compositepremium_' + compo_rate_rowid).val();
    var division_factor = $('option:selected', '.compositeExpBasis_' + compo_rate_rowid).attr('data-division_factor');
    if(exposure == 0){
        $('.compositeExposure_' + compo_rate_rowid).addClass('redBorder');
        $('.Invalid_compositeExposure_' + compo_rate_rowid).show();
        $('.Invalid_compositeExposure_' + compo_rate_rowid).css('color','red');
    } else if (exposure == "" && division_factor != undefined) {        
        $('.compositeExposure_' + compo_rate_rowid).removeClass('redBorder');
        $('.Invalid_compositeExposure_' + compo_rate_rowid).hide();
        if (dev_rate != "" || premium != "" || division_factor != "") {
            comp_exposure_calulation(premium, division_factor, compo_rate_rowid, dev_rate, compo_rate_rid);
        }
    } else {
        $('.compositeExposure_' + compo_rate_rowid).removeClass('redBorder');
        $('.Invalid_compositeExposure_' + compo_rate_rowid).hide();
    }
    if (dev_rate == "" && division_factor != undefined) {
        if (exposure != "" || premium != "" || division_factor != "") {
            comp_devrate_calulation(exposure, premium, division_factor, compo_rate_rowid, compo_rate_rid);
        }
    }
    if (premium == "" && division_factor != undefined) {
        if (exposure != "" || dev_rate != "" || division_factor != "") {
            comp_prerate_calulation(exposure, division_factor, compo_rate_rowid, dev_rate, compo_rate_rid);
        }
    }
});

$(document).on('change', ' .compositeMultiCcode, .compositeLocation, .compositeExposure, .compositeExpBasis, .compositeMainCcode, .compositeDevRate, .compositepremium', function () {
    //var accid = localStorage.getItem('accid');
    var compo_rate_rowid = $(this).attr('data-rowid');
    var compo_rate_rid = $(this).attr('data-rid');
    var cb_rid = $('.compositeMultiCcode_' + compo_rate_rowid).val();
    var compostive_class_code_value = "";
    var compostive_class_code = [];
    $(".compositeMultiCcode_" + compo_rate_rowid + " option:selected").each(function () {
        compostive_class_code_value = compostive_class_code.push($(this).attr('data-classcode'));
    });

    var uncheck = 0;

    var name = $(this).attr('name');
    if (name == "compositeMultiCcode_" + compo_rate_rowid) {
        /*graduated rating enabled check/uncheck popup*/
        var cbClasscode_array = [];
        var cbClasscode = "";
        var sel_class_codes = "";
        var sel_class_codes_array = [];
        var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');
        var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');

        if (enable_grad_rating == true || gr_disabled == true) {
            $(".rqbiExposure").each(function () {
                var value = $(this).val();
                if (value != '') {
                    var data_rowid = $(this).attr('data-rowid');
                    cbClasscode = cbClasscode_array.push($('.cbClasscode_' + data_rowid).val());
                }
            });

            $(".compositeMultiCcode_" + compo_rate_rowid + " option:selected").each(function () {
                var $this = $(this).val();
                if ($this.length) {
                    sel_class_codes = $(this).text();
                }
                sel_class_codes_array.push(sel_class_codes);
            });

            var difference = [];
            difference = $.grep(cbClasscode_array, (item) => $.inArray(item, sel_class_codes_array) === -1);
            var class_count = difference.length;
            if (class_count != 0) {
                $('.cr_uncheck_Popup').attr('data-rid', compo_rate_rid);
                $('.cr_uncheck_Popup').attr('data-rowid', compo_rate_rowid);
                $('.cr_uncheck_Popup').trigger('click');
                uncheck = 1;
            }
        }
        /*graduated rating enabled check/uncheck popup*/
    }

    if (uncheck == 0) {
        var composite_Location = $('.compositeLocation_' + compo_rate_rowid).val();
        var composite_Exposure = $('.compositeExposure_' + compo_rate_rowid).val();
        var composite_ExpBasis = $('.compositeExpBasis_' + compo_rate_rowid).val();
        var composite_MainCcode = $('.compositeMainCcode_' + compo_rate_rowid).val();
        var composite_premium = $('.compositepremium_' + compo_rate_rowid).val();
        var composite_division_factor = $('option:selected', '.compositeExpBasis_' + compo_rate_rowid).attr('data-division_factor');
        var not_Selected = $(".compositeMultiCcode_" + compo_rate_rowid + " option:not(:selected)").length;
        var dis_count = $(".compositeMultiCcode_" + compo_rate_rowid + " option[disabled = 'disabled']").length;
        var allSelected = (not_Selected - dis_count);

        if (allSelected == 0) {
            $('#compositeAddRow_' + compo_rate_rowid).addClass("disabled");
        }
        var com_change_val = $(this).attr('name');
        var changed_val = com_change_val.split("_");

        if (changed_val[0] == "compositeMultiCcode") {
            setlocation_basedon_classcode(compo_rate_rowid);
            get_MainMulticode_classcode(compo_rate_rowid);
            get_premium_from_cbclasscode(compo_rate_rowid);
        }

        /* if changed Exposure rate OR Basis rate*/
        if (changed_val[0] == "compositeExposure" || changed_val[0] == "compositeExpBasis" || changed_val[0] == "compositepremium") {
            if (composite_Exposure != '' && composite_premium != '' && composite_division_factor != undefined && compo_rate_rowid != undefined && compo_rate_rid != undefined) {
                comp_devrate_calulation(composite_Exposure, composite_premium, composite_division_factor, compo_rate_rowid, compo_rate_rid);
            }
        }

        var compositeDevRate = $('.compositeDevRate_' + compo_rate_rowid).val();

        /* if changed Developed rate */
        if (changed_val[0] == "compositeDevRate") {
            if (composite_Exposure != '' && composite_division_factor != undefined && compo_rate_rowid != undefined && compositeDevRate != '' && compositeDevRate != 0 && compo_rate_rid != undefined) {
                comp_prerate_calulation(composite_Exposure, composite_division_factor, compo_rate_rowid, compositeDevRate, compo_rate_rid);
                $('.cr_devprate_invalid_msg_' + compo_rate_rowid).hide();
                $('.compositeDevRate_' + compo_rate_rowid).removeClass('redBorder');
                return;
            } else if (compositeDevRate == 0) {         
                $('.compositeDevRate_' + compo_rate_rowid).addClass('redBorder');       
                $('.cr_devprate_invalid_msg_' + compo_rate_rowid).show();
                $('.cr_devprate_invalid_msg_' + compo_rate_rowid).css('color','red');
            }
        }

        /* if Update MultiCcode, Location and MainCcode */
        if (changed_val[0] == "compositeMultiCcode" || changed_val[0] == "compositeLocation" || changed_val[0] == "compositeMainCcode") {
            if (compostive_class_code && composite_Location && composite_Exposure && composite_ExpBasis) {
                Rqbi_compostive_rate_save(compo_rate_rowid, compo_rate_rid);
                return;
            }
        }
    }


});

function comp_devrate_calulation(composite_Exposure, composite_premium, composite_division_factor, compo_rate_rowid, compo_rate_rid) {
    var comp_division_factor = composite_division_factor;
    var comp_Exposure = composite_Exposure.replace(/[$,]/g, '');
    var comp_premium = composite_premium.replace(/[$,]/g, '');
    var dev_rate = (comp_premium / (comp_Exposure / composite_division_factor));
    dev_rate = dev_rate.toFixed(2);
    if (dev_rate == "Infinity" || isNaN(dev_rate) || dev_rate == 0.00 || dev_rate == 0) {
        $('.compositeDevRate_' + compo_rate_rowid).val(0);
        $('.compositeDevRate_' + compo_rate_rowid).addClass('redBorder');
        $('.cr_devprate_invalid_msg_' + compo_rate_rowid).show();
        $('.cr_devprate_invalid_msg_' + compo_rate_rowid).css('color','red');
    } else {
        $('.compositeDevRate_' + compo_rate_rowid).val(dev_rate);
        $('.compositeDevRate_' + compo_rate_rowid).removeClass('redBorder');
        $('.cr_devprate_invalid_msg_' + compo_rate_rowid).hide();
    }
    Rqbi_compostive_rate_save(compo_rate_rowid, compo_rate_rid);
}

function comp_prerate_calulation(composite_Exposure, composite_division_factor, compo_rate_rowid, compositeDevRate, compo_rate_rid) {
    var comp_DevRate = compositeDevRate.replace(/[$,]/g, '');
    var comp_Exposure = composite_Exposure.replace(/[$,]/g, '');
    if (compositeDevRate) {
        var composite_premium = ((comp_DevRate * comp_Exposure) / composite_division_factor);
        if (composite_premium == "Infinity" || isNaN(composite_premium)) {
            $('.compositepremium_' + compo_rate_rowid).val(0);
        } else {
            $('.compositepremium_' + compo_rate_rowid).val(numberWithCommas(Math.round(composite_premium)));
            $('.compositepremium_' + compo_rate_rowid).removeClass('redBorder');
        }
        Rqbi_compostive_rate_save(compo_rate_rowid, compo_rate_rid);

    }
}


function comp_exposure_calulation(composite_premium, composite_division_factor, compo_rate_rowid, compositeDevRate, compo_rate_rid) {
    var comp_DevRate = compositeDevRate.replace(/[$,]/g, '');
    var comp_premium = composite_premium.replace(/[$,]/g, '');

    if (compositeDevRate) {
        var composite_Exposure = ((comp_premium * composite_division_factor) / compositeDevRate);
        if (composite_Exposure == "Infinity" || isNaN(composite_Exposure)) {
            $('.compositeExposure_' + compo_rate_rowid).val(0);
            $('.compositeExposure_' + compo_rate_rowid).addClass('redBorder');
            $('.Invalid_compositeExposure_' + compo_rate_rowid).show();
            $('.Invalid_compositeExposure_' + compo_rate_rowid).css('color','red');
        } else {
            $('.compositeExposure_' + compo_rate_rowid).val(numberWithCommas(Math.round(composite_Exposure)));
            $('.compositeExposure_' + compo_rate_rowid).removeClass('redBorder');
            $('.Invalid_compositeExposure_' + compo_rate_rowid).hide();
        }
        Rqbi_compostive_rate_save(compo_rate_rowid, compo_rate_rid);
    }
}


//** Get Rqbi Compostive Rating Common Save 01-01-2021 @kabilan **//

function Rqbi_compostive_rate_save(compo_rate_rowid, compo_rate_rid) {

    var cb_rid = $('.compositeMultiCcode_' + compo_rate_rowid).val();
    var compostive_class_code = [];
    $(".compositeMultiCcode_" + compo_rate_rowid + " option:selected").each(function () {
        compostive_class_code.push($(this).attr('data-classcode'));
    });
    var composite_Location = $('.compositeLocation_' + compo_rate_rowid).val();
    var composite_Exposure = $('.compositeExposure_' + compo_rate_rowid).val().replace( /,/g,'');
    composite_Exposure = composite_Exposure.substring(0, 15);
    var composite_ExpBasis = $('.compositeExpBasis_' + compo_rate_rowid).val();
    var composite_MainCcode = $('.compositeMainCcode_' + compo_rate_rowid).val();
    var composite_premium = $('.compositepremium_' + compo_rate_rowid).val();
    var compositeDevRate = $('.compositeDevRate_' + compo_rate_rowid).val();

    //var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    if (compostive_class_code && composite_Location && composite_Exposure && composite_MainCcode && composite_ExpBasis && compositeDevRate && composite_premium) {

        $.ajax({
            type: "post",
            cache: false,
            url: laravel_url + "/Rqbi_compostive_rate_save",
            data: {
                'accid': accid,
                'com_id': com_id,
                'rqbi_id': rqbi_id,
                'compostive_class_code': compostive_class_code,
                'composite_Location': composite_Location,
                'composite_Exposure': composite_Exposure,
                'composite_ExpBasis': composite_ExpBasis,
                'composite_MainCcode': composite_MainCcode,
                'compositeDevRate': compositeDevRate,
                'userid': userid,
                'composite_premium': composite_premium,
                'compo_rate_rowid': compo_rate_rowid,
                'compo_rate_rid': compo_rate_rid,
                'data_cbrid': cb_rid
            },

            success: function (data) {
                /*remove accordion  highlight start*/
                $('.cbAccordHeader').removeAttr('style');
                $('.cbAccordHeader a').removeAttr('style');
                /*remove accordion  highlight end*/

                var obj = jQuery.parseJSON(data);
                var db_rid = obj.rid;
                $('.compRow_' + compo_rate_rowid).attr('data-rid', db_rid);
                $('.compositeMultiCcode_' + compo_rate_rowid).attr('data-rid', db_rid);
                $('.compositeLocation_' + compo_rate_rowid).attr('data-rid', db_rid);
                $('.compositeExposure_' + compo_rate_rowid).attr('data-rid', db_rid);
                $('.compositeExpBasis_' + compo_rate_rowid).attr('data-rid', db_rid);
                $('.compositeMainCcode_' + compo_rate_rowid).attr('data-rid', db_rid);
                $('.compositeDevRate_' + compo_rate_rowid).attr('data-rid', db_rid);
                $('.compositepremium_' + compo_rate_rowid).attr('data-rid', db_rid);
                $('#compositeAddRow_' + compo_rate_rowid).attr('data-rid', db_rid);
                $('#compositeDeleteRow_' + compo_rate_rowid).attr('data-rid', db_rid);
                $('.compositeAddRow').addClass('disabled');
                var trlen = $('tr.comprow').length;
                var last_row = $('#compositeRowid').val();
                if (trlen == 0) {
                    $('.compositeDeleteRow').hide();
                    $('#compositeAddRow_1').removeClass('disabled');
                } else {
                    $('.compositeDeleteRow').show();
                    $('#compositeAddRow_' + last_row).removeClass('disabled');
                }


                $('.compositeRateDiv').addClass('disabled');
                var cur_classcode_id = $('.compositeMultiCcode_' + compo_rate_rowid).val();
                if (cur_classcode_id != "" && cur_classcode_id != null) {
                    setTimeout(function () {
                        $.each(cur_classcode_id, function (key, value) {
                            $('.compositeMultiCcode_' + compo_rate_rowid).multiselect('select', cur_classcode_id);
                            $(".compositeMultiCcode option:not(:selected)").attr("disabled", "disabled");
                            $(".compositeMultiCcode").multiselect('refresh');
                        });
                        composite_rating_multicheckbox();
                    }, 1000);
                } else {
                    $('.compositeRateDiv').removeClass('disabled');
                }
                get_rhs_classbuilder(accid);

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

                sic_work('store_process');
                var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');
                var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');
                var exposure_update = 0;
                var exposure_empty = 0;
                if (enable_grad_rating == true || gr_disabled == true) {
                    var exposure_value = $('.compositeExposure').val();
                    if (exposure_value != "" && exposure_value != 0) {
                        exposure_value = exposure_value.replace('$', '').replace(/,/g, '');
                        exposure_update = 1;
                    } else {
                        exposure_empty = 1;
                    }
                    var exposure_rate = $('.compositeDevRate').val();
                    if (exposure_rate != "" && exposure_rate != 0) {
                        exposure_rate = exposure_rate.replace('$', '').replace(/,/g, '');
                        exposure_update = 1;
                    } else {
                        exposure_empty = 1;
                    }
                    var rowId = $('#rowId').val();
                    var ccode_rid = $('.comprow').first().attr('data-rid');
                    if ((parseInt(rowId) > 1 && exposure_update == 1 && exposure_empty == 0) && (ccode_rid != 0 && ccode_rid != undefined)) {
                        graduated_rating_exposure_edit("CompositeExposure");
                        $('.modify_exposure_rate').css('display', 'none');
                        $('.modify_exposure_rate p').empty();
                        $('.classbuildGraduatedRating').removeClass('redBorder');
                    } else if ((exposure_empty == 1) && (ccode_rid != 0 && ccode_rid != undefined)) {
                        $('.modify_exposure_rate').css('display', 'block');
                        $('.modify_exposure_rate p').empty().text('Impact in Graduated rating: Please fill mandatory fields, the exposure/final rate cannot be empty');
                        $('.classbuildGraduatedRating').addClass('redBorder');
                    } else {
                        $('.modify_exposure_rate').css('display', 'none');
                        $('.modify_exposure_rate p').empty();
                        $('.classbuildGraduatedRating').removeClass('redBorder');
                        if ( ccode_rid != 0 && ccode_rid != undefined ) {
                            graduated_rating_exposure_edit("CompositeExposure");
                        }
                    }
                } else {
                    $('.modify_exposure_rate').css('display', 'none');
                    $('.modify_exposure_rate p').empty();
                    $('.classbuildGraduatedRating').removeClass('redBorder');
                    disable_graduated_rating('null');
                }
            }
        });
    }

}

/** Retrive Compositive Rating 04-01-2021 @kabilan **/

function retrive_compostive_rating() {
    //var accid = localStorage.getItem('accid');
    //$('#cbContinueFullquote').addClass('disabled');
    $.ajax({
        type: "post",
        cache: false,
        url: laravel_url + "/retrive_compostive_rating",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': rqbi_id
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data);
            var retrive_value = '';
            $('.compositeRateDiv').addClass('disabled');            
            if (obj.count == 0) {
                var rowid = 1;
                retrive_value += '<tr class="comprow compRow_1" data-rowid="1">';
                retrive_value += '<td class="pl-3 pb-0 pt-3 text-left"><div class="form-group col-md-12 p-0 mb-1 pull-left multipleClasscodeDiv"><div class="col-sm-12 p-0 bind_compostive_class_code"><select class="custom-select compositeMultiCcode compositeMultiCcode_1" id="multi-select-classcodes" data-rowid="1"  data-rid="0" name="compositeMultiCcode_1"  multiple="multiple"></select></div></div> </td>';
                retrive_value += '<td class="pl-3 pb-0 pt-3 text-left"><div class="form-group col-md-12 mt-1 p-0 mb-1 pull-left"><div class="col-sm-12 pl-0 bind_compostive_loction"> <select  class="custom-select compositeLocation compositeLocation_1" id="compositeLocation_1" data-rowid="1" data-rid="0" name="compositeLocation_1"></select></div> </div></td>';
                retrive_value += ' <td class="pl-3 pb-0 pt-3 text-left"><div class="form-group col-md-12 mt-1 p-0 mb-1 pull-left"><div class="col-sm-12 pl-0"><div class="txttooltip"><input type="text" class="form-control pull-left compositeExposure compositeExposure_1" id="compositeExposure_1" data-rowid="1" data-rid="0" value="" placeholder="Enter Exposure" name="compositeExposure_1"></div><div class="Invalid_comp_Exposure Invalid_compositeExposure_1" style="display:none">Invalid</div></div></div></td>';
                retrive_value += '<td class="pb-0 pt-3"><div class="form-group col-md-12 mt-1 mb-1 pull-left"><div class="col-sm-12 p-0 bind_premium_basis"><select class="custom-select compositeExpBasis compositeExpBasis_1" id="compositeExpBasis_1" data-rowid="1" data-rid="0" name="compositeExpBasis_1"> </select></div></div></td>';
                retrive_value += '<td rowspan="2" class="text-center tdBorderLeft composite_actions"><button type="button" class="btn btn-sm btn-info mr-1 text-white disabled compositeAddRow" id="compositeAddRow_1" data-rowid="1" data-rid="0"><i class="fa fa-plus" aria-hidden="true"></i></button> <button type="button" class="btn btn-sm btn-danger compositeDeleteRow" id="compositeDeleteRow_1" data-rid="0" data-rowid="1"><i class="fa fa-trash" aria-hidden="true"></i></button></td></tr>';

                if ($('.rqbi_rhspane_section').css('display') == 'block') {
                    retrive_value += '<tr class="trbottomborder compRow_1" data-rowid="1"><td colspan="4"> <div class="col-md-12 pull-left p-0 mt-2"><div class="form-group row mb-1 pull-left col-md-4 composite_class_code_div"><label class="col-form-label col-md-6" >Composite Class Code<span class="color_red">*</span></label> <div class="pl-2 col-md-6 bind_compostive_class_code_singleselect" style="margin: 0 0 0 -25px;padding: 0;"><select class="custom-select compositeMainCcode compositeMainCcode_1" id="compositeMainCcode_1" data-rowid="1" data-rid="0" name="compositeMainCcode_1"></select></div></div><div class="form-group row mb-1 pull-left pl-2 comp_devloped_rate"><label class="col-form-label">Developed Rate</label><div class="pl-2 pr-2"><div class="txttooltip" id="comp_tooltip"> <input type="text" value="" class="form-control pull-left compositeDevRate compositeDevRate_1" id="compositeDevRate_1" data-rowid="1" data-rid="0" placeholder="Developed Rate" name="compositeDevRate_1" ><div class="cr_devprate_invalid_msg cr_devprate_invalid_msg_1" style="display:none;"> Invalid </div> </div></div> </div><div class="form-group row mb-1 pull-left pl-3 ml-1 comp_premium"><label class="col-form-label">Premium</label><div class="pl-2 pr-2"><div class="txttooltip" id="comp_tooltip"><input type="text" value="" class="form-control pull-left compositepremium compositepremium_1" id="compositepremium_1" data-rid="0" data-rowid="1" placeholder="Premium" name="compositepremium_1" ></div></div></div></div> </td></tr>';
                } else {
                    retrive_value += '<tr class="trbottomborder compRow_1" data-rowid="1"><td colspan="4"> <div class="col-md-12 pull-left p-0 mt-2"><div class="form-group row mb-1 pull-left col-md-5 composite_class_code_div"><label class="col-form-label col-md-6" >Composite Class Code<span class="color_red">*</span></label> <div class="pl-2 col-md-6 bind_compostive_class_code_singleselect" style="margin: 0 0 0 -25px;padding: 0;"><select class="custom-select compositeMainCcode compositeMainCcode_1" id="compositeMainCcode_1" data-rowid="1" data-rid="0" name="compositeMainCcode_1"></select></div></div><div class="form-group row mb-1 pull-left pl-2 comp_devloped_rate"><label class="col-form-label">Developed Rate</label><div class="pl-2 pr-2"><div class="txttooltip" id="comp_tooltip"> <input type="text" value="" class="form-control pull-left compositeDevRate compositeDevRate_1" id="compositeDevRate_1" data-rowid="1" data-rid="0" placeholder="Developed Rate" name="compositeDevRate_1" ><div class="cr_devprate_invalid_msg cr_devprate_invalid_msg_1" style="display:none;"> Invalid </div></div></div> </div><div class="form-group row mb-1 pull-left pl-3 ml-1 comp_premium"><label class="col-form-label">Premium</label><div class="pl-2 pr-2"><div class="txttooltip" id="comp_tooltip"><input type="text" value="" class="form-control pull-left compositepremium compositepremium_1" id="compositepremium_1" data-rid="0" data-rowid="1" placeholder="Premium" name="compositepremium_1" ></div></div></div></div> </td></tr>';
                }

                $("#compositeTblBody").html(retrive_value);
                get_classcode_compostive_rating(rowid);
                // get_location_compostive_rating(rowid);
                get_premium_basis(rowid);
                get_MainMulticode_classcode(rowid);

            } else {
                var get_compostive_loc = new Array();
                for (var i in obj.data) {

                    var com_rowid = parseInt(i) + 1;

                    retrive_value += '<tr class = "comprow compRow_' + com_rowid + '" data-rowid="' + com_rowid + '" data-rid="' + obj.data[i].rid + '">';
                    retrive_value += '<td class="pl-3 pb-0 pt-3 text-left"><div class="form-group col-md-12 p-0 mb-1 pull-left multipleClasscodeDiv"><div class="col-sm-12 p-0 bind_compostive_class_code"><select class="custom-select compositeMultiCcode compositeMultiCcode_' + com_rowid + '" id="multi-select-classcodes" data-rid="' + obj.data[i].rid + '" data-rowid="' + com_rowid + '" name="compositeMultiCcode_' + com_rowid + '"  multiple="multiple"></select></div></div> </td>';
                    retrive_value += '<td class="pl-3 pb-0 pt-3 text-left"><div class="form-group col-md-12 mt-1 p-0 mb-1 pull-left"><div class="col-sm-12 pl-0 bind_compostive_loction"> <select  class="custom-select compositeLocation compositeLocation_' + com_rowid + '" id="compositeLocation_' + com_rowid + '"data-rowid="' + com_rowid + '" data-rid="' + obj.data[i].rid + '" name="compositeLocation_' + com_rowid + '"></select></div> </div></td>';
                    retrive_value += '<td class="pl-3 pb-0 pt-3 text-left"><div class="form-group col-md-12 mt-1 p-0 mb-1 pull-left"><div class="col-sm-12 pl-0"><div class="txttooltip"><input type="text" class="form-control pull-left compositeExposure compositeExposure_' + com_rowid + '" data-rid="' + obj.data[i].rid + '" id="compositeExposure_' + com_rowid + '" data-rowid="' + com_rowid + '" value="" placeholder="Enter Exposure" name="compositeExposure_' + com_rowid + '"> </div><div class="Invalid_comp_Exposure Invalid_compositeExposure_' + com_rowid + '" style="display:none">Invalid</div> </div></div></td>';
                    retrive_value += '<td class="pb-0 pt-3"><div class="form-group col-md-12 mt-1 mb-1 pull-left"><div class="col-sm-12 p-0 bind_premium_basis"><select class="custom-select compositeExpBasis compositeExpBasis_' + com_rowid + '" id="compositeExpBasis_' + com_rowid + '" data-rowid="' + com_rowid + '" data-rid="' + obj.data[i].rid + '" name="compositeExpBasis_' + com_rowid + '"> </select></div></div></td>';
                    retrive_value += '<td rowspan="2" class="text-center tdBorderLeft composite_actions"><button type="button" class="btn btn-sm btn-info mr-1 text-white disabled compositeAddRow" id="compositeAddRow_' + com_rowid + '" data-rid="' + obj.data[i].rid + '" data-rowid="' + com_rowid + '"><i class="fa fa-plus" aria-hidden="true"></i></button><button type="button" class="btn btn-sm btn-danger compositeDeleteRow" id="compositeDeleteRow_' + com_rowid + '" data-rid="' + obj.data[i].rid + '" data-rowid="' + com_rowid + '"><i class="fa fa-trash" aria-hidden="true"></i></button> </td></tr>';
                    if ($('.rqbi_rhspane_section').css('display') == 'block') {
                        retrive_value += '<tr data-rowid="' + com_rowid + '" class="trbottomborder compRow_' + com_rowid + '"><td colspan="4"> <div class="col-md-12 pull-left p-0 mt-2"><div class="form-group row mb-1 pull-left col-md-4 composite_class_code_div"><label class="col-form-label col-md-6">Composite Class Code<span class="color_red">*</span></label> <div class="pl-2 col-md-6 bind_compostive_class_code_singleselect" style="margin: 0 0 0 -25px;padding: 0;"><select class="custom-select compositeMainCcode compositeMainCcode_' + com_rowid + '" id="compositeMainCcode_' + com_rowid + '" data-rowid="' + com_rowid + '" data-rid="' + obj.data[i].rid + '" name="compositeMainCcode_' + com_rowid + '"></select></div></div><div class="form-group row mb-1 pull-left pl-2 comp_devloped_rate"><label class="col-form-label">Developed Rate</label><div class="pl-2 pr-2"> <div class="txttooltip" id="comp_tooltip"><input type="text" value="" class="form-control pull-left compositeDevRate compositeDevRate_' + com_rowid + '" id="compositeDevRate_' + com_rowid + '" data-rowid="' + com_rowid + '" data-rid="' + obj.data[i].rid + '" placeholder="Developed Rate" name="compositeDevRate_' + com_rowid + '" ><div class="cr_devprate_invalid_msg cr_devprate_invalid_msg_' + com_rowid + '" style="display:none;"> Invalid </div></div></div> </div><div class="form-group row mb-1 pull-left pl-3 ml-1 comp_premium"><label class="col-form-label">Premium</label><div class="pl-2 pr-2"><div class="txttooltip" id="comp_tooltip"><input type="text" value="" class="form-control pull-left compositepremium compositepremium_' + com_rowid + '" id="compositepremium_' + com_rowid + '" data-rowid="' + com_rowid + '" data-rid="' + obj.data[i].rid + '" placeholder="Premium" name="compositepremium_' + com_rowid + '" ></div></div></div></div> </td></tr>';
                    } else {
                        retrive_value += '<tr data-rowid="' + com_rowid + '" class="trbottomborder compRow_' + com_rowid + '" data-rid="' + obj.data[i].rid + '"><td colspan="4"> <div class="col-md-12 pull-left p-0 mt-2"><div class="form-group row mb-1 pull-left col-md-5 composite_class_code_div"><label class="col-form-label col-md-6">Composite Class Code<span class="color_red">*</span></label> <div class="pl-2 col-md-6 bind_compostive_class_code_singleselect" style="margin: 0 0 0 -25px;padding: 0;"><select class="custom-select compositeMainCcode compositeMainCcode_' + com_rowid + '" id="compositeMainCcode_' + com_rowid + '" data-rowid="' + com_rowid + '" data-rid="' + obj.data[i].rid + '" name="compositeMainCcode_' + com_rowid + '"></select></div></div><div class="form-group row mb-1 pull-left pl-2 comp_devloped_rate"><label class="col-form-label">Developed Rate</label><div class="pl-2 pr-2"><div class="txttooltip" id="comp_tooltip"> <input type="text" value="" class="form-control pull-left compositeDevRate compositeDevRate_' + com_rowid + '" id="compositeDevRate_' + com_rowid + '" data-rowid="' + com_rowid + '" data-rid="' + obj.data[i].rid + '" placeholder="Developed Rate" name="compositeDevRate_' + com_rowid + '" ><div class="cr_devprate_invalid_msg cr_devprate_invalid_msg_' + com_rowid + '" style="display:none;"> Invalid </div></div></div> </div><div class="form-group row mb-1 pull-left pl-3 ml-1 comp_premium"><label class="col-form-label">Premium</label><div class="pl-2 pr-2"><div class="txttooltip" id="comp_tooltip"><input type="text" value="" class="form-control pull-left compositepremium compositepremium_' + com_rowid + '" id="compositepremium_' + com_rowid + '" data-rowid="' + com_rowid + '" data-rid="' + obj.data[i].rid + '" placeholder="Premium" name="compositepremium_' + com_rowid + '" ></div></div></div></div> </td></tr>';

                    }

                    var data = {};
                    data.rowid = com_rowid;
                    data.locid = obj.data[i].location_id;
                    data.class_code = obj.data[i].class_code;
                    data.class_code_id = obj.data[i].class_code_id;
                    data.composite_class_code = obj.data[i].composite_class_code;
                    data.exposure = numberWithCommas(obj.data[i].exposure);
                    data.premium_basis = obj.data[i].premium_basis;
                    develop_rate = obj.data[i].developed_rate;
                    data.developed_rate = develop_rate.toFixed(2);
                    var multi_class_code_id = data.class_code_id.split(",");
                    if (obj.data[i].premium) {
                        data.premium = numberWithCommas(obj.data[i].premium);
                    } else {
                        data.premium = "";
                    }
                    get_compostive_loc.push(data);
                    $("#compositeTblBody").html(retrive_value);

                    get_classcode_compostive_rating(com_rowid);
                    get_premium_basis(com_rowid);
                    
                }

                setTimeout (function () {
                //var json_com_Array = JSON.stringify(get_compostive_loc);

                    $.each(get_compostive_loc, function () {

                        var myrowid = this.rowid;
                        var mylocid = this.locid;
                        var exposure = this.exposure;
                        var premium_basis = this.premium_basis;
                        var developed_rate = this.developed_rate;
                        var premium = this.premium;
                        var class_code_id = this.class_code_id;
                        var multi_class_code_id = class_code_id.split(",");
                        var class_code = this.class_code;
                        var multi_class_code = class_code.split(",");
                        var composite_class_code = this.composite_class_code;
                        var prev_rowid = parseInt(myrowid) - 1;
                        prev_rowid = 1;    

                        var get_class_val = setTimeout (function () {
                            $('.compositeMultiCcode_'+myrowid).multiselect('select',multi_class_code_id);
                            $(".compositeMultiCcode_" + myrowid + " option:not(:selected)").attr("disabled", "disabled");
                            $(".compositeMultiCcode_" + myrowid).multiselect('refresh');
                            setlocation_basedon_classcode(myrowid);
                            get_MainMulticode_classcode(myrowid);

                            setTimeout (function () {                       
                               $('#compositeLocation_'+myrowid).val(mylocid);                   
                               $('.compositeMainCcode_'+myrowid).val(composite_class_code);    
                                $('.compositeExpBasis_' + myrowid).val(premium_basis);          
                            }, 2000);

                        }, 1000);
                                      

                        if (exposure != "undefined" && exposure != "NaN") {
                            $('.compositeExposure_' + myrowid).val(exposure);
                        } else {
                            $('.compositeExposure_' + myrowid).val(0);
                        }

                        $('.compositeDevRate_' + myrowid).val(developed_rate);
                        $('.compositepremium_' + myrowid).val(numberWithCommas(premium));
                        $("#compositeRowid").val(myrowid);

                    });

                    composite_rating_multicheckbox();
                    //$('#cbContinueFullquote').removeClass('disabled');
                }, 2000);
                $('#compositeAddRow_' + obj.count).removeClass('disabled');

            }
            var trlen = $('tr.comprow').length;
            if (trlen == "0") {
                $('.compositeDeleteRow').hide();
            } else {
                $('.compositeDeleteRow').show();
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

            setTimeout(function () {
                $('.compositeRateDiv').removeClass('disabled');
            }, 1000);
            
             menu_permission();
        }
    });
}

function composite_rating_multicheckbox() {
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var difference = [];

    //var accid = localStorage.getItem('accid');
    $.ajax({
        type: "post",
        cache: false,
        url: laravel_url + "/get_classcode_multiselect",
        data: {
            'accid': accid,
            'com_id': com_id
        },
        success: function (data) {
            $.each(data, function (key, value) {
                arr1.push(value.rid);
            });

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

            setTimeout(function () {
                var first_array_str = arr1.toString();

                $('.compositeMultiCcode').each(function () {
                    arr2.push($(this).val());
                });
                arr3 = $.map(arr2, function (val, index) {
                    var str = val;
                    return str;
                }).join(", ");

                var array = JSON.parse("[" + arr3 + "]");
                var first_array = JSON.parse("[" + first_array_str + "]");

                var i = 0;
                jQuery.grep(first_array, function (el) {

                    if (jQuery.inArray(el, array) == -1) difference.push(el);
                    i++;

                });
                $.each(difference, function (key, value) {
                    $(".compositeMultiCcode option[value = " + value + "]").removeAttr("disabled", "disabled");
                    $(".compositeMultiCcode").multiselect('refresh');
                });

                if (difference.length == 0) {
                    $('.compositeAddRow').attr('disabled', 'disabled');
                    $('.compositeAddRow').removeClass('disabled');
                } else {
                    $('.compositeAddRow').removeAttr('disabled', 'disabled');
                }

                $('.compositeRateDiv').removeClass('disabled');

            }, 1000);

        }

    });


}

/** Delete Compositive Rating 08-01-2021 @kabilan **/

function delete_compostive_rating(rid) {

    //var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    $.ajax({
        type: "post",
        cache: false,
        url: laravel_url + "/delete_compostive_rating",
        data: {
            'accid': accid,
            'com_id': com_id,
            'del_id': rid,
            'userid': userid
        },

        success: function (data) {
            get_rhs_classbuilder(accid);
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
            retrive_compostive_rating();
            sic_work('store_process');
        }

    });

}

function setlocation_basedon_classcode(row_id) {
    //var accid = localStorage.getItem('accid');
    var classcode = $('.compositeMultiCcode_' + row_id).val();

    $.ajax({
        type: "post",
        cache: false,
        url: laravel_url + "/setlocation_basedon_classcode",
        data: {
            'accid': accid,
            'com_id': com_id,
            'classcode': classcode
        },

        success: function (data) {
            if (row_id) {
                $('#compositeLocation_' + row_id).find('option').remove();
                $('#compositeLocation_' + row_id).append(data);
            }
        },
        error: function () {},
        complete: function () {}

    });
}

function get_premium_from_cbclasscode(row_id) {
    //var accid = localStorage.getItem('accid');
    var classcode_id = $('.compositeMultiCcode_' + row_id).val();
    var classcode_value = [];
    var classcode = "";
    $(".compositeMultiCcode_" + row_id + " option:selected").each(function () {
        classcode = classcode_value.push($(this).attr('data-classcode'));
    });

    $.ajax({
        type: "post",
        cache: false,
        url: laravel_url + "/get_premium_from_cbclasscode",
        data: {
            'accid': accid,
            'com_id': com_id,
            'classcode_id': classcode_id,
            'classcode': classcode_value
        },

        success: function (data) {
            if (row_id) {
                $('#compositepremium_' + row_id).val(numberWithCommas(data));
            }
            $('.multipleClasscodeDiv_' + row_id).removeClass('error_border_design');
        },
        error: function () {

        },
        complete: function () {
            $('.multipleClasscodeDiv_' + row_id).removeClass('error_border_design');
        }

    });

}

function get_MainMulticode_classcode(row_id) {
    //var accid = localStorage.getItem('accid');
    var classcode_id = $('.compositeMultiCcode_' + row_id).val();
    var classcode_value = [];
    var classcode = "";
    $(".compositeMultiCcode_" + row_id + " option:selected").each(function () {
        classcode = classcode_value.push($(this).attr('data-classcode'));
    });

    if (classcode_value != "" && classcode_id != "") {

        $.ajax({
            type: "post",
            cache: false,
            url: laravel_url + "/get_MainMulticode_classcode",
            data: {
                'accid': accid,
                'com_id': com_id,
                'classcode_id': classcode_id,
                'classcode': classcode_value
            },

            success: function (data) {
                if (row_id) {
                    $('.compositeMainCcode_' + row_id).find('option').remove();
                    $('.compositeMainCcode_' + row_id).append(data);
                }
                $('.compositeMainCcode_' + row_id).removeClass('error_border_design');


            },
            error: function () {

            },
            complete: function () {
                $('.compositeMainCcode_' + row_id).removeClass('error_border_design');
            }

        });

    } else {
        $('.compositeMainCcode_' + row_id).find('option').remove();
    }

}

function coverage_based_delete_comp_rat(del_coverage_ret, source) {
    //var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    var classcode_id = $('.compositeMultiCcode').val();

    if (classcode_id != "") {

        $.ajax({
            type: "post",
            cache: false,
            url: laravel_url + "/coverage_based_delete_comp_rat",
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
                retrive_compostive_rating();
            }

        });

    }

}

function get_comprat_quote() {

    //var accid = localStorage.getItem('accid');
    var get_rqbi_id = $('#rqbiQuoteVersion').val();

    $.ajax({
        type: "post",
        url: laravel_url + "/get_comprat_quote",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': get_rqbi_id
        },

        success: function (data) {
            if (data == "" || data == 0) {
                $('.compositeRateDiv').hide();
                $('.cbCompRating').addClass('disabled');
            } else {
                cb_btn_disable_enable();

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