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

<div class="row maindiv_quoteindication" id="maindiv_quoteindication">
  <div class="col-md-12  col-lg-12 col-sm-12 col-xs-12">
<form id="Qaddsubmission_form" method="post">
   <div class="d-flex QQ_indication_tab bg-primary main_tab1 p-1">
      <div class="col-12 wrapper">
         <div class="ml-3 text-white">
            <span class="user line_height30 text_uppercase font13">Quick Quote Indication</span>
         </div>
      </div>
   </div>
   <div class="card border-top p-3 mt-2 bg-light cc_zz_exp">
      <div class="col-md-12 pull-left p-0 mb-3 mt-4" id="qqcoveragessec">
          <label class="mr-5 fontweight700">Coverages</label>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input type="checkbox" class="custom-control-input qqCoverages" checked id="qqGL" data-covtype="gl" name="qqCoverageType" value="1">
            <label class="custom-control-label" for="qqGL">GL</label>
          </div>
         
          <div class="custom-control custom-checkbox custom-control-inline">
              <input type="checkbox" class="custom-control-input qqCoverages" id="qqLiquor" data-covtype="liquor" name="qqCoverageType" value="2">
              <label class="custom-control-label" for="qqLiquor">Liquor</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
              <input type="checkbox" class="custom-control-input qqCoverages" id="qqOCP" data-covtype="ocp" name="qqCoverageType" value="3">
              <label class="custom-control-label" for="qqOCP">OCP</label>
          </div>
          <small class="text-danger fontSize14 qqCovMandatoryMsg" style="display: none;"></small>
          <small class="text-danger fontSize14 qqCovMsg" style="display: none;"></small>
      </div>
      <div class="form-row">
         <div class="col-md-3">
            <label> <b> Class Code </b></label>
         </div>
         <div class="col-md-2">
            <label> <b> Zip </b></label>
         </div>
         <div class="col-md-2">
            <label><b>City</b></label>
         </div>
         <div class="col-md-2">
            <label> <b> Exposure </b></label>
         </div>
         <div class="col-md-1">
         </div>
      </div>

      <div class="after-add-more" id="Qqcov_clsCd_row0">
         <div class="form-row mt-2 exposure_row qqexprow" data-unique_id="9999999999" >
            <div class="col-md-3 qqrowid" data-location_id="1">
               <div class="form-group">
                  <!-- <label> <b> Class Code </b></label> -->
                  <div class="input-group">
                     <input type="text" class="form-control Qclass_code_submission subClassCode classcode_tbox" data-ptype="qq" data-qclassid="0" name="Qclass_code_submission" id="Qclass_code_submission0" placeholder="Enter Classcode" autofocus="true">
                  </div>
                  <small class="text-muted appendText class_ctext" id="ctext0" data-qctext="0"></small>
				          <small class="text_color appendText class_isotext" id="isotext0" data-qisotext="0"></small>
                  <p class="pt-1 text-left pull-left text-danger width100_perc font80_perc iso_qq_cc_invalid_msg" id="iso_qq_cc_invalid_msg_0" style="display: none;">Invalid Class Code</p>
                    <div>
                        <input type="hidden" class="Qqclass_code_coverage" name="Qqclass_code_coverage[]" id="Qqclass_code_coverage0" data-rowid="0"><!--v5 implementation !-->
                     </div>
               </div>
            </div>
            <div class="col-md-2">
               <div class="form-group">
                  <!-- <label> <b> Zip </b></label> -->
                  <div class="input-group">
                     <input type="text" class="form-control Qzip_code_submission subZipCode zipcode_tbox" data-qzipid="0" name="Qzip_code_submission" id="Qzip_code_submission0" placeholder="Enter Zip" maxlength="5">
                  </div>
                  <span id="quickQuote_zip_err_msg0" class="text-danger quickQuote_zip_err_msg" style="display:none;">Invalid</span>
                  <small class="text-muted city_label" id="ziptext0"></small>
               </div>
            </div>
    			 <div class="form-group col-md-2">
                     <!-- <label><b>City</b></label> -->
    				<div class="qqcityname" id="city_name_td0">
    					</div>				 
                  <select class="form-control city_name_hide city" name="city">
                     <option value="City1"></option>
                    
                   </select>
            </div>
           <!--  <div class="col-md-2">
                <div class="form-group">
                   <div class="input-group">
                      <div class="input-group-prepend">
                         <div class="input-group-text loc_add_text locAddText1" data-location_id="1"> L1 </div>
                      </div>
                      <input type="text" name="loc_add" id="loc_add0" class="form-control subLocAdd loc_add" autocomplete="data-off" placeholder="Enter Location">
                   </div>
                </div>
             </div> -->
            <div class="col-md-2">
               <div class="form-group">
                  <!-- <label> <b> Exposure </b></label> -->
                  <div class="input-group">
                     <input type="text" class="form-control Qexposure_amount amountwithcommas prem_money subExpos arate_exp" name="Qexposure_amount" id="Qexposure_amount0" placeholder="Enter Exposure" maxlength="9">
                  </div>
                  <small class="text-muted premium_base" id="pbtext0" data-qpbtext="0"></small> <br />
               </div>
            </div>
            <div class="col-md-1 qqBtns">
               <div class="form-group">
                  <button type="button" class="btn btn-primary btn-xs add_more_btn add_more" data-html="true"  name="Qsub"> 
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  </button>

                  <button type="button" class="btn btn-xs btn-warning subCloneBtn" data-section="qq" data-toggle="tooltip" data-placement="top" title="Clone"> 
                     <i class="fa fa-copy" aria-hidden="true"></i>
                  </button>
                  <button type="button" class="btn btn-danger btn-xs remove_more_btn1" title="Remove" name="Qsub1" style="display: none;"> <i class="fa fa-remove" aria-hidden="true"></i></button>
               </div>
            </div>
       </div>
      </div>
      <div class="Qcopy">
      </div>
   </div>
