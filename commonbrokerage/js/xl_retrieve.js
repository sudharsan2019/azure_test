function brok_xl_retrieve(com_id){
  var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
  try {
    $.ajax({
      url: laravel_url + "/get_coverages",
      type: 'POST',
      data: { 'com_id': com_id, acct_id: acc_id },
      success: function (response) {
        ret_obj = response;
        if (ret_obj["usg"]) {
          ret_usg = [];
          if (ret_obj["usg"].length > 0) {
            ret_usg = ret_obj['usg'];
          }
          $('.xlCov_StopGap').prop('checked', true);
          che = $('.xlCov_StopGap');
          xlStopGap_append(che, ret_usg);
        }
        if (ret_obj["uex"]) {
          ret_uex = [];
          if (ret_obj["uex"].length > 0) {
            ret_uex = ret_obj['uex'];
          }
          $('.xlCov_exces').prop('checked',true);
          che = $('.xlCov_exces');   
          xlExces_append(che,ret_uex);
        } 

        if (ret_obj["uel"]) {

          ret_uel = [];
          if (ret_obj["uel"].length > 0) {
            ret_uel = ret_obj['uel'];
          }
          $('.xlCov_el').prop('checked',true);
          che = $('.xlCov_el');   
          xlEl_append(che,ret_uel);
        } 

        if (ret_obj["uca"]) {
          ret_uca = [];
          if (ret_obj["uca"].length > 0) {
            ret_uca = ret_obj['uca'];
          }
          $('.xlCov_auto').prop('checked', true);
          che = $('.xlCov_auto');
          xlAuto_append(che, ret_uca);
        }
        if (ret_obj["uot"]) {

          ret_uot = [];
          if (ret_obj["uot"].length > 0) {
            ret_uot = ret_obj['uot'];
          }
          $('.xlCov_other').prop('checked', true);
          che = $('.xlCov_other');
          xlOth_append(che,ret_uot);
        } 

        if (ret_obj["uebl"]) {
          ret_uebl = [];
          if (ret_obj["uebl"].length > 0) {
            ret_uebl = ret_obj['uebl'];
          }
          $('.xlCov_ebl').prop('checked', true);
          che = $('.xlCov_ebl');
          xlEbl_append(che, ret_uebl);
        }
        if (ret_obj["ull"]) {
          ret_ull = [];
          if (ret_obj["ull"].length > 0) {
            ret_ull = ret_obj['ull'];
          }
          $('.xlCov_ll').prop('checked', true);
          che = $('.xlCov_ll');
          xlLL_append(che, ret_ull, 1);
        }
        if (ret_obj["ugl"]) {
          ret_ugl = [];
          if (ret_obj["ugl"].length > 0) {
            ret_ugl = ret_obj['ugl'];
            xl_ugl_retrieve(ret_ugl);
          }
        } else {
          $('.xlCov_gl').prop('checked', false);
          $('#xlUgl_div').html('');
        }
      },
      complete:function(){
        $('#coverageLimit_sec').attr('data_coverage_retrieved', 1);
      }
    })
  } catch (err) {
    console.log(err);
  }
}

$(document).on('click', '.usg_head', function () {

  usg_tabid = $(this).closest('.usgAccor').attr('data-usg_randamid');
  var acc_retrieve = $("[data-usg_randamid=" + usg_tabid + "]").attr('data-retrieve');
  if (acc_retrieve != 1) {
    xl_get_usg(com_id, usg_tabid);
    $("[data-usg_randamid=" + usg_tabid + "]").attr('data-retrieve', 1)
  }
  covAddBtn_toggle($(this), 'Usg' , 'usg_head');
});

$(document).on('click', '.uex_head', function() {
  var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
  rid=$(this).closest('.uexAccor').attr('data-rid');
  var retreive_excess =  $("[data-rid="+rid+"]").attr('data-retreiveexcess');
  if (retreive_excess != 1) {
    xl_get_uex(com_id,rid,acct_id);
    $("[data-rid="+rid+"]").attr('data-retreiveexcess', 1);
  }
  covAddBtn_toggle($(this), 'Uex' , 'uex_head');
});

