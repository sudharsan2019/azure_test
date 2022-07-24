

<style type="text/css">
   .warningPopup .modal-content {
    border: 2px solid #fabb3d !important;
  }
  .successPopup .modal-content {
    border: 2px solid #bdea74 !important;
  }
  .mr20{
   margin-left: 20px;
  }
</style>

<div class="col-xs-12 pull-right mr20">
    <button class="btn btn-primary btn-sm new_acc_quick_btn mb20 pull-left account_list_add_btn table_search_buton_design" id="account_list_add_btn" <?php echo $specific_diable; ?> ><i class="fa fa-plus" aria-hidden="true"></i> New Account</button>
</div>

<div class="row safari_responsive">
    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 search_bar_maindiv">
        <button type="button" class="visibility_hidden success_btn" data-toggle="modal" data-target="#successPopup"></button>

        <div class="form-group top_searchbox col-md-9 pull-left p0 account_list_searchbar">
            <input type="text" class="form-control searchbar_div searchbar_div2 awesomplete width_127perc" id="br_ac_name_search" placeholder="Search" data-list="John, Stephon, Johny">
        </div>
        <div class="input-group-btn search_icon_design col-md-1 searchbar_div pull-right">

            <button class="btn btn-primary search_icon_button_design btn_full_widthalign"  data-toggle="tooltip" data-html="true" data-placement="top" data-original-title="<em> Search </em>" type="button" data-select2-open="single-append-text">
            <span class="fa fa-search text-white"></span></button>

            <button class="btn btn-primary filter_btn_align show_filter_btn" data-toggle="tooltip" data-html="true" data-placement="top" data-original-title="<em> Filter </em>" type="button" data-select2-open="single-append-text">
                <span class=""><i class="fa fa-filter text-white" aria-hidden="true"></i></span>
            </button>

            <button class="btn btn-primary filter_btn_align show_account_filter_btn hide_acount_btn" type="button" data-select2-open="single-append-text">
                <span class=""><i class="fa fa-filter text-white" aria-hidden="true"></i></span>
            </button>
        </div>
    </div>

    <div class="col-sm-12 col-xl-6 filter_section_design filter_div accountlist_filters" style="display:none;">
        <div class="card">
            <div class="card-header"> Filter <span class="pull-right filter_remove_btn"><i class="fa fa-remove"></i></span> </div>
            <!-- Submission-->
            <div class="card-body submission_div_form">
                <!-- <form id="searchBarForm"> -->
                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">
                    <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 p-0 pull-left broker_select_sec">
                        <label>Broker</label>
                        <div class="bind_filter_brokers empty_value_select"></div>
                    </div>
                    <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left p0 primary_assignee_select_sec">
                        <label class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">Primary Assignee</label>
                        <div class="bind_filterprimary_assignee empty_value_select"></div>
                    </div>
               </div>

                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">
                    <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left pl-0">
                        <label>Created From</label>
                        <div id="acc_filter_date_from" class="input-group date" data-date-format="mm-dd-yyyy">
                            <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
                            <input class="form-control bg_white empty_value" id="cr_date_from" type="text" readonly />
                        </div>
                    </div>
                    <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left pl-0">
                        <label>Created To</label>
                        <div id="acc_filter_date_to" class="input-group date" data-date-format="mm-dd-yyyy">
                            <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
                            <input class="form-control bg_white empty_value" id="cr_date_to" type="text" readonly />
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">
                    <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left pl-0">
                        <label>Effective From</label>
                        <div id="acc_filter_date_effecfrom" class="input-group date" data-date-format="mm-dd-yyyy">
                            <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
                            <input class="form-control bg_white empty_value" id="eff_date_from" type="text" readonly />
                        </div>
                    </div>
                    <div class="form-group form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left pl-0">
                        <label>Effective To</label>
                        <div id="acc_filter_date_effecto" class="input-group date" data-date-format="mm-dd-yyyy">
                            <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
                            <input class="form-control bg_white empty_value" id="eff_date_to" type="text" readonly />
                        </div>
                    </div>
                </div>

                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">
                    <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left pl-0 account_status_select_sec">
                        <label class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">Account Status</label>

                        <select id="multi-select-demo-three" class="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-control pull-left p14 empty_value_select" multiple="multiple">
                            <option value="Submission">Submission</option>
                            <option value="Indication">Indication</option>
                            <option value="Quote">Quote</option>
                            <option value="Bind">Bind</option>
                            <option value="Issue">Issue</option>
                            <option value="decline"> Decline </option>
                            <option value="inreview"> In Review </option>
                            <option value="cancel"> Cancel </option>
                        </select>
                    </div>
                    <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left p0 primary_assignee_select_sec">
                        <label class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">Status</label>
                        <select class="form-control" id="filter_status" name="filter_status" multiple="multiple">
                            <option value="active">Active</option>
                            <option value="archive">Archive</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0 pull-left account_applybtn">
                    <button type="reset" onclick="reset_acccountlist();" class="btn btn-danger btn-sm pull-right account_applybtn_click reset_btn_align resetbtn_account" ><i class="fa fa-remove" aria-hidden="true"></i>    Reset
                    </button>

                    <button type="button" class="btn btn-success btn-sm pull-right accountfiltersearch account_applybtn_click"><i class="fa fa-check" aria-hidden="true"></i>    Apply
                    </button>
                </div>

                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0 archive_applybtn" style="display: none;">
                    <button type="reset" onclick="reset_archivelist();" class="btn btn-danger btn-sm pull-right resetbtn_account reset_btn_align" ><i class="fa fa-remove" aria-hidden="true"></i>    Reset
                    </button>
                    <button type="button" class="btn btn-success btn-sm pull-right archivefiltersearch"><i class="fa fa-check" aria-hidden="true"></i>    Apply
                    </button>
                </div>

                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0" style="display: none;">
                    <div class="form-check col-md-12 col-lg-12 col-sm-12 col-xs-12  pull-left">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                        <label class="form-check-label" for="defaultCheck1">
                            Default checkbox
                        </label>
                    </div>
                    <div class="form-check col-md-12 col-lg-12 col-sm-12 col-xs-12  pull-left">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
                        <label class="form-check-label" for="defaultCheck2">
                        Disabled checkbox
                        </label>
                    </div>
                </div>
                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0" style="display: none;">
                    <div class="form-check col-md-12 col-lg-12 col-sm-12 col-xs-12  pull-left">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                        <label class="form-check-label" for="defaultCheck1">
                            Default checkbox
                        </label>
                    </div>
                    <div class="form-check col-md-12 col-lg-12 col-sm-12 col-xs-12  pull-left">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
                        <label class="form-check-label" for="defaultCheck2">
                            Disabled checkbox
                        </label>
                    </div>
                </div>
            <!-- </form> -->
            </div>
            <!-- Account List-->
            <div class="card-body account_div_form">
                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0 click_enable">
                    <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left p0">
                        <label>Email From</label>
                        <div id="acc_filter_emailform" class="input-group date" data-date-format="mm-dd-yyyy">
                            <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
                            <input class="form-control bg_white email_date_from empty_value_emailsubmission" type="text" readonly />
                        </div>
                    </div>
                    <div class="form-group form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left p14">
                        <label>Email To</label>
                        <div id="acc_filter_emailto" class="input-group date" data-date-format="mm-dd-yyyy">
                            <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
                            <input class="form-control bg_white email_date_to empty_value_emailsubmission" type="text" readonly />
                         </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">
                    <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left p0 account_priority_select_sec flagg_view">
                        <label class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">Flag</label>
                        <select id="multi-select-esubmission-flag" class="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-control pull-left flag_fill_val" multiple="multiple">
                            <option value="0">Red</option>
                            <option value="1">Green</option>
                        </select>
                    </div>

        			<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0 pull-right">
                        <button type="reset" class="btn btn-danger btn-sm pull-right account_applybtn_click reset_btn_align resetbtn_esubmission"<?php echo $specific_diable; ?> ><i class="fa fa-remove" aria-hidden="true"></i>    Reset
                        </button>
                        <button type="button" class="btn btn-success btn-sm pull-right submissionfiltersearch" <?php echo $specific_diable; ?>><i class="fa fa-check" aria-hidden="true"></i>    Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--- Setting Table Field --->
    <div class="col-sm-12 col-xl-6 filter_section_design setting_filter_div show_field_accountlist_filters" style="display:none;">
        <div class="card">
            <div class="card-header"> Column <span class="pull-right setting_filter_remove_btn curosor_pointer"><i class="fa fa-remove"></i></span> </div>
            <!-- Submission-->
            <div class="card-body submission_div_form">
                <!-- <form id="searchBarForm"> -->
                <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0 Showfilter_div">
                    <h3 class="text14">Hide Fields:</h3>
                    <hr class="border_design_filtter">
                </div>
                <div class="custom_fields_filter_sec" style="display: none;">
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">
                        <div class="form-check col-md-6 col-lg-6 col-sm-6 col-xs-12  pull-left">
                            <label>
                            <input class="form-check-input toggle-vis inputchecked" data-column="6" type="checkbox" value="" id="defaultCheck3" checked="checked">
                                Effective Date
                            </label>
                        </div>
                        <div class="form-check col-md-6 col-lg-6 col-sm-6 col-xs-12  pull-left">
                            <label>
                            <input class="form-check-input toggle-vis inputchecked" data-column="9" type="checkbox" value="" id="defaultCheck4" checked="checked">
                                Primary Assignee
                            </label>
                        </div>
                    </div>
                </div>

                <div class="archive_custom_fields_filter_sec" style="display: none;">
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">
                        <div class="form-check col-md-6 col-lg-6 col-sm-6 col-xs-12  pull-left">
                            <label>
                            <input class="form-check-input toggle-vis1 inputchecked1" type="checkbox" data-column="7" value="" id="defaultCheck6" checked="checked">
                                Effective Date
                            </label>
                        </div>
                        <div class="form-check col-md-6 col-lg-6 col-sm-6 col-xs-12  pull-left">
                            <label>
                            <input class="form-check-input toggle-vis1 inputchecked1" type="checkbox" data-column="10" value="" id="defaultCheck7" checked="checked">
                                Primary Assignee
                            </label>
                        </div>
                    </div>
                </div>
            <!-- </form> -->
            </div>
            <!-- Account List-->
            <div class="card-body account_div_form">
                <form>
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0 ">
                        <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left p0 account_priority_select_sec" >
                            <label class="col-md-12 col-lg-12 col-sm-12 col-xs-12 pull-left p0">Broker</label>
                            <div class="esub_fill_broker"></div>
                        </div>
                        <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left p14 account_priority_select_sec">
                            <label class="col-md-12 col-lg-12 col-sm-12 col-xs-12 pull-left p0">Underwriter </label>
                            <div class="esub_fill_underwriter"></div>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0 ">
                        <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left p0">
                            <label>Email From</label>
                            <div id="acc_filter_emailform" class="input-group date" data-date-format="dd-mm-yyyy">
                                <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
                                <input class="form-control bg_white" type="text" readonly />
                            </div>
                        </div>
                        <div class="form-group form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left p14">
                            <label>Email To</label>
                            <div id="acc_filter_emailto" class="input-group date" data-date-format="dd-mm-yyyy">
                                <span class="input-group-addon datepicker_icon_design"><i class="fa fa-calendar"></i></span>
                                <input class="form-control bg_white" type="text" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">
                        <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12 pull-left p0 account_priority_select_sec">
                            <label class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0">Flag</label>
                            <select id="multi-select-esubmission-flag" class="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-control pull-left" multiple="multiple">
                                <option value="New" selected>New</option>
                                <option value="Renewal">Renewal</option>
                                <option value="Processing">Processing</option>
                                <option value="Unknown">Unknown</option>
                            </select>
                        </div>

                        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 p0 pull-right">
                            <button type="button" class="btn btn-success btn-sm pull-right submissionfiltersearch"><i class="fa fa-check" aria-hidden="true"></i>    Apply
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!------------Success Popup----------------->