</form>
<!--Progress division-->
<div class="row mt-2">
   <div class="col-sm-12 col-xs-12 col-md-6 col-lg-3">
    <div class="form-group">
      <label>Effective Date</label>
         <div id="datepicker_quickquote" class="input-group date" data-date-format="mm-dd-yyyy">
           <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
             <input class="form-control bg_white effective_from qq_eff_date" id="effective_from" name="effective_from" type="text"readonly />             
         </div>
    </div>
      <!-- <fieldset class="form-group">
         <label> <b> Effective Date </b> </label>
         <div class="input-group">
            <span class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-calendar"></i></span>
            </span>
            <input type="date" class="form-control effective_from" id="effective_from" name="effective_from">
         </div>
      </fieldset> -->
   </div>
   <div class="col-sm-12 col-xs-12 col-md-6 col-lg-2 switch_6">
      <fieldset class="form-group">
         <label> <b> Term </b> </label> <br>
         <label class="switch switch-icon switch-pill switch-primary-outline-alt">
         <input type="checkbox" class="switch-input" id="switchValue">
         <span class="switch-label" data-on="6 months" data-off="1 year"></span>
         <span class="switch-handle"></span>
         </label>
      </fieldset>
   </div>
   <div class="col-sm-12 col-xs-12 col-md-6 col-lg-7">
      <label> <b> Limits </b></label>
      <input type="text" id="inline-radios1" name="example_name" value="" />
   </div>
</div>

<!--table-->
<div class="table-responsive mt-2">
   <table class="table table-bordered mt-2">
      <thead>
         <tr class="bg_lavender">
            <th class="text-center" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Class Code </em>">CC</th>
            <th scope="col"  class="text-center" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Policy Coverage </em>">PC</th>
            <th scope="col"  class="text-center" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Loss Cost </em>">LC</th>
            <th scope="col"  class="text-center" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Loss Cost Multiplier </em>">LCM</th>
            <th scope="col"  class="text-center" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Base Rate </em>">BR</th>
            <th scope="col"  class="text-center" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Increased Limits Factor </em>">ILF</th>
            <th scope="col"  class="text-center" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Adjusted Base Rate </em>">ABR</th>
            <th scope="col"  class="text-center" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Transaction Premium </em>">Premium</th>
         </tr>
      </thead>
      <tbody class="rate_table" id="Qq_tboady_prem">
         <!-- <tr>
            <td>Pompeius René</td>
            <td>2012/01/01</td>
            <td>Member</td>
            <td>Member</td>
            <td>Member</td>
            <td>Member</td>
            <td>Member</td>
            <td>Member</td>
         </tr> -->
      </tbody>
   </table>
