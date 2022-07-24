<div class="card mt-4">
	<div class="card-body">
		<div class="col-2 bg-secondary text-white p-1 text-center"> Quota Share </div>
    	<div class="form-row mt-2">
			<div class="col quota_sharetable">
				<table class="table table-sm table-bordered xlTable xlQuoteTable" data-retreivequota="0">
					<thead class="bg-lav">
						<tr>
							<th rowspan="2"> Name of Co-Insurer </th>
							<th rowspan="2" class="width17_perc"> Policy Number </th>
							<th rowspan="2" class="width9_perc"> % share layer </th>
							<th colspan="2" class="text-center"> Limit of Insurance </th>
							<th rowspan="2" class="bg-white width10_perc"></th>
						</tr>
						<tr>
							<th class="width21_perc"> Each Occurrence </th>
							<th class="width21_perc"> Aggregate Limit </th>
						</tr>
					</thead>
					<tbody id="quota_share_details">
						<tr data-share="0" id="quota_share_0"  data-rid="" class="quota_share_row quota_share_table" >
							<td>
								<input type="text" name="" class="form-control form-control-sm xlQta_nameIns" id="xlQta_nameIns_0" placeholder="Name of Co-Insurer">
							</td>
							<td>
								<input type="text" name="" class="form-control form-control-sm xlQta_policyNo" id="xlQta_policyNo_0" placeholder="Policy #">
							</td>
							<td>
								<div class="input-group input-group-sm">
									<input type="text" name="" class="form-control form-control-sm xlQta_share xl_number" id="xlQta_share_0" onkeyup="xlPerc_valid($(this));" maxlength="3">
									<div class="input-group-addon text-center">
										<i class="fa fa-percent mt-2"></i>
									</div>
								</div>
							</td>
							<td>
								<div class="input-group input-group-sm">
									<div class="input-group-addon bg-light text-center">
										<i class="fa fa-usd mt-2"></i>
									</div>
									<div>
										<select class="form-control form-control-sm xlQta_occurLt" id="xlQta_occurLt_0" onchange="xlOtherSelect($(this));">
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
							</td>
							<td>
								<div class="input-group input-group-sm">
									<div class="input-group-addon bg-light text-center">
										<i class="fa fa-usd mt-2"></i>
									</div>
									<div>
										<select class="form-control form-control-sm xlQta_aggreLt" id="xlQta_aggreLt_0" onchange="xlOtherSelect($(this));">
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
							</td>
							<td>
								<button type="button" class="btn btn-sm btn-primary xlAddCoInsBtn" onclick="xlAddCoInsBtn($(this));"> Add Coinsurer </button>
							</td>
						</tr>
					</tbody>
					<tfoot id="total_quota_share">
						<tr>
						<td colspan="2"> <b> Total Layer Share </b> </td>
						<td>
							<div class="input-group input-group-sm">
								<input type="text" name="" class="form-control form-control-sm xlQta_share_tot" maxlength="3" disabled>
								<div class="input-group-addon text-center">
									<i class="fa fa-percent mt-2"></i>
								</div>
							</div>
						</td>
						<td>
							<div class="input-group input-group-sm">
								<div class="input-group-addon bg-light text-center">
									<i class="fa fa-usd mt-2"></i>
								</div>
								<input type="text" name="" class="form-control form-control-sm xlQta_occurLt_tot xl_number" maxlength="19" disabled>
							</div>
						</td>
						<td>
							<div class="input-group input-group-sm">
								<div class="input-group-addon bg-light text-center">
									<i class="fa fa-usd mt-2"></i>
								</div>
								<input type="text" name="" class="form-control form-control-sm xlQta_aggreLt_tot xl_number" maxlength="19" disabled>
							</div>
						</td>
						<td></td>
					</tr>
					</tfoot>
				</table>
			</div>
    	</div>
	</div>
</div>