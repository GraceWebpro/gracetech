import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-B0GP9WJV7V";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);

  window.gtag("config", MEASUREMENT_ID, {
    debug_mode: true,
  });

  console.log("GA initialized");
};

export const logPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const event = (name, params = {}) => {
  ReactGA.event(name, params);
};