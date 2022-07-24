<div class="panel accTop fixed-top py-2 mb-3">
    <div class="d-flex px-4 justify-content-between">
        <div> Account Name <span class="bindacc_nametop user" style="display: none;"></span> </div>
        <div id="sub_text"> Submission # : <b> <span class="" id="sub_number"></span> </b> </div>
    
        <div>
            <ul class="brokeragePolicyStatus breadcrumb"> 
                <li class="st_quote quote_breadcumb_design"><a href="javascript:void(0);">Quote</a></li>
                <li class="st_bind breadcumb_design_alignment_bind"><a href="javascript:void(0);">Bind</a></li>
                <li class="st_issue breadcumb_design_alignment_inforce"><a href="javascript:void(0);">Issue</a></li>
            </ul>
        </div>
        <span class="curosor_pointer close_accountdetails_div" data-toggle="modal" data-target="#notedit_modal"> 
             <i class="fa fa-remove font17" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Close </em>"></i> 
        </span> 
    </div>
</div>

<div class="account_details accout_navbar_top" id="account_details">
    <div class="form_details_div">
        <ul class="nav nav-tabs session_hide_tab acc_tab_list" role="tablist">
            <li class="nav-item ac_mainTabs ac_mainTabs_loader " onclick="getspecificaccount('parent')">
                <a class="nav-link active parentclass" data-toggle="tab" href="#acTab0" role="tab" aria-controls="2019">
                    <span class="bind_monthyear"></span>
                    <input type="hidden" class="form-control accountid" id="accountid_0" value="">
                </a>
            </li>
            <li class="nav-item addTabnav" style="display: none;">
                <a class="nav-link addTab" href="javascript:void(0)" style="width: 50px;">
                    <img src="../img/plus.png" width="100%">
                </a>
            </li>
        </ul>

        <div class="tab-content session_tab_content acMainTab_content">
            <!-- Tab 2 -->
            <div class="tab-pane active width100_perc" id="acTab0" class="acTab0" role="tabpanel">
                <!-- Account Form Page include -->
                <?php $multiselectval = "multiselect"; ?>
                <?php include('../template/accountForm.php'); ?>
                <hr class="pull-left width100_perc">
                <div class="text-right mt-2 xl_importBtns d-none">
                    <button class="btn btn-sm btn-success xl_importGlBtn rounded-lg mr-1"> <i class="fa fa-arrow-down text-white mr-1"></i> Clear import from GL </button>
                    <button class="btn btn-sm btn-info xl_gotoGLBtn rounded-lg"> <i class="fa fa-angle-double-right text-white"></i> Go to GL </button>
                </div>
                <div class="text-right mt-2 gl_goXl d-none">
                    <button class="btn btn-sm btn-warning xl_gotoXLBtn rounded-lg"> <i class="fa fa-angle-double-right"></i> Go to XL </button>    
                </div>

                <div class="backdrop_account backdrop_div pull-left width100_perc" style="display: none;">
                    <h4 class="need_aacount_title" style="left: 31%; top: 4%; color: #9da1a1; margin: -40px 0 0 40%;">Need Account Details</h4>
                     <!-- Email Submission include -->
                    <?php include('../template/accountSubmission.php'); ?>
                </div>
            </div>
        </div>
    </div>
</div>

<button class="visibility_hidden notedit_modal" data-toggle="modal" data-target="#notedit_modal"></button>
<div class="modal fade" id="notedit_modal"  aria-hidden="true" data-backdrop="static" data-keyboard="false" >
    <div class="modal-dialog modal-danger" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Confirm</h4>
            </div>
            <div class="modal-body">
                <p class="are_delete"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-md btn-success close_btn_acdetail" data-dismiss="modal" ><i class="fa fa-check"></i> Yes</button>
                <button type="button" class="btn btn-md btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> No</button>
            </div>
        </div>
      <!-- /.modal-content -->
    </div>
   <!-- /.modal-dialog -->
</div>

<script type="text/javascript">
    $(document).ready(function() {

        setTimeout(function(){ 

            if (localStorage.getItem("renwal_monthyear")) {
                var newrenwal_monthyear = localStorage.getItem("renwal_monthyear");
                var month =  newrenwal_monthyear.split("-");

                if (month[0] == '01') {
                  textmonth = 'Jan';
                }else if (month[0] == '02') {
                  textmonth = 'Feb';
                }else if (month[0] == '03') {
                  textmonth = 'Mar';
                }else if (month[0] == '04') {
                  textmonth = 'Apr';
                }else if (month[0] == '05') {
                  textmonth = 'May';
                }else if (month[0] == '06') {
                  textmonth = 'Jun';
                }else if (month[0] == '07') {
                  textmonth = 'Jul';
                }else if (month[0] == '08') {
                  textmonth = 'Aug';
                }else if (month[0] == '09') {
                  textmonth = 'Sep';
                }else if (month[0] == '10') {
                  textmonth = 'Oct';
                }else if (month[0] == '11') {
                  textmonth = 'Nov';
                }else{
                  textmonth = 'Dec';
                }

            var newrenwal_monthyear_text = textmonth+'-'+month[1];

            $('.session_hide_tab').find('.active').find('.bind_monthyear').text(newrenwal_monthyear_text);
            $('.session_hide_tab').find('.active').find('.bind_monthyear').attr('data-monthyearval',newrenwal_monthyear);
        }
    }, 1000);

   var loaded = false;
      
  setTimeout(function(){ 
        $('input[name="tomailid"]').amsifySuggestags();
        $('input[name="ccmailid"]').amsifySuggestags();

        $(document).on('keyup','.tomailid .amsify-suggestags-input',function(){
        var inputval = $('.tomailid .amsify-suggestags-input').val();

        if (inputval.includes(".com") || inputval.includes(".in") || inputval.includes(".net") || inputval.includes(".us") || inputval.includes(".org") || inputval.includes(".io") || inputval.includes(".co.uk") || inputval.includes(".gov")) {
          var e = jQuery.Event("keyup");
          e.which = 13; // Enter
          $(".tomailid .amsify-suggestags-input").trigger(e);
        }
    });

    $(document).on('keyup','.ccmailid .amsify-suggestags-input',function(){
        var inputval = $('.ccmailid .amsify-suggestags-input').val();
            if (inputval.includes(".com") || inputval.includes(".in") || inputval.includes(".net") || inputval.includes(".us") || inputval.includes(".org") || inputval.includes(".io") || inputval.includes(".co.uk") || inputval.includes(".gov")) {
              var e = jQuery.Event("keyup");
              e.which = 13; // Enter
              $(".ccmailid .amsify-suggestags-input").trigger(e);
            }

        });
      }, 2000);
});

</script>