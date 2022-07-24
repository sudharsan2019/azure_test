<div class="form-row">
    <div class="col-md-3 d-flex">
        <button class="btn btn-sm expandBtn expandHide px-1 py-1 shadow-sm pull-left mr-2"> Expand all </button>
        <div class="downloadBtnDiv"> </div>
        
        <div class="bind_archive_restore mr-auto"></div>
        <a href="javascript:;" class="openCateBar mt-1"> <i class="fa fa-bars fa-lg" data-toggle="tooltip" data-placement="bottom" title="Category List"></i> </a>
    </div>
</div>

<div class="form-row policyFileRow my-2">
    <div class="col-lg-3 col-md-12 cateListDiv mt-2">
        <ul class="list-group mb-2" id="policyList" role="tablist">
            <div class="card cate tagPage mt-1 mb-1">
                <div class="d-flex corresFlex ml-2">
                    <div class="TaggedPagesTxt mt-2 ml-2 mr-auto">
                        <input type="text" class="form-control form-control-sm" value="Tagged Pages" name="" title="Tagged Pages" disabled>   
                    </div>
                    <div class="bind_taggedpage_count mt-1 mr-4"></div>
                </div>

                <a href="javascript:;" class="TaggedPagesTxtTab downTab"> <i class="fa fa-chevron-right"></i> </a>
                <div class="TaggedPagesTabDiv card-body" style="display: none;">
                    <div class="d-flex my-1">
                        <div class="bind_taggedpagelist"></div>
                    </div>
                </div>
            </div>
            <div class="bind_policycategory"></div>

            <!--Underwriting Summary  Information-->
            <div class="card list-group-item poliAddCate mt-3 mb-4 mr-2">
                <select class="cateAddSel form-control shadow-sm">
                    <option> Add New Category / Sub Category </option>
                    <option value="newCate"> <button class="btn btn-block">Create Main Category</button> </option>
                    <option value="newSubCate"> <button class="btn btn-block">Create Sub Category</button> </option>
                </select>
                <div class="newCateDiv p-2 border border-top-success">
                    <input type="text" name="newCateTxt" class="form-control form-control-sm newCateTxt" placeholder="New Main Category">
                    <button class="btn btn-xs btn-light newCateAdd mt-2" onclick="addmain_category()"><i class="fa fa-plus fa-sm mr-1"></i> Add</button>
                </div>

                <div class="newSubCateDiv p-2 border border-top-success">
                    <div class="bind_maincategory_policy"></div>

                    <input type="text" name="newSubCateTxt" class="form-control form-control-sm newSubCateTxt mt-2 mr-2" placeholder="New Sub Category">
                    <div class="btn btn-sm btn-light newSubCateAdd my-2"> Submit </div>
                </div>
            </div>
        </ul>
    </div>

    <div class="col-lg col-md-9 bg-light mb-2">
        <div class="pull-right">
            <a href="javascript:;" class="openEditBar mt-1 mr-2"> <i class="fa fa-bars" data-toggle="tooltip" data-placement="bottom" title="File Details"></i> </a>
            <a href="javascript:;" class="viewerMaxICon mt-1 mr-2" data-toggle="tooltip" data-placement="bottom" title="expand" style="display:none;" target="_blank"> <i class="fa fa-expand" aria-hidden="true"></i> </a>
        </div>
        
        <div class="tab-content p-1" id="nav-tabContent" style="height:100%;">
            <div id='viewer'  style='width: 100%; height: 100%'></div>
        </div>
    </div>

    <div class="col-lg-2 col-md-3 pull-right colHide2 mb-2" style="display: none;">
        <div class="card">
            <div class="card-header">
                <div class="sideHeader"><div class="bind_sideheader"></div> </div> 
            </div>
                <div class="card-body">
                    <div class="sideFilesDiv mb-2" style="display: none">
                        <div class="align-self-start">
                            <input type="hidden" name="filehiddenvalue" class="filehiddenvalue">
                            <input type="hidden" name="filehiddenvalue1" class="filehiddenvalue1">
                            <a href="javascript:void(0);" class="btn btn-xs btn-info fileReassign" data-toggle="modal" data-target="#fileReassignModal"><i class="fa fa-retweet" data-toggle="tooltip" data-placement="bottom" title="Reassign"></i></a>
                        </div>

                        <div class="mt-4">
                            <div class="fileReassignDiv">
                                <input type="text" name="sDocName" class="form-control form-control-sm sDocName my-3 shadow-lg" placeholder="File Name">
                                <input type="text" name="sDocType" class="form-control form-control-sm sDocType my-3 shadow-lg" placeholder="File Type">
                                <div class="form-group my-3 shadow-lg">
                                    <div class="input-group input-group-sm date">
                                        <input type="text" class="form-control form-control-sm" placeholder="mm/dd/yyyy" class="sDocDateTxt" id="sDocDateTxt" aria-invalid="false" disabled="disabled">
                                    </div>
                                </div>

                            <div class="my-3">
                                <input type="text" class="form-control form-control-sm sDocTag shadow-lg" id="sDocTag" placeholder="Tag Name">
                                <div class="color-wrapper my-2">
                                    <div class="color-holder call-picker form-control colorPick sDocTagClr rounded" id="policyColorPick">
                                        <span class="colorEmptyDiv"> <i class="fa fa-times fa-lg"></i> </span>
                                    </div>
                                    <div class="color-picker" id="policyColorPicker" style="display: none"></div>
                                </div><br>
                            </div>

                            <div class="d-block">
                                <button class="btn btn-xs btn-success savedocumentfilename shadow-lg  mr-1" disabled="disabled"> Update </button>
                                <button class="btn btn-xs btn-danger resetfilevalues shadow-lg" disabled="disabled"> Cancel </button>
                                <span class="sideFileDiv_hidden"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <div class="sideNotesDiv mb-2" style="display: none;">
                    <div class="form-group">
                        <label for="sNoteName"> <b> Note Name </b> </label>
                        <input type="text" name="sNoteName" class="form-control form-control-sm sNoteName shadow-lg" placeholder="Note Name">
                        <input type="hidden" name="oldcategval_hidden" class="oldcategval_hidden" >
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
                        <input type="date" class="form-control form-control-sm" placeholder="mm/dd/yyyy" class="sNoteDateTxt" id="sNoteDateTxt" aria-invalid="false">
                    </div>
                      
                    <div class="form-group mt-2">
                        <label for=""><b>Description</b> <span class="color_red">*</span></label>
                        <div id="sideAdNoteDes">
                            <textarea id="" name="textarea_input" rows="9" class="form-control ql-editor" placeholder="Content.."></textarea>
                        </div>
                    </div>

                    <button class="btn btn-xs btn-success savedocumentNote shadow-lg mr-1" disabled="disabled"> Update </button>
                    <button class="btn btn-xs btn-danger resetNotevalues shadow-lg" disabled="disabled"> Cancel </button>
                    <span class="sideNotesDiv_hidden"></span>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Reassign Modal -->
