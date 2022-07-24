<div class="row">
	<!--	side bar		-->
    <div class="col-lg-3 col-md-4 col-sm-12 mb-2 accIndi_tab">
        <div class="card">
            <div class="card-header bg-lightLime"> 
                <h6> <i class="fa fa-sliders mr-1"></i> Activities </h6>
            </div>
            <div class="list-group" id="list-tab" role="tablist">
          	    <a class="list-group-item list-group-item-action accSubnote quoteNote quoteNote_trigger active sendemail_reset_btn" onclick="getallquote_notes()" id="Q-list-notes-list" data-toggle="tab" href="#Q-list-notes" role="tab" aria-controls="Q-list-notes">
                  <span class="ml-1"> Notes </span></a>
          	    <a class="list-group-item list-group-item-action sendemail_reset_btn" id="Q-list-docs-list " onclick="getallquote_docs()" data-toggle="tab" href="#Q-list-docs" role="tab" aria-controls="Q-list-docs">
                  <span class="ml-1"> Docs </span></a>
          	    <a class="list-group-item list-group-item-action sendemail_reset_btn" id="Q-list-email-list " onclick="getallquote_emails()" data-toggle="tab" href="#Q-list-email" role="tab" aria-controls="Q-list-email">
                  <span class="ml-1">Email </span></a>

          	    <a class="list-group-item list-group-item-action accSubMajes hide sendemail_reset_btn" id="Q-list-majes-list" onclick="getallquote_majescourl()" data-toggle="tab" href="#Q-list-majes" role="tab" aria-controls="Q-list-majes">
                  <span class="ml-1"> Majesco Links </span></a>
  		    </div>
        </div>
    </div>

    <!--	tables part		-->
    <div class="col-lg-9 col-md-8 col-sm-12 accIndi_cont">
        <div class="tab-content" id="nav-tabContent">
            <button type="button" class="btn btn-sm btn-primary text_uppercase qCompleteBtn text-right" onclick="$(this).toggleClass('btn-primary');" style="position: absolute;right: 20px;" <?php echo $specific_diable; ?>> <b> Complete Quote </b> </button>
            <!--      Notes part    -->
            <div class="tab-pane fade  active show" id="Q-list-notes" role="tabpanel" aria-labelledby="Q-list-notes-list">
                <div>
                    <button type="button" class="btn btn-sm quoteNoteBtn btn-primary" <?php echo $specific_diable; ?>  onclick="resetnoteform()"> New Note </button>
                    <button type="button" class="btn btn-sm closequoteNoteBtn btn-danger" style="display: none;"> Close </button>
                </div>

                <div class="collapse" id="Q_newNote_collapse">
                    <?php 
                        $editorval = "quote_note_editor"; 
                        $selectcategory = "quote_selectcategory";
                        $colmdval = 'col-lg-4';
                        $datepickerid = 'quote_datepicker';
                        include('newNote.php'); 
                    ?>
                </div>
          
                <div class="table-responsive mt-4">
                    <table class="table accIndi_table table-bordered" id="quote_accIndi_table">
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
            <div class="tab-pane fade" id="Q-list-docs" role="tabpanel" aria-labelledby="Q-list-docs-list">
                <button type="button" class="btn btn-sm btn-primary quote_upload_btn" <?php echo $specific_diable; ?> > Upload Doc </button>
                <button type="button" class="btn btn-sm btn-danger quote_closeupload_btn" style="display: none;"> Close Upload Doc </button>

                <div class="col-md-12 pull-left quotesendEmail_wrap" style="display: none;">
                    <?php 
                      // include ('sendEmail.php'); 
                    ?>
                </div>

                <div class="collapse" id="Q_upload_collapse">
                    <?php 
                        $doc_dropzoneval = "dropzone dropzone2";
                        $docselctval = "quote_docselect";
                        $upload_docdragdrop = "upload_dragdrop2";
                        include('uploadDoc.php'); 
                    ?>
                </div>
          
                <div class="mt-4">
                    <table class="table table-bordered accIndi_table"  id="quote_dragdrop_table">
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
            <div class="tab-pane fade" id="Q-list-email" role="tabpanel" aria-labelledby="Q-list-email-list">
                <button type="button" class="btn btn-sm btn-primary quote_email_btn" <?php echo $specific_diable; ?> > Upload Email </button>
                <button type="button" class="btn btn-sm btn-danger quote_closeemail_btn" style="display: none;"> Close Upload Email </button>
                <div class="collapse" id="Q_upload_collapse_e">
                    <?php 
                        $email_dropzoneval = "dropzone dropzone3";
                        $docselctval = "quote_emailselect";
                        $upload_emaildragdrop= "upload_dragdrop3";
                        include('uploadEmail.php'); 
                    ?>
                </div>
                <div class="table-responsive mt-4">
                    <table class="table accIndi_table table-bordered" id="quote_emailtable">
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

            <!--- Send Email Part-->
           <div class="tab-pane fade" id="Q-list-sendemail" role="tabpanel" aria-labelledby="Q-list-sendemail-list">
            <br>
            <br>
                <div class="table-responsive mt-4">
                    <table class="table accIndi_table table-bordered" id="quote_sendemailtable">
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
            <div class="tab-pane fade" id="Q-list-majes" role="tabpanel" aria-labelledby="Q-list-majes-list">
                <div class="row majescourldiv pt40">
                    <div class="col-10">
                        <input type="text" name="url" class="form-control urlval" placeholder="Enter URL">
                    </div>
                    <div class="col-2">
                        <button class="btn btn-sm btn-primary checkurl" data-category="quote" <?php echo $specific_diable; ?> >Add</button>
                    </div>
                </div>
                <div class="errmsg_url"></div>

                <div class="table-responsive mt-2">
                    <table class="table table-bordered" id="quote_majexcourl">
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

<script type="text/javascript">
    $(document).ready(function(){
        $('.testBtn').click(function(){
            $('#select1').trigger('click');
        });
    });
</script>