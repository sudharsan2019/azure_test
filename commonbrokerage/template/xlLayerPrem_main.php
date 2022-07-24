<div class="xlLayer_over width60 bg-light mt-4">
    <div class="custom-control custom-checkbox py-2 mt-2">
        <input type="checkbox" class="custom-control-input xlfact_over" id="xlfact_over" onchange="xlPremium_append(this);">
        <label class="custom-control-label ml-2" for="xlfact_over"> Override </label>
    </div>    
</div>

<table class="table table-sm table-bordered xlLayer_premTab width60">
    <thead>
        <tr>
            <th colspan="3" class="text-center bg-secondary text-white"> Layer Premium </th>
        </tr>
        <tr>
            <th class="width20_perc bg-lav"> Layer </th>
            <th class="width10_perc bg-lav"> Factor </th>
            <th class="width25_perc bg-lav"> Layer Premium </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> 1M x Primary </td>
            <td>
                <input type="text" class="form-control form-control-sm xlLayer_fact" value="0.25" disabled>
            </td>
            <td>
                <div class="input-group input-group-sm justify-content-center">
                    <div class="input-group-addon bg-light text-center">
                        <i class="fa fa-usd mt-2"></i>
                    </div>
                    <div><input type="text" class="form-control form-control-sm xlLayer_prem xl_number" value="1,000" maxlength="19" disabled></div>
                </div>
            </td>
        </tr>
        <tr>
            <td> 1M x 1M </td>
            <td> 
                <input type="text" class="form-control form-control-sm xlLayer_fact" value="0.5" disabled>
            </td>
            <td>
                <div class="input-group input-group-sm justify-content-center">
                    <div class="input-group-addon bg-light text-center">
                        <i class="fa fa-usd mt-2"></i>
                    </div>
                    <div><input type="text" class="form-control form-control-sm xlLayer_prem xl_number" value="1,000" maxlength="19" disabled></div>
                </div>
            </td>
        </tr>
        <tr>
            <td> 1M x 2M </td>
            <td> 
                <input type="text" class="form-control form-control-sm xlLayer_fact" value="0.5" disabled>
            </td>
            <td>
                <div class="input-group input-group-sm justify-content-center">
                    <div class="input-group-addon bg-light text-center">
                        <i class="fa fa-usd mt-2"></i>
                    </div>
                    <dvi><input type="text" class="form-control form-control-sm xlLayer_prem xl_number" value="1,000" maxlength="19" disabled></dvi>
                </div>
            </td>
        </tr>
        <tr>
            <td> 1M x 3M </td>
            <td> 
                <input type="text" class="form-control form-control-sm xlLayer_fact" value="0.5" disabled>
            </td>
            <td>
                <div class="input-group input-group-sm justify-content-center">
                    <div class="input-group-addon bg-light text-center">
                        <i class="fa fa-usd mt-2"></i>
                    </div>
                    <div><input type="text" class="form-control form-control-sm xlLayer_prem xl_number" value="1,000" maxlength="19" disabled></div>
                </div>
            </td>
        </tr>
        <tr>
            <td> 1M x 4M </td>
            <td> 
                <input type="text" class="form-control form-control-sm xlLayer_fact" value="0.5" disabled>
            </td>
            <td>
                <div class="input-group input-group-sm justify-content-center">
                    <div class="input-group-addon bg-light text-center">
                        <i class="fa fa-usd mt-2"></i>
                    </div>
                    <div><input type="text" class="form-control form-control-sm xlLayer_prem xl_number" value="1,000" maxlength="19" disabled></div>
                </div>
            </td>
        </tr>
    </tbody>
    <tfoot class="bg-light">
        <tr class="xlLayerPrem_LayerTotTr">
            <td colspan="2"> <b> Total Excess Premium </b> </td>
            <td>
                <div class="input-group input-group-sm justify-content-center">
                    <div class="input-group-addon bg-light text-center">
                        <i class="fa fa-usd mt-2"></i>
                    </div>
                    <div><input type="text" class="form-control form-control-sm xlLayer_premTot xl_number" value="5,000" maxlength="19"></div>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2"> <b> Underlying GL Premium: </b> </td>
            <td>
                <div class="input-group input-group-sm justify-content-center">
                    <div class="input-group-addon bg-light text-center">
                        <i class="fa fa-usd mt-2"></i>
                    </div>
                    <div><input type="text" class="form-control form-control-sm xlLayer_premUgl xl_number" value="25,000" maxlength="19" disabled></div>
                </div>
            </td>
        </tr>
    </tfoot>
</table>