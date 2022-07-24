<?php include('loginMain.php'); ?>
<?php include('cssTemplate.php'); 
   $token= md5(uniqid());
?>

<div class="loader">
   <div class="lds-ripple page_loading_design">
      <div></div>
      <div></div>
   </div>
   <br><span class="pleasewait_text">Please Wait...</span>
</div>

<meta name="csrf-token" content="<?php echo $token; ?>">

<div id="transcroller-body1" class="aos-all">
    <div class="animated fadeIn well account_list_sectiondiv">
        <div class="row accountlist_section_div_hide">
            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 mb-4">
                <div class="aos-item__inner">

                    <?php include ('../template/searchBar.php'); ?>   

                    <div class="tab-content account_list_hide">
                        <div class="tab-pane active" id="home3" role="tabpanel">
                            <table id="accounttable" class="table table-bordered text-center">
                                <thead class="font_13 bg_lavender">
                                    <tr>
                                        <th>#</th>
                                        <th class="width70_px">Created</th>
                                        <th>Account Name</th>
                                        <th>Policy Number</th>
                                        <th>LOB</th>
                                        <th>Broker</th>
                                        <th>Effective Date</th>
                                        <th>Account Status</th>
                                        <th style="width: 7.5%;">Actions</th>
                                        <th>Primary Assignee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <div id="account_list_loader" style="display: none;">
                                <span class="processingSpinner"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> Loading ... </span>
                            </div>
                        </div>

                        <div class="tab-pane" id="profile3" role="tabpanel">
                            <table id="archivetable" class="table table-bordered text-center">
                                <thead class="font_13 bg_lavender">
                                    <tr>
                                        <th>#</th>
                                        <th class="created_head">Created</th>
                                        <th class="archive_head">Archived</th>
                                        <th>Account Name</th>
                                        <th>Policy Number</th>
                                        <th>LOB</th>
                                        <th>Broker</th>
                                        <th>Effective Date</th>
                                        <th>Account Status</th>
                                        <th>Action</th>
                                        <th>Primary Assignee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                        <!-- Restore Pop  -->
                        <button data-toggle="modal" data-target="#restorePopup" class="visibility_hidden restorePopup"></button>
                        <div class="modal fade" id="restorePopup" tabindex="-1" role="dialog" aria-labelledby="restorePopup" aria-hidden="true">
                            <div class="modal-dialog modal-danger" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Confirm</h4>
                                    </div>
                                    <div class="modal-body">
                                        <p class="restorePopup_text"> </p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-md btn-success" data-dismiss="modal"><i class="fa fa-check"></i> Yes</button>
                                        <button type="button" class="btn btn-md btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> No</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ----------------------LostPop Modal-----------------         -->
        <div class="modal LostPop" data-backdrop="static" data-keyboard="false" id="LostPop">
            <div class="modal-dialog modal-md">
                <div class="modal-content col-md-9 p0">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title"> Lost </h4>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <p class="text_19_center">Confirm Lost Submission?</p>
                        <p> Reason</p>
                        <select class="form-control" id="lost_selectreason">
                            <option value="Capacity"> Capacity </option>
                            <option value="Company Rating"> Company Rating </option>
                            <option value="Price"> Price </option>
                            <option value="Terms"> Terms </option>
                            <option value="Unknown"> Unknown </option>
                        </select>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button"  data-islostval="1" data-select="lost_selectreason" class="btn btn-sm btn-primary changeaccount_status"><i class="fa fa-dot-circle-o"></i> Submit</button>
                        <button type="reset" class="btn btn-sm btn-danger accountcancel" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ---------------------- cancel Modal------------------->
        <div class="modal" data-backdrop="static" data-keyboard="false" id="cancelPop">
            <div class="modal-dialog modal-md">
                <div class="modal-content col-md-9 p0">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title"> Cancel </h4>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <p class="text_19_center">Confirm cancel?</p>
                        <p> Reason</p>
                        <select class="form-control" id="cancel_selectreason">
                            <option value="Insured Request"> Insured Request </option>
                            <option value="Non Payment"> Non Payment </option>
                            <option value="Out Of Business"> Out Of Business </option>
                            <option value="Underwriting Reasons"> Underwriting Reasons </option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-islostval="3" data-select="cancel_selectreason" class="btn btn-sm btn-primary changeaccount_status"><i class="fa fa-dot-circle-o"></i> Submit</button>
                        <button type="reset" class="btn btn-sm btn-danger accountcancel" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="documentview" tabindex="-1" role="dialog" aria-labelledby="mdheader" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content"> 
                    <div class="modal-header">
                        <h4 class="modal-title mdheader" id="mdheader">PDF</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"> &times; </span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- <iframe src="http://localhost/emailsubmissions/submission/index.php/workitem/ddviewfiles?id=74" id="filesource" frameborder="0" width="100%" height="700px" internalinstanceid="7"></iframe>  -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ----------------------Modal------------------->
        <!-- The Modal -->
        <div class="modal" data-backdrop="static" data-keyboard="false" id="declinePop">
            <div class="modal-dialog modal-md">
                <div class="modal-content col-md-9 p0">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title"> Decline </h4>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <p class="text_19_center">Confirm Decline?</p>
                        <p> Reason </p>
                        <select class="form-control" id="decline_selectreason">
                            <option value="Account Size"> Account Size </option>
                            <option value="Appetite"> Appetite </option>
                            <option value="Class"> Class </option>
                            <option value="Loss History"> Loss History </option>
                            <option value="Pricing"> Pricing </option>
                            <option value="Terms"> Terms </option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" data-islostval="2"  data-select="decline_selectreason" class="btn btn-sm btn-primary changeaccount_status"><i class="fa fa-dot-circle-o"></i> Submit</button>
                        <button type="reset" class="btn btn-sm btn-danger accountcancel" data-dismiss="modal"><i class="fa fa-ban"></i> Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" class="btn btn-danger trigger_todelete" data-toggle="modal" data-target="#tabledeletepopup_modal" style="display: none;">
              Delete modal
        </button>

        <div class="modal fade deletepopup_modal" id="tabledeletepopup_modal"  aria-hidden="true" data-backdrop="static" data-keyboard="false" >
            <div class="modal-dialog modal-danger" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Confirm</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="are_delete">Confirm Delete Account?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-md btn-success accountdelete" data-dismiss="modal" ><i class="fa fa-check"></i> Yes</button>
                        <button type="button" class="btn btn-md btn-danger accountdeletecancel" data-dismiss="modal"><i class="fa fa-remove"></i> No</button>
                       </div>
                </div>
            </div>
        </div>

        <!-- Notes Delete Popup Start -->
        <button type="button" class="btn btn-danger trigger_revoke_todelete" data-toggle="modal" data-target="#account_revokepopup_modal" style="visibility: hidden;"></button>
        <div class="modal fade account_revokepopup_modal" id="account_revokepopup_modal"  aria-hidden="true" data-backdrop="static" data-keyboard="false" >
            <div class="modal-dialog modal-danger" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Confirm</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="text-white">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="notes_are_delete text-center font21">Are you sure to re-open the account?</p>
                    </div>
                    <div class="modal-footer">
                        <input type="hidden" name="hiddenrevokeid" class="hiddenrevokeid">
                        <button type="button" class="btn btn-md btn-success revokeaccount" data-dismiss="modal" ><i class="fa fa-check"></i> Yes</button>
                        <button type="button" class="btn btn-md btn-danger" data-dismiss="modal"><i class="fa fa-remove"></i> No</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Notes Delete Popup End -->

        <div class="accountdetail_div" style="display: none;">
            <?php include('accountDetailsForm.php'); ?>
        </div>
    </div>
