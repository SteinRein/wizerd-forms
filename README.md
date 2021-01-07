<img src="https://raw.githubusercontent.com/SteinRein/wizerd-forms/master/assets/wizerd-forms-logo.svg" width="300">

<b>Currently work in Progress!</b>

[![CodeFactor](https://www.codefactor.io/repository/github/steinrein/wizerd-forms/badge)](https://www.codefactor.io/repository/github/steinrein/wizerd-forms)

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
Initialize the current wɪzə(r)d Form Instance.
This Method will add navigation controls, move the form to it's startIndex and add all Event listeners.

```javascript
wizerdForm.init();
```

#### `destroy`
Destroy the current wɪzə(r)d Form Instance.
This Method will remove navigation controls, set the active pageIndex to 0 and remove all Event listeners.
```javascript
wizerdForm.destroy();
```

#### `goToPage`
Manually change the current page index

Arguments:
1. index - the new page Index

```javascript
const pageIndex = 2;
wizerdForm.goToPage(pageIndex);
```

#### `insertPage`
You can insert additional pages using the `insertPage` method to your wɪzə(r)d Form after initialization.

Arguments:
1. page - a string, DOM Element or a callback function that returns the page
2. index - the page Index where the new page should appear at

**using a string:**
```javascript
// Add Page by string
const newPageByString = `<fieldset>
	<input type="text" name="byString" value="" />
</fieldset>`;
wizerdForm.insertPage( newPageByString, 0 );
```

**using a DOM Element:**
```javascript
// Add Page by DOM Element
const newPageByDOMNode = document.createElement('fieldset');
const newPageFieldByDOMNode = document.createElement('input');
newPageFieldByDOMNode.name = 'byDOMNode';
newPageFieldByDOMNode.value = '';
newPageByDOMNode.appendChild(newPageFieldByDOMNode);
wizerdForm.insertPage( newPageByDOMNode, 0 );
```

**using a Callback Function:**
```javascript
// Add Page by Callback
// The Callback must return either a string or a DOM Element
const newPageByCallback = () => {
	const page = `<fieldset>
		<input type="text" name="byString" value="" />
	</fieldset>`;
	return page;
};
wizerdForm.insertPage( newPageByCallback, 0 );
```

#### `setValues`
Set form values. setValues will check all formfields and save their values to it's instance values variable.
Use the additionalValues parameter to add your own form values.

Parameters:
1. additionalValues - custom values to add

```javascript
const additionalValues = {
	key: 'value'
};
wizerdForm.setValues(additionalValues);
```
