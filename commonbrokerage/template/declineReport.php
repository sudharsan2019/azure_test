<div class="my-2 py-2">
	<h4> Decline Report </h4>
</div>

<div class="row p-2 mb-2">
	<div class="col-sm-12 col-md-8 col-lg-10">
		<h4 class="text-info"> Filters </h4>
		<div class="row">
			<div class="col">
				<div class="form-group">
				    <label for="repCreateFrom"> Created From </label>
				    <input class="form-control repCreateFrom" type="text" id="repCreateFrom" placeholder="mm/dd/yyyy" autocomplete="data-off" name="repCreateFrom">
				</div>
			</div>
			<div class="col">
				<div class="form-group">
				    <label for="repCreateTo"> Created To </label>
				    <input class="form-control repCreateTo" type="text" id="repCreateTo" placeholder="mm/dd/yyyy" autocomplete="data-off" name="repCreateTo">
				</div>
			</div>
			<div class="col">
				<div class="form-group">
					<label for="reportPriAssign"> Primary Assignee </label> <br>
					<select class="form-control reportPriAssign" id="reportPriAssign" multiple="multiple" name="reportPriAssign">
						<option value="assignee1"> 12345 </option>
						<option value="assignee2"> 21544 </option>
						<option value="assignee3"> 34875 </option>
					</select>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col">
				<div class="form-group">
				    <label for="repEffectFrom"> Effective From </label>
				    <input class="form-control repEffectFrom" type="text" id="repEffectFrom" placeholder="mm/dd/yyyy" autocomplete="data-off" name="repEffectFrom">
				</div>
			</div>
			<div class="col">
				<div class="form-group">
				    <label for="repEffectTo"> Effective To </label>
				    <input class="form-control repEffectTo" type="text" id="repEffectTo" placeholder="mm/dd/yyyy" autocomplete="data-off" name="repEffectTo">
				</div>
			</div>
			<div class="col">
				<div class="form-group">
					<label for="reportBrok"> Broker </label> <br>
					<select class="form-control reportBrok" id="reportBrok" multiple="multiple" name="reportBrok">
						<option value="Broker1"> Broker1 </option>
						<option value="Broker2"> Broker2 </option>
						<option value="Broker3"> Broker3 </option>
					</select>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col">
				<div class="form-group">
				    <label for="repExpiryFrom"> Expiry From </label>
				    <input class="form-control repExpiryFrom" type="text" id="repExpiryFrom" placeholder="mm/dd/yyyy" autocomplete="data-off" name="repExpiryFrom">
				</div>
			</div>
			<div class="col">
				<div class="form-group">
				    <label for="repExpiryTo"> Expiry To </label>
				    <input class="form-control repExpiryTo" type="text" id="repExpiryTo" placeholder="mm/dd/yyyy" autocomplete="data-off" name="repExpiryTo">
				</div>
			</div>
			<div class="col">
				<div class="form-group">
					<label for="reportBussUnit"> Business Unit </label> <br>
					<select class="form-control reportBussUnit" id="reportBussUnit" multiple="multiple" name="reportBussUnit">
						<option value="Brokerage"> Brokerage </option>
						<option value="Brokerage2"> Brokerage 2 </option>
						<option value="Brokerage3"> Brokerage 3 </option>
					</select>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="offset-md-8 col">
				<div class="form-group">
              	<label> LOB </label> <br>             

                <select class="form-control" id="repLob" multiple="multiple" name="repLob">
                  <option value="GL" class="lobGl" selected> GL </option>
                  <option value="DBD" > DBD </option>
                  <option value="IM" > IM </option>
                  <option value="Crime" > Crime </option>
                  <option value="PrimaryProperty" > Primary Property </option>
                  <option value="XSLiability" > XS Liability </option>
                  <option value="XSProperty" > XS Property </option>
                </select>       
            </div>
			</div>
		</div>
	</div>
	<div class="col-sm-12 col-md-4 col-lg-2">
		<h4 class="text-info"> Columns </h4>
		<div class="form-group">
			<label for="reportColumn"> Optional Columns </label> <br>
			<select class="form-control reportColumn" id="reportColumn" multiple="multiple" name="reportColumn">
				<option value="createdDate"> Created Date </option>
				<option value="accountName"> Account Name </option>
				<option value="lob"> LOB </option>
			</select>
		</div>
	</div>

	<div class="my-2 ml-3">
		<button type="button" class="btn btn-md btn-primary"> Generate Report </button>
	</div>
</div>


















<!-- <div class="repSearchDiv mt-4">
	<input type="Search" class="form-control" name="repSearch" id="repSearch" placeholder="Search">
</div> -->
<table id="declineReportTable mt-4 mb-2" class="table table-hover table-bordered">
	<thead>
		<tr>
			<th scope="col"> # </th>
			<th> Created date </th>
			<th> Account Name </th>
			<th> LOB </th>
			<th> Broker </th>
			<th> Business Unit </th>
			<th> Primary Assignee </th>
			<th> Indicated Premium </th>
			<th> Effective </th>
			<th> Expiry </th>
			<th> Address </th>
			<th> City </th>
			<th> Zip </th>
			<th> State </th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td> 1 </td>
			<td> 2/5/2018 </td>
			<td> Test </td>
			<td> GL </td>
			<td> Primary1 </td>
			<td> broker1 </td>
			<td> whose </td>
			<td> 25k </td>
			<td> 8-12-2017 </td>
			<td> 12-15-2020 </td>
			<td> Vadavalli </td>
			<td> chennai </td>
			<td> 600006 </td>
			<td> Tamilnadu </td>
		</tr>
		<tr>
			<td> 2 </td>
			<td> 2/5/2018 </td>
			<td> Test1 </td>
			<td> Orange </td>
			<td> Primary1 </td>
			<td> broker1 </td>
			<td> whose </td>
			<td> 25k </td>
			<td> 8-12-2017 </td>
			<td> 12-15-2020 </td>
			<td> Vadavalli </td>
			<td> chennai </td>
			<td> 600006 </td>
			<td> Tamilnadu </td>
		</tr>
	</tbody>
</table>



