<?php
list($mili, $seconds) = explode(" ", microtime());
$newkey = ($seconds*1000)+round(($mili*1000));
$uca_uniqueid = $newkey;

?>
<div class="accordion ucaAccor mt-4" id="ucaAccor_0" data-uca_randamid="" data-accr_no="0">
	<div class="card">
		<div class="card-header uca_head" id="uca_head_0" data-toggle="collapse" data-target="#uca_collapse_0" aria-expanded="true" aria-controls="uca_collapse_0"> Auto </div>
		<div id="uca_collapse_0" class="collapse show" aria-lebelledy="uca_head_0" data-parent="#ucaAccor_0">
			<div class="card-body">
				<div class="row my-2">
					<div class="form-group col-md-3">
						<label> Policy Number </label>
						<input type="text" class="form-control form-control-sm uca_policyNo" id="uca_policyNo_0">
					</div>
					<div class="form-group col-md-3">
						<label> Company </label>
						<input type="text" class="form-control form-control-sm uca_company" id="uca_company_0">
					</div>
					<div class="form-group col-md-3">
						<label> Effective Date </label>
						<div class="input-group input-group-sm date uca_effectDt uca_effectDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="uca_effectDt_0" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
					<div class="form-group col-md-3">
						<label> Expiration Date </label>
						<div class="input-group input-group-sm date uca_expDt uca_expDt_0 mr-2">
                            <div><input type="text" class="form-control form-control-sm" id="uca_expDt_0" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div>
                            <div class="input-group-addon bg-info text-center">
                              <i class="fa fa-fw fa-calendar mt-2"></i>
                            </div>
                        </div> 
					</div>
					<div class="form-group col-md-3">
						<label> Combined Single Limit <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm uca_combLt" id="uca_combLt_0" onchange="xlOtherSelect($(this));">
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
						<label> Other Carrier - UL Commercial Auto Premium <span class="redStar"> * </span> </label>
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div><input type="text" class="form-control form-control-sm comAutoPremium xl_number" id="comAutoPremium_0" maxlength="19" placeholder="UL Commercial Auto Premium"></div>
						</div>	
					</div>
				</div>

				<div class="fleetBreakDiv my-2">
					<fieldset class="bg_lightGreen card mx-5">
						<legend class="ml-4 text-blue"> <h6> Fleet Breakdown </h6> </legend>
						<div class="card-body">
							<table class="table table-sm table-bordered xlTable fleetBreak_table" id="fleetBreak_table_0">
								<thead class="bg-lav">
									<tr>
										<th> Unit </th>
										<th> Range </th>
										<th> Actual </th>
										<th> Count </th>
										<th> Premium </th>
									</tr>
								</thead>
								<tbody>
									<tr class="xl_private_pass xl_private_pass_0" data-private_pass="">
										<td> <label class="private_pass"> Private Passenger </label> </td>
										<td>
											<input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$50 - $75">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm privatePass_act xl_number" id="privatePass_act_0" value="75" maxlength="19">
											</div>
										</td>
										<td>
											<input type="text" name="" class="form-control form-control-sm privatePass_count xl_number" id="privatePass_count_0" placeholder="# of Vehicles" maxlength="19">	
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm privatePass_prem xl_number" id="privatePass_prem_0" placeholder="Premium" maxlength="19">
											</div>
										</td>
									</tr>
									<tr class="xl_light_truck xl_light_truck_0" data-light_truck="">
										<td> <label class="light_truck"> Light Truck </label> </td>
										<td>
											<input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$75 - $150">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm ltTruct_act xl_number" id="ltTruct_act_0" value="150" maxlength="19">
											</div>
										</td>
										<td>
											<input type="text" name="" class="form-control form-control-sm ltTruct_count xl_number" id="ltTruct_count_0" placeholder="# of Vehicles" maxlength="19">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm ltTruct_prem xl_number" id="ltTruct_prem_0" placeholder="Premium" maxlength="19">
											</div>
										</td>
									</tr>
									<tr class="xl_medium_truck xl_medium_truck_0" data-medium_truck="">
										<td> <label class="medium_truck"> Medium Truck </label></td>
										<td>
											<input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$125 - $250">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm mdTruct_act xl_number" id="mdTruct_act_0" value="250" maxlength="19">
											</div>
										</td>
										<td>
											<input type="text" name="" class="form-control form-control-sm mdTruct_count xl_number" id="mdTruct_count_0" placeholder="# of Vehicles" maxlength="19">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm mdTruct_prem xl_number" id="mdTruct_prem_0" placeholder="Premium" maxlength="19">
											</div>
										</td>
									</tr>
									<tr class="xl_heavy_truck xl_heavy_truck_0" data-heavy_truck="">
										<td> <label class="heavy_truck"> Heavy Truck </label> </td>
										<td>
											<input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$225 - $500">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm hvyTruct_act xl_number" id="hvyTruct_act_0" value="500" maxlength="19">
											</div>
										</td>
										<td>
											<input type="text" name="" class="form-control form-control-sm hvyTruct_count xl_number" id="hvyTruct_count_0" placeholder="# of Vehicles">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm hvyTruct_prem xl_number" id="hvyTruct_prem_0" placeholder="Premium" maxlength="19">
											</div>
										</td>
									</tr>
									<tr class="xl_exheavy_truck xl_exheavy_truck_0" data-exheavy_truck="">
										<td> <label class="exheavy_truck"> Extra Heavy Truck </label> </td>
										<td>
											<input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$275 - $600">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm ExhvyTruct_act xl_number" id="ExhvyTruct_act_0" value="600" maxlength="19">
											</div>
										</td>
										<td>
											<input type="text" name="" class="form-control form-control-sm ExhvyTruct_count xl_number" id="ExhvyTruct_count_0" placeholder="# of Vehicles" maxlength="19">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm ExhvyTruct_prem xl_number" id="ExhvyTruct_prem_0" placeholder="Premium" maxlength="19">
											</div>
										</td>
									</tr>
									<tr class="xl_tractor xl_tractor_0" data-tractor="">
										<td> <label class="tractor"> Tractor </label> </td>
										<td>
											<input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$500 - $1,000">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm trackor_act xl_number" id="trackor_act_0" value="1000" maxlength="19">
											</div>
										</td>
										<td>
											<input type="text" name="" class="form-control form-control-sm trackor_count xl_number" id="trackor_count_0" placeholder="# of Vehicles" maxlength="19">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm trackor_prem xl_number" id="trackor_prem_0" placeholder="Premium" maxlength="19">
											</div>
										</td>
									</tr>
									<tr class="xl_bus xl_bus_0" data-bus="">
										<td> <label class="bus"> Bus </label> </td>
										<td>
											<input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$350 - $1,000">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm bus_act xl_number" id="bus_act_0" value="1000" maxlength="19">
											</div>
										</td>
										<td>
											<input type="text" name="" class="form-control form-control-sm bus_count xl_number" id="bus_count_0" placeholder="# of Vehicles" maxlength="19">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm bus_prem xl_number" id="bus_prem_0" placeholder="Premium" maxlength="19">
											</div>
										</td>
									</tr>
									<tr class="xl_ownVechi xl_ownVechi_0" data-ownVechi="">
										<td>
											<input type="text" name="" class="form-control form-control-sm text-center ownVechi_desc" id="ownVechi_desc_0" placeholder="Description of Vehicle">
										</td>
										<td>
											<input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="N/A">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm ownVechi_act xl_number" id="ownVechi_act_0" value="" placeholder="Actual value" maxlength="19">
											</div>
										</td>
										<td>
											<input type="text" name="" class="form-control form-control-sm ownVechi_count xl_number" id="ownVechi_count_0" placeholder="# of Vehicles" maxlength="19">
										</td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" name="" class="form-control form-control-sm ownVechi_prem xl_number" id="ownVechi_prem_0" placeholder="Premium" maxlength="19">
											</div>
										</td>
									</tr>
								</tbody>
								<tfoot class="bg-light">
									<tr>
										<td colspan="4" class="txt_right"> $1M x Primary Auto PREMIUM </td>
										<td>
											<div class="input-group input-group-sm">
												<div class="input-group-addon bg-light text-center">
													<i class="fa fa-usd mt-2"></i>
												</div>
												<input type="text" class="form-control form-control-sm fleetBreak_Totalprem xl_number" id="fleetBreak_Totalprem_0" maxlength="19" disabled>
											</div>
										</td>
									</tr>
								</tfoot>		
							</table>
						</div>
					</fieldset>
				</div>
				<div class="uca_deleteDiv text-right mt-4 mb-2">
					<button type="button" class="btn btn-sm btn-danger ucaRemoveBtn" id="ucaRemoveBtn_0" onclick="ucaRemoveBtn($(this));">
						<i class="fa fa-trash mr-1"></i> Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="text-right mt-2">
	<a href="javascript:void(0);" type="button" class="btn btn-sm btn-info xl_addUca mb-2 mr-2" id="xl_addUca" onclick="xl_addUca();"> Add Additional Auto Policy </a>
</div>

<script type="text/javascript">
	$('.uca_effectDt_0').datepicker({
	    format: 'mm-dd-yyyy',
	    autoclose: true,
	    todayHighlight: true
	}).on('changeDate', function(selected) {
		var minDate = new Date(selected.date);
		var nxtYear = dateNextYear(selected.date);
		expDateSet($(this), 'uca', nxtYear, minDate);

		var effective_date = $('#uca_effectDt_0').val();
        expiry_date = $('#uca_expDt_0').val();

        var accordion_no = $(this).closest('.ucaAccor').attr('data-accr_no');
        xl_add_uca({effective_date: effective_date, expiration_date: expiry_date}, accordion_no);
	});

	$('.uca_expDt_0').datepicker({
	    format: 'mm-dd-yyyy',
	    autoclose: true
	}).on('changeDate', function (e) {
        var uca_expirydate = $('#uca_expDt_0').val();
        var expir_split = uca_expirydate.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
        var accordion_no = $(this).closest('.ucaAccor').attr('data-accr_no');
        xl_add_uca({expiration_date: expiry_date}, accordion_no);
    });
</script>
