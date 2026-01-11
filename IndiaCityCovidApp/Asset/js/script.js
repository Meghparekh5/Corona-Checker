var allData = null;

var input = document.getElementById("cityInput");
var btn = document.getElementById("searchBtn");
var box = document.getElementById("result");
var msg = document.getElementById("error");

var nameBox = document.getElementById("placeName");
var c1 = document.getElementById("cases");
var c2 = document.getElementById("recovered");
var c3 = document.getElementById("deaths");
var c4 = document.getElementById("active");

function getData() {
  fetch("https://api.allorigins.win/raw?url=https://data.incovid19.org/v4/min/data.min.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (d) {
      allData = d;
    });
}

getData();

btn.onclick = function () {
  showCity();
};

function showCity() {
  var city = input.value.toLowerCase().trim();

  msg.innerHTML = "";
  box.classList.add("hidden");

  if (allData == null) {
    msg.innerHTML = "Loading data... click again";
    getData();
    return;
  }

  if (city == "") {
    msg.innerHTML = "Type a city name";
    return;
  }

  for (var st in allData) {
    var dist = allData[st].districts;
    if (!dist) continue;

    for (var d in dist) {
      if (d.toLowerCase().indexOf(city) != -1) {
        var t = dist[d].total || {};

        nameBox.innerHTML = d;
        c1.innerHTML = t.confirmed || "N/A";
        c2.innerHTML = t.recovered || "N/A";
        c3.innerHTML = t.deceased || "N/A";

        if (t.confirmed && t.recovered && t.deceased) {
          c4.innerHTML = t.confirmed - t.recovered - t.deceased;
        } else {
          c4.innerHTML = "N/A";
        }

        box.classList.remove("hidden");
        return;
      }
    }
  }

  msg.innerHTML = "City not found";
}
