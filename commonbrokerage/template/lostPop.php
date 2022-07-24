
<div class="modal LostPop" data-backdrop="static" data-keyboard="false" id="LostPop">
   <div class="modal-dialog modal-lg">
      <div class="modal-content col-md-9 p0">
         <!-- Modal Header -->
         <div class="modal-header">
            <h4 class="modal-title"> Lost </h4>
         </div>
         <!-- Modal body -->
         <div class="modal-body">
            <p>Are you sure to lost?</p>
            <p> Reason </p>
            <select class="form-control">
               <option value="capacity">Capacity</option>
               <option value="company rating"> Company Rating </option>
               <option value="price"> Price </option>
               <option value="terms"> Terms </option>
               <option value="unknown"> Unknown </option>
            </select>
         </div>
         <!-- Modal footer -->
         <div class="modal-footer">
            <button type="submit" class="btn btn-sm btn-primary lostSubmit"><i class="fa fa-dot-circle-o"></i> Submit</button>
            <button type="reset" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
            <!-- <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> -->
         </div>
      </div>
   </div>
</div>
</div>
<?php
   $footstyle = 'footers';
   include('../../brok-wbui/views/footer.php');
?>