</div>
<!--/.row-->

<?php
   $footstyle = 'footers';
   include('../../brok-wbui/views/footer.php');
?>
<?php include('jsTemplate.php'); ?>

<!-- drap drop js start -->
<script type="text/javascript" src="../js/backendjs/dragdrop/dropzone.js?v=<?php echo microtime(true); ?>"></script>
<script type="text/javascript" src="../js/backendjs/dragdrop/drag_drop_management.js?v=<?php echo microtime(true); ?>"></script>
<!-- drap drop js end -->

<script type="text/javascript" src="../js/backendjs/accountlist_backend.js?v=<?php echo microtime(true); ?>"></script>
<script type="text/javascript" src="../js/backendjs/accountlist_backend_v3.js?v=<?php echo microtime(true); ?>"></script>

<script type="text/javascript"> 
    $(function(){
        $(".loader").fadeOut("slow");
        // $('.ql-formats button').attr('tabindex','-1');
        // var keyboard = editor.getModule('keyboard');
        // delete keyboard.bindings[9];    
    })

    $(window).on('load', function() {
       $('.app-body').addClass('backgroundd_color');
       $('.dataTables_length').hide();
       $(document).find('.account_list_searchbar').css('display','none');
       $(document).find('.searchbar_div').css('display','none');
    });
    $('[data-toggle="tooltip"]').tooltip();  
       
    accounttablelist();
       
    function accounttablelist(){
        $('.account_applybtn').show();
        $('.archive_applybtn').hide();

        var table = $("#accounttable").DataTable({
            "bProcessing": true,
            "responsive": true,
            "serverSide": true,
            "bPaginate": true,
            "bInfo": true,
            "bLengthChange": true,
            "autoWidth": false,
            "order": [[0,"desc"]],  
            "pageLength": 50,
            "destroy": true,
             "language": { "search": '', "searchPlaceholder": "Search..." },
            "ajax":{
                url : laravel_url+"/getallaccounts_info",
                type: "post", 
                error: function(){
                  
                },
                 complete :function(){
                    menu_permission();  
                }
            },
            "columns": [
                
                {  "render": function(data, type, row) {  return '';   }   },
                {
                    "render": function(data, type, row) {
                        return formatedate(row.createdate);
                    }
                },
                {
                    "render": function(data, type, row) {
                        return '<a href="javascript:void(0);" class="getspecificaccount" data-accid="'+row.id+'" >'+row.accountname+'</a>';
                    }
                },
                { "data": "policy_number" },
                { "data": "lob" },
                { "data": "broker_name" },
                {
                    "render": function(data, type, row, full) {

                        if (row.acc_effective_date != null) {
                            return formatedate(row.acc_effective_date);
                        } else {
                            return formatedate(row.rqbi_effective_date);
                        }
                    }
                },
                { "data": "accountstatus" },
                {
                    "render": function(data, type, row) {
                  
                        if (row.is_lost == '1') {
                            return 'Lost | <a href="javascript:void(0);" '+specific_diable_style+' onclick="accountrevoke_popup('+row.id+')" >Restore</a> ';
                        } else if (row.is_lost == '2') {
                            return 'Declined | <a href="javascript:void(0);" '+specific_diable_style+' onclick="accountrevoke_popup('+row.id+')" >Restore</a>';
                        } else if (row.is_lost == '3') {
                            return 'Cancel | <a href="javascript:void(0);" '+specific_diable_style+' onclick="accountrevoke_popup('+row.id+')" >Restore</a>';
                        } else if(row.status == '1') {
                            return 'Deleted | <a href="javascript:void(0);" '+specific_diable_style+' onclick="accountrevoke_popup('+row.id+')" >Restore</a>';  
                        } else {
                            return '<div class="input-group icons ml-1">'+
                            '<span '+specific_diable_style+' class="mr-1 curosor_pointer pull-left front_acc_actions tooltip" data-toggle="modal" data-accid="'+row.id+'" data-target="#LostPop"><i class="fa fa-thumbs-down text-warning"></i><span class="tooltiptext"> Lost</span> </span>'+
                            '<span '+specific_diable_style+' class="mr-1 curosor_pointer pull-left front_acc_actions tooltip" data-toggle="modal" data-accid="'+row.id+'" data-target="#cancelPop"><i class="fa fa-remove text-danger"></i> <span class="tooltiptext"> Cancel</span> </span>'+
                            '<span '+specific_diable_style+' class="mr-1 curosor_pointer pull-left front_acc_actions tooltip" data-toggle="modal" data-accid="'+row.id+'" data-target="#declinePop"><i class="fa fa-ban text-primary"></i> <span class="tooltiptext"> Decline</span> </span>'+
                            '<span '+specific_diable_style+' class="mr-1 pull-left front_acc_actions tooltip" data-accid="'+row.id+'" ><i class="fa fa-trash text-danger delete_btn_icon"  data-toggle="modal" data-target="#tabledeletepopup_modal"></i> <span class="tooltiptext"> Delete</span></span>'+
                            '</div>';
                        }
                    }
                },
                { "data": "primary_assignee_name" }
            ],
        });
        // for table index
        table.on('draw.dt', function () {
            var info = table.page.info();
            table.column(0, { search: 'applied', order: 'applied', page: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + info.start;
            });
        });


        datatable_sifn(table); 

        $(document).find('#accounttable_filter').parent().addClass("datatable_search_design");
        $(document).find('#accounttable_filter').addClass("datatable_search");
        $(document).find('#accounttable_filter').css('display','block');
        $(document).find('.archivetable_btn').hide();
        $(document).find('.accounttable_btn').show();
        $(document).find('.onload_Searchbar').hide();


        $('[data-toggle="tooltip"]').tooltip();
        $(document).find('.datatable_search').append('<div class="input-group-btn col-md-1 pull-right accounttable_btn table_searchbar_design_button_group"><button class="btn btn-primary search_icon_button_design brok_acc_search_btn" data-toggle="tooltip" data-original-title="Search" type="button" data-select2-open="single-append-text"><span class="fa fa-search text-white"></span></button><button class="btn btn-primary brok_filter_btn filter_btn_align show_search_filter_btn hide_submission_btn" type="button" data-toggle="tooltip" data-original-title="Filter" data-select2-open="single-append-text"><span class=""><i class="fa fa-filter text-white" aria-hidden="true"></i></span></button><button type="button" data-toggle="tooltip" data-original-title="Settings" class="btn btn-primary btn-md brok_setting_btn search_setting_btn setting_searchbutton_show"> <span><i class="fa fa-cogs text-white" aria-hidden="true"></i></span></button></div>');

            setTimeout ( function () {
                menu_permission();
                $('#account_list_loader').hide();
            }, 2000);



    }

    
    //// *********** start Hide Acoount List ****************///////////
     	
	var userName = "<?php echo $_SESSION['userid']; ?>";
	var specific_person_hideshow = ["asic.underwriter1@gmail.com"];

	if(jQuery.inArray( userName, specific_person_hideshow )>= 0){
		$('.aos-item__inner').find('ul').css("display","none");
		$('#select2-accounttable_length-fq-container').hide();
		$('#account_list_add_btn').hide();
		$('#accounttable').find('tbody').hide();
		$('.dataTables_info').hide();
		$('#accounttable_paginate').hide();
			
		$('#accounttable_filter').find('input').addClass('controls');
		$(".controls").keyup(function(){  
			var search_val = $('.controls').val(); 
			if(search_val != ''){
         		$('#accounttable_paginate').show();
         		$("#accounttable").find('tbody').show(); 
         		//$("#accounttable").find('tbody tr td:eq(2)').find('a').removeAttr("href").removeClass("getspecificaccount");
         		$("#accounttable").find('tbody tr td:eq(7)').find('span').removeAttr("data-target");
         		$("#accounttable").find('tbody tr td:eq(7)').find('span').find('.delete_btn_icon').removeAttr("data-target");
         		$('.section').hide();
     		}else{
     			$('#accounttable_paginate').hide();
     			$('#accounttable').find('tbody').hide();
     		}
        });  

    		setTimeout(function(){ 
        		/***** diable search btn*********/
        		$('.search_icon_button_design').addClass('disabled');
        		/***** diable Fil btn*********/
        		$('.filter_btn_align').addClass('disabled');
        		$('.filter_btn_align').removeClass('show_search_filter_btn ');
        		$('.search_setting_btn ').addClass('disabled');
        		$('.search_setting_btn').removeClass('setting_searchbutton_show');
    		},1500);
			
		} else{
			
		}
		
    	//// *********** End Hide Acoount List ****************///////////
     
        $(document).on('change','#defaultCheck3',function(){
            var table = $('#accounttable').DataTable(); 
            if(this.checked){
                table.column(6).visible(true);
            } else
            table.column(6).visible(false);
        }); 

        $(document).on('change','#defaultCheck4',function(){
            var table = $('#accounttable').DataTable(); 
            if(this.checked){
                table.column(9).visible(true);
            } else
            table.column(9).visible(false);
        });
       
        // archivetablelist();

        function accountrevoke_popup(accid){
            $('.hiddenrevokeid').val('');
            $('.hiddenrevokeid').val(accid);
            $('.trigger_revoke_todelete').trigger('click');
        }

       function archivetablelist(){
            $('.account_applybtn').hide();
            $('.archive_applybtn').show();

            var table = $('#archivetable').DataTable({
               "bLengthChange": true,
               "bPaginate": true,
               "bInfo": true,
               "autoWidth": false,  
               "order": [[0, "desc"]],
               "processing": true,
       	       "pageLength": 50,
               "serverSide": false,
               "destroy": true,
               "sAjaxSource": laravel_url+"/getallaccounts_archive",
               "columns": [
                    {  "render": function(data, type, row) {  return '';   }    },
                    {
                        "render": function(data, type, row) {
                            return formatedate(row.createdate);
                        }
                    },
                    {
                        "render": function(data, type, row) {
                            return formatedate(row.createdate);
                        }
                    },
                    {
                        "render": function(data, type, row) {
                            return '<a href="javascript:void(0);" class="getspecificaccount" data-accid="'+row.id+'" >'+row.accountname+'</a>';
                        }
                    },
           
                    { "data": "policy_number" },
                    { "data": "lob" },
                    { "data": "broker_name" },
                    {
                        "render": function(data, type, row) {
                            return formatedate(row.acc_effective_date);
                        }
                    },
                    // { "data": "accounttype" },
                    { "data": "accountstatus" },
                    {  
                        "render": function(data, type, row) {  

                            if (row.is_lost == '1') {
                                return 'Lost | <a href="javascript:void(0);" '+specific_diable_style+' onclick="accountrevoke_popup('+row.id+')" >Restore</a> ';
                            } else if (row.is_lost == '2') {
                                return 'Declined | <a href="javascript:void(0);" '+specific_diable_style+' onclick="accountrevoke_popup('+row.id+')" >Restore</a>';
                            } else if (row.is_lost == '3') {
                                return 'Cancel | <a href="javascript:void(0);" '+specific_diable_style+' onclick="accountrevoke_popup('+row.id+')" >Restore</a>';
                            } else{
                                return 'Deleted | <a href="javascript:void(0);" '+specific_diable_style+' onclick="accountrevoke_popup('+row.id+')" >Restore</a>';  
                            }
                        }    
                    },
                { "data": "primary_assignee_name" },
            ]
       
        });   

        datatable_sifn(table); 

        $(document).find('#archivetable_filter').parent().addClass("datatable_search_design");
        $(document).find('#archivetable_filter').addClass("datatable_search");
        $(document).find('#archivetable_filter').css('display','block');
        $(document).find('.archivetable_btn').show();
        $(document).find('.accounttable_btn').hide();
        $(document).find('.onload_Searchbar').hide();

        $('[data-toggle="tooltip"]').tooltip();

        $(document).find('.datatable_search').append('<div class="input-group-btn col-md-1 pull-right archivetable_btn table_searchbar_design_button_group"><button class="btn btn-primary search_icon_button_design brok_acc_search_btn" data-toggle="tooltip" data-original-title="Search" type="button" data-select2-open="single-append-text"><span class="fa fa-search text-white"></span></button><button class="btn btn-primary brok_filter_btn filter_btn_align show_search_filter_btn hide_submission_btn" type="button" data-toggle="tooltip" data-original-title="Filter" data-select2-open="single-append-text"><span class=""><i class="fa fa-filter text-white" aria-hidden="true"></i></span></button><button type="button" class="btn btn-primary btn-md brok_setting_btn search_setting_btn setting_archie_searchbutton_show" data-toggle="tooltip" data-original-title="Settings"> <span><i class="fa fa-cogs text-white" aria-hidden="true"></i></span></button></div>');

        $('.toggle-vis1').on( 'click', function (e) {
            // e.preventDefault();
            if ($(this).hasClass('inputchecked1')) {
                $(this).removeClass('inputchecked1');
                $(this).prop( "checked", false );
            } else{
                $(this).addClass('inputchecked1');
                $(this).prop( "checked", true );
            }

    // Get the column API object
    var column = table.column( $(this).attr('data-column') );
        // Toggle the visibility
            column.visible( ! column.visible() );
        } );
    }

    AOS.init({
        easing: 'ease-in-out-sine'
    });
</script>

