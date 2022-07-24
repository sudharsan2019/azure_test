<div class="d-block">
    <button class="btn btn-sm btn-danger restoreBtn px-1 py-1 shadow-lg"> Restore</button>
</div>
<div class="form-row archiveFileRow my-2">
    <div class="col-md-3">
        <ul class="list-group archiveList mb-2" id="archiveList" role="tablist">
            <div class="bind_policycategory"></div>
        </ul>
        
    </div>

    <div class="col bg-light mb-2">
        <a href="javascript:;" class="openEditBar pull-right"> <i class="fa fa-bars" data-toggle="tooltip" data-placement="bottom" title="Open Side Bar"></i> </a>
        <div class="tab-content" id="nav-tabContentArch" style="height:100%;">
        <div id='viewerArch' style='width: 100%; height: 100%'></div>
        </div>
        
    </div>
    <div class="col-md-2 pull-right colHide2Arch mb-2" style="display: none;">
        <div class="card">
            <div class="card-header">
                <div class="sideHeader"><div class="bind_sideheader"></div> </div> 
            </div>
            <div class="card-body">
                <div class="sideFilesDiv mb-2" style="display: none">
                    <div class="align-self-start">

                        <input type="hidden" name="filehiddenvalue" class="filehiddenvalue">
                        <a href="javascript:void(0);" class="btn btn-xs btn-info fileReassign" data-toggle="modal" data-target="#fileReassignModal"><i class="fa fa-retweet" data-toggle="tooltip" data-placement="bottom" title="Reassign"></i></a>
                    </div>

                    <div class="mt-4">
                        <input type="text" name="sDocName" class="form-control form-control-sm sDocName my-3 shadow-lg" placeholder="File Name">
                        <input type="text" name="sDocType" class="form-control form-control-sm sDocType my-3 shadow-lg" placeholder="File Type">
                        <div class="form-group my-3 shadow-lg">
                            <div class="input-group input-group-sm date">
                                <input type="text" class="form-control form-control-sm" placeholder="mm/dd/yyyy" class="sDocDateTxt" id="sDocDateTxtArch" aria-invalid="false" disabled="disabled">
                                <div class="input-group-addon bg-primary text-center">
                                    <i class="fa fa-fw fa-calendar mt-2"></i>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex my-3">
                            <span><input type="text" class="form-control form-control-sm sDocTag shadow-lg" id="sDocTagArch" placeholder="Tag Name"></span>
                            <span><input type="color" class="form-control form-control-sm sDocTagClr shadow-lg" id="sDocTagClrArch" value="#FF0000" data-toggle="tooltip" data-placement="bottom" title="color"></span>  
                        </div>

                        <button class="btn btn-xs btn-success savedocumentfilename shadow-lg  mr-1" disabled="disabled"> Update </button>
                        <button class="btn btn-xs btn-danger resetfilevalues shadow-lg" disabled="disabled"> Cancel </button>

                    </div>
                </div>
            </div>

            <div class="card-body">
                <div class="sideNotesDiv mb-2" style="display: none;">
                    <div class="form-group">
                        <label for="sNoteName"> <b> Note Name </b> </label>
                        <input type="text" name="sNoteName" class="form-control form-control-sm sNoteName shadow-lg" placeholder="Note Name">
                    </div>
                    <div class="form-group search_barr policycategorybind">
                        <label for="postal-code"><b>Category</b></label><br>
                        <div class="bind_getmain_subcategory"></div>
                    </div>
                    <div class="form-group">
                        <label for="sNoteType"> <b> Note Type </b></label>
                        <input type="text" name="sNoteType" class="form-control form-control-sm sNoteType shadow-lg" placeholder="Note Type">
                    </div>
                    <div class="input-group input-group-sm date my-3">
                        <div class="input-group-addon bg-light text-center">
                            <i class="fa fa-fw fa-calendar mt-2"></i>
                        </div>
                        <input type="date" class="form-control form-control-sm" placeholder="mm/dd/yyyy" class="sNoteDateTxt" id="sNoteDateTxtArch" aria-invalid="false">
                        
                    </div>
                    <div class="form-group mt-2">
                        <label for="textarea_input"><b>Description</b> <span class="color_red">*</span></label>
                        <div id="sideAdNoteDesArch">
                            <textarea id="textarea_inputArch" name="textarea_input" rows="9" class="form-control ql-editor" placeholder="Content.."></textarea>
                        </div>
                    </div>

                    <button class="btn btn-xs btn-success savedocumentNote shadow-lg mr-1" disabled="disabled"> Update </button>
                    <button class="btn btn-xs btn-danger resetNotevalues shadow-lg" disabled="disabled"> Cancel </button>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    $(document).ready(function(){                 
        restroreBtn();    
    });    
    
    setTimeout(function() {
        $('.restoreBtn, .colHide2Arch').hide();

        $(document).on('change','#archiveList .policyCheck',function(){
            if(this.checked){
                $('.restoreBtn').show('slow');  
                $(this).closest('.card').find('.policyCheck').prop('checked',true);
            }else{
                $(this).closest('.card').find('.policyCheck').prop('checked',false);
            }
            restroreBtn(); 
        });

        $(document).on('click','.archiveFileRow .openEditBar',function(){
            $('.colHide2Arch').toggle('slow');
        });

        $(document).on('click','#archiveList .downTab',function(){
            $(this).next('.card-body').slideToggle();
            $(this).children('i').toggleClass('fa-chevron-down text-warning');
        }); 

        $(document).on('click','#archiveList .poList',function(){
            $('.viewerMaxICon').css('display','none');
            $('.poList').removeClass('active show');
            $(this).addClass('active show');
        });
        restroreBtn();
        $('[data-toggle="tooltip"]').tooltip();
    },10000);
                            
    function restroreBtn(){
        var n = $('.archiveFileRow .policyCheck:checked').length;
        if(n==0){
            $('.restoreBtn').hide('slow');
        } 
    } 
</script>