<p align="center">
	<img src="https://raw.githubusercontent.com/SteinRein/wizerd-forms/master/assets/wizerd-forms-logo.svg" width="300">
</p>

# wɪzə(r)d Forms

[![CodeFactor](https://www.codefactor.io/repository/github/steinrein/wizerd-forms/badge)](https://www.codefactor.io/repository/github/steinrein/wizerd-forms)

Bored of these old fashioned HTML Forms that put all the elements on the same page?

Good you're here!

wɪzə(r)d Forms will help you building your own multistep Forms with full control over everything. Custom Controls? No Problem. Append new pages by AJAX Calls? You can achive this in just a few lines of code.

## Getting started

### Installation

#### NPM
`npm install @steinrein/wizerd-forms`

#### Download
[Download](https://github.com/SteinRein/wizerd-forms/archive/master.zip) the repository and include the production ready code from the <code>dist</code> folder in your project.

Include the script in your code:
```html
<script src="path/to/wizerdforms.bundle.js"></script>
```

## Basic Usage
```javascript
import { WizerdForm } from '@steinrein/wizerd-forms';

const element = document.querySelector('.wizerdform');
const options = {};

const $WizerdForm = new WizerdForm( element, options );
$WizerdForm.init();
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
	<dt>controlsWrapper</dt>
	<dd>
		Type: <code>boolean | HTMLElement | DocumentFragment</code>
		Default: <code>true</code>
		<p>
			Using true wɪzə(r)d Forms will add a custom wrapper predefined by the library<br>
			false will add the controls directly to the form, HTMLElement and DocumentFragment<br>
			help you define your own wrapper
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
  <dt>hiddenPageClass</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>'wizerdform-hidden-page'</code>
    <p>
      Classname for hidden wɪzə(r)d Form pages.
    </p>
  </dd>
  <dt>activePageClass</dt>
  <dd>
    Type: <code>string</code><br>
    Default: <code>'wizerdform-active-page'</code>
    <p>
      Classname for active wɪzə(r)d Form page.
    </p>
  </dd>
</dl>

### Methods

#### Methods from `WizerdForm`
##### `init`
Set an instance of a wɪzə(r)d Form.
This Method will apply classes to all form elements, move the form to it's startIndex and set all Form controls
```javascript
$WizerdForm.init();
```

##### `destroy`
Destroy an instance. The form will go back to basic.
```javascript
$WizerdForm.destroy();
```

##### `getElements`
Return all Form Elements
```javascript
$WizerdForm.getElements();
```

##### `getValues`
Return all Form Element values as an object with `key => value` pairs, holding the `name` and the `value` of the elements.
```javascript
$WizerdForm.getValues();
```

##### `getPageByIndex`
Get a `WizerdFormPage` by it's index. Will return false if there is no page with the given index.
```javascript
const index = 2;
$WizerdForm.getPageByIndex(index);
```

##### `getCurrentPage`
Same as `getPageByIndex` but will always return the current Page.
```javascript
$WizerdForm.getCurrentPage(index);
```

##### `goToPage`
Jump directly to another page by it's index. The Method will return false if pageIndex is less than zero.
```javascript
const jumpTo = 3;
$WizerdForm.goToPage(jumpTo);
```

##### `navigate`
Navigate the form by a given value of pages to travel. Using a negative number in the first parameter will result in navigating to previous pages. The second parameter can be used to proceed navigating without validating the current Page.
```javascript
const goToNext = _ => {
	$WizerdForm.navigate(1);
}
const goToPrev = _ => {
	$WizerdForm.navigate(-1);
}
// Skip validation
const goToNextNoValidation = _ => {
	$WizerdForm.navigate(1, true);
}
const goToPrevNoValidation = _ => {
	$WizerdForm.navigate(-1, true);
}
```

##### `addPage`
Add a new `WizerdFromPage` by string.
This method can be used to create pages from AJAX Calls or other callbacks.
```javascript
const newPageStr = `
	<label>my new Page</label>
	<input type="text" name="myNewField" value="" required />
`;
const insertOnIndex = 1;

$WizerdForm.addPage(newPageStr, insertOnIndex);
```

##### `replacePage`
Replace the content of an existing Page.
```javascript
const replacePageOnIndex = 2;
const replaceWith = `
	<label>Replacement Page</label>
	<input type="text" name="replacedField" value="" required />
`;

$WizerdForm.replacePage(replacePageOnIndex, replaceWith);
```

##### `addFormControl`
Using addFormControl you can create accessible form controls.
```javascript
const nextButton = $WizerdForm.addFormControl(
	'ctrNext', 	// Reference
	'button',		// TagName
	{
		type: "button",
		onClick: (e) => {console.log('new index ' + wizerdForm.index)}
	}, // Attributes
	'next' // Children
)
```
You can also create children with nodes like:
```javascript
const nextButton = $WizerdForm.addFormControl(
	'ctrNext', 	// Reference
	'div',		// TagName
	{
		className: 'button',
		onClick: (e) => {console.log('new index ' + wizerdForm.index)}
	}, // Attributes
	[
		{
			tagName: 'span'
			props: {},
			children: [
				'Next',
				[
					// ...Nest as many Child Elements as you want
				]
			]
		}
	]
)
```

##### `removeControl`
Using removeControl you can remove a form control that was previously added through `addFormControl` by it's reference.
```javascript
$WizerdForm.removeControl('ctrNext');
```

##### `on`
Special Event Handlers can be specified through the `on` Method.
Currently wɪzə(r)d Forms supports the following:
- `input`, `change`: fires whenever an input changes
- `error`: fires when validation fails
- `navigate`: fires on navigation
- `submit`: fires on form submit
```javascript
$WizerdForm.on('navigate', (evt) => {
	console.log('Navigation event fired!');
});
```

#### Methods from `WizerdFormPage`

##### `show`
Add `options.activePageClass` to a page.
```javascript
$WizerdForm.getPageByIndex(2).show();
```

##### `hide`
Add `options.hiddenPageClass` to a page.
```javascript
$WizerdForm.getPageByIndex(2).hide();
```

##### `getElements`
Return all Form Elements from a Page
```javascript
$WizerdForm.getCurrentPage().getElements();
```

##### `getValues`
Return all Form Element values from a Page as an object with `key => value` pairs, holding the `name` and the `value` of the elements.
```javascript
$WizerdForm.getCurrentPage().getValues();
```

##### `validate`
Validate a Page.
```javascript
$WizerdForm.getCurrentPage().validate();
```
