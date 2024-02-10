import ReactGA from 'react-ga';

function useAnalyticsEventTracker(category: string) {
  const eventTracker = (action: string, label: string) => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
}

export default useAnalyticsEventTracker;
