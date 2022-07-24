<div class="accordion ullAccor mt-4" id="ullAccor_0" data-accord_no="0" data-rid="" data-retrieved="0">
	<div class="card">
		<div class="card-header ull_head" id="ull_head_0" data-toggle="collapse" data-target="#ull_collapse_0" aria-expanded="true" aria-controls="ull_collapse_0" onclick="ullAccorOpen($(this));"> Liquor </div>
		<div id="ull_collapse_0" class="collapse show" aria-lebelledy="ull_head_0" data-parent="#ullAccor_0">
			<div class="card-body">
				<div class="row mt-2">
					<div class="form-group col-md-3">
						<label> Policy Number </label>
						<input type="text" name="" class="form-control form-control-sm ull_policyNo" id="ull_policyNo_0">
					</div>
					<div class="form-group col-md-3">
						<label> Company </label>
						<input type="text" name="" class="form-control form-control-sm ull_company" id="ull_company_0">
					</div>
					<div class="form-group col-md-3">
						<label> Effective Date </label>
						<div class="input-group input-group-sm date ull_effectDt ull_effectDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="ull_effectDt_0" placeholder="mm/dd/yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
					<div class="form-group col-md-3">
						<label> Expiration Date </label>
						<div class="input-group input-group-sm date ull_expDt ull_expDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="ull_expDt_0" placeholder="mm/dd/yyyy" aria-invalid="false" autocomplete="off" readonly data-change_expdate="1"></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
				</div>
				<div class="row mt-2">
					<div class="form-group col-auto">
						<label> Ategrity Liquor Liability Premium <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm ull_ateLiqpremium xl_number" id="ull_ateLiqpremium_0" maxlength="19" placeholder="Ategrity Liquor Liability Premium"></div>
						</div>
					</div>
					<div class="form-group col-auto">
						<label> Other Carrier - UL Liquor Liability Premium <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm ull_liqpremium xl_number" id="ull_liqpremium_0" maxlength="19" placeholder="UL Liquor Liability Premium"></div>
						</div>
					</div>
					<div class="form-group col-auto"> 
						<label> Each Common Cause Limit <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm ">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm ull_eachCommonLt" id="ull_eachCommonLt_0" onchange="xlOtherSelect($(this));">
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
						<label> Aggregate Limit <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm pl-0">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm ull_aggreLt" id="ull_aggreLt_0" onchange="xlOtherSelect($(this));">
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
				<table class="table table-sm table-bordered xlTable ull_table mt-3" id="ull_table_0">
					<thead class="bg-lav">
						<tr>
							<th> Class code <span class="redStar"> * </span> </th>
							<th class="width20_perc"> Zip code <span class="redStar"> * </span> </th>
							<th class="width20_perc"> Exposure <span class="redStar"> * </span> </th>
							<th class="width10_perc"> Actions </th>
						</tr>
					</thead>
					<tbody>
						<tr class="ull_cb_tr" id="ull_cb_tr_0_0" data-cb_rid="">
							<td>
								<input type="text" class="form-control form-control-sm ull_cc" id="ull_cc_0_0" placeholder="Class code" data-row_id="0_0" onkeyup="ullCC_keyup($(this));" onblur="ullCC_blur($(this));">
								<small><span class='ull_cc_desc pull-left' id="ull_cc_desc_0_0"></span></small>
								<small class="pull-left" id="ull_Invalid_cbClasscode_0_0" style="display:none">Invalid Class Code</small>
							</td>
							<td>
								<input type="text" class="form-control form-control-sm ull_zc" id="ull_zc_0_0" placeholder="Zip code" data-row_id="0_0" onkeyup="ullZC_keyup($(this));" onblur="ullZc_blur($(this));">
								<small class="pull-left" id="ull_Invalid_zipcode_0_0" style="display:none">Invalid Zipcode</small>
							</td>
							<td>
								<input type="text" class="form-control form-control-sm ull_expo xl_number" id="ull_expo_0_0" placeholder="Exposure" data-row_id="0_0" onchange="ullExpo_change($(this));">
							</td>
							<td class="text-center">
								<button type="button" class="btn btn-xs btn-success xlTableBtn ull_table_add mr-1" id="ull_table_add_0_0" onclick="ull_tableAdd_fun($(this));"> <i class="fa fa-plus"></i></button>
								<button type="button" class="btn btn-xs btn-danger xlTableBtn ull_table_del" id="ull_table_del_0_0" data-row_id="0_0" onclick="ull_table_del($(this));"> <i class="fa fa-trash"></i></button>
							</td>
						</tr>
					</tbody>
				</table>	
				<div class="ull_deleteDiv text-right mt-4 mb-2">
					<button type="button" class="btn btn-sm btn-danger ullRemoveBtn" id="ullRemoveBtn_0" onclick="ullRemoveBtn($(this));">
						<i class="fa fa-trash mr-1"></i> Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="text-right mt-2">
	<a href="javascript:void(0);" type="button" class="btn btn-sm btn-info xl_addUll mb-2 mr-2" id="xl_addUll" onclick="xl_addUll($(this));"> Add Additional Liquor Policy </a>
</div>
<!-- <div class="ull_add_another" style="display:none;"></div> -->

<script type="text/javascript">
	$(".ull_effectDt_0").datepicker({
    format: 'mm-dd-yyyy',
    autoclose: true,
    todayHighlight: true
	}).on('changeDate', function(selected) {
		var accordian_no = $(this).closest('.ullAccor').data('accord_no');
		var ull_effectdate = $('#ull_effectDt_'+accordian_no).val();
		
		var minDate = new Date(selected.date);
		var nxtYear = dateNextYear(selected.date);
		expDateSet($(this), 'ull', nxtYear, minDate);
		var ull_expdate = $('#ull_expDt_'+accordian_no).val();
		save_update_ull({effective_date:ull_effectdate, expiration_date:ull_expdate}, accordian_no);
	});

	$(".ull_expDt_0").datepicker({
		format: 'mm-dd-yyyy',
		autoclose: true
	}).on('changeDate', function(e) {
		var accordian_no = $(this).closest('.ullAccor').data('accord_no');
		var ull_expirdate=$('#ull_expDt_'+accordian_no).val();
		save_update_ull({expiration_date: ull_expirdate}, accordian_no);
	});
</script>