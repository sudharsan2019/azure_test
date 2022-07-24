function reset_acccountlist() {
    $('#account_list_loader').show();
    accounttablelist();
}

function reset_archivelist() {
    archivetablelist();
}
$('.show_account_filter_btn').click(function () {
    $('.filter_div').toggle();
    $('.setting_filter_div').hide();
    $('.submission_div_form').show();
    $('.account_div_form').hide();
});

$(document).on('keyup', '#br_ac_name_search', function () {
    $('#pdfmail_view').css('display', 'none');
    if ($(this).val() != '' && $(this).val() != null) { // check if value changed
        searchandsort();
    }
    else {
        get_emailst();
    }
});

$(document).on('click', '#btn-more', function () {
    var load_id = $(this).data('id');
    $("#btn-more").html("Loading....");
    searchandsort(load_id);
});