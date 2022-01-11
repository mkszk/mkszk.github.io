function data_to_html(data) {
   document.querySelector('input[name="base"][value="'+data.BASE+'"]').checked = true;
   document.querySelector("#RULE1").value = data.RULE1;
   document.querySelector("#RULE2").value = data.RULE2;
   document.querySelector("#RULE3").value = data.RULE3;
}

function html_to_data(data) {
   data.BASE = document.querySelector('input[name="base"]:checked').value;
   data.RULE1 = document.querySelector("#RULE1").value;
   data.RULE2 = document.querySelector("#RULE2").value;
   data.RULE3 = document.querySelector("#RULE3").value;
}

function data_to_hash(data) {
   window.location.hash = '#' + encodeURIComponent(JSON.stringify(data));
   document.querySelector("#RESULT").value = window.location;
}

function hash_to_data(data) {
  try {
    var temp = JSON.parse(decodeURIComponent(window.location.hash.substring(1)));
    Object.assign(data, temp);
    document.querySelector("#RESULT").value = window.location;
  } catch (e) {
  }
}

