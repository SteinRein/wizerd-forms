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

## Usage
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

**TBC**
