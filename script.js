function searchShow(query) {
  let client_id = "KB3VKVREN4S40G1J5O1MYZ2TGMCJZBMROPZWF4APWD5QX0CS";
  let client_secret = "3GU4Y12IHV3SDB0CFAMTNGS4QEPBSWN3Q0IG2URPWWCOASE1";
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
  // Här hämtar jag data ur foursquare Api, med hjälp av Query och input value urdragen
  //search input. En array innehåller stadens sevärdigheter.
  fetch(SearchCityUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      results = jsonData.response.venues;
    });

  //Här hämtar jag väder prognos från openweather api (Typ av väder).
  fetch(weatherUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      results1 = jsonData.weather;
    });

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      results3 = jsonData.main;
      let tempa = results3.humidity;
      let parent = document.getElementById("weather");
      let tempPlace=  document.createElement("h4");
     tempPlace.innerText = FarenhitetoC(tempa);
     parent.append(tempPlace);

    });

  displayWeatherResults(results1);
  displayPlaceResults(results);
  //displayThetemp(results3);
  displayWeatherResults(result3);
}

// I dem funktionerna nedan bryter jag ner arrayen urdragen via fetch från apier
// och via DOM visualiserar datan från json filen på element till html.
function displayWeatherResults(results1) {
  results1.forEach((result1) => {
    console.log(result1);

    let parent = document.getElementById("weather");
    let child = document.createElement("div");
    let title = document.createElement("h3");
    let descr = document.createElement("h2");



    descr.innerText = result1.description;
    title.innerText = result1.main;


    
    child.append(descr);
    child.append(title);
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
    var city = document.createElement("h3");

    parent.id = "main";
    child.className = "card";

    let venuesId = result.id;
    const newUrl =
      "https://api.foursquare.com/v2/venues/" +
      venuesId +
      "/photos?&client_id=KB3VKVREN4S40G1J5O1MYZ2TGMCJZBMROPZWF4APWD5QX0CS&client_secret=3GU4Y12IHV3SDB0CFAMTNGS4QEPBSWN3Q0IG2URPWWCOASE1&v=20201002";
    let src = getImageUrl(newUrl);
    imeg.src = src;
    const categorie = result.categories;
    categorie.forEach((categ) => {
      city.innerText = categ.pluralName;
    });

    title.innerText = result.name;
    pa.innerText = result.location.formattedAddress;

    child.append(imeg);
    child.append(city);
    child.append(title);
    child.append(pa);
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
          "/photos?&client_id=KB3VKVREN4S40G1J5O1MYZ2TGMCJZBMROPZWF4APWD5QX0CS&client_secret=3GU4Y12IHV3SDB0CFAMTNGS4QEPBSWN3Q0IG2URPWWCOASE1&v=20201002";
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
      });
    });
}

function FarenhitetoC(tempe) {
  var temp = (tempe - 32) / 5.9 ;
  return Math.trunc(temp) ;
}

window.onload = () => {
  const SearchTermElement = document.getElementById("SearchTerm");
  SearchTermElement.onclick = (event) => {
    searchShow(SearchTermElement.value);
  };
};
