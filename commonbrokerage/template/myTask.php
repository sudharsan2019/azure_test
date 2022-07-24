
<?php include('loginMain.php'); ?>
<?php include('cssTemplate.php'); ?>


<?php 

  $specific_person_hideshow = array('asic.underwriter1@gmail.com');

  if (in_array($_SESSION['userid'], $specific_person_hideshow)) {
    
  }else  {

    ?>
    
	<h3 class="my-2"> List Of Brokers </h3>

	<div class="container-fluid py-2 mb-5 bg-white">
		<form class="form-row brokerForm p-1 mt-2">
			<div class="form-group mr-2">
				<label for="brokName" class="col-form-label"> Name </label>
				<input type="text" name="brokName" class="form-control brokName" placeholder="Broker Name">
			</div>
			<div class="form-group mr-2">
				<label for="brokEmail" class="col-form-label"> Email </label>
				<input type="email" name="brokEmail" class="form-control brokEmail" placeholder="Broker Email">
			</div>
      <div class="form-group mr-2">
        <label for="brokUnderwritter" class="col-form-label"> Underwritter </label>
        <div class="bind_addbrok_primary_underwritter"></div>
      </div>
      <div class="form-group mr-2">
        <label for="PrimaryLOB"  class="col-form-label">Primary LOB </label> <br>             
          <select class="form-control brok_lob1_multiselect" id="brok_lob1_multiselect" name="brok_lob1_multiselect">
            <option value="GL" selected> GL </option>
            <option value="DBD" > DBD </option>
            <option value="IM" > IM </option>
            <option value="Crime" > Crime </option>
            <option value="PrimaryProperty" > Primary Property </option>
            <option value="XSLiability" > XS Liability </option>
            <option value="XSProperty" > XS Property </option>
          </select>          
      </div>
      <div class="form-group mr-2">
          <label for="SecondaryLOB"  class="col-form-label"> Secondary LOB</label> <br>        
                <select class="form-control brok_lob2_multiselect" id="brok_lob2_multiselect" name="brok_lob2_multiselect">
                  <option value="GL" selected> GL </option>
                  <option value="DBD" > DBD </option>
                  <option value="IM" > IM </option>
                  <option value="Crime" > Crime </option>
                  <option value="PrimaryProperty" > Primary Property </option>
                  <option value="XSLiability" > XS Liability </option>
                  <option value="XSProperty" > XS Property </option>
                </select>       
           
      </div>
			<div class="form-group align-self-center">
				<button type="button" class="btn btn-sm btn-primary mt-4 addnewbrokers"> Add </button>
			</div>
		</form>

		<!-- 				table   	 -->
		<div class="brokerTable_div p-2 mt-2 mb-4">
			<table class="table table-sm table-bordered table-hover brokerTable p-2" id="brokerTable">
				<thead class="bg_lavender">
					<tr>
						<th width="10%"> S.no </th>
						<th> Name </th>
						<th> Email </th>
            <th> Underwritter </th>
            <th> LOB 1 </th>
            <th> LOB 2 </th>
						<th width="15%">Action</th>
					</tr>	
				</thead>
					
			</table>
		</div>


	</div>

    <?php
  }
?>


<?php
	$footstyle = 'footers';
	include('../../brok-wbui/views/footer.php');
?>
<?php include('jsTemplate.php'); ?>

