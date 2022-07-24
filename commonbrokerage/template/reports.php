
<?php include('loginMain.php'); ?>
<?php include('cssTemplate.php'); ?>

<?php 

  $specific_person_hideshow = array('asic.underwriter1@gmail.com');

  if (in_array($_SESSION['userid'], $specific_person_hideshow)) {
    
  }else  {

    ?>
<div class="loader">
   <div class="lds-ripple page_loading_design">
      <div></div>
      <div></div>
   </div>
   <br><span class="pleasewait_text">Please Wait...</span>
</div>

<script type="text/javascript">
   $(window).load(function() {
       //return true;
        $('.app-body').addClass('backgroundd_color');
   
       $(".loader").fadeOut("slow");
      
   });
</script>
	<!-- <h3>Reports</h3> -->


  <div class="p-2 mt-2"> 
 		<h3 class="text-info"> Reports </h3>
 	</div> <br>
  <!-- <div class="row container mt-2 report_li" id="report_li">
 	<div class="col">
	 	<ul class="list-group list-group-flush">
		  <li class="list-group-item"> 
		  	<a href="#"> Submission Report </a> </li>
		  <li class="list-group-item"> 
		  	<a href="javascript:void(0);" class="declineRep" > Decline Report </a> </li>
		  <li class="list-group-item"> 
		  	<a href="#"> Issued Policy Report </a> </li>
		</ul>
	</div>
	<div class="col">
	 	<ul class="list-group list-group-flush">
		  <li class="list-group-item"> 
		  	<a href="#"> Quote Report </a> </li>
		  <li class="list-group-item"> 
		  	<a href="#"> Indication Report </a> </li>
		  <li class="list-group-item"> 
		  	<a href="#"> Bind Report </a> </li>
		</ul>
	</div>

 </div> -->




 						<!-- 	Decline Report 		-->

 	<div class="decReport_div mt-2" style="display: none;">
 		<?php //include('./declineReport.php'); ?>
 	</div>





  <?php
  }
?>

<br>



<?php
	$footstyle = 'footers';
	include('../../wbui/views/footer.php');
?>
<?php include('jsTemplate.php'); ?>




<script type="text/javascript">
	
	$(document).ready(function() {
	   var declineTable = $('#declineReportTable').DataTable({
	       "bLengthChange": true,
	       "bPaginate": true,
	       "bInfo": true,
	       "autoWidth": false,  
	       "order": [[0, "desc"]],
	       "processing": true,
	       "serverSide": false,
	       "destroy": true,
	       "aoColumnDefs": [
      			{ "bSearchable": true, "aTargets": [ 0 ] },
      		]
	       // "sAjaxSource": laravel_url+"/getallaccounts_info",
	       // "columns": [
	       // ]
	    });
	});

	declineTable = $('#declineReportTable').DataTable();
	$('#repSearch').keyup(function(){
      declineTable.search($(this).val()).draw();
	});
	 

 $(document).on('click','.declineRep',function(){
 	$('#report_li').hide();
 	$('.decReport_div').show();
 });

</script>