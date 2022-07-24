<div class="accordion uothAccor mt-4 uothaccordion" id="uothAccor_0" data-rid="" data-accord_no="0">
	<div class="card">
		<div class="card-header uoth_head" id="uoth_head_0" data-toggle="collapse" data-target="#uoth_collapse_0" aria-expanded="true" aria-controls="uoth_collapse_0"> Other </div>
		<div id="uoth_collapse_0" class="collapse show" aria-lebelledy="uoth_head_0" data-parent="#uothAccor_0">
			<div class="card-body">
				<div class="row mt-2">
					<div class="form-group col-md-3">
						<label> Policy Number </label>
						<input type="text" name="" class="form-control form-control-sm uoth_policyNo" id="uoth_policyNo_0">
					</div>
					<div class="form-group col-md-3">
						<label> Company </label>
						<input type="text" name="" class="form-control form-control-sm uoth_company" id="uoth_company_0">
					</div>
					<div class="form-group col-md-3">
						<label> Effective Date </label>
						<div class="input-group input-group-sm date uoth_effectDt mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="uoth_effectDt_0" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
					<div class="form-group col-md-3">
						<label> Expiration Date </label>
						<div class="input-group input-group-sm date uoth_expDt mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="uoth_expDt_0" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
				</div>
				<div class="row mt-2">
					<div class="form-group col-md-3">
						<label> Other UL Premium <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm uoth_ulPremium xl_number" id="uoth_ulPremium_0" maxlength="19" placeholder="Other UL Premium"></div>
						</div>
					</div>
					<div class="form-group col-md-3 align-self-center">
						<div class="custom-control custom-checkbox mt-3 mr-2">
							<input type="checkbox" class="custom-control-input uoth_occu" id="uoth_occu_0">
							<label class="custom-control-label" for="uoth_occu_0"> Occurrence Coverage Basis </label>
						</div>
					</div>
					<div class="form-group col-md-3">
						<label> Liability Type </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm uoth_liabType" id="uoth_liabType_0" maxlength="30" placeholder="Liability Type"></div>
						</div>
					</div>
					<div class="form-group col-md-3"> 
						<label> Limit Of Insurance <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm uoth_insLt" id="uoth_insLt_0" onchange="xlOtherSelect($(this));">
									<option value="0"> Please select </option>
									<option value="500000"> 500,000 </option>
									<option value="1000000"> 1,000,000 </option>
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
					<div class="form-group col-md-3"> 
						<label> Aggregate Limit <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm uoth_aggreLt" id="uoth_aggreLt_0" onchange="xlOtherSelect($(this));">
									<option value="0"> Please select </option>
									<option value="500000"> 500,000 </option>
									<option value="1000000"> 1,000,000 </option>
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
				<table class="table table-sm table-borderless uoth_limitsTable mt-4" id="uoth_limitsTable_0">
					<tbody id="limit_table" class ="limit_table_0">
						<tr class="limit_row" data-rowrid="" id="limit_row_0_0" data-row_no="0">
							<td>
								<div class="input-group input-group-sm">
									<div class="input-group-addon bg-light text-center">
										<i class="fa fa-usd mt-2"></i>
									</div>
									<input type="text" class="form-control form-control-sm uoth_limits xl_number" id="uoth_limits_0_0" maxlength="19" placeholder="Limit">
								</div>	
							</td>
							<td>
								<input type="text" class="form-control form-control-sm uoth_limitsDesc" id="uoth_limitsDesc_0_0" placeholder="Limit Description">	
							</td>
							<td>
								<button type="button" class="btn btn-xs btn-success uoth_limitsAdd" onclick="uoth_limitsAdd($(this));">
									<i class="fa fa-plus"></i>
								</button>	
							</td>
						</tr>
					</tbody>
				</table>


					<!-- <div class="form-group col-md-3">
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<input type="text" class="form-control form-control-sm uoth_limits" id="uoth_limits_0_0" placeholder="Limit">
						</div>
					</div>
					<div class="form-group col-md-5">
						<input type="text" class="form-control form-control-sm uoth_limitsDesc" id="uoth_limitsDesc_0_0" placeholder="Limit Description">
					</div>
					<div class="col-auto">
						<button type="button" class="btn btn-xs btn-success uoth_limitsAdd" id="uoth_limitsAdd_0_0">
							<i class="fa fa-plus"></i>
						</button>
					</div> -->
				<div class="uoth_deleteDiv text-right mt-4 mb-2">
					<button type="button" class="btn btn-sm btn-danger uothRemoveBtn" id="uothRemoveBtn_0" onclick="uothRemoveBtn($(this));">
						<i class="fa fa-trash mr-1"></i> Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="text-right mt-2">
	<a href="javascript:void(0);" type="button" class="btn btn-sm btn-info xl_addUoth mb-2 mr-2" id="xl_addUoth" onclick="xl_addUoth();"> Add Additional Other Policy </a>	
</div>

<script type="text/javascript">
	$('.uoth_effectDt').datepicker({
	    format: 'mm-dd-yyyy',
	    autoclose: true,
	    todayHighlight: true
	}).on('changeDate', function(selected) {
		var minDate = new Date(selected.date);
		var nxtYear = dateNextYear(selected.date);
		expDateSet($(this), 'uoth', nxtYear, minDate);
		var accordion_no = $(this).closest('.uothAccor').data('accord_no');
        var uex_effectdate = $('#uoth_effectDt_'+uexAdd).val();
        expiry = $('#uoth_expDt_'+uexAdd).val();

        effectdate = uex_effectdate.split('-')
        var effective_date = effectdate[2] + '-' +effectdate[0] + '-' + effectdate[1];

        var expir_split = expiry.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
        xl_add_uoth({effective_date: effective_date, expiration_date: expiry_date},accordion_no);
	});
	
	$('.uoth_expDt').datepicker({
	    format: 'mm-dd-yyyy',
	    autoclose: true
	}).on('changeDate', function (e) {
        var uex_expirydate = $('#uoth_expDt_'+uexAdd).val();
        var expir_split = uex_expirydate.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
        var accordion_no = $(this).closest('.uothAccor').data('accord_no');
        xl_add_uoth({expiration_date: expiry_date},accordion_no);
        });
</script>