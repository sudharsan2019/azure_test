<div class="accordion mt-4 ueblAccor" id="ueblAccor_0" data-rid="" data-accord_no="0">
	<div class="card">
		<div class="card-header uebl_head" id="uebl_head_0" data-toggle="collapse" data-target="#uebl_collapse_0" aria-expanded="true" aria-controls="uebl_collapse_0"> Employee Benefits Liability </div>
		<div id="uebl_collapse_0" class="collapse show" aria-lebelledy="uebl_head_0" data-parent="#ueblAccor_0">
			<div class="card-body">
				<div class="row mt-2">
					<div class="form-group col-md-3">
						<label> Policy Number </label>
						<input type="text" name="" class="form-control form-control-sm uebl_policyNo" id="uebl_policyNo_0">
					</div>
					<div class="form-group col-md-3">
						<label> Company </label>
						<input type="text" name="" class="form-control form-control-sm uebl_company" id="uebl_company_0">
					</div>
					<div class="form-group col-md-3">
						<label> Effective Date </label>
						<div class="input-group input-group-sm date uebl_effectDt uebl_effectDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="uebl_effectDt_0" placeholder="mm/dd/yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
					<div class="form-group col-md-3">
						<label> Expiration Date </label>
						<div class="input-group input-group-sm date uebl_expDt uebl_expDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="uebl_expDt_0" placeholder="mm/dd/yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
				</div>
				<div class="row mt-2">
					<div class="form-group col-auto">
						<label> UL Employee Benefits Premium <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm uebl_empPremium xl_number" id="uebl_empPremium_0" maxlength="19" placeholder="UL Employee Benefits Premium"></div>
						</div>
					</div>
					<div class="form-group col-auto">
						<label> Each Employee Limit  <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm uebl_eachEmpLt" id="uebl_eachEmpLt_0" onchange="xlOtherSelect($(this));">
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
						<label> Aggregate Limit <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm uebl_aggreLt" id="uebl_aggreLt_0" onchange="xlOtherSelect($(this));">
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
				</div>
				<div class="uebl_deleteDiv text-right my-2">
					<button type="button" class="btn btn-sm btn-danger ueblRemoveBtn" id="ueblRemoveBtn_0" onclick="ueblRemoveBtn($(this));">
						<i class="fa fa-trash mr-1"></i> Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="text-right mt-2">
	<a href="javascript:void(0);" type="button" class="btn btn-sm btn-info xl_addUebl mb-2 mr-2" id="xl_addUebl" onclick="xl_addUebl();"> Add Additional Employee Benefits Liability Policy </a>
</div>

<script type="text/javascript">
	$('.uebl_effectDt_0').datepicker({
	    format: 'mm-dd-yyyy',
	    autoclose: true,
	    todayHighlight: true
	}).on('changeDate', function(selected) {
		var minDate = new Date(selected.date);
		var nxtYear = dateNextYear(selected.date);
		expDateSet($(this), 'uebl', nxtYear, minDate);
		
		var accordian_no = $(this).closest('.ueblAccor').data('accord_no');
		var uebl_effectdate = $('#uebl_effectDt_'+accordian_no).val();
		var uebl_expdate = $('#uebl_expDt_'+accordian_no).val();
		xl_add_uebl({effective_date:uebl_effectdate, expiration_date:uebl_expdate}, accordian_no);
	});

	$('.uebl_expDt_0').datepicker({
	    format: 'mm-dd-yyyy',
	    autoclose: true
	}).on('changeDate', function (e) {
	    var uebl_expirydate = $('#uebl_expDt_0').val();
		var accordian_no = $(this).closest('.ueblAccor').data('accord_no');
        xl_add_uebl({expiration_date: uebl_expirydate},accordian_no);
	});
</script>