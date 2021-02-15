const searchShow = async (query) => {
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

  //fetch(url1)
  // .then((response) => response.json())

  // .then((jsonData) => {
  //const results = jsonData.map(element => element.main);
  const res = await fetch(url1);
  let results = await res.json();
  console.log(results);
  displayResults(results);
  // console.log(jsonData);
  console.log(results);
};

function displayResults(results) {
  const List = document.getElementById("resultsList");
  results.forEach((result) => {
    const element = document.createElement("li");
    element.innerText = result;
    List.appendChild(element);
  });
}

window.onload = () => {
  const SearchTermElement = document.getElementById("SearchTerm");
  SearchTermElement.onkeyup = (event) => {
    searchShow(SearchTermElement.value);
  };
};
