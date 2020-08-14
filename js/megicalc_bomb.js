function data_to_html(data) {
  document.querySelector("#LEVEL").value = data.LEVEL.toString();
  document.querySelector("#MULTI").value = data.MULTI.toString();
  document.querySelector("#RELEASED").value = data.RELEASED.toString();
  document.querySelector("#COMBINED").value = data.COMBINED.toString();
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
  document.querySelector("#SYNCHRO").value = data.SYNCHRO.toString();
  document.querySelector("#BOOST_1_1").value = data.BOOST_1_1.toString();
  document.querySelector("#BOOST_1_2").value = data.BOOST_1_2.toString();
  document.querySelector("#BOOST_1_3").value = data.BOOST_1_3.toString();
  document.querySelector("#BOOST_1_4").value = data.BOOST_1_4.toString();
  document.querySelector("#BOOST_1_5").value = data.BOOST_1_5.toString();
  document.querySelector("#BOOST_2").value = data.BOOST_2.toString();
  document.querySelector("#REDUCE_1").value = data.REDUCE_1.toString();
  document.querySelector("#REDUCE_2").value = data.REDUCE_2.toString();
  document.querySelector("#REDUCE_3").value = data.REDUCE_3.toString();
  document.querySelector("#REDUCE_4").value = data.REDUCE_4.toString();
  document.querySelector("#REDUCE_5").value = data.REDUCE_5.toString();
  document.querySelector("#BLOCK_HP").value = data.BLOCK_HP.toString();
  document.querySelector("#BLOCK_RATE").value = data.BLOCK_RATE.toString();
}

function html_to_data(data) {
  data.LEVEL = parseInt(document.querySelector("#LEVEL").value);
  data.MULTI = parseFloat(document.querySelector("#MULTI").value);
  data.RELEASED = parseInt(document.querySelector("#RELEASED").value);
  data.COMBINED = parseInt(document.querySelector("#COMBINED").value);
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
  data.SYNCHRO = parseInt(document.querySelector("#SYNCHRO").value);
  data.BOOST_1_1 = parseFloat(document.querySelector("#BOOST_1_1").value);
  data.BOOST_1_2 = parseFloat(document.querySelector("#BOOST_1_2").value);
  data.BOOST_1_3 = parseFloat(document.querySelector("#BOOST_1_3").value);
  data.BOOST_1_4 = parseFloat(document.querySelector("#BOOST_1_4").value);
  data.BOOST_1_5 = parseFloat(document.querySelector("#BOOST_1_5").value);
  data.BOOST_2 = parseFloat(document.querySelector("#BOOST_2").value);
  data.REDUCE_1 = parseFloat(document.querySelector("#REDUCE_1").value);
  data.REDUCE_2 = parseFloat(document.querySelector("#REDUCE_2").value);
  data.REDUCE_3 = parseFloat(document.querySelector("#REDUCE_3").value);
  data.REDUCE_4 = parseFloat(document.querySelector("#REDUCE_4").value);
  data.REDUCE_5 = parseFloat(document.querySelector("#REDUCE_5").value);
  data.BLOCK_HP = parseFloat(document.querySelector("#BLOCK_HP").value);
  data.BLOCK_RATE = parseFloat(document.querySelector("#BLOCK_RATE").value);
}

function calculate(data) {
  var attack_temp = (100
    +data.LEVEL*15
    +(data.RELEASED+data.COMBINED)*data.LEVEL*2.5
  )*data.MULTI;
  
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
  if (data.SYNCHRO <= 1) {
    var synchro_temp = 1.0;
  } else {
    var synchro_temp = 1.0 + 0.1*data.SYNCHRO;
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
      data.BOOST_2/100);
  
  var damage_base = (attack_defence
    * synchro_temp
    * (1+boost_1)
    * (1+boost_2)
    * (1-reduce_temp));
  if (damage_base < 1) {
    var damage_base = 1;
  }
  
  document.querySelector("#DAMAGE").value = damage_base.toString();
  if (damage_base < data.BLOCK_HP * data.BLOCK_RATE/100) {
    document.querySelector("#BLOCK").value = "ブロック成功";
  } else {
    document.querySelector("#BLOCK").value = "ブロック失敗";
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


