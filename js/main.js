const searchInput = document.querySelector(".search-input");
const citiesTarget = document.querySelector(".cities__target");
const button = document.querySelector(".btn-submit");
const alert = document.querySelector(".alert");
let cities = [];
// ========================
button.addEventListener("click", loadData);
searchInput.addEventListener("change", loadData);
searchInput.addEventListener("keyup", removeDisabled);
// ========================
if (searchInput.value === "") {
  button.classList.add("disabled");
}
// ========================
function removeDisabled() {
  button.classList.remove("disabled");
}
// ========================
function loadData() {
  //   button.classList.add("disabled");
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`
  );
  xhr.onload = function () {
    console.log(xhr.status);
    if (xhr.status === 200) {
      alert.classList.add("hidden");
      let data = JSON.parse(xhr.responseText);
      cities = cities.concat(data);
      addCityCard(removeDuplicates(cities));
    } else {
      alert.classList.remove("hidden");
    }
  };
  xhr.send();
}
// ========================
function addCityCard(data) {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<div class="col my-2"><div class=" card rounded-5 city__target" style="width: 18rem">
        <div class="card-body text-start">
        <h4 class="card-title fw-bold text-start fs-2 text-secondary">
          ${data[i]?.name}
          <sup
          class="bg-warning rounded-4 fs-6 text-light p-1 fw-medium"
          >${data[i]?.sys.country}</sup
            >
            </h4>
        <h3 class="card-text text-start my-1 fw-bolder">
        ${Math.ceil(
          data[i]?.main.temp
        )} <sup class="fs-4" style="top: -1em">°C</sup>
          </h3>
          <img
          class="img-fluid"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
            data[i]?.weather[0]?.icon
          }.svg"
        alt="weather condition image"
            />
            <h5 class="text-start my-1 fw-bolder text-secondary">
            ${data[i]?.weather[0]?.description}
            </h5>
            </div>
            </div></div>`;
  }
  citiesTarget.innerHTML = html;
}
// ========================
const removeDuplicates = (arr) => {
  return arr.filter((obj, index, self) => {
    return (
      index === self.findIndex((t) => t.id === obj.id && t.name === obj.name)
    );
  });
};
// ========================
const footerYear = document.querySelector(".footer-year");
footerYear.textContent = new Date().getFullYear();