</div>
<!--      total premium block       -->
<div class="d-flex d-flex-row bg-light p-2 mt-2 premium_div">
   <div class="col-lg-4 col-md-4 col-sm-12 p-1">
     <!-- <button type="button" class="btn btn-sm btn-primary get_code " data-toggle="modal" data-target="#successPopup"> Get Indicative Quote </button> below section newly added-->
	 <div class="d-flex">
	  <button type="button" class="btn btn-sm btn-primary get_code quicocodebtn_loader_show mr-2" <?php echo $specific_diable; ?>> Get Indicative Premium </button> 
    <div class="quickcodeloading_btn mt-1" style="display: none;">
       <div class="sk-circle" id="qqSpin">
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
          </div>
    </div>
	</div>




   </div>


   <div class="col-lg-8 col-md-8 col-sm-12 py-1 totalpremium">
   <span><strong title="Total Premium(Prem/Ops)" >Total Premium: &nbsp;</strong></span>
   <span class="totpremium" style="display: none;">$<span class="tp_comma"></span></span>
      <!--<b> Total Premium: <span class="ml-lg-2 tp_comma"> $ 0 </span> </b>-->
   </div>
</div>
<br>


<!-- <div class="form-group col-md-4 pull-left savepdf_buttonQQ">
<button type="button" class="btn btn-danger btn-sm QQshowpdf" style="" <?php //echo $specific_diable; ?>> <i class="fa fa-file-pdf-o mr-1"></i> Save Quote as Pdf </button>    
</div> -->

<div class="form-group QQpdfwraper col-md-8 pull-left p0" style="display: none">
  <div class="form-group col-sm-8 pull-left">
    <input type="text" name="QQpdffilename" id="QQpdffilename" class=" form-control QQpdffilename" placeholder="Enter File Name">
  </div>
  <div class="form-group">
    <button type="button" id="saveQQpdf" class="btn btn-sm btn-success saveQQpdf"> <i class="fa fa-save" aria-hidden="true"></i> Save <i class="fa fa-spinner fa-spin loading_btn1" style="display: none;"></i>
    </button>
    <button type="button" class="btn btn-danger btn-sm cancelQQpdf"> <i class="fa fa-ban mr-1"></i> Cancel </button>
  </div>
</div>



<!-- <div class="table-responsive mt-2">
  <table class="table QuickQuote_pdf_table table-bordered" id="QuickQuote_pdf_table">
    <thead class="bg-light">
      <tr>
        <th class="width5_perc text-center">#</th>
        <th class="width11_perc text-center">Date</th>
        <th class="text-center">PDF</th>
        <th class="width9_perc text-center">Actions</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div> -->


  </div>


</div>



</div>


    <?php
  }
?>

        
         
<br>
<!-- <button type="button" class="btn btn-sm btn-primary errorPage ml10"><a href="errorPage.php" class="errorPageColor"> File </a></button>    -->   
<?php
   $footstyle = 'footers';
   include('../../brok-wbui/views/footer.php');
   ?>
<?php include('jsTemplate.php'); ?>

<!-- Qq Coverges - Warning Popup -->
<button data-toggle="modal" data-target="#QqcovPopup" class="visibility_hidden QqcovPopup"></button>
<div class="modal fade" id="QqcovPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="IsocovPopup" aria-hidden="true">
<div class="modal-dialog modal-warning" role="document">
    <div class="modal-content">
        <div class="modal-header p-1">
            <h4 class="modal-title">Warning</h4>
        </div>
        <div class="modal-body">
            <p class="covWarningMsg">All <!--<insert coverage removed name>!--> data will be removed. Are you sure you want to proceed?</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-md btn-success" id="QqcovWarningOk" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
            <button type="button" class="btn btn-md btn-danger" id="QqcovWarningCancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
        </div>
    </div>
