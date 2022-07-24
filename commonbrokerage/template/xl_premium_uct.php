<table class="table table-sm table-bordered xlUnderCal_Tab width90">
    <thead>
        <tr>
            <th colspan="5" class="text-center bg-secondary text-white"> Underwriter calculation table </th>
        </tr>
        <tr class="bg-lav">
            <th class="width25_perc"> Underlying Premium </th>
            <th> Description </th>
            <th class="width12_perc"> Percentage </th>
            <th class="width25_perc"> Total </th>
            <th class="width10_perc"> Add / Delete </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <div class="input-group input-group-sm">
                    <div class="input-group-addon bg-light text-center">
                        <i class="fa fa-usd mt-2"></i>
                    </div>
                    <div><input type="text" class="form-control form-control-sm underCal_Prem xl_number" id="underCal_Prem_0" value="250,000" maxlength="19"></div>
                </div>
            </td>
            <td>
                <input type="text" class="form-control form-control-sm underCal_Desc">
            </td>
            <td>
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control form-control-sm underCal_Perc xl_number" id="underCal_Perc_0" value="" onkeyup="xlPerc_valid($(this));" maxlength="3">
                    <div class="input-group-addon bg-light text-center">
                        <i class="fa fa-percent mt-2"></i>
                    </div>
                </div>
            </td>
            <td>
                <div class="input-group input-group-sm">
                    <div class="input-group-addon bg-light text-center">
                        <i class="fa fa-usd mt-2"></i>
                    </div>
                    <div><input type="text" class="form-control form-control-sm underCal_Tot xl_number" id="underCal_Tot_0" value="250,000" maxlength="19"></div>
                </div>
            </td>
            <td class="text-center">
                <button type="button" class="btn btn-xs btn-success underCal_plus xlTableBtn mr-1" onclick="uctAddFun($(this));"> <i class="fa fa-plus"></i></button>
                <button type="button" class="btn btn-xs btn-danger underCal_minus xlTableBtn" onclick="uctMinusFun($(this));" disabled> <i class="fa fa-minus"></i></button>
            </td>
        </tr>
    </tbody>
</table>