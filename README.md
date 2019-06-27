# Google Analytics Nav Tracker (ga-nav-tracker)

[![Build Status](https://travis-ci.org/firstandthird/ga-nav-tracker.svg?branch=master)](https://travis-ci.org/firstandthird/ga-nav-tracker)
![npm](https://img.shields.io/npm/v/ga-nav-tracker.svg)

Auto-track link clicks for Google Analytics.

> This library uses [ga-track](https://github.com/firstandthird/ga-track) and needs [Google Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/) to be set up in order to work.

## Installation

```sh
npm install ga-nav-tracker
```

## Usage

```js
import GANavTracker from 'ga-nav-tracker'
```

### init()

Initializes library and all link clicks within the specified tag will be tracked in Google Analytics.

## Example [(see example)](example/index.html)

Add `data-nav-tracker="header|footer"` to any element and the library will track link clicks.

```html
<nav>
  <ul data-nav-tracker="header">
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
  </ul>
</nav>
```

Clicking on the first link will be send this object to Google Analytics:

```js
{
  action: 'header'
  label: 'Link 1'
  category: 'nav-tracker'
}
```

You can optionally set `data-nav-tracker-dropdown`, which prepends tracker location to the label property. See the example below:

```html
<nav>
  <ul data-nav-tracker="header">
    <li><a href="#">Link 1</a></li>
    ...
    <li data-nav-tracker-dropdown="Dropdown">
      <ul>
        <li><a href="#">Link 2</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

Clicking on the second link will send this object to Google Analytics:

```js
{
  action: 'header'
  label: 'Dropdown - Link 2'
  category: 'nav-tracker'
}
```

## License

### MIT License

Copyright (c) 2019 First+Third

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
