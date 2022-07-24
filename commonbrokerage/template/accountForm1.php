

<?php 
// session_start();
// echo "<pre>";
// print_r($_SESSION);

// exit();
?>


 <style type="text/css">
   button.multiselect {
    background: #fff !important;
    border: 1px solid #eee !important;
  }
 </style>
  <form id="accountdetailsform1" method="post">  
     <div class="row">
      <div class="col-md-3 col-lg-3 col-sm-6">
            <div class="form-group">
              <label>Account Name <span class="color_red">*</span></label>                
                <input type="text" class="form-control" id="ac_tname" name="ac_name">       
                <!-- <input type="hidden" class="form-control accountid" id="accountid" value=""> -->       
                <!-- <input type="hidden" class="form-control" id="tabmonthyear" value="">        -->
            </div>
            <div class="form-group">
              <label>Broker <span class="color_red">*</span></label>                
                <input type="text" class="form-control" id="ac_tbroker" name="ac_tbroker">       
            </div>
<!--             <div class="form-group">
              <label>Effective Date <span class="color_red">*</span></label>
              <div class="input-group">
                <span class="input-group-prepend">
                  <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                </span>
                <input type="date" class="form-control" id="ac_tdate" name="effective_date">
              </div>
            </div>  -->  
            <div class="form-group">
              <label>Business Segment</label>                
                <select class="form-control" id="business_segment" name="business_segment">
                  <option selected value="brokerage"> Brokerage </option>
                  <option value="program"> Program </option>
                  <option value="contract"> Contract </option>
                </select>         
            </div>
      </div>

      <div class="col-md-3 col-lg-3 col-sm-6">
            <div class="form-group lob_multiselect">
              <label>LOB</label>                
                <select class="form-control col-md-12" id="<?php echo $multiselectval; ?>" multiple="multiple" name="ac_lob">
                  <option selected> GL </option>
                  <option> XS </option>
                  <option> IM </option>
                  <option> Crime </option>
                  <option> Property </option>
                </select>       
            </div>
             <div class="form-group">
              <label>Account Type</label>    
                <select class="form-control" id="ac_ttype" name="ac_type">
                  <option value="New"> New </option>
                  <option value="Renewal"> Renewal </option>
                  <!-- <option value="Processing"> Processing </option>
                  <option value="Unknown"> Unknown </option>     -->              
                </select> 
             </div>

            <div class="form-group">
              <label>Account Status</label>                
                <select class="form-control" id="ac_tstatus" name="ac_status">
                  <option selected> Submission </option>
                  <option> Indication </option>
                  <option> Quote </option>
                  <option> Bind </option>
                  <option> Issue </option>
                </select>         
            </div>
      </div>

      <div class="col-md-3 col-lg-3 col-sm-6">
            <div class="form-group">
              <label>Primary Assignee</label>                
                <div class="bind_primary_assignee"></div>  
            </div>
            <div class="form-group">
              <label>Secondary Assignee</label>                
                <div class="bind_secondary_assignee"></div>
            </div>
            <div class="form-group">
              <label>Priority</label>                
                <select class="form-control" id="ac_tpri" name="ac_tpri">
                  <option> Low </option>
                  <option> high </option>
                  <option selected> Medium </option>
                </select>       
            </div>
      </div>


      <div class="col-md-3 col-lg-3 col-sm-6 pull-left">

         <div class="shadow-lg p-3 mb-created_div bg-color-multi rounded">
            <i class="fa fa-calendar bg_pearl_green float-left created_icon_design text-white"></i>
            <h6 class="created_design">Created <span id="acc_crdate"></span></h6>
         </div>
         <div class="form-group">
            <label>Indication Premium</label>                
            <input type="text" class="form-control amountwithcommas" id="ac_tipre" name="ac_tipre" maxlength="11">       
         </div>
         <div class="form-group">
            <label>Quote Premium</label>                
            <input type="text" class="form-control amountwithcommas" id="ac_tqpre" name="ac_tqpre" maxlength="11">       
         </div>
      </div>
      <div class="col-12">
         <button type="submit" class="btn btn-md btn-primary" id="submit_btn2" data-toggle="modal" data-target="#saveAlert">
         <i class="fa fa-plus" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Create </em>"></i> Create
         </button> 
      </div>
   </div>
</form>