<div class="modal successPopup" data-backdrop="static" data-keyboard="false" id="successPopup">
    <div class="modal-dialog modal-md">
        <div class="modal-content col-md-9 p0">
            <!-- Modal Header -->
            <div class="modal-header bg-success">
                <h4 class="modal-title"> Success </h4>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <p class="text_19_center success_msg"></p>
            </div>
            <div class="modal-footer">
                <button type="reset" class="btn btn-sm bg-success" data-dismiss="modal"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> OK</button>
            </div>
        </div>
    </div>
</div>
<!----------------Error Popup----------------->
<button type="button" class="visibility_hidden error_btn" data-toggle="modal" data-target="#errorPopup"></button>
<div class="modal errorPopup" data-backdrop="static" data-keyboard="false" id="errorPopup">
    <div class="modal-dialog modal-md">
        <div class="modal-content col-md-9 p0">
            <!-- Modal Header -->
            <div class="modal-header bg-danger">
                <h4 class="modal-title"> Error! </h4>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <p class="text_19_center error_msg">Not Found!</p>
            </div>
            <div class="modal-footer">
                <button type="reset" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> OK</button>
            </div>
        </div>
    </div>
</div>
<!----------------Warning Popup----------------->
<button type="button" class="visibility_hidden warning_btn" data-toggle="modal" data-target="#warningPopup"></button>
<div class="modal fade warningPopup" data-backdrop="static" data-keyboard="false" id="warningPopup">
    <div class="modal-dialog modal-md">
        <div class="modal-content col-md-9 p0">
            <!-- Modal Header -->
            <div class="modal-header bg-warning">
                <h5 class="modal-title"> WARNING </h5>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <p class="text_19_center warning_msg">Please Select File To Send Email</p>
            </div>
            <div class="modal-footer">
                <button type="reset" class="btn btn-sm btn-warning" data-dismiss="modal"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> OK</button>
            </div>
        </div>
    </div>
</div>