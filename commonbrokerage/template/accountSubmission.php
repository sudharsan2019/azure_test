 <style>
    .spinner {
        animation: rotate 2s linear infinite;
        z-index: 2;
        position: absolute;
        width: 27px;
        height: 27px;
        stroke: #0000ff;
    }
    .path {
        stroke: hsl(210, 70, 75);
        stroke-linecap: round;
        animation: dash 1.3s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
</style>
<div class="freezee_bg freezee_bg_div"></div>
    <div class="accSub mt-4" id="submissionpdf">
        <div id="quotecover" style="display: none;">
            <span class="processingSpinner"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> Processing... </span>
        </div>
    <!-- <div class="col-md-9 col-lg-9 col-sm-12 col-xs-12"> -->
        <ul class="nav nav-pills bg-light acc_details_pills_tab align-items-center" id="pills-tab" role="tablist">
            <li class="nav-item">
               <a class="nav-link active accTabs rqbiClickFuncOn" id="pills-accNotes-tab" data-toggle="pill" href="#pills-accNotes" role="tab" aria-controls="pills-accNotes" aria-selected="true" onclick="getallaccount_notes()"> Account Notes </a>
            </li>
            <li class="nav-item">
               <a class="nav-link accTabs isopricing rqbiClickFuncOn" id="pills-sub-tab" onclick="allsubmission_coverfn()" data-toggle="pill" href="#pills-sub" role="tab" aria-controls="pills-sub" aria-selected="false">ISO Pricing</a>
            </li>
            <li class="nav-item">
               <a class="nav-link accTabs" id="pills-rqbi-tab" data-toggle="pill" href="#pills-rqbi" role="tab" aria-controls="pills-rqbi" aria-selected="true"> RQBI </a>
            </li>
            <li class="nav-item">
               <a class="nav-link policyTab policy_notes_tab policy_btn_trigger accTabs rqbiClickFuncOn" id="pills-policy-tab" onclick="allpolicy_coverfn()" data-tabvalue="policytabdiv" data-toggle="pill" href="#pills-policy" role="tab" aria-controls="pills-policy" aria-selected="false">Policy File</a>
            </li> 
            <li class="nav-item">
               <a class="nav-link uploadTab policy_notes_tab policy_btn_trigger accTabs rqbiClickFuncOn" id="pills-upload-tab" data-toggle="pill" href="#pills-upload" role="tab" aria-controls="pills-upload" aria-selected="false"> Upload </a>
            </li>
            <li class="nav-item">
               <a class="nav-link addNoteTab policy_notes_tab policy_btn_trigger accTabs rqbiClickFuncOn" id="pills-addNoteTab-tab" data-toggle="pill" href="#pills-addNoteTab" role="tab" aria-controls="pills-addNoteTab" aria-selected="false"
               onclick="alladdnotes_coverfn()" > Add Note </a>
            </li>  
            <li class="nav-item">
               <a class="nav-link policyTab policy_notes_tab policy_btn_trigger accTabs rqbiClickFuncOn account_archive_tab" id="pills-policy-tab" onclick="allpolicy_coverfn()" data-tabvalue="archivetabdiv" data-toggle="pill" href="#pills-policy" role="tab" aria-controls="pills-policy" aria-selected="false">Archive</a>
            </li>
            <li class="nav-item">
                <span class="quoteid_design showquote_id mt-2 mr-2"></span>   
            </li>    
            <div class="text-right pull-right mb-4 policyNo">
                <span>Policy # : </span><span id="policy_no"></span>
            </div>
        </ul>

        <div class="tab-content card" id="pills-tabContent">
            <!-- accounts notes  -->
            <div class="tab-pane fade show active" id="pills-accNotes" role="tabpanel" aria-labelledby="pills-accNotes-tab">
                <div class="d-block"> 
                    <button type="button" class="btn btn-sm pull-right mb-2 new_notesbtn" onclick="resetnoteform(1)" <?php echo $specific_diable_style; ?>> New Note </button>
                </div>
                <div class="mb-5 account_type_newnote" style="display: none;">
                    <?php  
                        $editorval = "side_note_editor";
                        $editorclass = "account_note_editor";
                        $editor_savebtn = "account_note_savebtn";
                        $selectcategory = "account_selectcategory";
                        $colmdval = 'col-lg-4';
                        $datepickerid = 'submission_datepicker';
                        include('newNote.php'); 
                    ?>
                </div>
                <div class="sidetable_list_group accnotessection mt-2 pull-left width100_perc">
                    <div id="accnotescover" style="display: none;">
                        <span class="processingSpinner"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> Loading ... </span>
                    </div>
                    <div class="table-responsive mt-2 mb-2">
                        <table class="table table-bordered accountNotesTable" id="accountNotesTable">
                            <thead class="bg_lavender">
                                <tr>
                                    <th class="width25_perc" scope="col">Created By</th>
                                    <th class="width10_perc" scope="col">Date</th>
                                    <th class="width25_perc" scope="col">Note Name</th>
                                    <th class="width25_perc" scope="col">Note Type</th>
                                    <th class="width7_perc" scope="col">Actions</th>
                                </tr>
                            </thead>
                        </table>
                      <!--   <table class="table table-bordered" id="sideDataTable">
                            <thead class="bg_lavender">
                                <tr>
                                    <th scope="col" width="10%">#</th>
                                    <th scope="col" width="20%" >Date</th>
                                    <th scope="col">Note</th>
                                    <th scope="col" width="20%">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                            </tbody>
                        </table> -->
                    </div>
                </div>
            </div> 

            <!--Submission part -->
            <div class="tab-pane fade" id="pills-sub" role="tabpanel" aria-labelledby="pills-sub-tab">
                <div class="d-flex">
                    <div class="ml-1 mr-2">
                        <a href="javascript:void(0)" class="google"><img src="../img/g3.png" class="pt-1 imgLogo" alt="gsearch" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Google </em>"></a>
                    </div>
                    <div class="mr-3">
                        <a href="javascript:void(0)" class="fda"> <img src="../img/fda.png" class="p-2 imgLogo" alt="fda" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em>FDA </em>"></a>
                    </div>
                    <div class="mr-auto">
                        <a href="javascript:void(0)" class="cpsc"><img src="../img/cpsc.png" class="py-1 imgLogo" alt="cpsc"
                     data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em>CPSC </em>"></a>
                    </div>
                </div>

                <div class="col-md-12 pull-left p-0 mb-3 mt-4" id="isocoveragessec">
                    <label class="mr-5 fontweight700">Coverages</label>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input isoCoverages" checked id="isoGL" data-covtype="gl" name="isoCoverageType" value="1">
                        <label class="custom-control-label" for="isoGL">GL</label>
                    </div>
           
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input isoCoverages" id="isoLiquor" data-covtype="liquor" name="isoCoverageType" value="2">
                        <label class="custom-control-label" for="isoLiquor">Liquor</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input isoCoverages" id="isoOCP" data-covtype="ocp" name="isoCoverageType" value="3">
                        <label class="custom-control-label" for="isoOCP">OCP</label>
                    </div>
                    <small class="text-danger fontSize14 isoCovMandatoryMsg" style="display: none;"></small>
                    <small class="text-danger fontSize14 isoqqCovMsg" style="display: none;"></small>
                </div>
                
                <div class="submissionForm_div">
                    <form id="addsubmission_form" method="post">
                        <div class="p-2 mt-4 card cc_zz_exp classCodeBg">
                            <div class="form-row">
                                <div class="col-lg-3 col-md-6">
                                    <label> <b> Class Code </b></label>
                                </div>
                                <div class="col-lg-2 col-md-6">
                                    <label> <b> Zip </b></label>
                                </div>
                                <div class="col-lg-2 col-md-6">
                                    <label><b>City</b></label>
                                </div>
                                <div class="col-lg-2 col-md-6">
                                    <label> <b>Location </b> </label>
                                </div>
                                <div class="col-lg-2 col-md-6">
                                    <label> <b> Exposure </b></label>
                                </div>
                                <div class="col-lg-1 col-md-6"></div>
                            </div>
                            <div class="after-add-more" id="cov_clsCd_row0">
                                <div class="form-row mt-2 exposure_row" data-subrowid="1" data-unique_id="9999999999">
                                    <div class="col-lg-3 col-md-6">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <input type="text" class="form-control subClassCode Qclass_code_submission class_code_submissionvali" data-ptype="iso" data-qclassid="0" name="class_code_submission[]" id="Qclass_code_submission0" placeholder="Enter Classcode">

                                                <small class="text-muted class_ctext" id="ctext0" data-qctext="0"></small>
                                                <small class="text_color class_isotext" id="isotext0" data-qisotext="0"></small>
                                                <p class="pt-1 text-left pull-left text-danger width100_perc font80_perc iso_qq_cc_invalid_msg" id="iso_qq_cc_invalid_msg_0" style="display: none;">Invalid Class Code</p>

                                            </div>
                                            <div>
                                            <input type="hidden" class="Qclass_code_coverage" name="Qclass_code_coverage[]" id="Qclass_code_coverage0" data-rowid="0"><!--v5 implementation !-->
                                        </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-6">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <input type="text" class="form-control subZipCode Qzip_code_submission zip_code_submissionvali" data-qzipid="0" name="zip_code_submission[]" id="Qzip_code_submission0" placeholder="Enter Zip" maxlength="5" value="5">
                                            </div>
                                            <span id="isopricing_zip_err_msg0" class="text-danger" style="display:none;">Invalid</span>
                                            <small class="text-muted city_label" id="ziptext0"></small>
                                        </div>
                                    </div>
                        
						            <div class="col-lg-2 col-md-6">
							            <div class="form-group">
							                <div class="isocityname" id="city_name_td0">
								            </div>				 
							  <select class="form-control city_name_hide city" name="city">								
							   </select>
							            </div>
						            </div>
                                    <div class="col-lg-2 col-md-6">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text loc_add_text locAddText1" data-location_id="1"> L1 </div>
                                                </div>
                                                <input type="text" name="loc_add" id="loc_add0" class="form-control subLocAdd loc_add" autocomplete="data-off" placeholder="Enter Location">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-6">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <input type="text" class="form-control Qexposure_amount amountwithcommas prem_money subExpos" name="Qexposure_amount[]" id="Qexposure_amount0" placeholder="Enter Exposure" maxlength="9">
                                            </div>
                                            <small class="text-muted premium_base" id="pbtext0" data-qpbtext="0"></small> <br />
                                        </div>
                                    </div>

                                    <div class="col-lg-1 col-md-6 align-items-center subBtns">
                                        <div class="form-group">
                                            <button type="button" class="btn btn-primary btn-xs add_more_btn add_more_submission mb-2" id="add_more_btn0" data-toggle="tooltip" data-placement="top" title="Add Location" name="sub"> 
                                                <span> <i class="fa fa-plus" aria-hidden="true"></i> </span>
                                            </button>
                                            <button type="button" class="btn btn-xs btn-warning subCloneBtn mb-2" data-section="ac" data-toggle="tooltip" data-placement="top" title="Clone"> 
                                                <i class="fa fa-copy" aria-hidden="true"></i>
                                            </button>
                                            <button type="button" class="btn btn-danger btn-xs remove_more_btn1 mb-2" title="Remove" name="Qsub1" style="display: none;"> <i class="fa fa-remove" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="copy_addd">
                            </div>
                        </div>
                        <!--Progress division-->
                        <div class="row mt-2 mb-4">
                            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-2">
                                <label><b>Effective Date </b> <span class="color_red">*</span></label>
                                <div id="datepicker_submission" class="input-group date" data-date-format="mm-dd-yyyy">
                                    <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
                                    <input class="form-control bg_white effective_from iso_eff_date" type="text" id="effective_from" name="effective_from" readonly />
                                </div>
                            </div>
                            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-2 switch_6">
                                <fieldset class="form-group">
                                    <label> <b> Term </b> </label> <br>
                                    <label class="switch switch-icon switch-pill switch-primary-outline-alt">
                                        <input type="checkbox" class="switch-input switch-terms" id="switchValue">
                                        <span class="switch-label" data-on="6 months" data-off="1 year"></span>
                                        <span class="switch-handle"></span>
                                    </label>
                                </fieldset>
                            </div>
                            <div class="col-sm-12 col-xs-12 col-md-6 col-lg-8">
                                <label id="iso_limits"> <b> Limits </b></label>
                                <input type="text" id="inline-radios1" name="example_name" value="" />
                            </div>
                        </div>
             
                       <!--table-->
                       <div class="table-responsive mt-2">
                          <table class="table table-bordered mt-2 subTable">
                             <thead class="bg_lavender text-center">
                                <tr>
                                   <th scope="col" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Class Code </em>">CC</th>
                                   <th scope="col" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Policy Coverage </em>">PC</th>
                                   <th scope="col" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Loss Cost </em>">LC</th>
                                   <th scope="col" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Loss Cost Multiplier </em>">LCM</th>
                                   <th scope="col" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Base Rate </em>">BR</th>
                                   <th scope="col" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Increased Limits Factor </em>">ILF</th>
                                   <th scope="col" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Adjusted Base Rate </em>">ABR</th>
                                   <th scope="col" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Transaction Premium </em>">Premium</th>
                                </tr>
                            </thead>
                            <tbody class="text-center rate_table" id="iso_prem_bodyTable">
                            </tbody>
                        </table>
                    </div>
                    <!--      total premium block       -->
                    <div class="d-flex d-flex-row bg-light p-2 mt-2 premium_div">
                        <div class="col-lg-4 col-md-4 col-sm-12 p-1">
					       <div class="d-flex">
					           <button type="button" class="btn btn-sm btn-primary get_code_account get_quoteid_sendemailbtn  quicocodebtn_loader_show mr-1" <?php echo $specific_diable; ?> > Get Indicative Premium </button> 
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
				        <span><strong title="Total Premium(Prem/Ops)">Total Premium: &nbsp;</strong></span>
                        <span class="totpremium" style="display: none;">$<span class="tp_comma"></span></span>
                    </div>
                </div>
            </form>
            <!--      Pdf button        -->
            <div class="col-md-12 p0 mt-3 pull-left submission_pdf_table_wrapper" >
                <div class="form-group col-md-12 pull-left p0 ">
                    <button type="button" class="btn btn-sm btn-outline-primary send_email_btn" <?php echo $specific_diable; ?>> <i class="fa fa-send (alias)" aria-hidden="true"  ></i> Send Email </button>

                    <button type="button" class="btn btn-sm btn-outline-primary htmlToPdfBtn quicocodebtn_loader_show mr-1 d-none" <?php echo $specific_diable; ?>> <i class="fa fa-file-pdf-o (alias)" aria-hidden="true"  ></i> Save Indication
                    </button>
                    <svg class="spinner save_indication_loader" viewBox="0 0 50 50" style="display: none;">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg>
                </div>
                <div class="form-group col-md-4 pull-left p0 ">
                  
                </div>
                <div class="form-group file_name_wrap col-md-8 pull-left p0" style="display: none;">
                    <div class="form-group col-sm-8 pull-left">
                        <input type="text" name="" id="file_name" class="file_name form-control" placeholder="Enter file name">
                        <span class="pdf_errormsg"></span>
                    </div>
                    <div class="form-group">

                        <button type="button" id="subSaveBtn" class="btn btn-sm btn-success file_name_savebtn"> <i class="fa fa-save" aria-hidden="true"></i> Save <i class="fa fa-spinner fa-spin loading_btn" style="display: none;"></i>
                        </button>

                        <button type="button" class="btn btn-danger btn-sm cancel_savepdf"> <i class="fa fa-ban mr-1"></i> Cancel </button>
                    </div>
                </div>
            </div>
            <div class="col-md-12 pull-left sendEmail_wrap">
               <?php 
                include ('sendEmail.php'); 
               ?>
            </div>
            <div class="table-responsive mt-2">
                <table class="table submission_pdf_table table-bordered subTable" id="submission_pdf_table">
                    <thead class="bg-light">
                        <tr>
                            <th class="width5_perc text-center">#</th>
                            <th class="width11_perc text-center">Date</th>
                            <th class="text-center">PDF</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    <!--    Policy part     -->
    <div class="tab-pane fade" id="pills-policy" role="tabpanel" aria-labelledby="pills-policy-tab">
        <?php include('accountPolicy.php'); ?>
    </div> 

    <!--          Upload Part          -->
    <div class="tab-pane fade" id="pills-upload" role="tabpanel" aria-labelledby="pills-upload-tab">
        <?php 
            $doc_dropzoneval = "dropzone dropzone0";
            $docselctval = "indi_docselect";
            $upload_docdragdrop = "upload_dragdrop0";
            include('uploadDoc.php'); 
        ?>
    </div>

    <!--          Add Notes Part          -->
    <div class="tab-pane fade" id="pills-addNoteTab" role="tabpanel" aria-labelledby="pills-addNoteTab-tab">
        <div class="add_note_section">
            <?php 
                $editorval = "ad_note";
                $editorclass = "ad_note_editor";
                $editor_savebtn = "ad_note_savebtn";
                $selectcategory = "allnotes";
                include('newNote.php');
            ?>
        </div>
    </div>
         
    <!---rqbi-->
    <div class="tab-pane fade" id="pills-rqbi" role="tabpanel" aria-labelledby="pills-rqbi-tab">
    </div>
    <!---rqbi-->

    </div>
</div>

<!-- ----------------------LostPop Modal-----------------         -->
<div class="modal fade LostPop" data-backdrop="static" data-keyboard="false" id="LostPop">
    <div class="modal-dialog modal-md">
        <div class="modal-content col-md-9 p0">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title">Lost </h5>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <p class="text_19_center">Confirm Lost Submission?</p>
                <p> Reason</p>
                <select class="form-control" id="lost_selectreason">
                   <option value="Capacity"> Capacity </option>
                   <option value="Company Rating"> Company Rating </option>
                   <option value="Price"> Price </option>
                   <option value="Terms"> Terms </option>
                   <option value="Unknown"> Unknown </option>
                </select>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button"  data-islostval="1" data-select="lost_selectreason" class="btn btn-sm btn-primary changeaccount_status"><i class="fa fa-dot-circle-o"></i> Submit</button>
                <button type="reset" class="btn btn-sm btn-danger accountcancel" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
            </div>
        </div>
    </div>
</div>
<!-- ---------------------- cancel Modal------------------->
<div class="modal fade" data-backdrop="static" data-keyboard="false" id="cancelPop">
    <div class="modal-dialog modal-md">
        <div class="modal-content col-md-9 p0">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title"> Cancel</h5>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <p class="text_19_center">Confirm cancel?</p>
                <p> Reason</p>
                <select class="form-control" id="cancel_selectreason">
                   <option value="Insured Request"> Insured Request </option>
                   <option value="Non Payment"> Non Payment </option>
                   <option value="Out Of Business"> Out Of Business </option>
                   <option value="Underwriting Reasons"> Underwriting Reasons </option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" data-islostval="3" data-select="cancel_selectreason" class="btn btn-sm btn-primary changeaccount_status"><i class="fa fa-dot-circle-o"></i> Submit</button>
                <button type="reset" class="btn btn-sm btn-danger accountcancel" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
            </div>
        </div>
    </div>
</div>
<!-- ----------------------Modal------------------->
<!-- The Modal -->
<div class="modal fade" data-backdrop="static" data-keyboard="false" id="declinePop">
    <div class="modal-dialog modal-md">
        <div class="modal-content col-md-9 p0">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title"> Decline </h5>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <p class="text_19_center">Confirm Decline?</p>
                <p> Reason </p>
                <select class="form-control" id="decline_selectreason">
                   <option value="Account Size"> Account Size </option>
                   <option value="Appetite"> Appetite </option>
                   <option value="Class"> Class </option>
                   <option value="Loss History"> Loss History </option>
                   <option value="Pricing"> Pricing </option>
                   <option value="Terms"> Terms </option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="submit" data-islostval="2"  data-select="decline_selectreason" class="btn btn-sm btn-primary changeaccount_status"><i class="fa fa-dot-circle-o"></i> Submit</button>
                <button type="reset" class="btn btn-sm btn-danger accountcancel" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
            </div>
        </div>
    </div>
</div>
<!--   Document Reassign poppup start -->

<div class="modal fade" id="document_reassign" style="background: rgb(0, 0, 9, 0.7);z-index:99999;" class="indiReass" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-info modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"> Document Reassign </h4>
                <button type="button" class="close btn btn-lg" data-dismiss="modal" aria-label="Close">&times; </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <input type="hidden" name="reassigndocumentid" class="reassigndocumentid" value="">
                    <label for="documentselect">Category</label>
                    <select id="documentselect" name="documentselect" class=" form-control documentselect">
                        <option value="submission">Submission</option>
                        <option value="indication">Indication</option>
                        <option value="quote">Quote</option>
                        <option value="bind">Bind</option>
                        <option value="issue">Issue</option>
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
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger reassignclose" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!--   Document Reassign poppup End -->

<!--   Email Reassign poppup start -->

<div class="modal fade" id="email_reassign" style="background: rgb(0, 0, 9, 0.7);z-index:99999;" class="indiReass" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-info modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"> Email Reassign </h4>
                <button type="button" class="close btn btn-lg" data-dismiss="modal" aria-label="Close">&times; </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <input type="hidden" name="reassignemilid" class="reassignemilid" value="">
                    <label for="emailselect">Category</label>
                    <select id="emailselect" name="emailselect" class=" form-control emailselect">
                        <option value="submission">Submission</option>
                        <option value="indication">Indication</option>
                        <option value="quote">Quote</option>
                        <option value="bind">Bind</option>
                        <option value="issue">Issue</option>
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
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger reassignclose" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!--   Email Reassign poppup End -->

<!-- Notes Delete Popup Start -->
<button type="button" class="btn btn-danger trigger_notes_todelete" data-toggle="modal" data-target="#notes_deletepopup_modal" style="visibility: hidden;"></button>
<div class="modal fade notes_deletepopup_modal" id="notes_deletepopup_modal"  aria-hidden="true" data-backdrop="static" data-keyboard="false" >
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Confirm</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="notes_are_delete text-center font21">Confirm Delete?</p>
            </div>
            <div class="modal-footer">
                <input type="hidden" name="hiddennoteid" class="hiddennoteid">
                <button type="button" class="btn btn-md btn-success deletenotes" data-dismiss="modal" ><i class="fa fa-check"></i> Yes</button>
                <button type="button" class="btn btn-md btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> No</button>
            </div>
        </div>
    </div>
</div>
<!-- Notes Delete Popup End -->

<!-- Document Delete Popup Start -->
<button type="button" class="btn btn-danger trigger_docs_todelete" data-toggle="modal" data-target="#docs_deletepopup_modal" style="visibility: hidden;"></button>
<div class="modal fade docs_deletepopup_modal" id="docs_deletepopup_modal"  aria-hidden="true" data-backdrop="static" data-keyboard="false" >
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Confirm</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="docs_are_delete text-center font21">Confirm Delete?</p>
            </div>
            <div class="modal-footer">
                <input type="hidden" name="hiddendocid" class="hiddendocid">
                <button type="button" class="btn btn-md btn-success deletedocs" data-dismiss="modal" ><i class="fa fa-check"></i> Yes</button>
                <button type="button" class="btn btn-md btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> No</button>
            </div>
        </div>
    </div>
</div>
<!-- Document Delete Popup End -->

<!-- Email Delete Popup Start -->
<button type="button" class="btn btn-danger trigger_email_todelete" data-toggle="modal" data-target="#email_deletepopup_modal" style="visibility: hidden;"></button>
<div class="modal fade email_deletepopup_modal" id="email_deletepopup_modal"  aria-hidden="true" data-backdrop="static" data-keyboard="false" >
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Confirm</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="email_are_delete text-center font21">Confirm Delete?</p>
            </div>
            <div class="modal-footer">
                <input type="hidden" name="hiddenemailid" class="hiddenemailid">
                <button type="button" class="btn btn-md btn-success delete_emails" data-dismiss="modal" ><i class="fa fa-check"></i> Yes</button>
                <button type="button" class="btn btn-md btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> No</button>
            </div>
        </div>
    </div>
</div>
<!-- Email Delete Popup End -->

<!-- Majesco URL Delete Popup Start -->
<button type="button" class="btn btn-danger trigger_majesco_todelete" data-toggle="modal" data-target="#majesco_deletepopup_modal" style="visibility: hidden;"></button>
<div class="modal fade majesco_deletepopup_modal" id="majesco_deletepopup_modal"  aria-hidden="true" data-backdrop="static" data-keyboard="false" >
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Confirm</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="text-white">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="majesco_delete text-center font21">Confirm Delete?</p>
            </div>
            <div class="modal-footer">
                <input type="hidden" name="hiddenurlid" class="hiddenurlid">
                <button type="button" class="btn btn-md btn-success deletemajescourl" data-dismiss="modal" ><i class="fa fa-check"></i> Yes</button>
                <button type="button" class="btn btn-md btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> No</button>
            </div>
        </div>
    </div>
</div>
<!-- Majesco URL Delete Popup End -->

<!-- Iso Coverges - Warning Popup -->
<button data-toggle="modal" data-target="#IsocovPopup" class="visibility_hidden IsocovPopup"></button>
<div class="modal fade" id="IsocovPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="IsocovPopup" aria-hidden="true">
<div class="modal-dialog modal-warning" role="document">
    <div class="modal-content">
        <div class="modal-header p-1">
            <h4 class="modal-title">Warning</h4>
        </div>
        <div class="modal-body">
            <p class="covWarningMsg">All <!--<insert coverage removed name>!--> data will be removed. Are you sure you want to proceed?</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-md btn-success" id="IsocovWarningOk" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
            <button type="button" class="btn btn-md btn-danger" id="IsocovWarningCancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
        </div>
    </div>
</div>
</div>

<script type="text/javascript">   
    $('#addsubmission_form').bootstrapValidator({
        message: 'This value is nsaveot valid',
        feedbackIcons: {
            validating: 'glyphicon glyphicon-refresh'
        },
   
        fields: {
            'class_code_submission[]': {
            selector: '.class_code_submissionvali',
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
         
        'zip_code_submission[]': {
        selector: '.zip_code_submissionvali',      
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

         'Qexposure_amount[]': {
          selector: '.Qexposure_amount', 
                validators: {
                    notEmpty: {
                    message: 'Exposure Amount Cannot be blank'
                },
                regexp: {
                    regexp: /^[0-9k,m$,-\s]*$/,
                    message: 'Exposure Amount is 1k and 1m or 10000'
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

    $('#addsubmission_form').bootstrapValidator();
       
    $(document).ready(function() {
        id_inputccvali = $('.class_code_submissionvali').attr('name');
        id_inputccvalizip = $('.zip_code_submissionvali').attr('name');
        id_inputccvaliexpo = $('.exposure_amount').attr('name');
       // Generate a simple captcha
        $('#form_validation_btn').click(function() {
           $('#addsubmission_form').bootstrapValidator();           
        }); 
    });  
</script>