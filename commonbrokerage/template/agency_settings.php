<?php
include('../../brok-wbui/views/header.php');
include('cssTemplate.php');
?>
<div class="row">
  <div class="col-md-12 add_new_agency_section">
    <div class="pull-left width100_perc agency_brok_tab">
        <div class="col-md-12 pr-0">
            <div class="tab" role="tabpanel">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active agencyBrokTab"><a href="#agencyTab" aria-controls="agency" role="tab" data-toggle="tab"><i class="fa fa-building"></i>Agency</a></li>
                    <li role="presentation" class="agencyBrokTab"><a href="#brokerTab" aria-controls="broker" role="tab" data-toggle="tab"><i class="fa fa-user"></i>Broker</a></li>
                    <li class="new_addagencybtn_pos"><button type="button" class="btn btn-primary btn-sm pull-right new_addagency"><i class="fa fa-plus"></i> Add Agency </button></li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content tabs">
                  <div role="tabpanel" class="tab-pane fade in active show" id="agencyTab">
                      <table class="table table-bordered text-center no-footer" id="agency_table">
                        <thead class="font_13 bg_lavender">
                          <tr role="row">
                            <th>Agency Name</th>
                            <th>Agency Code</th>
                            <th>Zip</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Address</th>
                            <th>Program</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody class='agency_tbody text-left'>
                          
                        </tbody>
                      </table>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="brokerTab">
                      <table class="table table-bordered table-sm" id="broker_table">
                        <thead class="bg_lavender">
                          <tr>
                            <th scope="col" class="text-left">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Underwriter</th>
                            <th scope="col">Broker Effective Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody class='brokers_tbody'>
                         
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>

  <!--Add Agency Form-->
  <div class="col-md-12 addAgencySec mt-3" style="display: none;">
    <div class="pull-left width100_perc addAgencyInnerDiv">
      <h3 class="mt-0 brokumheader"> <span class="agent_title">Add Agency</span> <span class="pull-right"><i class="fa fa-remove pull-right cursor_pointer close_add_agency_btn"></i></span></h3>
      <input type="text" class="form-control agency_rid" id="agency_rid" style="display: none;">
      <input type="text" class="form-control commission_rid" id="commission_rid" style="display: none;">
      <div class="container-fluid p-2 mb-0 bg-white">
        <div class="card table-responsive border0">
          <div class="card-body">
            <div class="col-md-3 form-group pull-left">
              <label for="agencyName">Agency Name <span class="color_red">*</span></label>
              <input type="text" class="form-control agencyName" name="agencyName" id="agencyName" placeholder="Agency Name">
            </div>
            <div class="col-md-3 form-group pull-left">
              <label for="agencyCode">Agency Code <span class="color_red">*</span></label>
              <input type="text" class="form-control agencyCode" name="agencyCode" id="agencyCode" placeholder="Agency Code">
            </div>
            <div class="col-md-3 form-group pull-left">
              <label for="agencyZip">Zip <span class="color_red">*</span></label>
              <input type="text" class="form-control agencyZip" name="agencyZip" id="agencyZip" placeholder="Zip Code">
            </div>
            <div class="col-md-3 form-group pull-left">
              <label for="agencyCity">City <span class="color_red">*</span></label>
              <select class="form-control agencyCity" name="agencyCity" id="agencyCity">
                <option value=''>City</option>
              </select>
            </div>
            <div class="col-md-3 form-group pull-left">
              <label for="agencyState">State</label>
              <input type="text" class="form-control agencyState bg-white" name="agencyState" id="agencyState" placeholder="State" readonly>
            </div>
            <div class="col-md-3 form-group pull-left">
              <div class="form-group">
                <label for="agencyAddr">Address <span class="color_red">*</span></label>
                <textarea class="form-control" id="agencyAddr" rows="3"></textarea>
              </div>
            </div>

            <div class="col-md-3 form-group pull-left agenBrokerSelect_div">
              <label> Broker <span class="color_red">*</span></label>
              <a href="#" class="pull-right add_brokers mt-1">Add New</a>
              <select class="form-control agenBrokerSelect" id="agenBrokerSelect" multiple="multiple" name="agenBrokerSelect">
              </select>
            </div>

            <div class="col-md-3 form-group pull-left agent_status_div" style="display:none;">
              <div class="form-group">
                <label for="agencystatus">Status <span class="color_red">*</span></label>
                <select class="form-control agentStatus" id="agentStatus" name="AgentStatus">
                  <option value=''>Please Select</option>
                  <option value='1' selected>Active</option>
                  <option value='0'>Inactive</option>
                </select>
              </div>
            </div>

            <div class="col-md-3 form-group pull-left programDiv">
              <div class="custom-control custom-checkbox program_checkbox">
                <input type="checkbox" class="custom-control-input" id="programCkbx" name="programCkbx">
                <label class="custom-control-label" for="programCkbx">Program</label>
              </div>
            </div>

            <!--Commissions Table-->
            <div class="col-md-12 agen_commision_histroy_table pull-left">
              <div class="col-md-7 p-0 pull-left commission_div">
                <h5>Commissions</h5>
                <table class="table table-bordered table-sm">
                  <thead class="bg_lavender">
                    <tr>
                      <th scope="col" class="text-left width8_perc">LOB</th>
                      <th scope="col" class="width22_perc">Percentage <span class="color_red">*</span></th>
                      <th scope="col" class="width32_perc">Effective Date <span class="color_red">*</span></th>
                      <th scope="col" class="width15_perc">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">GL</th>
                      <td class="text-center">
                        <div class="input-group mb-1 mt-1 percn_input_div_1">
                          <input type="text" class="form-control percn_input percn_input_1 gl_percentage" value="17.5" placeholder="Percentage" aria-label="Percentage" aria-describedby="basic-addon2" maxlength="6">
                          <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">%</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="input-group mb-1 mt-1 agen_effe_dte_1 agen_date_disabled">
                          <input class="form-control datepicker commission_datepicker gl_eff_date" data-date-format="mm-dd-yyyy" readonly>
                        </div>
                      </td>
                      <td class="text-center">
                        <span class="mr-1 cursor_pointer">
                          <i class="fa fa-history text-danger hist_lists" data-coverage="1"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">XL</th>
                      <td class="text-center">
                        <div class="input-group mb-1 mt-1 percn_input_div_2">
                          <input type="text" class="form-control percn_input percn_input_2 xl_percentage" value="17.5" placeholder="Percentage" aria-label="Percentage" aria-describedby="basic-addon2" maxlength="6">
                          <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">%</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="input-group mb-1 mt-1 agen_effe_dte_2 agen_date_disabled">
                          <input class="form-control datepicker commission_datepicker xl_eff_date" data-date-format="mm-dd-yyyy" readonly>
                        </div>
                      </td>
                      <td class="text-center">
                        <span class="mr-1 cursor_pointer">
                          <i class="fa fa-history text-danger hist_lists" data-coverage="2"></i>
                        </span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">OCP</th>
                      <td class="text-center">
                        <div class="input-group mb-1 mt-1 percn_input_div_3">
                          <input type="text" class="form-control percn_input percn_input_3 ocp_percentage" value="17.5" placeholder="Percentage" aria-label="Percentage" aria-describedby="basic-addon2" maxlength="6">
                          <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">%</span>
                          </div>
                        </div>
                      <td>
                        <div class="input-group mb-1 mt-1 agen_effe_dte_3 agen_date_disabled">
                          <input class="form-control datepicker commission_datepicker ocp_eff_date" data-date-format="mm-dd-yyyy" readonly>
                        </div>
                      </td>
                      <td class="text-center">
                        <span class="mr-1 cursor_pointer">
                          <i class="fa fa-history text-danger hist_lists" data-coverage="3"></i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>


              <div class="col-md-5 pull-left hist_div" style="display: none;">
                <h5>History <span class="agen_hist_close pull-right">
                    <i class="fa fa-remove pull-right cursor_pointer"></i>
                  </span>
                </h5>
                <div class="col-md-12 p-0 pull-left hist_scroll">
                  <table class="table table-bordered table-sm mb-0 hist_table">
                    <thead class="bg_lavender">
                      <tr>
                        <th scope="col" class="text-left">Changed By</th>
                        <th scope="col">Date Changed</th>
                        <th scope="col">Changed Field</th>
                        <th scope="col">Changed From</th>
                        <th scope="col">Changed To</th>
                      </tr>
                    </thead>
                    <tbody class='list_hist_tbody'>
                      
                      
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="col-md-12 form-group pull-left pl-0 text-right">
                <button class="btn btn-primary btn-sm save_new_agency save_agency" style="display:initial;">
                  <i class="fa fa-floppy-o" aria-hidden="true"></i> Save
                </button>
                <button class="btn btn-primary btn-sm save_new_agency update_agency" style="display:none;">
                  <i class="fa fa-floppy-o" aria-hidden="true"></i> Update
                </button>
                <button class="btn btn-danger btn-sm discard_agency">
                  <i class="fa fa-ban" aria-hidden="true"></i> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Broker Form -->
  <div class="col-md-12 edit_broker_div mt-3" style="display: none;">
    <div class="pull-left width100_perc">
      <h3 class="mt-0 brokumheader"> <span class="editbrok_title">EDIT BROKER</span> <span class="pull-right"><i class="fa fa-remove pull-right cursor_pointer edit_broker_close"></i></span></h3>
      <input type="text" class="form-control broker_rid" id="broker_rid" style="display: none;">
      <div class="container-fluid p-2 mb-0 bg-white">
        <div class="card table-responsive border0">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3 form-group pull-left">
                <label for="edit_brok_name">Name <span class="color_red">*</span></label>
                <input type="text" class="form-control edit_brok_name" name="edit_brok_name" id="edit_brok_name" placeholder="Name">
              </div>
              <div class="col-md-3 form-group pull-left">
                <label for="edit_brok_email">Email <span class="color_red">*</span></label>
                <input type="email" class="form-control edit_brok_email" name="edit_brok_email" id="edit_brok_email" placeholder="Email">
                <small class="pull-left invalid_broker_msg" id="invalid_broker_msg" style="display:none;color:red;">Already exists</small>
                <small class="pull-left brok_invalid_email_edit" style="display:none;color:red;">Invalid Email</small>

              </div>
              <div class="col-md-3 form-group pull-left">
                <label for="edit_brok_underwriter">Underwriter</label>
                <select class="form-control edit_brok_underwriter" name="edit_brok_underwriter" id="edit_brok_underwriter">
                </select>
              </div>
              <div class="col-md-3 form-group pull-left">
                <label for="edit_brok_eff_date">Effective Date <span class="color_red">*</span></label>
                <div class="input-group agen_effe_dte_2 agen_date_disabled">
                  <input class="form-control datepicker edit_brok_eff_date" data-date-format="mm-dd-yyyy">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 form-group pull-left">
                <label for="broker_status">Status <span class="color_red">*</span></label>
                <select class="form-control broker_status" name="broker_status" id="broker_status">
                  <option value=''>Please Select</option>
                  <option value='1'>Active</option>
                  <option value='0'>Inactive</option>
                </select>
                <div class="col-md-12 form-group pull-left inactive_date_div p-0" style="display:none;">
                  <small class="mr-2">
                    <span class="inactive_lable">Inactivated Date : </span>
                    <span class="fitalic" id="brok_inactive_date"></span>
                  </small>
                </div>
              </div>
            </div>
            
            <div class="col-md-12 form-group pull-left pl-0 text-right">
              <button type="button" class="btn btn-sm bg-primary text-white save_new_brok">
                <i class="fa fa-save" aria-hidden="true"></i> Update </button>
              <button type="button" class="btn btn-sm bg-danger text-white cancel_new_brok">
                <i class="fa fa-close" aria-hidden="true"></i> Cancel </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<button type="button" class="visibility_hidden new_brok_modal" data-toggle="modal" data-target="#new_brok_modal"></button>
