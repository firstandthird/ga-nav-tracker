import GANavTracking from '../index';
import test from 'tape-rollup';
import { findOne } from 'domassist';

const init = () => {
  const container = document.createElement('div');
  container.id = 'fixture';
  container.innerHTML = `
    <nav>
    <ul data-nav-tracker="header">
      <li><a href="#">Link 1</a></li>
      <li data-nav-tracker-dropdown="Dropdown">
        <ul>
          <li><a href="#">Link 1</a></li>
        </ul>
      </li>
    </ul>
  </nav>
  `;
  document.body.appendChild(container);
};

init();

test('init - Parameters', assert => {
  let output = false;

  GANavTracking.init(() => {
    assert.ok(true, 'Callback is being called');
    assert.equal(output, false, 'Callback timeout works');
    assert.end();
  }, 3000);

  findOne('a').click();

  setTimeout(() => {
    output = true;
  }, 1000);
});
