function data_to_html(data) {
  document.querySelector("#LEVEL").value = data.LEVEL.toString();
  document.querySelector("#ATTACK").value = data.ATTACK.toString();
  document.querySelector("#MULTI").value = data.MULTI.toString();
  document.querySelector("#HITS").value = data.HITS.toString();
  document.querySelector("#ATTACK_BUFF_1").value = data.ATTACK_BUFF_1.toString();
  document.querySelector("#ATTACK_BUFF_2").value = data.ATTACK_BUFF_2.toString();
  document.querySelector("#ATTACK_BUFF_3").value = data.ATTACK_BUFF_3.toString();
  document.querySelector("#ATTACK_BUFF_4").value = data.ATTACK_BUFF_4.toString();
  document.querySelector("#ATTACK_BUFF_5").value = data.ATTACK_BUFF_5.toString();
  document.querySelector("#ATTACK_DEBUFF_1").value = data.ATTACK_DEBUFF_1.toString();
  document.querySelector("#ATTACK_DEBUFF_2").value = data.ATTACK_DEBUFF_2.toString();
  document.querySelector("#ATTACK_DEBUFF_3").value = data.ATTACK_DEBUFF_3.toString();
  document.querySelector("#ATTACK_DEBUFF_4").value = data.ATTACK_DEBUFF_4.toString();
  document.querySelector("#ATTACK_DEBUFF_5").value = data.ATTACK_DEBUFF_5.toString();
  document.querySelector("#DEFENCE").value = data.DEFENCE.toString();
  document.querySelector("#DEFENCE_BUFF_1").value = data.DEFENCE_BUFF_1.toString();
  document.querySelector("#DEFENCE_BUFF_2").value = data.DEFENCE_BUFF_2.toString();
  document.querySelector("#DEFENCE_BUFF_3").value = data.DEFENCE_BUFF_3.toString();
  document.querySelector("#DEFENCE_BUFF_4").value = data.DEFENCE_BUFF_4.toString();
  document.querySelector("#DEFENCE_BUFF_5").value = data.DEFENCE_BUFF_5.toString();
  document.querySelector("#DEFENCE_DEBUFF_1").value = data.DEFENCE_DEBUFF_1.toString();
  document.querySelector("#DEFENCE_DEBUFF_2").value = data.DEFENCE_DEBUFF_2.toString();
  document.querySelector("#DEFENCE_DEBUFF_3").value = data.DEFENCE_DEBUFF_3.toString();
  document.querySelector("#DEFENCE_DEBUFF_4").value = data.DEFENCE_DEBUFF_4.toString();
  document.querySelector("#DEFENCE_DEBUFF_5").value = data.DEFENCE_DEBUFF_5.toString();
  document.querySelector("#PHOTON").value = data.PHOTON.toString();
  document.querySelector("#CLASS").value = data.CLASS.toString();
  document.querySelector("#BOOST_1_1").value = data.BOOST_1_1.toString();
  document.querySelector("#BOOST_1_2").value = data.BOOST_1_2.toString();
  document.querySelector("#BOOST_1_3").value = data.BOOST_1_3.toString();
  document.querySelector("#BOOST_1_4").value = data.BOOST_1_4.toString();
  document.querySelector("#BOOST_1_5").value = data.BOOST_1_5.toString();
  document.querySelector("#BOOST_2_1").value = data.BOOST_2_1.toString();
  document.querySelector("#BOOST_2_2").value = data.BOOST_2_2.toString();
  document.querySelector("#BOOST_2_3").value = data.BOOST_2_3.toString();
  document.querySelector("#BOOST_2_4").value = data.BOOST_2_4.toString();
  document.querySelector("#BOOST_2_5").value = data.BOOST_2_5.toString();
  document.querySelector("#BOOST_3_1").value = data.BOOST_3_1.toString();
  document.querySelector("#BOOST_3_2").value = data.BOOST_3_2.toString();
  document.querySelector("#BOOST_3_3").value = data.BOOST_3_3.toString();
  document.querySelector("#BOOST_3_4").value = data.BOOST_3_4.toString();
  document.querySelector("#BOOST_3_5").value = data.BOOST_3_5.toString();
  document.querySelector("#BOOST_4_1").value = data.BOOST_4_1.toString();
  document.querySelector("#BOOST_4_2").value = data.BOOST_4_2.toString();
  document.querySelector("#BOOST_4_3").value = data.BOOST_4_3.toString();
  document.querySelector("#BOOST_4_4").value = data.BOOST_4_4.toString();
  document.querySelector("#BOOST_4_5").value = data.BOOST_4_5.toString();
  document.querySelector("#BOOST_5_1").value = data.BOOST_5_1.toString();
  document.querySelector("#BOOST_5_2").value = data.BOOST_5_2.toString();
  document.querySelector("#BOOST_5_3").value = data.BOOST_5_3.toString();
  document.querySelector("#BOOST_5_4").value = data.BOOST_5_4.toString();
  document.querySelector("#BOOST_5_5").value = data.BOOST_5_5.toString();
  document.querySelector("#BOOST_6_1").value = data.BOOST_6_1.toString();
  document.querySelector("#BOOST_6_2").value = data.BOOST_6_2.toString();
  document.querySelector("#BOOST_6_3").value = data.BOOST_6_3.toString();
  document.querySelector("#BOOST_6_4").value = data.BOOST_6_4.toString();
  document.querySelector("#BOOST_6_5").value = data.BOOST_6_5.toString();
  document.querySelector("#BOOST_7").value = data.BOOST_7.toString();
  document.querySelector("#REDUCE_1").value = data.REDUCE_1.toString();
  document.querySelector("#REDUCE_2").value = data.REDUCE_2.toString();
  document.querySelector("#REDUCE_3").value = data.REDUCE_3.toString();
  document.querySelector("#REDUCE_4").value = data.REDUCE_4.toString();
  document.querySelector("#REDUCE_5").value = data.REDUCE_5.toString();
  document.querySelector("#FIX_DAMAGE").value = data.FIX_DAMAGE.toString();
  document.querySelector("#TENKETSU").value = data.TENKETSU.toString();
  document.querySelector("#BLOCK_HP").value = data.BLOCK_HP.toString();
  document.querySelector("#BLOCK_RATE").value = data.BLOCK_RATE.toString();
}

