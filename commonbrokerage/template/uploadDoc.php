<div class="p-1 mt-2 dragdropcontainers mb-2">
    <h4 class="text14">Click here to drag-drop </h4>
    <div class="drag_and_draw_design dropzone dropzone0 ">
    </div>
    <div> <small><b><span class="color_red">*</span> Maximum 50 Files are allowed to upload. </b> </small> </div>
    <div class="dragdrop_errormsg"></div>
    <div class="form-row clearfix mt-4">
        <div class="col-md-4">
            <div class="form-group">
                <label for="docselect">Main Category <span class="text-danger"> * </span></label>
                <div class="bind_maincategory"></div>
                <div class="bind_maincategory_new form-row py-1"></div>
            </div>
        </div>

        <div class="col-auto bind_subcategory_div" style="display: none;">
            <div class="form-group">
                <div class="bind_subcategory"></div>
                <div class="bind_subcategory_new form-row py-1"></div>
            </div>
        </div>
        
        <div class="col-md-4">
            <div class="form-group">
                <label for="upFileName"> File Name </label>
                <input type="text" name="upFileName" class="form-control upFileName" id="upFileName" placeholder="file name" maxlength="30">
            </div>
        </div>
    </div>

    <div class="form-row mt-2">
        <div class="col-auto d-flex mr-2">
            <div class="form-group mr-1">
                <label for="colorPickText"> Tag Name </label>
                <input type="text" name="colorPickText" class="form-control colorPickText border" id="colorPickText" placeholder="Tag Name" maxlength="30">
            </div>
        
            <div class="form-group mt-4">
                <div class="color-wrapper mt-2">
                    <div class="color-holder call-picker form-control colorPick rounded" id="colorPick">
                        <span class="colorEmptyDiv"> <i class="fa fa-times fa-lg"></i> </span>
                    </div>
                    <div class="color-picker" id="color-picker" style="display: none"></div>
                </div>
            </div>
        </div>

        <div class="col-md-6 mt-4">
            <div class="form-group mt-3">
                <div class="form-check form-check-inline">
                    <input class="form-check-input upNo" type="checkbox" id="upNo" name="noMedia" value="noMedia">
                    <label class="form-check-label" for="upNo"> No media </label>
                </div> 
            </div>
        </div>
    </div>

    <div class="d-flex mt-4">
        <button type="button" class="btn btn-primary btn-sm mr-2 shadow-lg uploadBtn upload_dragdrop0">
            <span><i class="fa fa-upload" aria-hidden="true"></i> Upload </span> 
        </button>
        <button type="reset" class="btn btn-sm btn-danger uploadCancelBtn shadow-lg">
            <span><i class="fa fa-ban" aria-hidden="true"></i> Cancel </span>   
        </button>
    </div>
</div>
