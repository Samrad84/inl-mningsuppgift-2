function searchShow(query) {
  let client_id = "KB3VKVREN4S40G1J5O1MYZ2TGMCJZBMROPZWF4APWD5QX0CS";
  let client_secret = "D310XYOWDUFDSJKKZMP0WZSHLZXFDVR3VP5E2DDYUYSEVDGB";
  const api_key = "a7ae1818efc8758ead2b2a5a64eab221";
  const ApiUrl = "https://api.foursquare.com/v2/venues/";

  const weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    api_key;

  const photoUrl =
    ApiUrl +
    "51eabef6498e10cf3aea7942/photos?&client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&v=20201002";

  const SearchCityUrl =
    ApiUrl +
    "search?near=" +
    query +
    "&radius=10&client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&v=20201002";

  const ThingsUrl =
    ApiUrl +
    "explore?client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&v=20180323&limit=1&ll=40.7243,-74.0018&near=" +
    query;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      results1 = jsonData.weather;
      console.log("this is the jsonData.weather=", results1);
    });

  fetch(SearchCityUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      results = jsonData.response.venues;
      console.log("this is the jsonData.response.venues=", results);
    });
  fetch(weatherUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      results3 = jsonData.main;
      console.log("this is the jsonData.main=", results3);
    });

  displayWeatherResults(results1);
  displayPlaceResults(results);
  displayThetemp(results3);
}

function displayWeatherResults(results1) {
  results1.forEach((result1) => {
    console.log(result1);

    let parent = document.querySelector("main");
    //var child = document.createElement("div");
  
    var child = document.createElement("h4");

  
    child.innerText = result1.description;

    //child.className = "card";
    //child.append(land);
    parent.append(child);
  });
}
function displayPlaceResults(results) {
  results.forEach((result) => {
    console.log("result=", result);
    let parent = document.querySelector("main");
    var child = document.createElement("div");
    var imeg = document.createElement("img");
    var title = document.createElement("h2");
    var pa = document.createElement("p");
    var city = document.createElement("h1");


parent.id = "main";
    child.className = "card";
    let venuesId = result.id;
    const newUrl =
      "https://api.foursquare.com/v2/venues/" +
      venuesId +
      "/photos?&client_id=KB3VKVREN4S40G1J5O1MYZ2TGMCJZBMROPZWF4APWD5QX0CS&client_secret=D310XYOWDUFDSJKKZMP0WZSHLZXFDVR3VP5E2DDYUYSEVDGB&v=20201002";
    console.log("this is new Url =", newUrl);
    const imgsrc = getImageUrl(newUrl);

    city.innerText = result.location.city;
    title.innerText = result.name;
    pa.innerText = result.location.formattedAddress;
    imeg.src = imgsrc;
  
    child.append(city);
    child.append(imeg);
    child.append(title);
    child.append(pa);
    parent.append(child);
  });
}

function displayThetemp(results3) {
  results3.forEach((result3) => {
    console.log(result3);

    let parent = document.querySelector("main");
    var child = document.createElement("div");
  
    var tempe = document.createElement("h3");
    var temp = result3.temp;
    let tempa = FarenhitetoC(temp);
    tempe.innerText = tempa;

 
    child.className = "card";
    child.append(tempe);
    parent.append(child);
  });
}

function getVenuesId(url) {
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      results2 = jsonData.response.venues;
      results2.forEach((result2) => {
        let venuesId = result2.id;
        const newUrl =
          "https://api.foursquare.com/v2/venues/" +
          venuesId +
          "/photos?&client_id=KB3VKVREN4S40G1J5O1MYZ2TGMCJZBMROPZWF4APWD5QX0CS&client_secret=D310XYOWDUFDSJKKZMP0WZSHLZXFDVR3VP5E2DDYUYSEVDGB&v=20201002";
        console.log("this is new Url =", newUrl);
      });
    });
}

function getImageUrl(newUrl) {
  fetch(newUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      results1 = jsonData.items;
      results1.forEach((result1) => {
        let prefixId = result1.prefix;
        let suffixId = result1.suffix;

        const imageUrl = prefixId + "300x500/" + suffixId;
        console.log("this is image Url =", imageUrl);
      });
    });
}

function FarenhitetoC(tempe) {
  const temp = (tempe - 32) * 0.55;
  return temp;
}

window.onload = () => {
  const SearchTermElement = document.getElementById("SearchTerm");
  SearchTermElement.onkeypress = (event) => {
    searchShow(SearchTermElement.value);
  };
};