function html_to_data(data) {
  data.LEVEL = parseInt(document.querySelector("#LEVEL").value);
  data.ATTACK = parseInt(document.querySelector("#ATTACK").value);
  data.MULTI = parseFloat(document.querySelector("#MULTI").value);
  data.HITS = parseInt(document.querySelector("#HITS").value);
  data.ATTACK_BUFF_1 = parseFloat(document.querySelector("#ATTACK_BUFF_1").value);
  data.ATTACK_BUFF_2 = parseFloat(document.querySelector("#ATTACK_BUFF_2").value);
  data.ATTACK_BUFF_3 = parseFloat(document.querySelector("#ATTACK_BUFF_3").value);
  data.ATTACK_BUFF_4 = parseFloat(document.querySelector("#ATTACK_BUFF_4").value);
  data.ATTACK_BUFF_5 = parseFloat(document.querySelector("#ATTACK_BUFF_5").value);
  data.ATTACK_DEBUFF_1 = parseFloat(document.querySelector("#ATTACK_DEBUFF_1").value);
  data.ATTACK_DEBUFF_2 = parseFloat(document.querySelector("#ATTACK_DEBUFF_2").value);
  data.ATTACK_DEBUFF_3 = parseFloat(document.querySelector("#ATTACK_DEBUFF_3").value);
  data.ATTACK_DEBUFF_4 = parseFloat(document.querySelector("#ATTACK_DEBUFF_4").value);
  data.ATTACK_DEBUFF_5 = parseFloat(document.querySelector("#ATTACK_DEBUFF_5").value);
  data.DEFENCE = parseInt(document.querySelector("#DEFENCE").value);
  data.DEFENCE_BUFF_1 = parseFloat(document.querySelector("#DEFENCE_BUFF_1").value);
  data.DEFENCE_BUFF_2 = parseFloat(document.querySelector("#DEFENCE_BUFF_2").value);
  data.DEFENCE_BUFF_3 = parseFloat(document.querySelector("#DEFENCE_BUFF_3").value);
  data.DEFENCE_BUFF_4 = parseFloat(document.querySelector("#DEFENCE_BUFF_4").value);
  data.DEFENCE_BUFF_5 = parseFloat(document.querySelector("#DEFENCE_BUFF_5").value);
  data.DEFENCE_DEBUFF_1 = parseFloat(document.querySelector("#DEFENCE_DEBUFF_1").value);
  data.DEFENCE_DEBUFF_2 = parseFloat(document.querySelector("#DEFENCE_DEBUFF_2").value);
  data.DEFENCE_DEBUFF_3 = parseFloat(document.querySelector("#DEFENCE_DEBUFF_3").value);
  data.DEFENCE_DEBUFF_4 = parseFloat(document.querySelector("#DEFENCE_DEBUFF_4").value);
  data.DEFENCE_DEBUFF_5 = parseFloat(document.querySelector("#DEFENCE_DEBUFF_5").value);
  data.PHOTON = parseFloat(document.querySelector("#PHOTON").value);
  data.CLASS = parseFloat(document.querySelector("#CLASS").value);
  data.BOOST_1_1 = parseFloat(document.querySelector("#BOOST_1_1").value);
  data.BOOST_1_2 = parseFloat(document.querySelector("#BOOST_1_2").value);
  data.BOOST_1_3 = parseFloat(document.querySelector("#BOOST_1_3").value);
  data.BOOST_1_4 = parseFloat(document.querySelector("#BOOST_1_4").value);
  data.BOOST_1_5 = parseFloat(document.querySelector("#BOOST_1_5").value);
  data.BOOST_2_1 = parseFloat(document.querySelector("#BOOST_2_1").value);
  data.BOOST_2_2 = parseFloat(document.querySelector("#BOOST_2_2").value);
  data.BOOST_2_3 = parseFloat(document.querySelector("#BOOST_2_3").value);
  data.BOOST_2_4 = parseFloat(document.querySelector("#BOOST_2_4").value);
  data.BOOST_2_5 = parseFloat(document.querySelector("#BOOST_2_5").value);
  data.BOOST_3_1 = parseFloat(document.querySelector("#BOOST_3_1").value);
  data.BOOST_3_2 = parseFloat(document.querySelector("#BOOST_3_2").value);
  data.BOOST_3_3 = parseFloat(document.querySelector("#BOOST_3_3").value);
  data.BOOST_3_4 = parseFloat(document.querySelector("#BOOST_3_4").value);
  data.BOOST_3_5 = parseFloat(document.querySelector("#BOOST_3_5").value);
  data.BOOST_4_1 = parseFloat(document.querySelector("#BOOST_4_1").value);
  data.BOOST_4_2 = parseFloat(document.querySelector("#BOOST_4_2").value);
  data.BOOST_4_3 = parseFloat(document.querySelector("#BOOST_4_3").value);
  data.BOOST_4_4 = parseFloat(document.querySelector("#BOOST_4_4").value);
  data.BOOST_4_5 = parseFloat(document.querySelector("#BOOST_4_5").value);
  data.BOOST_5_1 = parseFloat(document.querySelector("#BOOST_5_1").value);
  data.BOOST_5_2 = parseFloat(document.querySelector("#BOOST_5_2").value);
  data.BOOST_5_3 = parseFloat(document.querySelector("#BOOST_5_3").value);
  data.BOOST_5_4 = parseFloat(document.querySelector("#BOOST_5_4").value);
  data.BOOST_5_5 = parseFloat(document.querySelector("#BOOST_5_5").value);
  data.BOOST_6_1 = parseFloat(document.querySelector("#BOOST_6_1").value);
  data.BOOST_6_2 = parseFloat(document.querySelector("#BOOST_6_2").value);
  data.BOOST_6_3 = parseFloat(document.querySelector("#BOOST_6_3").value);
  data.BOOST_6_4 = parseFloat(document.querySelector("#BOOST_6_4").value);
  data.BOOST_6_5 = parseFloat(document.querySelector("#BOOST_6_5").value);
  data.BOOST_7 = parseFloat(document.querySelector("#BOOST_7").value);
  data.REDUCE_1 = parseFloat(document.querySelector("#REDUCE_1").value);
  data.REDUCE_2 = parseFloat(document.querySelector("#REDUCE_2").value);
  data.REDUCE_3 = parseFloat(document.querySelector("#REDUCE_3").value);
  data.REDUCE_4 = parseFloat(document.querySelector("#REDUCE_4").value);
  data.REDUCE_5 = parseFloat(document.querySelector("#REDUCE_5").value);
  data.FIX_DAMAGE = parseInt(document.querySelector("#FIX_DAMAGE").value);
  data.TENKETSU = parseInt(document.querySelector("#TENKETSU").value);
  data.BLOCK_HP = parseInt(document.querySelector("#BLOCK_HP").value);
  data.BLOCK_RATE = parseFloat(document.querySelector("#BLOCK_RATE").value);
}

