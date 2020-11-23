<img src="https://raw.githubusercontent.com/SteinRein/wizerd-forms/master/assets/wizerd-forms-logo.svg" width="300">

<b style="background: red; padding: .5rem; color: white">Currently work in Progress!</b>

# wɪzə(r)d Forms
wɪzə(r)d is the Phonetic transcription of wizard. 
Why? Because it does exactly what the name tells you!

wɪzə(r)d Forms is intended to work as a library to build multistep forms with ease.

## Getting started

### Installation

#### NPM
`npm install` is not available yet

#### Download
[Download](https://github.com/SteinRein/wizerd-forms/archive/master.zip) the repository and include the production ready code from the <code>dist</code> folder in your project.

Include the script in your code:
```html
<script src="path/to/wizerdforms.bundle.js"></script>
```

## Usage
```javascript
const element = document.querySelector('.wizerdform');
const options = {};

const wizerdForm = new WizerdForm( element, options );
wizerdForm.init();
```

### Options
<dl>
  <dt>startIndex</dt>
  <dd>
    Type: <code>number</code><br>
    Default: <code>0</code>
    <p>
      Index of the page where the form should start.
    </p>
  </dd>
  <dt>pages</dt>
  <dd>
    Type: <code>Element|HTMLElement|string</code><br>
    Default: <code>'.wizerdform-page'</code>
    <p>
			QuerySelector for wɪzə(r)d Form pages.
    </p>
  </dd>
  <dt>controls_position</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>'bottom'</code>
    <p>
      Where to place the controls.<br>
      ACceptable values are <code>'top'</code> and <code>'bottom'</code>.
    </p>
  </dd>
  <dt>page_hidden_class</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>'wizerdform-hidden-page'</code>
    <p>
      Classname for hidden wɪzə(r)d Form pages.
    </p>
  </dd>
  <dt>page_active_class</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>'wizerdform-active-page'</code>
    <p>
      Classname for active wɪzə(r)d Form page.
    </p>
  </dd>
  <dt>progressbar_class</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>'wizerdform-progress'</code>
    <p>
      Classname for the progress bar.
    </p>
  </dd>
	<dt>prev_btn_text</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>'Previous'</code>
    <p>
      Text on the previous page button.
    </p>
  </dd>
	<dt>next_btn_text</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>'Next'</code>
    <p>
      Text on the next page button.
    </p>
  </dd>
	<dt>submit_text</dt>
  <dd>
    Type: <code>string|null</code><br>
    Default: <code>null</code>
    <p>
      When the last page is reached the button text might change if <code>submit_text</code> has any value.
    </p>
  </dd>
</dl>

### Methods

#### `init`
```javascript
/**
 * Initialize the current wɪzə(r)d Form Instance.
 * This Method will add navigation controls, move the form
 * to it's startIndex and add all Event listeners.
 */
wizerdForm.init();
```

#### `destroy`
```javascript
/**
 * Destroy the current wɪzə(r)d Form Instance.
 * This Method will remove navigation controls, set the active
 * pageIndex to 0 and remove all Event listeners.
 */
wizerdForm.destroy();
```

#### `goToPage`
```javascript
/**
 * Manually change the current page.
 * 
 * @param {number} pageIndex 
 */
const pageIndex = 2;
wizerdForm.goToPage(pageIndex);
```

#### `setValues`
```javascript
/**
 * Set form values. setValues will check all formfields and save their
 * values to it's instance values variable.
 * 
 * Use the additionalValues param to add your own form values.
 * 
 * @param {object} additionalValues
 */
const additionalValues = {
	key: 'value'
};
wizerdForm.setValues(additionalValues);
```
