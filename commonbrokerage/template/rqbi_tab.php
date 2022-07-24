<div class="col-md-12 pl-0 pr-0 qvSection">
    <div class="width100_perc pull-left">
        <div id="named_insured" class="named_insured" style="line-height: 14px; width:300px; display: none;" data-nooflinecount="" data-divheight="0"></div>
        <div id="agency_addr" class="agency_addr" style="line-height: 14px; width:300px; display: none;" data-nooflinecount="" data-divheight="0"></div>
    </div>
    <div class="form-row pull-left width100_perc">
        <div class="col-md-2">
            <div class="form-group">
                <label for=""> Quote Version </label>
                <div class="col-md-12 pl-0">
                   <select  class="form-control rqbiQuoteVersion pull-left" id="rqbiQuoteVersion" name="rqbiQuoteVersion" onchange="onchng_quote_version(this.value)">
                      <option value="">Select</option>
                   </select>
                   <input hidden type="text" id="acnt_id" name="acnt_id" >
                </div>
            </div>
        </div>

        <div class="effective_dte_sec">
            <div class="form-group">
                <label for="rqbieffdate"> Effective Date </label>
                <div id="rqbi_effect_dt" class="input-group date mb-3" data-date-format="mm-dd-yyyy">
                    <input class="form-control bg_white" type="text" id="rqbieffdate" readonly=""/>
                    <span class="input-group-addon" style="display: none;"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                    <span style="color: red; display: none" id="effDateEmptyValid">Please Enter Effective Date</span>
                </div>
            </div>
        </div>
        <div class="exp_dte_sec">
            <div class="form-group">
                <label for="rqbiexpdate"> Expiration Date </label>
                <div id="rqbi_expir_dt" class="input-group date mb-3" data-date-format="mm-dd-yyyy">
                    <input class="form-control bg_white" type="text" id="rqbiexpdate" readonly="" />
                    <span class="input-group-addon" style="display: none;"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                    <span style="color: red; display: none" id="expDateValid"></span>
                </div>
            </div>
        </div> 
        <div>
            <div class="col-md-12 pull-left p-0">
                <label class="col-md-12">Policy Type</label>
                <div class="col-md-12">
                    <input type="radio" class="rqbi_policy_type" checked id="rqbiOccurance" name="rqbiPolicytype" value="1" title=""> Occurrence &nbsp;&nbsp;
                    <input type="radio" class="rqbi_policy_type" id="rqbiClaims" name="rqbiPolicytype" value="2" title=""> Claims Made
                </div>
            </div>
        </div>
        
        <div class="excelrater">
            <div class="excelrater_file_upload">
                <div class="file-select">
                    <div class="file-select-button" id="fileName">Rater Upload</div>
                    <input type="file" name="excelrater_fileupload" class="excelrater_fileupload" id="excelrater_fileupload" disabled = "disabled">
                </div>
                <button class="btn_canel_excelrater btn btn-xs btn-danger" disabled = "disabled">
                    <i class="fa fa-close" aria-hidden="true"></i>
                </button>
                <button class="btn_upload_excelrater btn btn-xs btn-success" disabled = "disabled">
                    <i class="fa fa-upload" aria-hidden="true"></i>
                </button>
            </div><br>
            <div class="file-select-name" id="noFile">No file chosen...</div> 
            <!-- <input type="file" name="excelrater_fileupload" class="excelrater_fileupload" id="excelrater_fileupload"> -->
        </div>
        
        <div class="text-right" id="rqbi_tab_rightSide">
            <div class="dropdown addQuoteDiv pull-right">
                <button type="button" class="btn btn-sm btn-info text-white dropbtn cloneQuoteBtn" onclick="get_lastQuote_details()"><i class="fa fa-files-o" aria-hidden="true"></i> Clone Quote</button>
                <input hidden type="text" id="indication_hide_id" name="indication_hide_id" value="">
            </div>
            <div class="dropdown addQuoteDiv pull-right">
                <button class="btn btn-sm btn-primary mr-1 dropbtn"> <i class="fa fa-plus"></i> Add Quote </button>
                <div class="dropdown-content" id="add_quote_list">
                    <a href="javascript:void(0);"> New </a>
                    <a href="javascript:void(0);"> Indication Quote 1 </a>
                    <a href="javascript:void(0);"> Indication Quote 2 </a>
                </div>
            </div>            
        </div>
    </div>
    <div class="col-md-12 p-0 pull-left">
        <div class="col-md-6 pull-left pt-4 text-right qvSpinner" style="display: none;">
            <span style="" class="text-primary quoteVersionSpinner">
                <i class="fa fa-spinner fa-spin"></i>
            </span>
            <span class="text-primary">Processing...</span>
        </div>
    </div>
</div>

<div class="card col-md-12 mb-1 mt-4 p-1 endorse_rhs" style="display: none;">
    <div class="form-group col-md-12 p-0 mb-0">
        <select class="form-control endorse_num_list pull-left col-md-3" id="endorse_num_list" name="endorse_num_list">
            <option value="">Select Product Version</option>
            
        </select>
        <a href="javascript:void(0);" class="text_underline pl-3 pv_change_reason">Reason for change</a>
    </div>
</div>

