/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @mixin
 */
var Eventful = exports.Eventful = function Eventful() {
  return {
    listeners: {},

    /**
     * Listen to event
     *
     * @param {string} type
     * @param {function} listener
     * @param {object} [scope]
     *
     * @function
     * @return {Eventful}
     */
    on: function on(type, listener, scope) {
      /**
       * @typedef {object} Trigger
       * @property {function} listener
       * @property {object} scope
       */
      var trigger = {
        'listener': listener,
        'scope': scope
      };

      this.listeners[type] = this.listeners[type] || [];
      this.listeners[type].push(trigger);

      return this;
    },

    /**
     * Fire event. If any of the listeners returns false, return false
     *
     * @param {string} type
     * @param {object} [event]
     *
     * @function
     * @return {boolean}
     */
    fire: function fire(type, event) {
      var triggers = this.listeners[type] || [];

      return triggers.every(function (trigger) {
        return trigger.listener.call(trigger.scope || this, event) !== false;
      });
    },

    /**
     * Listens for events on another Eventful, and propagate it trough this Eventful
     *
     * @param {string[]} types
     * @param {Eventful} eventful
     */
    propagate: function propagate(types, eventful) {
      var self = this;
      types.forEach(function (type) {
        return eventful.on(type, function (event) {
          return self.fire(type, event);
        });
      });
    }
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns a curried version of a function
 *
 * @param {function} fn
 *
 * @public
 *
 * @return {function}
 */
var curry = exports.curry = function curry(fn) {
  var arity = fn.length;

  return function f1() {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= arity) {
      return fn.apply(null, args);
    } else {
      return function f2() {
        var args2 = Array.prototype.slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2));
      };
    }
  };
};

/**
 * Compose functions together, executing from right to left
 *
 * @param {function...} fns
 *
 * @function
 * @public
 *
 * @return {function}
 */
var compose = exports.compose = function compose() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  });
};

/**
 * Applies a function to each element in an array
 *
 * @param {function} fn
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var forEach = exports.forEach = curry(function (fn, arr) {
  arr.forEach(fn);
});

/**
 * Maps a function to an array
 *
 * @param {function} fn
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var map = exports.map = curry(function (fn, arr) {
  return arr.map(fn);
});

/**
 * Applies a filter to an array
 *
 * @param {function} fn
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var filter = exports.filter = curry(function (fn, arr) {
  return arr.filter(fn);
});

/**
 * Applies a some to an array
 *
 * @param {function} fn
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var some = exports.some = curry(function (fn, arr) {
  return arr.some(fn);
});

/**
 * Returns true if an array contains a value
 *
 * @param {*} value
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var contains = exports.contains = curry(function (value, arr) {
  return arr.indexOf(value) != -1;
});

/**
 * Returns an array without the supplied values
 *
 * @param {Array} values
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var without = exports.without = curry(function (values, arr) {
  return filter(function (value) {
    return !contains(value, values);
  }, arr);
});

/**
 * Takes a string that is either 'true' or 'false' and returns the opposite
 *
 * @param {string} bool
 *
 * @public
 * @return {string}
 */
var inverseBooleanString = exports.inverseBooleanString = function inverseBooleanString(bool) {
  return (bool !== 'true').toString();
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeListToArray = exports.classListContains = exports.removeChild = exports.querySelectorAll = exports.querySelector = exports.appendChild = exports.toggleAttribute = exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;

var _functional = __webpack_require__(1);

/**
 * Get an attribute value from element
 *
 * @param {string} name
 * @param {HTMLElement} el
 *
 * @function
 * @return {string}
 */
var getAttribute = exports.getAttribute = (0, _functional.curry)(function (name, el) {
  return el.getAttribute(name);
});

/**
 * Set an attribute on a html element
 *
 * @param {string} name
 * @param {string} value
 * @param {HTMLElement} el
 *
 * @function
 */
var setAttribute = exports.setAttribute = (0, _functional.curry)(function (name, value, el) {
  return el.setAttribute(name, value);
});

/**
 * Remove attribute from html element
 *
 * @param {string} name
 * @param {HTMLElement} el
 *
 * @function
 */
var removeAttribute = exports.removeAttribute = (0, _functional.curry)(function (name, el) {
  return el.removeAttribute(name);
});

/**
 * Check if element has an attribute
 *
 * @param {string} name
 * @param {HTMLElement} el
 *
 * @function
 * @return {boolean}
 */
var hasAttribute = exports.hasAttribute = (0, _functional.curry)(function (name, el) {
  return el.hasAttribute(name);
});

/**
 * Check if element has an attribute that equals
 *
 * @param {string} name
 * @param {string} value
 * @param {HTMLElement} el
 *
 * @function
 * @return {boolean}
 */
var attributeEquals = exports.attributeEquals = (0, _functional.curry)(function (name, value, el) {
  return el.getAttribute(name) === value;
});

/**
 * Toggles an attribute between 'true' and 'false';
 *
 * @param {string} name
 * @param {HTMLElement} el
 *
 * @function
 */
var toggleAttribute = exports.toggleAttribute = (0, _functional.curry)(function (name, el) {
  var value = getAttribute(name, el);
  setAttribute(name, (0, _functional.inverseBooleanString)(value), el);
});

/**
 * The appendChild() method adds a node to the end of the list of children of a specified parent node.
 *
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 *
 * @function
 * @return {HTMLElement}
 */
var appendChild = exports.appendChild = (0, _functional.curry)(function (parent, child) {
  return parent.appendChild(child);
});

/**
 * Returns the first element that is a descendant of the element on which it is invoked
 * that matches the specified group of selectors.
 *
 * @param {string} selector
 * @param {HTMLElement} el
 *
 * @function
 * @return {HTMLElement}
 */
var querySelector = exports.querySelector = (0, _functional.curry)(function (selector, el) {
  return el.querySelector(selector);
});

/**
 * Returns a non-live NodeList of all elements descended from the element on which it
 * is invoked that matches the specified group of CSS selectors.
 *
 * @param {string} selector
 * @param {HTMLElement} el
 *
 * @function
 * @return {NodeList}
 */
var querySelectorAll = exports.querySelectorAll = (0, _functional.curry)(function (selector, el) {
  return el.querySelectorAll(selector);
});

/**
 * The removeChild() method removes a child node from the DOM. Returns removed node.
 *
 * @param {Node} parent
 * @param {Node} oldChild
 *
 * @return {Node}
 */
var removeChild = exports.removeChild = (0, _functional.curry)(function (parent, oldChild) {
  return parent.removeChild(oldChild);
});

/**
 * Returns true if a node has a class
 *
 * @param {string} cls
 * @param {HTMLElement} el
 *
 * @function
 */
var classListContains = exports.classListContains = (0, _functional.curry)(function (cls, el) {
  return el.classList.contains(cls);
});

/**
 * Transforms a NodeList to an Array
 *
 * @param {NodeList} nodeList
 *
 * @return {Node[]}
 */
var nodeListToArray = exports.nodeListToArray = function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {object} ContentType
 * @property {string} machineName
 * @property {string} majorVersion
 * @property {string} minorVersion
 * @property {string} patchVersion
 * @property {string} h5pMajorVersion
 * @property {string} h5pMinorVersion
 * @property {string} summary
 * @property {string} description
 * @property {string} icon
 * @property {string} createdAt
 * @property {string} updated_At
 * @property {string} isRecommended
 * @property {string} popularity
 * @property {object[]} screenshots
 * @property {string} license
 * @property {string} example
 * @property {string} tutorial
 * @property {string[]} keywords
 * @property {string} owner
 * @property {boolean} installed
 * @property {boolean} restricted
 */
var HubServices = function () {
  /**
   * @param {string} apiRootUrl
   */
  function HubServices(_ref) {
    var apiRootUrl = _ref.apiRootUrl;

    _classCallCheck(this, HubServices);

    this.apiRootUrl = apiRootUrl;

    if (!window.cachedContentTypes) {
      // TODO remove this when done testing for errors
      // window.cachedContentTypes = fetch(`${this.apiRootUrl}errors/NO_RESPONSE.json`, {

      window.cachedContentTypes = fetch(this.apiRootUrl + 'content-type-cache', {
        method: 'GET',
        credentials: 'include'
      }).then(function (result) {
        return result.json();
      }).then(this.isValid).then(function (json) {
        return json.libraries;
      });
    }
  }

  /**
   *
   * @param  {ContentType[]|ErrorMessage} response
   * @return {Promise<ContentType[]|ErrorMessage>}
   */


  _createClass(HubServices, [{
    key: 'isValid',
    value: function isValid(response) {
      if (response.messageCode) {
        return Promise.reject(response);
      } else {
        return Promise.resolve(response);
      }
    }

    /**
     * Returns a list of content types
     *
     * @return {Promise.<ContentType[]>}
     */

  }, {
    key: 'contentTypes',
    value: function contentTypes() {
      return window.cachedContentTypes;
    }

    /**
     * Returns a Content Type
     *
     * @param {string} machineName
     *
     * @return {Promise.<ContentType>}
     */

  }, {
    key: 'contentType',
    value: function contentType(machineName) {
      return window.cachedContentTypes.then(function (contentTypes) {
        return contentTypes.filter(function (contentType) {
          return contentType.machineName === machineName;
        })[0];
      });

      /*return fetch(`${this.apiRootUrl}content_type_cache/${id}`, {
        method: 'GET',
        credentials: 'include'
      }).then(result => result.json());*/
    }

    /**
     * Installs a content type on the server
     *
     * @param {string} id
     *
     * @return {Promise.<ContentType>}
     */

  }, {
    key: 'installContentType',
    value: function installContentType(id) {
      return fetch(this.apiRootUrl + 'library-install?id=' + id, {
        method: 'POST',
        credentials: 'include',
        body: ''
      }).then(function (result) {
        return result.json();
      });
    }

    /**
     * Uploads a content type to the server for validation
     *
     * @param {FormData} formData Form containing the h5p that should be uploaded as 'h5p'
     *
     * @return {Promise} Returns the promise of a json containing the content json and the h5p json
     */

  }, {
    key: 'uploadContent',
    value: function uploadContent(formData) {
      return fetch(this.apiRootUrl + 'library-upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      }).then(function (result) {
        return result.json();
      });
    }
  }]);

  return HubServices;
}();

exports.default = HubServices;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderErrorMessage;
/**
 * @param  {string}   config.type         type of the message: info, success, error
 * @param  {boolean}  config.dismissible  whether the message can be dismissed
 * @param  {string}   config.content      message content usually a 'h3' and a 'p'
 * @return {HTMLElement} div containing the message element
 */