<div class="modal fade new_brok_modal1" data-backdrop="static" data-keyboard="false" id="new_brok_modal">
  <div class="modal-dialog modal-md" style="max-width: 900px;">
    <div class="modal-content col-md-12 p-0">
      <!-- Modal Header -->
      <div class="modal-header bg-primary p-1">
        <h5 class="modal-title broker_title"> Add New Broker </h5>
        <button type="button" class="close add_broker_close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="modal-body">
        <div class="col-md-3 form-group pull-left">
          <label for="addnew_brok_name">Name <span class="color_red">*</span></label>
          <input type="text" class="form-control addnew_brok_name" name="addnew_brok_name" id="addnew_brok_name" placeholder="Name">
        </div>
        <div class="col-md-3 form-group pull-left">
          <label for="addnew_brok_email">Email <span class="color_red">*</span></label>
          <input type="email" class="form-control addnew_brok_email" name="addnew_brok_email" id="addnew_brok_email" placeholder="Email">
          <small class="pull-left" id="invalid_broker_msg" style="display:none;color:red;">Already exists</small>
          <small class="pull-left adnew_brok_invalid_email" style="display:none;color:red;">Invalid Email</small>
        </div>
        <div class="col-md-3 form-group pull-left">
          <label for="addnew_brok_underwriter">Underwriter</label>
          <select class="form-control addnew_brok_underwriter" name="addnew_brok_underwriter" id="addnew_brok_underwriter">
          </select>
        </div>
        <div class="col-md-3 form-group pull-left">
          <label for="addnew_brok_effec_date">Effective Date <span class="color_red">*</span></label>
          <div class="input-group agen_effe_dte_2 agen_date_disabled">
            <input class="form-control datepicker brok_eff_date" data-date-format="mm-dd-yyyy">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm bg-primary text-white save_new_brok">
          <i class="fa fa-save" aria-hidden="true"></i> Save </button>
        <button type="button" class="btn btn-sm bg-danger text-white cancel_new_brok">
          <i class="fa fa-close" aria-hidden="true"></i> Cancel </button>
      </div>
    </div>
  </div>
</div>

<?php
    // include("../views/footer.php");
    include('../../brok-wbui/views/footer.php'); 
    include('jsTemplate.php'); 
?>