<!--Start RQBI Accordion Section-->
<div class="col-md-12 mt-4 p-0 pull-left rqbiAccordion">

    <button class="btn btn-primary btn-sm quote_doc_btn_sidevetrical quote_policy_details_btn" type="button" id="right_side_pane">Premium Summary</button>

    <div id="accordion" class="accordion rqbi_according_section col-md-12 p-0 pr-4 pull-left">
        <div class="col-md-12 p-0 width100_perc endorsementSection" style="display:none;">
            <div class="pull-left col-md-12 p-0 top_endor_discard_btn_sec" style="position:relative; display:none;">
                <button type="button" class="btn btn-sm btn-danger pull-right text-white endorseDiscardBtn top_endorseDiscardBtn"><i class="fa fa-ban" aria-hidden="true"></i> Discard Endorsement </button>
            </div>
            <fieldset class="scheduler-border">
                <legend class="scheduler-border"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                Endorsement</legend>
                <form class="form-inline mt-3">
                    <div class="form-group col-md-3 pb-4">
                        <label class="col-md-12 p-0 pb-1 display_initial">Endorsement Type</label>
                        <select class="form-control endorse_type pull-left col-md-12 p-0" id="endors_type" name="endorse_type">
                            <option value="">Select</option>
                            <option value="1">Endorse</option>
                            <option value="2">Cancellation</option>
                            <option value="3">Reinstatement</option>
                            <option value="4">Internal Endorsement</option>
                            <option value="5">Premium Audit</option>
                        </select>
                    </div>

                    <div class="form-group col-md-3 pb-4 endorse_date_sec endorse_fields" style="display: none;">
                        <label class="col-md-12 pb-1 p-0 display_initial">Endorsement Effective Date</label>
                         <div id="endorsementDate" class="input-group date col-md-12 p-0" data-date-format="mm-dd-yyyy">
                            <input class="form-control endorseDte" autocomplete="off" type="text" id="endorseDte" data-lbl-name="Endorsement" value="" placeholder="MM/DD/YYYY" />
                            <span class="input-group-addon date_icon endorse_date_icon" data-id="endorseDte" data-lbl-name="Endorsement"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                        </div>
                        <span id="Endorsement_eff_err"></span>
                    </div>

                    <div class="form-group col-md-3 pb-4 reinstate_date_sec reinstate_field" style="display: none;">
                        <label class="col-md-12 pb-1 p-0 display_initial">Reinstatement Date</label>
                         <div id="reinstatementDate" class="input-group date col-md-12 p-0" data-date-format="mm-dd-yyyy">
                            <input class="form-control reinstateDte" type="text" id="reinstateDte" data-lbl-name="Reinstatement"  value="" />
                            <span class="input-group-addon date_icon" data-id="reinstateDte" data-lbl-name="Reinstatement"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                        </div>
                        <span id="Reinstatement_eff_err"></span>
                    </div>

                    <div class="form-group col-md-3 pb-4 endorse_no_sec endorse_number_field" style="display: none;">
                        <label class="col-md-12 pb-1 display_initial p-0">Endorsement Number</label>
                        <input type="text" class="col-md-12 form-control endorse_number" disabled id="endorse_number" placeholder="Endorsement Number">
                    </div>                    

                    <div class="text-black pull-left rewrite_btn rewrite_field" style="display: none;">
                        <button type="button" class="btn btn-sm btn-info text-white pull-left rewrite_btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Rewrite </button>
                    </div>

                    <div class="form-group col-md-3 pull-left pb-4 audit_Dte_frmgrp audit_field" style="display: none;">
                        <label class="col-md-12 pb-1 p-0 display_initial">Audit Effective Date <span class="color_red">*</span></label>
                         <div id="audit_date" class="input-group date col-md-12 p-0" data-date-format="mm-dd-yyyy">
                            <input class="form-control audit_Dte" type="text" id="audit_Dte" data-lbl-name="Audit"  value="">
                            <span class="input-group-addon date_icon" data-id="audit_Dte" data-lbl-name="Audit" ><i class="fa fa-calendar" aria-hidden="true"></i></span>
                        </div>
                        <span id="Audit_eff_err"></span>
                    </div>            

                    <div class="form-group col-md-3 pull-left pb-4 cancellation_field" style="display: none;">
                        <label class="col-md-12 pb-1 p-0 display_initial">Cancellation Effective Date <span class="color_red">*</span></label>
                         <div id="cancellationDate" class="input-group date col-md-12 p-0" data-date-format="mm-dd-yyyy">
                            <input class="form-control cancel_effective_date" type="text" id="endorseDte" data-lbl-name="Cancellation"  value="" >
                            <span class="input-group-addon date_icon" data-id="endorseDte" data-lbl-name="Cancellation"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                        </div>
                        <span id="Cancellation_eff_err"></span>
                    </div>

                    <div class="form-group col-md-3 pull-left pb-4 cancellation_field" style="display: none;">
                        <label class="p-0 col-md-12 pb-1 display_initial">Cancellation Reason <span class="color_red">*</span></label>
                        <select class="form-control pull-left col-md-12 p-0 cancel_reason" id="cancel_reason" name="cancel_reason">
                            <option value="">Select</option>
                            <option value="1">Underwriting Reasons </option>
                            <option value="2">Coverage Placed Elsewhere</option>
                            <option value="3">Duplicate</option>
                            <option value="4">Insured Request</option>
                            <option value="5">No Longer in Business</option>
                            <option value="6">Nonpayment of Premium</option>
                            <option value="7">Policy Rewritten</option>
                            <option value="8">Failure to Comply with Audit</option>
                            <option value="9">Failure to Comply with Inspection/Loss Control</option>
                            <option value="10">Other</option>
                        </select>
                    </div>

                    <div class="col-md-3 pull-left pb-4 cancel_reason_sec" style="display: none;">
                        <div class="form-group col-md-12 pull-left p-0">
                            <label class="col-md-12 pb-1 p-0 display_initial">Cancellation Reason Details <span class="color_red">*</span></label>
                            <input class="form-control col-md-12 cancel_reason can_reason_det" type="text" id="cancel_reason">
                        </div>
                    </div>

                    <div class="col-md-12 p-0 pull-left">
                        <div class="form-group col-md-3 pull-left pb-4 cancellation_field" style="display: none;">
                            <label class="col-md-12 pb-1 p-0 display_initial">Cancellation Return Premium <span class="color_red">*</span></label>
                             <div class="input-group col-md-12 p-0">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>
                                <input class="form-control number_only" type="text" id="cancel_return_prem">
                            </div>
                        </div>

                        <div class="form-group col-md-3 pull-left pb-4 pr-0 cancellation_field" style="display: none;">
                            <label class="col-md-12 pull-left display_initial p-0 pb-1">Cancellation Method <span class="color_red">*</span></label>
                            <div id="cancellationMethod" class="input-group col-md-12 p-0">
                                <div class="custom-control custom-radio custom-control-inline">
                                  <input type="radio" class="custom-control-input cancel_method_radio" id="cancel_method_flat" name="cancel_method_radio">
                                  <label class="custom-control-label" for="cancel_method_flat">Flat</label>
                                </div>

                                <div class="custom-control custom-radio custom-control-inline">
                                  <input type="radio" class="custom-control-input cancel_method_radio" id="cancel_method_shortrate" name="cancel_method_radio">
                                  <label class="custom-control-label" for="cancel_method_shortrate">Short Rate</label>
                                </div>

                                <div class="custom-control custom-radio custom-control-inline">
                                  <input type="radio" class="custom-control-input cancel_method_radio" id="cancel_method_prorate" name="cancel_method_radio">
                                  <label class="custom-control-label" for="cancel_method_prorate">Prorate</label>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 pull-left pb-4 cancellation_field" style="display: none;">
                            <div class="form-group col-md-12 pull-left p-0">
                                <label class="col-md-12 pb-1 p-0 display_initial">Prorate Factor</label>
                                <input class="form-control col-md-12 prorate" disabled type="text" id="prorate">
                            </div>
                        </div>

                        <div class="form-group col-md-3 pb-4 endorse_no_sec cancellation_field" style="display: none;">
                            <label class="col-md-12 pb-1 display_initial p-0">Endorsement Number</label>
                            <input type="text" class="col-md-12 form-control endorse_number" disabled id="endorse_number" placeholder="Endorsement Number" value="">
                        </div>  
                    </div>
                    <input type="hidden" class="form-control endorse_rid" id="endorse_rid" value="">
                </form>
            </fieldset>
        </div>

        <div class="card mb-0">
           <div class="card-header locDetAccord rqbi_all_tabs" data-toggle="collapse" data-parent="#accordion" href="#locationAccord">
                <a class="card-title">
                    <i class="fa fa-location-arrow" aria-hidden="true"></i> Locations
                </a>
                <input type="hidden" name="hidden_id" id="hidden_id" value="2">
                <input type="hidden" name="uniq_id" id="uniq_id">
                <input type="hidden" name="clone_address2" id="clone_address2">
                <input type="hidden" name="clone_city" id="clone_city">
                <input type="hidden" name="clone_state" id="clone_state">
            </div>
            <div id="locationAccord" class="card-body collapse show">
                <form>
                    <div class="col-md-12 p-0 mb-4 pull-left">
                        <div class="custom-control custom-checkbox col-md-3 pull-left" id="">
                            <input type="checkbox" class="custom-control-input copyAddrCheck" checked id="copyAddrCheck" name="copyAddrCheck">
                            <label class="custom-control-label" for="copyAddrCheck">Copy From Mailing Address </label>
                        </div> 
                        <div class="col-md-4 pull-left" id="copy_addr_error" style="display: none;">
                            <label class="text-danger" id="adrs_zip_empty_err" style="display: none;">Address or Zip or City is empty in Mailing Address</label>
                            <label class="text-danger" id="already_exits_err" style="display: none;">Mailing address already exists</label>
                        </div>
                        <div class="col-md-4 pull-left text-center">
                            <small class="text-danger fontSize14 noSelectMsg" style="display: none;">Please enter mandatory fields</small>
                        </div>
                    </div>
                    <div class="loc_input_fields_wrap">
                        <div data-locrowid="1" data-locno="1" class="col-md-12 pull-left p-0 locbigdiv locDiv incRow locMainDiv locMainDiv_1">
                            <div class="pull-left locCount">
                                <div class="form-group">
                                    <label class="col-sm-12 col-form-label pl-0">L1</label>
                                </div>
                            </div>
                            <div class="col-md-2 pull-left p-0">
                                <div class="form-group">
                                    <label class="col-sm-12 col-form-label pl-0">Address 1 <span class="color_red">*</span> </label>
                                    <div class="txttooltip">
                                        <input type="text" class="form-control locAddress1 get_loc_onblr" data-column="address1" data-Lid="1" id="locAddress1_1" name="locAddress1" placeholder="Enter Address 1">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2 pull-left">
                                <div class="form-group">
                                    <label class="col-sm-12 col-form-label pl-0">Address 2 </label>
                                    <div class="txttooltip">
                                        <input type="text" class="form-control locAddress2 get_loc_onblr" data-column="address2" data-Lid="1" id="locAddress2_1" placeholder="Address 2">
                                    </div>.
                                </div>
                            </div>
                            <div class="col-md-2 pull-left">
                                <div class="form-group">
                                    <label class="col-sm-12 col-form-label pl-0">Zip Code <span class="color_red">*</span> </label>
                                    <input type="text" class="form-control locZipcode get_loc_onblr" data-column="zip" data-Lid="1" id="locZipcode_1" data-rowid="1" placeholder="Zip Code">
                                </div>
                            </div>
                            <div class="col-md-2 pull-left">
                                <div class="form-group">
                                    <label class="col-sm-12 col-form-label pl-0">City <span class="color_red">*</span></label>
                                    <span class="locationCity_1 locCitySpan_1"><select class="form-control loc_city_name_hide_1 locCity location_cty_onchg" data-Lid="1" id="locCity_1" name="loc_city_name_hide_1" placeholder="City"></select></span>
                                </div>
                            </div>
                            <div class="col-md-2 pull-left">
                                <div class="form-group">
                                    <label class="col-sm-12 col-form-label pl-0">State <span class="color_red">*</span></label>
                                    <div class="txttooltip">
                                        <input type="text" class="form-control locState get_loc_onblr" data-column="state" data-Lid="1" id="locState_1" placeholder="State">
                                    </div>
                                </div>
                            </div>
                            <div class="pull-left mt35 p-0" style="position: relative; right: 32px;">   
                                <span class="mt-1 mr-1 locAdd loc_add_field_button"  data-add-rowid="1" data-toggle="tooltip" data-html="true" data-placement="top" data-total-count="1" data-original-title="<em> Add </em>"><i class="fa fa-plus-circle" aria-hidden="true"></i></span>

                                <span id="locDelete_1" style="display:none;" class="bg-danger mt-1 mr-1 locDelete remove_field" data-rowid="1" data-toggle="tooltip" data-html="true"  data-placement="top" data-original-title="<em> Delete </em>"><i class="fa fa-minus-circle" aria-hidden="true"></i></span>
                                <span class="mt-1 bg-info locClone" data-loccloneid="1" data-Lid="1" data-rowid="1"  data-toggle="tooltip" data-html="true" data-placement="top" data-original-title="<em> Clone </em>"><i class="fa fa-files-o" aria-hidden="true"></i></span>

                            </div>
                        </div>
                        <input type="hidden" id="locRowCount" name="locRowCount" value="1" />
                    </div>
                </form>
            </div>
        </div>
        <div class="card mb-0">
            <div class="card-header collapsed covLimitAccordHead rqbi_all_tabs" data-toggle="collapse" data-parent="#accordion" href="#coverageLimitAccord" id="coverageLimit_sec" data_coverage_retrieved='0' onclick="coverageLimitSec($(this))">
                <a class="card-title">
                <i class="fa fa-line-chart" aria-hidden="true"></i> Coverage & Limits
                </a>
            </div>
            <div id="coverageLimitAccord" class="card-body collapse">
                <div class="row">
                    <div class="col-md-2 pull-left pstateSec">
                        <div class="form-group mb-1">
                            <label class="col-sm-12 col-form-label pl-0">Primary State</label>
                            <div class="col-sm-12 pl-0 pr-1">
                                <div class="input-group mb-3 covPrimaryStateDiv">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-2 col-md-offset-1 pull-left mb-3 p-0 stateSpecficSec">
                        <div class="form-group mb-1">
                            <label class="col-sm-12 col-form-label pr-0 pl-0">State Specific Forms </label>
                            <div class="col-sm-12 covStateSpecificDiv p-0">
                                <div class="input-group mb-3 covStateSpecDiv">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-8 pull-left p-0 mt-1 mb-3 pl-3 covckbx">
                        <label class="mr-5 col-md-12 fontweight700">Coverages</label>
                        <div class="custom-control custom-checkbox custom-control-inline pl-4 ml-3">
                          <input type="checkbox" class="custom-control-input glLiquor" checked id="typeGL" data-covtype="gl" name="CoverageType" value="1">
                          <label class="custom-control-label" for="typeGL">GL</label>
                        </div>
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" class="custom-control-input glLiquor" id="typeLiquor" data-covtype="liquor" name="CoverageType" value="2">
                            <label class="custom-control-label" for="typeLiquor">Liquor</label>
                        </div>
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" class="custom-control-input glLiquor" id="typeOCP" data-covtype="ocp" name="CoverageType" value="3">
                            <label class="custom-control-label" for="typeOCP">OCP</label>
                        </div>
                        <small class="text-danger fontSize14 covMandatoryMsg" style="display: none;">( Atleast one coverage should be checked )</small>
                        <small class="text-danger fontSize14 noSelectMsg">( Either select GL/Liquor or OCP  )</small>
                    </div>
                </div>
                <!-- Brokerage XL section     -->
                <div id="xl_covDiv"></div>


                <div class="col-md-7 pull-left p-0 mt-0 mb-4 pl-0 gl_type_div" style='display:block;'>
                    <div class="custom-control custom-checkbox custom-control-inline">
                      <input type="checkbox" class="custom-control-input cov_gl_type" id="typeGL1" data-covtype="gl" name="CoverageType2" value="1">
                      <label class="custom-control-label" for="typeGL1">Contractors</label>
                    </div>

                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input cov_gl_type" id="typeLiquor1" data-covtype="liquor" name="CoverageType2" value="2">
                        <label class="custom-control-label" for="typeLiquor1">Habitational</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input cov_gl_type" id="typeOCP1" data-covtype="ocp" name="CoverageType2" value="3">
                        <label class="custom-control-label" for="typeOCP1">Hospitality</label>
                    </div>
                </div>

                <div class="col-md-12 pull-left p-0 mb-4 covLimitsSec">
                    <div class="col-md-12 pl-0">
                        <div class="col-md-12 glLiquorTittle" style="display: none;"> 
                            <label class="col-sm-3 offset-sm-4 text-center"><strong> GL </strong></label>
                            <label class="col-sm-3 pl-5 text-center"><strong> Liquor </strong></label>
                        </div>
                        <div class="form-group row pl-0 mb-1 rqbiEachOccurDiv_frmgrp">
                            <label class="col-sm-4 col-form-label">Each Occurrence</label>
                            <div class="col-sm-3 pl-0 pr-1 rqbiEachOccurDiv">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="rqbiEachOccur">$</label>
                                    </div>
                                    <select  class="custom-select rqbiEachOccur" id="rqbiEachOccur" name="rqbiEachOccur">
                                        <option value="1000000" selected>1,000,000</option>
                                        <option value="2000000">2,000,000</option>
                                        <option value="3000000">3,000,000</option>
                                        <option value="4000000">4,000,000</option>
                                        <option value="5000000">5,000,000</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3 pl-0 pr-1 LiquorEachOccurDiv" style="display: none;">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="rqbiEachOccur">$</label>
                                    </div>
                                    <select  class="custom-select rqbiLiquorEachOccur" id="rqbiLiquorEachOccur" name="rqbiLiquorEachOccur">
                                        <option value="1000000" selected>1,000,000</option>
                                        <option value="2000000">2,000,000</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3 pl-0 pr-1 OcpEachOccurDiv" style="display: none;">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="rqbiEachOccur">$</label>
                                    </div>
                                    <select  class="custom-select rqbiOcpEachOccur" id="rqbiOcpEachOccur" name="rqbiOcpEachOccur">
                                        <option value="1000000" selected>1,000,000</option>
                                        <option value="2000000">2,000,000</option>
                                        <option value="3000000">3,000,000</option>
                                        <option value="4000000">4,000,000</option>
                                        <option value="5000000">5,000,000</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row pl-0 mb-1 rqbiGeneralAggrDiv_frmgrp">
                            <label class="col-sm-4 col-form-label">General Aggregate</label>
                            <div class="col-sm-3 pl-0 pr-1 rqbiGeneralAggrDiv">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="rqbiGeneralAggr">$</label>
                                    </div>
                                    <select  class="custom-select rqbiGeneralAggr" id="rqbiGeneralAggr" name="rqbiGeneralAggr">
                                        <option value="1000000">1,000,000</option>
                                        <option value="2000000" selected>2,000,000</option>
                                        <option value="3000000">3,000,000</option>
                                        <option value="4000000">4,000,000</option>
                                        <option value="5000000">5,000,000</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3 pl-0 pr-1 LiquorGeneralAggrDiv" style="display: none;">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="rqbiGeneralAggr">$</label>
                                    </div>
                                    <select  class="custom-select rqbiLiquorGeneralAggr" id="rqbiLiquorGeneralAggr" name="rqbiLiquorGeneralAggr">
                                        <option value="1000000" selected>1,000,000</option>
                                        <option value="2000000">2,000,000</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3 pl-0 pr-1 OcpGeneralAggrDiv" style="display: none;">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="rqbiGeneralAggr">$</label>
                                    </div>
                                    <select  class="custom-select rqbiOcpGeneralAggr" id="rqbiOcpGeneralAggr" name="rqbiOcpGeneralAggr">
                                        <option value="1000000">1,000,000</option>
                                        <option value="2000000" selected>2,000,000</option>
                                        <option value="3000000">3,000,000</option>
                                        <option value="4000000">4,000,000</option>
                                        <option value="5000000">5,000,000</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-8 pull-left p-0 covGlSection">
                        <div class="form-group row col-md-12 pl-0 mb-1 rqbiProdGeneralAggr_frmgrp">
                            <label class="col-sm-6 col-form-label">Products Completed Operations General Aggregate</label>
                            <div class="col-sm-5">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="rqbiProdGeneralAggr">$</label>
                                    </div>
                                    <select  class="custom-select rqbiProdGeneralAggr" id="rqbiProdGeneralAggr" name="rqbiProdGeneralAggr">
                                        <option value="200000"> 200,000 </option>
                                        <option value="300000"> 300,000 </option>
                                        <option value="500000"> 500,000 </option>
                                        <option value="600000"> 600,000 </option>
                                        <option value="1000000"> 1,000,000 </option>
                                        <option value="2000000" selected> 2,000,000 </option>
                                        <option value="3000000"> 3,000,000 </option>
                                        <option value="4000000"> 4,000,000 </option>
                                        <option value="Excluded">Excluded</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row col-md-12 pl-0 mb-1 rqbiPersonalInjury_frmgrp">
                            <label class="col-sm-6 col-form-label">Personal & Advertising Injury</label>
                            <div class="col-sm-5">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="rqbiPersonalInjury">$</label>
                                    </div>
                                    <select  class="custom-select rqbiPersonalInjury" id="rqbiPersonalInjury" name="rqbiPersonalInjury">
                                        <option value="100000"> 100,000 </option>
                                        <option value="200000"> 200,000 </option>
                                        <option value="300000"> 300,000 </option>
                                        <option value="500000"> 500,000 </option>
                                        <option value="1000000" selected> 1,000,000 </option>
                                        <option value="2000000"> 2,000,000 </option>
                                        <option value="3000000"> 3,000,000 </option>
                                        <option value="4000000"> 4,000,000 </option>
                                        <option value="Excluded">Excluded</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row col-md-12 pl-0 mb-1 rqbiMedicalExp_frmgrp">
                            <label class="col-sm-6 col-form-label">Medical Expense</label>
                            <div class="col-sm-5">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="rqbiMedicalExp">$</label>
                                    </div>
                                    <select  class="custom-select rqbiMedicalExp" id="rqbiMedicalExp" name="rqbiMedicalExp">
                                        <option value="5000" selected> 5,000 </option>
                                        <option value="10000"> 10,000 </option>
                                        <option value="15000"> 15,000 </option>
                                        <option value="20000"> 20,000 </option>
                                        <option value="25000"> 25,000 </option>
                                        <option value="Excluded">Excluded</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group row col-md-12 pl-0 mb-1 rqbiDamagetoPrem_frmgrp">
                            <label class="col-sm-6 col-form-label">Damage to Premises Rented to You </label>
                            <div class="col-sm-5">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="rqbiDamagetoPrem">$</label>
                                    </div>
                                    <select  class="custom-select rqbiDamagetoPrem" id="rqbiDamagetoPrem" name="rqbiDamagetoPrem">
                                        <option value="100000" selected> 100,000 </option>
                                        <option value="150000"> 150,000 </option>
                                        <option value="200000"> 200,000 </option>
                                        <option value="250000"> 250,000 </option>
                                        <option value="300000"> 300,000 </option>
                                        <option value="500000"> 500,000 </option>
                                        <option value="750000"> 750,000 </option>
                                        <option value="1000000"> 1,000,000 </option>
                                        <option value="Excluded">Excluded</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row col-md-8 pl-0 mb-1 rqbiLiquorSicCode_frmgrp">
                        <label class="col-sm-6 col-form-label"> SIC Code </label>
                        <div class="col-sm-5">
                            <div class="bind_siccode_value">
                                <select  class="form-control rqbiLiquorSicCode ml-0" id="rqbiLiquorSicCode" name="rqbiLiquorSicCode">
                                    <option value=""> Please Select </option>
                                </select>
                            </div>
                            <!-- <select  class="form-control rqbiLiquorSicCode ml-0" id="rqbiLiquorSicCode" name="rqbiLiquorSicCode">
                              <option value=""> Please Select </option>
                              <option value="1">2082 Malt Beverages</option>
                              <option value="2">5181 Beer and Ale</option>
                              <option value="3">5182 Wine and Distilled Alcoholic Beverages</option>
                              <option value="4">5812 Eating Places</option>
                              <option value="5">5813 Drinking Places</option>
                              <option value="6">5921 Liquor Stores</option>
                              <option value="7">8641 Civic, Social, and Fraternal Associations</option>
                            </select>
                            
                            <select  class="form-control rqbiOcpSicCode ml-0" id="rqbiOcpSicCode" name="rqbiOcpSicCode" style="display: none;">
                              <option value=""> Please Select </option>
                              <option value="1">1521 - Single-family Housing Construction</option>
                            </select> -->
                        </div>
                    </div>
                </div>
                <div class="col-md-12 pull-left p-0">
                    <div class="col-md-12 deductibleInsuredDiv pull-left">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" checked class="custom-control-input rqbiDeductibleInsured" id="rqbiDeductible" name="rqbiDeductibleInsured" value="1">
                            <label class="custom-control-label" for="rqbiDeductible">Deductible</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline mr-0">
                            <input type="radio" class="custom-control-input rqbiDeductibleInsured" id="rqbiSelfInsured" name="rqbiDeductibleInsured" value="2">
                            <label class="custom-control-label" for="rqbiSelfInsured">Self Insured Retention (SIR) <small class="selfInsuredSmall"></small></label>
                        </div>
                    </div>
                    <div class="col-md-12 pull-left p-0 mb-4 deductTbleSectionDiv">
                        <div class="col-md-12 deductTbleSection">
                             <table class="mb-0 table deductTble">
                                <thead>
                                    <tr class="deductTblHead">
                                      <th>#</th>
                                      <th class="width30_perc">Deductible<span class="color_red">*</span></th>
                                      <th class="width30_perc">Deductible Type<span class="color_red">*</span></th>
                                      <th class="width30_perc">Deductible Credit</th>
                                    </tr>
                                </thead>
                              <tbody>
                                <tr class="deductibleMonoline" style="display: none;">
                                  <th class="graybg text-center"><span class="deductGlLiqTitle">GL</span></th>
                                  <td>                            
                                    <div class="form-group mb-0 rqbiDeductDiv">
                                        <div class="input-group">
                                            <div class="input-group-prepend width12_perc">
                                                <label class="input-group-text width100_perc" for="rqbiOccurDeductible">$</label>
                                            </div>
                                            <input type="text" class="form-control rqbiOccurDeductible mb-0 ml-0" id="rqbiOccurDeductible" value="5000" name="rqbiOccurDeductible">
                                        </div>
                                        <div class="rqbiOccur_Deductible_error_valdtn" style="display:none">Invalid</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group mb-0 mr-1 rqbiDeductTypeDiv">
                                        <div class="input-group">
                                            <select  class="form-control rqbiDeductType ml-0" id="rqbiDeductType" name="rqbiDeductType">
                                                <option value="0">Select</option>
                                                <option value="1">Per Occurrence</option>
                                                <option value="2">Per Claim</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                  <td>
                                        <div class="form-group mb-0 mr-1">
                                            <div class="input-group">
                                                <input type="text" value=""  data-value="" class="form-control glDeductCredit" id="glDeductCredit">
                                                <div class="input-group-append">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <div class="glDeductCredit_error_valdtn" style="display:none">Invalid</div>
                                        </div>
                                  </td>
                                </tr>
                                <tr class="liquorDeductDiv" style="display: none;">
                                  <th class="graybg text-center">Liquor</th>
                                        <td>
                                            <div class="form-group mb-0 rqbiDeductDiv">
                                                <div class="input-group">
                                                    <div class="input-group-prepend width12_perc">
                                                        <label class="input-group-text width100_perc" for="liquorDeductible">$</label>
                                                    </div>
                                                    <div class="txttooltip">
                                                        <input type="text" class="form-control liquorDeductible mb-0 ml-0" id="liquorDeductible" value="5000" name="liquorDeductible">
                                                    </div>
                                                    <div class="liquorDeductible_error_valdtn" style="display:none">Invalid</div>
                                                </div>
                                            </div>
                                        </td>
                                  <td>
                                       <div class="form-group mb-0 mr-1 liquorDeductTypeDiv">
                                            <div class="input-group">
                                                <select  class="form-control liquorDeductType ml-0" id="liquorDeductType" name="liquorDeductType">
                                                    <option value="0">Select</option>
                                                    <option value="1">Per Common Cause</option>
                                                    <option value="2">Per Claim</option>
                                                </select>
                                            </div>
                                        </div>
                                  </td>
                                  <td>
                                        <div class="form-group mb-0 mr-1">
                                            <div class="input-group">
                                                <input type="text" value=""  data-value=""  class="form-control liquorDeductCredit" id="liquorDeductCredit">
                                                <div class="input-group-append">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <div class="liquorDeductCredit_error_valdtn" style="display:none">Invalid</div>
                                        </div>
                                  </td>
                                </tr>
                                <!---OCP added by vaishnavidevi on 3march2021 -->
                                <tr class="OcpDeductDiv" style="display: none;">
                                  <th class="graybg text-center">OCP</th>
                                        <td>
                                            <div class="form-group mb-0 rqbiDeductDiv">
                                                <div class="input-group">
                                                    <div class="input-group-prepend width12_perc">
                                                        <label class="input-group-text width100_perc" for="OcpDeductible">$</label>
                                                    </div>
                                                    <input type="text" class="form-control OcpDeductible mb-0 ml-0" id="OcpDeductible" value="5000" name="OcpDeductible">
                                                </div>
                                                <div class="Ocp_Deductible_error_valdtn" style="display:none">Invalid</div>
                                            </div>
                                        </td>
                                  <td>
                                       <div class="form-group mb-0 mr-1 OcpDeductTypeDiv">
                                            <div class="input-group">
                                                <select  class="form-control OcpDeductType ml-0" id="OcpDeductType" name="OcpDeductType">
                                                    <option value="0">Select</option>
                                                    <option value="1">Per Occurrence</option>
                                                    <option value="2">Per Claim</option>
                                                </select>
                                            </div>
                                        </div>
                                  </td>
                                  <td>
                                        <div class="form-group mb-0 mr-1">
                                            <div class="input-group">
                                                <input type="text" value=""  data-value=""  class="form-control OcpDeductCredit" id="OcpDeductCredit">
                                                <div class="input-group-append">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <div class="OcpDeductCredit_error_valdtn" style="display:none">Invalid</div>
                                        </div>
                                  </td>
                                </tr>
                                <!---OCP added by vaishnavidevi on 3march2021 -->
                              </tbody>
                            </table>
                        </div>

                        <div class="col-md-12 sirTblSection">
                             <table class="mb-0 table sirTable">
                                <thead>
                                    <tr class="sirTblHead">
                                      <th>#</th>
                                      <th class="width27_perc">Per Claim/Occurrence SIR<span class="color_red">*</span></th>
                                      <th class="width27_perc">SIR<span class="color_red">*</span></th>
                                      <th class="width30_perc">SIR Aggregate<span class="color_red">*</span></th>
                                      <th class="width30_perc">SIR Credit</th>
                                    </tr>                                    
                                </thead>

                              <tbody>
                                <tr class="sirGl" style="display: none;">
                                  <th class="graybg text-center"><span class="sirGlLiqTitle">GL</span></th>
                                  <td>   
                                    <div class="form-group mb-0 mr-1 rqbiOccurSirDiv">
                                        <div class="input-group">
                                            <select  class="form-control rqbiOccurSir ml-0" id="rqbiOccurSir" name="rqbiOccurSir">
                                                <option value="0">Select</option>
                                                <option value="1">Per Occurrence</option>
                                                <option value="2">Per Claim</option>
                                            </select>
                                        </div>
                                    </div>      
                                </td>
                                <td>
                                    <div class="form-group mb-0 mr-1">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="text" class="form-control rqbiSir" placeholder="SIR" id="rqbiSir" name="rqbiSir">
                                        </div>
                                        <div class="Sir_error_valdtn" style="display:none">Invalid</div>
                                    </div>
                                </td> 
                                <td>
                                    <div class="form-group mb-0 mr-1">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="text" class="form-control rqbiSirAggregate" placeholder="SIR Aggregate" id="rqbiSirAggregate" name="rqbiSirAggregate">
                                        </div>
                                        <div class="Siraggr_error_valdtn" style="display:none">Invalid</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group mb-0 mr-1">
                                        <div class="input-group">
                                            <input type="text" value="" data-value="" class="form-control SirCredit" id="SirCredit">
                                            <div class="input-group-append">
                                                <span class="input-group-text">%</span>
                                            </div>
                                        </div>
                                        <div class="SirCredit_error_valdtn" style="display:none">Invalid</div>
                                    </div>
                                </td>
                                </tr>

                                <tr class="sirLiquor" style="display: none;">
                                  <th class="graybg text-center">Liquor</th>
                                  <td>  
                                    <div class="form-group mb-0 mr-1 liquorOccurSirDiv">
                                        <div class="input-group">
                                            <select  class="form-control liquorOccurSir ml-0" id="liquorOccurSir" name="rqbiOccurSir">
                                                <option value="0">Select</option>
                                                <option value="1">Per Occurrence</option>
                                                <option value="2">Per Claim</option>
                                            </select>
                                        </div>
                                    </div>     
                                </td>
                                <td>
                                    <div class="form-group mb-0 mr-1">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="text" class="form-control liquorSir" placeholder="SIR" id="liquorSir" name="liquorSir">
                                        </div>
                                        <div class="liquorSir_error_valdtn" style="display:none">Invalid</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group mb-0 mr-1">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="text" class="form-control liquorSirAggregate" placeholder="SIR Aggregate" id="liquorSirAggregate" name="liquorSirAggregate">
                                        </div>
                                        <div class="liq_siraggr_error_valdtn" style="display:none">Invalid</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group mb-0 mr-1">
                                        <div class="input-group">
                                            <input type="text" value=""  data-value="" class="form-control liquorSirCredit" id="liquorSirCredit">
                                            <div class="input-group-append">
                                                <span class="input-group-text">%</span>
                                            </div>
                                        </div>
                                        <div class="liquorSirCredit_error_valdtn" style="display:none">Invalid</div>
                                    </div>
                                </td>
                                </tr>
                                <!---OCP added by vaishnavidevi on 3march2021 -->
                                 <tr class="sirOcp" style="display: none;">
                                  <th class="graybg text-center">OCP</th>
                                  <td> 
                                     <div class="form-group mb-0 mr-1 OcpOccurSirDiv">
                                        <div class="input-group">
                                            <select  class="form-control OcpOccurSir ml-0" id="OcpOccurSir" name="OcpOccurSir">
                                                <option value="0">Select</option>
                                                <option value="1">Per Occurrence</option>
                                                <option value="2">Per Claim</option>
                                            </select>
                                        </div>
                                    </div>     
                                </td>
                                <td>
                                    <div class="form-groupt mb-0 mr-1">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="text" class="form-control OcpSir" placeholder="SIR" id="OcpSir" name="OcpSir">
                                        </div>
                                        <div class="ocpSir_error_valdtn" style="display:none">Invalid</div>
                                    </div>
                                </td> 
                                <td>
                                    <div class="form-groupt mb-0 mr-1">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="text" class="form-control OcpSirAggregate" placeholder="SIR Aggregate" id="OcpSirAggregate" name="OcpSirAggregate">
                                        </div>
                                        <div class="ocp_siraggr_error_valdtn" style="display:none">Invalid</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group mb-0 mr-1">
                                        <div class="input-group">
                                            <input type="text" value=""  data-value="" class="form-control OcpSirCredit" id="OcpSirCredit">
                                            <div class="input-group-append">
                                                <span class="input-group-text">%</span>
                                            </div>
                                        </div>
                                        <div class="OcpSirCredit_error_valdtn" style="display:none">Invalid</div>
                                    </div>
                                </td>
                                </tr>
                                <!---OCP added by vaishnavidevi on 3march2021 -->                                
                              </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-md-8 pull-left p-0 rqbiTpa" style="display: none;">
                    <fieldset class="col-md-12 pull-left pl-0">
                        <legend>TPA</legend>
                    <button type="button" class="btn btn-sm btn-danger float-right ml-1 tpaCancelButton"><i class="fa fa-close"></i> Cancel</button> 
                    <button type="button" class="btn btn-sm btn-primary float-right tpaSaveButton"><i class="fa fa-save"></i> Save</button>
                        <form id="tpaForm">
                            
                            <div class="form-group col-md-6 pr-0 mb-1 rqbiTpaDiv pull-left pl-0" style="margin-top: 30px;">
                                <label class="col-sm-12 col-form-label pl-0">Select TPA</label>
                                
                                <div class="col-sm-12 pl-0">
                                    <select  class="form-control width98_perc rqbiTpaSelect ml-0" id="rqbiTpaSelect" name="rqbiTpaSelect" onchange="rqbiTpaSelect_onchange()">
                                        <option value="0">Select</option>
                                        <option value="Rockville Risk Management Associates">Rockville Risk Management Associates</option>
                                        <option value="New">Add New</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-6 p-0 mb-2 pull-left">
                                <label class="col-sm-12 col-form-label pl-0">Address <span class="rqbiTpaAddress_append_asterik color_red"></span> </label>
                                <div class="col-sm-12 pl-0">
                                    <div class="txttooltip">
                                        <textarea class="form-control rqbiTpaAddress mb-0 inputDisabled" id="rqbiTpaAddress" placeholder="Address"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 pull-left p-0">
                                <div class="pull-left rqbiTpaNameDiv col-md-12 p-0" style="display: none;">
                                    <div class="form-group col-md-6 p-0 mb-1 pull-left">
                                        <label class="col-sm-12 col-form-label pl-0">TPA Name </label>
                                        <div class="col-sm-12 pl-0 pr-4">
                                            <input type="text" class="form-control pull-left rqbiTpaName" placeholder="TPA Name" name="rqbiTpaName" id="rqbiTpaName">
                                        </div>
                                    </div>

                                    <div class="pull-left p-0">
                                        <button type="button" class="btn btn-sm btn-primary pull-left pl-3 pr-3 saveTpa" id="saveTpa"><i class="fa fa-plus-circle" aria-hidden="true"></i> Add</button>
                                        <button type="button" class="btn btn-sm btn-danger pull-left pl-3 pr-3 cancelTpa ml-2" id="cancelTpa"><i class="fa fa-close" aria-hidden="true"></i> Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-4 p-0 mb-1 pull-left">
                                <label class="col-sm-12 col-form-label pl-0">Contact Name <span class="rqbiTpaContactName_append_asterik color_red"></span> </label>
                                
                                <div class="col-sm-12 pl-0">
                                    <div class="txttooltip">
                                        <input type="text" class="form-control pull-left rqbiTpaContactName inputDisabled" value="" placeholder="Contact Name" name="rqbiTpaContactName" id="rqbiTpaContactName">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-4 p-0 mb-1 pull-left">
                                <label class="col-sm-12 col-form-label pl-0">Mobile Number <span class="rqbiTpaMobileNo_append_asterik color_red"></span> </label>
                                
                                <div class="col-sm-12 pl-0">
                                    <div class="txttooltip">
                                        <input type="text" class="form-control pull-left rqbiTpaMobileNo inputDisabled" value="" placeholder="Mobile Number" name="rqbiTpaMobileNo" id="rqbiTpaMobileNo">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-4 p-0 mb-1 pull-left">
                                <label class="col-sm-12 col-form-label pl-0">Email ID <span class="rqbiTpaEmailid_append_asterik color_red"></span> </label>
                                
                                <div class="col-sm-12 pl-0">
                                    <div class="txttooltip">
                                        <input type="text" class="form-control pull-left rqbiTpaEmailid inputDisabled" value="" placeholder="Email ID" name="rqbiTpaEmailid" id="rqbiTpaEmailid">
                                        <small class="text-danger fontSize14 cov_limit_email_valid" style="display: none;">Invalid Email</small>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </fieldset>
                </div>
            </div>
        </div>
        <div class="card mb-0 cbAccord">
            <div class="card-header collapsed cbAccordHeader rqbi_all_tabs" data-toggle="collapse" data-parent="#accordion" href="#cbAccord">
                <a class="card-title">
                    <i class="fa fa-money" aria-hidden="true"></i> Class Builder
                </a>
            </div>
            <div id="cbAccord" class="collapse pb-4">
                <div class="card-body">                    
                    <div class="Cb_error_ratablerow text-center"  style="display:none;"> Atleast one ratable exposure should be added</div>
                    <p class="text-danger font-weight600 cbWarningText mt-4">
                        <span class="text-danger">*</span><span>Premium displayed may not be the final premium. It will not reflect additional coverages and additional interests until those selections have been made and the account rated again.</span>
                    </p>
                    <table class="table table-responsive-sm table-bordered text-center cbTable">
                        <thead class="cbTableHead">
                         <tr>
                            <th class="width26_perc">Code<span class="color_red">*</span></th>
                            <th class="width28_perc">Location<span class="color_red">*</span></th>
                            <th class="pl-3">Exposure <span class="color_red positionAbsolute">*</span></th>
                            <th>Final Rate</th>
                            <th class="width8_perc">Action</th>
                         </tr>
                        </thead>
                        <tbody id="cbAppendRow">
                        </tbody>
                    </table>
                    <input type="hidden" id="rowCount" name="rowCount" value="1" />
                    
                    <div class="col-md-12 pull-left p-0 text-center mb-4">

                        <div class="modify_exposure_rate" style="display:none;">
                            <p class="color_red"></p>
                        </div>

                        <button type="button" class="btn btn-sm btn-primary classbuildGraduatedRating text-white" id="classbuildGraduatedRating">
                            <i class="fa fa-graduation-cap" aria-hidden="true"></i> Graduated Rating 
                        </button>
                        <button type="button" class="btn btn-sm btn-secondary cbCompRating ml-2 text-white" id="cbCompRating"> 
                            <i class="fa fa-compass" aria-hidden="true"></i> Composite Rating
                        </button>
                    </div>
                    <div class="col-md-12 p-0 mb-3 pull-left compositeRateDiv" style="display: none;">
                        <fieldset class="col-md-12 pull-left pl-0">
                            <legend>Composite Rating</legend>
                            <div class="col-md-12 pull-left p-0">
                                <table class="table table-responsive-sm text-center mb-0 compositeRatingTable">
                                    <thead class="compositeRatingHead">
                                        <tr>
                                            <th class="width10_perc">Class Code<span class="color_red">*</span></th>
                                            <th class="width21_perc">Location<span class="color_red">*</span></th>
                                            <th class="width14_perc">Exposure<span class="color_red">*</span></th>
                                            <th class="width13_perc">Premium Basis<span class="color_red">*</span></th>
                                            <th class="width8_perc">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="compositeTblBody">
                                        <tr class="comprow compRow_1" data-rowid="1">
                                            <td class="pl-3 pb-0 pt-3 text-left border_bottom0">
                                                <div class="form-group col-md-12 p-0 mb-1 pull-left multipleClasscodeDiv">
                                                    <div class="col-sm-12 p-0">
                                                        <select class="custom-select compositeMultiCcode compositeMultiCcode_1" id="multi-select-classcodes" data-rowid="1" data-rid="0"  name="compositeMultiCcode_1"  multiple="multiple">
                                                            <option value="95185" checked>95185</option>
                                                            <option value="93250" checked>93250</option>
                                                            <option value="45185" checked>45185</option>
                                                            <option value="95342">95342</option>
                                                            <option value="95380">95380</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="pl-3 pb-0 pt-3 text-left border_bottom0">
                                                <div class="form-group col-md-12 mt-1 p-0 mb-1 pull-left">
                                                    <div class="col-sm-12 pl-0">
                                                        <select  class="custom-select compositeLocation compositeLocation_1" id="compositeLocation_1" data-rowid="1" data-rid="0" name="compositeLocation_1">
                                                            <option value=""> Select Location </option>
                                                            <option value="1"> L1 - 15th street, AZ, 85260 </option>
                                                            <option value="2"> L2 - 12th street, AZ, 85054 </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="pl-3 pb-0 pt-3 text-left border_bottom0">
                                                <div class="form-group col-md-12 mt-1 p-0 mb-1 pull-left">
                                                    <div class="col-sm-12 pl-0">
                                                        <div class="txttooltip">
                                                            <input type="text" class="form-control pull-left compositeExposure compositeExposure_1" id="compositeExposure_1" data-rowid="1" data-rid="0" value="" placeholder="Enter Exposure" name="compositeExposure_1">
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="pb-0 pt-3 border_bottom0">
                                                <div class="form-group col-md-12 mt-1 mb-1 pull-left">
                                                    <div class="col-sm-12 p-0">
                                                        <select class="custom-select compositeExpBasis compositeExpBasis_1" id="compositeExpBasis_1" data-rowid="1" data-rid="0" name="compositeExpBasis_1">
                                                            <option value=""> Select </option>
                                                            <option value="250"> 250 </option>
                                                            <option value="500"> 500 </option>
                                                            <option value="1000"> 1,000 </option>
                                                            <option value="2500"> 2,500 </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </td>
                                            <td rowspan="2" class="text-center tdBorderLeft border_bottom comptrborder composite_actions">
                                                <button type="button" class="btn btn-sm btn-primary disabled compositeSave" id="compositeSave_1" data-rid="0"data-rowid="1" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Save & New </em>">
                                                    <i class="fa fa-save" aria-hidden="true"></i>
                                                </button>
                                                <button type="button" class="btn btn-sm btn-info mr-1 text-white disabled compositeAddRow" id="compositeAddRow_1" data-rid="0" data-rowid="1">
                                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                                </button>
                                                <button type="button" class="btn btn-sm btn-danger compositeDeleteRow" id="compositeDeleteRow_1" data-rid="0" data-rowid="1"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            </td>
                                        </tr>
                                        <tr class="compRow_1 trbottomborder" data-rowid="1">
                                            <td colspan="4" class="border_bottom">
                                                <div class="col-md-12 pull-left p-0 mt-2">
                                                    <div class="form-group row mb-1 pull-left col-md-5 composite_class_code_div">
                                                        <label class="col-form-label col-md-6">Composite Class Code</label>
                                                        <div class="pl-2 col-md-6" style="margin: 0 0 0 -25px;padding: 0;">
                                                            <select class="custom-select compositeMainCcode compositeMainCcode_1" id="compositeMainCcode_1" data-rowid="1" data-rid="0" name="compositeMainCcode_1">
                                                                <option value="">Please Select</option>
                                                                <option value="">98555 - Quarries</option>
                                                                <option value="">48039 - Sewers</option>
                                                                <option value="">58503 - Pulp Mfg.</option>
                                                                <option value="">92055 - Dredging</option>
                                                                <option value="">11039 - Caterers</option>
                                                                <option value="">98555 - Quarries</option>
                                                                <option value="">48039 - Sewers</option>
                                                                <option value="">99793 - Truckers</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row mb-1 pull-left pl-2">
                                                        <label class="col-form-label">Developed Rate</label>
                                                        <div class="pl-2 pr-2">
                                                            <div class="txttooltip" id="comp_tooltip">
                                                                <input type="text" value="" class="form-control pull-left   compositeDevRate_1" id="compositeDevRate_1" data-rowid="1" data-rid="0" placeholder="Developed Rate" name="compositeDevRate_1" >
                                                            </div>
                                                        </div>
                                                    </div>
                                                     <div class="form-group row mb-1 pull-left pl-3 ml-1">
                                                        <label class="col-form-label">Premium</label>
                                                        <div class="pl-2 pr-2">
                                                            <div class="txttooltip" id="comp_tooltip">
                                                                <input type="text" value="" class="form-control pull-left compositepremium compositepremium_1" id="compositepremium_1" data-rowid="1" data-rid="0"placeholder="Premium" name="compositepremium_1" >
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <input type="hidden" id="compositeRowid" name="compositeRowid" value="1" />
                            </div>
                      </fieldset>
                    </div>
                    <div class="col-md-12 pull-left p-0 cbGraduatedTableDiv mb-3" style="display: none;">
                        <fieldset class="col-md-12 pull-left pl-0">
                            <legend>Graduated Rating</legend>
                             <div class="col-md-12 pull-left p-0 text-left mb-4 Add_GraduatedRating_div " style="display: none;">
                                <button type="button" class="btn btn-sm btn-primary AddGraduatedRating text-white" id="AddGraduatedRating">
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i> Add Graduated Rating 
                                </button>
                                <button type="button" class="btn btn-sm btn-secondary ResetGraduatedRating ml-2 text-white" id="ResetGraduatedRating"> 
                                    <i class="fa fa-trash" aria-hidden="true"></i> Reset Graduated Rating
                                </button>
                            </div>
                            <table class="table table-responsive-sm text-center mb-0 cbGraduatedTable">
                                <thead class="cbGraduatedHead">
                                    <tr>
                                        <th class="width30_perc">Exposure From</th>
                                        <th class="width30_perc">Exposure To</th>
                                        <th class="width30_perc">Rate</th>
                                        <th class="width8_perc">Action</th>
                                    </tr>
                                </thead>
                                
                                <tbody class="GradRatingTbody" id="appendRow" style="display: none;">
                                    <tr class="graduatedRow graduatedRow_1" data-rowId="1">
                                        <td class="pl-3 text-left expfromVal_1">
                                            <div class="txttooltip expfrom_value_1">
                                                <input type="text" class="form-control ExposureFrom ExposureFrom_1  mt-2 mr-2 mb-2" name="exposurefrom_1" id="exposurefrom_1" value="$0" disabled="">
                                            </div>
                                            <!--<input type="text" class="form-control ExposureFrom ExposureFrom_1" name="exposurefrom" id="exposurefrom" value="$0" disabled="">-->
                                        </td>
                                        <td class="pl-3 text-left exptoVal_1">
                                            <div class="txttooltip">
                                                <input type="text" class="form-control ExposureTo_1" name="exposureto" id="exposureto" value="" disabled="">
                                            </div>
                                        </td>
                                        <td class="pl-3 text-left rateVal_1">
                                            <div class="txttooltip">
                                                <input type="text" class="form-control ExposureRate_1 gradRateEditInput" name="exposurerate" id="exposurerate" value="" disabled="">
                                            </div>
                                        </td>
                                        <td class="text-left pl-2 graduate_actions">
                                            <button id="gradRatingAddRow" data-rowid="1" type="button" class="btn btn-sm btn-primary cbAddTier gradRatingAddRow">
                                                <i class="fa fa-plus-circle" aria-hidden="true"></i> 
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <input type="hidden" id="rowId" name="rowId" value="1" />
                            <input type="hidden" id="class_code_id" name="class_code_id" value="" />
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 mb-5 text-center cbContinueFqdiv">
            <div class="contFullQuoteBtn">
                <button type="button" class="btn btn-sm btn-warning pull-left cbContinueFullquote ml-2 text-white" id="cbContinueFullquote" onclick="saveSavedFilterForms();" data-oc-updata="no"> 
                    <i class="fa fa-repeat" aria-hidden="true"></i> Continue to FullQuote  
                    <span class="fqSpinner" style="display: none;">
                        <i class="fa fa-spinner fa-spin"></i>
                    </span>
                </button>
                <div class="custom-control custom-checkbox pull-left ml-4 mt-1 override_required_ck">
                    <input type="checkbox" class="custom-control-input override_required" id="override_required">
                    <label class="custom-control-label" for="override_required">Override Required</label>
                </div>
            </div>

            <div class="col-md-12 pull-left text-center cfqspinner" style="display: none; margin-top: 10px; margin-left: -110px;">
                        <span style="" class="text-primary continue_to_full_quote_spinner">
                            <i class="fa fa-spinner fa-spin"></i>
                        </span>
                        <span class="text-primary">Fetching AI Common and All Forms...</span>
            </div>
            <div class="col-md-12 pull-left text-center mandatory_fullcode" style="display: none; margin-top: 10px; margin-left: -110px;">
                <span class="text-danger">Please fill mandatory field ...</span>
            </div>
           <!--  <svg class="spinner continue_to_full_quote_loader d-none" viewBox="0 0 50 50">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
            <span style="padding-left: 30px; color:green;" class="d-none">Fetching Ai and Common Forms...</span> -->
        </div>

                    <!--    Xl Premium     -->
        <div id="xl_premiumDiv"></div>
                

        <div class="card mb-0">
            <div class="card-header collapsed rqbi_all_tabs rqbiAdditionalAccountDetails" data-toggle="collapse" data-parent="#accordion" href="#additionalAccAccord">
                <a class="card-title">
                    <i class="fa fa-user" aria-hidden="true"></i> Additional Account Details
                </a>
            </div>
            <div id="additionalAccAccord" class="collapse">
                <div class="card-body">
                    <div class="col-md-6 pull-left p-0">
                        <div class="form-group row col-md-12">
                            <label class="pull-left mr-3">TRIA</label>
                            <div class="col-md-10 pl-0 pull-left">
                                <div class="col-md-6 p-0 pull-left triaAcceptReject">
                                    <div class="custom-control custom-radio pull-left mr-3">
                                        <input type="radio" class="custom-control-input rqbiTriaAccept" id="rqbiTriaAccept" name="rqbiTria" value="1">
                                        <label class="custom-control-label" for="rqbiTriaAccept">Accept</label>
                                    </div> 
                                    <div class="custom-control custom-radio pull-left">
                                        <input type="radio" class="custom-control-input rqbiTriaReject" id="rqbiTriaReject" name="rqbiTria" checked value="0">
                                        <label class="custom-control-label" for="rqbiTriaReject">Reject</label>
                                    </div> 
                                </div>
                            </div>
                            <div class="co-md-12 p-0 pull-left mt-2">
                                <div class="col-sm-4 pull-left pl-0">
                                    <div class="txttooltip">
                                        <div class="input-group mb-3">
                                            <input type="text" value="5" class="form-control rqbiTriaPercAmount" id="rqbiTriaPercAmount">
                                            <div class="input-group-append">
                                                <span class="input-group-text">%</span>
                                            </div>
                                        </div>
                                         <span class="invalid_triaper" style="color: red; display: none;">Invalid</span>
                                    </div>
                                </div>
                                <div class="col-md-5 pl-0 pull-left rqbiTriaAmountDiv tria_premium">
                                    <div class="txttooltip">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input type="text" class="form-control rqbiTriaAmount" placeholder="" id="rqbiTriaAmount" name="rqbiTriaAmount" maxlength="12">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row col-md-12 pl-0 mb-1">
                            <label class="col-sm-5 col-form-label">Inspection Fee</label>
                            <div class="col-sm-6">
                                <div class="txttooltip">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input type="text" class="form-control rqbiInspectionFee" id="rqbiInspectionFee" maxlength="6">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row col-md-12 pl-0 mb-1">
                            <label class="col-sm-5 col-form-label">Commission</label>
                            <div class="col-sm-6">
                                <div class="txttooltip">
                                    <div class="input-group mb-3">
                                        <input type="text" value="17.5" class="form-control rqbiCommission" id="rqbiCommission">
                                        <div class="input-group-append">
                                            <span class="input-group-text">%</span>
                                        </div>
                                    </div>
                                    <span class="invalid_commission" style="color: red; display: none;">Invalid</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row col-md-12 pl-0 mb-1">
                            <label class="col-sm-5 col-form-label">Payment Term</label>
                            <div class="col-sm-6">
                                <div class="input-group mb-3">
                                    <input type="text" value="30" class="form-control rqbiPaymentTerm" id="rqbiPaymentTerm" maxlength="3"> <span class="paymentDays">Days</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row col-md-12 pl-0 mb-1">
                            <label class="col-sm-5 col-form-label">Fully Earned Date</label>
                            <div class="col-sm-6">
                                 <div id="datepickerfullyearned" class="input-group date mb-3" data-date-format="mm-dd-yyyy">
                                    <input class="form-control bg_white" type="text" id="fullyEarnedDate" readonly=""/>
                                    <span class="input-group-addon" style="display: none;"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row col-md-12 pl-0 mb-1">
                            <label class="col-sm-5 col-form-label">Minimum Earned Premium</label>
                            <div class="col-sm-6">
                                <div class="input-group mb-3">
                                    <input type="text" value="25" class="form-control rqbiMinPremium" id="rqbiMinPremium" name="rqbiMinPremium">
                                    <div class="input-group-append">
                                        <span class="input-group-text">%</span>
                                    </div>
                                </div>
                                <span class="invalid_minearprem" style="color: red; display: none;">Invalid</span>
                            </div>
                        </div>
                        <div class="form-group row col-md-12 pl-0 mb-1">
                            <label class="col-sm-5 col-form-label">Minimum Retained Premium</label>
                            <div class="col-sm-6">
                                <div class="input-group mb-3">
                                    <input type="text" value="100" class="form-control rqbiMinDeposit" id="rqbiMinDeposit" name="rqbiMinDeposit">
                                    <div class="input-group-append">
                                        <span class="input-group-text">%</span>
                                    </div>
                                </div>
                                <span class="invalid_minretprem" style="color: red; display: none;">Invalid</span>
                            </div>
                        </div>
                        <div class="form-group row col-md-12 pl-0 mb-1">
                            <label class="col-sm-5 col-form-label">Auditable</label>
                            <div class="col-sm-6 rqbiAuditableDiv">
                                <div class="custom-control custom-radio pull-left mr-3">
                                    <input type="radio" checked class="custom-control-input rqbiAuditableYes" id="rqbiAuditableYes" name="rqbiAuditable" value="1">
                                    <label class="custom-control-label" for="rqbiAuditableYes">Yes</label>
                                </div> 
                                <div class="custom-control custom-radio pull-left">
                                    <input type="radio" class="custom-control-input rqbiAuditableNo" id="rqbiAuditableNo" name="rqbiAuditable" value="0">
                                    <label class="custom-control-label" for="rqbiAuditableNo">No</label>
                                </div> 
                            </div>
                        </div>
                        <div class="form-group row col-md-12 pl-0 mb-1 audit_frequency">
                            <label class="col-sm-5 col-form-label">Audit Frequency</label>
                            <div class="col-sm-6">
                                <div class="input-group mb-3">
                                    <select  class="form-control col-sm-12 rqbiAuditFreq pull-left" id="rqbiAuditFreq" name="rqbiAuditFreq">
                                        <option value="Annual" selected="selected">Annual</option>
                                        <option value="Semiannual">Semiannual</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Non-Auditable">Non-Auditable</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row col-md-12 pl-0 mb-1 rqbiDesigContractorDiv">
                            <label class="col-sm-5 col-form-label">Designation of Contractor</label>
                            <div class="col-sm-6">
                                <div class="input-group mb-3">
                                    <input type="text" value="" placeholder="Designation of Contractor" class="form-control rqbiDesigContractor" id="rqbiDesigContractor">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-0">
            <div class="card-header collapsed" id="optionaCoverage_sec" data-toggle="collapse" data-parent="#accordion" href="#ocAccord">
                <a class="card-title">
                    <i class="fa fa-check-square-o" aria-hidden="true"></i> Optional / Miscellaneous Coverages
                </a>
            </div>
            <div id="ocAccord" class="collapse optionalCov_Acrdn">
                <div class="card-body">
                    <div class="col-md-12 p-0 pull-left mb-3 op_forms_coverages">
                        <div class="col-md-1 pull-left">
                            <label class="fontweight700">Coverages</label>
                        </div>
                        <div class="col-md-11 pull-left">
                            <div class="col-md-4 pull-left">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input ocCoverages" id="ocEmpLib" data-id="ocEmpLib" data-covtype="empLiability" name="ocCoverages" value="1" title="1">
                                    <label class="custom-control-label" for="ocEmpLib">Employee Benefits Liability</label>
                                </div>
                            </div>
                            <div class="col-md-2 pull-left pl-0" id="stop_gap_checkbox" style="display: none;">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input ocCoverages" id="ocStopGap" data-id="ocStopGap" data-covtype="stopGap" name="ocCoverages" value="1" title="1">
                                    <label class="custom-control-label" for="ocStopGap">Stop Gap</label>
                                </div>
                            </div>
                            <div class="col-md-5 pull-left">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input ocCoverages" id="ocAutoLiability" data-id="ocAutoLiability" data-covtype="autoLiability" name="ocCoverages" value="1" title="1">
                                    <label class="custom-control-label" for="ocAutoLiability">Hired and Non-Owned Auto Liability</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 p-0 pull-left mb-3" id="stopGap_countryDiv" style="display:none">
                        
                    </div>

                    <div id="Optinalcover_emp" style="display: none;">
                        <span class="processingSpinner"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> Loading Form... </span>
                    </div>

                    <div class="optional_table_bind"></div>
                    
                </div>
            </div>
        </div>
        
        <div class="card mb-0">
            <div class="card-header collapsed aiFormsAccord" data-toggle="collapse" data-parent="#accordion" href="#additionalInsuredAccord" onclick="allforms_inview('aiforms');">
                <a class="card-title">
                    <i class="fa fa-shield" aria-hidden="true"></i> AI, WOS, & Primary Non Contribution
                </a>
            </div>
            <div id="additionalInsuredAccord" class="collapse">
                <div class="card-body">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-primary aiformssearch">
                                    <i class="fa fa-search" aria-hidden="true"></i></button>

                            </div>
                            <input type="text" autocomplete="off" class="form-control aisearch" id="aisearch" placeholder="Type Here to Search" name="search">
                        </div>
