<style type="text/css">
    button.multiselect {
        background: #fff !important;
        border: 1px solid #ced4da !important;
    }
</style>

<form id="accountdetailsform" method="post">
    <div class="row">
        <div class="col-md-6 col-lg-3 col-sm-6">
            <div class="form-group ac_tname_frmgrp">
                <label>Account Name <span class="color_red">*</span></label>                
                <input type="text" autocomplete="off" class="form-control" id="ac_tname" name="ac_name">       
            </div>
        </div>
        <div class="col-md-6 col-lg-2 col-sm-6">
            <div class="form-group ac_lob_frmgrp lob_multiselect">
                <label> LOB <span class="color_red">*</span></label> <br>             
                <select class="form-control ac_lob" id="singleselect"  name="ac_lob">
                    <option value="">  Please Select </option>
                    <option value="GL" class="lobGl" > GL </option>
                    <option value="DBD" > DBD </option>
                    <option value="IM" > IM </option>
                    <option value="Crime" > Crime </option>
                    <option value="PrimaryProperty" > Primary Property </option>
                    <option value="XSLiability" > XS Liability </option>
                    <option value="XSProperty" > XS Property </option>
                </select>       
            </div>
        </div>
       
        <div class="col-md-6 col-lg-2 col-sm-6">
            <div class="form-group business_unit_frmgrp">
                <label>Business Unit <span class="color_red">*</span></label>                
                <select class="form-control" id="business_unit" name="business_unit">
                    <option value="">  Please Select </option>
                    <option value="brokerage" selected="selected"> Brokerage </option>
                </select>         
            </div>
        </div>

        <div class="col-md-6 col-lg-2 col-sm-6">
            <div class="form-group ac_tstatus_frmgrp">
                <label>Account Status <span class="color_red">*</span> </label> 
                <select class="form-control" id="ac_tstatus" name="ac_status">
                    <option value="submission" selected> Submission </option>
                    <option value="indication"> Indication </option>
                    <option value="quote"> Quote </option>
                    <option value="bind"> Bind </option>
                    <option value="issue"> Issue </option>
                    <option value="decline"> Decline </option>
                    <option value="inreview"> In Review </option>
                    <option value="cancel"> Cancel </option>
                </select>         
            </div>
        </div>  
        <div class="col-md-6 col-lg-3 col-sm-6">
            <span class="pull-right log_btn_design"><button class="btn btn-primary btn-sm primary_log_btn_design text_bold" type="button"><i class="fa fa-history" aria-hidden="true"></i> Primary Assignee Log</button></span>               
            <div class="form-group ac_tpass_frmgrp">
                <label>Primary Assignee <span class="color_red">*</span> </label> 
                <div class="bind_primary_assignee">
                    <select class="form-control" id="ac_tpass" name="ac_tpass"><option value=" "> Please Select</option><option value="22"> Antoinette Sacchi</option><option value="4"> Ashley Ward</option><option value="13"> Christopher Austin</option><option value="5"> David O'Keeffe</option><option value="7"> Ed McCormack</option><option value="20"> Edward Pray</option><option value="9"> Heather Radillo</option><option value="10"> heather radillo</option><option value="21"> Jo Ann Peri</option><option value="16"> JOHN  LANDRY</option><option value="18"> Marc Adler</option><option value="14"> Michelle Goldman</option><option value="6"> Nasser Ghazi</option><option value="8"> Nasser Ghazi</option><option value="11"> Pam  Quilici</option><option value="19"> Peter Gorin</option><option value="15"> Ryan McCormack</option><option value="17"> Terrence Villar</option><option value="1"> test1</option><option value="2"> test2</option><option value="3"> test3</option><option value="12"> Valerie  Martin</option></select>
              </div> 
          </div>
          <div class="form-group plog">
            <div class="card mb-3 primary_log_details_section" style="display: none;">
              <div class="card-header primary_log_details_header_section primary_log_details_header_section_design">Primary Assignee Log <span class="pull-right primary_log_details_remove_btn primary_log_details_remove_btn_design "><i class="fa fa-remove"></i></span></div>
              <div class="card-body padding_11 primary_log_bind"> </div>
            </div> 
        </div>
        </div>
    </div> 
    <div class="row">
        <div class="col-md-6 col-lg-3 col-sm-6">
            <div class="form-group brokerageDba_frmgrp">
                <label> DBA </label>
                <input type="text" autocomplete="off" name="brokerageDba" id="brokerageDba" class="form-control brokerageDba">
            </div>
        </div>
        <div class="col-md-6 col-lg-2 col-sm-6">
            <div class="form-group ac_mailAdd_zip_frmgrp">
                <label id="acZipId"> Zip </label>
                <input type="text" name="ac_mailAdd_zip" id="ac_mailAdd_zip" maxlength="5" class="form-control ac_mailAdd_zip" autocomplete="data-off" onkeydown="return (event.keyCode!=13);">
                <span id="ac_mailAdd_zip_err_msg" class="text-danger" style="display:none">Invalid</span>
            </div>
        </div>
        <div class="col-md-6 col-lg-2 col-sm-6">
            <div class="form-group ac_mailAdd_state_frmgrp">
                <label> State </label>
                <span id="accState_row">
                    <input type="text" name="ac_mailAdd_state" id="ac_mailAdd_state" class="form-control city_name_hide1 bg-white" readonly>
                </span>
            </div>
        </div>
        <div class="col-md-6 col-lg-2 col-sm-6">
            <div class="form-group ac_mailAdd_city_frmgrp">
                <label> City </label>
                <span id="accCity_row">
                    <select class="form-control city_name_hide1" id="ac_mailAdd_city" name="ac_mailAdd_city">
                        <option value=""></option>
                    </select>
                </span>
            </div>
        </div>
        <div class="col-md-6 col-lg-3 col-sm-6">
            <div class="form-group ac_mailAdd_frmgrp">
                <label> Address </label>
                <input type="text" autocomplete="off" name="ac_mailAdd" id="ac_mailAdd" class="form-control" onkeydown="return (event.keyCode!=13);">
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6 col-lg-3 col-sm-6">
            <div class="form-group bind_brokers_frmgrp">
                <label>Broker <span class="color_red">*</span></label>                
                <div class="bind_brokers"></div>
            </div>
        </div>

         <div class="col-md-6 col-lg-2 col-sm-6">
            <div class="form-group insuredType_frmgrp">
                <label> Insured Type </label>
                <select  class="form-control width98_perc insuredType ml-0" id="insuredType" name="insuredType">
                    <option value=""> Please Select </option>
                    <option value="Association">Association</option>
                    <option value="Common Ownership">Common Ownership</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Religious Organization">Religious Organization</option>
                    <option value="Trust">Trust</option>
                    <option value="Trust or Estate">Trust or Estate</option>
                    <option value="Executor or Trustee">Executor or Trustee</option>
                    <option value="Government Entity">Government Entity</option>
                    <option value="Individual">Individual</option>
                    <option value="Joint Employees">Joint Employees</option>
                    <option value="Joint Venture">Joint Venture</option>
                    <option value="Labor Union">Labor Union</option>
                    <option value="Limited Liability Company (LLC)">Limited Liability Company (LLC)</option>
                    <option value="Limited Liability Partnership">Limited Liability Partnership</option>
                    <option value="Limited Partnership">Limited Partnership</option>
                    <option value="Multiple Status">Multiple Status</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div> 

        <div class="col-md-6 col-lg-3 col-sm-6 insuredtype_other_div" style="display:none;">
            <div class="form-group">
                <label> Insured Type - Other </label>
                <input type="text" name="insuredType_Other" id="insuredType_Other" class="form-control insuredType_Other" placeholder="Insured Type - Other" maxlength="100">
            </div>
        </div>
    
        <div class="col-md-6 col-lg-2 col-sm-6">
            <div class="form-group businessDescription_frmgrp">
                <label> Business Description </label>
                <input type="text" autocomplete="off" name="businessDescription" id="businessDescription" class="form-control businessDescription">
            </div>
        </div>

        <div class="col-md-6 col-lg-2 col-sm-6">
            <div class="form-group business_segment_frmgrp">
                <label>Business Segment</label>                
                <select class="form-control" id="business_segment" name="business_segment">
                    <option value=""> Please Select </option>
                    <option value="glprimary"> Brokerage GL Primary </option>
                    <option value="excess"> Brokerage Excess </option>
                    <option value="propertyprimary"> Brokerage Property Primary </option>
                    <option value="deductbuy"> Brokerage Property Deductible Buydown </option>
                    <option value="habcappro"> Brokerage Property Habcap Program </option>
                    <option value="propertyexcess"> Brokerage Property Excess </option>
                    <option value="pgiagl"> PGIA-GL </option>
                    <option value="pgiaexcess"> PGIA - Excess </option>
                    <option value="nyconst"> NY Construction </option>
                </select>         
            </div> 
        </div>

        <div class="col-md-6 col-lg-3 col-sm-6">
            <div class="form-group njTransaction_frmgrp">
                <label> NJ Transaction # </label>
                <input type="text" autocomplete="off" name="njTransaction" id="njTransaction" maxlength="5" class="form-control njTransaction">
          </div>
        </div>

        <div class="col-md-6 col-lg-3 col-sm-6 has_program" style="display:none;">
            <div class="form-group">
                <label> Policy Number </label>
                <input type="text" autocomplete="off" name="policyNumber" id="pg_policyNumber" maxlength="25" class="form-control pg_policyNumber">
          </div>
        </div>

        <div class="col-md-2 col-lg-2 col-sm-6 has_program" style="display:none;">
            <div class="form-group accdatePick">
                <label for="effect_dt"> Effective Date </label>
                <input autocomplete="off" class="form-control bg_white effect_dt expire_dtone" type="text" id="effect_dt" placeholder="TBD" autocomplete="data-off" name="effect_dt" readonly />
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6 has_program" style="display:none;">
            <div class="form-group accdatePick">
                <label for="expire_dt"> Expiration Date </label>
                <input autocomplete="off" class="form-control bg_white expire_dt expire_dtone" type="text" id="expire_dt" placeholder="TBD" autocomplete="data-off" name="expire_dt" readonly />
               
            </div>
        </div> 
       
    </div>

    <div class="pull-left width100_perc">

    <?php 

        $specific_person_hideshow = array('asic.underwriter1@gmail.com');

            if (in_array($_SESSION['userid'], $specific_person_hideshow)) {
        
        } else  {
    ?>

            <div class="mr-0 pull-left accDetSection">
                <input type="hidden" name="hiddencountval" class="alert_hiddenval">
                <button type="submit" class="btn btn-md btn-primary submitBtn1 rqbiClickFuncOn" onclick="alert_hiddenval()" id="submit_btn1" data-toggle="modal" data-target="#saveAlert" <?php echo $specific_diable; ?> >

                <i class="fa fa-plus" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Create </em>"></i> Create
                </button> 
                
            </div>
            <div class="alert bg-danger pt-1 pb-1 pl-3 pr-3 inactive_assignee_alert" style="display:none!important;">
                Inactive user is selected in Primary Assignee. Kindly update
            </div>
            <div class="alert bg-danger pt-1 pb-1 pl-3 pr-3 invalid_brok_alert" style="display:none!important;">
                Please Select Broker
            </div>
           
    <?php
        }
    ?>

                <span class="archivebindval qid" style="display: none;"></span>
             <div class="col-md-2 pull-right">
            <div class="col-md-12 pl-0 pb-2"> </div>
                <div class="col-md-12 p-0 nenewAction bg-secondary shadow-sm">
                    <div class="d-flex px-2 py-2 accActions">
                        <div> <b> Actions </b> </div>
                        <div class="ml-3">
                            <span <?php echo $specific_diable_style; ?> class="mr-2 curosor_pointer" data-toggle="modal" data-target="#LostPop"><i class="fa fa-thumbs-down text-warning" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Lost </em>"></i> </span>
                            <span <?php echo $specific_diable_style; ?> class="mr-2 curosor_pointer"  data-toggle="modal" data-target="#cancelPop"><i class="fa fa-remove text-danger" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Cancel </em>"></i> </span>
                            <span <?php echo $specific_diable_style; ?> class="mr-2 curosor_pointer" data-toggle="modal" data-target="#declinePop"><i class="fa fa-ban text-primary" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Decline </em>"></i> </span>
                            <span <?php echo $specific_diable_style; ?> class="mr-2 curosor_pointer delete_btn_icon"><i class="fa fa-trash text-danger" data-toggle="tooltip" data-html="true" data-placement="bottom" title="" data-original-title="<em> Delete </em>"></i> </span>
                        </div>
                        <input type="hidden" name="hidden_id" id="hidden_id">
                    </div>
                </div>
            </div>
        </div>
    </form>
        
