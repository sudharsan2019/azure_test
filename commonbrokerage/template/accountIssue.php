<div class="row">
	<!--	side bar		-->
    <div class="col-lg-3 col-md-4 col-sm-12 mb-2 accIndi_tab">
        <div class="card">
            <div class="card-header bg-lightLime"> <h6> <i class="fa fa-sliders mr-1"></i> Activities </h6> </div>  
            <div class="list-group" id="list-tab" role="tablist">
  	            <a class="list-group-item list-group-item-action accSubnote issueNote issueNote_trigger active" onclick="getallissue_notes()" id="I-list-notes-list" data-toggle="tab" href="#I-list-notes" role="tab" aria-controls="I-list-notes">
                <span class="ml-1"> Notes </span></a>
  	            <a class="list-group-item list-group-item-action" id="I-list-docs-list" onclick="getallissue_docs()" data-toggle="tab" href="#I-list-docs" role="tab" aria-controls="I-list-docs">
                <span class="ml-1"> Docs </span></a>
  	            <a class="list-group-item list-group-item-action" id="I-list-email-list" onclick="getallissue_emails()" data-toggle="tab" href="#I-list-email" role="tab" aria-controls="I-list-email">
                <span class="ml-1"> Email </span></a>
  	            <a class="list-group-item list-group-item-action accSubMajes hide" onclick="getallissue_majescourl()" id="I-list-majes-list" data-toggle="tab" href="#I-list-majes" role="tab" aria-controls="I-list-majes">
                <span class="ml-1"> Majesco Links </span></a>
  		    </div>
        </div>
    </div>

    <!--	tables part		-->
    <div class="col-lg-9 col-md-8 col-sm-12 accIndi_cont">
        <div class="tab-content" id="nav-tabContent">
            <button type="button" class="btn btn-sm btn-primary text_uppercase text-right" onclick="$(this).toggleClass('btn-primary');" style="position: absolute; right: 20px;" <?php echo $specific_diable; ?>> <b> Complete Issue </b> </button>
            <!--      Notes part    -->
            <div class="tab-pane fade  active show" id="I-list-notes" role="tabpanel" aria-labelledby="I-list-notes-list">
                <div>
                    <button type="button" class="btn btn-sm issueNoteBtn btn-primary" <?php echo $specific_diable; ?>  onclick="resetnoteform()"> New Note </button>
                    <button type="button" class="btn btn-sm close_issueNoteBtn btn-danger" style="display: none;"> Close </button>
                </div>
                <div class="collapse" id="I_newNote_collapse">
                    <?php 
                        $editorval = "issue_note_editor";
                        $selectcategory = "issue_selectcategory";
                        $colmdval = 'col-lg-4';
                        $datepickerid = 'issue_datepicker';
                        include('newNote.php');
                    ?>
                </div>

                <div class="table-responsive mt-4">
                    <table class="table accIndi_table table-bordered" id="issue_accIndi_table">
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
            <div class="tab-pane fade" id="I-list-docs" role="tabpanel" aria-labelledby="I-list-docs-list">
                <button type="button" class="btn btn-sm btn-primary issue_upload_btn" <?php echo $specific_diable; ?> > Upload Doc </button>
                <button type="button" class="btn btn-sm btn-danger issue_closeupload_btn" style="display: none;"> Close Upload Doc </button>

                <div class="col-md-12 pull-left bindsendEmail_wrap" style="display: none;">
                    <?php 
                      // include ('sendEmail.php'); 
                    ?>
                </div>

                <div class="collapse" id="I_upload_collapse">
                    <?php 
                        $doc_dropzoneval = "dropzone dropzone6";
                        $docselctval = "issue_docselect";
                        $upload_docdragdrop = "upload_dragdrop6";
                        include('uploadDoc.php'); 
                    ?>
                </div>

                <div class="mt-4">
                    <table class="table table-bordered accIndi_table" id="issue_dragdrop_table">
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
            <div class="tab-pane fade" id="I-list-email" role="tabpanel" aria-labelledby="I-list-email-list">
                <button type="button" class="btn btn-sm  btn-primary issue_emailupl_btn" <?php echo $specific_diable; ?> > Upload Email </button>
                <button type="button" class="btn btn-sm  btn-danger issue_closeemailupl_btn" style="display: none;"> Close Upload Email </button>
                <div class="collapse" id="I_upload_collapse_e">
                    <?php 
                        $email_dropzoneval = "dropzone dropzone7";
                        $docselctval = "issue_emailselect";
                        $upload_emaildragdrop= "upload_dragdrop7";
                        include('uploadEmail.php'); 
                    ?>
                </div>

                <div class="table-responsive mt-4">
                    <table class="table table-bordered accIndi_table" id="issue_emailtable">
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
            <div class="tab-pane fade" id="I-list-majes" role="tabpanel" aria-labelledby="I-list-majes-list">
                <div class="row majescourldiv pt40">
                    <div class="col-10">
                        <input type="text" name="url" class="form-control urlval" placeholder="Enter URL">
                    </div>

                    <div class="col-2">
                        <button class="btn btn-sm btn-primary checkurl" data-category="issue" <?php echo $specific_diable; ?> >Add</button>
                    </div>
                </div>

                <div class="errmsg_url"></div>

                <div class="table-responsive mt-2">
                    <table class="table table-bordered" id="issue_majexcourl">
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