<!--                      <div class="col-md-12 pull-left pt-4 mb-3 text-center aiSpinner" style="display: none;">
                        <span style="" class="text-primary aiFormsSpinner">
                            <i class="fa fa-spinner fa-spin"></i>
                        </span>
                        <span class="text-primary">Processing...</span>
                    </div> -->
                    <div id="cover" style="display: none;">
                        <span class="processingSpinner"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> Loading Form... </span>
                    </div>
                    <div class="bind_aiformsdata"></div>
                </div>
            </div>
        </div>
        <div class="card mb-0">
            <div class="card-header collapsed commonFormsAccord" data-toggle="collapse" data-parent="#accordion" href="#selectFormsAccord" onclick="allforms_inview('commonforms');">
                <a class="card-title">
                    <i class="fa fa-book mr-1 mt-1 float-left"></i>
                    Common Forms
                </a>
            </div>
            <div id="selectFormsAccord" class="collapse">
                <div class="card-body">
                   <!--  <div class="freezee_bg_cmn_forms freezee_bg_div_cmn_forms"></div> -->
                        <div class="input-group">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-primary commonformssearch">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                            <input type="text" autocomplete="off" class="form-control commonsearch" id="commonsearch" placeholder="Type Here to Search" name="search">
                        </div>
                     <!-- <div class="col-md-12 pull-left pt-4 mb-3 text-center commonSpinner" style="display: none;">
                        <span style="" class="text-primary commonFormsSpinner">
                            <i class="fa fa-spinner fa-spin"></i>
                        </span>
                        <span class="text-primary">Processing...</span>
                    </div> -->

                    <div id="commoncover" style="display: none;">
                        <span class="processingSpinner"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> Loading Form... </span>
                    </div>
                    <div class="bind_commonformsdata"></div>
                </div>
            </div>
        </div>
        <div class="card mb-0">
            <div class="card-header collapsed rqbi_allforms_tabs" data-toggle="collapse" data-parent="#accordion" href="#optionalCovAccord" onclick="allforms_inview('allforms');" >
                <a class="card-title">
                <i class="fa fa-file" aria-hidden="true"></i> All Forms
                </a>
            </div>
            <div id="optionalCovAccord" class="collapse">
                <div class="card-body">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <button type="button" class="btn btn-primary allformssearch">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                            <input type="text" autocomplete="off" class="form-control allsearch" id="allsearch" placeholder="Type Here to Search" name="search">
                        </div>