//TODO handle strings, html, badly formed object
function renderErrorMessage(message) {
  // console.log(message);
  var closeButton = document.createElement('div');
  closeButton.className = 'close';
  closeButton.innerHTML = '&#x2715';

  var messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.innerHTML = '<h1>' + message.title + '</h1>' + '<p>' + message.content + '</p>';

  var messageWrapper = document.createElement('div');
  messageWrapper.className = 'message' + ' ' + ('' + message.type) + (message.dismissible ? ' dismissible' : '');
  messageWrapper.appendChild(closeButton);
  messageWrapper.appendChild(messageContent);

  if (message.button !== undefined) {
    var messageButton = document.createElement('button');
    messageButton.className = 'button';
    messageButton.innerHTML = message.button;
    messageWrapper.appendChild(messageButton);
  }

  console.log(messageWrapper);
  return messageWrapper;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relayClickEventAs = undefined;

var _functional = __webpack_require__(1);

/**
 *  Transforms a DOM click event into an Eventful's event
 *  @see Eventful
 *
 * @param  {string | Object} type
 * @param  {Eventful} eventful
 * @param  {HTMLElement} element
 * @return {HTMLElement}
 */
var relayClickEventAs = exports.relayClickEventAs = (0, _functional.curry)(function (type, eventful, element) {
  element.addEventListener('click', function (event) {
    eventful.fire(type, {
      element: element,
      id: element.getAttribute('data-id')
    }, false);

    // don't bubble
    event.stopPropagation();
  });

  return element;
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

/**
 * @type {function}
 */
var isExpanded = (0, _elements.attributeEquals)("aria-expanded", 'true');

/**
 * @type {function}
 */
var hide = (0, _elements.setAttribute)('aria-hidden', 'true');

/**
 * @type {function}
 */
var show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * Toggles the body visibility
 *
 * @param {HTMLElement} bodyElement
 * @param {boolean} isExpanded
 */
var toggleBodyVisibility = function toggleBodyVisibility(bodyElement, isExpanded) {
  if (!isExpanded) {
    hide(bodyElement);
    //bodyElement.style.height = "0";
  } else /*if(bodyElement.scrollHeight > 0)*/{
      show(bodyElement);
      //bodyElement.style.height = `${bodyElement.scrollHeight}px`;
    }
};

/**
 * Handles changes to aria-expanded
 *
 * @param {HTMLElement} bodyElement
 * @param {MutationRecord} event
 *
 * @function
 */
var onAriaExpandedChange = (0, _functional.curry)(function (bodyElement, event) {
  toggleBodyVisibility(bodyElement, isExpanded(event.target));
});

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function init(element) {
  var titleEl = element.querySelector('[aria-expanded]');
  var bodyId = titleEl.getAttribute('aria-controls');
  var bodyEl = element.querySelector('#' + bodyId);

  if (titleEl) {
    // set observer on title for aria-expanded
    var observer = new MutationObserver((0, _functional.forEach)(onAriaExpandedChange(bodyEl)));

    observer.observe(titleEl, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["aria-expanded"]
    });

    // Set click listener that toggles aria-expanded
    titleEl.addEventListener('click', function (event) {
      (0, _elements.toggleAttribute)("aria-expanded", event.target);
    });

    toggleBodyVisibility(bodyEl, isExpanded(titleEl));
  }

  return element;
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjI1Ij4NCiAgPGRlZnM+DQogICAgPHN0eWxlPg0KICAgICAgLmNscy0xIHsNCiAgICAgIGZpbGw6IG5vbmU7DQogICAgICB9DQoNCiAgICAgIC5jbHMtMiB7DQogICAgICBmaWxsOiAjYzZjNmM3Ow0KICAgICAgfQ0KDQogICAgICAuY2xzLTMsIC5jbHMtNCB7DQogICAgICBmaWxsOiAjZmZmOw0KICAgICAgfQ0KDQogICAgICAuY2xzLTMgew0KICAgICAgb3BhY2l0eTogMC43Ow0KICAgICAgfQ0KICAgIDwvc3R5bGU+DQogIDwvZGVmcz4NCiAgPHRpdGxlPmNvbnRlbnQgdHlwZSBwbGFjZWhvbGRlcl8yPC90aXRsZT4NCiAgPGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+DQogICAgPGcgaWQ9ImNvbnRlbnRfdHlwZV9wbGFjZWhvbGRlci0xX2NvcHkiIGRhdGEtbmFtZT0iY29udGVudCB0eXBlIHBsYWNlaG9sZGVyLTEgY29weSI+DQogICAgICA8cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1Ii8+DQogICAgICA8cmVjdCBjbGFzcz0iY2xzLTIiIHg9IjExMi41MSIgeT0iNDMuNDEiIHdpZHRoPSIxNzYuOTYiIGhlaWdodD0iMTM1LjQ1IiByeD0iMTAiIHJ5PSIxMCIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxMzYuNjYiIGN5PSI2MS45OCIgcj0iNC44MSIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxNTEuNDkiIGN5PSI2MS45OCIgcj0iNC44MSIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxNjYuMSIgY3k9IjYxLjk4IiByPSI0LjgxIi8+DQogICAgICA8ZyBpZD0iX0dyb3VwXyIgZGF0YS1uYW1lPSImbHQ7R3JvdXAmZ3Q7Ij4NCiAgICAgICAgPGcgaWQ9Il9Hcm91cF8yIiBkYXRhLW5hbWU9IiZsdDtHcm91cCZndDsiPg0KICAgICAgICAgIDxwYXRoIGlkPSJfQ29tcG91bmRfUGF0aF8iIGRhdGEtbmFtZT0iJmx0O0NvbXBvdW5kIFBhdGgmZ3Q7IiBjbGFzcz0iY2xzLTQiIGQ9Ik0yNjMuMjgsOTUuMjFDMjYwLDkyLjA3LDI1NSw5MS41LDI0OC40Myw5MS41SDIyN3Y4SDE5OS41bC0yLjE3LDEwLjI0YTI1Ljg0LDI1Ljg0LDAsMCwxLDExLjQ4LTEuNjMsMTkuOTMsMTkuOTMsMCwwLDEsMTQuMzksNS41NywxOC4yNiwxOC4yNiwwLDAsMSw1LjUyLDEzLjYsMjMuMTEsMjMuMTEsMCwwLDEtMi44NCwxMS4wNSwxOC42NSwxOC42NSwwLDAsMS04LjA2LDcuNzksOSw5LDAsMCwxLTQuMTIsMS4zN0gyMzZ2LTIxaDEwLjQyYzcuMzYsMCwxMi44My0xLjYxLDE2LjQyLTVzNS4zOC03LjQ4LDUuMzgtMTMuNDRDMjY4LjIyLDEwMi4yOSwyNjYuNTcsOTguMzUsMjYzLjI4LDk1LjIxWm0tMTUsMTdjLTEuNDIsMS4yMi0zLjksMS4yNS03LjQxLDEuMjVIMjM2di0xNGg1LjYyYTkuNTcsOS41NywwLDAsMSw3LDIuOTMsNy4wNSw3LjA1LDAsMCwxLDEuODUsNC45MkE2LjMzLDYuMzMsMCwwLDEsMjQ4LjMxLDExMi4yNVoiLz4NCiAgICAgICAgICA8cGF0aCBpZD0iX1BhdGhfIiBkYXRhLW5hbWU9IiZsdDtQYXRoJmd0OyIgY2xhc3M9ImNscy00IiBkPSJNMjAyLjksMTE5LjExYTguMTIsOC4xMiwwLDAsMC03LjI4LDQuNTJsLTE2LTEuMjIsNy4yMi0zMC45MkgxNzR2MjJIMTUzdi0yMkgxMzZ2NTZoMTd2LTIxaDIxdjIxaDIwLjMxYy0yLjcyLDAtNS0xLjUzLTctM2ExOS4xOSwxOS4xOSwwLDAsMS00LjczLTQuODMsMjMuNTgsMjMuNTgsMCwwLDEtMy02LjZsMTYtMi4yNmE4LjExLDguMTEsMCwxLDAsNy4yNi0xMS43MloiLz4NCiAgICAgICAgPC9nPg0KICAgICAgPC9nPg0KICAgICAgPHJlY3QgY2xhc3M9ImNscy0zIiB4PSIxNzcuNjYiIHk9IjU3LjY2IiB3aWR0aD0iOTIuMjgiIGhlaWdodD0iOS4zOCIgcng9IjMuNSIgcnk9IjMuNSIvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hubView = __webpack_require__(16);

var _hubView2 = _interopRequireDefault(_hubView);

var _contentTypeSection = __webpack_require__(15);

var _contentTypeSection2 = _interopRequireDefault(_contentTypeSection);

var _uploadSection = __webpack_require__(18);

var _uploadSection2 = _interopRequireDefault(_uploadSection);

var _hubServices = __webpack_require__(3);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(0);

var _errors = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {object} HubState
 * @property {string} title
 * @property {string} sectionId
 * @property {boolean} expanded
 * @property {string} apiRootUrl
 */
/**
 * @typedef {object} ErrorMessage
 * @property {string} message
 * @property {string} errorCode
 */
/**
 * @typedef {object} SelectedElement
 * @property {HTMLElement} element
 * @property {string} id
 */
/**
 * Select event
 * @event Hub#select
 * @type {SelectedElement}
 */
/**
 * Error event
 * @event Hub#error
 * @type {ErrorMessage}
 */
/**
 * Upload event
 * @event Hub#upload
 * @type {Object}
 */
/**
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires Hub#error
 * @fires Hub#upload
 */
var Hub = function () {
  /**
   * @param {HubState} state
   */
  function Hub(state) {
    _classCallCheck(this, Hub);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // controllers
    this.contentTypeSection = new _contentTypeSection2.default(state);
    this.uploadSection = new _uploadSection2.default(state);

    // views
    this.view = new _hubView2.default(state);

    // services
    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // propagate controller events
    this.propagate(['select', 'error'], this.contentTypeSection);
    this.propagate(['upload'], this.uploadSection);

    // handle events
    this.on('select', this.setPanelTitle, this);
    this.on('select', this.view.closePanel, this.view);
    this.view.on('tab-change', this.view.setSectionType, this.view);
    this.view.on('panel-change', this.view.togglePanelOpen.bind(this.view), this.view);

    this.initTabPanel(state);
  }

  /**
   * Returns the promise of a content type
   * @param {string} machineName
   * @return {Promise.<ContentType>}
   */


  _createClass(Hub, [{
    key: 'getContentType',
    value: function getContentType(machineName) {
      return this.services.contentType(machineName);
    }

    /**
     * Sets the title of the panel
     *
     * @param {string} id
     */

  }, {
    key: 'setPanelTitle',
    value: function setPanelTitle(_ref) {
      var _this = this;

      var id = _ref.id;

      this.getContentType(id).then(function (_ref2) {
        var title = _ref2.title;
        return _this.view.setTitle(title);
      });
    }

    /**
     * Initiates the tab panel
     *
     * @param {string} sectionId
     */

  }, {
    key: 'initTabPanel',
    value: function initTabPanel(_ref3) {
      var _this2 = this;

      var _ref3$sectionId = _ref3.sectionId,
          sectionId = _ref3$sectionId === undefined ? 'content-types' : _ref3$sectionId;

      var tabConfigs = [{
        title: 'Create Content',
        id: 'content-types',
        content: this.contentTypeSection.getElement()
      }, {
        title: 'Upload',
        id: 'upload',
        content: this.uploadSection.getElement()
      }];

      // sets the correct one selected
      tabConfigs.filter(function (config) {
        return config.id === sectionId;
      }).forEach(function (config) {
        return config.selected = true;
      });

      tabConfigs.forEach(function (tabConfig) {
        return _this2.view.addTab(tabConfig);
      });
      this.view.addBottomBorder(); // Adds an animated bottom border to each tab
      this.view.initTabPanel();
    }

    /**
     * Returns the root element in the view
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return this.view.getElement();
    }
  }]);

  return Hub;
}();

exports.default = Hub;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

var _eventful = __webpack_require__(0);

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _imageScroller = __webpack_require__(19);

var _imageScroller2 = _interopRequireDefault(_imageScroller);

var _events = __webpack_require__(5);

var _contentTypePlaceholder = __webpack_require__(7);

var _contentTypePlaceholder2 = _interopRequireDefault(_contentTypePlaceholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @constant {string}
 */
var ATTRIBUTE_CONTENT_TYPE_ID = 'data-id';

/**
 * @constant {number}
 */
var MAX_TEXT_SIZE_DESCRIPTION = 300;

/**
 * @function
 */
var _hide = (0, _elements.setAttribute)('aria-hidden', 'true');

/**
 * @function
 */
var _show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * Toggles the visibility if an element
 *
 * @param {HTMLElement} element
 * @param {boolean} visible
 */
var toggleVisibility = function toggleVisibility(element, visible) {
  return (visible ? _show : _hide)(element);
};

/**
 * Checks if a string is empty
 *
 * @param {string} text
 *
 * @return {boolean}
 */
var isEmpty = function isEmpty(text) {
  return typeof text === 'string' && text.length === 0;
};

/**
 * @class
 * @mixes Eventful
 */

var ContentTypeDetailView = function () {
  function ContentTypeDetailView(state) {
    _classCallCheck(this, ContentTypeDetailView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    this.rootElement = this.createView();
    this.useButton = this.rootElement.querySelector('.button-use');
    this.installButton = this.rootElement.querySelector('.button-install');
    this.image = this.rootElement.querySelector('.content-type-image');
    this.title = this.rootElement.querySelector('.text-details h3');
    this.owner = this.rootElement.querySelector('.owner');
    this.description = this.rootElement.querySelector('.text-details .small');
    this.demoButton = this.rootElement.querySelector('.demo-button');
    this.carousel = this.rootElement.querySelector('.carousel');
    this.carouselList = this.carousel.querySelector('ul');
    this.licencePanel = this.rootElement.querySelector('.licence-panel');

    (0, _panel2.default)(this.licencePanel);

    (0, _imageScroller2.default)(this.carousel);

    // fire events on button click
    (0, _events.relayClickEventAs)('close', this, this.rootElement.querySelector('.back-button'));
    (0, _events.relayClickEventAs)('select', this, this.useButton);
    (0, _events.relayClickEventAs)('install', this, this.installButton);
  }

  /**
   * Creates the view as a HTMLElement
   *
   * @return {HTMLElement}
   */


  _createClass(ContentTypeDetailView, [{
    key: "createView",
    value: function createView() {
      var element = document.createElement('div');
      element.className = 'content-type-detail';
      element.setAttribute('aria-hidden', 'true');
      element.innerHTML = "\n      <div class=\"back-button icon-arrow-thick\"></div>\n      <div class=\"container\">\n        <div class=\"image-wrapper\"><img class=\"img-responsive content-type-image\" src=\"" + _contentTypePlaceholder2.default + "\"></div>\n        <div class=\"text-details\">\n          <h3></h3>\n          <div class=\"owner\"></div>\n          <p class=\"small\"></p>\n          <a class=\"button demo-button\" target=\"_blank\" aria-hidden=\"false\" href=\"https://h5p.org/chart\">Content Demo</a>\n        </div>\n      </div>\n      <div class=\"carousel\" role=\"region\" data-size=\"5\">\n        <span class=\"carousel-button previous icon-arrow-thick\" aria-hidden=\"true\" disabled></span>\n        <span class=\"carousel-button next icon-arrow-thick\" aria-hidden=\"true\" disabled></span>\n        <nav class=\"scroller\">\n          <ul></ul>\n        </nav>\n      </div>\n      <hr />\n      <div class=\"button-bar\">\n        <span class=\"button button-primary button-use\" aria-hidden=\"false\" data-id=\"H5P.Chart\">Use</span>\n        <span class=\"button button-inverse-primary button-install\" aria-hidden=\"true\" data-id=\"H5P.Chart\">Install</span>\n      </div>\n      <div class=\"panel-group\">\n        <div class=\"panel licence-panel\" aria-hidden=\"true\">\n          <div class=\"panel-header\" aria-expanded=\"false\" aria-controls=\"licence-panel\">The Licence Info</div>\n          <div class=\"panel-body\" id=\"licence-panel\" aria-hidden=\"true\">\n            <div class=\"panel-body-inner\"></div>\n          </div>\n        </div>\n      </div>";

      return element;
    }

    /**
     * Removes all images from the carousel
     */

  }, {
    key: "removeAllImagesInCarousel",
    value: function removeAllImagesInCarousel() {
      this.carouselList.querySelectorAll('li').forEach((0, _elements.removeChild)(this.carouselList));
      this.carousel.querySelectorAll('.carousel-lightbox').forEach((0, _elements.removeChild)(this.carousel));
    }

    /**
     * Add image to the carousel
     *
     * @param {object} image
     */

  }, {
    key: "addImageToCarousel",
    value: function addImageToCarousel(image) {
      // add lightbox
      var lightbox = document.createElement('div');
      lightbox.id = "lightbox-" + this.carouselList.childElementCount;
      lightbox.className = 'carousel-lightbox';
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.innerHTML = "<img class=\"img-responsive\" src=\"" + image.url + "\" alt=\"" + image.alt + "\">";
      this.carousel.appendChild(lightbox);

      // add thumbnail
      var thumbnail = document.createElement('li');
      thumbnail.className = 'slide';
      thumbnail.innerHTML = "<img src=\"" + image.url + "\" alt=\"" + image.alt + "\" class=\"img-responsive\" aria-controls=\"" + lightbox.id + "\" />";
      this.carouselList.appendChild(thumbnail);
    }

    /**
     * Sets the image
     *
     * @param {string} src
     */

  }, {
    key: "setImage",
    value: function setImage(src) {
      this.image.setAttribute('src', src || _contentTypePlaceholder2.default);
    }

    /**
     * Sets the title
     *
     * @param {string} id
     */

  }, {
    key: "setId",
    value: function setId(id) {
      this.installButton.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, id);
      this.useButton.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, id);
    }

    /**
     * Sets the title
     *
     * @param {string} title
     */

  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.title.innerHTML = "" + title;
    }

    /**
     * Sets the long description
     *
     * @param {string} text
     */

  }, {
    key: "setDescription",
    value: function setDescription(text) {
      var _this = this;

      if (text.length > MAX_TEXT_SIZE_DESCRIPTION) {
        this.description.innerHTML = this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text) + " <span class=\"read-more link\">Read more</span>";
        this.description.querySelector('.read-more, .read-less').addEventListener('click', function () {
          return _this.toggleDescriptionExpanded(text);
        });
        this.descriptionExpanded = false;
      } else {
        this.description.innerText = text;
      }
    }

    /**
     * Toggles Read less and Read more text
     *
     * @param {string} text
     */

  }, {
    key: "toggleDescriptionExpanded",
    value: function toggleDescriptionExpanded(text) {
      var _this2 = this;

      // flip boolean
      this.descriptionExpanded = !this.descriptionExpanded;

      if (this.descriptionExpanded) {
        this.description.innerHTML = text + " <span class=\"read-less link\">Read less</span>";
      } else {
        this.description.innerHTML = this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text) + " <span class=\"read-more link\">Read more</span>";
      }

      this.description.querySelector('.read-more, .read-less').addEventListener('click', function () {
        return _this2.toggleDescriptionExpanded(text);
      });
    }

    /**
     * Shortens a string, and puts an elipsis at the end
     *
     * @param {number} size
     * @param {string} text
     */

  }, {
    key: "ellipsis",
    value: function ellipsis(size, text) {
      return text.substr(0, size) + "...";
    }

    /**
     * Sets the licence
     *
     * @param {string} type
     */

  }, {
    key: "setLicence",
    value: function setLicence(type) {
      if (type) {
        this.licencePanel.querySelector('.panel-body-inner').innerText = type;
        _show(this.licencePanel);
      } else {
        _hide(this.licencePanel);
      }
    }

    /**
     * Sets the long description
     *
     * @param {string} owner
     */

  }, {
    key: "setOwner",
    value: function setOwner(owner) {
      if (owner) {
        this.owner.innerHTML = "By " + owner;
      } else {
        this.owner.innerHTML = '';
      }
    }

    /**
     * Sets the example url
     *
     * @param {string} url
     */

  }, {
    key: "setExample",
    value: function setExample(url) {
      this.demoButton.setAttribute('href', url || '#');
      toggleVisibility(this.demoButton, !isEmpty(url));
    }

    /**
     * Sets if the content type is installed
     *
     * @param {boolean} installed
     */

  }, {
    key: "setIsInstalled",
    value: function setIsInstalled(installed) {
      toggleVisibility(this.useButton, installed);
      toggleVisibility(this.installButton, !installed);
    }

    /**
     * Hides the root element
     */

  }, {
    key: "hide",
    value: function hide() {
      _hide(this.rootElement);
    }

    /**
     * Shows the root element
     */

  }, {
    key: "show",
    value: function show() {
      _show(this.rootElement);
    }

    /**
     * Returns the root html element
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.rootElement;
    }
  }]);

  return ContentTypeDetailView;
}();

exports.default = ContentTypeDetailView;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeDetailView = __webpack_require__(10);

var _contentTypeDetailView2 = _interopRequireDefault(_contentTypeDetailView);

var _hubServices = __webpack_require__(3);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes Eventful
 */
var ContentTypeDetail = function () {
  function ContentTypeDetail(state) {
    _classCallCheck(this, ContentTypeDetail);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // services
    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // views
    this.view = new _contentTypeDetailView2.default(state);
    this.view.on('install', this.install, this);

    // propagate events
    this.propagate(['close', 'select'], this.view);
  }

  /**
   * Hides the detail view
   */


  _createClass(ContentTypeDetail, [{
    key: "hide",
    value: function hide() {
      this.view.hide();
    }

    /**
     * Shows the detail view
     */

  }, {
    key: "show",
    value: function show() {
      this.view.show();
    }

    /**
     * Loads a Content Type description
     *
     * @param {string} id
     *
     * @return {Promise.<ContentType>}
     */

  }, {
    key: "loadById",
    value: function loadById(id) {
      this.services.contentType(id).then(this.update.bind(this));
    }

    /**
     * Loads a Content Type description
     *
     * @param {string} id
     *
     * @return {Promise.<ContentType>}
     */

  }, {
    key: "install",
    value: function install(_ref) {
      var _this = this;

      var id = _ref.id;

      return this.services.contentType(id).then(function (contentType) {
        return contentType.machineName;
      }).then(function (machineName) {
        return _this.services.installContentType(machineName);
      }).then(function (contentType) {
        return console.debug('TODO, gui updates');
      });
    }

    /**
     * Updates the view with the content type data
     *
     * @param {ContentType} contentType
     */

  }, {
    key: "update",
    value: function update(contentType) {
      this.view.setId(contentType.machineName);
      this.view.setTitle(contentType.title);
      this.view.setDescription(contentType.description);
      this.view.setImage(contentType.icon);
      this.view.setExample(contentType.example);
      this.view.setOwner(contentType.owner);
      this.view.setIsInstalled(!!contentType.installed);
      this.view.setLicence(contentType.license);

      // update carousel
      this.view.removeAllImagesInCarousel();
      contentType.screenshots.forEach(this.view.addImageToCarousel, this.view);
    }

    /**
     * Returns the root html element
     *
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.view.getElement();
    }
  }]);

  return ContentTypeDetail;
}();

exports.default = ContentTypeDetail;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functional = __webpack_require__(1);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(0);

var _events = __webpack_require__(5);

var _contentTypePlaceholder = __webpack_require__(7);

var _contentTypePlaceholder2 = _interopRequireDefault(_contentTypePlaceholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @function
 */
var _hide = (0, _elements.setAttribute)('aria-hidden', 'true');

/**
 * @function
 */
var _show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 */

var ContentTypeListView = function () {
  function ContentTypeListView(state) {
    _classCallCheck(this, ContentTypeListView);

    this.state = state;

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create root element
    this.rootElement = document.createElement('ul');
    this.rootElement.className = 'content-type-list';
  }

  /**
   * Hides the root element
   */


  _createClass(ContentTypeListView, [{
    key: "hide",
    value: function hide() {
      _hide(this.rootElement);
    }

    /**
     * Shows the root element
     */

  }, {
    key: "show",
    value: function show() {
      _show(this.rootElement);
    }

    /**
     * Removes all rows from root element
     */

  }, {
    key: "removeAllRows",
    value: function removeAllRows() {
      while (this.rootElement.hasChildNodes()) {
        this.rootElement.removeChild(this.rootElement.lastChild);
      }
    }

    /**
     * Adds a row
     *
     * @param {ContentType} contentType
     */

  }, {
    key: "addRow",
    value: function addRow(contentType) {
      var row = this.createContentTypeRow(contentType, this);
      (0, _events.relayClickEventAs)('row-selected', this, row);
      this.rootElement.appendChild(row);
    }

    /**
     * Takes a Content Type configuration and creates a row dom
     *
     * @param {ContentType} contentType
     * @param {Eventful} scope
     *
     * @return {HTMLElement}
     */

  }, {
    key: "createContentTypeRow",
    value: function createContentTypeRow(contentType, scope) {
      // row item
      var element = document.createElement('li');
      element.id = "content-type-" + contentType.machineName;
      element.setAttribute('data-id', contentType.machineName);

      // create button config
      var useButtonConfig = { text: 'Use', cls: 'button-primary' };
      var installButtonConfig = { text: 'install', cls: 'button-inverse-primary' };
      var button = contentType.installed ? useButtonConfig : installButtonConfig;

      var title = contentType.title || contentType.machineName;
      var description = contentType.summary || '';

      var image = contentType.icon || _contentTypePlaceholder2.default;

      // create html
      element.innerHTML = "\n      <img class=\"img-responsive\" src=\"" + image + "\">\n      <span class=\"button " + button.cls + "\" data-id=\"" + contentType.machineName + "\" tabindex=\"0\">" + button.text + "</span>\n      <h4>" + title + "</h4>\n      <div class=\"description\">" + description + "</div>\n   ";

      // handle use button
      var useButton = element.querySelector('.button-primary');
      if (useButton) {
        (0, _events.relayClickEventAs)('select', scope, useButton);
      }

      return element;
    }

    /**
     * Returns the root element
     *
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.rootElement;
    }
  }]);

  return ContentTypeListView;
}();

exports.default = ContentTypeListView;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeListView = __webpack_require__(12);

var _contentTypeListView2 = _interopRequireDefault(_contentTypeListView);

var _eventful = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Row selected event
 * @event ContentTypeList#row-selected
 * @type {SelectedElement}
 */
/**
 * Update content type list event
 * @event ContentTypeList#update-content-type-list
 * @type {SelectedElement}
 */
/**
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 * @fires ContentTypeList#update-content-type-list
 */
var ContentTypeList = function () {
  function ContentTypeList(state) {
    _classCallCheck(this, ContentTypeList);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // add the view
    this.view = new _contentTypeListView2.default(state);
    this.propagate(['row-selected', 'select'], this.view);
  }

  /**
   * Hide this element
   */


  _createClass(ContentTypeList, [{
    key: 'hide',
    value: function hide() {
      this.view.hide();
    }

    /**
     * Show this element
     */

  }, {
    key: 'show',
    value: function show() {
      this.view.show();
    }

    /**
     * Update the list with new content types
     *
     * @param {ContentType[]} contentTypes
     */

  }, {
    key: 'update',
    value: function update(contentTypes) {
      this.view.removeAllRows();
      contentTypes.forEach(this.view.addRow, this.view);
      this.fire('update-content-type-list', {});
    }

    /**
     * Returns the views root element
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return this.view.getElement();
    }
  }]);

  return ContentTypeList;
}();

exports.default = ContentTypeList;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventful = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ContentBrowserView
 * @mixes Eventful
 */
var ContentBrowserView = function () {
  /**
   * @constructor
   * @param {object} state
   */
  function ContentBrowserView(state) {
    _classCallCheck(this, ContentBrowserView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create elements
    var menu = this.createMenuElement();
    var inputGroup = this.createInputGroupElement();

    // menu group
    var menuGroup = document.createElement('div');
    menuGroup.className = 'menu-group';
    menuGroup.appendChild(menu);
    menuGroup.appendChild(inputGroup);

    // root element
    this.rootElement = document.createElement('div');
    this.rootElement.appendChild(menuGroup);
  }

  /**
   * Adds a menu item
   *
   * @param {string} text
   *
   * @return {HTMLElement}
   */


  _createClass(ContentBrowserView, [{
    key: 'addMenuItem',
    value: function addMenuItem(text) {
      var _this = this;

      var element = document.createElement('li');
      element.setAttribute('role', 'menuitem');
      element.innerHTML = text;

      element.addEventListener('click', function (event) {
        _this.fire('menu-selected', {
          element: event.target
        });
      });

      // sets first to be selected
      if (this.menuBarElement.childElementCount < 1) {
        element.setAttribute('aria-selected', 'true');
      }

      // add to menu bar
      this.menuBarElement.appendChild(element);

      return element;
    }

    /**
     * Creates the menu bar element
     *
     * @return {Element}
     */

  }, {
    key: 'createMenuElement',
    value: function createMenuElement() {
      this.menuBarElement = document.createElement('ul');
      this.menuBarElement.setAttribute('role', 'menubar');
      this.menuBarElement.className = 'h5p-menu';

      var navElement = document.createElement('nav');
      navElement.appendChild(this.menuBarElement);

      var title = document.createElement('div');
      title.className = "menu-title";
      title.innerHTML = "Browse content types";

      var menu = document.createElement('div');
      menu.className = "menu";
      menu.appendChild(title);
      menu.appendChild(navElement);

      return menu;
    }

    /**
     * Creates the input group used for search
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'createInputGroupElement',
    value: function createInputGroupElement() {
      var _this2 = this;

      // input field
      var inputField = document.createElement('input');
      inputField.id = "hub-search-bar";
      inputField.className = 'form-control form-control-rounded';
      inputField.setAttribute('type', 'text');
      inputField.setAttribute('placeholder', "Search for Content Types");
      inputField.addEventListener('keyup', function (event) {
        _this2.fire('search', {
          element: event.target,
          query: event.target.value
        });
      });

      // input button
      var inputButton = document.createElement('div');
      inputButton.className = 'input-group-addon icon-search';
      inputButton.onclick = function () {
        this.parentElement.querySelector('#search-bar').focus();
      };

      // input group
      var inputGroup = document.createElement('div');
      inputGroup.className = 'input-group';
      inputGroup.appendChild(inputField);
      inputGroup.appendChild(inputButton);

      return inputGroup;
    }

    /**
     * Returns the root element of the content browser
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return this.rootElement;
    }
  }]);

  return ContentBrowserView;
}();

exports.default = ContentBrowserView;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeSectionView = __webpack_require__(14);

var _contentTypeSectionView2 = _interopRequireDefault(_contentTypeSectionView);

var _searchService = __webpack_require__(17);

var _searchService2 = _interopRequireDefault(_searchService);

var _contentTypeList = __webpack_require__(13);

var _contentTypeList2 = _interopRequireDefault(_contentTypeList);

var _contentTypeDetail = __webpack_require__(11);

var _contentTypeDetail2 = _interopRequireDefault(_contentTypeDetail);

var _eventful = __webpack_require__(0);

var _errors = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ContentTypeSection
 * @mixes Eventful
 *
 * @fires Hub#select
 */
var ContentTypeSection = function () {
  /**
   * @param {HubState} state
   */
  function ContentTypeSection(state) {
    var _this = this;

    _classCallCheck(this, ContentTypeSection);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // add view
    this.view = new _contentTypeSectionView2.default(state);

    // controller
    this.searchService = new _searchService2.default({ apiRootUrl: state.apiRootUrl });
    this.contentTypeList = new _contentTypeList2.default();
    this.contentTypeDetail = new _contentTypeDetail2.default({ apiRootUrl: state.apiRootUrl });

    // add menu items
    ['My Content Types', 'Newest', 'Most Popular', 'Recommended'].forEach(function (menuText) {
      return _this.view.addMenuItem(menuText);
    });

    // Element for holding list and details views
    var section = document.createElement('div');
    section.classList.add('content-type-section');

    this.rootElement = section;
    this.rootElement.appendChild(this.contentTypeList.getElement());
    this.rootElement.appendChild(this.contentTypeDetail.getElement());

    this.view.getElement().appendChild(this.rootElement);

    // propagate events
    this.propagate(['select', 'update-content-type-list'], this.contentTypeList);
    this.propagate(['select'], this.contentTypeDetail);

    // register listeners
    this.view.on('search', this.search, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
    this.contentTypeList.on('row-selected', this.showDetailView, this);
    this.contentTypeDetail.on('close', this.closeDetailView, this);
    this.contentTypeDetail.on('select', this.closeDetailView, this);

    this.initContentTypeList();
  }

  /**
   * Initiates the content type list with a search
   */


  _createClass(ContentTypeSection, [{
    key: "initContentTypeList",
    value: function initContentTypeList() {
      var _this2 = this;

      // initialize by search
      this.searchService.search("").then(function (contentTypes) {
        return _this2.contentTypeList.update(contentTypes);
      }).catch(function (error) {
        return _this2.fire('error', error);
      });
    }

    /**
     * Executes a search and updates the content type list
     *
     * @param {string} query
     */

  }, {
    key: "search",
    value: function search(_ref) {
      var _this3 = this;

      var query = _ref.query;

      this.searchService.search(query).then(function (contentTypes) {
        return _this3.contentTypeList.update(contentTypes);
      });
    }

    /**
     * Should apply a search filter
     */

  }, {
    key: "applySearchFilter",
    value: function applySearchFilter() {
      console.debug('ContentTypeSection: menu was clicked!', event);
    }

    /**
     * Shows detail view
     *
     * @param {string} id
     */

  }, {
    key: "showDetailView",
    value: function showDetailView(_ref2) {
      var id = _ref2.id;

      this.contentTypeList.hide();
      this.contentTypeDetail.loadById(id);
      this.contentTypeDetail.show();
    }

    /**
     * Close detail view
     */

  }, {
    key: "closeDetailView",
    value: function closeDetailView() {
      this.contentTypeDetail.hide();
      this.contentTypeList.show();
    }

    /**
     * Returns the element
     *
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.view.getElement();
    }
  }]);

  return ContentTypeSection;
}();

exports.default = ContentTypeSection;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _tabPanel = __webpack_require__(20);

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _functional = __webpack_require__(1);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(0);

var _events = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Tab change event
 * @event HubView#tab-change
 * @type {SelectedElement}
 */
/**
 * Panel open or close event
 * @event HubView#panel-change
 * @type {SelectedElement}
 */
/**
 * @constant {string}
 */
var ATTRIBUTE_DATA_ID = 'data-id';

/**
 * @function
 */
var isOpen = (0, _elements.hasAttribute)('open');

/**
 * @class
 * @mixes Eventful
 * @fires HubView#tab-change
 */

var HubView = function () {
  /**
   * @param {HubState} state
   */
  function HubView(state) {
    _classCallCheck(this, HubView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    this.renderTabPanel(state);
    this.renderPanel(state);
  }

  /**
   * Closes the panel
   */


  _createClass(HubView, [{
    key: "closePanel",
    value: function closePanel() {
      this.title.setAttribute('aria-expanded', 'false');
    }

    /**
     * Sets the title
     *
     * @param {string} title
     */

  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.title.innerHTML = title;
    }

    /**
     * Creates the dom for the panel
     *
     * @param {string} title
     * @param {string} sectionId
     * @param {boolean} expanded
     */

  }, {
    key: "renderPanel",
    value: function renderPanel(_ref) {
      var _ref$title = _ref.title,
          title = _ref$title === undefined ? '' : _ref$title,
          _ref$sectionId = _ref.sectionId,
          sectionId = _ref$sectionId === undefined ? 'content-types' : _ref$sectionId,
          _ref$expanded = _ref.expanded,
          expanded = _ref$expanded === undefined ? false : _ref$expanded;

      /**
       * @type {HTMLElement}
       */
      this.title = document.createElement('div');
      this.title.className += "panel-header icon-hub-icon";
      this.title.setAttribute('aria-expanded', (!!expanded).toString());
      this.title.setAttribute('aria-controls', "panel-body-" + sectionId);
      this.title.innerHTML = title;
      (0, _events.relayClickEventAs)('panel-change', this, this.title);

      /**
       * @type {HTMLElement}
       */
      this.body = document.createElement('div');
      this.body.className += "panel-body";
      this.body.setAttribute('aria-hidden', (!expanded).toString());
      this.body.id = "panel-body-" + sectionId;
      this.body.appendChild(this.tabContainerElement);

      /**
       * @type {HTMLElement}
       */
      this.panel = document.createElement('div');
      this.panel.className += "panel h5p-section-" + sectionId;
      if (expanded) {
        this.panel.setAttribute('open', '');
      }
      this.panel.appendChild(this.title);
      this.panel.appendChild(this.body);
      /**
       * @type {HTMLElement}
       */
      this.rootElement = document.createElement('div');
      this.rootElement.className += "h5p h5p-hub";
      this.rootElement.appendChild(this.panel);
      (0, _panel2.default)(this.rootElement);
    }

    /**
     * Set if panel is open, this is used for outer border color
     */

  }, {
    key: "togglePanelOpen",
    value: function togglePanelOpen() {
      var panel = this.panel;
      if (isOpen(panel)) {
        panel.removeAttribute('open');
      } else {
        panel.setAttribute('open', '');
        setTimeout(function () {
          panel.querySelector('#hub-search-bar').focus();
        }, 20);
      }
    }

    /**
     * Creates the dom for the tab panel
     */

  }, {
    key: "renderTabPanel",
    value: function renderTabPanel(state) {
      /**
       * @type {HTMLElement}
       */
      this.tablist = document.createElement('ul');
      this.tablist.className += "tablist";
      this.tablist.setAttribute('role', 'tablist');

      /**
       * @type {HTMLElement}
       */
      this.tabListWrapper = document.createElement('nav');
      this.tabListWrapper.appendChild(this.tablist);

      /**
       * @type {HTMLElement}
       */
      this.tabContainerElement = document.createElement('div');
      this.tabContainerElement.className += 'tab-panel';
      this.tabContainerElement.appendChild(this.tabListWrapper);
    }

    /**
     * Adds a tab
     *
     * @param {string} title
     * @param {string} id
     * @param {HTMLElement} content
     * @param {boolean} selected
     */

  }, {
    key: "addTab",
    value: function addTab(_ref2) {
      var title = _ref2.title,
          id = _ref2.id,
          content = _ref2.content,
          _ref2$selected = _ref2.selected,
          selected = _ref2$selected === undefined ? false : _ref2$selected;

      var tabId = "tab-" + id;
      var tabPanelId = "tab-panel-" + id;

      var tab = document.createElement('li');
      tab.className += 'tab';
      tab.id = tabId;
      tab.setAttribute('aria-controls', tabPanelId);
      tab.setAttribute('aria-selected', selected.toString());
      tab.setAttribute(ATTRIBUTE_DATA_ID, id);
      tab.setAttribute('role', 'tab');
      tab.innerHTML = title;
      (0, _events.relayClickEventAs)('tab-change', this, tab);

      var tabPanel = document.createElement('div');
      tabPanel.id = tabPanelId;
      tabPanel.className += 'tabpanel';
      tabPanel.setAttribute('aria-lablledby', tabId);
      tabPanel.setAttribute('aria-hidden', (!selected).toString());
      tabPanel.setAttribute('role', 'tabpanel');
      tabPanel.appendChild(content);

      this.tablist.appendChild(tab);
      this.tabContainerElement.appendChild(tabPanel);
    }

    /**
     * Adds an animated border to the bottom of the tab
     */

  }, {
    key: "addBottomBorder",
    value: function addBottomBorder() {
      this.tablist.appendChild(document.createElement('span'));
    }
  }, {
    key: "initTabPanel",
    value: function initTabPanel() {
      (0, _tabPanel2.default)(this.tabContainerElement);
    }

    /**
     * Sets the section
     *
     * @param {string} id
     */

  }, {
    key: "setSectionType",
    value: function setSectionType(_ref3) {
      var id = _ref3.id;

      this.panel.className = "h5p-section-" + id + " panel";
    }

    /**
     * Returns the root html element
     *
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.rootElement;
    }
  }]);

  return HubView;
}();

exports.default = HubView;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functional = __webpack_require__(1);

var _hubServices = __webpack_require__(3);

var _hubServices2 = _interopRequireDefault(_hubServices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * The Search Service gets a content type from hub-services.js
 * in the form of a promise. It then generates a score based
 * on the different weightings of the content type fields and
 * sorts the results based on the generated score.
 */
var SearchService = function () {
  /**
   * @param {Object} state
   * @param {string} state.apiRootUrl
   */
  function SearchService(state) {
    _classCallCheck(this, SearchService);

    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // Add content types to the search index
    this.contentTypes = this.services.contentTypes();
  }

  /**
   * Performs a search
   *
   * @param {String} query
   *
   * @return {Promise<ContentType[]>} A promise of an array of content types
   */


  _createClass(SearchService, [{
    key: 'search',
    value: function search(query) {
      return this.contentTypes.then(filterByQuery(query));
    }
  }]);

  return SearchService;
}();

/**
 * Filters a list of content types based on a query
 * @type {Function}
 *
 * @param {string} query
 * @param {ContentType[]} contentTypes
 */


exports.default = SearchService;
var filterByQuery = (0, _functional.curry)(function (query, contentTypes) {
  if (query == '') {
    return contentTypes;
  }

  // Append a search score to each content type
  contentTypes = contentTypes.map(function (contentType) {
    return {
      contentType: contentType,
      score: 0
    };
  });

  // Tokenize query and sanitize
  var queries = query.split(' ').filter(function (query) {
    return query !== '';
  });

  // Loop through queries and generate a relevance score
  for (var i = 0; i < queries.length; i++) {
    if (i > 0) {
      // Search a smaller subset each time
      contentTypes = contentTypes.filter(function (result) {
        return result.score > 0;
      });
    }
    contentTypes.forEach(function (contentType) {
      return contentType.score = getSearchScore(queries[i], contentType.contentType);
    });
  }

  return contentTypes.filter(function (result) {
    return result.score > 0;
  }).sort(sortSearchResults) // Sort by installed, relevance and popularity
  .map(function (result) {
    return result.contentType;
  }); // Unwrap result object;
});

/**
 * Callback for Array.sort()
 * Compares two content types on different criteria
 *
 * @param {Object} a First content type
 * @param {Object} b Second content type
 * @return {int}
 */
var sortSearchResults = function sortSearchResults(a, b) {
  if (!a.contentType.installed && b.contentType.installed) {
    return 1;
  } else if (b.score !== a.score) {
    return b.score - a.score;
  } else {
    return b.contentType.popularity - a.contentType.popularity;
  }
};

/**
 * Calculates weighting for different search terms based
 * on existence of substrings
 *
 * @param  {string} query
 * @param  {Object} contentType
 * @return {int}
 */
var getSearchScore = function getSearchScore(query, contentType) {
  console.log(contentType);
  query = query.trim();
  var score = 0;
  if (hasSubString(query, contentType.title)) {
    score += 100;
  }
  if (hasSubString(query, contentType.summary)) {
    score += 5;
  }
  if (hasSubString(query, contentType.description)) {
    score += 5;
  }
  if (arrayHasSubString(query, contentType.keywords)) {
    score += 5;
  }
  return score;
};

/**
 * Checks if a needle is found in the haystack.
 * Not case sensitive
 *
 * @param {string} needle
 * @param {string} haystack
 * @return {boolean}
 */
var hasSubString = function hasSubString(needle, haystack) {
  if (haystack === undefined) {
    return false;
  }

  return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
};

/**
 * Helper function, checks if array has contains a substring
 *
 * @param  {String} subString
 * @param  {Array} arr
 * @return {boolean}
 */
var arrayHasSubString = function arrayHasSubString(subString, arr) {
  if (arr === undefined || subString === '') {
    return false;
  }

  return arr.some(function (string) {
    return hasSubString(subString, string);
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hubServices = __webpack_require__(3);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes Eventful
 *
 * @fires Hub#upload
 */
var UploadSection = function () {
  function UploadSection(state) {
    var _this = this;

    _classCallCheck(this, UploadSection);

    var self = this;
    _extends(this, (0, _eventful.Eventful)());

    // services
    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // Input element for the H5P file
    var h5pUpload = document.createElement('input');
    h5pUpload.setAttribute('type', 'file');

    // Sends the H5P file to the plugin
    var useButton = document.createElement('button');
    useButton.textContent = 'Use';
    useButton.addEventListener('click', function () {

      // Add the H5P file to a form, ready for transportation
      var data = new FormData();
      data.append('h5p', h5pUpload.files[0]);

      // Upload content to the plugin
      _this.services.uploadContent(data).then(function (json) {
        // Fire the received data to any listeners
        self.fire('upload', json);
      });
    });

    var element = document.createElement('div');
    element.appendChild(h5pUpload);
    element.appendChild(useButton);

    this.rootElement = element;
  }

  _createClass(UploadSection, [{
    key: 'getElement',
    value: function getElement() {
      return this.rootElement;
    }
  }]);

  return UploadSection;
}();

exports.default = UploadSection;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

/**
 * @constant
 */
var ATTRIBUTE_SIZE = 'data-size';

/**
 * @type {function}
 */
var disable = (0, _elements.setAttribute)('disabled', '');

/**
 * @type {function}
 */
var enable = (0, _elements.removeAttribute)('disabled');

/**
 * @param {HTMLElement} element
 * @param {boolean} enabled
 */
var toggleEnabled = function toggleEnabled(element, enabled) {
  return (enabled ? enable : disable)(element);
};

/**
 * @param {HTMLElement} element
 * @param {boolean} hidden
 */
var toggleVisibility = (0, _functional.curry)(function (hidden, element) {
  return (0, _elements.setAttribute)('aria-hidden', hidden.toString(), element);
});

/**
 * @type {function}
 */
var isDisabled = (0, _elements.hasAttribute)('disabled');

/**
 * Update the view
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 */
var updateView = function updateView(element, state) {
  var prevButton = element.querySelector('.previous');
  var nextButton = element.querySelector('.next');
  var list = element.querySelector('ul');
  var totalCount = list.childElementCount;

  // update list sizes
  list.style.width = 100 / state.displayCount * totalCount + '%';
  list.style.marginLeft = state.position * (100 / state.displayCount) + '%';

  // update image sizes
  element.querySelectorAll('li').forEach(function (element) {
    return element.style.width = 100 / totalCount + '%';
  });

  // toggle button visibility
  [prevButton, nextButton].forEach(toggleVisibility(state.displayCount >= totalCount));

  // toggle button enable, disabled
  toggleEnabled(nextButton, state.position > state.displayCount - totalCount);
  toggleEnabled(prevButton, state.position < 0);
};

/**
 * Handles button clicked
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 * @param {function} updateState
 * @param {Event}
 * @function
 */
var onNavigationButtonClick = (0, _functional.curry)(function (element, state, updateState, event) {
  if (!isDisabled(event.target)) {
    updateState(state);
    updateView(element, state);
  }
});

var initImage = (0, _functional.curry)(function (element, image) {
  var targetId = image.getAttribute('aria-controls');
  var target = element.querySelector('#' + targetId);

  target.addEventListener('click', function (event) {
    return target.setAttribute('aria-hidden', 'true');
  });
  image.addEventListener('click', function (event) {
    return target.setAttribute('aria-hidden', 'false');
  });
});

/**
 * Callback for when the dom is updated
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 * @param {MutationRecord} record
 * @function
 */
var handleDomUpdate = (0, _functional.curry)(function (element, state, record) {
  // on add image run initialization
  if (record.type === 'childList') {
    (0, _elements.nodeListToArray)(record.addedNodes).filter((0, _elements.classListContains)('slide')).map((0, _elements.querySelector)('img')).forEach(initImage(element));
  }

  // update the view
  updateView(element, _extends(state, {
    displayCount: element.getAttribute(ATTRIBUTE_SIZE) || 5,
    position: 0
  }));
});

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function init(element) {
  /**
   * @typedef {object} ImageScrollerState
   * @property {number} displayCount
   * @property {number} position
   */
  var state = {
    displayCount: element.getAttribute(ATTRIBUTE_SIZE) || 5,
    position: 0
  };

  // initialize buttons
  element.querySelector('.next').addEventListener('click', onNavigationButtonClick(element, state, function (state) {
    return state.position--;
  }));
  element.querySelector('.previous').addEventListener('click', onNavigationButtonClick(element, state, function (state) {
    return state.position++;
  }));

  // initialize images
  element.querySelectorAll('[aria-controls]').forEach(initImage(element));

  // listen for updates to data-size
  var observer = new MutationObserver((0, _functional.forEach)(handleDomUpdate(element, state)));

  observer.observe(element, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [ATTRIBUTE_SIZE]
  });

  // initialize position
  updateView(element, state);

  return element;
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

/**
 * @type {function}
 */
var hideAll = (0, _functional.forEach)((0, _elements.setAttribute)('aria-hidden', 'true'));

/**
 * @type {function}
 */
var show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * @type {function}
 */
var unSelectAll = (0, _functional.forEach)((0, _elements.setAttribute)('aria-selected', 'false'));

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
function init(element) {
  var tabs = element.querySelectorAll('[role="tab"]');
  var tabPanels = element.querySelectorAll('[role="tabpanel"]');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {

      unSelectAll(tabs);
      event.target.setAttribute('aria-selected', 'true');

      hideAll(tabPanels);

      var tabPanelId = event.target.getAttribute('aria-controls');
      show(element.querySelector('#' + tabPanelId));
    });
  });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(8).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(4).default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWJhYWViZjBkNTYyN2U3MjQ3ODMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvbWFpbi5zY3NzPzZhNzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwibmFtZXMiOlsiRXZlbnRmdWwiLCJsaXN0ZW5lcnMiLCJvbiIsInR5cGUiLCJsaXN0ZW5lciIsInNjb3BlIiwidHJpZ2dlciIsInB1c2giLCJmaXJlIiwiZXZlbnQiLCJ0cmlnZ2VycyIsImV2ZXJ5IiwiY2FsbCIsInByb3BhZ2F0ZSIsInR5cGVzIiwiZXZlbnRmdWwiLCJzZWxmIiwiZm9yRWFjaCIsImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJuYW1lIiwiZWwiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVFcXVhbHMiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBhcmVudCIsImNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZUNoaWxkIiwib2xkQ2hpbGQiLCJjbGFzc0xpc3RDb250YWlucyIsImNscyIsImNsYXNzTGlzdCIsIm5vZGVMaXN0VG9BcnJheSIsIm5vZGVMaXN0IiwiSHViU2VydmljZXMiLCJhcGlSb290VXJsIiwid2luZG93IiwiY2FjaGVkQ29udGVudFR5cGVzIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsInRoZW4iLCJyZXN1bHQiLCJqc29uIiwiaXNWYWxpZCIsImxpYnJhcmllcyIsInJlc3BvbnNlIiwibWVzc2FnZUNvZGUiLCJQcm9taXNlIiwicmVqZWN0IiwicmVzb2x2ZSIsIm1hY2hpbmVOYW1lIiwiY29udGVudFR5cGVzIiwiY29udGVudFR5cGUiLCJpZCIsImJvZHkiLCJmb3JtRGF0YSIsInJlbmRlckVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjbG9zZUJ1dHRvbiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsIm1lc3NhZ2VDb250ZW50IiwidGl0bGUiLCJjb250ZW50IiwibWVzc2FnZVdyYXBwZXIiLCJkaXNtaXNzaWJsZSIsImJ1dHRvbiIsInVuZGVmaW5lZCIsIm1lc3NhZ2VCdXR0b24iLCJjb25zb2xlIiwibG9nIiwicmVsYXlDbGlja0V2ZW50QXMiLCJlbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0b3BQcm9wYWdhdGlvbiIsImluaXQiLCJpc0V4cGFuZGVkIiwiaGlkZSIsInNob3ciLCJ0b2dnbGVCb2R5VmlzaWJpbGl0eSIsImJvZHlFbGVtZW50Iiwib25BcmlhRXhwYW5kZWRDaGFuZ2UiLCJ0YXJnZXQiLCJ0aXRsZUVsIiwiYm9keUlkIiwiYm9keUVsIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVPbGRWYWx1ZSIsImF0dHJpYnV0ZUZpbHRlciIsIkh1YiIsInN0YXRlIiwiY29udGVudFR5cGVTZWN0aW9uIiwidXBsb2FkU2VjdGlvbiIsInZpZXciLCJzZXJ2aWNlcyIsInNldFBhbmVsVGl0bGUiLCJjbG9zZVBhbmVsIiwic2V0U2VjdGlvblR5cGUiLCJ0b2dnbGVQYW5lbE9wZW4iLCJiaW5kIiwiaW5pdFRhYlBhbmVsIiwiZ2V0Q29udGVudFR5cGUiLCJzZXRUaXRsZSIsInNlY3Rpb25JZCIsInRhYkNvbmZpZ3MiLCJnZXRFbGVtZW50IiwiY29uZmlnIiwic2VsZWN0ZWQiLCJhZGRUYWIiLCJ0YWJDb25maWciLCJhZGRCb3R0b21Cb3JkZXIiLCJBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEIiwiTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiIsInRvZ2dsZVZpc2liaWxpdHkiLCJ2aXNpYmxlIiwiaXNFbXB0eSIsInRleHQiLCJDb250ZW50VHlwZURldGFpbFZpZXciLCJyb290RWxlbWVudCIsImNyZWF0ZVZpZXciLCJ1c2VCdXR0b24iLCJpbnN0YWxsQnV0dG9uIiwiaW1hZ2UiLCJvd25lciIsImRlc2NyaXB0aW9uIiwiZGVtb0J1dHRvbiIsImNhcm91c2VsIiwiY2Fyb3VzZWxMaXN0IiwibGljZW5jZVBhbmVsIiwibGlnaHRib3giLCJjaGlsZEVsZW1lbnRDb3VudCIsInVybCIsImFsdCIsInRodW1ibmFpbCIsInNyYyIsImVsbGlwc2lzIiwidG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCIsImRlc2NyaXB0aW9uRXhwYW5kZWQiLCJpbm5lclRleHQiLCJzaXplIiwic3Vic3RyIiwiaW5zdGFsbGVkIiwiQ29udGVudFR5cGVEZXRhaWwiLCJpbnN0YWxsIiwidXBkYXRlIiwiaW5zdGFsbENvbnRlbnRUeXBlIiwiZGVidWciLCJzZXRJZCIsInNldERlc2NyaXB0aW9uIiwic2V0SW1hZ2UiLCJpY29uIiwic2V0RXhhbXBsZSIsImV4YW1wbGUiLCJzZXRPd25lciIsInNldElzSW5zdGFsbGVkIiwic2V0TGljZW5jZSIsImxpY2Vuc2UiLCJyZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsIiwic2NyZWVuc2hvdHMiLCJhZGRJbWFnZVRvQ2Fyb3VzZWwiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiaGFzQ2hpbGROb2RlcyIsImxhc3RDaGlsZCIsInJvdyIsImNyZWF0ZUNvbnRlbnRUeXBlUm93IiwidXNlQnV0dG9uQ29uZmlnIiwiaW5zdGFsbEJ1dHRvbkNvbmZpZyIsInN1bW1hcnkiLCJDb250ZW50VHlwZUxpc3QiLCJyZW1vdmVBbGxSb3dzIiwiYWRkUm93IiwiQ29udGVudEJyb3dzZXJWaWV3IiwibWVudSIsImNyZWF0ZU1lbnVFbGVtZW50IiwiaW5wdXRHcm91cCIsImNyZWF0ZUlucHV0R3JvdXBFbGVtZW50IiwibWVudUdyb3VwIiwibWVudUJhckVsZW1lbnQiLCJuYXZFbGVtZW50IiwiaW5wdXRGaWVsZCIsInF1ZXJ5IiwiaW5wdXRCdXR0b24iLCJvbmNsaWNrIiwicGFyZW50RWxlbWVudCIsImZvY3VzIiwiQ29udGVudFR5cGVTZWN0aW9uIiwic2VhcmNoU2VydmljZSIsImNvbnRlbnRUeXBlTGlzdCIsImNvbnRlbnRUeXBlRGV0YWlsIiwiYWRkTWVudUl0ZW0iLCJtZW51VGV4dCIsInNlY3Rpb24iLCJhZGQiLCJzZWFyY2giLCJhcHBseVNlYXJjaEZpbHRlciIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImNhdGNoIiwiZXJyb3IiLCJsb2FkQnlJZCIsIkFUVFJJQlVURV9EQVRBX0lEIiwiaXNPcGVuIiwiSHViVmlldyIsInJlbmRlclRhYlBhbmVsIiwicmVuZGVyUGFuZWwiLCJleHBhbmRlZCIsInRhYkNvbnRhaW5lckVsZW1lbnQiLCJwYW5lbCIsInNldFRpbWVvdXQiLCJ0YWJsaXN0IiwidGFiTGlzdFdyYXBwZXIiLCJ0YWJJZCIsInRhYlBhbmVsSWQiLCJ0YWIiLCJ0YWJQYW5lbCIsIlNlYXJjaFNlcnZpY2UiLCJmaWx0ZXJCeVF1ZXJ5Iiwic2NvcmUiLCJxdWVyaWVzIiwic3BsaXQiLCJpIiwiZ2V0U2VhcmNoU2NvcmUiLCJzb3J0Iiwic29ydFNlYXJjaFJlc3VsdHMiLCJhIiwiYiIsInBvcHVsYXJpdHkiLCJ0cmltIiwiaGFzU3ViU3RyaW5nIiwiYXJyYXlIYXNTdWJTdHJpbmciLCJrZXl3b3JkcyIsIm5lZWRsZSIsImhheXN0YWNrIiwidG9Mb3dlckNhc2UiLCJzdWJTdHJpbmciLCJzdHJpbmciLCJVcGxvYWRTZWN0aW9uIiwiaDVwVXBsb2FkIiwidGV4dENvbnRlbnQiLCJkYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWxlcyIsInVwbG9hZENvbnRlbnQiLCJBVFRSSUJVVEVfU0laRSIsImRpc2FibGUiLCJlbmFibGUiLCJ0b2dnbGVFbmFibGVkIiwiZW5hYmxlZCIsImhpZGRlbiIsImlzRGlzYWJsZWQiLCJ1cGRhdGVWaWV3IiwicHJldkJ1dHRvbiIsIm5leHRCdXR0b24iLCJsaXN0IiwidG90YWxDb3VudCIsInN0eWxlIiwid2lkdGgiLCJkaXNwbGF5Q291bnQiLCJtYXJnaW5MZWZ0IiwicG9zaXRpb24iLCJvbk5hdmlnYXRpb25CdXR0b25DbGljayIsInVwZGF0ZVN0YXRlIiwiaW5pdEltYWdlIiwidGFyZ2V0SWQiLCJoYW5kbGVEb21VcGRhdGUiLCJyZWNvcmQiLCJhZGRlZE5vZGVzIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImhpZGVBbGwiLCJ1blNlbGVjdEFsbCIsInRhYnMiLCJ0YWJQYW5lbHMiLCJyZXF1aXJlIiwiSDVQIiwiSHViQ2xpZW50IiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEy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QUYsQ0FBUSxDQUFSLEVBQTBCRyxPQUExQztBQUNBRixJQUFJQyxTQUFKLENBQWNsTyxrQkFBZCxHQUFtQyxtQkFBQWdPLENBQVEsQ0FBUixFQUFtQ0csT0FBdEUsQyIsImZpbGUiOiJoNXAtaHViLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5YmFhZWJmMGQ1NjI3ZTcyNDc4MyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjdXJyeSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGNvbnN0IGFyaXR5ID0gZm4ubGVuZ3RoO1xuXG4gIHJldHVybiBmdW5jdGlvbiBmMSgpIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gYXJpdHkpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZjIoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgcmV0dXJuIGYxLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGFyZ3MyKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBDb21wb3NlIGZ1bmN0aW9ucyB0b2dldGhlciwgZXhlY3V0aW5nIGZyb20gcmlnaHQgdG8gbGVmdFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24uLi59IGZuc1xuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5mbnMpID0+IGZucy5yZWR1Y2UoKGYsIGcpID0+ICguLi5hcmdzKSA9PiBmKGcoLi4uYXJncykpKTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZm9yRWFjaCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIGFyci5mb3JFYWNoKGZuKTtcbn0pO1xuXG4vKipcbiAqIE1hcHMgYSBmdW5jdGlvbiB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1hcCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIubWFwKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmaWx0ZXIgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgc29tZSB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHNvbWUgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLnNvbWUoZm4pO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgdmFsdWVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5pbmRleE9mKHZhbHVlKSAhPSAtMTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgc3VwcGxpZWQgdmFsdWVzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhvdXQgPSBjdXJyeShmdW5jdGlvbiAodmFsdWVzLCBhcnIpIHtcbiAgcmV0dXJuIGZpbHRlcih2YWx1ZSA9PiAhY29udGFpbnModmFsdWUsIHZhbHVlcyksIGFycilcbn0pO1xuXG4vKipcbiAqIFRha2VzIGEgc3RyaW5nIHRoYXQgaXMgZWl0aGVyICd0cnVlJyBvciAnZmFsc2UnIGFuZCByZXR1cm5zIHRoZSBvcHBvc2l0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBib29sXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgaW52ZXJzZUJvb2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoYm9vbCkge1xuICByZXR1cm4gKGJvb2wgIT09ICd0cnVlJykudG9TdHJpbmcoKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXG5cbi8qKlxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBTZXQgYW4gYXR0cmlidXRlIG9uIGEgaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkpO1xuXG4vKipcbiAqIFJlbW92ZSBhdHRyaWJ1dGUgZnJvbSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBoYXNBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLmhhc0F0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlIHRoYXQgZXF1YWxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVFcXVhbHMgPSBjdXJyeSgobmFtZSwgdmFsdWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBiZXR3ZWVuICd0cnVlJyBhbmQgJ2ZhbHNlJztcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IGdldEF0dHJpYnV0ZShuYW1lLCBlbCk7XG4gIHNldEF0dHJpYnV0ZShuYW1lLCBpbnZlcnNlQm9vbGVhblN0cmluZyh2YWx1ZSksIGVsKTtcbn0pO1xuXG4vKipcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgYXBwZW5kQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBjaGlsZCkgPT4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgZWxlbWVudCBvbiB3aGljaCBpdCBpcyBpbnZva2VkXG4gKiB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gY3VycnkoKHNlbGVjdG9yLCBlbCkgPT4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuXG4vKipcbiAqIFJldHVybnMgYSBub24tbGl2ZSBOb2RlTGlzdCBvZiBhbGwgZWxlbWVudHMgZGVzY2VuZGVkIGZyb20gdGhlIGVsZW1lbnQgb24gd2hpY2ggaXRcbiAqIGlzIGludm9rZWQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2YgQ1NTIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtOb2RlTGlzdH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3JBbGwgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG5cbi8qKlxuICogVGhlIHJlbW92ZUNoaWxkKCkgbWV0aG9kIHJlbW92ZXMgYSBjaGlsZCBub2RlIGZyb20gdGhlIERPTS4gUmV0dXJucyByZW1vdmVkIG5vZGUuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBwYXJlbnRcbiAqIEBwYXJhbSB7Tm9kZX0gb2xkQ2hpbGRcbiAqXG4gKiBAcmV0dXJuIHtOb2RlfVxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBvbGRDaGlsZCkgPT4gcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgbm9kZSBoYXMgYSBjbGFzc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbHNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBjbGFzc0xpc3RDb250YWlucyA9IGN1cnJ5KChjbHMsIGVsKSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKSk7XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIE5vZGVMaXN0IHRvIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZUxpc3RcbiAqXG4gKiBAcmV0dXJuIHtOb2RlW119XG4gKi9cbmV4cG9ydCBjb25zdCBub2RlTGlzdFRvQXJyYXkgPSBub2RlTGlzdCA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlTGlzdCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCIvKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IENvbnRlbnRUeXBlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFjaGluZU5hbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWpvclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtaW5vclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwYXRjaFZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBoNXBNYWpvclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBoNXBNaW5vclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzdW1tYXJ5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gZGVzY3JpcHRpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpY29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3JlYXRlZEF0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gdXBkYXRlZF9BdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlzUmVjb21tZW5kZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwb3B1bGFyaXR5XG4gKiBAcHJvcGVydHkge29iamVjdFtdfSBzY3JlZW5zaG90c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGxpY2Vuc2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBleGFtcGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdHV0b3JpYWxcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGtleXdvcmRzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gb3duZXJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaW5zdGFsbGVkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlc3RyaWN0ZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViU2VydmljZXMge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAgICovXG4gIGNvbnN0cnVjdG9yKHsgYXBpUm9vdFVybCB9KSB7XG4gICAgdGhpcy5hcGlSb290VXJsID0gYXBpUm9vdFVybDtcblxuICAgIGlmKCF3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzKXtcbiAgICAgIC8vIFRPRE8gcmVtb3ZlIHRoaXMgd2hlbiBkb25lIHRlc3RpbmcgZm9yIGVycm9yc1xuICAgICAgLy8gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1lcnJvcnMvTk9fUkVTUE9OU0UuanNvbmAsIHtcblxuICAgICAgd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAgIC50aGVuKHRoaXMuaXNWYWxpZClcbiAgICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gIHtDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZX0gcmVzcG9uc2VcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZT59XG4gICAqL1xuICBpc1ZhbGlkKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLm1lc3NhZ2VDb2RlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBjb250ZW50IHR5cGVzXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlW10+fVxuICAgKi9cbiAgY29udGVudFR5cGVzKCkge1xuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBDb250ZW50IFR5cGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcbiAgICB9KTtcblxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXG4gIH1cblxuICAvKipcbiAgICogSW5zdGFsbHMgYSBjb250ZW50IHR5cGUgb24gdGhlIHNlcnZlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LWluc3RhbGw/aWQ9JHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBib2R5OiAnJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZHMgYSBjb250ZW50IHR5cGUgdG8gdGhlIHNlcnZlciBmb3IgdmFsaWRhdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge0Zvcm1EYXRhfSBmb3JtRGF0YSBGb3JtIGNvbnRhaW5pbmcgdGhlIGg1cCB0aGF0IHNob3VsZCBiZSB1cGxvYWRlZCBhcyAnaDVwJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEganNvbiBjb250YWluaW5nIHRoZSBjb250ZW50IGpzb24gYW5kIHRoZSBoNXAganNvblxuICAgKi9cbiAgdXBsb2FkQ29udGVudChmb3JtRGF0YSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS11cGxvYWRgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBib2R5OiBmb3JtRGF0YVxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCIvKipcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcudHlwZSAgICAgICAgIHR5cGUgb2YgdGhlIG1lc3NhZ2U6IGluZm8sIHN1Y2Nlc3MsIGVycm9yXG4gKiBAcGFyYW0gIHtib29sZWFufSAgY29uZmlnLmRpc21pc3NpYmxlICB3aGV0aGVyIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNtaXNzZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcuY29udGVudCAgICAgIG1lc3NhZ2UgY29udGVudCB1c3VhbGx5IGEgJ2gzJyBhbmQgYSAncCdcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBkaXYgY29udGFpbmluZyB0aGUgbWVzc2FnZSBlbGVtZW50XG4gKi9cblxuLy9UT0RPIGhhbmRsZSBzdHJpbmdzLCBodG1sLCBiYWRseSBmb3JtZWQgb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJFcnJvck1lc3NhZ2UobWVzc2FnZSkge1xuICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xuXG4gIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xuICBtZXNzYWdlQ29udGVudC5pbm5lckhUTUwgPSAnPGgxPicgKyBtZXNzYWdlLnRpdGxlICsgJzwvaDE+JyArICc8cD4nICsgbWVzc2FnZS5jb250ZW50ICsgJzwvcD4nO1xuXG4gIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmNsYXNzTmFtZSA9ICdtZXNzYWdlJyArICcgJyArIGAke21lc3NhZ2UudHlwZX1gICsgKG1lc3NhZ2UuZGlzbWlzc2libGUgPyAnIGRpc21pc3NpYmxlJyA6ICcnKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XG5cbiAgaWYgKG1lc3NhZ2UuYnV0dG9uICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICBtZXNzYWdlQnV0dG9uLmlubmVySFRNTCA9IG1lc3NhZ2UuYnV0dG9uO1xuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xuICB9XG5cbiAgY29uc29sZS5sb2cobWVzc2FnZVdyYXBwZXIpO1xuICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXJyb3JzLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuXG4vKipcbiAqICBUcmFuc2Zvcm1zIGEgRE9NIGNsaWNrIGV2ZW50IGludG8gYW4gRXZlbnRmdWwncyBldmVudFxuICogIEBzZWUgRXZlbnRmdWxcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmcgfCBPYmplY3R9IHR5cGVcbiAqIEBwYXJhbSAge0V2ZW50ZnVsfSBldmVudGZ1bFxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGlkOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gZG9uJ3QgYnViYmxlXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50O1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZSwgYXR0cmlidXRlRXF1YWxzLCB0b2dnbGVBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaXNFeHBhbmRlZCA9IGF0dHJpYnV0ZUVxdWFscyhcImFyaWEtZXhwYW5kZWRcIiwgJ3RydWUnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgYm9keSB2aXNpYmlsaXR5XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm9keUVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFeHBhbmRlZFxuICovXG5jb25zdCB0b2dnbGVCb2R5VmlzaWJpbGl0eSA9IGZ1bmN0aW9uKGJvZHlFbGVtZW50LCBpc0V4cGFuZGVkKSB7XG4gIGlmKCFpc0V4cGFuZGVkKSB7XG4gICAgaGlkZShib2R5RWxlbWVudCk7XG4gICAgLy9ib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjBcIjtcbiAgfVxuICBlbHNlIC8qaWYoYm9keUVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gMCkqLyB7XG4gICAgc2hvdyhib2R5RWxlbWVudCk7XG4gICAgLy9ib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtib2R5RWxlbWVudC5zY3JvbGxIZWlnaHR9cHhgO1xuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgY2hhbmdlcyB0byBhcmlhLWV4cGFuZGVkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm9keUVsZW1lbnRcbiAqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IGV2ZW50XG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG9uQXJpYUV4cGFuZGVkQ2hhbmdlID0gY3VycnkoZnVuY3Rpb24oYm9keUVsZW1lbnQsIGV2ZW50KSB7XG4gIHRvZ2dsZUJvZHlWaXNpYmlsaXR5KGJvZHlFbGVtZW50LCBpc0V4cGFuZGVkKGV2ZW50LnRhcmdldCkpO1xufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgY29uc3QgdGl0bGVFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtZXhwYW5kZWRdJyk7XG4gIGNvbnN0IGJvZHlJZCA9IHRpdGxlRWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGNvbnN0IGJvZHlFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9keUlkfWApO1xuXG4gIGlmKHRpdGxlRWwpIHtcbiAgICAvLyBzZXQgb2JzZXJ2ZXIgb24gdGl0bGUgZm9yIGFyaWEtZXhwYW5kZWRcbiAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKG9uQXJpYUV4cGFuZGVkQ2hhbmdlKGJvZHlFbCkpKTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUodGl0bGVFbCwge1xuICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgICAgYXR0cmlidXRlRmlsdGVyOiBbXCJhcmlhLWV4cGFuZGVkXCJdXG4gICAgfSk7XG5cbiAgICAvLyBTZXQgY2xpY2sgbGlzdGVuZXIgdGhhdCB0b2dnbGVzIGFyaWEtZXhwYW5kZWRcbiAgICB0aXRsZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgZXZlbnQudGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIHRvZ2dsZUJvZHlWaXNpYmlsaXR5KGJvZHlFbCwgaXNFeHBhbmRlZCh0aXRsZUVsKSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIWnBaWGRDYjNnOUlqQWdNQ0EwTURBZ01qSTFJajROQ2lBZ1BHUmxabk0rRFFvZ0lDQWdQSE4wZVd4bFBnMEtJQ0FnSUNBZ0xtTnNjeTB4SUhzTkNpQWdJQ0FnSUdacGJHdzZJRzV2Ym1VN0RRb2dJQ0FnSUNCOURRb05DaUFnSUNBZ0lDNWpiSE10TWlCN0RRb2dJQ0FnSUNCbWFXeHNPaUFqWXpaak5tTTNPdzBLSUNBZ0lDQWdmUTBLRFFvZ0lDQWdJQ0F1WTJ4ekxUTXNJQzVqYkhNdE5DQjdEUW9nSUNBZ0lDQm1hV3hzT2lBalptWm1PdzBLSUNBZ0lDQWdmUTBLRFFvZ0lDQWdJQ0F1WTJ4ekxUTWdldzBLSUNBZ0lDQWdiM0JoWTJsMGVUb2dNQzQzT3cwS0lDQWdJQ0FnZlEwS0lDQWdJRHd2YzNSNWJHVStEUW9nSUR3dlpHVm1jejROQ2lBZ1BIUnBkR3hsUG1OdmJuUmxiblFnZEhsd1pTQndiR0ZqWldodmJHUmxjbDh5UEM5MGFYUnNaVDROQ2lBZ1BHY2dhV1E5SWt4aGVXVnlYeklpSUdSaGRHRXRibUZ0WlQwaVRHRjVaWElnTWlJK0RRb2dJQ0FnUEdjZ2FXUTlJbU52Ym5SbGJuUmZkSGx3WlY5d2JHRmpaV2h2YkdSbGNpMHhYMk52Y0hraUlHUmhkR0V0Ym1GdFpUMGlZMjl1ZEdWdWRDQjBlWEJsSUhCc1lXTmxhRzlzWkdWeUxURWdZMjl3ZVNJK0RRb2dJQ0FnSUNBOGNtVmpkQ0JqYkdGemN6MGlZMnh6TFRFaUlIZHBaSFJvUFNJME1EQWlJR2hsYVdkb2REMGlNakkxSWk4K0RRb2dJQ0FnSUNBOGNtVmpkQ0JqYkdGemN6MGlZMnh6TFRJaUlIZzlJakV4TWk0MU1TSWdlVDBpTkRNdU5ERWlJSGRwWkhSb1BTSXhOell1T1RZaUlHaGxhV2RvZEQwaU1UTTFMalExSWlCeWVEMGlNVEFpSUhKNVBTSXhNQ0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TXpZdU5qWWlJR041UFNJMk1TNDVPQ0lnY2owaU5DNDRNU0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TlRFdU5Ea2lJR041UFNJMk1TNDVPQ0lnY2owaU5DNDRNU0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TmpZdU1TSWdZM2s5SWpZeExqazRJaUJ5UFNJMExqZ3hJaTgrRFFvZ0lDQWdJQ0E4WnlCcFpEMGlYMGR5YjNWd1h5SWdaR0YwWVMxdVlXMWxQU0ltYkhRN1IzSnZkWEFtWjNRN0lqNE5DaUFnSUNBZ0lDQWdQR2NnYVdROUlsOUhjbTkxY0Y4eUlpQmtZWFJoTFc1aGJXVTlJaVpzZER0SGNtOTFjQ1puZERzaVBnMEtJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHbGtQU0pmUTI5dGNHOTFibVJmVUdGMGFGOGlJR1JoZEdFdGJtRnRaVDBpSm14ME8wTnZiWEJ2ZFc1a0lGQmhkR2dtWjNRN0lpQmpiR0Z6Y3owaVkyeHpMVFFpSUdROUlrMHlOak11TWpnc09UVXVNakZETWpZd0xEa3lMakEzTERJMU5TdzVNUzQxTERJME9DNDBNeXc1TVM0MVNESXlOM1k0U0RFNU9TNDFiQzB5TGpFM0xERXdMakkwWVRJMUxqZzBMREkxTGpnMExEQXNNQ3d4TERFeExqUTRMVEV1TmpNc01Ua3VPVE1zTVRrdU9UTXNNQ3d3TERFc01UUXVNemtzTlM0MU55d3hPQzR5Tml3eE9DNHlOaXd3TERBc01TdzFMalV5TERFekxqWXNNak11TVRFc01qTXVNVEVzTUN3d0xERXRNaTQ0TkN3eE1TNHdOU3d4T0M0Mk5Td3hPQzQyTlN3d0xEQXNNUzA0TGpBMkxEY3VOemtzT1N3NUxEQXNNQ3d4TFRRdU1USXNNUzR6TjBneU16WjJMVEl4YURFd0xqUXlZemN1TXpZc01Dd3hNaTQ0TXkweExqWXhMREUyTGpReUxUVnpOUzR6T0MwM0xqUTRMRFV1TXpndE1UTXVORFJETWpZNExqSXlMREV3TWk0eU9Td3lOall1TlRjc09UZ3VNelVzTWpZekxqSTRMRGsxTGpJeFdtMHRNVFVzTVRkakxURXVORElzTVM0eU1pMHpMamtzTVM0eU5TMDNMalF4TERFdU1qVklNak0yZGkweE5HZzFMall5WVRrdU5UY3NPUzQxTnl3d0xEQXNNU3czTERJdU9UTXNOeTR3TlN3M0xqQTFMREFzTUN3eExERXVPRFVzTkM0NU1rRTJMak16TERZdU16TXNNQ3d3TERFc01qUTRMak14TERFeE1pNHlOVm9pTHo0TkNpQWdJQ0FnSUNBZ0lDQThjR0YwYUNCcFpEMGlYMUJoZEdoZklpQmtZWFJoTFc1aGJXVTlJaVpzZER0UVlYUm9KbWQwT3lJZ1kyeGhjM005SW1Oc2N5MDBJaUJrUFNKTk1qQXlMamtzTVRFNUxqRXhZVGd1TVRJc09DNHhNaXd3TERBc01DMDNMakk0TERRdU5USnNMVEUyTFRFdU1qSXNOeTR5TWkwek1DNDVNa2d4TnpSMk1qSklNVFV6ZGkweU1rZ3hNeloyTlRab01UZDJMVEl4YURJeGRqSXhhREl3TGpNeFl5MHlMamN5TERBdE5TMHhMalV6TFRjdE0yRXhPUzR4T1N3eE9TNHhPU3d3TERBc01TMDBMamN6TFRRdU9ETXNNak11TlRnc01qTXVOVGdzTUN3d0xERXRNeTAyTGpac01UWXRNaTR5Tm1FNExqRXhMRGd1TVRFc01Dd3hMREFzTnk0eU5pMHhNUzQzTWxvaUx6NE5DaUFnSUNBZ0lDQWdQQzluUGcwS0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BISmxZM1FnWTJ4aGMzTTlJbU5zY3kweklpQjRQU0l4TnpjdU5qWWlJSGs5SWpVM0xqWTJJaUIzYVdSMGFEMGlPVEl1TWpnaUlHaGxhV2RvZEQwaU9TNHpPQ0lnY25nOUlqTXVOU0lnY25rOUlqTXVOU0l2UGcwS0lDQWdJRHd2Wno0TkNpQWdQQzluUGcwS1BDOXpkbWMrRFFvPVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmdcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEh1YlZpZXcgZnJvbSAnLi9odWItdmlldyc7XG5pbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uIGZyb20gJy4vY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24nO1xuaW1wb3J0IFVwbG9hZFNlY3Rpb24gZnJvbSAnLi91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbic7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi9odWItc2VydmljZXMnO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi91dGlscy9lcnJvcnMnO1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbklkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXBpUm9vdFVybFxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEVycm9yTWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZFxuICovXG4vKipcbiAqIFNlbGVjdCBldmVudFxuICogQGV2ZW50IEh1YiNzZWxlY3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogRXJyb3IgZXZlbnRcbiAqIEBldmVudCBIdWIjZXJyb3JcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XG4gKi9cbi8qKlxuICogVXBsb2FkIGV2ZW50XG4gKiBAZXZlbnQgSHViI3VwbG9hZFxuICogQHR5cGUge09iamVjdH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBIdWIjZXJyb3JcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNvbnRyb2xsZXJzXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24gPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uKHN0YXRlKTtcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgY29udHJvbGxlciBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCcsICdlcnJvciddLCB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbik7XG4gICAgdGhpcy5wcm9wYWdhdGUoWyd1cGxvYWQnXSwgdGhpcy51cGxvYWRTZWN0aW9uKTtcblxuICAgIC8vIGhhbmRsZSBldmVudHNcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnNldFBhbmVsVGl0bGUsIHRoaXMpO1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMudmlldy5jbG9zZVBhbmVsLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMudmlldy5vbigndGFiLWNoYW5nZScsIHRoaXMudmlldy5zZXRTZWN0aW9uVHlwZSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3BhbmVsLWNoYW5nZScsIHRoaXMudmlldy50b2dnbGVQYW5lbE9wZW4uYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xuXG4gICAgdGhpcy5pbml0VGFiUGFuZWwoc3RhdGUpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGNvbnRlbnQgdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgZ2V0Q29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShtYWNoaW5lTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0UGFuZWxUaXRsZSh7aWR9KcKge1xuICAgIHRoaXMuZ2V0Q29udGVudFR5cGUoaWQpLnRoZW4oKHt0aXRsZX0pID0+IHRoaXMudmlldy5zZXRUaXRsZSh0aXRsZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgdGFiIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICovXG4gIGluaXRUYWJQYW5lbCh7IHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJyB9KSB7XG4gICAgY29uc3QgdGFiQ29uZmlncyA9IFt7XG4gICAgICB0aXRsZTogJ0NyZWF0ZSBDb250ZW50JyxcbiAgICAgIGlkOiAnY29udGVudC10eXBlcycsXG4gICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5nZXRFbGVtZW50KCksXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1VwbG9hZCcsXG4gICAgICBpZDogJ3VwbG9hZCcsXG4gICAgICBjb250ZW50OiB0aGlzLnVwbG9hZFNlY3Rpb24uZ2V0RWxlbWVudCgpXG4gICAgfV07XG5cbiAgICAvLyBzZXRzIHRoZSBjb3JyZWN0IG9uZSBzZWxlY3RlZFxuICAgIHRhYkNvbmZpZ3NcbiAgICAgIC5maWx0ZXIoY29uZmlnID0+IGNvbmZpZy5pZCA9PT0gc2VjdGlvbklkKVxuICAgICAgLmZvckVhY2goY29uZmlnID0+IGNvbmZpZy5zZWxlY3RlZCA9IHRydWUpO1xuXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xuICAgIHRoaXMudmlldy5hZGRCb3R0b21Cb3JkZXIoKTsgLy8gQWRkcyBhbiBhbmltYXRlZCBib3R0b20gYm9yZGVyIHRvIGVhY2ggdGFiXG4gICAgdGhpcy52aWV3LmluaXRUYWJQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGVzL21haW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgcmVtb3ZlQ2hpbGQgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIjtcbmltcG9ydCBpbml0SW1hZ2VTY3JvbGxlciBmcm9tIFwiY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlclwiO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IG5vSWNvbiBmcm9tICcuLi8uLi9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Zyc7XG5cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQgPSAnZGF0YS1pZCc7XG5cbi8qKlxuICogQGNvbnN0YW50IHtudW1iZXJ9XG4gKi9cbmNvbnN0IE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04gPSAzMDA7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IGlmIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAqL1xuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IChlbGVtZW50LCB2aXNpYmxlKSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgZW1wdHlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRW1wdHkgPSAodGV4dCkgPT4gKHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJykgJiYgKHRleHQubGVuZ3RoID09PSAwKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlVmlldygpO1xuICAgIHRoaXMudXNlQnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXVzZScpO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XG4gICAgdGhpcy5pbWFnZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtdHlwZS1pbWFnZScpO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgaDMnKTtcbiAgICB0aGlzLm93bmVyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3duZXInKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kZXRhaWxzIC5zbWFsbCcpO1xuICAgIHRoaXMuZGVtb0J1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8tYnV0dG9uJyk7XG4gICAgdGhpcy5jYXJvdXNlbCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcm91c2VsJyk7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gICAgdGhpcy5saWNlbmNlUGFuZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saWNlbmNlLXBhbmVsJyk7XG5cbiAgICBpbml0UGFuZWwodGhpcy5saWNlbmNlUGFuZWwpO1xuXG4gICAgaW5pdEltYWdlU2Nyb2xsZXIodGhpcy5jYXJvdXNlbCk7XG5cbiAgICAvLyBmaXJlIGV2ZW50cyBvbiBidXR0b24gY2xpY2tcbiAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLWJ1dHRvbicpKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0JywgdGhpcywgdGhpcy51c2VCdXR0b24pO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdpbnN0YWxsJywgdGhpcywgdGhpcy5pbnN0YWxsQnV0dG9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSB2aWV3IGFzIGEgSFRNTEVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVWaWV3ICgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWRldGFpbCc7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJiYWNrLWJ1dHRvbiBpY29uLWFycm93LXRoaWNrXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS13cmFwcGVyXCI+PGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlIGNvbnRlbnQtdHlwZS1pbWFnZVwiIHNyYz1cIiR7bm9JY29ufVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1kZXRhaWxzXCI+XG4gICAgICAgICAgPGgzPjwvaDM+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bmVyXCI+PC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzbWFsbFwiPjwvcD5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBkZW1vLWJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBocmVmPVwiaHR0cHM6Ly9oNXAub3JnL2NoYXJ0XCI+Q29udGVudCBEZW1vPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhcm91c2VsXCIgcm9sZT1cInJlZ2lvblwiIGRhdGEtc2l6ZT1cIjVcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gcHJldmlvdXMgaWNvbi1hcnJvdy10aGlja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gbmV4dCBpY29uLWFycm93LXRoaWNrXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PC9zcGFuPlxuICAgICAgICA8bmF2IGNsYXNzPVwic2Nyb2xsZXJcIj5cbiAgICAgICAgICA8dWw+PC91bD5cbiAgICAgICAgPC9uYXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxociAvPlxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1iYXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLXVzZVwiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBkYXRhLWlkPVwiSDVQLkNoYXJ0XCI+VXNlPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1pZD1cIkg1UC5DaGFydFwiPkluc3RhbGw8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ncm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgbGljZW5jZS1wYW5lbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkZXJcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWNvbnRyb2xzPVwibGljZW5jZS1wYW5lbFwiPlRoZSBMaWNlbmNlIEluZm88L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiIGlkPVwibGljZW5jZS1wYW5lbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHktaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgaW1hZ2VzIGZyb20gdGhlIGNhcm91c2VsXG4gICAqL1xuICByZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsKCkge1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykuZm9yRWFjaChyZW1vdmVDaGlsZCh0aGlzLmNhcm91c2VsTGlzdCkpO1xuICAgIHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvckFsbCgnLmNhcm91c2VsLWxpZ2h0Ym94JykuZm9yRWFjaChyZW1vdmVDaGlsZCh0aGlzLmNhcm91c2VsKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGltYWdlIHRvIHRoZSBjYXJvdXNlbFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW1hZ2VcbiAgICovXG4gIGFkZEltYWdlVG9DYXJvdXNlbChpbWFnZSkge1xuICAgIC8vIGFkZCBsaWdodGJveFxuICAgIGNvbnN0IGxpZ2h0Ym94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGlnaHRib3guaWQgPSBgbGlnaHRib3gtJHt0aGlzLmNhcm91c2VsTGlzdC5jaGlsZEVsZW1lbnRDb3VudH1gO1xuICAgIGxpZ2h0Ym94LmNsYXNzTmFtZSA9ICdjYXJvdXNlbC1saWdodGJveCc7XG4gICAgbGlnaHRib3guc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgbGlnaHRib3guaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cIiR7aW1hZ2UuYWx0fVwiPmA7XG4gICAgdGhpcy5jYXJvdXNlbC5hcHBlbmRDaGlsZChsaWdodGJveCk7XG5cbiAgICAvLyBhZGQgdGh1bWJuYWlsXG4gICAgY29uc3QgdGh1bWJuYWlsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0aHVtYm5haWwuY2xhc3NOYW1lID0gJ3NsaWRlJztcbiAgICB0aHVtYm5haWwuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCIgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIGFyaWEtY29udHJvbHM9XCIke2xpZ2h0Ym94LmlkfVwiIC8+YDtcbiAgICB0aGlzLmNhcm91c2VsTGlzdC5hcHBlbmRDaGlsZCh0aHVtYm5haWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGltYWdlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAgICovXG4gIHNldEltYWdlKHNyYykge1xuICAgIHRoaXMuaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMgfHwgbm9JY29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldElkKGlkKSB7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gICAgdGhpcy51c2VCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBgJHt0aXRsZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIHNldERlc2NyaXB0aW9uKHRleHQpIHtcbiAgICBpZih0ZXh0Lmxlbmd0aCA+IE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04pIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGhpcy5lbGxpcHNpcyhNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OLCB0ZXh0KX0gPHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgUmVhZCBsZXNzIGFuZCBSZWFkIG1vcmUgdGV4dFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgdG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSB7XG4gICAgLy8gZmxpcCBib29sZWFuXG4gICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gIXRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZDtcblxuICAgIGlmKHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCkge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0ZXh0fSA8c3BhbiBjbGFzcz1cInJlYWQtbGVzcyBsaW5rXCI+UmVhZCBsZXNzPC9zcGFuPmA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0aGlzLmVsbGlwc2lzKE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04sIHRleHQpfSA8c3BhbiBjbGFzcz1cInJlYWQtbW9yZSBsaW5rXCI+UmVhZCBtb3JlPC9zcGFuPmA7XG4gICAgfVxuXG4gICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5yZWFkLW1vcmUsIC5yZWFkLWxlc3MnKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG9ydGVucyBhIHN0cmluZywgYW5kIHB1dHMgYW4gZWxpcHNpcyBhdCB0aGUgZW5kXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBlbGxpcHNpcyhzaXplLCB0ZXh0KSB7XG4gICAgcmV0dXJuIGAke3RleHQuc3Vic3RyKDAsIHNpemUpfS4uLmA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbGljZW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKi9cbiAgc2V0TGljZW5jZSh0eXBlKSB7XG4gICAgaWYodHlwZSl7XG4gICAgICB0aGlzLmxpY2VuY2VQYW5lbC5xdWVyeVNlbGVjdG9yKCcucGFuZWwtYm9keS1pbm5lcicpLmlubmVyVGV4dCA9IHR5cGU7XG4gICAgICBzaG93KHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoaWRlKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3duZXJcbiAgICovXG4gIHNldE93bmVyKG93bmVyKSB7XG4gICAgaWYob3duZXIpIHtcbiAgICAgIHRoaXMub3duZXIuaW5uZXJIVE1MID0gYEJ5ICR7b3duZXJ9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBleGFtcGxlIHVybFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBzZXRFeGFtcGxlKHVybCkge1xuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwgfHwgJyMnKTtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuZGVtb0J1dHRvbiwgIWlzRW1wdHkodXJsKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBpZiB0aGUgY29udGVudCB0eXBlIGlzIGluc3RhbGxlZFxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluc3RhbGxlZFxuICAgKi9cbiAgc2V0SXNJbnN0YWxsZWQoaW5zdGFsbGVkKSB7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLnVzZUJ1dHRvbiwgaW5zdGFsbGVkKTtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuaW5zdGFsbEJ1dHRvbiwgIWluc3RhbGxlZCk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlRGV0YWlsVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXdcIjtcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tIFwiLi4vaHViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWwge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVEZXRhaWxWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnZpZXcub24oJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwsIHRoaXMpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnY2xvc2UnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGxvYWRCeUlkKGlkKSB7XG4gICAgdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgIC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpXG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gICBpbnN0YWxsKHtpZH0pIHtcbiAgICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUpXG4gICAgICAgLnRoZW4obWFjaGluZU5hbWUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUobWFjaGluZU5hbWUpKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnNvbGUuZGVidWcoJ1RPRE8sIGd1aSB1cGRhdGVzJykpXG4gICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXcgd2l0aCB0aGUgY29udGVudCB0eXBlIGRhdGFcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xuICAgIHRoaXMudmlldy5zZXRJZChjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG4gICAgdGhpcy52aWV3LnNldFRpdGxlKGNvbnRlbnRUeXBlLnRpdGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xuICAgIHRoaXMudmlldy5zZXRJbWFnZShjb250ZW50VHlwZS5pY29uKTtcbiAgICB0aGlzLnZpZXcuc2V0RXhhbXBsZShjb250ZW50VHlwZS5leGFtcGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0T3duZXIoY29udGVudFR5cGUub3duZXIpO1xuICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZCghIWNvbnRlbnRUeXBlLmluc3RhbGxlZCk7XG4gICAgdGhpcy52aWV3LnNldExpY2VuY2UoY29udGVudFR5cGUubGljZW5zZSk7XG5cbiAgICAvLyB1cGRhdGUgY2Fyb3VzZWxcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpO1xuICAgIGNvbnRlbnRUeXBlLnNjcmVlbnNob3RzLmZvckVhY2godGhpcy52aWV3LmFkZEltYWdlVG9DYXJvdXNlbCwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IG5vSWNvbiBmcm9tICcuLi8uLi9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Zyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1saXN0JztcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHJvd3MgZnJvbSByb290IGVsZW1lbnRcbiAgICovXG4gIHJlbW92ZUFsbFJvd3MoKSB7XG4gICAgd2hpbGUodGhpcy5yb290RWxlbWVudC5oYXNDaGlsZE5vZGVzKCkgKXtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5yb290RWxlbWVudC5sYXN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcm93XG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICBhZGRSb3coY29udGVudFR5cGUpIHtcbiAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCB0aGlzKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncm93LXNlbGVjdGVkJywgdGhpcywgcm93KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJvdylcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIENvbnRlbnQgVHlwZSBjb25maWd1cmF0aW9uIGFuZCBjcmVhdGVzIGEgcm93IGRvbVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBzY29wZVxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCBzY29wZSkge1xuICAgIC8vIHJvdyBpdGVtXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5pZCA9IGBjb250ZW50LXR5cGUtJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1gO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuXG4gICAgLy8gY3JlYXRlIGJ1dHRvbiBjb25maWdcbiAgICBjb25zdCB1c2VCdXR0b25Db25maWcgPSB7IHRleHQ6ICdVc2UnLCBjbHM6ICdidXR0b24tcHJpbWFyeScgfTtcbiAgICBjb25zdCBpbnN0YWxsQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnaW5zdGFsbCcsIGNsczogJ2J1dHRvbi1pbnZlcnNlLXByaW1hcnknfTtcbiAgICBjb25zdCBidXR0b24gPSBjb250ZW50VHlwZS5pbnN0YWxsZWQgPyAgdXNlQnV0dG9uQ29uZmlnOiBpbnN0YWxsQnV0dG9uQ29uZmlnO1xuXG4gICAgY29uc3QgdGl0bGUgPSBjb250ZW50VHlwZS50aXRsZSB8fCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGNvbnRlbnRUeXBlLnN1bW1hcnkgfHwgJyc7XG5cbiAgICBjb25zdCBpbWFnZSA9IGNvbnRlbnRUeXBlLmljb24gfHwgbm9JY29uO1xuXG4gICAgLy8gY3JlYXRlIGh0bWxcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7aW1hZ2V9XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiAke2J1dHRvbi5jbHN9XCIgZGF0YS1pZD1cIiR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9XCIgdGFiaW5kZXg9XCIwXCI+JHtidXR0b24udGV4dH08L3NwYW4+XG4gICAgICA8aDQ+JHt0aXRsZX08L2g0PlxuICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+JHtkZXNjcmlwdGlvbn08L2Rpdj5cbiAgIGA7XG5cbiAgICAvLyBoYW5kbGUgdXNlIGJ1dHRvblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1wcmltYXJ5Jyk7XG4gICAgaWYodXNlQnV0dG9uKXtcbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCBzY29wZSwgdXNlQnV0dG9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVMaXN0VmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtbGlzdC12aWV3XCI7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIFJvdyBzZWxlY3RlZCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogVXBkYXRlIGNvbnRlbnQgdHlwZSBsaXN0IGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3Qge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYWRkIHRoZSB2aWV3XG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVMaXN0VmlldyhzdGF0ZSk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydyb3ctc2VsZWN0ZWQnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZSB0aGlzIGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoaXMgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCB3aXRoIG5ldyBjb250ZW50IHR5cGVzXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGVzKSB7XG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbFJvd3MoKTtcbiAgICBjb250ZW50VHlwZXMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkUm93LCB0aGlzLnZpZXcpO1xuICAgIHRoaXMuZmlyZSgndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0Jywge30pO1xuICB9XG5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmlld3Mgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJpbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIGNvbnN0IG1lbnUgPSB0aGlzLmNyZWF0ZU1lbnVFbGVtZW50KCk7XG4gICAgY29uc3QgaW5wdXRHcm91cCA9IHRoaXMuY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKTtcblxuICAgIC8vIG1lbnUgZ3JvdXBcbiAgICBjb25zdCBtZW51R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51R3JvdXAuY2xhc3NOYW1lID0gJ21lbnUtZ3JvdXAnO1xuICAgIG1lbnVHcm91cC5hcHBlbmRDaGlsZChtZW51KTtcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRHcm91cCk7XG5cbiAgICAvLyByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQobWVudUdyb3VwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWVudSBpdGVtXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgYWRkTWVudUl0ZW0odGV4dCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnVpdGVtJyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHNldHMgZmlyc3QgdG8gYmUgc2VsZWN0ZWRcbiAgICBpZih0aGlzLm1lbnVCYXJFbGVtZW50LmNoaWxkRWxlbWVudENvdW50IDwgMSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0byBtZW51IGJhclxuICAgIHRoaXMubWVudUJhckVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtZW51IGJhciBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVNZW51RWxlbWVudCgpIHtcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51YmFyJyk7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5jbGFzc05hbWUgPSAnaDVwLW1lbnUnO1xuXG4gICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIG5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5tZW51QmFyRWxlbWVudCk7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwibWVudS10aXRsZVwiO1xuICAgIHRpdGxlLmlubmVySFRNTCA9IFwiQnJvd3NlIGNvbnRlbnQgdHlwZXNcIjtcblxuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51LmNsYXNzTmFtZSA9IFwibWVudVwiO1xuICAgIG1lbnUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIG1lbnUuYXBwZW5kQ2hpbGQobmF2RWxlbWVudCk7XG5cbiAgICByZXR1cm4gbWVudTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBpbnB1dCBncm91cCB1c2VkIGZvciBzZWFyY2hcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCgpIHtcbiAgICAvLyBpbnB1dCBmaWVsZFxuICAgIGNvbnN0IGlucHV0RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0RmllbGQuaWQgPSBcImh1Yi1zZWFyY2gtYmFyXCI7XG4gICAgaW5wdXRGaWVsZC5jbGFzc05hbWUgPSAnZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1yb3VuZGVkJztcbiAgICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgXCJTZWFyY2ggZm9yIENvbnRlbnQgVHlwZXNcIik7XG4gICAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXQsXG4gICAgICAgIHF1ZXJ5OiBldmVudC50YXJnZXQudmFsdWVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gaW5wdXQgYnV0dG9uXG4gICAgY29uc3QgaW5wdXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbnB1dEJ1dHRvbi5jbGFzc05hbWUgPSAnaW5wdXQtZ3JvdXAtYWRkb24gaWNvbi1zZWFyY2gnO1xuICAgIGlucHV0QnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJhcicpLmZvY3VzKClcbiAgICB9O1xuXG4gICAgLy8gaW5wdXQgZ3JvdXBcbiAgICBjb25zdCBpbnB1dEdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSAnaW5wdXQtZ3JvdXAnO1xuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRGaWVsZCk7XG4gICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEJ1dHRvbik7XG5cbiAgICByZXR1cm4gaW5wdXRHcm91cDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgb2YgdGhlIGNvbnRlbnQgYnJvd3NlclxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJpbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3XCI7XG5pbXBvcnQgU2VhcmNoU2VydmljZSBmcm9tIFwiLi4vc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2VcIjtcbmltcG9ydCBDb250ZW50VHlwZUxpc3QgZnJvbSAnLi4vY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QnO1xuaW1wb3J0IENvbnRlbnRUeXBlRGV0YWlsIGZyb20gJy4uL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbCc7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4uL3V0aWxzL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvblxuICogQG1peGVzIEV2ZW50ZnVsXG4gKlxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYWRkIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBjb250cm9sbGVyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0ID0gbmV3IENvbnRlbnRUeXBlTGlzdCgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwgPSBuZXcgQ29udGVudFR5cGVEZXRhaWwoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xuXG4gICAgLy8gYWRkIG1lbnUgaXRlbXNcbiAgICBbJ015IENvbnRlbnQgVHlwZXMnLCAnTmV3ZXN0JywgJ01vc3QgUG9wdWxhcicsICdSZWNvbW1lbmRlZCddXG4gICAgICAuZm9yRWFjaChtZW51VGV4dCA9PiB0aGlzLnZpZXcuYWRkTWVudUl0ZW0obWVudVRleHQpKTtcblxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XG5cbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG5cbiAgICAvLyByZWdpc3RlciBsaXN0ZW5lcnNcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMuc2VhcmNoLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignc2VsZWN0JywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdCB3aXRoIGEgc2VhcmNoXG4gICAqL1xuICBpbml0Q29udGVudFR5cGVMaXN0KCkge1xuICAgIC8vIGluaXRpYWxpemUgYnkgc2VhcmNoXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChcIlwiKVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZmlyZSgnZXJyb3InLCBlcnJvcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgc2VhcmNoIGFuZCB1cGRhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAgICovXG4gIHNlYXJjaCh7cXVlcnl9KSB7XG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGFwcGx5IGEgc2VhcmNoIGZpbHRlclxuICAgKi9cbiAgYXBwbHlTZWFyY2hGaWx0ZXIoKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnQ29udGVudFR5cGVTZWN0aW9uOiBtZW51IHdhcyBjbGlja2VkIScsIGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyBkZXRhaWwgdmlld1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNob3dEZXRhaWxWaWV3KHtpZH0pIHtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5oaWRlKCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5sb2FkQnlJZChpZCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5zaG93KCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDbG9zZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgY2xvc2VEZXRhaWxWaWV3KCkge1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJpbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCJcbmltcG9ydCBpbml0VGFiUGFuZWwgZnJvbSBcImNvbXBvbmVudHMvdGFiLXBhbmVsXCJcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IGF0dHJpYnV0ZUVxdWFscywgZ2V0QXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuL3V0aWxzL2V2ZW50cyc7XG4vKipcbiAqIFRhYiBjaGFuZ2UgZXZlbnRcbiAqIEBldmVudCBIdWJWaWV3I3RhYi1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogUGFuZWwgb3BlbiBvciBjbG9zZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjcGFuZWwtY2hhbmdlXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfREFUQV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaXNPcGVuID0gaGFzQXR0cmlidXRlKCdvcGVuJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWJWaWV3I3RhYi1jaGFuZ2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViVmlldyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIHRoaXMucmVuZGVyVGFiUGFuZWwoc3RhdGUpO1xuICAgIHRoaXMucmVuZGVyUGFuZWwoc3RhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgcGFuZWxcbiAgICovXG4gIGNsb3NlUGFuZWwoKSB7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKi9cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbklkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwYW5kZWRcbiAgICovXG4gIHJlbmRlclBhbmVsKHt0aXRsZSA9ICcnLCBzZWN0aW9uSWQgPSAnY29udGVudC10eXBlcycsIGV4cGFuZGVkID0gZmFsc2V9KSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSArPSBcInBhbmVsLWhlYWRlciBpY29uLWh1Yi1pY29uXCI7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAoISFleHBhbmRlZCkudG9TdHJpbmcoKSk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gKTtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLCB0aGlzLnRpdGxlKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmJvZHkuY2xhc3NOYW1lICs9IFwicGFuZWwtYm9keVwiO1xuICAgIHRoaXMuYm9keS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFleHBhbmRlZCkudG9TdHJpbmcoKSk7XG4gICAgdGhpcy5ib2R5LmlkID0gYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YDtcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgKz0gYHBhbmVsIGg1cC1zZWN0aW9uLSR7c2VjdGlvbklkfWA7XG4gICAgaWYoZXhwYW5kZWQpe1xuICAgICAgdGhpcy5wYW5lbC5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XG4gICAgfVxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmJvZHkpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgKz0gYGg1cCBoNXAtaHViYDtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgIGluaXRQYW5lbCh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaWYgcGFuZWwgaXMgb3BlbiwgdGhpcyBpcyB1c2VkIGZvciBvdXRlciBib3JkZXIgY29sb3JcbiAgICovXG4gIHRvZ2dsZVBhbmVsT3BlbigpIHtcbiAgICBsZXQgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGlmKGlzT3BlbihwYW5lbCkpIHtcbiAgICAgIHBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtwYW5lbC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKS5mb2N1cygpfSwyMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnRhYmxpc3QuY2xhc3NOYW1lICs9IFwidGFibGlzdFwiO1xuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0YWJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcbiAgICovXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XG4gICAgY29uc3QgdGFiUGFuZWxJZCA9IGB0YWItcGFuZWwtJHtpZH1gO1xuXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0YWIuY2xhc3NOYW1lICs9ICd0YWInO1xuICAgIHRhYi5pZCA9IHRhYklkO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQudG9TdHJpbmcoKSk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgaWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgdGFiLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCd0YWItY2hhbmdlJywgdGhpcywgdGFiKTtcblxuICAgIGNvbnN0IHRhYlBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFiUGFuZWwuaWQgPSB0YWJQYW5lbElkO1xuICAgIHRhYlBhbmVsLmNsYXNzTmFtZSArPSAndGFicGFuZWwnO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJsbGVkYnknLCB0YWJJZCk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghc2VsZWN0ZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgIHRhYlBhbmVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKHRhYik7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRhYlBhbmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGFuaW1hdGVkIGJvcmRlciB0byB0aGUgYm90dG9tIG9mIHRoZSB0YWJcbiAgICovXG4gIGFkZEJvdHRvbUJvcmRlcigpIHtcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcbiAgfVxuXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBpbml0VGFiUGFuZWwodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0U2VjdGlvblR5cGUoe2lkfSkge1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gYGg1cC1zZWN0aW9uLSR7aWR9IHBhbmVsYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwiaW1wb3J0IHtjdXJyeX0gZnJvbSAndXRpbHMvZnVuY3Rpb25hbCdcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuLi9odWItc2VydmljZXMnO1xuXG4vKipcbiAqIEBjbGFzc1xuICogVGhlIFNlYXJjaCBTZXJ2aWNlIGdldHMgYSBjb250ZW50IHR5cGUgZnJvbSBodWItc2VydmljZXMuanNcbiAqIGluIHRoZSBmb3JtIG9mIGEgcHJvbWlzZS4gSXQgdGhlbiBnZW5lcmF0ZXMgYSBzY29yZSBiYXNlZFxuICogb24gdGhlIGRpZmZlcmVudCB3ZWlnaHRpbmdzIG9mIHRoZSBjb250ZW50IHR5cGUgZmllbGRzIGFuZFxuICogc29ydHMgdGhlIHJlc3VsdHMgYmFzZWQgb24gdGhlIGdlbmVyYXRlZCBzY29yZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoU2VydmljZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLmFwaVJvb3RVcmxcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBBZGQgY29udGVudCB0eXBlcyB0byB0aGUgc2VhcmNoIGluZGV4XG4gICAgdGhpcy5jb250ZW50VHlwZXMgPSB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgc2VhcmNoXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW10+fSBBIHByb21pc2Ugb2YgYW4gYXJyYXkgb2YgY29udGVudCB0eXBlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFR5cGVzLnRoZW4oZmlsdGVyQnlRdWVyeShxdWVyeSkpO1xuICB9XG59XG5cbi8qKlxuICogRmlsdGVycyBhIGxpc3Qgb2YgY29udGVudCB0eXBlcyBiYXNlZCBvbiBhIHF1ZXJ5XG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICovXG5jb25zdCBmaWx0ZXJCeVF1ZXJ5ID0gY3VycnkoZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlcykge1xuICBpZiAocXVlcnkgPT0gJycpIHtcbiAgICByZXR1cm4gY29udGVudFR5cGVzO1xuICB9XG5cbiAgLy8gQXBwZW5kIGEgc2VhcmNoIHNjb3JlIHRvIGVhY2ggY29udGVudCB0eXBlXG4gIGNvbnRlbnRUeXBlcyA9IGNvbnRlbnRUeXBlcy5tYXAoY29udGVudFR5cGUgPT5cbiAgICAoe1xuICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgc2NvcmU6IDBcbiAgICB9KVxuICApO1xuXG4gIC8vIFRva2VuaXplIHF1ZXJ5IGFuZCBzYW5pdGl6ZVxuICBsZXQgcXVlcmllcyA9IHF1ZXJ5LnNwbGl0KCcgJykuZmlsdGVyKHF1ZXJ5ID0+IHF1ZXJ5ICE9PSAnJyk7XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHF1ZXJpZXMgYW5kIGdlbmVyYXRlIGEgcmVsZXZhbmNlIHNjb3JlXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlcmllcy5sZW5ndGg7IGkgKyspIHtcbiAgICBpZiAoaSA+IDApIHsgLy8gU2VhcmNoIGEgc21hbGxlciBzdWJzZXQgZWFjaCB0aW1lXG4gICAgICBjb250ZW50VHlwZXMgPSBjb250ZW50VHlwZXMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc2NvcmUgPiAwKTtcbiAgICB9XG4gICAgY29udGVudFR5cGVzLmZvckVhY2goY29udGVudFR5cGUgPT4gY29udGVudFR5cGUuc2NvcmUgPSBnZXRTZWFyY2hTY29yZShxdWVyaWVzW2ldLCBjb250ZW50VHlwZS5jb250ZW50VHlwZSkpO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRlbnRUeXBlc1xuICAgIC5maWx0ZXIocmVzdWx0ID0+IHJlc3VsdC5zY29yZSA+IDApXG4gICAgLnNvcnQoc29ydFNlYXJjaFJlc3VsdHMpIC8vIFNvcnQgYnkgaW5zdGFsbGVkLCByZWxldmFuY2UgYW5kIHBvcHVsYXJpdHlcbiAgICAubWFwKHJlc3VsdCA9PiByZXN1bHQuY29udGVudFR5cGUpOyAvLyBVbndyYXAgcmVzdWx0IG9iamVjdDtcbn0pO1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciBBcnJheS5zb3J0KClcbiAqIENvbXBhcmVzIHR3byBjb250ZW50IHR5cGVzIG9uIGRpZmZlcmVudCBjcml0ZXJpYVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIEZpcnN0IGNvbnRlbnQgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IGIgU2Vjb25kIGNvbnRlbnQgdHlwZVxuICogQHJldHVybiB7aW50fVxuICovXG5jb25zdCBzb3J0U2VhcmNoUmVzdWx0cyA9IChhLGIpID0+IHtcbiAgaWYgKCFhLmNvbnRlbnRUeXBlLmluc3RhbGxlZCAmJiBiLmNvbnRlbnRUeXBlLmluc3RhbGxlZCkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgZWxzZSBpZiAoYi5zY29yZSAhPT0gYS5zY29yZSkge1xuICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZTtcbiAgfVxuXG4gIGVsc2Uge1xuICAgIHJldHVybiBiLmNvbnRlbnRUeXBlLnBvcHVsYXJpdHkgLSBhLmNvbnRlbnRUeXBlLnBvcHVsYXJpdHk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB3ZWlnaHRpbmcgZm9yIGRpZmZlcmVudCBzZWFyY2ggdGVybXMgYmFzZWRcbiAqIG9uIGV4aXN0ZW5jZSBvZiBzdWJzdHJpbmdzXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBxdWVyeVxuICogQHBhcmFtICB7T2JqZWN0fSBjb250ZW50VHlwZVxuICogQHJldHVybiB7aW50fVxuICovXG4gY29uc3QgZ2V0U2VhcmNoU2NvcmUgPSBmdW5jdGlvbihxdWVyeSwgY29udGVudFR5cGUpIHtcbiAgIGNvbnNvbGUubG9nKGNvbnRlbnRUeXBlKTtcbiAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpO1xuICAgbGV0IHNjb3JlID0gMDtcbiAgIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnRpdGxlKSkge1xuICAgICBzY29yZSArPSAxMDA7XG4gICB9XG4gICBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5zdW1tYXJ5KSkge1xuICAgICBzY29yZSArPSA1O1xuICAgfVxuICAgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuZGVzY3JpcHRpb24pKSB7XG4gICAgIHNjb3JlICs9IDU7XG4gICB9XG4gICBpZiAoYXJyYXlIYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmtleXdvcmRzKSkge1xuICAgICAgIHNjb3JlICs9IDU7XG4gICB9XG4gICByZXR1cm4gc2NvcmU7XG4gfTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBuZWVkbGUgaXMgZm91bmQgaW4gdGhlIGhheXN0YWNrLlxuICogTm90IGNhc2Ugc2Vuc2l0aXZlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5lZWRsZVxuICogQHBhcmFtIHtzdHJpbmd9IGhheXN0YWNrXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdWJTdHJpbmcgPSBmdW5jdGlvbihuZWVkbGUsIGhheXN0YWNrKSB7XG4gIGlmIChoYXlzdGFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGhheXN0YWNrLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24sIGNoZWNrcyBpZiBhcnJheSBoYXMgY29udGFpbnMgYSBzdWJzdHJpbmdcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN1YlN0cmluZ1xuICogQHBhcmFtICB7QXJyYXl9IGFyclxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgYXJyYXlIYXNTdWJTdHJpbmcgPSBmdW5jdGlvbihzdWJTdHJpbmcsIGFycikge1xuICBpZiAoYXJyID09PSB1bmRlZmluZWQgfHwgc3ViU3RyaW5nID09PSAnJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBhcnIuc29tZShzdHJpbmcgPT4gaGFzU3ViU3RyaW5nKHN1YlN0cmluZywgc3RyaW5nKSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJpbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi4vaHViLXNlcnZpY2VzJztcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICpcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBJbnB1dCBlbGVtZW50IGZvciB0aGUgSDVQIGZpbGVcbiAgICBjb25zdCBoNXBVcGxvYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGg1cFVwbG9hZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZmlsZScpO1xuXG4gICAgLy8gU2VuZHMgdGhlIEg1UCBmaWxlIHRvIHRoZSBwbHVnaW5cbiAgICBjb25zdCB1c2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB1c2VCdXR0b24udGV4dENvbnRlbnQgPSAnVXNlJztcbiAgICB1c2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgIC8vIEFkZCB0aGUgSDVQIGZpbGUgdG8gYSBmb3JtLCByZWFkeSBmb3IgdHJhbnNwb3J0YXRpb25cbiAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGRhdGEuYXBwZW5kKCdoNXAnLCBoNXBVcGxvYWQuZmlsZXNbMF0pO1xuXG4gICAgICAvLyBVcGxvYWQgY29udGVudCB0byB0aGUgcGx1Z2luXG4gICAgICB0aGlzLnNlcnZpY2VzLnVwbG9hZENvbnRlbnQoZGF0YSlcbiAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgLy8gRmlyZSB0aGUgcmVjZWl2ZWQgZGF0YSB0byBhbnkgbGlzdGVuZXJzXG4gICAgICAgICAgc2VsZi5maXJlKCd1cGxvYWQnLCBqc29uKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChoNXBVcGxvYWQpO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodXNlQnV0dG9uKTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBlbGVtZW50O1xuICB9XG5cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlLCBjbGFzc0xpc3RDb250YWlucywgcXVlcnlTZWxlY3Rvciwgbm9kZUxpc3RUb0FycmF5IH0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9TSVpFID0gJ2RhdGEtc2l6ZSc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBkaXNhYmxlID0gc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGVuYWJsZSA9IHJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWRcbiAqL1xuY29uc3QgdG9nZ2xlRW5hYmxlZCA9IChlbGVtZW50LCBlbmFibGVkKSA9PiAoZW5hYmxlZCA/IGVuYWJsZSA6IGRpc2FibGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlkZGVuXG4gKi9cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBjdXJyeSgoaGlkZGVuLCBlbGVtZW50KSA9PiBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaGlkZGVuLnRvU3RyaW5nKCksIGVsZW1lbnQpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGlzRGlzYWJsZWQgPSBoYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogVXBkYXRlIHRoZSB2aWV3XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKi9cbmNvbnN0IHVwZGF0ZVZpZXcgPSAoZWxlbWVudCwgc3RhdGUpID0+IHtcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XG4gIGNvbnN0IG5leHRCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gIGNvbnN0IGxpc3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gIGNvbnN0IHRvdGFsQ291bnQgPSBsaXN0LmNoaWxkRWxlbWVudENvdW50O1xuXG4gIC8vIHVwZGF0ZSBsaXN0IHNpemVzXG4gIGxpc3Quc3R5bGUud2lkdGggPSBgJHsxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQgKiB0b3RhbENvdW50fSVgO1xuICBsaXN0LnN0eWxlLm1hcmdpbkxlZnQgPSBgJHtzdGF0ZS5wb3NpdGlvbiAqICgxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQpfSVgO1xuXG4gIC8vIHVwZGF0ZSBpbWFnZSBzaXplc1xuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHsxMDAgLyB0b3RhbENvdW50fSVgKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIHZpc2liaWxpdHlcbiAgW3ByZXZCdXR0b24sIG5leHRCdXR0b25dXG4gICAgLmZvckVhY2godG9nZ2xlVmlzaWJpbGl0eShzdGF0ZS5kaXNwbGF5Q291bnQgPj0gdG90YWxDb3VudCkpO1xuXG4gIC8vIHRvZ2dsZSBidXR0b24gZW5hYmxlLCBkaXNhYmxlZFxuICB0b2dnbGVFbmFibGVkKG5leHRCdXR0b24sIHN0YXRlLnBvc2l0aW9uID4gKHN0YXRlLmRpc3BsYXlDb3VudCAtIHRvdGFsQ291bnQpKTtcbiAgdG9nZ2xlRW5hYmxlZChwcmV2QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA8IDApO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGJ1dHRvbiBjbGlja2VkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB1cGRhdGVTdGF0ZVxuICogQHBhcmFtIHtFdmVudH1cbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBvbk5hdmlnYXRpb25CdXR0b25DbGljayA9IGN1cnJ5KChlbGVtZW50LCBzdGF0ZSwgdXBkYXRlU3RhdGUsIGV2ZW50KSA9PiB7XG4gIGlmKCFpc0Rpc2FibGVkKGV2ZW50LnRhcmdldCkpe1xuICAgIHVwZGF0ZVN0YXRlKHN0YXRlKTtcbiAgICB1cGRhdGVWaWV3KGVsZW1lbnQsIHN0YXRlKTtcbiAgfVxufSk7XG5cbmNvbnN0IGluaXRJbWFnZSA9IGN1cnJ5KChlbGVtZW50LCBpbWFnZSkgPT4ge1xuICBsZXQgdGFyZ2V0SWQgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgbGV0IHRhcmdldCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFyZ2V0SWR9YCk7XG5cbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcbiAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpKVxufSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHdoZW4gdGhlIGRvbSBpcyB1cGRhdGVkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSByZWNvcmRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoYW5kbGVEb21VcGRhdGUgPSBjdXJyeSgoZWxlbWVudCwgc3RhdGUsIHJlY29yZCkgPT4ge1xuICAvLyBvbiBhZGQgaW1hZ2UgcnVuIGluaXRpYWxpemF0aW9uXG4gIGlmKHJlY29yZC50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgIG5vZGVMaXN0VG9BcnJheShyZWNvcmQuYWRkZWROb2RlcylcbiAgICAgIC5maWx0ZXIoY2xhc3NMaXN0Q29udGFpbnMoJ3NsaWRlJykpXG4gICAgICAubWFwKHF1ZXJ5U2VsZWN0b3IoJ2ltZycpKVxuICAgICAgLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgdmlld1xuICB1cGRhdGVWaWV3KGVsZW1lbnQsIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH0pKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBJbWFnZVNjcm9sbGVyU3RhdGVcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRpc3BsYXlDb3VudFxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcG9zaXRpb25cbiAgICovXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIGRpc3BsYXlDb3VudDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX1NJWkUpIHx8IDUsXG4gICAgcG9zaXRpb246IDBcbiAgfTtcblxuICAvLyBpbml0aWFsaXplIGJ1dHRvbnNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uLS0pKTtcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbisrKSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBpbWFnZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbYXJpYS1jb250cm9sc10nKS5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XG5cbiAgLy8gbGlzdGVuIGZvciB1cGRhdGVzIHRvIGRhdGEtc2l6ZVxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKGhhbmRsZURvbVVwZGF0ZShlbGVtZW50LCBzdGF0ZSkpKTtcblxuICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIHtcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW0FUVFJJQlVURV9TSVpFXVxuICB9KTtcblxuICAvLyBpbml0aWFsaXplIHBvc2l0aW9uXG4gIHVwZGF0ZVZpZXcoZWxlbWVudCwgc3RhdGUpO1xuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCB1blNlbGVjdEFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJykpO1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGNvbnN0IHRhYnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyk7XG4gIGNvbnN0IHRhYlBhbmVscyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpO1xuXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICB1blNlbGVjdEFsbCh0YWJzKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXG4gICAgICBoaWRlQWxsKHRhYlBhbmVscyk7XG5cbiAgICAgIGxldCB0YWJQYW5lbElkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICAgICAgc2hvdyhlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhYlBhbmVsSWR9YCkpO1xuICAgIH0pO1xuICB9KVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwicmVxdWlyZSgnLi4vLi4vc3JjL3N0eWxlcy9tYWluLnNjc3MnKTtcblxuLy8gTG9hZCBsaWJyYXJ5XG5INVAgPSBINVAgfHwge307XG5INVAuSHViQ2xpZW50ID0gcmVxdWlyZSgnLi4vc2NyaXB0cy9odWInKS5kZWZhdWx0O1xuSDVQLkh1YkNsaWVudC5yZW5kZXJFcnJvck1lc3NhZ2UgPSByZXF1aXJlKCcuLi9zY3JpcHRzL3V0aWxzL2Vycm9ycycpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==