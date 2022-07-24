<div class="accordion mt-4 uexAccor uexAccor_0 uexaccordion" id="uexAccor_0" data-rid="" data-accord_no="0">
	<div class="card">
		<div class="card-header uex_head" id="uex_head_0" data-toggle="collapse" data-target="#uex_collapse_0" aria-expanded="true" aria-controls="uex_collapse_0"> Excess </div>
		<div id="uex_collapse_0" class="collapse show" aria-lebelledy="uex_head_0" data-parent="#uexAccor_0">
			<div class="card-body">
				<div class="row mt-2">
					<div class="form-group col-md-3">
						<label> Policy Number </label>
						<input type="text" name="" class="form-control form-control-sm uex_policyNo" id="uex_policyNo_0">
					</div>
					<div class="form-group col-md-3">
						<label> Company </label>
						<input type="text" name="" class="form-control form-control-sm uex_company" id="uex_company_0">
					</div>
					<div class="form-group col-md-3">
						<label> Effective Date </label>
						<div class="input-group input-group-sm date uex_effectDt uex_effectDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="uex_effectDt_0" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div>
					</div>
					<div class="form-group col-md-3">
						<label> Expiration Date </label>
						<div class="input-group input-group-sm date uex_expDt uex_expDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="uex_expDt_0" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
				</div>
				<div class="row">
					<label class="col-auto"> Liability Type </label>
					<div class="col-auto">
						<div class="custom-control custom-radio custom-control-inline">
							<input type="radio" class="custom-control-input uex_liabType_lead uex_liabType" id="uex_liabType_lead_0" checked="checked" name="uex_liabType_0" value="1">
							<label class="custom-control-label" for="uex_liabType_lead_0"> Excess </label>
						</div>
						<div class="custom-control custom-radio custom-control-inline">
							<input type="radio" class="custom-control-input uex_liabType_umb uex_liabType" id="uex_liabType_umb_0" name="uex_liabType_0" value="2">
							<label class="custom-control-label" for="uex_liabType_umb_0"> Umbrella </label>
						</div>	
					</div>
				</div>
				<div class="row mt-2">
					<div class="form-group col-auto">
						<label> Other UL Excess Premium <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm uex_ulPremium xl_number" id="uex_ulPremium_0" maxlength="19" placeholder="Other UL Excess Premium"></div>
						</div>
					</div>
					<div class="form-group col-auto">
						<label> Limit of Insurance <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm uex_insur" id="uex_insur_0" onchange="xlOtherSelect($(this));">
									<option value="0"> Please select </option>
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
					<div class="form-group col-auto">
						<label> Underlying Limits <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm uex_underLt" id="uex_underLt_0" onchange="xlOtherSelect($(this));">
									<option value="0"> Please select </option>
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
					<div class="form-group col-md-4 uex_ccDiv d-none">
						<label> Class Code <span class="redStar"> * </span> </label>
						<input type="text" class="form-control form-control-sm uex_cc" id="uex_cc_0" placeholder="Class code" data-row_id="0">
						<small><span class='uex_cc_desc' id="uex_cc_desc_0"></span></small>
						<small id="ucc_Invalid_cbClasscode_0">Invalid Class Code</small>
					</div>
				</div>
				<div class="uex_deleteDiv text-right my-2">
					<button type="button" class="btn btn-sm btn-danger uexRemoveBtn" id="uexRemoveBtn_0" onclick="uexRemoveBtn($(this));">
						<i class="fa fa-trash mr-1"></i> Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="text-right mt-2">
	<a href="javascript:void(0);" type="button" class="btn btn-sm btn-info xl_addUex mb-2 mr-2" id="xl_addUex" onclick="xl_addUex();"> Add Additional Excess Policy </a>	
</div>
<script type="text/javascript">
	$('.uex_effectDt_0').datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true,
        todayHighlight: true
    }).on('changeDate', function(selected) {
        var nxtYear = dateNextYear(selected.date);
        $(this).closest('.uexAccor').find('.uex_expDt').datepicker('setDate', nxtYear);
        var accordion_no = $(this).closest('.uexAccor').data('accord_no');
        var uex_effectdate = $('#uex_effectDt_0').val();
        expiry = $('#uex_expDt_0').val();

        effectdate = uex_effectdate.split('-')
        var effective_date = effectdate[2] + '-' +effectdate[0] + '-' + effectdate[1];

        var expir_split = expiry.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
        xl_add_uex({effective_date: effective_date, expiration_date: expiry_date},accordion_no);
    });
    
    $('.uex_expDt_0').datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true
    }).on('changeDate', function (e) {
        var uex_expirydate = $('#uex_expDt_0').val();
        var expir_split = uex_expirydate.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
        var accordion_no = $(this).closest('.uexAccor').data('accord_no');
        xl_add_uex({expiration_date: expiry_date},accordion_no);
    });
	

</script>