<!--                     <div class="col-md-12 pull-left pt-4 mb-3 text-center afSpinner" style="display: none;">
                        <span style="" class="text-primary allFrmsSpinner">
                            <i class="fa fa-spinner fa-spin"></i>
                        </span>
                        <span class="text-primary">Processing...</span>
                    </div> -->
                        <div id="afcover" style="display: none;">
                            <span class="processingSpinner"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> Loading Form... </span>
                        </div>
                    <div class="bind_allformsdata"></div>

                </div>
            </div>
        </div>
        <div class="card mb-0">
            <div class="card-header collapsed manuscript_card_header rqbi_all_tabs" data-toggle="collapse" data-parent="#accordion" href="#manuscriptAccord" onclick="getsaved_menuscriptforms();">
                <a class="card-title">
                    <i class="fa fa-file-text-o" aria-hidden="true"></i>  Manuscript Forms
                </a>
            </div>
            <div id="manuscriptAccord" class="collapse">
                <div class="card-body">
                    <button disabled type="button" class="btn btn-sm btn-primary pull-right mb-3 manuFrmsAddRow"><i class="fa fa-plus-circle"></i> Add Row</button>

                    <table class="table table-responsive-sm table-bordered text-center manuscriptFrmTable mt-3">
                        <thead class="manuscriptFrmTableThead">
                            <tr>
                                <th class="width4_perc">#</th>
                                <th class="width20_perc">Form # <span class="color_red">*</span></th>
                                <th>Form Name <span class="color_red">*</span></th>
                                <th class="width26_perc">File</th>
                                <th class="width14_perc">Premium</th>
                                <th class="width4_perc">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="card mb-0">
            <div class="card-header collapsed subjAccordHeader" data-toggle="collapse" data-parent="#accordion" href="#subjectivitiesAccord">
                <a class="card-title">
                <i class="fa fa-file-text mr-1 mt-1 float-left"></i> Subjectivities
                </a>
            </div>
            <div id="subjectivitiesAccord" class="collapse">
                <div class="card-body subjCardBody pb-3">
                    <table class="table-responsive-sm width100_perc SubjListTable">
                        <!-- <tr>
                            <td class="width35_perc"></td>
                            <td class="pl-3">
                                <label class="col-form-label ">
                                    <strong>Due Date</strong>
                                </label>
                            </td>
                            <td class="width35_perc"></td>
                            <td class="pl-3">
                                <label class="col-form-label ">
                                    <strong>Due Date</strong>
                                </label>
                            </td>
                        </tr> -->
                        <!-- <tr>
                            <td class="width20_perc">
                                <div class="col-sm-12 pull-left mt-0 rqbiSubjList">
                                    <div class="custom-control custom-checkbox col-sm-12 displayTableCell">
                                        <input type="checkbox" class="custom-control-input subjchkbx" id="subjCkbx_1" data-pre_sub_id='1' data-listid="1" name="subjCkbx_1">
                                        <label class="custom-control-label pull-left sub_name" for="subjCkbx_1">Currently signed and dated applications - Including supplemental if applicable.</label>
                                        <small class="subjectivityDate subjectivityDate_1 col-md-12 p-0 pull-left"></small>
                                    </div>
                                </div>
                            </td>
                            <td class="width30_perc">
                                <div class="form-group row mb-0 col-sm-12">
                                    <div class="col-sm-12 pull-left pr-0">                       
                                        <select  class="form-control col-sm-10 rqbiSubjDueDate rqbiSubjDueDate_1 ml-0 pull-left pl-2 due_condition inputDisabled" tabindex="-1" id="rqbiSubjDueDate_1" name="rqbiSubjDueDate_1" data-listid="1">
                                            <option value="0">Select</option>
                                            <option value="Due Date - Calendar Selection">Due Date - Calendar Selection</option>
                                            <option value="Due Prior To Binding">Due Prior To Binding</option>
                                            <option value="Due within 30 days of Binding">Due within 30 days of Binding</option>
                                            <option value="Due within 60 days of Binding">Due within 60 days of Binding</option>
                                            <option value="Due within 90 days of Binding">Due within 90 days of Binding</option>
                                            <option value="Add New"><i class="fa fa-plus"></i> Add New</option>
                                        </select>
                                        <div class="input-group col-sm-2 date mb-3 datepicker sub_datepicker pull-left pt-0" data-listid="1" data-date-format="mm-dd-yyyy">
                                            <input class="form-control datepickerInput datepickerInput_1" data-listid="1" type="text" style="display: none;">
                                            <span class="input-group-addon calendarSelection calendarSelection_1 disabled text-primary" data-listid="1"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                        </div>
                                        <div class="col-sm-12 pull-left p-0">  
                                            <input type="text" maxlength="10" data-listid="1" class="form-control col-sm-10 addDueDate addDueDate_1" id="addDueDate_1" name="addDueDate_1" placeholder="Add New" onfocusout="getDueDate(1)" style="display: none;">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="width20_perc">
                                <div class="col-sm-12 pull-left mt-0 rqbiSubjList">
                                    <div class="custom-control custom-checkbox col-sm-12 displayTableCell">
                                        <input type="checkbox" class="custom-control-input subjchkbx" id="subjCkbx_2" data-pre_sub_id='2' data-listid="2" name="subjCkbx_2">
                                        <label class="custom-control-label pull-left sub_name" for="subjCkbx_2">5 years of currently valued loss runs.</label>
                                        <small class="subjectivityDate subjectivityDate_2 col-md-12 p-0 pull-left"></small>
                                    </div>
                                </div>
                            </td>
                            <td class="width30_perc">
                                <div class="form-group row mb-0 col-sm-12">
                                    <div class="col-sm-12 pull-left pr-0">
                                        <select  class="form-control col-sm-10 rqbiSubjDueDate rqbiSubjDueDate_2 ml-0 pull-left pl-2 due_condition inputDisabled" tabindex="-1" id="rqbiSubjDueDate_2" name="rqbiSubjDueDate_2" data-listid="2">
                                            <option value="0">Select</option>
                                            <option value="Due Date - Calendar Selection">Due Date - Calendar Selection</option>
                                            <option value="Due Prior To Binding">Due Prior To Binding</option>
                                            <option value="Due within 30 days of Binding">Due within 30 days of Binding</option>
                                            <option value="Due within 60 days of Binding">Due within 60 days of Binding</option>
                                            <option value="Due within 90 days of Binding">Due within 90 days of Binding</option>
                                            <option value="Add New"><i class="fa fa-plus"></i> Add New</option>
                                        </select>
                                        <div class="input-group date mb-3 datepicker sub_datepicker col-sm-2 pull-left pt-0" data-listid="2" data-date-format="mm-dd-yyyy">
                                            <input type="text" class="form-control datepickerInput datepickerInput_2" data-listid="2" type="text" style="display: none;">
                                            <span class="input-group-addon calendarSelection calendarSelection_2 disabled text-primary" data-listid="2"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                        </div>
                                        <div class="col-sm-12 pull-left p-0">
                                            <input type="text" maxlength="10" data-listid="2" class="form-control col-sm-10 addDueDate addDueDate_2" id="addDueDate_2" name="addDueDate_2" placeholder="Add New" onfocusout="getDueDate(2)"  style="display: none;">
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="width20_perc hideListOnOcpCov">
                                <div class="col-sm-12 pull-left mt-0 rqbiSubjList">
                                    <div class="custom-control custom-checkbox col-sm-12 displayTableCell">
                                        <input type="checkbox" class="custom-control-input subjchkbx" id="subjCkbx_3" data-pre_sub_id='3' data-listid="3" name="subjCkbx_3">
                                        <label class="custom-control-label pull-left sub_name" for="subjCkbx_3">Copy of contract used with all subcontractors confirming presence of adequate hold harmless/indemnification wording, minimum of like gl limits, and ai status for our insured (both ongoing and completed ops.)</label>
                                        <small class="subjectivityDate subjectivityDate_3 col-md-12 p-0 pull-left"></small>
                                    </div>
                                </div>
                            </td>
                            <td class="width30_perc hideListOnOcpCov">
                                <div class="form-group row mb-0 col-sm-12">
                                    <div class="col-sm-12 pull-left pr-0">
                                        <select  class="form-control col-sm-10 rqbiSubjDueDate rqbiSubjDueDate_3 ml-0 pull-left pl-2 due_condition inputDisabled" tabindex="-1" id="rqbiSubjDueDate_3" name="rqbiSubjDueDate_3" data-listid="3">
                                            <option value="0">Select</option>
                                            <option value="Due Date - Calendar Selection">Due Date - Calendar Selection</option>
                                            <option value="Due Prior To Binding">Due Prior To Binding</option>
                                            <option value="Due within 30 days of Binding">Due within 30 days of Binding</option>
                                            <option value="Due within 60 days of Binding">Due within 60 days of Binding</option>
                                            <option value="Due within 90 days of Binding">Due within 90 days of Binding</option>
                                            <option value="Add New"><i class="fa fa-plus"></i> Add New</option>
                                        </select>
                                        <div class="input-group col-sm-2 date mb-3 datepicker sub_datepicker pull-left pt-0" data-listid="3" data-date-format="mm-dd-yyyy">
                                            <input type="text" class="form-control datepickerInput datepickerInput_3" data-listid="3" type="text" style="display: none;">
                                            <span class="input-group-addon calendarSelection calendarSelection_3 disabled text-primary" data-listid="3"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                        </div>
                                        <div class="col-sm-12 pull-left p-0">
                                            <input type="text" maxlength="10" data-listid="3" class="form-control col-sm-10 addDueDate addDueDate_3" id="addDueDate_3" name="addDueDate_3" placeholder="Add New" onfocusout="getDueDate(3)"  style="display: none;">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="width20_perc">
                                <div class="col-sm-12 pull-left mt-0 rqbiSubjList">
                                    <div class="custom-control custom-checkbox col-sm-12 displayTableCell">
                                        <input type="checkbox" class="custom-control-input subjchkbx" id="subjCkbx_4" data-pre_sub_id='4' data-listid="4" name="subjCkbx_4">
                                        <label class="custom-control-label pull-left sub_name" for="subjCkbx_4">Fully executed terrorism accept/reject form.</label>
                                        <small class="subjectivityDate subjectivityDate_4 col-md-12 p-0 pull-left"></small>
                                    </div>
                                </div>
                            </td>
                            <td class="width30_perc">
                                <div class="form-group row mb-0 col-sm-12">
                                    <div class="col-sm-12 pull-left pr-0">
                                        <select  class="form-control col-sm-10 rqbiSubjDueDate rqbiSubjDueDate_4 ml-0 pull-left pl-2 due_condition inputDisabled" tabindex="-1" id="rqbiSubjDueDate_4" name="rqbiSubjDueDate_4" data-listid="4">
                                            <option value="0">Select</option>
                                            <option value="Due Date - Calendar Selection">Due Date - Calendar Selection</option>
                                            <option value="Due Prior To Binding">Due Prior To Binding</option>
                                            <option value="Due within 30 days of Binding">Due within 30 days of Binding</option>
                                            <option value="Due within 60 days of Binding">Due within 60 days of Binding</option>
                                            <option value="Due within 90 days of Binding">Due within 90 days of Binding</option>
                                            <option value="Add New"><i class="fa fa-plus"></i> Add New</option>
                                        </select>
                                        <div class="input-group col-sm-2 date mb-3 datepicker sub_datepicker pull-left pt-0" data-listid="4" data-date-format="mm-dd-yyyy">
                                            <input type="text" class="form-control datepickerInput datepickerInput_4" data-listid="4" type="text" style="display: none;">
                                            <span class="input-group-addon calendarSelection calendarSelection_4 disabled text-primary" data-listid="4"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                        </div>
                                        <div class="col-sm-12 pull-left p-0">
                                            <input type="text" maxlength="10" data-listid="4" class="form-control col-sm-10 addDueDate addDueDate_4" id="addDueDate_4" name="addDueDate_4" placeholder="Add New" onfocusout="getDueDate(4)"  style="display: none;">
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="width20_perc">
                                <div class="col-sm-12 pull-left mt-0 rqbiSubjList">
                                    <div class="custom-control custom-checkbox col-sm-12 displayTableCell">
                                        <input type="checkbox" class="custom-control-input subjchkbx" id="subjCkbx_5" data-pre_sub_id='5' data-listid="5" name="subjCkbx_5">
                                        <label class="custom-control-label pull-left sub_name"  for="subjCkbx_5">Copy of fully executed tpa contract with the tpa identified in the sir endorsement</label>
                                        <small class="subjectivityDate subjectivityDate_5 col-md-12 p-0 pull-left"></small>
                                    </div>
                                </div>
                            </td>
                            <td class="width30_perc">
                                <div class="form-group row mb-0 col-sm-12">
                                    <div class="col-sm-12 pull-left pr-0">
                                        <select  class="form-control col-sm-10 rqbiSubjDueDate rqbiSubjDueDate_5 ml-0 pull-left pl-2 due_condition inputDisabled" tabindex="-1" id="rqbiSubjDueDate_5" name="rqbiSubjDueDate_5" data-listid="5">
                                            <option value="0">Select</option>
                                            <option value="Due Date - Calendar Selection">Due Date - Calendar Selection</option>
                                            <option value="Due Prior To Binding">Due Prior To Binding</option>
                                            <option value="Due within 30 days of Binding">Due within 30 days of Binding</option>
                                            <option value="Due within 60 days of Binding">Due within 60 days of Binding</option>
                                            <option value="Due within 90 days of Binding">Due within 90 days of Binding</option>
                                            <option value="Add New"><i class="fa fa-plus"></i> Add New</option>
                                        </select>
                                        <div class="input-group col-sm-2 date mb-3 datepicker sub_datepicker pull-left pt-0" data-listid="5" data-date-format="mm-dd-yyyy">
                                            <input type="text" class="form-control datepickerInput datepickerInput_5" data-listid="5" type="text" style="display: none;">
                                            <span class="input-group-addon calendarSelection calendarSelection_5 disabled text-primary" data-listid="5"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                        </div>
                                        <div class="col-sm-12 pull-left p-0">
                                            <input type="text" maxlength="10" data-listid="5" class="form-control col-sm-10 addDueDate addDueDate_5" id="addDueDate_5" name="addDueDate_5" placeholder="Add New" onfocusout="getDueDate(5)"  style="display: none;">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="width20_perc">
                                <div class="col-sm-12 pull-left mt-0 rqbiSubjList">
                                    <div class="custom-control custom-checkbox col-sm-12 displayTableCell">
                                        <input type="checkbox" class="custom-control-input subjchkbx" id="subjCkbx_6" data-pre_sub_id='6' data-listid="6" name="subjCkbx_6">
                                        <label class="custom-control-label pull-left sub_name" for="subjCkbx_6">NJ transaction number must be submitted prior to policy issuance</label>
                                        <small class="subjectivityDate subjectivityDate_6 col-md-12 p-0 pull-left"></small>
                                    </div>
                                </div>
                            </td>
                            <td class="width30_perc">
                                <div class="form-group row mb-0 col-sm-12">
                                    <div class="col-sm-12 pull-left pr-0">
                                        <select  class="form-control col-sm-10 rqbiSubjDueDate rqbiSubjDueDate_6 ml-0 pull-left pl-2 due_condition inputDisabled" tabindex="-1" id="rqbiSubjDueDate_6" name="rqbiSubjDueDate_6" data-listid="6">
                                            <option value="0">Select</option>
                                            <option value="Due Date - Calendar Selection">Due Date - Calendar Selection</option>
                                            <option value="Due Prior To Binding">Due Prior To Binding</option>
                                            <option value="Due within 30 days of Binding">Due within 30 days of Binding</option>
                                            <option value="Due within 60 days of Binding">Due within 60 days of Binding</option>
                                            <option value="Due within 90 days of Binding">Due within 90 days of Binding</option>
                                            <option value="Add New"><i class="fa fa-plus"></i> Add New</option>
                                        </select>
                                        <div class="input-group col-sm-2 date mb-3 datepicker sub_datepicker pull-left pt-0" data-listid="6" data-date-format="mm-dd-yyyy">
                                            <input type="text" class="form-control datepickerInput datepickerInput_6" data-listid="6" type="text" style="display: none;">
                                            <span class="input-group-addon calendarSelection calendarSelection_6 disabled text-primary" data-listid="6"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                        </div>
                                        <div class="col-sm-12 pull-left p-0">
                                            <input type="text" maxlength="10" data-listid="6" class="form-control col-sm-10 addDueDate addDueDate_6" id="addDueDate_6" name="addDueDate_6" placeholder="Add New" onfocusout="getDueDate(6)" style="display: none;">
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="showSubjOnliquorCov" style="display: none;">
                            <td class="width20_perc">
                                <div class="col-sm-12 pull-left mt-0 rqbiSubjList">
                                    <div class="custom-control custom-checkbox col-sm-12 displayTableCell">
                                        <input type="checkbox" class="custom-control-input subjchkbx" id="subjCkbx_7" data-pre_sub_id='7' data-listid="7" name="subjCkbx_7">
                                        <label class="custom-control-label pull-left sub_name" for="subjCkbx_7">Confirmation anyone who will be serving alcohol undergoes formal Alcohol Training (Ex. TIPS)</label>
                                        <small class="subjectivityDate subjectivityDate_7 col-md-12 p-0 pull-left"></small>
                                    </div>
                                </div>
                            </td>
                            <td class="width30_perc">
                                <div class="form-group row mb-0 col-sm-12">
                                    <div class="col-sm-12 pull-left pr-0">
                                        <select  class="form-control col-sm-10 rqbiSubjDueDate rqbiSubjDueDate_7 ml-0 pull-left pl-2 due_condition inputDisabled" tabindex="-1" id="rqbiSubjDueDate_7" name="rqbiSubjDueDate_7" data-listid="7">
                                            <option value="0">Select</option>
                                            <option value="Due Date - Calendar Selection">Due Date - Calendar Selection</option>
                                            <option value="Due Prior To Binding">Due Prior To Binding</option>
                                            <option value="Due within 30 days of Binding">Due within 30 days of Binding</option>
                                            <option value="Due within 60 days of Binding">Due within 60 days of Binding</option>
                                            <option value="Due within 90 days of Binding">Due within 90 days of Binding</option>
                                            <option value="Add New"><i class="fa fa-plus"></i> Add New</option>
                                        </select>
                                        <div class="input-group col-sm-2 date mb-3 datepicker sub_datepicker pull-left pt-0" data-listid="7" data-date-format="mm-dd-yyyy">
                                            <input type="text" class="form-control datepickerInput datepickerInput_7" data-listid="7" type="text" style="display: none;">
                                            <span class="input-group-addon calendarSelection calendarSelection_7 disabled text-primary" data-listid="7"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                        </div>
                                        <div class="col-sm-12 pull-left p-0">
                                            <input type="text" maxlength="10" data-listid="6" class="form-control col-sm-10 addDueDate addDueDate_7" id="addDueDate_7" name="addDueDate_7" placeholder="Add New" onfocusout="getDueDate(7)" style="display: none;">
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr> -->
                    </table>
                    <input type="hidden" id="subjListCount" name="subjListCount" />

                    <h6 class="mb-3 pt-3 pl-3"><strong>User Subjectivities</strong></h6>
                    <div class="col-md-12 pull-left addSubjDiv" style="display: none;">
                    </div>
                    <div class="col-md-12 pull-left mt-2">
                        <div class="form-group col-md-4 pull-left p-0">
                            <label for=""> Enter Additional Subjectivities </label>
                            <div class="col-md-12 pl-0">
                                <div class="txttooltip">
                                    <input type="text" class="form-control rqbiAdditionalSubj" id="rqbiAdditionalSubj" name="rqbiAdditionalSubj">
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-md-3 pull-left p-0">
                            <label for=""> Due Date </label>
                            <div class="col-md-12 pl-0">
                                <select class="form-control rqbiAddDueDate pull-left" id="rqbiAddDueDate" name="rqbiAddDueDate">
                                    <!-- <option value="Due Date - Calendar Selection">Due Date - Calendar Selection</option>
                                    <option value="Due Prior To Binding">Due Prior To Binding</option>
                                    <option value="Due within 30 days of Binding">Due within 30 days of Binding</option>
                                    <option value="Due within 60 days of Binding">Due within 60 days of Binding</option>
                                    <option value="Due within 90 days of Binding">Due within 90 days of Binding</option>
                                    <option value="Add New"><i class="fa fa-plus"></i> Add New</option> -->
                                </select>

                                <div class="col-sm-12 pull-left p-0">
                                    <input type="text" maxlength="10" class="form-control userAddDueDate" id="userAddDueDate" name="userAddDueDate" placeholder="Add New" style="display: none;">
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-md-3 pull-left pl-0">
                            <div class="input-group col-sm-2 date datepicker add_sub_datepicker pull-left mt-4 pl-0" data-listid="5" data-date-format="mm-dd-yyyy">
                                <input type="text" class="form-control addDatepickerInput" data-listid="5" style="display: none;">
                                <span class="input-group-addon calendarSelection add_calendarSelection disabled text-primary pl-0" data-listid="5"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                            </div>
                            <button type="button" class="btn btn-sm btn-primary rqbiAddSubject ml-1"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-0">
            <div class="card-header collapsed frmsumm_card_header rqbi_all_tabs" data-toggle="collapse" data-parent="#accordion" href="#frmsummAccord" onclick="get_formsummary(accid,rqbi_id);">
                <a class="card-title">
                    <i class="fa fa-file-text-o" aria-hidden="true"></i>  Forms Summary
                </a>
            </div>
            <div id="frmsummAccord" class="collapse">
                <div class="card-body">
                    <div class="bind_forms_summary"></div>
                </div>
            </div>
        </div>
        
        
        <div class="card mb-0">
            <div class="card-header collapsed quote_bg rqbi_all_tabs" data-toggle="collapse" data-parent="#accordion" href="#quoteAccord">
                <a class="card-title">
                    <i class="fa fa-file-text" aria-hidden="true"></i> Quote
                </a>
            </div>
            <div id="quoteAccord" class="collapse">
                <div class="card-body">
                    <div class="d-flex mb-4">
                        <button type="button" class="btn btn-primary rqbiGenerateQuoteBtn" onclick="generate_quote();">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Generate Quote
                            <span style="display: none;" class="rqbiGenerateQuoteSpinner">
                                <i class="fa fa-spinner fa-spin"></i>
                            </span>
                        </button>
                        <span class="rqbiQuoteDownload mr-4" onclick="download_generate_quote()"><i class="fa fa-download" aria-hidden="true"></i></span>
                        <button type="button" class="btn btn-sm btn-success xl_quoteBtn ml-4 d-none"> <i class="fa fa-paper-plane mr-1" aria-hidden="true"></i> Quote for XL </button>
                    </div>
                    
                    
                    <div class="col-md-12 pull-left p-0 rqbiQuoteList mb-4">
                        <div class="bind_quote_docurl"></div>
                    </div>
                    <div class="col-md-12 pull-left p-0  mb-3 mt-4 rqbiQuoteSendEmailDiv">
                        <fieldset class="col-md-12 pull-left pl-0">
                            <legend id="qutEmilLbl">Send Quote by Email</legend>
                            <div class="form-group row col-md-12 p-0 mb-1 pull-left">
                                <label class="col-form-label pl-3 pull-left">To: </label>
                                <div class="col-sm-10 pull-left">
                                    <div class="input-group">
                                        <input type="text" class="form-control rqbiQuoteEmailInput" placeholder="Enter Email Id" id="rqbiQuoteEmailInput">
                                    </div> 
                                </div> 
                                <button type="button" class="btn btn-sm rqbiQuoteSendEmailBtn text-white pull-left">
                                    <i class="fa fa-send"></i> Send Mail
                                </button>
                                <span class="QBI-invldEmlCls quote_vlidEml" style="color:#ed4613; display:none;">Invalid Email<span> 
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-0">
            <div class="card-header collapsed bind_card_header rqbi_all_tabs" data-toggle="collapse" data-parent="#accordion" href="#bindAccord">
                <a class="card-title">
                <i class="fa fa-files-o mr-3 float-left"></i> Bind
                </a>
            </div>
            <div id="bindAccord" class="collapse">
                <div class="card-body">
                    <button type="button" class="btn btn-primary rqbiGenBindBtn disabled mb-4 " onclick="generate_bind();">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Generate Bind
                        <span style="display: none;" class="rqbiGenBindSpinner">
                            <i class="fa fa-spinner fa-spin"></i>
                        </span>
                    </button>

                    <span class="rqbiBindDownload pl-0" onclick="download_generate_bind()"><i class="fa fa-download" aria-hidden="true"></i></span>
                    <div class="col-md-12 pull-left p-0 rqbiBindList mb-4">
                        <div class="bind_binder_docurl"></div>
                    </div>

                    <div class="col-md-12 pull-left p-0  mb-3 mt-4 rqbiBindSendEmailDiv">
                        <fieldset class="col-md-12 pull-left pl-0">
                            <legend id="bndEmilLbl">Send Bind by Email</legend>
                            <div class="form-group row col-md-12 p-0 mb-1 pull-left">
                                <label class="col-form-label pl-3 pull-left">To: </label>
                                <div class="col-sm-10 pull-left">
                                    <div class="input-group">
                                        <input type="text" class="form-control rqbiBindEmailInput" placeholder="Enter Email Id" id="rqbiBindEmailInput">
                                    </div>
                                </div>  
                                <button type="button" class="btn btn-sm rqbiBindSendEmailBtn text-white pull-left">
                                <i class="fa fa-send"></i> Send Mail
                                </button>
                                <span class="QBI-invldEmlCls bind_vlidEml" style="color:#ed4613; display:none;">Invalid Email<span>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-0">
            <div class="card-header collapsed issue_card_header rqbi_all_tabs" data-toggle="collapse" data-parent="#accordion" href="#issueAccord">
                <a class="card-title">
                    <i class="fa fa-check mr-3 float-left"></i> Issue
                </a>
            </div>
            <div id="issueAccord" class="collapse">
                <div class="card-body">
                    <div class="col-md-12 p-0 pull-left rqbiIssueStepTwo">
                        <button type="button" class="btn btn-primary rqbiGenIssueBtn disabled mb-4" onclick="generate_issue();">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Generate Issue
                            <span style="display: none;" class="rqbiGenIssueSpinner">
                                <i class="fa fa-spinner fa-spin"></i>
                            </span>
                        </button>
                        
                        <span class="rqbiIssueDownload" onclick="download_generate_issue()"><i class="fa fa-download" aria-hidden="true"></i></span>
                    <div class="col-md-12 pull-left p-0 rqbiIssueList mb-4">
                        <div class="bind_issue_docurl"></div>
                    </div>

                        <form class="rqbiPolicyLists" style="display: none;">
                            <div class="custom-control custom-checkbox pull-left col-md-12 mb-1 displayTableCell">
                                <input type="checkbox" class="custom-control-input" id="rqbiViewPolicyCkbx_1" name="rqbiViewPolicyCkbx_1">
                                <label class="custom-control-label" for="rqbiViewPolicyCkbx_1">
                                    <a href="javascript:void(0);">Policy Package 1</a>
                                </label>
                            </div>
                            <div class="custom-control custom-checkbox pull-left col-md-12 mb-1 displayTableCell">
                                <input type="checkbox" class="custom-control-input" id="rqbiViewPolicyCkbx_2" name="rqbiViewPolicyCkbx_2">
                                <label class="custom-control-label" for="rqbiViewPolicyCkbx_2">
                                    <a href="javascript:void(0);">Policy Package 2</a>
                                </label>
                            </div>
                        </form>
                        <div class="col-md-12 pull-left p-0 rqbiPolicySendEmailDiv mt-3 mb-3">
                            <fieldset class="col-md-12 pull-left pl-0">
                                <legend id="isuEmilLbl">Send Policy by Email</legend>
                                <div class="form-group row col-md-12 p-0 mb-1 pull-left">
                                    <label class="col-form-label pl-3 pull-left">To: </label>
                                    <div class="col-sm-10 pull-left">
                                        <div class="input-group">
                                            <input type="text" class="form-control rqbiPolicyEmailInput" placeholder="Enter Email Id" id="rqbiPolicyEmailInput">
                                        </div>
                                    </div>  
                                    <button type="button" class="btn btn-sm rqbiPolicySendEmailBtn text-white pull-left">
                                        <i class="fa fa-send"></i> Send Mail
                                    </button>
                                    <span class="QBI-invldEmlCls issue_vlidEml" style="color:#ed4613; display:none;">Invalid Email<span>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-0 reinstatement_accordion" style="display: none;">
            <div class="card-header collapsed endorse_card_header rqbi_all_tabs" data-toggle="collapse" data-parent="#accordion" href="#reinstateAccord">
                <a class="card-title">
                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> Endorsement
                </a>
            </div>
            <div id="reinstateAccord" class="collapse">
                <div class="card-body reinstate_cardbody">

                </div>
            </div>
        </div>

         <div class="card mb-0 endosement_accordion" style="display: none;">
            <div class="card-header collapsed endorse_card_header rqbi_all_tabs" data-toggle="collapse" data-parent="#accordion" href="#endorseAccord">
                <a class="card-title">
                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> Endorsement
                </a>
            </div>
            <div id="endorseAccord" class="collapse pb-4">
                <div class="card-body">
                    <div class="endorsement_section" style="display: none;">
                        <div class="form-group col-md-12 p-0 endorse_wording_sec">
                            <label class="col-md-2 pl-0 pull-left">Endorsement Wording</label>
                            <div id="invalid_endorse_wording" style="display:none">Invalid</div>
                            <textarea id="endorse_wording" class="col-md-10 form-control endorse_wording" name="endorse_wording" rows="7" cols="50"></textarea>
                        </div> 
                        <div class="form-group col-md-6 p-0 endorse_premium_sec">
                            <label class="col-md-4 pl-0 pull-left">Endorsement Premium</label>
                            <div class="input-group col-md-6 pull-left pl-0">
                              <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                              </div>
                              <input type="text" class="form-control endorse_premium number_only" id="endorse_premium" placeholder="Endorsement Premium">
                            </div>
                        </div>

                        <div class="col-md-12 pull-left mt-4 mb-3 p-0 endorse_btns">
                            <button type="button" class="btn btn-sm btn-primary mr-2 text-white pull-left endorseGenerateBtn"><i class="fa fa-plus-circle" aria-hidden="true"></i> Generate Endorsement </button>
                            <button type="button" class="btn btn-sm btn-info text-white pull-left endorseIssueBtn"><i class="fa fa-check" aria-hidden="true"></i> Issue Endorsement </button>
                            <span class="endorseDocDownload"><i class="fa fa-download" aria-hidden="true"></i></span>

                            <button type="button" class="btn btn-sm btn-danger pull-right text-white endorseDiscardBtn"><i class="fa fa-ban" aria-hidden="true"></i> Discard Endorsement </button>
                        </div>

                         <div class="col-md-12 pull-left p-0  mb-3 mt-4 endorseIssueDocs" style="display: none;">

                            <form class="endorse_doc_sec col-md-12 p-0 mb-3">
                                <div class="custom-control custom-checkbox pull-left col-md-12 mb-1 displayTableCell quoteDocsList">
                                    <input type="checkbox" class="custom-control-input" id="rqbiEndorseListCkbx_1" name="rqbiEndorseListCkbx_1">
                                    <label class="custom-control-label" for="rqbiEndorseListCkbx_1">
                                        <a class="endrs_quote_href1" target="_blank" href="https://asicbpdpr.esinsurancecloud.com/pdfs/3185_QuotePackage_1.pdf">Endorsement Document Package</a>
                                    </label>
                                    </div>
                                    <div class="custom-control custom-checkbox pull-left col-md-12 mb-1 displayTableCell">
                                        <input type="checkbox" class="custom-control-input" id="rqbiEndorseListCkbx_2" name="rqbiEndorseListCkbx_2">
                                        <label class="custom-control-label" for="rqbiEndorseListCkbx_2"><a class="endrs_quote_href2" target="_blank" href="https://asicbpdpr.esinsurancecloud.com/pdfs/3185_RatingWorksheet_quote.pdf"> Endorsement Worksheet</a></label>
                                    </div>
                            </form>

                       
                            <fieldset class="col-md-12 pull-left pl-0">
                                <legend>Send Endorse by Email</legend>
                                <div class="form-group row col-md-12 p-0 mb-1 pull-left">
                                    <label class="col-form-label pl-3 pull-left">To: </label>
                                    <div class="col-sm-10 pull-left">
                                        <div class="input-group">
                                            <input type="text" class="form-control endorseEmailInput" placeholder="Enter Email Id" id="endorseEmailInput">
                                        </div>  
                                    </div> 
                                    <button type="button" class="btn btn-sm endorseSendEmailBtn text-white pull-left">
                                        <i class="fa fa-send"></i> Send Mail
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div class="col-md-12 reinstatement_section" style="display: none;">
                        <div class="col-md-12 pull-left mt-4 mb-3 p-0 reinstate_btns">
                            <button type="button" class="btn btn-sm btn-primary mr-2 text-white pull-left reinstateGenerateBtn"><i class="fa fa-plus-circle" aria-hidden="true"></i> Generate Reinstatement </button>
                            <button type="button" class="btn btn-sm btn-info text-white pull-left reinstateIssueBtn"><i class="fa fa-check" aria-hidden="true"></i> Issue Reinstatement </button>
                            <span class="reinstateDocDownload"><i class="fa fa-download" aria-hidden="true"></i></span>

                            <button type="button" class="btn btn-sm btn-danger pull-right text-white reinstateDiscardBtn"><i class="fa fa-ban" aria-hidden="true"></i> Discard Reinstatement </button>
                        </div>

                         <div class="col-md-12 pull-left p-0  mb-3 mt-4 reinstateDocs" style="display: none;">
                            <form class="reinstate_doc_sec col-md-12 p-0 mb-3">
                                <div class="custom-control custom-checkbox pull-left col-md-12 mb-1 displayTableCell">
                                    <input type="checkbox" class="custom-control-input" id="rqbiReinstateListCkbx_1" name="rqbiReinstateListCkbx_1">
                                    <label class="custom-control-label" for="rqbiReinstateListCkbx_1">
                                        <a target="_blank" href="https://asicbpdpr.esinsurancecloud.com/pdfs/3185_QuotePackage_1.pdf">Reinstatement Document Package</a>
                                    </label>
                                </div>
                                <div class="custom-control custom-checkbox pull-left col-md-12 mb-1 displayTableCell">
                                    <input type="checkbox" class="custom-control-input" id="rqbiReinstateListCkbx_2" name="rqbiReinstateListCkbx_2">
                                    <label class="custom-control-label" for="rqbiReinstateListCkbx_2">
                                        <a target="_blank" href="https://asicbpdpr.esinsurancecloud.com/pdfs/3185_RatingWorksheet_quote.pdf"> Reinstatement Worksheet</a>
                                    </label>
                                </div>
                            </form>
                       
                            <fieldset class="col-md-12 pull-left pl-0">
                                <legend>Send Reinstatement by Email</legend>
                                <div class="form-group row col-md-12 p-0 mb-1 pull-left">
                                    <label class="col-form-label pl-3 pull-left">To: </label>
                                    <div class="col-sm-10 pull-left">
                                        <div class="input-group">
                                            <input type="text" class="form-control reinstateEmailInput" placeholder="Enter Email Id" id="reinstateEmailInput">
                                        </div>  
                                    </div> 
                                    <button type="button" class="btn btn-sm reinstateSendEmailBtn text-white pull-left">
                                        <i class="fa fa-send"></i> Send Mail
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div class="col-md-12 cancellation_section" style="display: none;">
                        <div class="col-md-12 pull-left mt-4 mb-3 p-0 cancel_btns">
                            <button type="button" class="btn btn-sm btn-primary mr-2 text-white pull-left cancelGenerateBtn"><i class="fa fa-plus-circle" aria-hidden="true"></i> Generate Cancellation </button>
                            <button type="button" class="btn btn-sm btn-info text-white pull-left cancel_issueBtn"><i class="fa fa-check" aria-hidden="true"></i> Issue Cancellation </button>
                            <span class="interendor_DocDownload"><i class="fa fa-download" aria-hidden="true"></i></span>

                            <button type="button" class="btn btn-sm btn-danger pull-right text-white cancel_DiscardBtn"><i class="fa fa-ban" aria-hidden="true"></i> Discard Cancellation </button>
                        </div>

                         <div class="col-md-12 pull-left p-0  mb-3 mt-4 cancellation_Docs" style="display: none;">
                            <form class="reinstate_doc_sec col-md-12 p-0 mb-3">
                                <div class="custom-control custom-checkbox pull-left col-md-12 mb-1 displayTableCell">
                                    <input type="checkbox" class="custom-control-input" id="interendor_ListCkbx_1" name="interendor_ListCkbx_1">
                                    <label class="custom-control-label" for="interendor_ListCkbx_1">
                                        <a target="_blank" href="https://asicbpdpr.esinsurancecloud.com/pdfs/3185_QuotePackage_1.pdf">Cancellation Document Package</a>
                                    </label>
                                </div>
                                <div class="custom-control custom-checkbox pull-left col-md-12 mb-1 displayTableCell">
                                    <input type="checkbox" class="custom-control-input" id="interendor_ListCkbx_2" name="interendor_ListCkbx_2">
                                    <label class="custom-control-label" for="interendor_ListCkbx_2">
                                        <a target="_blank" href="https://asicbpdpr.esinsurancecloud.com/pdfs/3185_RatingWorksheet_quote.pdf"> Cancellation Docs </a>
                                    </label>
                                </div>
                            </form>
                       
                            <fieldset class="col-md-12 pull-left pl-0">
                                <legend>Send Cancellation by Email</legend>
                                <div class="form-group row col-md-12 p-0 mb-1 pull-left">
                                    <label class="col-form-label pl-3 pull-left">To: </label>
                                    <div class="col-sm-10 pull-left">
                                        <div class="input-group">
                                            <input type="text" class="form-control interendor_EmailInput" placeholder="Enter Email Id" id="interendor_EmailInput">
                                        </div>  
                                    </div> 
                                    <button type="button" class="btn btn-sm interendor_SendEmailBtn text-white pull-left">
                                        <i class="fa fa-send"></i> Send Mail
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div class="col-md-12 interendor_section" style="display: none;">
                        <div class="col-md-12 pull-left mt-4 mb-3 p-0 interendor_btns">
                            <button type="button" class="btn btn-sm btn-info text-white pull-left interendor_issueBtn"><i class="fa fa-check" aria-hidden="true"></i> Issue Internal Endorsement </button>

                            <button type="button" class="btn btn-sm btn-danger pull-right text-white interendor_DiscardBtn"><i class="fa fa-ban" aria-hidden="true"></i> Discard Internal Endorsement </button>
                        </div>
                    </div>

                    <div class="audit_section" style="display: none;">
                        <div class="custom-control custom-checkbox pull-left mt-1 audit_waiver_ck">
                            <input type="checkbox" class="custom-control-input audit_waiver" id="audit_waiver">
                            <label class="custom-control-label" for="audit_waiver">Audit Waiver</label>
                        </div>
                        <div class="form-group col-md-12 p-0 mt-3 pull-left audit_wording_sec" style="display:none">
                            <label class="col-md-2 pl-0 pull-left">Endorsement Wording</label>               
                            <div id="invalid_audit_wording" style="display:none">Invalid</div>
                            <textarea id="audit_wording" class="col-md-10 form-control endorse_wording" name="audit_wording" rows="7" cols="50"></textarea>             
                        </div> 
                        <div class="form-group col-md-6 p-0 audit_premium_sec" style="display:none">
                            <label class="col-md-4 pl-0 pull-left">Audit Premium</label>
                            <div class="input-group col-md-6 pull-left pl-0">
                              <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                              </div>
                              <input type="text" class="form-control premium_audit number_only" id="premium_audit" placeholder="Audit Premium">
                            </div>
                        </div>

                        <div class="col-md-12 pull-left mt-4 mb-3 p-0 endorse_btns">
                            <button type="button" class="btn btn-sm btn-primary mr-2 text-white pull-left audit_GenerateBtn"><i class="fa fa-plus-circle" aria-hidden="true"></i> Generate Premium Audit </button>
                            <button type="button" class="btn btn-sm btn-info text-white pull-left audit_IssueBtn"><i class="fa fa-check" aria-hidden="true"></i> Issue Premium Audit </button>
                            <span class="audit_DocDownload"><i class="fa fa-download" aria-hidden="true"></i></span>

                            <button type="button" class="btn btn-sm btn-danger pull-right text-white audit_DiscardBtn"><i class="fa fa-ban" aria-hidden="true"></i> Discard Premium Audit </button>
                        </div>

                         <div class="col-md-12 pull-left p-0  mb-3 mt-4 audit_IssueDocs" style="display: none;">

                            <form class="endorse_doc_sec col-md-12 p-0 mb-3">
                                <div class="custom-control custom-checkbox pull-left col-md-12 mb-1 displayTableCell">
                                    <input type="checkbox" class="custom-control-input" id="audit_ListCkbx_1" name="audit_ListCkbx_1">
                                    <label class="custom-control-label" for="audit_ListCkbx_1">
                                        <a target="_blank" href="https://asicbpdpr.esinsurancecloud.com/pdfs/3185_QuotePackage_1.pdf">Premium Audit Document Package</a>
                                        
                                    </label>
                                    </div>
                                    <div class="custom-control custom-checkbox pull-left col-md-12 mb-1 displayTableCell">
                                        <input type="checkbox" class="custom-control-input" id="audit_ListCkbx_2" name="audit_ListCkbx_2">
                                        <label class="custom-control-label" for="audit_ListCkbx_2"><a target="_blank" href="https://asicbpdpr.esinsurancecloud.com/pdfs/3185_RatingWorksheet_quote.pdf"> Premium Audit Worksheet</a></label>
                                    </div>
                            </form>

                       
                            <fieldset class="col-md-12 pull-left pl-0">
                                <legend>Send Premium Audit by Email</legend>
                                <div class="form-group row col-md-12 p-0 mb-1 pull-left">
                                    <label class="col-form-label pl-3 pull-left">To: </label>
                                    <div class="col-sm-10 pull-left">
                                        <div class="input-group">
                                            <input type="text" class="form-control endorseEmailInput" placeholder="Enter Email Id" id="endorseEmailInput">
                                        </div>  
                                    </div> 
                                    <button type="button" class="btn btn-sm endorseSendEmailBtn text-white pull-left">
                                        <i class="fa fa-send"></i> Send Mail
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="col-md-2 pull-left p-0 rhspane rqbi_rhspane_section" style="display: none;">
        <div class="card mb-13 height40">
            <div class="clearfix">
                <div class="media">
                    <div class="pull-left">
                        <span>
                            <span class="width60 quoteicon font19 close_right_section_btn">
                                <span ><i class="fa fa-file-text" aria-hidden="true"></i></span>
                            </span>
                        </span>
                    </div>
                    
                    <div class="media-body pt-0 pb-3">
                         <a href="javascript:void(0);" class="txtclr" id="rhs_subno"><strong>Submission/Policy No. </strong></a>
                        <h6 class="media-heading m-0">
                            <span style="color: #cc3333;" class="rhs_submission_policy_no"></span>
                        </h6>
                    </div>
                </div>
            </div>
        </div>

        <span class="totalPremiumLabel pl-1">
            <i class="fa fa-money pr-1" aria-hidden="true"></i>
        </span>
        <div class="arrow-right"></div>

        <div class="card mb-13 pull-left rhscardtopborder bordertopleft_0">

            <div class="clearfix">
                <div class="toggle_parent pull-left pt-2 p-4 width100_perc gl_rhs_head">
                    <div class="toggleHolder">
                        <span class="toggler glToggler fontweight500">
                            <i class="fa fa-caret-right glrightarrow" aria-hidden="true"></i> 
                            <i class="fa fa-caret-down gldownarrow" aria-hidden="true" style="display: none;"></i>
                            GL
                        </span>
                        <span class="pull-right borderbottomDashed glTotalAmt rhsamountclr"></span>
                        <div class="rhsGlPremium toggled_content gl_toggled_content forarrow" style="display:none;">
                            <div class="gllocationlist">
                                <p class="pull-left width100_perc mb-0"><span class="pull-left fontweight500">L1 : </span><span class="pull-left pl-2">  </span><span class="pull-right fontweight500"></span></p>
                            </div>
                            <div class="gllocationlist">
                                <p class="pull-left width100_perc mb-0"><span class="pull-left fontweight500">L2 : </span><span class="pull-left pl-2">  </span><span class="pull-right fontweight500"></span></p>
                            </div>
                            <div class="gllocationlist">
                                <p class="pull-left width100_perc mb-0"><span class="pull-left fontweight500">L3 : </span><span class="pull-left pl-2"> </span><span class="pull-right fontweight500"></span></p>
                            </div>
                        </div>
                    </div>
                </div>            

                <div class="toggle_parent pull-left pt-2 p-4 width100_perc liquor_rhs_head">
                    <div class="toggleHolder">
                        <span class="toggler liquorToggler fontweight500">
                            <i class="fa fa-caret-right liquorrightarrow" aria-hidden="true"></i>
                            <i class="fa fa-caret-down liquordownarrow" aria-hidden="true" style="display: none;"></i>
                            Liquor
                        </span> 
                        <span class="pull-right borderbottomDashed liquorTotalAmt rhsamountclr"></span>
                    </div>
                    <div class="rhsLiquorPremium toggled_content liquor_toggled_content forarrow" style="display:none;">
                        <div class="liquorlocationlist">
                            <p class="pull-left width100_perc mb-0"><span class="pull-left fontweight500">L1 : </span><span class="pull-left pl-2">  </span><span class="pull-right fontweight500"></span></p>
                        </div>
                        <div class="liquorlocationlist">
                            <p class="pull-left width100_perc mb-0"><span class="pull-left fontweight500">L2 : </span><span class="pull-left pl-2">  </span><span class="pull-right fontweight500"></span></p>
                        </div>
                    </div>
                </div>

                <div class="toggle_parent pull-left pt-2 p-4 pb-4 width100_perc ocp_rhs_head">
                    <div class="toggleHolder">
                        <span class="toggler ocpToggler fontweight500">
                            <i class="fa fa-caret-right ocprightarrow" aria-hidden="true"></i>
                            <i class="fa fa-caret-down ocpdownarrow" aria-hidden="true" style="display: none;"></i>
                            OCP
                        </span> 
                        <span class="pull-right borderbottomDashed ocpTotalAmt rhsamountclr"></span>
                    </div>
                    <div class="rhsOcpPremium toggled_content ocp_toggled_content forarrow" style="display:none;">
                    </div>
                </div>
                <p class="pull-left width100_perc p-4 mt-2 mb-1">
                    <span class="pull-left fontweight500">Optional Coverages</span>
                    <span class="pull-right borderbottomDashed rhsamountclr rhs_oc_premium"></span>
                </p>
                <p class="pull-left width100_perc p-4 mt-2 mb-1">
                    <span class="pull-left fontweight500">AI/WOS/PNC</span>
                    <span class="pull-right borderbottomDashed rhsamountclr rhs_ai_premium"></span>
                </p>
                <p class="pull-left width100_perc p-4 mt-2 mb-1">
                    <span class="pull-left fontweight500">Common Forms</span>
                    <span class="pull-right borderbottomDashed rhsamountclr rhs_common_premium"></span>
                </p>
                <p class="pull-left width100_perc p-4 mt-2 mb-1">
                    <span class="pull-left fontweight500">All Forms</span>
                    <span class="pull-right borderbottomDashed rhsamountclr rhs_allforms_premium"></span>
                </p>
                <p class="pull-left width100_perc p-4 mt-2 mb-1">
                    <span class="pull-left fontweight500">Manuscript Forms</span>
                    <span class="pull-right borderbottomDashed rhsamountclr rhs_manuscript_premium"></span>
                </p>
                <p class="pull-left width100_perc p-4 mt-2 mb-1">
                    <span class="pull-left fontweight500">TRIA 
                        <button type="button" class="btn-sm triaaccept" style="display: none;">
                            <small class="accepticon"><i class="fa fa-check-circle" aria-hidden="true"></i></small> 
                            <small class="accepttext">Accept</small>
                        </button>
                        <button type="button" class="btn-sm triareject">
                            <small class="rejecticon"><i class="fa fa-close-circle" aria-hidden="true"></i></small> 
                            <small class="rejecttext">Reject</small>
                        </button>
                    </span>
                    <span class="pull-right borderbottomDashed rhsamountclr rhs_tria_premium"></span>
                </p>
                <p class="pull-left width100_perc p-4 mt-2 mb-1">
                    <span class="pull-left fontweight500 totalpremamt">Total Premium</span>
                    <span class="pull-right borderbottomDashed rhsamountclr totalpremamt rhs_total_premium"></span>
                </p>
                <p class="pull-left width100_perc p-4 mt-2 mb-1">
                    <span class="pull-left fontweight500">Commissions</span>
                    <span class="pull-right borderbottomDashed rhsamountclr rhs_commission"></span>
                </p>

                <p class="pull-left width100_perc p-4 mt-2 mb-1">
                    <span class="pull-left fontweight500">Total Commission</span>
                    <span class="pull-right borderbottomDashed rhsamountclr rhs_total_commission"></span>
                </p>
            </div>
        </div>
    </div>
