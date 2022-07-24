<div class="my-2">
	<div class="support_unsupportDiv">
		<div class="custom-control custom-radio custom-control-inline mb-2">
			<input type="radio" class="custom-control-input supportedtype" id="supportEx" name="supportRadio" value="supportEx" onchange="supportChange($(this))">
			<label class="custom-control-label" for="supportEx"> Supported Excess </label>
		</div>
		<div class="custom-control custom-radio custom-control-inline mb-2">
			<input type="radio" class="custom-control-input supportedtype" id="unSupportEx" name="supportRadio" value="unSupportEx" onchange="supportChange($(this))">
			<label class="custom-control-label" for="unSupportEx"> Unsupported Excess </label>
		</div>
	</div>

	<div class="row mt-2">
		<label class="col-md-1"> Type <span class="redStar"> * </span></label>
		<div class="col-auto">
			<div class="custom-control custom-radio custom-control-inline">
				<input type="radio" class="custom-control-input xlTypeLead xlType" id="xlTypeLead" name="xlType" value="lead"onchange="xlTypeChange($(this))">
				<label class="custom-control-label" for="xlTypeLead"> Lead </label>
			</div>
			<div class="custom-control custom-radio custom-control-inline">
				<input type="radio" class="custom-control-input xlTypeExcess xlType" id="xlTypeExcess" name="xlType" value="excess" onchange="xlTypeChange($(this))">
				<label class="custom-control-label" for="xlTypeExcess"> Excess </label>
			</div>	
		</div>
	</div>
	<div class="bg-light rounded border p-2 mt-2">
		<div class="form-row my-2">
			<div class="col-md-6 form-row">
				<label class="col-md-4 mt-1"> Each Occurrence Limit <span class="redStar"> * </span> </label>
				<div class="col-md-8 form-row">
					<div class="col-auto">
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm xlType_occuLimit" id="xlType_occuLimit" onchange="xlOtherSelect($(this));">
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
				</div>
			</div>
			<div class="col-md-6 form-row">
				<label class="col-md-3 mt-1"> Aggregate Limit <span class="redStar"> * </span> </label>
				<div class="col-md-9 form-row">
					<div class="col-auto">
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm xlType_aggreLimit" id="xlType_aggreLimit" onchange="xlOtherSelect($(this));">
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
				</div>
			</div>
		</div>
		<div class="form-row mt-3 mb-2">
			<div class="col-md-6 form-row">
				<label class="col-md-4 mt-1"> Products Aggregate Limit <span class="redStar"> * </span> </label>
				<div class="col-md-8 form-row">
					<div class="col-auto">
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm xlType_prodAggreLimit" id="xlType_prodAggreLimit" onchange="xlOtherSelect($(this));">
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
				</div>
			</div>
			<div class="col-md-6 form-row attachPtDiv d-none">
				<label class="col-md-3 mt-1"> Attachment Point <span class="redStar"> * </span> </label>
				<div class="col-md-9 form-row">
					<div class="col-auto">
						<div class="input-group input-group-sm">
							<div class="input-group-addon bg-light text-center">
								<i class="fa fa-usd mt-2"></i>
							</div>
							<div>
								<select class="form-control form-control-sm xlType_attachPt" id="xlType_attachPt" onchange="xlOtherSelect($(this));">
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
				</div>
			</div>
		</div>
	</div>
						<!-- 	Quote share 	 -->
	<div id="xlQtaShare_div"></div>

					<!--	 Underlying schedule 		 -->
	<div class="card mt-4">
		<h6 class="bg-secondary text-white p-2"> Underlying Schedule </h6>
		<div class="card-body">
			<h6> Coverages </h6>
			<div class="d-flex xl_allCovDiv mt-2">
				<div class="custom-control custom-checkbox mr-3">
					<input type="checkbox" class="custom-control-input xlCov_auto" id="xlCov_auto" onchange="xlAuto_append(this, res_uca=[]);">
					<label class="custom-control-label" for="xlCov_auto"> Auto </label>
				</div>
				<div class="custom-control custom-checkbox mr-3">
					<input type="checkbox" class="custom-control-input xlCov_exces" id="xlCov_exces" onchange="xlExces_append(this, res_uex=[]);">
					<label class="custom-control-label" for="xlCov_exces"> Excess </label>
				</div>
				<div class="custom-control custom-checkbox mr-3">
					<input type="checkbox" class="custom-control-input xlCov_ebl" id="xlCov_ebl" onchange="xlEbl_append(this, ret_uebl=[]);">
					<label class="custom-control-label" for="xlCov_ebl"> Employee Benefits Liability </label>
				</div>
				<div class="custom-control custom-checkbox mr-3">
					<input type="checkbox" class="custom-control-input xlCov_el" id="xlCov_el" onchange="xlEl_append(this, ret_uel=[]);">
					<label class="custom-control-label" for="xlCov_el"> Employers Liability </label>
				</div>
				<div class="custom-control custom-checkbox mr-3">
					<input type="checkbox" class="custom-control-input xlCov_gl" id="xlCov_gl" checked="true" onchange="xlGl_append(this)">
					<label class="custom-control-label" for="xlCov_gl"> General Liability </label>
				</div>
				<div class="custom-control custom-checkbox mr-3">
					<input type="checkbox" class="custom-control-input xlCov_ll" id="xlCov_ll" onchange="xlLL_append(this,[],0);">
					<label class="custom-control-label" for="xlCov_ll"> Liquor </label>
				</div>				
				<div class="custom-control custom-checkbox mr-3">
					<input type="checkbox" class="custom-control-input xlCov_StopGap" id="xlCov_StopGap" onchange="xlStopGap_append(this, res_usg=[]);">
					<label class="custom-control-label" for="xlCov_StopGap"> Stop Gap </label>
				</div>
				<div class="custom-control custom-checkbox mr-3">
					<input type="checkbox" class="custom-control-input xlCov_other" id="xlCov_other" onchange="xlOth_append(this, ret_uoth=[]);">
					<label class="custom-control-label" for="xlCov_other"> Other </label>
				</div>
			</div>
			<div id="xlUca_div" class="bg_yellow"></div>
			<div id="xlexces_div" class="bg_cyan"></div>
			<div id="xlUebl_div" class="bg_laven"></div>
			<div id="xlUel_div" class="bg_yellow"></div>
			<div id="xlUgl_div" class="bg_cyan"></div>
			<div id="xlUll_div" class="bg_laven"></div>
			<div id="xlstopGap_div" class="bg_yellow"></div>			
			<div id="xlother_div" class="bg_cyan"></div>
		</div>
	</div>
</div>


					<!-- 	Brokerage XL js		 -->
<script type="text/javascript" src="../js/xl_common.js"></script>
<script type="text/javascript" src="../js/xl_ugl.js"></script>
<script type="text/javascript" src="../js/xl_uca.js"></script>
<script type="text/javascript" src="../js/xl_uex.js"></script>
<script type="text/javascript" src="../js/xl_uebl.js"></script>
<script type="text/javascript" src="../js/xl_uel.js"></script>
<script type="text/javascript" src="../js/xl_ull.js"></script>
<script type="text/javascript" src="../js/xl_stopGap.js"></script>
<script type="text/javascript" src="../js/xl_other.js"></script>
<script type="text/javascript" src="../js/xl_retrieve.js"></script>
<script type="text/javascript" src="../js/xl_premium.js"></script>
<script type="text/javascript" src="../js/xl_quota_share.js"></script>



