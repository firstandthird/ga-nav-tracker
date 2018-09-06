import aug from 'aug';
import GATrack from 'ga-track';
import { on, ready, closest, matches } from 'domassist';

const GANavTracker = {
  init(callback = null, timeout = 1000) {
    const selector = '[data-nav-tracker]';

    on(document.body, 'click', event => {
      let element = event.target;
      event.preventDefault();

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

      const defaults = {
        label: tracker.dataset.navTracker,
        category: 'nav-tracker'
      };

      const dropdown = closest(element, '[data-nav-tracker-dropdown]');
      let textLink = element.textContent.trim();

      if (dropdown) {
        textLink = `${dropdown.dataset.navTrackerDropdown} - ${textLink}`;
      }

      const { category, action, label } = aug(defaults, { action: textLink });

      GATrack.sendEvent(category, action, label, callback, timeout);
    });
  }
};

ready(() => {
  GANavTracker.init();
});

export default GANavTracker;
