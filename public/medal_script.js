const baseUrl = "http://localhost:3000";
const readCountryUrl = new URL("countries", baseUrl);
const TIMER = 3000;
let medalsDiv = document.getElementById("medals_div");

const getAllMedals = async () => {
  try {
    const f = await fetch(readCountryUrl);
    const d = await f.json();
    return d;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const makeMedalDiv = (cntry) => {
  const parDiv = document.createElement("div");
  parDiv.innerText = `${cntry.name} with score ${cntry.gold}-${cntry.silver}-${cntry.bronze}`;
  return parDiv;
};

const displayAllMedals = () => {
  medalsDiv.innerHTML = "";
  getAllMedals()
    .then((r) => {
      r.forEach((d) => {
        const newDiv = makeMedalDiv(d);
        medalsDiv.append(newDiv);
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

function init() {
  displayAllMedals();
  setInterval(() => {
    displayAllMedals();
  }, TIMER);
}

init();
