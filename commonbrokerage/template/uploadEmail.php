
<div class="p-2 mt-2 dragdropcontainers">

  <div class="dragdrop_errormsg"></div>
  
              <h4 class="text14">Click here to drag-drop </h4>
                <div class="drag_and_draw_design <?php echo $email_dropzoneval; ?> ">
                      <!-- <p><b> Drag and Drop your <span class="text-primary"> Emails </span> here </b></p> -->
                </div>
                  <div> <small><b>
                      <span class="color_red">*</span> Maximum size of the file(s) should be 
                      <span class="color_red">30MB</span> </b> </small> </div>
                 <!-- <form> -->
                  <!-- <div class="d-flex d-flex-row"> -->
                  <div class="form-row mt-4">
                    <!-- <div class="col-sm-12 col-md-6 col-lg-4 form-group" style="display: none;">
                          <label for="upEmail_name"> Name </label>                
                          <input type="text dragname" class="form-control" id="upEmail_name" name="upEmail_name" value="sampleEmail">    </div> -->
                        <div class="col-sm-12 col-md-6 col-lg-4 form-group">
                          <label for="upEmail_type"> Type </label>                
                            <input type="text" class="form-control dragtype" id="upEmail_type" name="upEmail_type">       
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-4 form-group">
                           <label for="postal-code">Category</label>
                        <select id="postal-code" name="postal-code" class="<?php echo $docselctval; ?> form-control dragdropcategory">
                            <!-- <option value=" " >Please select</option> -->
                            <option value="submission">Submission</option>
                            <!-- <option value="account">Account</option> -->
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
                        <div class="col-sm-12 col-md-6 col-lg-4 mt-1 form-group">
                             <button type="button" class="btn btn-primary btn-sm <?php echo $upload_emaildragdrop; ?> mt-4">
                              <span><i class="fa fa-upload" aria-hidden="true"></i> Upload </span> 
                           </button>
                        </div>
                  </div>

                 <!--  <div class="text-right mt-1">
                    
          </div> -->

</div>