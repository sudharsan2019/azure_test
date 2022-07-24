<!-- - Author: Shakina,vetri  Note: Brokerage  -->
<?php include('loginMain.php'); ?>
<?php 
  include('cssTemplate.php'); 
  error_reporting(E_ERROR | E_PARSE);
?>
<div class="loader">
   <div class="lds-ripple page_loading_design">
        <div></div>
        <div></div>
    </div>
    <br><span class="pleasewait_text">Please Wait...</span>
    <script type="text/javascript">
        $(window).load(function() {
           //return true;
           $(".loader").fadeOut("slow");
        });
    </script>
</div>

<style type="text/css">
   .select2-container {
   box-sizing: border-box;
   display: inline-block;
   margin: 0;
   position: relative;
   vertical-align: middle;
   width: 100% !important;
   }
   select {
   height: 100% !important;
   }
   .acc_not_created {
	border-radius: 0; 
	background: #ff0e0ea8; 
	text-align: center;
   }
    .acc_not_created p {
        margin: 0; width: 100%;
    }
</style>
<div class="row">
   <!--Left Sidebar-->
    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 nopadding pull-left">
        <div class="col-md-3 col-lg-4 col-sm-4 col-xs-12 sb_left_sidebar pl0 pull-left margin_top_2prec responsive_width_alignment">
            <div class="card-body pt0">
                <div class="col-md-12 pull-left badge-primary submissionsEmailHeader">
                    Submissions Email
                </div>
                <div class="tab-content sb_left_sidebar_list">
                    <div class="tab-pane fade active show div_scroll_bar style-7" id="mysub" role="tabpanel">
                        <div class="card-body nopadding">
                            <div class="list-group nav nav-tabs tabs-left showmaillists">
                        </div>
                      </div>
                   </div>
                </div>
            </div>
        </div>
        <!--Left Sidebar End-->
        <?php include ('../template/searchBar.php'); ?>
        <!-- Main Content -->
        <div id="transcroller-body" class="col-md-9 col-lg-8 col-sm-8 col-xs-12 pull-left aos-all pl0 mail_details_responsive_width email_submission_bg_color">
            <div class="text-left border-light bg-white mail_detailsdiv deatils_email_border aos-item" data-aos="fade-right">
            <h3 class="strip_bar completed_tab col-md-12" >
                    <div class="d-flex px-4 justify-content-between">
                        <div> Account  <span class="accountName" style="">: <b></b></span> </div>
                        <div> Broker  <span class="brokerName" style="">: <b></b></span> </div>
                        <div> Submission # <b> <span class="submissionid" style="">: <b></b></span> </b> </div>
                        <span class="curosor_pointer"> 
                            <i class="fa fa-download font17 eml_download1" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Download </em>"></i> 
                            <span class="download1" style="display:none"></span>
                        </span> 
                    </div>
					
                </h3>
                <div id="account_create" style="display:none">
				<h3 class="strip_bar completed_tab col-md-12 mt-1">
					<div class="d-flex px-4 justify-content-between">
                        <div> Account   <span class="accountName2">: <b></b></span> </div>
                        <div> Broker  <span class="brokerName2">: <b></b></span> </div>
                        <div> Submission #	  <b> <span class="submissionid2">: <b></b></span> </b> </div>
                        <span class="curosor_pointer"> 
                            <i class="fa fa-download font17 eml_download2" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Download </em>"></i> 
                            <span class="download2" style="display:none"></span>
                        </span> 
                    </div>
				</h3>
				</div>
                <h3 class="strip_bar  col-md-12 mt-1 acc_not_created" style="display:none">
                    <p> <span class="accnotcreated"></span>account not created</p>       
                </h3>
                <div class="aos-item__inner">
                    <div class="col-md-9 col-lg-12 col-sm-8 col-xs-12 pull-left mail_details_div responsive_design_submission padding_bottom_60px">
                        <div class="tab-content sb_tab_content minheight_380 border-0">
                            <div class="tab-pane drag_drop_section" id="drag_darw">
                                <h4 class="text14">Click here to drag-drop 
                                    <span class="pull-right">
                                        <a class="dragemail_goback" href="javascript:void(0);"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i> Back</a>
                                    </span>
                                </h4>
                                <div class="drag_and_draw_design dropzone dropzone_submission">
                                </div>                         

                                <p class="maximum_file_size"><span class="color_red">*</span> Maximum size of the file(s) should be <span class="color_red">30MB</span></p>
                                <button class="btn btn-primary btn-sm col-md-3 pull-right margin_39 submission_upload_btn">
                                    <span><i class="fa fa-upload" aria-hidden="true"></i></span> Upload
                                </button>
                                <br>
                                <br>
                            </div>
                            <div class="submission_tab submission_tab_design">
                            <div>
                                <span id="pdfview"></span>
                                <iframe align="left" id="pdfmail_view" class="pdfmail_view" src="" style="border:none;display:none;" width="100%" height="870px"></iframe>
                            </div>

                            <div class="tab-pane active mr-1 emailbody" id="tab1" style="display:none">
                                <div class="card card-accent-info open_pdf_section_email">
                                <div class="card-header">
                                    <h4 class="pdf_name_design_email"></h4>
                                </div>
                                <div class="card-body p0">
                                    <div id="pdf-main-container" class="pdfview_design_email">
                                        <div id="pdf-loader" style="display: none;">Loading document ...</div>
                                            <div id="pdf-contents" style="display: block;">
                                                <div id="pdf-meta" class="col-md-12">
                                                    <div id="pdf-buttons" class="col-md-8 pull-left">
                                                        <a class="btn btn-info btn-sm prev-small-btn" id="pdf-prev" href="#">
                                                            <i class="fa fa-caret-left"></i>
                                                        </a>
                                                               
                                                        <a class="btn btn-info btn-sm next-small-btn" id="pdf-next" href="#">
                                                            <i class="fa fa-caret-right"></i>
                                                        </a>
                                                               
                                                        <i id="zoominbutton" class="fa fa-search-plus font16"></i>
                                                        <i id="zoomoutbutton" class="fa fa-search-minus font16"></i>
                                                                <!-- <a id="download_attachment" href="https://ategrity-dev.esinsurancecloud.com/emailsubmissions/submission/index.php/workitem/getattachment_url?id=110" download=""> <i id="download_attachment" class="fa fa-download font16" href="https://ategrity-dev.esinsurancecloud.com/emailsubmissions/submission/index.php/workitem/getattachment_url?id=110"></i></a> -->
                                                                <!-- <a id="openin_new_window" href="https://ategrity-dev.esinsurancecloud.com/emailsubmissions/submission/index.php/workitem/getattachment_url?id=110" target="_blank"> <i class="fas fa-external-link-alt font16"></i> </a> -->

                                                                <!--    <label>Goto</label>
                                                    <input type="text" name="pdf_page_no" class="pdf_page_no">  -->

                                                    </div>
                                                    <div id="page-count-container" class="col-md-4 pull-left">
                                                        <span>Page
                                                            <span id="pdf-current-page">1</span> of
                                                            <span id="pdf-total-pages">2</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <br>
                                                <br>
                                                <canvas id="pdf-canvas" width="650" class="display-block" height="905" style=""></canvas>
                                                <div id="page-loader" style="display: none;">Loading page ...</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>            
                            </div>                 
                        </div>
                    </div>
                </div>
                <div class="tab-pane mr-1 email_cover" id="tab2" style="display:none">
					<div class="emailattach">
					</div>
                    <div class="card card-accent-info open_pdf_section">
                        <div class="card-header">
                            <h4 class="pdf_name_design"></h4>
                        </div>
                        <div class="card-body p0">
                            <div id="pdf-main-container" class="pdfview_design">
                                <div id="pdf-loader" style="display: none;">Loading document ...</div>
                                    <div id="pdf-contents" style="display: block;">
                                        <div id="pdf-meta" class="col-md-12">
                                            <div id="pdf-buttons" class="col-md-8 pull-left">
                                                <a class="btn btn-info btn-sm prev-small-btn" id="pdf-prev" href="#">
                                                    <i class="fa fa-caret-left"></i>
                                                </a>
                                                               
                                                <a class="btn btn-info btn-sm next-small-btn" id="pdf-next" href="#">
                                                    <i class="fa fa-caret-right"></i>
                                                </a>
                                                               
                                                <i id="zoominbutton" class="fa fa-search-plus font16"></i>
                                                <i id="zoomoutbutton" class="fa fa-search-minus font16"></i>
                                                                <!-- <a id="download_attachment" href="https://ategrity-dev.esinsurancecloud.com/emailsubmissions/submission/index.php/workitem/getattachment_url?id=110" download=""> <i id="download_attachment" class="fa fa-download font16" href="https://ategrity-dev.esinsurancecloud.com/emailsubmissions/submission/index.php/workitem/getattachment_url?id=110"></i></a> -->
                                                                <!-- <a id="openin_new_window" href="https://ategrity-dev.esinsurancecloud.com/emailsubmissions/submission/index.php/workitem/getattachment_url?id=110" target="_blank"> <i class="fas fa-external-link-alt font16"></i> </a> -->
                                            </div>
                                            <div id="page-count-container" class="col-md-4 pull-left">
                                                <span>Page
                                                <span id="pdf-current-page">1</span> of
                                                <span id="pdf-total-pages">2</span>
                                                </span>
                                            </div>
                                        </div>
                                        <br>
                                        <br>
                                        <canvas id="pdf-canvas" width="650" class="display-block" height="905" style=""></canvas>
                                        <div id="page-loader" style="display: none;">Loading page ...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>                 
                </div>
            </div> 
        </div>
    </div>