</div>
<!-- Fill in form popup -->
<a href="javascript:void(0);" class="fillinPopup" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#fillinPopup" style="visibility: hidden;"></a>

<div id="fillinPopup" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header p-0">
                <h4 class="modal-title p-2"> Variable Form Fill in </h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group col-md-12 pull-left p-0">
                    <label for=""> Maximum Premium </label>
                    <div class="col-md-12 p-0">
                        <input type="text" value="100%" class="form-control fillinMaxPremium" id="fillinMaxPremium" name="fillinMaxPremium">
                    </div>
                </div>
            </div>
            <div class="modal-footer border-0 pt-0">
                <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal">
                    <i class="fa fa-save"></i> Save 
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Class builder - Delete - Confirm Popup -->
 <button data-toggle="modal" data-target="#cbDeletePopup" class="visibility_hidden cbDeletePopup"></button>
 <div class="modal fade" id="cbDeletePopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="cbDeletePopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p id="cb_delete_msg" style="display:none">Are you sure you want to delete?</p>
                <p id="cb_gr_delete_msg" style="display:none">Graduated rating will be removed. Are you sure you want to delete?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="cbrow_delete_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="cbrow_delete_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>

<!-- Location Details - Delete - Confirm Popup -->
 <button data-toggle="modal" data-target="#locDeletePopup" class="visibility_hidden locDeletePopup"></button>
 <div class="modal fade" id="locDeletePopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="locDeletePopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="locrow_delete_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="locrow_delete_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>

 <!-- Subjectivities - Delete - Confirm Popup -->
 <button data-toggle="modal" data-target="#subjDeletePopup" class="visibility_hidden subjDeletePopup"></button>
 <div class="modal fade" id="subjDeletePopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="subjDeletePopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="subj_delete_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="subj_delete_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>

 <!-- Graduate - Delete - Confirm Popup -->
 <button data-toggle="modal" data-target="#gradDeletePopup" class="visibility_hidden gradDeletePopup"></button>
 <div class="modal fade" id="gradDeletePopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="gradDeletePopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="grad_delete_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="grad_delete_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>

 <!-- Composite rating - Delete - Confirm Popup -->
 <button data-toggle="modal" data-target="#compDeletePopup" class="visibility_hidden compDeletePopup"></button>
 <div class="modal fade" id="compDeletePopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="compDeletePopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p id="cr_delete_msg" style="display:none">Are you sure you want to delete?</p>
                <p id="cr_gr_delete_msg" style="display:none">Graduated rating will be removed. Are you sure you want to delete?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="comp_delete_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="comp_delete_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>

