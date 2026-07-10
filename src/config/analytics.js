import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-B0GP9WJV7V";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
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