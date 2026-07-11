import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-B0GP9WJV7V";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);

  console.log("GA initialized");
};

export const logPageView = (path) => {
    console.log("Sending pageview:", path);

  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const event = (name, params = {}) => {
    console.log("Sending event:", name);

  
    ReactGA.event(name, params);
};