<!-- Manuscript Forms - Delete - Confirm Popup -->
 <button data-toggle="modal" data-target="#manuFrmDeletePopup" class="visibility_hidden manuFrmDeletePopup"></button>
 <div class="modal fade" id="manuFrmDeletePopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="manuFrmDeletePopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete?</p>
            </div>
            <div class="modal-footer">
                <input type="hidden" class="menuscripthiddenid" value="">
                <button type="button" class="btn btn-md btn-success" onclick="menuscript_delete();" id="manuFrm_delete_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="manuFrm_delete_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>

 <!-- Coverges - Warning Popup -->
 <button data-toggle="modal" data-target="#covPopup" class="visibility_hidden covPopup"></button>
 <div class="modal fade" id="covPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="covPopup" aria-hidden="true">
    <div class="modal-dialog modal-warning" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Warning</h4>
            </div>
            <div class="modal-body">
                <p class="covWarningMsg">All <!--<insert coverage removed name>!--> data will be removed. Are you sure you want to proceed?</p>
            </div>
            <div class="modal-footer">
                <!--<button type="button" class="btn btn-md btn-success" id="covWarningOk" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>!-->
                <button type="button" class="btn btn-md btn-success" id="covWarningOk" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="covWarningCancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>
<!--End RQBI Accordion Section-->

 <!-- Location edit - Warning Popup -->
 <button data-toggle="modal" data-target="#loceditPopup" class="visibility_hidden loceditPopup"></button>
 <div class="modal fade" id="loceditPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="loceditPopup" aria-hidden="true">
    <div class="modal-dialog modal-warning" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Warning</h4>
            </div>
            <div class="modal-body">
                <p class="loceditWarningMsg">This location is utilized in your premium/composite rate, which may be impacted, do you want to continue?</p>
            </div>
            <div class="modal-footer">
                <!--<button type="button" class="btn btn-md btn-success" id="covWarningOk" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>!-->
                <button type="button" class="btn btn-md btn-success" id="loceditWarningOk" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="loceditWarningCancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>