<div class="modal fade" id="fileReassignModal" tabindex="-1" role="dialog" aria-labelledby="fileReassignModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="fileReassignModalLabel">Reassign</h5>
                <a href="javascript:void(0);" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </a>
            </div>
            <div class="modal-body">
                <div class="bind_getmain_subcategory"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary fileReassignSave">Assign</button>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    $(document).ready(function(){    
        $('[data-toggle="tooltip"]').tooltip();   
        $('.newCateAdd').hover(function(){
            $(this).toggleClass('shadow-lg');
        })
        
        $('.newSubCateAdd').hover(function(){
            $(this).toggleClass('shadow-lg');
        });     

        $('.poListName').dblclick(function(){
            $(this).removeAttr('disabled');    
        });   
        
        archiBtn();    
    });    

    $(document).on('click','.TaggedPagesTxt',function(){
        $(this).closest('.card').find('.downTab').click();
    });
    setTimeout(function() {
        $('[data-toggle="tooltip"]').tooltip();
        $('.archiveBtn, .downloadBtn .colHide2').hide();
        $('.newCateDiv, .newSubCateDiv').hide();

        $(document).on('focus','.poListName',function(){
            $(this).closest('a').removeClass('downTabCate');
        });

        $(document).on('focusout','.poListName',function(){
            $(this).attr('disabled',true);
            $(this).closest('a').addClass('downTabCate');
        });

        $(document).on('change','#policyList .policyCheck_down:checkbox',function(){
            if(this.checked){
                $('.downloadBtnDiv').html('');
                $('.downloadBtnDiv').html('<div class="dropdown">                                                                                        <a class="btn btn-sm btn-primary downloadBtn dropdown-toggle px-1 py-1 shadow-sm mr-2" href="javascript:void(0);" role="button" id="downloadDrop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">   Download </a>                                                                                                     <div class="dropdown-menu mt-1 ml-1" aria-labelledby="downloadDrop">                                     <a type="button" class="dropdown-item btn btn-sm btn-outline-primary" href="javascript:void(0);" id="original_dwn">Original</a>                                                                                        <a type="button" class="dropdown-item btn btn-sm btn-outline-primary" href="javascript:void(0);" id="recent_dwn">Recent</a></div> </div>');

                read_onlyuser_v2();

            }
        });
         $(document).on('change','#policyList :checkbox',function(){
            var th = $(this);
            if(this.checked){
                setTimeout(function(){ 
                      var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');
                      if (tabvalue == 'policytabdiv') {
                        $('.bind_archive_restore').html('');
                        $('.bind_archive_restore').html('<div> <button class="btn btn-sm btn-danger archiveBtn px-1 py-1 mr-2 shadow-sm" data-changetab="policy"> Archive</button></div>');
                      }else{

                        $('.bind_archive_restore').html('');
                        $('.bind_archive_restore').html('<div> <button class="btn btn-sm btn-danger archiveBtn px-1 py-1 shadow-sm mr-2" data-changetab="archive"> Restore</button></div>');
                      }

                    read_onlyuser_v2();

                  }, 100);

                if(th.hasClass('corresCheck')){
                    th.closest('.card').find(':checkbox').prop('checked',true);
                }else{
                    var ncTotCh = th.closest('.card').find(':checkbox:checked').length;
                    var ncTot = th.closest('.card').find(':checkbox').length-1;
                    if(ncTot==ncTotCh){
                        th.closest('.card').find('.corresCheck:first').prop('checked',true);
                    }
                }
                var nAllCh = th.closest('.cate').find(':checkbox:checked').length;
                var nAllTot = th.closest('.cate').find(':checkbox').length-1;
                if(nAllTot==nAllCh){
                    th.closest('.cate').find('.corresCheck:first').prop('checked',true);    
                }
            }else{

                th.closest('.card').find(':checkbox:first').prop('checked',false);
                th.closest('.cate').find(':checkbox:first').prop('checked',false);
                if(th.hasClass('corresCheck')){
                     th.closest('.card').find(':checkbox').prop('checked',false);   
                }                                
            }

            archiBtn();

        });
        $(document).on('change','input',function(e){
           $(e.currentTarget).prop("title", $(e.currentTarget).val());
        });
        $(document).on('click','.openEditBar',function(){
            $('.colHide2').toggle('slow');
        });

        $(document).on('click','#policyList .downTab',function(){
            $(this).next('.card-body').slideToggle();
            $(this).children('i').toggleClass('fa-chevron-down text-warning');
        });
        
        var DELAY = 200;
        var clicks = 0;
        var timer = null;

        $(document).on('click', '.downTabCate', function(e) {
            e.preventDefault();
            var n =$(this).closest('.card');
            clicks++;  //count clicks
            if(clicks === 1) {
                timer = setTimeout(function() {
                    n.find('.downTab:first').click();
                    clicks = 0;  //after action performed, reset counter
                }, DELAY);
            } else {
                clearTimeout(timer);  //prevent single-click action
                n.find('.poListName:first').removeAttr('disabled').focus();
                clicks = 0;  //after action performed, reset counter
            }
        })
        .on('dblclick', '.downTabCate', function(e) {
            e.preventDefault();  //cancel system double-click event
        });

                            // Add new Category and sub Category           
        $(document).on('click','.newCate',function(){
            $('.newCateDiv').slideDown('slow');
            $('.newSubCateDiv').slideUp('slow');
        });
        $(document).on('click','.newSubCate',function(){
            $('.newSubCateDiv').slideDown('slow');
            $('.newCateDiv').slideUp('slow');
        });
        $(document).on('change','.cateAddSel',function(){
            var changeCateAdd = this.value;
            if(changeCateAdd=='newCate'){
                $('.newCateDiv').slideDown('slow');
                $('.newSubCateDiv').slideUp();
            }else if(changeCateAdd=='newSubCate'){
                $('.newSubCateDiv').slideDown('slow');
                $('.newCateDiv').slideUp();
                // getmain_subcategory();
                getmaincategory_policy();
            }else
                $('.newCateDiv, .newSubCateDiv').slideUp(); 
        });
        $(document).on('click','#policyList .poList',function(){
            //e.preventDefault();
            $('.viewerMaxICon').css('display','none');
            $('.poList').removeClass('active show');
            $(this).addClass('active show');
            
        });
        $(document).on('click','.expandBtn',function(){
            $(this).html('Collapse all');
            $(this).addClass('collapseBtn').removeClass('expandBtn');
            $('#policyList .card-body').slideDown();
            $('#policyList .downTab i').addClass('fa-chevron-down text-warning');
        });
        $(document).on('click','.collapseBtn',function(){
            $(this).html('Expand all');
            $(this).addClass('expandBtn').removeClass('collapseBtn');
            $('#policyList .card-body').slideUp();
            $('#policyList .downTab i').removeClass('fa-chevron-down text-warning');
        });

        $(document).on('click','.openCateBar',function(){
            $('.cateListDiv').toggle('slow',function(){
                if($(this).is(':hidden')){
                    $('.expandHide, .downloadBtnDiv, .bind_archive_restore').hide();
                    $('.bind_archive_restore').removeClass('mr-auto');
                }else {
                    $('.expandHide, .downloadBtnDiv, .bind_archive_restore').show();
                    $('.bind_archive_restore').addClass('mr-auto');
                }
            });
        })
        archiBtn();
        $('[data-toggle="tooltip"]').tooltip();
        $('.downTabCate').tooltip({position:'bottom'});
    },10000);
                        // Archive Btn fun        
    function archiBtn(){
        var n = $('#policyList :checkbox:checked').length;
        if(n==0){
            $('.archiveBtn').hide('slow');
        } 
        var ndown = $('.policyCheck_down:checked').length;
        if(ndown==0){
            $('.downloadBtn').slideUp('slow');
        }
    }
</script>