</div>
<!-- Main Content End-->
</div>

<!-- ----------------------LostPop Modal-----------------         -->
<div class="modal fade action_pop" data-backdrop="static" data-keyboard="false" id="LostPop">
    <div class="modal-dialog modal-md">
        <div class="modal-content col-md-9 p0">
            <!-- Modal Header -->
            <div class="modal-header">
               <h5 class="modal-title"> Lost </h5>
               <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
               <p class="text_19_center">Confirm Lost Submission?</p>
               <p> Reason</p>
               <select class="form-control lost_reason">
                  <option value="Capacity"> Capacity </option>
                  <option value="Company Rating"> Company Rating </option>
                  <option value="Price"> Price </option>
                  <option value="Terms"> Terms </option>
                  <option value="Unknown"> Unknown </option>
               </select>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
               <button type="submit" class="btn btn-sm btn-primary lost_btn"><i class="fa fa-dot-circle-o"></i> Submit</button>
               <button type="reset" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
            </div>
         </div>
      </div>
   </div>

<!-- ---------------------- cancel Modal------------------->
<div class="modal action_pop" data-backdrop="static" data-keyboard="false" id="cancelPop">
   <div class="modal-dialog modal-md">
        <div class="modal-content col-md-9 p0">
        <!-- Modal Header -->
        <div class="modal-header">
            <h5 class="modal-title"> Cancel </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
            </button>
        </div>
         <!-- Modal body -->
        <div class="modal-body">
            <p class="text_19_center">Confirm Cancel?</p>
            <p> Reason</p>
            <select class="form-control cancel_reason">
               <option value="Insured Request"> Insured Request </option>
               <option value="Non Payment"> Non Payment </option>
               <option value="Out Of Business"> Out Of Business </option>
               <option value="Underwriting Reasons"> Underwriting Reasons </option>
            </select>
         </div>
         <div class="modal-footer">
            <button type="submit" class="btn btn-sm btn-primary cancel_btn"><i class="fa fa-dot-circle-o"></i> Submit</button>
            <button type="reset" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
         </div>
      </div>
   </div>
