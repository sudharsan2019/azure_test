<div class="row">
    <div class="col-lg-3 col-md-4 col-sm-12 mb-2 accIndi_tab">
        <div class="card">
            <div class="card-header bg-lightLime"> 
      	        <h6> <i class="fa fa-sliders mr-1"></i> Activities </h6>
            </div>  
            <div class="list-group" id="list-tab" role="tablist">
  	            <a class="list-group-item list-group-item-action accSubnote bindNote bindNote_trigger active sendemail_reset_btn" onclick="getallbind_notes()" id="B-list-notes-list" data-toggle="tab" href="#B-list-notes" role="tab" aria-controls="B-list-notes">
                    <span class="ml-1"> Notes </span>
                </a>
  	            <a class="list-group-item list-group-item-action sendemail_reset_btn" id="B-list-docs-list" onclick="getallbind_docs()" data-toggle="tab" href="#B-list-docs" role="tab" aria-controls="B-list-docs">
                    <span class="ml-1"> Docs </span> 
                </a>
  	            <a class="list-group-item list-group-item-action sendemail_reset_btn" id="B-list-email-list" onclick="getallbind_emails()" data-toggle="tab" href="#B-list-email" role="tab" aria-controls="B-list-email">
                    <span class="ml-1"> Email </span>
                </a>

  	            <a class="list-group-item list-group-item-action accSubMajes hide sendemail_reset_btn" onclick="getallbind_majescourl()" id="B-list-majes-list" data-toggle="tab" href="#B-list-majes" role="tab" aria-controls="B-list-majes">
                    <span class="ml-1"> Majesco Links </span>
                </a>
  		    </div>
        </div>
    </div>

    <!--	tables part		-->
    <div class="col-lg-9 col-md-8 col-sm-12 accIndi_cont">
        <div class="tab-content" id="nav-tabContent">
        
            <button type="button" class="btn btn-sm btn-primary text_uppercase text-right" onclick="$(this).toggleClass('btn-primary');" style="position: absolute;right: 20px;" <?php echo $specific_diable; ?>> <b> Complete Bind </b> </button>

            <!--      Notes part    -->
            <div class="tab-pane fade  active show" id="B-list-notes" role="tabpanel" aria-labelledby="B-list-notes-list">

                <div>
                    <button type="button" class="btn btn-sm bindNoteBtn btn-primary" onclick="resetnoteform()" <?php echo $specific_diable; ?> > New Note </button>
                    <button type="button" class="btn btn-sm newnote_close_btn_bind btn-danger" style="display: none;"> Close </button>
                </div>
                <div class="collapse" id="b_newNote_collapse">
                    <?php 
                      $editorval = "bind_note_editor";
                      $selectcategory = "bind_selectcategory";
                      $colmdval = 'col-lg-4';
                      $datepickerid = 'bind_datepicker';
                      include('newNote.php');
                    ?>
                </div>

                <div class="table-responsive mt-4">
                    <table class="table accIndi_table table-bordered" id="bind_accIndi_table">
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
            <div class="tab-pane fade" id="B-list-docs" role="tabpanel" aria-labelledby="B-list-docs-list">
                <button type="button" class="btn btn-sm btn-primary bind_upload_btn" <?php echo $specific_diable; ?> > Upload Doc </button>
                <button type="button" class="btn btn-sm btn-danger bind_closeupload_btn" style="display: none;"> Close Upload Doc </button>

                <div class="col-md-12 pull-left bindsendEmail_wrap" style="display: none;">
                    <?php 
                      // include ('sendEmail.php'); 
                    ?>
                </div>
                <div class="collapse" id="b_upload_collapse">
                    <?php 
                      $doc_dropzoneval = "dropzone dropzone4";
                      $docselctval = "bind_docselect";
                      $upload_docdragdrop = "upload_dragdrop4";
                      include('uploadDoc.php'); 
                    ?>

                </div>
                <div class="mt-4">
                    <table class="table accIndi_table table-bordered" id="bind_dragdrop_table">
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
            <div class="tab-pane fade" id="B-list-email" role="tabpanel" aria-labelledby="B-list-email-list">
                <button type="button" class="btn btn-sm btn-primary bind_email_btn" <?php echo $specific_diable; ?> > Upload Email </button>
                <button type="button" class="btn btn-sm btn-danger bind_closeemail_btn" style="display: none;"> Close Upload Email </button>
                <div class="collapse" id="b_upload_collapse_e">
                    <?php 
                      $email_dropzoneval = "dropzone dropzone5";
                      $docselctval = "bind_emailselect";
                      $upload_emaildragdrop= "upload_dragdrop5";
                      include('uploadEmail.php'); 
                    ?>
                </div>

                <div class="table-responsive mt-4">
                    <table class="table table-bordered accIndi_table" id="bind_emailtable">
                        <thead class="bg-light">
                            <tr>
                                <th scope="col" style="width: 5%">#</th>
                                <th scope="col" style="width: 98px; display: table;border:unset;">Date</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
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

            <div class="tab-pane fade" id="B-list-sendemail" role="tabpanel" aria-labelledby="B-list-sendemail-list">
                <br>  
                <br>
                <div class="table-responsive mt-4">
                    <table class="table table-bordered accIndi_table" id="bind_sendemailtable">
                        <thead class="bg-light">
                            <tr>
                                <th scope="col" style="width: 5%">#</th>
                                <th scope="col" style="width: 95px;display: table; border: unset;">Date</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
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

            <!--      Majesco part      -->
            <div class="tab-pane fade" id="B-list-majes" role="tabpanel" aria-labelledby="B-list-majes-list">
                <div class="row majescourldiv pt40">
                    <div class="col-10">
                        <input type="text" name="url" class="form-control urlval" placeholder="Enter URL">
                    </div>
                    <div class="col-2 mt-1">
                        <button class="btn btn-sm btn-primary checkurl" data-category="bind" <?php echo $specific_diable; ?> >Add</button>
                    </div>
                </div>
                <div class="errmsg_url"></div>

                <div class="table-responsive mt-2">
                    <table class="table table-bordered" id="bind_majexcourl">
                        <thead class="bg-light">
                            <tr >
                                <th scope="col" style="width: 10%">#</th>
                                <th scope="col" style="width: 80%">Links</th>
                                <th scope="col" style="width: 10%"> </th>
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