<!--Location edit Section-->

<!-- Start classbuilder exposure / final rate popup -->
 <!--<button data-toggle="modal" data-target="#expfratePopup1" class="visibility_hidden expfratePopup1"></button>
 <div class="modal fade" id="expfratePopup1" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="expfratePopup1" aria-hidden="true">
    <div class="modal-dialog modal-warning" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Warning</h4>
            </div>
            <div class="modal-body">
                <p>Please modify the graduated rating, as the exposure/final rate is modified</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="expfratePopup1_yes" data-dismiss="modal"><i class="fa fa-check"></i> Yes </button>
                <button type="button" class="btn btn-md btn-danger" id="expfratePopup1_no" data-dismiss="modal"><i class="fa fa-remove"></i> No </button>
            </div>
        </div>
    </div>
 </div> -->
<!-- End classbuilder exposure / final rate popup -->

<!-- Start composite rating exposure / premium popup -->
 <!--<button data-toggle="modal" data-target="#compositeratePopup1" class="visibility_hidden compositeratePopup1"></button>
 <div class="modal fade" id="compositeratePopup1" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="compositeratePopup1" aria-hidden="true">
    <div class="modal-dialog modal-warning" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Warning</h4>
            </div>
            <div class="modal-body">
                <p>composite rating exposure/premium rate value is empty</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="compositeratePopup1_yes" data-dismiss="modal"><i class="fa fa-check"></i> Yes </button>
                <button type="button" class="btn btn-md btn-danger" id="compositeratePopup1_no" data-dismiss="modal"><i class="fa fa-remove"></i> No </button>
            </div>
        </div>
    </div>
 </div> -->
