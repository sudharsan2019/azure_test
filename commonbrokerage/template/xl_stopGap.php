<div class="accordion usgAccor mt-4" id="usgAccor_0" data-usg_randamid="" data-accr_no="0">
	<div class="card">
		<div class="card-header usg_head" id="usg_head_0" data-toggle="collapse" data-target="#usg_collapse_0" aria-expanded="true" aria-controls="usg_collapse_0"> Stop Gap </div>
		<div id="usg_collapse_0" class="collapse show" aria-lebelledy="usg_head_0" data-parent="#usgAccor_0">
			<div class="card-body">
				<div class="row mt-2">
					<div class="form-group col-md-3">
						<label> Policy Number </label>
						<input type="text" name="" class="form-control form-control-sm usg_policyNo" id="usg_policyNo_0">
					</div>
					<div class="form-group col-md-3">
						<label> Company </label>
						<input type="text" name="" class="form-control form-control-sm usg_company" id="usg_company_0">
					</div>
					<div class="form-group col-md-3">
						<label> Effective Date </label>
						<div class="input-group input-group-sm date usg_effectDt usg_effectDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="usg_effectDt_0" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
					<div class="form-group col-md-3">
						<label> Expiration Date </label>
						<div class="input-group input-group-sm date usg_expDt usg_expDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="usg_expDt_0" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
				</div>
				<div class="row mt-2">
					<div class="form-group col-auto">
						<label> UL Stop Gap Premium <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm usg_ulPremium xl_number" id="usg_ulPremium_0" maxlength="19" placeholder="UL Stop Gap Premium"></div>
						</div>
					</div>
					<div class="form-group col-auto">
						<label> Bodily Injury By Accident (Each Accident) <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm usg_acci" id="usg_acci_0" onchange="xlOtherSelect($(this));">
									<option value="500000"> 500,000 </option>
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
						<label> Bodily Injury By Disease (Each Employee) <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm usg_disEmp" id="usg_disEmp_0" onchange="xlOtherSelect($(this));">
									<option value="500000"> 500,000 </option>
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
						<label> Bodily Injury By Disease Aggregate Limit <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm usg_AggreLt" id="usg_AggreLt_0" onchange="xlOtherSelect($(this));">
									<option value="500000"> 500,000 </option>
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
					<div class="col-auto align-self-center mt-2">
						<label class="mr-2"> States  </label>
						<select class="form-control form-control-sm usg_stat" id="usg_stat_0" multiple="multiple">
							<option value="oh"> OH </option>
							<option value="nd"> ND </option>
							<option value="wa"> WA </option>
							<option value="wy"> WY </option>	
						</select>
					</div>
				</div>
				<div class="usg_deleteDiv text-right mt-5 mb-2">
					<button type="button" class="btn btn-sm btn-danger usgRemoveBtn mb-2" id="usgRemoveBtn_0" onclick="usgRemoveBtn($(this));">
						<i class="fa fa-trash mr-1"></i> Delete
					</button>
					
				</div>
			</div>
		</div>
	</div>
</div>
<div class="text-right mt-2">
	<a href="javascript:void(0);" type="button" class="btn btn-sm btn-info xl_addUsg mb-2 mr-2" id="xl_addUsg" onclick="xl_addUsg();"> Add Additional Stop Gap Policy </a>
</div>

<script type="text/javascript">
	$('.usg_effectDt_0').datepicker({
	    format: 'mm-dd-yyyy',
	    autoclose: true,
	    todayHighlight: true
	}).on('changeDate', function(selected) {
		var minDate = new Date(selected.date);
		var nxtYear = dateNextYear(selected.date);
		expDateSet($(this), 'usg', nxtYear, minDate);

		var effective_date = $('#usg_effectDt_0').val();
        expiry_date = $('#usg_expDt_0').val();

        var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
        xl_add_usg({effective_date: effective_date, expiration_date: expiry_date}, accordion_no);
	});
	
	$('.usg_expDt_0').datepicker({
	    format: 'mm-dd-yyyy',
	    autoclose: true
	}).on('changeDate', function (e) {
	    var usg_expirydate = $('#usg_expDt_0').val();
	    var expir_split = usg_expirydate.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
	    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
	    xl_add_usg({expiration_date: expiry_date}, accordion_no);
	});
	$('#usg_stat_0').multiselect({
        includeSelectAllOption: true,
    });

</script>