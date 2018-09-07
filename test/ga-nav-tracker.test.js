/* eslint-disable new-cap */
import GANavTracking from '../index';
import test from 'tape-rollup';

// GA Stub
let gaData = [];
window._gaq = { // eslint-disable-line no-underscore-dangle
  data: null,
  clear: assert => {
    gaData = [];
  },
  push(arr) {
    if (Array.isArray(arr)) {
      gaData.push(arr); // eslint-disable-line no-underscore-dangle
    }
  }
};

window.ga = function (...args) {
  gaData = args;
};

const init = () => {
  const container = document.createElement('div');
  container.id = 'fixture';
  document.body.appendChild(container);
};

const setup = () => {
  const container = document.getElementById('fixture');
  container.innerHTML = `
    <nav>
      <ul data-nav-tracker="header">
        <li><a id="link1" href="#">Link 1</a></li>
        <li data-nav-tracker-dropdown="Dropdown">
          <ul>
            <li><a id="link2" href="#">Link 2</a></li>
          </ul>
        </li>
        <li data-nav-tracker="footer">
          <a id="link3" href="#">
            <div id="text">Link 3</div>
          </a>
        </li>
      </ul>
    </nav>
  `;

  window._gaq.clear(); // eslint-disable-line no-underscore-dangle
};

init();

test('GANavTracking plugin exists', assert => {
  assert.equal(typeof GANavTracking, 'object', 'object is defined');
  assert.equal(typeof GANavTracking.init, 'function', 'init() is defined');
  assert.end();
});

test('Track an element on click', assert => {
  setup();
  const el = document.getElementById('link1');

  el.click();

  assert.equal(gaData.length, 1, 'one event tracked');
  assert.equal(gaData[0][0], '_trackEvent', 'tracks event');
  assert.equal(gaData[0][1], 'nav-tracker', 'category matches');
  assert.equal(gaData[0][2], 'Link 1', 'action matches');
  assert.equal(gaData[0][3], 'header', 'label matches');
  assert.end();
});

test('Track an element on click within dropdown', assert => {
  setup();
  const el = document.getElementById('link2');

  el.click();

  assert.equal(gaData.length, 1, 'one event tracked');
  assert.equal(gaData[0][0], '_trackEvent', 'tracks event');
  assert.equal(gaData[0][1], 'nav-tracker', 'category matches');
  assert.equal(gaData[0][2], 'Dropdown - Link 2', 'action matches');
  assert.equal(gaData[0][3], 'header', 'label matches');
  assert.end();
});

test('Track click on element inside the anchor', assert => {
  setup();
  const el = document.getElementById('text');

  el.click();

  assert.equal(gaData.length, 1, 'one event tracked');
  assert.equal(gaData[0][0], '_trackEvent', 'tracks event');
  assert.equal(gaData[0][1], 'nav-tracker', 'category matches');
  assert.equal(gaData[0][2], 'Link 3', 'action matches');
  assert.equal(gaData[0][3], 'footer', 'label matches');
  assert.end();
});
