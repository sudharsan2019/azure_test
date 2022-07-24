<div class="row">
    <div class="col-md-12 p0">
        <div class="card mt-4 border-0 p0">
            <div class="card-body p0">
                <div class="col-md-12 p0">
                    <div class="email-app">
                        <main class="message p0">
                            <!--Reply Mail-->
                            <div class="reply_mail col-md-12 p0 pull-left">
                                <div class="animated fadeIn">
                                    <div class="card">
                                        <div class="card-header">
                                            <i class="fa fa-mail-reply (alias)"></i>  Send Mail 
                                            <a href="javascript:void(0);" class="pull-right text-muted sendmail_closebtn">
                                                <i class="fa fa-close"></i>
                                            </a>
                                        </div>
                                        <div class="card-body">
                                            <form id="sendEmailForm1">
                                                <div class="form-row mb-3">
                                                    <label class="col-2 col-form-label">To:</label>
                                                    <div class="col-10">
                                                        <input type="text" class="form-control tomailid" name="tomailid"/>
                                                    </div>
                                                </div>
                                                <div class="form-row mb-3">
                                                    <label class="col-2 col-form-label">CC:</label>
                                                    <div class="col-10">
                                                        <input type="text" class="form-control ccmailid" name="ccmailid" value="<?php echo $_SESSION['userid']; ?>" />
                                                    </div>
                                                </div>
                                                <div class="form-row mb-3">
                                                    <label class="col-2 col-form-label">Subject :</label>
                                                    <div class="col-10">
                                                        <input type="text" class="form-control emailsubject" name="emailsubject"  />
                                                    </div>
                                                </div>
                                            </form>
                                            <!-- Editor -->
                                            <div id="editor">  </div>
                                            <div class="form-group">
                                                <button type="button" class="btn btn-success btn-sm pdfsubmissionmail" id=""><i class="fa fa-send (alias)"></i> Send Mail</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--Reply Mail End-->
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>