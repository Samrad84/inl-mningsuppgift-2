function searchShow(query) {
  let client_id = "KB3VKVREN4S40G1J5O1MYZ2TGMCJZBMROPZWF4APWD5QX0CS";
  let client_secret = "SGJAXV4FCLK5WRJTVASDPQXGV5NTCTSE4K4YJ12LS3HSWFST";
  const api_key = "a7ae1818efc8758ead2b2a5a64eab221";
  const url =
    "https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=KB3VKVREN4S40G1J5O1MYZ2TGMCJZBMROPZWF4APWD5QX0CS&client_secret=SGJAXV4FCLK5WRJTVASDPQXGV5NTCTSE4K4YJ12LS3HSWFST&v=20201002";
  const url1 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=a7ae1818efc8758ead2b2a5a64eab221";

  const url2 =
    "https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=KB3VKVREN4S40G1J5O1MYZ2TGMCJZBMROPZWF4APWD5QX0CS&client_secret=SGJAXV4FCLK5WRJTVASDPQXGV5NTCTSE4K4YJ12LS3HSWFST&v=20201002";

  fetch(url1)
    .then((response) => response.json())
    .then((jsonData) => {
      results = jsonData.weather;
      console.log(results);

      // console.log(jsonData);
    });
}

function displayResults(resultes) {
  const List = document.getElementById("resultsList");
  resultes.forEach((result) => {
    const element = document.createElement("li");
    element.innerText = result.description;
List.appendChild(element);

  });
}

window.onload = () => {
  const SearchTermElement = document.getElementById("SearchTerm");
  SearchTermElement.onkeypress = (event) => {
    searchShow(SearchTermElement.value);
    const City = document.getElementById("City");
City.innerText = SearchTermElement.value;
  
  };
};