</div>

<!-- ----------------------Modal------------------->
<!-- Decline Modal -->
<div class="modal fade action_pop" data-backdrop="static" data-keyboard="false" id="declinePop">
   <div class="modal-dialog modal-md">
        <div class="modal-content col-md-9 p0">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title"> Decline </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <p class="text_19_center">Confirm Decline?</p>
                <p> Reason </p>
                <select class="form-control decline_reason">
                   <option value="Account Size"> Account Size </option>
                   <option value="Appetite"> Appetite </option>
                   <option value="Class"> Class </option>
                   <option value="Loss History"> Loss History </option>
                   <option value="Pricing"> Pricing </option>
                   <option value="Terms"> Terms </option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-sm btn-primary decline_btn"><i class="fa fa-dot-circle-o"></i> Submit</button>
                <button type="reset" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
            </div>
        </div>
    </div>
</div>
<!-- ----------------------Cancel Modal------------------->
<div class="modal fade action_pop" data-backdrop="static" data-keyboard="false" id="cancelPop">
   <div class="modal-dialog modal-md">
        <div class="modal-content col-md-9 p0">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title"> Cancel </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <p> Reason</p>
                <select class="form-control cancel_reason">
                   <option value="Insured Request"> Insured Request </option>
                   <option value="Non Payment"> Non Payment </option>
                   <option value="Out Of Business"> Out Of Business </option>
                   <option value="Underwriting Reasons"> Underwriting Reasons </option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-sm btn-primary cancel_btn"><i class="fa fa-dot-circle-o"></i> Submit</button>
                <button type="reset" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
            </div>
        </div>
    </div>
</div>

<!--- Attachement Popup -->
<button type="button" class="btn btn-primary" id="attachement_document_btn" data-toggle="modal" data-target="#attachement_popup" style="display:none;">Attachement Document</button>
<div class="modal fade" id="attachement_popup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content exammod">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Attachment Email</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="eml_html_attachment"></div>
            </div>
        </div>
    </div>
</div>
<!-- ---------------------- Delete Modal------------------->
<div class="modal fade deletepopup_modal" id="deletepopup_modal"  aria-hidden="true" data-backdrop="static" data-keyboard="false" >
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content col-md-9 p0">
            <div class="modal-header">
                <h5 class="modal-title"> Delete </h5>      
            </div>
            <div class="modal-body">
                <p class="are_delete">Confirm Delete?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-success yes_delete_btn"><i class="fa fa-check"></i> Yes</button>
                <button type="button" class="btn btn-sm btn-danger trigger_to_no" data-dismiss="modal"><i class="fa fa-remove"></i> No</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
   <!-- /.modal-dialog -->