<script type="text/javascript">
	$(document).ready(function(){

      var t = $('#brokerTable').DataTable({
      "bProcessing": true,
      "searching": true,
      "responsive": true,
      "language": {
        "lengthMenu": "_MENU_",
        search: '<i class="fas fa-search text-primary"></i>', searchPlaceholder: 'Search...',
        "paginate": {
          "previous": '<i class="fa fa-backward fa-sm"></i>',
          "next": '<i class="fa fa-forward fa-sm"></i>'
        }
      },
      "order": [[ 0, "desc" ]],
      "scrollCollapse": true,
      "sAjaxSource": laravel_url+"/getallbrokerage_info",
      "columns": [
        { "data": "id"},
        { "className":"broker_name_edit","data": "brokername" },
        { "className":"broker_email_edit","data": "brokeremail" },
        { "className":"broker_underwritter",
            "render": function(data, type, row){
              if(row.underwriter_id != null){
                return '<div class="primary_underwritter"data-under_id = '+row.underwriter_id+'>'+row.fname+' '+row.lname+'</div>';
              }
              else{
                // return '<div>Select Underwritter</div><i class="fas fa-angle-down"></i>';
                return '-';
              }
            }
        },
        {
          "render": function(data, type, row){
            if(row.Primary_LOB == "GL"){
              var selected1 = 'selected';
            }
            if(row.Primary_LOB == "DBD"){
              var selected2 = 'selected';
            }
            if(row.Primary_LOB == "IM"){
              var selected3 = 'selected';
            }
            if(row.Primary_LOB == "Crime"){
              var selected4 = 'selected';
            }
            if(row.Primary_LOB == "PrimaryProperty"){
              var selected5 = 'selected';
            }
            if(row.Primary_LOB == "XSLiability"){
              var selected6 = 'selected';
            }
            if(row.Primary_LOB == "XSProperty"){
              var selected7 = 'selected';
            }

            return ' <select class="form-control update_brok_lob1 update_brok_lob1_'+row.id+'" id="update_brok_lob1_multiselect" name="update_brok_lob1_multiselect"> <option value="GL" '+selected1+' > GL </option><option value="DBD" '+selected2+'> DBD </option> <option value="IM" '+selected3+'> IM </option> <option value="Crime" '+selected4+'> Crime </option> <option value="PrimaryProperty" '+selected5+'> Primary Property </option> <option value="XSLiability"'+selected6+' > XS Liability </option> <option value="XSProperty"'+selected7+' > XS Property </option>     </select>';

          }
        },

        {
          "render": function(data, type, row){
            if(row.Secondary_LOB == "GL"){
              var selected1 = 'selected';
            }
            if(row.Secondary_LOB == "DBD"){
              var selected2 = 'selected';
            }
            if(row.Secondary_LOB == "IM"){
              var selected3 = 'selected';
            }
            if(row.Secondary_LOB == "Crime"){
              var selected4 = 'selected';
            }
            if(row.Secondary_LOB == "PrimaryProperty"){
              var selected5 = 'selected';
            }
            if(row.Secondary_LOB == "XSLiability"){
              var selected6 = 'selected';
            }
            if(row.Secondary_LOB == "XSProperty"){
              var selected7 = 'selected';
            }

            return ' <select class="form-control update_brok_lob2 update_brok_lob2_'+row.id+'" id="update_brok_lob2_multiselect" name="update_brok_lob2_multiselect"> <option value="GL" '+selected1+' > GL </option><option value="DBD" '+selected2+'> DBD </option> <option value="IM" '+selected3+'> IM </option> <option value="Crime" '+selected4+'> Crime </option> <option value="PrimaryProperty" '+selected5+'> Primary Property </option> <option value="XSLiability"'+selected6+' > XS Liability </option> <option value="XSProperty"'+selected7+' > XS Property </option>  </select>';
          }
        },

        {
          "render": function(data, type, row) {
            if (row.status == '1') {
              return '<label class="switch switch-text switch-pill switch-primary active_switch">'+
                '<input type="checkbox" checked class="switch-input changebrokstatus" data-brokid="'+row.id+'" data-isdeleted="'+row.status+'" >'+
                '<span class="switch-label " data-on="Active" data-off="Active"></span>'+
                '<span class="switch-handle"></span>'+
              '</label>';
              }
            else {
              return '<label class="switch switch-text switch-pill switch-primary inactive_switch">'+
                '<input type="checkbox" class="switch-input changebrokstatus" data-brokid="'+row.id+'" data-isdeleted="'+row.status+'" >'+
                '<span class="switch-label " data-on="Active" data-off="In-Active"></span>'+
                '<span class="switch-handle"></span>'+
              '</label>';
            }
          }, 
        },
      ]
      
});


  t.on( 'order.dt search.dt', function () {
    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
        cell.innerHTML = i+1;
    } );
  } ).draw();




});

setTimeout(function(){
    $('#brokerTable tr').find('th:eq(1)').removeClass('broker_name_edit'); 
    $('#brokerTable tr').find('th:eq(2)').removeClass('broker_email_edit'); 
}, 1000);


$(document).on('click','.broker_name_edit',function(){
  var emailval = $(this).text();
  if(emailval != "savecancel"){
    $(this).focus();
    $(this).replaceWith("<td>"+
    "<input type='text' class='form-control' data-brokval='"+emailval+"' value='"+emailval+"' required />"+
    "<button class='btn btn-xs btn-success updatebrokename'>save</button>"+
    "<button class='btn btn-xs btn-danger cancelnameval' >cancel</button>"+
    "</td>");
    $(this).focus();
  }
  
});



$(document).on('click','.updatebrokename',function(){
   var brokval = $(this).closest('td').find('input').val();
   var brokid = $(this).closest('tr').find('.changebrokstatus').data('brokid'); 
   if (brokval != '') {
        $.ajax({
            url : laravel_url+"/brok_name_info",
            data : {brokval:brokval,brokid:brokid},
            type : 'post',
            success:function(response){
                new PNotify({ title: 'Success', text: response, delay: 1000, type: 'success' });
                $('#brokerTable').DataTable().ajax.reload(null, false);

            }
        });
     
   }
   else
   {
    new PNotify({ title: 'Error', text: 'Field Should not be empty', delay: 1500, type: 'error' });
    setTimeout(function(){ window.location.reload(true) }, 1500);
   }
   
});

$(document).on('click','.cancelnameval',function(){
  var brokval = $(this).closest('td').find('input').data('brokval');
   $(this).closest('td').attr('class','broker_name_edit'); 
   $(this).closest('td').text(brokval);
});



