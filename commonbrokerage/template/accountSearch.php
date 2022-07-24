<!-- -----------------cssTemplate-------------- -->
<button type="button" class="btn btn-primary dupeCheckModal" data-toggle="modal" data-target="#dupeCheckModal">
   Open modal
</button>
<!-- The Modal -->
<div class="modal" id="dupeCheckModal">
<div class="modal-dialog">
   <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
         <h4 class="modal-title">
         Dupe Check
      </div>
      <!-- Modal body -->
      <div class="modal-body">
         <div class="row bg_white">
            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-4">
               <p class="pl20 ">Account Search</p>
               <div class="col-md-12">
                  <div class="input-group">
                     <span class="input-group-prepend">
                     <button type="button" class="btn btn-primary"><i class="fa fa-search"></i> </button>
                     </span>
                     <input type="text" id="input1-group2" name="input1-group2" class="form-control" placeholder="Username">
                  </div>
               </div>
               <div class="form-group row pl15">
                  <div class="col-md-9 col-form-label pl15">
                     <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inline-checkbox1" value="check1">
                        <label class="form-check-label" for="inline-checkbox1"></label>
                     </div>
                     <label class="col-md-3 col-form-label check_left">Duplicate</label>                
                  </div>
               </div>
            </div>
         </div>
         <!-- Modal footer -->
         <div class="modal-footer">
            <button type="submit" class="btn btn-sm btn-primary"><i class="fa fa-dot-circle-o"></i> Submit</button>
            <button type="reset" class="btn btn-sm btn-danger"><i class="fa fa-ban"></i> Cancel</button>
            <!-- <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> -->
         </div>
      </div>
   </div>
</div>