</div>
</div>

<script type="text/javascript"> 

 $(document).ready(function(){

  $(document).on('click','.QQshowpdf',function(){
    $('.QQpdfwraper').show();
    $('.QQpdffilename').val('');
  });

  $(document).on('click','.cancelQQpdf',function(){
    $('.QQpdffilename').val('');
    $('.QQpdfwraper').hide();
  });

  $(document).on('click','.saveQQpdf',function(){

    var pdfname = $('.QQpdffilename').val();

    if (pdfname == '') {
      new PNotify({ title: 'Error', text: 'File Name Should not be Empty', delay: 1500, type: 'error' });
    }else{
      
      // html2canvas(document.querySelector("#maindiv_quoteindication"),{height: 1500, width: 1300, removeContainer: true, logging: true}).then(canvas => {
      html2canvas(document.querySelector("#maindiv_quoteindication"),{height: 2800, width: 1600, x: 15, y: 15 }).then(canvas => {

          getCanvas = canvas;
          var imgageData = getCanvas.toDataURL("image/png");
          var newData = imgageData.replace(/^data:image\/png;base64,/, "");

          //Ajax 
          var savetype = 'quickquote';

          $('.saveQQpdf').attr('disabled','disabled');
          $('.loading_btn1').show();


          $.ajax({

              url: laravel_url+'/QuickQuote_save_pdf_image',
              data: {'image': newData,'filename': pdfname,'savetype': savetype},
              method: 'POST',
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              success: function(response) {
                var obj = jQuery.parseJSON(response);

                if (obj.status == 'ok') {
                  $('.QQpdffilename').val('');
                  new PNotify({ title: 'Success', text: obj.message , delay: 1500, type: 'success' });
                  getallQuickQuote_pdf();
                  
                }else{
                  new PNotify({ title: 'Error', text: obj.message , delay: 1500, type: 'error' });
                }

                $('.saveQQpdf').removeAttr('disabled',false);
                $('.loading_btn1').hide();
                 
              }
          });


          

    });
    }

  });


getallQuickQuote_pdf();
  function getallQuickQuote_pdf(){

    var table = $('#QuickQuote_pdf_table').DataTable({
        "bLengthChange": true,
        "bPaginate": true,
        "bInfo": true,
        "autoWidth": false,  
        "order": [[0, "desc"]],
        "processing": true,
        "serverSide": false,
        "destroy": true,
        "sAjaxSource": laravel_url+"/getQQsavedpdf/quickquote",
        "columns": [
          {  "render": function(data, type, row) {  return '';   }    },
          {
           "render": function(data, type, row) {
            return formatedate(row.created_at);
           }
          },
          {
           "render": function(data, type, row) {
              return '<a href="'+laravel_url+'/generate_quote_pdf/'+row.id+'" target="_blank" class="viewsavedpdf" data-pdfid="'+row.id+'" >'+row.pdfname+'</a>';
           }
          },
          {
           "render": function(data, type, row) {
            return '<center><a '+specific_diable_style+' href="javascript:void(0);" class="QQdeletepdf" data-pdfid="'+row.id+'" ><i class="fa fa-trash color_red" aria-hidden="true"></i></a></center>';
           }
          },
        ]
    });

  table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();


}


$(document).on('click','.QQdeletepdf',function(){
    var pdfid = $(this).data('pdfid');

    $.ajax({
        url: laravel_url+"/deletepdf",
        type:'post',
        data:{pdfid:pdfid},
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success:function(response){
            var obj = jQuery.parseJSON(response);
            if (obj.status == 'ok') {
              getallQuickQuote_pdf();
              new PNotify({ title: 'Success', text: obj.message , delay: 1500, type: 'success' });
            }else{
              new PNotify({ title: 'Error', text: obj.message , delay: 1500, type: 'error' });
            }
        }
    });
});

  
});

</script>