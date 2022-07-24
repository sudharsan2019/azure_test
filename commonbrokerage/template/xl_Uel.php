<div class="accordion uelAccor mt-4 uelaccordion" id="uelAccor_0" data-rid="" data-accord_no="0">
	<div class="card">
		<div class="card-header uel_head" id="uel_head_0" data-toggle="collapse" data-target="#uel_collapse_0" aria-expanded="true" aria-controls="uel_collapse_0"> Employers Liability </div>
		<div id="uel_collapse_0" class="collapse show" aria-lebelledy="uel_head_0" data-parent="#uelAccor_0">
			<div class="card-body">
				<div class="row mt-2">
					<div class="form-group col-md-3">
						<label> Policy Number </label>
						<input type="text" name="" class="form-control form-control-sm uel_policyNo" id="uel_policyNo_0">
					</div>
					<div class="form-group col-md-3">
						<label> Company </label>
						<input type="text" name="" class="form-control form-control-sm uel_company" id="uel_company_0">
					</div>
					<div class="form-group col-md-3">
						<label> Effective Date </label>
						<div class="input-group input-group-sm date uel_effectDt mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="uel_effectDt_0" placeholder="mm/dd/yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
					<div class="form-group col-md-3">
						<label> Expiration Date </label>
						<div class="input-group input-group-sm date uel_expDt mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="uel_expDt_0" placeholder="mm/dd/yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
				</div>
				<div class="row mt-2">
					<div class="form-group col-auto">
						<label> UL Employers Liability Premium <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm uel_empPremium xl_number" id="uel_empPremium_0" maxlength="19" placeholder="UL Employers Liability Premium"></div>
						</div>
					</div>
					<div class="form-group col-auto"> 
						<label> Bodily Injury Each Accident (By Accident) <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm uel_acci" id="uel_acci_0" onchange="xlOtherSelect($(this));">
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
						<label> Bodily Injury Policy Limit (By Disease) <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm uel_disLt" id="uel_disLt_0" onchange="xlOtherSelect($(this));">
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
						<label> Bodily Injury Each Employee (By Disease) <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm uel_empDis" id="uel_empDis_0" onchange="xlOtherSelect($(this));">
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
				<div class="uel_deleteDiv text-right my-2">
					<button type="button" class="btn btn-sm btn-danger uelRemoveBtn" id="uelRemoveBtn_0" onclick="uelRemoveBtn($(this));">
						<i class="fa fa-trash mr-1"></i> Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="text-right mt-2">
	<a href="javascript:void(0);" type="button" class="btn btn-sm btn-info xl_addUel mb-2 mr-2" id="xl_addUel" onclick="xl_addUel();"> Add Additional Employers Liability Policy </a>
</div>

<script type="text/javascript">
   $(".uel_effectDt").datepicker({
            format: 'mm-dd-yyyy',
            autoclose: true,
            todayHighlight: true
        }).on('changeDate', function(selected) {
            var minDate = new Date(selected.date);
            var nxtYear = dateNextYear(selected.date);
            expDateSet($(this), 'uel', nxtYear, minDate);
            var accordion_no = $(this).closest('.uelAccor').data('accord_no');
        var uex_effectdate = $('#uel_effectDt_'+uexAdd).val();
        expiry = $('#uel_expDt_'+uexAdd).val();

        effectdate = uex_effectdate.split('-')
        var effective_date = effectdate[2] + '-' +effectdate[0] + '-' + effectdate[1];

        var expir_split = expiry.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
        xl_add_uel({effective_date: effective_date, expiration_date: expiry_date},accordion_no);

        });
        $(".uel_expDt").datepicker({
            format: 'mm-dd-yyyy',
            autoclose: true
        }).on('changeDate', function (e) {
        var uex_expirydate = $('#uel_expDt_'+uexAdd).val();
        var expir_split = uex_expirydate.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
        var accordion_no = $(this).closest('.uelAccor').data('accord_no');
        xl_add_uel({expiration_date: expiry_date},accordion_no);
        });
</script>