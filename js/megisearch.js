function megisearch(data, namelist, database) {
  for (var i=0; i<database.length; ++i) {
    if (data.STAGE === database[i][1]) {
      database[i][0] = {
        "SCORE":45,
        "CHECK":[0,0,0,0,0]
      };
      database[i][0].SCORE += 5*(data.DIFFICULTY===database[i][2]);
      for (var j=0; j<5; ++j) {
        var index = namelist.indexOf(database[i][3+j]);
        if (0<=index && index < data.CHECK.length) {
          if (data.CHECK[index]) {
            database[i][0].CHECK[j] = +1;
          }
        } else {
          database[i][0].CHECK[j] = -1;
        }
      }
      var hits = database[i][0].CHECK.map((v) => (v>=1)).reduce((p,c) => (p+c));
      var keys = database[i][0].CHECK.map((v) => (v>=0)).reduce((p,c) => (p+c));
      if (0 < keys) {
        database[i][0].SCORE += Math.floor(50 * hits / keys);
      }
    } else {
      database[i][0] = {
        "SCORE":0,
        "CHECK":[0,0,0,0,0]
      };
    }
  }
  
  database.sort(function(a,b){
        if( a[0].SCORE < b[0].SCORE ) return +1;
        if( a[0].SCORE > b[0].SCORE ) return -1;
        return 0;
  });
  
  var addHTML = "<tr>";
  addHTML += "<th>スコア</th><th>ステージ</th><th>難易度</th>";
  addHTML += "<th>編成1st</th><th>編成2nd</th><th>編成3rd</th><th>編成4th</th><th>編成5th</th>";
  addHTML += "<th>リンク</th>";
  addHTML += "</tr>";
  for (var i=0; i<database.length; ++i) {
    if (database[i][0].SCORE <= 50) {
      break;
    }
    addHTML += "<tr>";
    addHTML += "<td>"+database[i][0].SCORE+"</td>";
    addHTML += "<td>"+database[i][1]+"</td>";
    addHTML += "<td>"+database[i][2]+"</td>";
    for (var j=0; j<5; ++j) {
      if (0 < database[i][0].CHECK[j]) {
        addHTML += "<td><strong>"+database[i][j+3]+"</strong></td>";
      } else {
        addHTML += "<td>"+database[i][j+3]+"</td>";
      }
    }
    addHTML += "<td><a href='"+database[i][8]+"'>リンク</a></td>";
    addHTML += "</tr>";
  }
  document.querySelector("#RESULT").innerHTML = addHTML;
}