<script type="text/javascript">
    var xl_lob_change = false;
    $(document).on('click','#submit_btn1',function(){
            $('#accountdetailsform').bootstrapValidator({
                message: 'This value is not valid',
                feedbackIcons: {
                    invalid: 'fa fa-times',
                    validating: 'glyphicon glyphicon-refresh'
                },
                excluded: ':disabled',
                fields: {      
                    ac_name: {
                        validators: {
                        notEmpty: {
                              message: 'Required'
                        },
                       
                        stringLength: {
                             min: 2,
                             max: 600,
                             message: 'Must be 2-600 characters long'
                        }
                    }
                },
          
                ac_tbroker: {
                    validators: {
                        notEmpty: {
                            message: 'Required'
                        }
                    }
                },  

                ac_tpass: {
                    validators: {
                            notEmpty: {
                            message: 'Required'
                        }
                    }
                },

                ac_lob: {
                    validators: {
                            notEmpty: {
                            message: 'Required'
                        }
                    }
                },

                ac_status:{
                  validators: {
                        notEmpty: {
                            message: 'Required'
                        }
                    }
                },

                business_unit:{
                  validators: {
                        notEmpty: {
                            message: 'Required'
                        }
                    }
                },
                
                ac_mailAdd:{
                  validators: {
                        notEmpty: {
                            enabled: false
                        }
                    }
                },

                ac_mailAdd_city:{
                    validators: {
                            notEmpty: {
                            enabled: false
                        }
                    }
                },

                ac_mailAdd_state:{
                    validators: {
                        notEmpty: {
                            enabled: false
                        }
                    }
                },

                business_segment:{
                    validators: {
                        notEmpty: {
                            enabled: false
                        }
                    }
                },

                effect_dt:{
                    validators: {
                        notEmpty: {
                            enabled: false
                        }
                      
                    }
                },

                expire_dt:{
                    validators: {
                            notEmpty: {
                                enabled: false
                            }
                        }
                    }      
                },

                onSuccess:function(e){
                    var accnt_id = $('.session_hide_tab').find('.active').find('.accountid').val();
                    var quote_status = get_account_status(accnt_id);
                    var update_acct = 0;
                    if(quote_status == 'new' || quote_status == 'quote' || quote_status == 'bind'){
                        var qot_status = 1;
                    }else{
                        var qot_status = 0;
                    }
                    if(qot_status ==1){
                        var user_status = check_primary_asignee(0);
                        if(user_status){
                            update_acct = 1;
                        }else{
                            update_acct = 0;
                        }
                    }else{
                        update_acct = 1;
                    }
                    if(update_acct == 1){
                        $('.submitBtn1').attr('disabled',true);  
            
                        e.preventDefault();

                        var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
                        var ac_tname = $('#ac_tname').val();
                        var multiselect = $('#singleselect').val();  

                        var ac_tbroker = $('#ac_tbroker').val();
                        var ac_tbroker_name = $('#ac_tbroker option:selected').text();

                        var business_unit = $('#business_unit').val();
                        var brokerageDba = $('#brokerageDba').val();

                        var businessDescription = $('#businessDescription').val();
                        var njTransaction = $('#njTransaction').val();
                        var insuredType = $('#insuredType').val();

                        var insuredType_Other = $('#insuredType_Other').val();

                        var ac_tpass = $('#ac_tpass').val();
                        var ac_tpass_name = $('#ac_tpass option:selected').text();

                        var ac_ttype = $('#ac_ttype').val();
                        var ac_tstatus = $('#ac_tstatus').val();

                        var effect_dt = $('#effect_dt').val();
                        var expire_dt = $('#expire_dt').val();
                        var ac_mailAdd = $('#ac_mailAdd').val();
                        var ac_mailAdd_zip = $('#ac_mailAdd_zip').val();
                        var ac_mailAdd_city = $('#ac_mailAdd_city').val();
                        var ac_mailAdd_state = $('#ac_mailAdd_state').val();
                        var business_segment = $('#business_segment').val();            

                        var ac_tsass = '';
                        var ac_tsass_name = '';
                        var ac_tpri = '';
                        var ac_tipre = '';
                        var ac_tqpre = '';
                    
                        var new_emailid = localStorage.getItem("new_emailid");
                        var old_emailid = $('#accountid_0').val();

                        var monthyearval = $('.session_hide_tab').find('.active').find('.bind_monthyear').data('monthyearval');

                        var program_policy_number = $('#pg_policyNumber').val();

                        var userid = localStorage.getItem('usernumericid');

                        if(ac_mailAdd_zip.length == 5 || ac_mailAdd_zip.length == "") {
                            $.ajax({
                                type:"POST",
                                cache: false,
                                url: laravel_url+"/save_account_info",
                                data:{  
                                    accountid:accountid, 
                                    ac_tname:ac_tname, 
                                    multiselect:multiselect, 
                                    ac_tbroker:ac_tbroker, 
                                    ac_tbroker_name:ac_tbroker_name, 
                                    business_unit:business_unit,
                                    ac_tpass:ac_tpass, 
                                    ac_tpass_name:ac_tpass_name, 
                                    ac_ttype:ac_ttype,
                                    brokerageDba : brokerageDba,
                                    businessDescription : businessDescription,
                                    njTransaction : njTransaction,
                                    insuredType : insuredType,
                                    insuredType_Other : insuredType_Other,
                                    ac_tstatus:ac_tstatus, 
                                    effect_dt:effect_dt,
                                    expire_dt:expire_dt,
                                    ac_mailAdd:ac_mailAdd,
                                    ac_mailAdd_zip:ac_mailAdd_zip,
                                    ac_mailAdd_city:ac_mailAdd_city,
                                    ac_mailAdd_state:ac_mailAdd_state,
                                    business_segment:business_segment,
                                    new_emailid:new_emailid, 
                                    old_emailid:old_emailid,
                                    monthyearval:monthyearval,
                                    ac_tsass:ac_tsass, 
                                    ac_tsass_name:ac_tsass_name,
                                    ac_tpri:ac_tpri, 
                                    ac_tipre:ac_tipre, 
                                    ac_tqpre:ac_tqpre,
                                    program_policy_number:program_policy_number,
                                    userid:userid
                                },

                                success:function(response){

                                    var obj = jQuery.parseJSON( response );

                                    if(obj.message == 'Successfully Created') {
                                        $('#effective_from').val('');
                                    }

                                    if (obj.dbaBasedContinueFullQuote == 'yes') {
                                        
                                            $('#cbContinueFullquote').removeClass('accordDisabled');
                                    }
                                    program = obj.program;
                                    if (obj.status == 'ok') {
                                        if ($('#singleselect').val()=='XSLiability') {
                                            xl_lob_change = true;
                                        } else {
                                            xl_lob_change = false;
                                        }
                                        
                                        $('#ac_tbroker').removeClass('errorBorder');
                                        new PNotify({ title:'', text: obj.message, delay: 1000, type: 'success' });
                                        resetlocalstorage();
                                        getspecificaccount(obj.getaccid);
                                        accounttablelist();
                                        $('#sub_number').text(obj.submission_number);

                                        $('.session_hide_tab').find('.active').parent().attr('onclick','getspecificaccount('+obj.getaccid+')');
                                        $('.session_hide_tab').find('.active').parent().addClass('ac_mainTabs_loader');

                                    } else{
                                        new PNotify({ title: 'Error',text: obj.message, delay: 1000,type: 'error'});
                                    }
                                    if (program == 1) {
                                        var display_status =  $('#pills-rqbi-tab').css('display');
                                        if (display_status == 'block')
                                            $('#pills-rqbi-tab').css('display','none');
                                        $('#submissionpdf').css('pointer-events','unset');
                                        $('.backdrop_div').removeAttr('style');
                                        $('.backdrop_div').removeClass('backdrop_account');
                                        $('.freezee_bg_div').removeClass('freezee_bg');
                                        $('.need_aacount_title').addClass('display_none');
                                    }
                                    
                                },

                                complete: function (){
                                    retrive_coverage_primary_state();
                                    menu_permission();
                                }
                            });
                        } else {
                            $('#ac_mailAdd_zip').addClass('errorBorder');
                            $('#ac_mailAdd_zip_err_msg').show();
                            $('#acZipId').addClass('text-danger');
                        }
                    } else{
                        e.preventDefault();
                    }
                }
                    
            }).on('status.field.bv', function(e, data) {
                if (data.bv.getSubmitButton()) {
                    data.bv.disableSubmitButtons(false);
                }
            });
        });

        $(document).on('keydown','.exposure_money',function()
            {
                console.log("exposure key code "+event.keyCode)
                // Allow only backspace and delete
                if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 ) {
                    // let it happen, don't do anything
                }
                else {
                    // Ensure that it is a number and stop the keypress
                if (event.keyCode >= 48  && event.keyCode <= 57 ) {

                }
                else if (event.keyCode >= 96  && event.keyCode <= 105)
                {

                }
                else if(event.keyCode == 75 || event.keyCode == 77 || event.keyCode == 66 || event.keyCode == 84)
                {

                }
                else
                {
                   event.preventDefault();
                }
            }
        });

        var clicks = 0;
        function alert_hiddenval(){
          clicks += 1;
          $('.alert_hiddenval').val('');
          $('.alert_hiddenval').val(clicks);
        }

        $(document).on('click','.accHistroy',function(){
            $('.accHistroyDiv').toggleClass('d-block');
        })

    </script>
