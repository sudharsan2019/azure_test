/* Author : Vetri,Shakina,Veera,nanthakumar */
$(document).ready(function() {
		// alert();
	$('#example').DataTable( {
        "paging":   false,
        "ordering": false,
        "info":     false
    });
    $('#example2').DataTable( {
        "paging":   false,
        "ordering": false,
        "info":     false
    });
    $(".myseclet").select2();

	$("#range_01").ionRangeSlider({
        grid: true,
        from: 5,
        values: [
            "zero", "one",
            "two", "three",
            "four", "five",
            "six", "seven",
            "eight", "nine",
            "ten"
        ]
    });
    $("#range_02").ionRangeSlider({
        grid: true,
        from: 5,
        values: [
            "zero", "one",
            "two", "three",
            "four", "five",
            "six", "seven",
            "eight", "nine",
            "ten"
        ]
    });
});

