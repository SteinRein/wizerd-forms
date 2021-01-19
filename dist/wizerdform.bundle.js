!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("WizerdForm",[],t):"object"==typeof exports?exports.WizerdForm=t():e.WizerdForm=t()}(self,(function(){return function(){"use strict";var e={725:function(e,t,r){r.d(t,{default:function(){return D}});var n=function(e){return Array.isArray(e)||(e=e?[e]:[]),e},i=function(e){return Object.values?Object.values(e):Object.keys(e).map((function(t){return e[t]}))};function a(e){return"function"==typeof e}function o(e){return"string"==typeof e}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,i=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){i=!0,a=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw a}}return r}(e,t)||l(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=l(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,s=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||null==r.return||r.return()}finally{if(s)throw a}}}}function l(e,t){if(e){if("string"==typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(e,t):void 0}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return{tagName:e,props:t,children:r}}function d(e){var t;Array.isArray(e)&&(e=f(e[0]||"",e[1]||{},e[2]||[])),t="fragment"===e.tagName.toLowerCase()?document.createDocumentFragment():document.createElement(e.tagName);var r,i,a=u((i=e.props,Object.entries?Object.entries(i):Object.keys(i).map((function(e){return[e,i[e]]}))));try{for(a.s();!(r=a.n()).done;){var o=s(r.value,2),l=o[0],c=o[1];0===l.lastIndexOf("on",0)?t.addEventListener(l.slice(2).toLowerCase(),c):"undefined"!==t[l]?t[l]=c:t.setAttribute(l,c)}}catch(e){a.e(e)}finally{a.f()}if(e.children=n(e.children),e.children.length){var d,p=u(e.children);try{for(p.s();!(d=p.n()).done;){var v=h(d.value);t.appendChild(v)}}catch(e){p.e(e)}finally{p.f()}}return t}function h(e){return a(e)&&(e=e()),o(e)?document.createTextNode(e):d(e)}function p(e,t){return t.replaceChildren(e),e}var v=function(e){var t={};return Array.prototype.forEach.call(e,(function(e){switch(e.nodeName){case"INPUT":switch(e.type){case"checkbox":case"radio":e.checked&&(t[e.name]=void 0===e.value||""===e.value||e.value);break;default:t[e.name]=e.value}break;case"SELECT":switch(e.type){case"select-multiple":for(var r=[],n=0;n<e.options.length;n++)e.options[n].selected&&r.push(e.options[n].value);t[e.name]=r;break;default:t[e.name]=e.value}}})),t};function m(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var g=function(){function e(t,r,i,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),y(this,"key",void 0),y(this,"data",void 0),y(this,"element",void 0),a=n(a),this.key=t,this.data=f(r,i||{},a||[]),this.element=void 0}var t,r,i;return t=e,(r=[{key:"addEventListener",value:function(e,t){var r=this,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];document.addEventListener(e,(function(e){var n=e.target,i=r.element;void 0!==i&&null!==n&&i.contains(n)&&t(e)}),n)}}])&&m(t.prototype,r),i&&m(t,i),e}();function F(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function w(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var A=function(){function e(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};F(this,e),w(this,"page",void 0),w(this,"index",void 0),w(this,"options",void 0),this.page=t,this.index=r,this.options=n||{},this.applyPageAttributes()}var t,r,n;return t=e,(r=[{key:"applyPageAttributes",value:function(){this.page.setAttribute("data-wizerdform-page","")}},{key:"removePageAttributes",value:function(){this.page.removeAttribute("data-wizerdform-page")}},{key:"show",value:function(){this.page.classList.remove(this.options.hiddenPageClass),this.page.classList.add(this.options.activePageClass)}},{key:"hide",value:function(){this.page.classList.remove(this.options.activePageClass),this.page.classList.add(this.options.hiddenPageClass)}},{key:"getElements",value:function(){return this.page.getElementsByClassName("wizerdform-element")}},{key:"getValues",value:function(){var e=Array.prototype.filter.call(this.getElements(),(function(e){if(""!==e.name)return e}));return v(e)}},{key:"validate",value:function(){var e,t=!0,r=new Event("wizerdForm_validationFailed"),n=this.getElements();return Array.prototype.forEach.call(n,(function(r){e=r,t=function(e){if("checkValidity"in HTMLInputElement.prototype){if(!e.checkValidity())return!1}else{if(e.hasAttribute("required")&&(!e.value||""===e.value.trim()))return!1;if(e.hasAttribute("minlength")&&parseFloat(e.getAttribute("minlength"))<e.value.length)return!1;if(e.hasAttribute("maxlength")&&parseFloat(e.getAttribute("maxlength"))>e.value.length)return!1;if(e.hasAttribute("pattern")&&!new RegExp(e.getAttribute("pattern"),"i").test(String(e.value)))return!1;switch(e.type){case"number":if(e.hasAttribute("min")&&parseFloat(e.getAttribute("min"))<parseFloat(e.value))return!1;if(e.hasAttribute("max")&&parseFloat(e.getAttribute("max"))>parseFloat(e.value))return!1;break;case"date":if(e.hasAttribute("min")&&new Date(e.getAttribute("min"))<new Date(e.value))return!1;if(e.hasAttribute("max")&&new Date(e.getAttribute("max"))>new Date(e.value))return!1;case"week":case"time":if(e.hasAttribute("min")&&e.getAttribute("min")<e.value)return!1;if(e.hasAttribute("max")&&e.getAttribute("max")>e.value)return!1;case"email":if(!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"i").test(String(e.value)))return!1;case"url":var t=new RegExp(/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,"i");if("url"===e.type&&!t.test(String(e.value)))return!1}}return!0}(r)})),!0!==t&&e&&(e.classList.add("has-error"),e.dispatchEvent(r)),{valid:t,field:e}}}])&&b(t.prototype,r),n&&b(t,n),e}();function E(e){return function(e){if(Array.isArray(e))return k(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return k(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return k(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function C(e){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var z=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),P(this,"options",void 0),P(this,"form",void 0),P(this,"pages",void 0),P(this,"controlsWrapper",void 0),P(this,"controls",void 0),P(this,"_key",++e.currentKey),P(this,"index",void 0);var n={startIndex:0,pages:".wizerdform-page",controlsPosition:"bottom",controlsWrapper:!0,hiddenPageClass:"wizerdform-hidden-page",activePageClass:"wizerdform-active-page"};for(var i in r=r||n,n)n.hasOwnProperty(i)&&!r.hasOwnProperty(i)&&(r[i]=n[i]);this.options=r,this.form=t,this.controlsWrapper=void 0,this.controls={},this.pages=[],this.index=this.options.startIndex}var t,r,n;return t=e,(r=[{key:"init",value:function(){this.setInitialPages(),this.applyFormElementClasses(),this.goToPage(this.index),this.setControlsWrapper(),this.updateControls()}},{key:"destroy",value:function(){this.pages.forEach((function(e){e.removePageAttributes()})),this.pages=[],this.removeFormElementClasses(),this.goToPage(0),this.removeControls()}},{key:"applyFormElementClasses",value:function(){Array.prototype.forEach.call(this.form.elements,(function(e){e.classList.add("wizerdform-element")}))}},{key:"removeFormElementClasses",value:function(){Array.prototype.forEach.call(this.form.elements,(function(e){e.classList.remove("wizerdform-element")}))}},{key:"setInitialPages",value:function(){var e=this;(NodeList.prototype.isPrototypeOf(this.options.pages)||HTMLCollection.prototype.isPrototypeOf(this.options.pages)?Array.prototype.slice.call(this.options.pages):Array.prototype.slice.call(this.form.querySelectorAll(this.options.pages))).forEach((function(t,r){var n=new A(t,r,e.options);e.pages.push(n)}))}},{key:"getElements",value:function(){return this.form.getElementsByClassName("wizerdform-element")}},{key:"getValues",value:function(){var e=Array.prototype.filter.call(this.getElements(),(function(e){if(""!==e.name)return e}));return v(e)}},{key:"getPageByIndex",value:function(e){var t=!1;return this.pages.forEach((function(r){!1===t&&r.index===e&&(t=r)})),t}},{key:"getCurrentPage",value:function(){return this.getPageByIndex(this.index)}},{key:"goToPage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(e<0)return!1;Array.prototype.forEach.call(this.pages,(function(e){e.hide()})),this.pages[e].show()}},{key:"navigate",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(1===e&&!t&&!this.getCurrentPage().validate().valid||-1===e&&0===this.index)return!1;this.pages[this.index].hide();var r=new Event("wizerdForm_navigate",{cancelable:!0});if(this.form.dispatchEvent(r),this.index===this.pages.length-1&&e>0){var n=new Event("submit");this.form.dispatchEvent(n)}else this.index+=e;this.goToPage(this.index),this.updateControls()}},{key:"verifyNewPageIndex",value:function(e){return(e<0||e>this.pages.length)&&(e=this.pages.length),e}},{key:"prepareAddPage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,t=document.createElement("fieldset");e=this.verifyNewPageIndex(e);var r=new A(t,e,this.options);this.pages.splice(e,0,r);for(var n=e+1;n<this.pages.length;n++)this.pages[n].index=n;return t}},{key:"addPage",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;if("function"==typeof e&&(e=e()),o(e)&&""!==e){var r=this.prepareAddPage(t),n=this.pages[t+1];void 0!==n?this.form.insertBefore(r,n.page):this.form.insertBefore(r,this.pages[t-1].page.nextSibling),this.replacePage(t,e),this.applyFormElementClasses(),this.goToPage(this.index)}}},{key:"replacePage",value:function(e,t){void 0!==e&&void 0!==t&&("function"==typeof t&&(t=t()),o(t)&&""!==t&&(e=Math.min(this.verifyNewPageIndex(e),this.pages.length-1),this.pages[e].page.innerHTML=t))}},{key:"addFormControl",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=new g(e,t,r,n);return this.controls[e]=a,i&&this.updateControls(),a}},{key:"createElement",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return f(e,t,r)}},{key:"setControlsWrapper",value:function(){var e;if(!this.controlsWrapper)if(!1!==this.options.controlsWrapper&&"object"===C(this.options.controlsWrapper))e=this.options.controlsWrapper;else if(!1!==this.options.controlsWrapper){var t=document.createElement("div");t.className="wizerdform-controls",e=t,"bottom"===this.options.controlsPosition?this.form.appendChild(t):this.form.insertBefore(t,this.form.firstChild)}else e=this.form;return this.controlsWrapper=e,e}},{key:"updateControls",value:function(){if(void 0!==this.controlsWrapper&&"object"===C(this.controlsWrapper)){var e=h(f("fragment",{},E(Array.from(i(this.controls),(function(e){return e.data})))));i(this.controls).forEach((function(t,r){var n=e.childNodes[r];t.element=n})),p(e,this.controlsWrapper)}}},{key:"removeControls",value:function(){var e,t=this;i(this.controls).forEach((function(e){t.removeControl(e.key)})),void 0!==this.controlsWrapper&&"wizerdform-controls"===this.controlsWrapper.className&&(null===(e=this.controlsWrapper.parentNode)||void 0===e||e.removeChild(this.controlsWrapper))}},{key:"removeControl",value:function(e){this.controls.hasOwnProperty(e)&&(delete this.controls[e],this.updateControls())}},{key:"on",value:function(e,t){switch(e){case"input":case"change":this.evtHandleInput(t);break;case"error":this.evtHandleValidationError(t);break;case"navigate":this.evtHandleNavigation(t);break;case"submit":this.evtHandleSubmit(t)}}},{key:"evtHandleInput",value:function(e){var t=this;Array.prototype.forEach.call(this.getCurrentPage().getElements(),(function(r){r.addEventListener("keyup",(function(n){if(n.target===r){var i=r.value;e.bind(r,n,{wizerdForm:t,el:r,value:i})()}}))}))}},{key:"evtHandleValidationError",value:function(e){var t=this;Array.prototype.forEach.call(this.getCurrentPage().getElements(),(function(r){r.addEventListener("wizerdForm_validationFailed",(function(n){e.bind(r,n,{wizerdForm:t,el:r})()}))}))}},{key:"evtHandleNavigation",value:function(e){var t=this;this.form.addEventListener("wizerdForm_navigate",(function(r){var n=t.index;e.bind(t,r,{wizerdForm:t,index:n})()}))}},{key:"evtHandleSubmit",value:function(e){var t=this;this.form.addEventListener("submit",(function(r){e.bind(t,r,{wizerdForm:t})()}))}}])&&x(t.prototype,r),n&&x(t,n),e}();P(z,"currentKey",0);var D=z}},t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}return r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r(725)}().default}));