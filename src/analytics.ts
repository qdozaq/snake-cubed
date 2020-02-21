import ReactGA from 'react-ga';

const trackingCode = 'UA-131385998-2';

export default () => {
  ReactGA.initialize(trackingCode);
  ReactGA.pageview('/');
}