const baseUrl = "http://localhost:3000";
const readEventsUrl = new URL("events", baseUrl);
const TIMER = 3000;
let eventsDiv = document.getElementById("events_div");

const getAllEvents = async () => {
  try {
    const f = await fetch(readEventsUrl);
    const d = await f.json();
    return d;
  } catch (e) {
    console.log(e);
    return [];
  }
};

//setInterval(async () => {
//  const d = await getAllEvents();
//  console.log(d);
//}, TIMER);

const makeDiv = (event) => {
  const parDiv = document.createElement("div");
  parDiv.innerText = `${event.name} - ${event.country1} vs ${event.country2} on ${event.dt}`;
  return parDiv;
};

const displayAllEvents = () => {
  eventsDiv.innerHTML = "";
  getAllEvents()
    .then((r) => {
      r.forEach((d) => {
        const newDiv = makeDiv(d);
        //eventsDiv.innerHTML = newDiv.innerHTML;
        eventsDiv.prepend(newDiv);
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

function init() {
  displayAllEvents();
  setInterval(() => {
    displayAllEvents();
  }, TIMER);
}

init();