</div>
<div class="modal fade yesModal" id="yesModal" data-backdrop="static" data-keyboard="false"  aria-hidden="true">
    <div class="modal-dialog modal-success" role="document">
        <div class="modal-content col-md-9 p0">
            <div class="modal-header">
                <h5 class="modal-title">Deleted</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="are_delete">Successfully Deleted</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-success ok_delete_btn" data-dismiss="modal"><i class="fa fa-thumbs-o-up"></i> Ok</button>
            </div>
        </div>
      <!-- /.modal-content -->
    </div>
   <!-- /.modal-dialog -->
</div>
<div class="modal fade" data-backdrop="static" data-keyboard="false" id="assignToModal">
    <div class="modal-dialog modal-lg modal_max_width">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title"> Assign to </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <p class="text_19_center">Account Search</p>
                <div class="form-group assignPop">
                    <div class="input-group">                 
                        <!-- Search Form Demo -->
                        <div class="width100_perc" style="clear: both;">
                            <input type="text" class='mySearch assign_to_search' id="ls_query" placeholder="Type to start searching ...">
                        </div>
                        <!-- /Search Form Demo -->
                    </div>
                </div>               
			    <div class="form-group renewal_hide">
                    <label>Date</label>
                    <div id="datepicker1" class="input-group date" data-date-format="mm-yyyy">
                        <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
                        <input class="form-control bg_white" type="text"  id="renwal_monthyear" readonly />
                    </div>
                </div>
                <br>
                <label> Category </label>
                <select class="form-control selectedStage">
                    <option value="submission">Submission</option>
                    <option value="indication">Indication</option>
                    <option value="issue">Issue</option>
                    <option value="quote">Quote</option>
                    <option value="bind">Bind</option>
                    <option value="tria">TRIA</option>
                    <option value="policy">Policy</option>
                    <option value="endorsement">Endorsement</option>
                    <option value="sov">SOV/Property</option>
                    <option value="inspection">Inspection</option>
                    <option value="premiumaudit">Premium Audit</option>
                    <option value="reinsurance">Reinsurance</option>
                    <option value="general">General/Unassigned</option>
                    <option value="claims">Claims</option>
                    <option value="renewal">Renewal</option>
                    <option value="payments">Payments</option>
                </select>

                <input type="hidden" name="renewalcreation" class="renewalcreation" value="">
            
                <div class="pull-right">
                    <button type="submit" class="btn btn-sm btn-primary assignToSubmit"><i class="fa fa-dot-circle-o"></i> Submit</button>
                    <button type="reset" class="btn btn-sm btn-danger assign_cancel_btn" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
                </div>
                <br>            
            </div>
        </div>
    </div>
</div>

<div class="modal fade restore_modal" id="restore_modal"  aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Confirm</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="notes_are_delete text-center font21">Confirm Restore?</p>
            </div>
            <div class="modal-footer">
                <input type="hidden" name="hiddennoteid" class="hiddennoteid">
                <button type="button" class="btn btn-md btn-success deletenotes restore_btn" data-dismiss="modal" ><i class="fa fa-check"></i> Yes</button>
                <button type="button" class="btn btn-md btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> No</button>
            </div>
        </div>
    </div>
</div>

<!-- ----------------------Modal------------------->
<?php
   $footstyle = 'footers';
   include('../../wbui/views/footer.php');
   ?>
<?php include('jsTemplate.php'); ?>

<!-- drap drop js start -->
<script type="text/javascript" src="../js/backendjs/dragdrop/dropzone.js"></script>
<script type="text/javascript" src="../js/backendjs/dragdrop/drag_drop_management_front.js"></script>
<!-- drap drop js end -->

<script type="text/javascript">
   $(window).on('load', function() {
       $('.account_list_add_btn').hide();
       $('.show_account_filter_btn').hide();
       $('.top_searchbox').removeClass('account_list_searchbar');
       $('.filter_section_design').removeClass('accountlist_filters')
	     $('.search_icon_button_design').removeClass('btn_full_widthalign');
       $('.searchbar_div').removeClass('searchbar_div2');
   });
   $(document).ready(function() {
        $('.open_pdf_section').hide();
        $('.open_pdf_section_email').hide();
        $('.open_pdf_btn').click(function(){
        $('.open_pdf_section').show();
        $('.searchbar_div').removeClass('searchbar_div2');
   });

   $("#datepicker1").datepicker({ 
        autoclose: true, 
        todayHighlight: true
  }).datepicker('update', new Date());
   
   
   $(document).on('click','.open_pdf_close_btn',function(){
        $('.open_pdf_section').hide();
        $('.open_pdf_section_email').hide();
   });
});
</script>

<script>
   AOS.init({
     easing: 'ease-in-out-sine'
   });
</script>

