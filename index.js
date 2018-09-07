import GATrack from 'ga-track';
import { on, ready, closest, matches } from 'domassist';

const GANavTracker = {
  init() {
    const selector = '[data-nav-tracker]';

    on(document.body, 'click', event => {
      let element = event.target;

      if (!matches(element, 'a')) {
        element = closest(element, 'a');
      }

      let tracker;

      if (element) {
        tracker = closest(element, selector);
      }

      if (!element || !tracker) {
        return;
      }

      const dropdown = closest(element, '[data-nav-tracker-dropdown]');
      let textLink = element.textContent.trim();

      if (dropdown) {
        textLink = `${dropdown.dataset.navTrackerDropdown} - ${textLink}`;
      }

      const options = {
        action: textLink,
        category: 'nav-tracker',
        label: tracker.dataset.navTracker
      };

      const data = GATrack.getData(element, options);
      const target = element.getAttribute('target');
      let callback = null;

      if (element.dataset.gaTrackHref === 'false') {
        event.preventDefault();
      } else if (data.href && !event.metaKey && event.which === 1 && target !== '_blank') {
        event.preventDefault();
        callback = () => {
          window.location = data.href;
        };
      }

      GATrack.sendEvent(data.category, data.action, data.label, callback);
    });
  }
};

ready(() => {
  GANavTracker.init();
});

export default GANavTracker;
