<div class="row">
	<!--		side bar	-->
    <div class="col-lg-3 col-md-4 col-sm-12 mb-2 accIndi_tab">
        <div class="card">
            <div class="card-header bg-lightLime"> <h6> <i class="fa fa-sliders mr-1"></i> Activities </h6> </div>
            <div class="list-group" id="list-tab" role="tablist">
                <a class="list-group-item list-group-item-action accSubsum accSubsum_trigger active sendemail_reset_btn" id="list-sum-list" onclick="getallindication_summary()" data-toggle="tab" href="#list-sum" role="tab" aria-controls="list-sum">
                 <span class="ml-1"> Summary </span></a>
                <a class="list-group-item list-group-item-action accSubnote indi_notes sendemail_reset_btn" onclick="getallindication_notes()" id="list-notes-list" data-toggle="tab" href="#list-notes" role="tab" aria-controls="list-notes">
                <span class="ml-1"> Notes </span></a>
                <a class="list-group-item list-group-item-action" id="list-docs-list sendemail_reset_btn" onclick="getallindication_docs()" data-toggle="tab" href="#list-docs" role="tab" aria-controls="list-docs"> 
                <span class="ml-1">Docs </span></a>
                <a class="list-group-item list-group-item-action sendemail_reset_btn" id="list-email-list" data-toggle="tab" onclick="getallindication_emails()" href="#list-email" role="tab" aria-controls="list-email"> 
                <span class="ml-1"> Email </span></a>
            </div>
		</div>
    </div>

    <!-- 		tables part		-->
    <div class="col-lg-9 col-md-8 col-sm-12 accIndi_cont">
        <div class="tab-content" id="nav-tabContent">

            <button type="button" class="btn btn-sm btn-primary text_uppercase text-right" onclick="$(this).toggleClass('btn-primary');" style="position: absolute;right: 20px;" <?php echo $specific_diable; ?>> <b> Complete Indication </b> </button>

            <div class="tab-pane fade active show" id="list-sum" role="tabpanel" aria-labelledby="list-sum-list">
                <div class="table-responsive pt50">
                    <table class="table table-bordered accIndi_table111" id="summarydatatable">
                        <thead class="bg_lavender">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Quote #</th>                
                                <th scope="col">Indicative Premium</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--      Notes part    -->
            <div class="tab-pane fade" id="list-notes" role="tabpanel" aria-labelledby="list-notes-list">
                <button type="button" class="btn btn-sm indication_newnote_btn btn-primary" <?php echo $specific_diable; ?> onclick="resetnoteform()"> New Note </button>

                <button type="button" class="btn btn-sm btn-danger indication_newnote_close_btn" style="display: none;"> Close </button>
       
                <div class="collapse" id="newNote_collapse">
                    <?php 
                    $editorval = "indication_note_editor";
                    $selectcategory = "indication_selectcategory";
                    $colmdval = 'col-lg-4';
                    $datepickerid = 'indication_datepicker';
                    include('newNote.php'); ?>
                </div>

                <div class="table-responsive mt-4">
                    <table class="table notes_accIndi_table table-bordered" id="notes_accIndi_table">
                        <thead class="bg-light">
                            <tr>
                                <th scope="col" style="width: 5%">#</th>
                                <th scope="col" style="width: 15%">Date</th>
                                <th scope="col" style="width: 45%">Note</th>
                                <th scope="col" style="width: 25%">By</th>
                                <th scope="col" style="width: 10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <!--      Docs part   -->
            <div class="tab-pane fade" id="list-docs" role="tabpanel" aria-labelledby="list-docs-list">
                <button type="button" class="btn btn-sm btn-primary indi_upload_btn" <?php echo $specific_diable; ?> > Upload Doc </button>
                <button type="button" class="btn btn-sm btn-danger indi_upload_close_btn" style="display: none;"> Close Upload Doc </button>
                <br>
                <div class="col-md-12 pull-left indicatesendEmail_wrap" style="display: none;">
                    <?php 
                        // include ('sendEmail.php'); 
                    ?>
                </div>
                <div class="collapse" id="upload_collapse">
                    <?php 
                        include('uploadDoc.php'); 
                    ?>
                </div>
                <div class="mt-4">
                    <table class="table accIndi_table table-bordered" id="indi_dragdrop_table">
                        <thead class="bg-light">
                            <tr>
                                <th scope="col" class="align-middle width5_perc">#</th>
                                <th scope="col" class="align-middle uploadedon_head">Uploaded On</th>
                                <th scope="col" class="align-middle">File Name</th>
                                <th scope="col" class="align-middle">Name</th>
                                <th scope="col" class="align-middle" style="width: 10%;">Uploaded By</th>
                                <th scope="col" class="align-middle">Type</th>
                                <th scope="col" class="align-middle" style="width: 11%;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

                 
            <!--      Email part   -->
            <div class="tab-pane fade" id="list-email" role="tabpanel" aria-labelledby="list-email-list">
                <button type="button" class="btn btn-sm btn-primary indi_upload_email_btn" <?php echo $specific_diable; ?> > Upload Email </button>
                <button type="button" class="btn btn-sm btn-danger indi_upload_closeemail_btn" style="display: none;"> Close Upload Email </button>
                <div class="collapse" id="upload_collapse_e">
                    <?php 
                        $email_dropzoneval = "dropzone dropzone1";
                        $docselctval = "indi_emailselect";
                        $upload_emaildragdrop= "upload_dragdrop1";
                        include('uploadEmail.php'); 
                    ?>
                </div>
                <div class="mt-4">
                    <table class="table accIndi_table table-bordered" id="indication_emailtable" style="min-width: 140%;">
                        <thead class="bg-light">
                            <tr>
                                <th scope="col" style="width: 5%">#</th>
                                <th scope="col" style="width: 11%">Date</th>
                                <th scope="col" style="width: 14%">From</th>
                                <th scope="col" >To</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Type</th>
                                <th scope="col" style="width: 10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>



            <div class="tab-pane fade" id="list-sendemail" role="tabpanel" aria-labelledby="list-email-list">
                <br>
                <br>
                <div class="collapse" id="upload_collapse_e">
                    <?php 
                        $email_dropzoneval = "dropzone dropzone1";
                        $docselctval = "indi_emailselect";
                        $upload_emaildragdrop= "upload_dragdrop1";
                        include('uploadEmail.php'); 
                    ?>
                </div>
                <div class="mt-4">
                    <table class="table accIndi_table table-bordered" id="indication_sendemailtable">
                        <thead class="bg-light">
                            <tr>
                                <th scope="col" style="width: 5%">#</th>
                                <th scope="col" style="width: 11%">Date</th>
                                <th scope="col" style="width: 14%">From</th>
                                <th scope="col" >To</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Type</th>
                                <th scope="col" style="width: 10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
	    </div>
    </div>
</div>