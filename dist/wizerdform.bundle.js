var WizerdForm;WizerdForm=(()=>{var e={745:(e,t,r)=>{e.exports=r(418).WizerdForm},418:(e,t,r)=>{"use strict";function n(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}r.d(t,{WizerdForm:()=>f});var a=function(){function e(t,r,n){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),!t instanceof f)throw new TypeError("param 1 of WizerdFormPage must be typeof WizerdForm");this.form=t,this.page=r,this.elements=r.elements,this.index=n}var t,r,i;return t=e,(r=[{key:"show",value:function(){this.page.classList.remove(this.form.options.page_hidden_class),this.page.classList.add(this.form.options.page_active_class)}},{key:"hide",value:function(){this.page.classList.remove(this.form.options.page_active_class),this.page.classList.add(this.form.options.page_hidden_class)}},{key:"validate",value:function(){var e=!0,t=new Event("wizerdForm_validationFailed");return HTMLInputElement.prototype.checkValidity?Array.prototype.forEach.call(this.elements,(function(r){r.checkValidity()||(r.classList.add("has-error"),r.dispatchEvent(t),e=!1)})):n(this.page.querySelectorAll("[required]")).forEach((function(r){null!==r.value&&""!==r.value.trim()||(r.classList.add("has-error"),r.dispatchEvent(t),e=!1)})),e}}])&&o(t.prototype,r),i&&o(t,i),e}();function s(e){var t=e.tagName;try{return e.tagName="",e.tagName=t,!1}catch(e){return!0}}function l(e){return"string"==typeof e}function u(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return c(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var f=function(){function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};h(this,e);var n={startIndex:0,pages:".wizerdform-page",controls_position:"bottom",page_hidden_class:"wizerdform-hidden-page",page_active_class:"wizerdform-active-page",progressbar_class:"wizerdform-progress",prev_btn_text:"Previous",next_btn_text:"Next",submit_text:null};for(var i in r=r||{},n)n.hasOwnProperty(i)&&!r.hasOwnProperty(i)&&(r[i]=n[i]);this.options=r,this.form=t,this.pages=this.initPages(),this.formFields=t.elements,this.prevButton=this.nextButton=this.progressBar=null,this.curIndex=this.options.startIndex,this.values={}}var t,r,n;return t=e,(r=[{key:"init",value:function(){this.__addControls(),this.goToPage(this.curIndex),this.__delegateEvents()}},{key:"destroy",value:function(){this.__removeControls(),this.goToPage(0),this.__delegateEvents(!1)}},{key:"initPages",value:function(){var e=this,t=NodeList.prototype.isPrototypeOf(this.options.pages)||HTMLCollection.prototype.isPrototypeOf(this.options.pages)?u(this.options.pages):u(this.form.querySelectorAll(this.options.pages));return Array.prototype.forEach.call(t,(function(t){e.__setPageAttributes(t)})),this.readPages()}},{key:"readPages",value:function(){var e=this,t=u(this.form.querySelectorAll("[data-wizerdform-page]")),r=[];return Array.prototype.forEach.call(t,(function(t,n){var i=new a(e,t,n);r.push(i)})),r}},{key:"insertPage",value:function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;if("function"==typeof e&&(e=e()),l(e)&&""!==e)t=this.__buildPageFromString(e);else{if(!s(e))throw new TypeError("Page creation failed. Parameter 1 of insertPage must return a valid string or DOM Element.");t=this.__buildPageFromDOMNode(e)}(r<0||r>this.pages.length)&&(r=this.pages.length);var n=this.pages[r];void 0!==n?this.form.insertBefore(t,n.page):this.form.insertBefore(t,this.pages[r-1].page.nextSibling),this.pages=this.readPages(),this.goToPage(this.curIndex)}},{key:"__buildPageFromString",value:function(e){var t=document.createDocumentFragment(),r=document.createElement("div");if(t.appendChild(r),r.insertAdjacentHTML("beforebegin",e),t.removeChild(r),t.children.length>1){for(var n=document.createElement("div");t.firstChild;)n.appendChild(t.firstChild);t.appendChild(n)}return this.__setPageAttributes(t.firstElementChild),t}},{key:"__buildPageFromDOMNode",value:function(e){return this.__setPageAttributes(e),e}},{key:"__setPageAttributes",value:function(e){e.setAttribute("data-wizerdform-page",!0)}},{key:"getFormFields",value:function(){return u(this.form.elements).filter((function(e){if(""!==e.name&&""!==e.value)return e}))}},{key:"goToPage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(e<0)return!1;Array.prototype.forEach.call(this.pages,(function(e){e.hide()})),this.pages[e].show(),0!==e?this.prevButton.classList.remove("wizerdform-button-hidden"):this.prevButton.classList.add("wizerdform-button-hidden"),this.options.submit_text&&(e===this.pages.length-1?this.nextButton.innerText=this.options.submit_text:this.nextButton.innerText=this.options.next_btn_text),this.updateProgressBar(e)}},{key:"navigateForm",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(1===e&&!this.pages[this.curIndex].validate()||-1===e&&0===this.curIndex)return!1;this.pages[this.curIndex].hide();var t=new Event("wizerdForm_navigate",{cancelable:!0});if(this.form.dispatchEvent(t),this.curIndex===this.pages.length-1&&e>0){var r=document.createEvent("HTMLEvents");r.initEvent("submit",!0,!0),r.eventName="submit",this.form.dispatchEvent(r)}else this.curIndex+=e;this.goToPage(this.curIndex)}},{key:"setValues",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};for(var r in t)this.values[r]=t[r];Array.prototype.forEach.call(this.getFormFields(),(function(t){e.formFields[t.name]&&(e.values[t.name]=e.formFields[t.name].value)}))}},{key:"clearErrors",value:function(e){e.target.classList.remove("has-error")}},{key:"updateProgressBar",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.progressBar.style.width=100*(e+1)/this.pages.length+"%"}},{key:"__delegateEvents",value:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Array.prototype.forEach.call(this.formFields,(function(r){t?(r.addEventListener("keyup",e.clearErrors.bind(e)),r.addEventListener("change",e.clearErrors.bind(e)),r.addEventListener("keyup",e.setValues.bind(e)),r.addEventListener("change",e.setValues.bind(e))):(r.removeEventListener("keyup",e.clearErrors.bind(e)),r.removeEventListener("change",e.clearErrors.bind(e)),r.removeEventListener("keyup",e.setValues.bind(e)),r.removeEventListener("change",e.setValues.bind(e)))})),t?(this.prevButton.addEventListener("click",this.navigateForm.bind(this,-1)),this.nextButton.addEventListener("click",this.navigateForm.bind(this,1))):(this.prevButton.removeEventListener("click",this.navigateForm.bind(this,-1)),this.nextButton.removeEventListener("click",this.navigateForm.bind(this,1)))}},{key:"__addControls",value:function(){var e=document.createElement("div");e.className="wizerdform-controls";var t=document.createElement("button");t.className="wizerdform-prev",t.type="button",t.innerHTML=this.options.prev_btn_text;var r=document.createElement("button");r.className="wizerdform-next",r.type="button",r.innerHTML=this.options.next_btn_text;var n=document.createElement("div");n.className="wizerdform-progress",[t,r,n].forEach((function(t){e.appendChild(t)})),"top"!==this.options.controls_position?this.form.appendChild(e):this.form.insertBefore(e,this.form.firstChild),this.prevButton=t,this.nextButton=r,this.progressBar=n}},{key:"__removeControls",value:function(){var e=this.form.querySelector(".wizerdform-controls");e.parentElement.removeChild(e),this.prevButton=this.nextButton=this.progressBar=null}},{key:"on",value:function(e,t){switch(e){case"input":case"change":this.__handle_inputChange(t);break;case"error":this.__handle_validation_error(t);break;case"navigate":this.__handle_navigate(t)}return!1}},{key:"__handle_inputChange",value:function(e){var t=this;Array.prototype.forEach.call(this.formFields,(function(r){r.addEventListener("keyup",(function(n){if(n.target===r){var i=r.value;e.bind(r,n,{_wizerdForm:t,el:r,value:i})()}}))}))}},{key:"__handle_validation_error",value:function(e){var t=this;Array.prototype.forEach.call(this.formFields,(function(r){r.addEventListener("wizerdForm_validationFailed",(function(n){e.bind(r,n,{_wizerdForm:t,el:r})()}))}))}},{key:"__handle_navigate",value:function(e){var t=this;this.form.addEventListener("wizerdForm_navigate",(function(r){var n=t.curIndex;t.pages[n],e.bind(t.form,r,{_wizerdForm:t,index:n})()}))}}])&&d(t.prototype,r),n&&d(t,n),e}()}},t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}return r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r(745)})();