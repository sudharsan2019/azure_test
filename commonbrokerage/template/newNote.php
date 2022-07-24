<div class="topnotediv">
    <span class="pull-right mb-2 new_notesclosebtn" onclick="getallaccount_notes()"><i class="fa fa-close"></i></span>
    <!-- <p class="text_center brok_note_title"><strong>New Note</strong> </p> -->
    <!-- <form id="newnoteForm" method="POST" class="newnoteForm">          --> 
    <div class="form-row">
        <div class="form-group col ">
            <label for="vat"> Note Name</label>
            <input type="text" autocomplete="off" class="form-control vat new_note_name" name="newNoteName" placeholder="Enter Name" autofocus="true">
        </div>
          
        <?php

            if (isset($selectcategory)) {
                if ($selectcategory == 'account_selectcategory') {
        ?>
            <?php
                }else{
            ?>
                <div class="form-group col <?php //echo $colmdval; ?> search_barr">
                    <label for="postal-code">Category</label><br>
                    <div class="bind_getmain_subcategory"></div>
                </div>
            <?php
                }
            } else {
            ?>
                <div class="form-group col <?php //echo $colmdval; ?> search_barr">
                    <label for="postal-code">Category</label><br>
                    <div class="bind_getmain_subcategory"></div>
                </div>
            <?php
                }
          
            ?>
             
            <div class="form-group col <?php // echo $colmdval; ?>">
                <label for="city">Type</label>
                <input type="text" autocomplete="off" name="type_notes" class="form-control type_notes newNote_val">
            </div>
                 
            <div class="form-group col <?php //echo $colmdval; ?>">
                <label>
                    Date <span class="color_red">*</span>
                </label>
                <div id="notedte" class="input-group date mb-3 notedte" data-date-format="mm-dd-yyyy">
                    <input autocomplete="off" class="form-control bg_white notes_date" type="text" id="notes_date" name="notes_date" onkeydown="return false"/>
                    <span class="input-group-addon"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                </div>
    <!--         <div class="input-group">
                <span class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                </span>
                <input type="date" class="form-control notes_date" max="2100-01-01" id="notes_date" name="notes_date" onkeydown="return false">
            </div> -->

           <!-- <div id="new_note_date_div" class="input-group-prepend date" data-date-format="dd-mm-yyyy">
                    <span class="input-group-prepend">
                    <span class="input-group-text" style="height: 35px;"><i class="fa fa-calendar"></i></span>
                    <input class="form-control bg_white notes_date" type="text" id="notes_date" name="notes_date" readonly="" />
                    </span>  
                    <span class="input-group-addon" style="display: none;"></span>
                    
            </div> -->
        </div>
    </div>
    <div class="form-group">
        <label for="textarea_input">Description <span class="color_red">*</span></label>
        <div id="<?php echo $editorval;?>" class="<?php echo $editorclass;?>">
              <textarea id="textarea_input" name="textarea_input" rows="9" class="form-control ql-editor" placeholder="Content.."></textarea>
        </div>
    </div>
       
    <div class="savenote_div">
        <button type="submit" class="btn btn-sm btn-primary shadow-lg savenotes" data-notebtn="<?php echo $editor_savebtn ?>" id="saveNotes" <?php echo $specific_diable;?> ><i class="fa fa-save mr-1"></i> <i> Save</i></button>
        <button type="reset" class="btn btn-sm btn-danger shadow-lg clearnotes" onclick="resetnoteform()">
        <i class="fa fa-ban mr-1"></i> <i>Clear</i></button>
    </div>
    <div class="text-right updatenote_div" style="display: none;">
        <input type="hidden" class="updatenoteid">
        <button type="submit" class="btn btn-sm btn-primary shadow-lg updatenotes" <?php echo $specific_diable;?>><i class="fa fa-save mr-1"></i> Update</button>
        <button type="reset" class="btn btn-sm btn-danger shadow-lg" onclick="resetnoteform()">
        <i class="fa fa-ban mr-1"></i> Clear</button>
    </div>
     <!-- </form> -->
</div>