$(document).on('click', '.uel_head', function() {
  var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
  rid=$(this).closest('.uelAccor').attr('data-rid');
  var retreive_el =  $("[data-rid="+rid+"]").attr('data-retreiveel');
  if (retreive_el != 1) {
    xl_get_uel(com_id,rid, acct_id);
    $("[data-rid="+rid+"]").attr('data-retreiveel', 1);
  }
  covAddBtn_toggle($(this), 'Uel' , 'uel_head');

});



function xl_get_usg(com_id, usg_tabid) {
  try {
    $.ajax({
      url: laravel_url + "/xl_get_usg",
      type: 'post',
      data: { com_id: com_id, rid: usg_tabid },
      success: function (response) {
        if (response != '') {
          if (response[0]['effective_date'] != null) {
            var date_time = response[0]['effective_date'].split(' ');
            var effec_split = date_time[0].split('-');
            var effective_date = effec_split[1] + '-' + effec_split[2] + '-' + effec_split[0];
          }
          if (response[0]['expiration_date'] != null) {
            var date_time = response[0]['expiration_date'].split(' ');
            var expir_split = date_time[0].split('-');
            var expiry_date = expir_split[1] + '-' + expir_split[2] + '-' + expir_split[0];
          }
          usg_company = response[0]['company'];
          usg_policy_number = response[0]['policy_number'];
          usg_effec_date = effective_date;
          usg_expiry_date = expiry_date;
          usg_premium = response[0]['stopgap_premium'] != null ? parseInt(response[0]['stopgap_premium']).toLocaleString() : response[0]['stopgap_premium'];
          biba_accident = response[0]['biba_accident'];
          biba_accident_other = response[0]['biba_accident_other'];
          bibd_employee = response[0]['bibd_employee'];
          bibd_employee_other = response[0]['bibd_employee_other'];
          bida_limit = response[0]['bida_limit'];
          bida_limit_other = response[0]['bida_limit_other'];
          usg_state = response[0]['state'];

          $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_company').val(usg_company);
          $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_policyNo').val(usg_policy_number);
          $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_effectDt').datepicker('update', usg_effec_date)
          $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_expDt').datepicker('update', usg_expiry_date);
          $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_ulPremium').val(usg_premium);

          if (biba_accident == 'other') {
            if (biba_accident_other != null) {
              biba_accident_other1 = parseInt(biba_accident_other).toLocaleString();
            } else {
              biba_accident_other1 = '';
            }

            $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_acci').val(biba_accident).change();
            $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_acci_other').val(biba_accident_other1);
          } else {
            $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_acci').val(biba_accident).prop("selected", true);
          }

          if (bibd_employee == 'other') {
            if (bibd_employee_other != null) {
              bibd_employee_other1 = parseInt(bibd_employee_other).toLocaleString();
            } else {
              bibd_employee_other1 = '';
            }

            $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_disEmp').val(bibd_employee).change();
            $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_disEmp_other').val(bibd_employee_other1);
          } else {
            $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_disEmp').val(bibd_employee).prop("selected", true);
          }

          if (bida_limit == 'other') {
            if (bida_limit_other != null) {
              bida_limit_other1 = parseInt(bida_limit_other).toLocaleString();
            } else {
              bida_limit_other1 = '';
            }

            $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_AggreLt').val(bida_limit).change();
            $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_AggreLt_other').val(bida_limit_other1);
          } else {
            $("[data-usg_randamid=" + usg_tabid + "]").find('.usg_AggreLt').val(bida_limit).prop("selected", true);
          }

          if (usg_state != null) {
            usg_state = usg_state.split(",");
            for (i = 0; i < usg_state.length; i++) {
              $("[data-usg_randamid=" + usg_tabid + "]").find(".usg_stat").multiselect('select', usg_state[i]);
            }
          }

        }
      }
    });
} catch (err) {
  console.log(err);
}


}

