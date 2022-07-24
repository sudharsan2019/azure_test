$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready( function() {
    /// table According show ".subclass", this
    $('.view_table_according').click( function() {
        $(this).parents().next('tr').toggle();
    });

    $('.view_according_btn').click( function() {
        $(this).parents().next('tr').toggle();
    });
  
 });