/******** Brok Email Edit ****************/



$(document).on('click','.broker_email_edit',function(){
  var emailval = $(this).text();
  if(emailval != "savecancel"){
    $(this).focus();
    $(this).replaceWith("<td>"+
    "<input type='text' class='form-control' data-brokval='"+emailval+"' value='"+emailval+"' required />"+
    "<button class='btn btn-xs btn-success updatebrokeemail'>save</button>"+
    "<button class='btn btn-xs btn-danger cancelemailval' >cancel</button>"+
    "</td>");
    $(this).focus();
  }
  
});



$(document).on('click','.updatebrokeemail',function(){
   var brokval = $(this).closest('td').find('input').val();
   var brokid = $(this).closest('tr').find('.changebrokstatus').data('brokid'); 
    if(IsEmaill(brokval) == false){
        new PNotify({ title: 'Error', text: 'Not a valid Email', delay: 2000, type: 'error' });
        return false;
    }
   if (brokval != '') {
        $.ajax({
            url : laravel_url+"/brok_email_info",
            data : {brokval:brokval,brokid:brokid},
            type : 'post',
            success:function(response){
                new PNotify({ title: 'Success', text: response, delay: 1000, type: 'success' });
                $('#brokerTable').DataTable().ajax.reload(null, false);

            }
        });
     
   }
   else
   {
    new PNotify({ title: 'Error', text: 'Field Should not be empty', delay: 1500, type: 'error' });
    setTimeout(function(){ window.location.reload(true) }, 1500);
   }
   
});

$(document).on('click','.cancelemailval',function(){
  var brokval = $(this).closest('td').find('input').data('brokval');
   $(this).closest('td').attr('class','broker_email_edit'); 
   $(this).closest('td').text(brokval);
});

// <-----------> primary underwritter bind <----------> 

  
$.ajax({
  url: laravel_url+"/addbrok_primary_underwritter",
  type:'get',
  data: {add:'add'},
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
  success:function(response){
    // var obj = jQuery.parseJSON(response);
    $('.bind_addbrok_primary_underwritter').html('');
    $('.bind_addbrok_primary_underwritter').html(response);
  }
});


$(document).on('change','.update_brok_lob1',function(){
 
  var update_brok_lob1 = $(this).val();
  var brokid = $(this).closest('tr').find('.changebrokstatus').data('brokid'); 
 
    $.ajax({
      url: laravel_url+"/update_lob_1",
      data:{update_brok_lob1:update_brok_lob1,brokid:brokid},
      type:'post',
      success:function(response){
        new PNotify({ title: 'Success', text: response, delay: 1000, type: 'success' });
        $('#brokerTable').DataTable().ajax.reload(null, false);
      } 
    });
});


$(document).on('change','.update_brok_lob2',function(){
 
  var update_brok_lob2 = $(this).val();
  var brokid = $(this).closest('tr').find('.changebrokstatus').data('brokid'); 
 
    $.ajax({
      url: laravel_url+"/update_lob_1",
      data:{update_brok_lob2:update_brok_lob2,brokid:brokid},
      type:'post',
      success:function(response){
        new PNotify({ title: 'Success', text: response, delay: 1000, type: 'success' });
        $('#brokerTable').DataTable().ajax.reload(null, false);
      } 
    });
});


$(document).on('click','.broker_underwritter',function(){
  var under_id  =  $(this).find('.primary_underwritter').attr('data-under_id');
  var brokid = $(this).closest('tr').find('.changebrokstatus').data('brokid'); 
 
  $(this).addClass("update_under");
  
  $.ajax({
    url: laravel_url+"/addbrok_primary_underwritter",
    type:'get',
    data: {update:'update'},
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success:function(response){
        
      $('.update_under').replaceWith("<td class='test_"+brokid+"'>"+response+"</td>");
      $('.test_'+brokid).find('.updatebrok_primary').val(under_id);
      log_userid = localStorage.getItem("usernumericid");

      // if(!under_id){
      //   setTimeout(function(){
      //       $('.test_'+brokid).find('.updatebrok_primary').val(log_userid );
      //   },500);
      // }
        // $('.primary_underwritter').html('');
        // $('.primary_underwritter').html(response);
     
    }
  });

});


$(document).on('change','.updatebrok_primary',function(){

  var update_under = $(this).val();
  var brokid = $(this).closest('tr').find('.changebrokstatus').data('brokid'); 
  // var brokPrimary_name =  $('.test_'+brokid).find('.updatebrok_primary option:selected').text();

  $.ajax({
    url: laravel_url+"/update_primary_underwritter",
    type:'post',
    data: {update_under:update_under, brokid:brokid },
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success:function(response){
        new PNotify({ title: 'Success', text: response, delay: 1000, type: 'success' });
        $('#brokerTable').DataTable().ajax.reload(null, false);   
    }
  });



});
</script>