$(document).on('click', '.uca_head', function () {
  uca_tabid = $(this).closest('.ucaAccor').attr('data-uca_randamid');
  var acc_retrieve = $("[data-uca_randamid=" + uca_tabid + "]").attr('data-retrieve');
  if (acc_retrieve != 1) {
    xl_get_uca(com_id, uca_tabid);
    $("[data-uca_randamid=" + uca_tabid + "]").attr('data-retrieve', 1)
  }
  covAddBtn_toggle($(this), 'Uca' , 'uca_head');   

});

function xl_get_uca(com_id, uca_tabid) {
  try {
    $.ajax({
      url: laravel_url + "/xl_get_uca",
      type: 'post',
      data: { com_id: com_id, rid: uca_tabid },
      success: function (response) {

        if (response != '') {
          uca_total_premium = 0;
          $.each(response, function (key, value) {
            uca_total_premium = uca_total_premium + value['total_premium'];
            if (value['effective_date'] != null) {
              var date_time = value['effective_date'].split(' ');
              var effec_split = date_time[0].split('-');
              var effective_date = effec_split[1] + '-' + effec_split[2] + '-' + effec_split[0];
            }
            if (value['expiration_date'] != null) {
              var date_time = value['expiration_date'].split(' ');
              var expir_split = date_time[0].split('-');
              var expiry_date = expir_split[1] + '-' + expir_split[2] + '-' + expir_split[0];
            }
            uca_company = value['company'];
            uca_policy_number = value['policy_number'];
            uca_effec_date = effective_date;
            uca_expiry_date = expiry_date;
            uca_premium = value['other_ulca_premium'] != null ? parseInt(value['other_ulca_premium']).toLocaleString() : value['other_ulca_premium'];
            combined_single_limit = value['combined_single_limit'];
            combined_single_limit_other = value['combined_single_limit_other'];


            $("[data-uca_randamid=" + uca_tabid + "]").find('.uca_company').val(uca_company);
            $("[data-uca_randamid=" + uca_tabid + "]").find('.uca_policyNo').val(uca_policy_number);
            $("[data-uca_randamid=" + uca_tabid + "]").find('.uca_effectDt').datepicker('update', uca_effec_date)
            $("[data-uca_randamid=" + uca_tabid + "]").find('.uca_expDt').datepicker('update', uca_expiry_date);
            $("[data-uca_randamid=" + uca_tabid + "]").find('.comAutoPremium').val(uca_premium);

            if (combined_single_limit == 'other') {
              if (combined_single_limit_other != null) {
                combined_single_limit_other1 = parseInt(combined_single_limit_other).toLocaleString();
              } else {
                combined_single_limit_other1 = '';
              }
              $("[data-uca_randamid=" + uca_tabid + "]").find('.uca_combLt').val(combined_single_limit).change();
              $("[data-uca_randamid=" + uca_tabid + "]").find('.uca_combLt_other').val(combined_single_limit_other1);
            } else {
              $("[data-uca_randamid=" + uca_tabid + "]").find('.uca_combLt').val(combined_single_limit).prop("selected", true);
            }

            if (value['actual_premium'] != null) {
              value['actual_premium'] = parseInt(value['actual_premium']).toLocaleString();
            } else {
              value['actual_premium'] = '';
            }

            if (value['total_premium'] != null) {
              value['total_premium'] = parseInt(value['total_premium']).toLocaleString();
            } else {
              value['total_premium'] = '';
            }


            if (value['is_user_desc'] != 1) {
              if (value['vehicle_name'] == 'Private Passenger') {
                $("[data-uca_randamid=" + uca_tabid + "]").find('.xl_private_pass').attr('data-private_pass', value['id']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.privatePass_act').val(value['actual_premium']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.privatePass_count').val(value['number_of_vehicles']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.privatePass_prem').val(value['total_premium']);
              } else if (value['vehicle_name'] == 'Light Truck') {
                $("[data-uca_randamid=" + uca_tabid + "]").find('.xl_light_truck').attr('data-light_truck', value['id']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.ltTruct_act').val(value['actual_premium']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.ltTruct_count').val(value['number_of_vehicles']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.ltTruct_prem').val(value['total_premium']);
              } else if (value['vehicle_name'] == 'Medium Truck') {
                $("[data-uca_randamid=" + uca_tabid + "]").find('.xl_medium_truck').attr('data-medium_truck', value['id']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.mdTruct_act').val(value['actual_premium']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.mdTruct_count').val(value['number_of_vehicles']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.mdTruct_prem').val(value['total_premium']);
              } else if (value['vehicle_name'] == 'Heavy Truck') {
                $("[data-uca_randamid=" + uca_tabid + "]").find('.xl_heavy_truck').attr('data-heavy_truck', value['id']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.hvyTruct_act').val(value['actual_premium']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.hvyTruct_count').val(value['number_of_vehicles']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.hvyTruct_prem').val(value['total_premium']);
              } else if (value['vehicle_name'] == 'Extra Heavy Truck') {
                $("[data-uca_randamid=" + uca_tabid + "]").find('.xl_exheavy_truck').attr('data-exheavy_truck', value['id']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.ExhvyTruct_act').val(value['actual_premium']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.ExhvyTruct_count').val(value['number_of_vehicles']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.ExhvyTruct_prem').val(value['total_premium']);
              } else if (value['vehicle_name'] == 'Tractor') {
                $("[data-uca_randamid=" + uca_tabid + "]").find('.xl_tractor').attr('data-tractor', value['id']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.trackor_act').val(value['actual_premium']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.trackor_count').val(value['number_of_vehicles']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.trackor_prem').val(value['total_premium']);
              } else {
                $("[data-uca_randamid=" + uca_tabid + "]").find('.xl_bus').attr('data-bus', value['id']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.bus_act').val(value['actual_premium']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.bus_count').val(value['number_of_vehicles']);
                $("[data-uca_randamid=" + uca_tabid + "]").find('.bus_prem').val(value['total_premium']);
              }
            } else {
              $("[data-uca_randamid=" + uca_tabid + "]").find('.xl_ownVechi').attr('data-ownVechi', value['id']);
              $("[data-uca_randamid=" + uca_tabid + "]").find('.ownVechi_desc').val(value['vehicle_name']);
              $("[data-uca_randamid=" + uca_tabid + "]").find('.ownVechi_act').val(value['actual_premium']);
              $("[data-uca_randamid=" + uca_tabid + "]").find('.ownVechi_count').val(value['number_of_vehicles']);
              $("[data-uca_randamid=" + uca_tabid + "]").find('.ownVechi_prem').val(value['total_premium']);
            }

          });
$("[data-uca_randamid=" + uca_tabid + "]").find('.fleetBreak_Totalprem').val(uca_total_premium.toLocaleString());
}
}
});
} catch (err) {
  console.log(err);
}


}

function xl_get_uex(com_id,rid,acct_id){
  try {
    $.ajax({
      url: laravel_url + "/xl_get_uex",
      type: 'post',
      data: {com_id:com_id, rid:rid, acct_id : acct_id},
      success: function (response) { 
        if (response != '') {
          $.each(response, function (key, value) {
            if (response[0]['effective_date'] != null) {
              var date_time = response[0]['effective_date'].split(' ');
              var effec_split = date_time[0].split('-');
              var effective_date = effec_split[1] + '-' + effec_split[2] + '-' + effec_split[0];
            }
            if (response[0]['expiration_date'] != null) {
              var date_time = response[0]['expiration_date'].split(' ');
              var expir_split = date_time[0].split('-');
              var expiry_date = expir_split[1] + '-' + expir_split[2] + '-' + expir_split[0];
            }
            if (response[0]['liability_type'] == 1) {
              $(".uex_liabType_lead").prop("checked", true);
              $(".uex_liabType_umb").prop("checked", false)
            }
            if (response[0]['liability_type'] == 2) {
              $(".uex_liabType_lead").prop("checked", false);
              $(".uex_liabType_umb").prop("checked", true)

            }
            var uex_company = response[0]['company'];
            var uex_policy_number = response[0]['policy_number'];
            var uex_effec_date = effective_date;
            var uex_expiry_date = expiry_date;
            var other_ul_excess_premium = response[0]['other_ul_excess_premium'] != null ? parseInt(response[0]['other_ul_excess_premium']).toLocaleString() : response[0]['other_ul_excess_premium'];
            var limit_of_insurance = response[0]['limit_of_insurance'];
            var limit_of_insurance_other = response[0]['limit_of_insurance_other'];
            var underlying_limits = response[0]['underlying_limits'];
            var underlying_limits_other = response[0]['underlying_limits_other'];


            $("[data-rid=" + rid + "]").find('.uex_company').val(uex_company);
            $("[data-rid=" + rid + "]").find('.uex_policyNo').val(uex_policy_number);
            $("[data-rid=" + rid + "]").find('.uex_effectDt').datepicker('update', uex_effec_date)
            $("[data-rid=" + rid + "]").find('.uex_expDt').datepicker('update', uex_expiry_date);
            $("[data-rid=" + rid + "]").find('.uex_ulPremium').val(other_ul_excess_premium);

            if (limit_of_insurance == 'other') {
              if (limit_of_insurance_other != null) {
                var limit_of_insurance_other1 = parseInt(limit_of_insurance_other).toLocaleString();
              } else {
                var limit_of_insurance_other1 = '';
              }

              $("[data-rid="+rid+"]").find('.uex_insur').val(limit_of_insurance).change();
              $("[data-rid="+rid+"]").find('.uex_insur_other').val(limit_of_insurance_other1);
            } else if (limit_of_insurance == null) {
              $("[data-rid="+rid+"]").find('.uex_insur').val(0).prop("selected",true);
            } else {
              $("[data-rid=" + rid + "]").find('.uex_insur').val(limit_of_insurance).prop("selected", true);
            }

            if (underlying_limits == 'other') {
              if (underlying_limits_other != null) {
                var underlying_limits_other1 = parseInt(underlying_limits_other).toLocaleString();
              } else {
                var underlying_limits_other1 = '';
              }

              $("[data-rid="+rid+"]").find('.uex_underLt').val(underlying_limits).change();
              $("[data-rid="+rid+"]").find('.uex_underLt_other').val(underlying_limits_other1);
            } else if (underlying_limits == null) {
              $("[data-rid="+rid+"]").find('.uex_underLt').val(0).prop("selected",true);
            } else {
              $("[data-rid=" + rid + "]").find('.uex_underLt').val(underlying_limits).prop("selected", true);
            }


          })
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
}





function xl_get_uel(com_id,rid, acct_id){
  try {
    $.ajax({
      url: laravel_url + "/xl_get_uel",
      type: 'post',
      data: {com_id:com_id, rid:rid, acct_id : acct_id},
      success: function (response) {    
        if (response != '') {
          $.each(response, function (key, value) {
            if (response[0]['effective_date'] != null) {
              var date_time = response[0]['effective_date'].split(' ');
              var effec_split = date_time[0].split('-');
              var effective_date = effec_split[1] + '-' + effec_split[2] + '-' + effec_split[0];
            }
            if (response[0]['expiration_date'] != null) {
              var date_time = response[0]['expiration_date'].split(' ');
              var expir_split = date_time[0].split('-');
              var expiry_date = expir_split[1] + '-' + expir_split[2] + '-' + expir_split[0];
            }

            var uel_company = response[0]['company'];
            var uel_policy_number = response[0]['policy_number'];
            var uel_effec_date = effective_date;
            var uel_expiry_date = expiry_date;
            var ul_employers_liability_premium = response[0]['ul_employers_liability_premium'] != null ? parseInt(response[0]['ul_employers_liability_premium']).toLocaleString() : response[0]['ul_employers_liability_premium'];
            var bodily_injury_each_accident = response[0]['bodily_injury_each_accident'];
            var bodily_injury_each_accident_other = response[0]['bodily_injury_each_accident_other'];
            var bodily_injury_policy_limit = response[0]['bodily_injury_policy_limit'];
            var bodily_injury_policy_limit_other = response[0]['bodily_injury_policy_limit_other'];
            var bodily_injury_each_employee = response[0]['bodily_injury_each_employee'];
            var bodily_injury_each_employee_other = response[0]['bodily_injury_each_employee_other'];



            $("[data-rid=" + rid + "]").find('.uel_company').val(uel_company);
            $("[data-rid=" + rid + "]").find('.uel_policyNo').val(uel_policy_number);
            $("[data-rid=" + rid + "]").find('.uel_effectDt').datepicker('update', uel_effec_date)
            $("[data-rid=" + rid + "]").find('.uel_expDt').datepicker('update', uel_expiry_date);
            $("[data-rid=" + rid + "]").find('.uel_empPremium').val(ul_employers_liability_premium);

            if (bodily_injury_each_accident == 'other') {
              if (bodily_injury_each_accident_other != null) {
                var bodily_injury_each_accident_other1 = parseInt(bodily_injury_each_accident_other).toLocaleString();
              } else {
                var bodily_injury_each_accident_other1 = '';
              }

              $("[data-rid=" + rid + "]").find('.uel_acci').val(bodily_injury_each_accident).change();
              $("[data-rid=" + rid + "]").find('.uel_acci_other').val(bodily_injury_each_accident_other1);
            } else {
              $("[data-rid=" + rid + "]").find('.uel_acci').val(bodily_injury_each_accident).prop("selected", true);
            }

            if (bodily_injury_policy_limit == 'other') {
              if (bodily_injury_policy_limit_other != null) {
                var bodily_injury_policy_limit_other1 = parseInt(bodily_injury_policy_limit_other).toLocaleString();
              } else {
                var bodily_injury_policy_limit_other1 = '';
              }

              $("[data-rid=" + rid + "]").find('.uel_disLt').val(bodily_injury_policy_limit).change();
              $("[data-rid=" + rid + "]").find('.uel_disLt_other').val(bodily_injury_policy_limit_other1);
            } else {
              $("[data-rid=" + rid + "]").find('.uel_disLt').val(bodily_injury_policy_limit).prop("selected", true);
            }

            if (bodily_injury_each_employee == 'other') {
              if (bodily_injury_each_employee_other != null) {
                var bodily_injury_each_employee_other1 = parseInt(bodily_injury_each_employee_other).toLocaleString();
              } else {
                var bodily_injury_each_employee_other1 = '';
              }

              $("[data-rid=" + rid + "]").find('.uel_empDis').val(bodily_injury_each_employee).change();
              $("[data-rid=" + rid + "]").find('.uel_empDis_other').val(bodily_injury_each_employee_other1);
            } else {
              $("[data-rid=" + rid + "]").find('.uel_empDis').val(bodily_injury_each_employee).prop("selected", true);
            }


          })
}
}
});
} catch (err) {
  console.log(err);
}


}



// employee benefits liability
$(document).on('click', '.uebl_head', function () {

  rid = $(this).closest('.ueblAccor').data("rid");
  var retreive_ebl = $("[data-rid=" + rid + "]").attr('data-retreiveuebl');
  if (retreive_ebl != 1) {
    xl_get_uebl(com_id, rid);
    $("[data-rid=" + rid + "]").attr('data-retreiveuebl', 1);
  }
  covAddBtn_toggle($(this), 'Uebl' , 'uebl_head');

});


function xl_get_uebl(com_id, rid) {
  try {
    $.ajax({
      url: laravel_url + "/xl_get_uebl",
      type: 'post',
      data: { com_id: com_id, rid: rid },
      success: function (response) {
        if (response != '') {
          if (response[0]['effective_date'] != null) {
            var date_time = response[0]['effective_date'].split(' ');
            var effec_split = date_time[0].split('-');
            var effective_date = effec_split[1] + '-' + effec_split[2] + '-' + effec_split[0];
          }
          if (response[0]['expiration_date'] != null) {
            var date_time = response[0]['expiration_date'].split(' ');
            var expir_split = date_time[0].split('-');
            var expiry_date = expir_split[1] + '-' + expir_split[2] + '-' + expir_split[0];
          }
          uebl_company = response[0]['company'];
          uebl_policy_number = response[0]['policy_number'];
          uex_effec_date = effective_date;
          uex_expiry_date = expiry_date;
          uebl_emp_premium = response[0]['uebl_emp_premium'] != null ? parseInt(response[0]['uebl_emp_premium']).toLocaleString() : response[0]['uebl_emp_premium'];
          uebl_eachEmpLt = response[0]['uebl_eachEmpLt'];
          uebl_eachEmpLt_other = response[0]['uebl_eachEmpLt_other'];
          uebl_aggreLt = response[0]['uebl_aggreLt'];
          uebl_aggreLt_other = response[0]['uebl_aggreLt_other'];


          $("[data-rid=" + rid + "]").find('.uebl_company').val(uebl_company);
          $("[data-rid=" + rid + "]").find('.uebl_policyNo').val(uebl_policy_number);
          $("[data-rid=" + rid + "]").find('.uebl_effectDt').datepicker('update', uex_effec_date)
          $("[data-rid=" + rid + "]").find('.uebl_expDt').datepicker('update', uex_expiry_date);
          $("[data-rid=" + rid + "]").find('.uebl_empPremium').val(uebl_emp_premium);
          if (uebl_eachEmpLt != null) {
            if (uebl_eachEmpLt == 'other') {
              if (uebl_eachEmpLt_other != null) {
                uebl_eachEmpLt_other1 = parseInt(uebl_eachEmpLt_other).toLocaleString();
              } else {
                uebl_eachEmpLt_other1 = '';
              }

              $("[data-rid=" + rid + "]").find('.uebl_eachEmpLt').val(uebl_eachEmpLt).change();
              $("[data-rid=" + rid + "]").find('.uebl_eachEmpLt_other').val(uebl_eachEmpLt_other1);
            } else {
              $("[data-rid=" + rid + "]").find('.uebl_eachEmpLt').val(uebl_eachEmpLt).prop("selected", true);
            }
        } else {
          $("[data-rid=" + rid + "]").find('.uebl_eachEmpLt').val('1000000').prop("selected", true);
        }
        if (uebl_aggreLt != null) {
          if (uebl_aggreLt == 'other') {
            if (uebl_aggreLt_other != null) {
              uebl_aggreLt_other1 = parseInt(uebl_aggreLt_other).toLocaleString();
            } else {
              uebl_aggreLt_other1 = '';
            }

            $("[data-rid=" + rid + "]").find('.uebl_aggreLt').val(uebl_aggreLt).change();
            $("[data-rid=" + rid + "]").find('.uebl_aggreLt_other').val(uebl_aggreLt_other1);
          } else {
            $("[data-rid=" + rid + "]").find('.uebl_aggreLt').val(uebl_aggreLt).prop("selected", true);
          }
        } else {
          $("[data-rid=" + rid + "]").find('.uebl_aggreLt').val('1000000').prop("selected", true);
        }


        }
      }
    });
  } catch (err) {
    console.log(err);
  }


}


function clear_coverages(quotashare){ 
  if(quotashare == 1 ){  
    $(".xlQuoteTable").attr('data-retreivequota', 0);
    get_quotashare(com_id); 
  }
  $('.xlCov_auto').prop('checked',false);
  $('#xlUca_div').html(''); 

  $('.xlCov_exces').prop('checked',false);
  $('#xlexces_div').html(''); 

  $('.xlCov_ebl').prop('checked',false);
  $('#xlUebl_div').html(''); 

  $('.xlCov_el').prop('checked',false);
  $('#xlUel_div').html(''); 

  $('.xlCov_ll').prop('checked',false);
  $('#xlUll_div').html('');

  $('.xlCov_StopGap').prop('checked',false);
  $('#xlstopGap_div').html(''); 

  $('.xlCov_other').prop('checked',false);
  $('#xlother_div').html(''); 
}