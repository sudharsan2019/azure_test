<div class="accordion mt-4 uglAccor" id="uglAccor_0" data-accord_no="0" data-rid="" data-retrieved="0">
	<div class="card">
		<div class="card-header ugl_head" id="ugl_head_0" data-toggle="collapse" data-target="#ugl_collapse_0" aria-expanded="true" aria-controls="ugl_collapse_0" onclick="uglAccorOpen($(this));">  General Liability </div>
		<div id="ugl_collapse_0" class="collapse show" aria-lebelledy="ugl_head_0" data-parent="#uglAccor_0">
			<div class="card-body">
				<div class="form-group row mt-2">
					<label class="col-auto mr-2"> Policy Type <span class="redStar"> * </span> </label>
					<div class="col-auto">
						<div class="custom-control custom-radio custom-control-inline">
							<input type="radio" class="custom-control-input ugl_typeOcc ugl_policy_type" id="ugl_typeOcc_0" name="uglType_0" value="0" checked>
							<label class="custom-control-label" for="ugl_typeOcc_0"> Occurrence </label>
						</div>
						<div class="custom-control custom-radio custom-control-inline">
							<input type="radio" class="custom-control-input ugl_typeClaim ugl_policy_type" id="ugl_typeClaim_0" name="uglType_0" value="1">
							<label class="custom-control-label" for="ugl_typeClaim_0"> Claims Made </label>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-3">
						<label> Policy Number </label>
						<input type="text" name="" class="form-control form-control-sm ugl_policyNo" id="ugl_policyNo_0">
					</div>
					<div class="form-group col-md-3">
						<label> Company </label>
						<input type="text" name="" class="form-control form-control-sm ugl_company" id="ugl_company_0">
					</div>
					<div class="form-group col-md-3">
						<label> Effective Date </label>
						<div class="input-group input-group-sm date ugl_effectDt ugl_effectDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="ugl_effectDt_0" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
					<div class="form-group col-md-3">
						<label> Expiration Date </label>
						<div class="input-group input-group-sm date ugl_expDt ugl_expDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="ugl_expDt_0" placeholder="mm-dd-yyyy" aria-invalid="false" data-change_expdate='1' autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-3">
						<label> Ategrity General Liability Premium <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm agl_premium xl_number" id="agl_premium_0" maxlength="19" placeholder="Ategrity General Liability Premium"></div>
						</div>
					</div>
					<div class="form-group col-auto"> 
						<label> Other Carrier - UL General Liability Premium <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm ugl_premium xl_number" id="ugl_premium_0" maxlength="19" placeholder="UL General Liability Premium"></div>
						</div>	
					</div>
					<div class="form-group col-auto"> 
						<label> Each Occurrence Limit <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm ugl_eachOccuLt" id="ugl_eachOccuLt_0" onchange="xlOtherSelect($(this));">
									<option value="1000000" selected> 1,000,000 </option>
									<option value="2000000"> 2,000,000 </option>
									<option value="3000000"> 3,000,000 </option>
									<option value="4000000"> 4,000,000 </option>
									<option value="5000000"> 5,000,000 </option>
									<option value="6000000"> 6,000,000 </option>
									<option value="7000000"> 7,000,000 </option>
									<option value="8000000"> 8,000,000 </option>
									<option value="9000000"> 9,000,000 </option>
									<option value="10000000"> 10,000,000 </option>
									<option value="11000000"> 11,000,000 </option>
									<option value="12000000"> 12,000,000 </option>
									<option value="13000000"> 13,000,000 </option>
									<option value="14000000"> 14,000,000 </option>
									<option value="15000000"> 15,000,000 </option>
									<option value="other"> Other </option>
								</select>
							</div>
						</div>	
					</div>
					<div class="form-group col-auto">
						<label> General Aggregate Limit <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm ugl_genAggreLt" id="ugl_genAggreLt_0" onchange="xlOtherSelect($(this));">
									<option value="1000000"> 1,000,000 </option>
									<option value="2000000" selected> 2,000,000 </option>
									<option value="3000000"> 3,000,000 </option>
									<option value="4000000"> 4,000,000 </option>
									<option value="5000000"> 5,000,000 </option>
									<option value="6000000"> 6,000,000 </option>
									<option value="7000000"> 7,000,000 </option>
									<option value="8000000"> 8,000,000 </option>
									<option value="9000000"> 9,000,000 </option>
									<option value="10000000"> 10,000,000 </option>
									<option value="11000000"> 11,000,000 </option>
									<option value="12000000"> 12,000,000 </option>
									<option value="13000000"> 13,000,000 </option>
									<option value="14000000"> 14,000,000 </option>
									<option value="15000000"> 15,000,000 </option>
									<option value="other"> Other </option>
								</select>
							</div>
						</div>	
					</div>
					<div class="form-group col-md-3">
						<label> Products Completed Operations Limit <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm ugl_prodLt" id="ugl_prodLt_0" onchange="xlOtherSelect($(this));">
									<option value="1000000"> 1,000,000 </option>
									<option value="2000000" selected> 2,000,000 </option>
									<option value="3000000"> 3,000,000 </option>
									<option value="4000000"> 4,000,000 </option>
									<option value="5000000"> 5,000,000 </option>
									<option value="6000000"> 6,000,000 </option>
									<option value="7000000"> 7,000,000 </option>
									<option value="8000000"> 8,000,000 </option>
									<option value="9000000"> 9,000,000 </option>
									<option value="10000000"> 10,000,000 </option>
									<option value="11000000"> 11,000,000 </option>
									<option value="12000000"> 12,000,000 </option>
									<option value="13000000"> 13,000,000 </option>
									<option value="14000000"> 14,000,000 </option>
									<option value="15000000"> 15,000,000 </option>
									<option value="other"> Other </option>
								</select>
							</div>
						</div>	
					</div>
					<div class="form-group col-md-4">
						<label> Personal Injury & Advertising Injury Limit <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm ugl_personalInjLt" id="ugl_personalInjLt_0" onchange="xlOtherSelect($(this));">
									<option value="1000000" selected> 1,000,000 </option>
									<option value="2000000"> 2,000,000 </option>
									<option value="3000000"> 3,000,000 </option>
									<option value="4000000"> 4,000,000 </option>
									<option value="5000000"> 5,000,000 </option>
									<option value="6000000"> 6,000,000 </option>
									<option value="7000000"> 7,000,000 </option>
									<option value="8000000"> 8,000,000 </option>
									<option value="9000000"> 9,000,000 </option>
									<option value="10000000"> 10,000,000 </option>
									<option value="11000000"> 11,000,000 </option>
									<option value="12000000"> 12,000,000 </option>
									<option value="13000000"> 13,000,000 </option>
									<option value="14000000"> 14,000,000 </option>
									<option value="15000000"> 15,000,000 </option>
									<option value="other"> Other </option>
								</select>
							</div>
						</div>	
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<label> SIC code </label>
						<select class="form-control form-control-sm xl_SIC" id="xl_SIC_0">
							<!-- <option value="0"> </option> -->
						</select>
					</div>
					<div class="col-md-2">
						<label> Hazard code </label>
						<select class="form-control form-control-sm xl_hazard" id="xl_hazard_0">
							<option value="" disabled selected="true"></option>
							<option value="1"> Low </option>
							<option value="2"> Medium </option>
							<option value="3"> High </option>
						</select>
					</div>
				</div>
				<table class="table table-sm table-bordered xlTable ugl_table mt-3" id="ugl_table_0">
					<thead class="bg-lav">
						<tr>
							<th> Class code <span class="redStar"> * </span> </th>
							<th class="width20_perc"> Zip code <span class="redStar"> * </span> </th>
							<th class="width20_perc"> Exposure <span class="redStar"> * </span> </th>
							<th class="width10_perc"> Actions </th>
						</tr>
					</thead>
					<tbody>
						<tr class="ugl_cb_tr" id="ugl_cb_tr_0_0" data-cb_rid="">
							<td>
								<input type="text" class="form-control form-control-sm ugl_cc" id="ugl_cc_0_0" placeholder="Class code" data-row_id="0_0" onblur="uglCC_save($(this));" onkeyup="uglCC_search($(this));">
								<small><span class='ugl_cc_desc pull-left' id="ugl_cc_desc_0_0"></span></small>
								<small class="pull-left" id="ugl_Invalid_cbClasscode_0_0" style="display:none">Invalid Class Code</small>
							</td>
							<td>
								<input type="text" class="form-control form-control-sm ugl_zc" id="ugl_zc_0_0" placeholder="Zip code" data-row_id="0_0" onblur="uglZC_save($(this));" onkeyup="uglZC_search($(this));">
								<small class="pull-left" id="ugl_Invalid_zipcode_0_0" style="display:none">Invalid Zipcode</small>
							</td>
							<td>
								<input type="text" class="form-control form-control-sm ugl_expo xl_number" id="ugl_expo_0_0" placeholder="Exposure" maxlength="19" data-row_id="0_0" onblur="uglExpo_save($(this));">
							</td>
							<td class="text-center">
								<button type="button" class="btn btn-xs btn-success xlTableBtn ugl_table_add mr-1" id="ugl_table_add_0_0" onclick="ugl_table_add($(this));"> <i class="fa fa-plus"></i></button>
								<button type="button" class="btn btn-xs btn-danger xlTableBtn ugl_table_del" id="ugl_table_add_0_0" data-row_id="0_0" onclick="ugl_table_del($(this));"> <i class="fa fa-trash"></i></button>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="ugl_deleteDiv text-right mt-4 mb-2">
					<button type="button" class="btn btn-sm btn-danger uglRemoveBtn" id="uglRemoveBtn_0" onclick="uglRemoveBtn($(this));">
						<i class="fa fa-trash mr-1"></i> Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="text-right mt-2">
	<a href="javascript:void(0);" type="button" class="btn btn-sm btn-info xl_addUgl mb-2 mr-2" id="xl_addUgl" onclick="xl_addUgl();"> Add Additional General Liability Policy </a>
</div>

<script type="text/javascript">
	$(".ugl_effectDt_0").datepicker({
    format: 'mm-dd-yyyy',
    autoclose: true,
    todayHighlight: true
	}).on('changeDate', function(selected) {
		var accordian_no = $(this).closest('.uglAccor').data('accord_no');
		var ugl_effectdate = $('#ugl_effectDt_'+accordian_no).val();
		
		var minDate = new Date(selected.date);
		var nxtYear = dateNextYear(selected.date);
		expDateSet($(this), 'ugl', nxtYear, minDate);
		var ugl_expdate = $('#ugl_expDt_'+accordian_no).val();

		save_update_ugl({effective_date:ugl_effectdate, expiration_date:ugl_expdate}, accordian_no);
	});

	$(".ugl_expDt_0").datepicker({
		format: 'mm-dd-yyyy',
		autoclose: true
	}).on('changeDate', function(e) {
		var accordian_no = $(this).closest('.uglAccor').data('accord_no');
		var ugl_expirdate=$('#ugl_expDt_'+accordian_no).val();
		save_update_ugl({expiration_date: ugl_expirdate}, accordian_no);
	});
</script>