<!-- End composite rating exposure / premium popup -->

<!-- Start classbuilder add / delete popup -->
 <button data-toggle="modal" data-target="#cbaddPopup" class="visibility_hidden cbaddPopup"></button>
 <div class="modal fade" id="cbaddPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="cbaddPopup" aria-hidden="true">
    <div class="modal-dialog modal-warning" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Warning</h4>
            </div>
            <div class="modal-body">
                <p>Graduated rating will be removed. Do you wish to continue</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="cbaddPopup_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok </button>
                <button type="button" class="btn btn-md btn-danger" id="cbaddPopup_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel </button>
            </div>
        </div>
    </div>
 </div> 
<!-- End classbuilder add / delete popup -->

<!-- Start composite rating add / delete popup -->
 <button data-toggle="modal" data-target="#compositeaddPopup" class="visibility_hidden compositeaddPopup"></button>
 <div class="modal fade" id="compositeaddPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="compositeaddPopup" aria-hidden="true">
    <div class="modal-dialog modal-warning" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Warning</h4>
            </div>
            <div class="modal-body">
                <p>Graduated rating will be removed. Do you wish to continue</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="compositeaddPopup_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok </button>
                <button type="button" class="btn btn-md btn-danger" id="compositeaddPopup_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel </button>
            </div>
        </div>
    </div>
 </div>
<!-- End composite rating add / delete popup -->

<!-- Start graduated rating reset popup -->
 <button data-toggle="modal" data-target="#graduatedresetPopup" class="visibility_hidden graduatedresetPopup"></button>
 <div class="modal fade" id="graduatedresetPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="graduatedresetPopup" aria-hidden="true">
    <div class="modal-dialog modal-warning" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Warning</h4>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to reset Graduated Rating?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="graduatedresetPopup_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok </button>
                <button type="button" class="btn btn-md btn-danger" id="graduatedresetPopup_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel </button>
            </div>
        </div>
    </div>
 </div>
<!-- End graduated rating reset popup -->

<!-- Class builder - If Any - Confirm Popup -->
<button data-toggle="modal" data-target="#ifanyPopup" class="visibility_hidden ifanyPopup"></button>
 <div class="modal fade" id="ifanyPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ifanyPopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p id="ifany_cnfrm_msg">Graduated rating will be removed. Do you wish to continue?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="ifany_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="ifany_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>

 <!-- Class builder - Included - Confirm Popup -->
<button data-toggle="modal" data-target="#includedPopup" class="visibility_hidden includedPopup"></button>
 <div class="modal fade" id="includedPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="includedPopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p id="included_cnfrm_msg">Graduated rating will be removed. Do you wish to continue?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="included_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="included_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>


<!--- ISO Notes Popup modal section start --->

<!-- Button trigger modal -->
<button type="button" class="visibility_hidden btn btn-primary isonotes_popup_btn" data-toggle="modal" data-target="#isonotes_popup"></button>

<!-- Modal -->
<div class="modal fade" id="isonotes_popup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header p0 ">
        <h5 class="modal-title pl-2 pr-2 iso_notes_popup_header" id="exampleModalLabel">ISO Notes</h5>
        <button type="button" class="close iso_notes_popup_title" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="bind_iso_notes"></div>
      </div>      
    </div>
  </div>
</div>

<!--- ISO Notes Popup modal section End --->

<!-- Class builder - If Any - Confirm Popup -->
<button data-toggle="modal" data-target="#ifanyPopup" class="visibility_hidden ifanyPopup"></button>
 <div class="modal fade" id="ifanyPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="ifanyPopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p id="ifany_cnfrm_msg">Graduated rating will be removed. Do you wish to continue?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="ifany_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="ifany_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>

 <!-- Class builder - Included - Confirm Popup -->
<button data-toggle="modal" data-target="#includedPopup" class="visibility_hidden includedPopup"></button>
 <div class="modal fade" id="includedPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="includedPopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p id="included_cnfrm_msg">Graduated rating will be removed. Do you wish to continue?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="included_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="included_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>


 <!-- Composite rating selected class code  - uncheck - Confirm Popup -->
<button data-toggle="modal" data-target="#cr_uncheck_Popup" class="visibility_hidden cr_uncheck_Popup"></button>
 <div class="modal fade" id="cr_uncheck_Popup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="cr_uncheck_Popup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p id="cr_uncheck_Popup_cnfrm_msg">Graduated rating will be removed. Do you wish to continue?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="cr_uncheck_Popup_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="cr_uncheck_Popup_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>


 <button data-toggle="modal" data-target="#repeatFormsClosePopup" class="visibility_hidden repeatFormsClosePopup"></button>
 <div class="modal fade" id="repeatFormsClosePopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="repeatFormsClosePopup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p>Are you sure to remove the repeated form?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="repeatforms_remove_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="repeatforms_remove_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>

 <!--classcode used in Composite rating changed - Confirm Popup -->
<button data-toggle="modal" data-target="#clscd_change_Popup" class="visibility_hidden clscd_change_Popup"></button>
 <div class="modal fade" id="clscd_change_Popup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="clscd_change_Popup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p id="clscd_change_Popup_cnfrm_msg">This class code is utilized composite rating, do you want to continue?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="clscd_change_Popup_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="clscd_change_Popup_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>

<!--location used in Composite rating changed - Confirm Popup -->
<button data-toggle="modal" data-target="#loc_change_Popup" class="visibility_hidden loc_change_Popup"></button>
 <div class="modal fade" id="loc_change_Popup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="loc_change_Popup" aria-hidden="true">
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p id="loc_change_Popup_cnfrm_msg">This location is utilized composite rating, do you want to continue?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="loc_change_Popup_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok</button>
                <button type="button" class="btn btn-md btn-danger" id="loc_change_Popup_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel</button>
            </div>
        </div>
    </div>
 </div>


<div class="modal fade col-md-12 show in brokerageform_modal" id="brokerage_pdfModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="covStateSpeciPop_title" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document" style="max-width: 1150px;">
    <div class="modal-content" style="height: 650px;">
        <div id="Formpdflmodaloader" style="display: none;">
          <span class="processingSpinner"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> Loading Form... </span>
         </div>
      <div class="modal-header brokPopHead">
        <h5 class="modal-title" id="brokerage_pdf_header">
            PDF
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">      
               <iframe id="brokerage_emd_data" width="100%" height="500px" src=""></iframe>
      </div>
      <div class="modal-footer border-0 pt-0">
        <button type="button" class="btn btn-secondary covStateSpeciPopClose brokerage_emd_data_clear" data-dismiss="modal"> OK </button>
      </div>
    </div>
  </div>
</div>

<!-- Endorsement discard popup -->
 <button data-toggle="modal" data-target="#endorsediscardPopup" class="visibility_hidden endorsediscardPopup"></button>
 <div class="modal fade" id="endorsediscardPopup" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="endorsediscardPopup" aria-hidden="true">
    <div class="modal-dialog modal-warning" role="document">
        <div class="modal-content">
            <div class="modal-header p-1">
                <h4 class="modal-title">Warning</h4>
            </div>
            <div class="modal-body">
                <div id="endorsement_popup" style="display:none"><p>Are you sure you want to discard the Endorsement ?</p></div>
                <div id="cancellation_popup" style="display:none"><p>Are you sure you want to discard the Cancellation ?</p></div>
                <div id="reinstatement_popup" style="display:none"><p>Are you sure you want to discard the Reinstatement ?</p></div>
                <div id="internalendorsement_popup" style="display:none"><p>Are you sure you want to discard the Internal Endorsement ?</p></div>
                <div id="audit_premium_popup" style="display:none"><p>Are you sure you want to discard the Audit Premium ?</p></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success" id="endorseDiscardPopup_ok" data-dismiss="modal"><i class="fa fa-check"></i> Ok </button>
                <button type="button" class="btn btn-md btn-danger" id="endorseDiscardPopup_cancel" data-dismiss="modal"><i class="fa fa-remove"></i> Cancel </button>
            </div>
        </div>
    </div>
 </div> 
<script type="text/javascript">

$(".varinfo_datepicker").datepicker({ 
        autoclose: true, 
        format: 'MM-DD-YYYY'
});

$("#rqbi_effect_dt").datepicker({ 
        autoclose: true, 
  }).datepicker('update', new Date())
    .on('changeDate', effectDateChanged);

$("#rqbi_expir_dt").datepicker({ 
        autoclose: true,
  }).datepicker('update', new Date())
    .on('changeDate', expDateChanged);

 $("#datepickerfullyearned").datepicker({ 
        autoclose: true, 
        todayHighlight: true
   }).datepicker('update', new Date())
     .on('changeDate', additionalAccountDetailsRqbi);
    
  load_datepicker();

  $(document).on('click', '.brokerageform_modal', function () {
    var brokerage_url = $(this).attr('data-brokerage_url');
    var brokerage_header_1 = $(this).attr('data-brokerage_header_1');
    $('#brokerage_pdf_header').html(brokerage_header_1);
    $('#brokerage_pdfModal').modal('show');
});



$(document).on('click', '.brokerage_popup', function () {
  $("#brokerage_emd_data").attr("src",""); 
  $("#Formpdflmodaloader").show(); 
  var formid = $(this).attr('data-formid');  
  var formedition = $(this).attr('data-formedition');  
  var get_form_url = laravel_url+"/docgen/var/www/docgen/formpdf.php";
  var form_id = formid+"-"+formedition;
  var form_format = $(this).attr('data-form_format'); 
  if(host=='localhost'){
        get_form_url = base_url + '/docgen/var/www/docgen/formpdf.php';
    }else{
        get_form_url = doc_api_url + '/docgen/formpdf.php';  
    }
  brokerage_pdf_modal_popup();
  get_form_pdf_template(get_form_url, form_id,host, doc_api_url, formedition, formid, form_format); //function call

});

//Get document template from docgen
function get_form_pdf_template(get_form_url, form_id, host,doc_api_url, formedition, formid, form_format){ //function definition
    $.ajax({
    url: get_form_url,
    data:{form_id:form_id,host:host,static_pdf:"true",form_format:form_format},
    cache: false,
    method:"GET",
    success:function(res){
        $("#brokerage_emd_data").attr("src", doc_api_url+"/pdfs/"+formid+"-"+formedition+".pdf");
        var Interval = setInterval(function() {
        if ($('#brokerage_emd_data').attr("src") != "") {
            clearInterval(Interval);
            $("#Formpdflmodaloader").hide();
        }
        }, 800);
    },
    error: function (jqXhr, textStatus, errorMessage) { // error callback
        $("#Formpdflmodaloader").hide();
        console.log('Error: ' + errorMessage);
    }
});
}
//Show modal poupup for dispalying pdf 
function brokerage_pdf_modal_popup(){
    var brokerage_url = $(this).attr('data-brokerage_url');
    var brokerage_header_1 = $(this).attr('data-brokerage_header_1');
    $('#brokerage_pdf_header').html(brokerage_header_1);
    $('#brokerage_pdfModal').modal('show'); 



}

  
$("#cancellationDate, #reinstatementDate, #audit_date").datepicker({ 
    autoclose: true, 
    todayHighlight: true
});

$("#endorsementDate").datepicker({ 
    autoclose: true, 
    todayHighlight: true,
    format: 'm/d/yyyy'
});
</script>