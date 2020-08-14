function data_to_html(data) {
   document.querySelector("#STAGE").value = data.STAGE;
   document.querySelector("#DIFFICULTY").value = data.DIFFICULTY;
   document.querySelectorAll(".CHECK").forEach((item) => {
     if (data.CHECK[parseInt(item.value)]) {
       item.checked = true;
     }
   });
}

function html_to_data(data) {
   data.STAGE = document.querySelector("#STAGE").value;
   data.DIFFICULTY = document.querySelector("#DIFFICULTY").value;
   document.querySelectorAll(".CHECK").forEach((item) => {
     if (item.checked) {
       data.CHECK[parseInt(item.value)] = 1;
     } else {
       data.CHECK[parseInt(item.value)] = 0;
     }
   });
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