function calculate(data) {
  var attack_buff = (
      data.ATTACK_BUFF_1/100
    + data.ATTACK_BUFF_2/100
    + data.ATTACK_BUFF_3/100
    + data.ATTACK_BUFF_4/100
    + data.ATTACK_BUFF_5/100);
  var attack_debuff = (1
    - (1-data.ATTACK_DEBUFF_1/100)
    * (1-data.ATTACK_DEBUFF_2/100)
    * (1-data.ATTACK_DEBUFF_3/100)
    * (1-data.ATTACK_DEBUFF_4/100)
    * (1-data.ATTACK_DEBUFF_5/100));
  var attack_temp = data.ATTACK * data.MULTI * (1+attack_buff) * (1-attack_debuff);
  if (attack_temp <= 0) {
    attack_temp = 0;
  }
  
  var defence_buff = (
      data.DEFENCE_BUFF_1/100
    + data.DEFENCE_BUFF_2/100
    + data.DEFENCE_BUFF_3/100
    + data.DEFENCE_BUFF_4/100
    + data.DEFENCE_BUFF_5/100);
  var defence_debuff = (
      data.DEFENCE_DEBUFF_1/100
    + data.DEFENCE_DEBUFF_2/100
    + data.DEFENCE_DEBUFF_3/100
    + data.DEFENCE_DEBUFF_4/100
    + data.DEFENCE_DEBUFF_5/100);
  var defence_temp = data.DEFENCE * (1+defence_buff) * (1-defence_debuff)
  if (defence_temp <= 0) {
    defence_temp = 0;
  }
  
  var attack_defence = (attack_temp - defence_temp);
  if (attack_defence <= 0) {
    attack_defence = 0;
  }
  var reduce_temp = (1
    - (1-data.REDUCE_1/100)
    * (1-data.REDUCE_2/100)
    * (1-data.REDUCE_3/100)
    * (1-data.REDUCE_4/100)
    * (1-data.REDUCE_5/100));
  
  var boost_1 = (
      data.BOOST_1_1/100
    + data.BOOST_1_2/100
    + data.BOOST_1_3/100
    + data.BOOST_1_4/100
    + data.BOOST_1_5/100);
  var boost_2 = (
      data.BOOST_2_1/100
    + data.BOOST_2_2/100
    + data.BOOST_2_3/100
    + data.BOOST_2_4/100
    + data.BOOST_2_5/100);
  var boost_3 = (
      data.BOOST_3_1/100
    + data.BOOST_3_2/100
    + data.BOOST_3_3/100
    + data.BOOST_3_4/100
    + data.BOOST_3_5/100);
  var boost_4 = (
      data.BOOST_4_1/100
    + data.BOOST_4_2/100
    + data.BOOST_4_3/100
    + data.BOOST_4_4/100
    + data.BOOST_4_5/100);
  var boost_5 = (
      data.BOOST_5_1/100
    + data.BOOST_5_2/100
    + data.BOOST_5_3/100
    + data.BOOST_5_4/100
    + data.BOOST_5_5/100);
  var boost_6 = (
      data.BOOST_6_1/100
    + data.BOOST_6_2/100
    + data.BOOST_6_3/100
    + data.BOOST_6_4/100
    + data.BOOST_6_5/100);
  var boost_7 = (
      data.BOOST_7/100);
  
  var damage_base = (attack_defence
    * data.PHOTON
    * data.CLASS
    * (1+boost_1)
    * (1+boost_2)
    * (1+boost_3)
    * (1+boost_4)
    * (1+boost_5)
    * (1+boost_6)
    * (1+boost_7)
    * (1-reduce_temp));
  
  if (damage_base * 0.95 < 1) {
    var damage_min = 1;
  } else {
    var damage_min = Math.floor(damage_base * 0.95);
  }
  if (damage_base * 1.05 < 1) {
    var damage_max = 1;
  } else {
    var damage_max = Math.floor(damage_base * 1.05);
  }
  damage_min += data.FIX_DAMAGE;
  damage_max += data.FIX_DAMAGE;
  if (data.HITS === 1) {
    damage_min += Math.floor(data.TENKETSU*data.TENKETSU*data.LEVEL/35);
    damage_max += Math.floor(data.TENKETSU*data.TENKETSU*data.LEVEL/35);
  }
  
  document.querySelector("#DAMAGE_1_HIT_MIN").value = damage_min.toString();
  document.querySelector("#DAMAGE_1_HIT_MAX").value = damage_max.toString();
  document.querySelector("#DAMAGE_TOTAL_MIN").value = (damage_min*data.HITS).toString();
  document.querySelector("#DAMAGE_TOTAL_MAX").value = (damage_max*data.HITS).toString();
  if (damage_min < data.BLOCK_HP * data.BLOCK_RATE/100) {
    document.querySelector("#BLOCK_MIN").value = "ブロック成功";
  } else {
    document.querySelector("#BLOCK_MIN").value = "ブロック失敗";
  }
  if (damage_max < data.BLOCK_HP * data.BLOCK_RATE/100) {
    document.querySelector("#BLOCK_MAX").value = "ブロック成功";
  } else {
    document.querySelector("#BLOCK_MAX").value = "ブロック失敗";
  }
}

function data_to_hash(data) {
   window.location.hash = '#' + encodeURIComponent(JSON.stringify(data));
}

function hash_to_data(data) {
  try {
    var temp = JSON.parse(decodeURIComponent(window.location.hash.substring(1)));
    Object.assign(data, temp);
  } catch (e) {
  }
}


