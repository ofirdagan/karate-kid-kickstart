/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_todosFacade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/todosFacade */ \"./src/js/todosFacade.js\");\n/* harmony import */ var _js_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/utils */ \"./src/js/utils.js\");\n\n\n\n(function () {\n  const addButton = document.getElementById(\"add\");\n  const todoContent = document.getElementById(\"todo-input\");\n  const todosContainer = document.getElementById(\"todos\");\n\n  const createInput = ({ value }) => {\n    const input = document.createElement(\"input\");\n    input.setAttribute(\"type\", \"text\");\n    input.setAttribute(\"value\", value);\n    input.setAttribute(\"disabled\", true);\n    return input;\n  };\n\n  const createCheckbox = ({ checked, cb }) => {\n    const checkbox = document.createElement(\"input\");\n    checkbox.setAttribute(\"type\", \"checkbox\");\n    if (checked) {\n      checkbox.setAttribute(\"checked\", true);\n    }\n    checkbox.addEventListener(\"click\", () => cb(checkbox));\n    return checkbox;\n  };\n\n  const createButton = ({ text, cb }) => {\n    const btn = document.createElement(\"button\");\n    btn.innerHTML = text;\n    btn.addEventListener(\"click\", () => cb(btn));\n    return btn;\n  };\n\n  const createTodoElement = ({ value, checked, id }) => {\n    const container = document.createElement(\"div\");\n    container.setAttribute(\"id\", id);\n    const input = createInput({ value });\n    const checkbox = createCheckbox({\n      checked,\n      cb: (el) =>\n        (0,_js_todosFacade__WEBPACK_IMPORTED_MODULE_0__.editTodo)(id, { value: input.value, done: Boolean(el.checked) }),\n    });\n    const deleteBtn = createButton({\n      text: \"delete\",\n      cb: () => {\n        (0,_js_todosFacade__WEBPACK_IMPORTED_MODULE_0__.removeTodo)(id);\n        container.parentNode.removeChild(container);\n      },\n    });\n    const editButton = createButton({\n      text: \"edit\",\n      cb: (el) => {\n        if (!input.getAttribute(\"disabled\")) {\n          input.setAttribute(\"disabled\", true);\n          el.innerHTML = \"edit\";\n          (0,_js_todosFacade__WEBPACK_IMPORTED_MODULE_0__.editTodo)(id, { value: input.value, done: checkbox.checked });\n          return;\n        }\n\n        input.removeAttribute(\"disabled\");\n        el.innerHTML = \"done\";\n      },\n    });\n\n    container.appendChild(input);\n    container.appendChild(checkbox);\n    container.appendChild(deleteBtn);\n    container.appendChild(editButton);\n    todosContainer.appendChild(container);\n  };\n\n  addButton.addEventListener(\"click\", () => {\n    const value = todoContent.value;\n    const checked = false;\n    const id = (0,_js_utils__WEBPACK_IMPORTED_MODULE_1__.generateId)();\n    (0,_js_todosFacade__WEBPACK_IMPORTED_MODULE_0__.addTodo)({ id, value, done: checked });\n    createTodoElement({ id, value, checked });\n  });\n\n  const todos = (0,_js_todosFacade__WEBPACK_IMPORTED_MODULE_0__.getTodos)();\n  Object.keys(todos).forEach((id) => {\n    const { value, done } = todos[id];\n    createTodoElement({ value, checked: done, id });\n  });\n})();\n\n\n//# sourceURL=webpack://karate-webpack/./src/index.js?");

/***/ }),

/***/ "./src/js/todosFacade.js":
/*!*******************************!*\
  !*** ./src/js/todosFacade.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addTodo\": () => (/* binding */ addTodo),\n/* harmony export */   \"removeTodo\": () => (/* binding */ removeTodo),\n/* harmony export */   \"editTodo\": () => (/* binding */ editTodo),\n/* harmony export */   \"getTodos\": () => (/* binding */ getTodos)\n/* harmony export */ });\nfunction addTodo({ id, value, done }) {\n  const todos = JSON.parse(localStorage.getItem(\"todos\")) || {};\n  todos[id] = { value, done };\n  localStorage.setItem(\"todos\", JSON.stringify(todos));\n}\n\nfunction removeTodo(id) {\n  const todos = JSON.parse(localStorage.getItem(\"todos\")) || {};\n\n  if (!todos[id]) {\n    throw new Error(`item with id ${id} doesn't exist`);\n  }\n\n  delete todos[id]\n  localStorage.setItem(\"todos\", JSON.stringify(todos))\n}\n\nfunction editTodo(id, { value, done }) {\n  const todos = JSON.parse(localStorage.getItem(\"todos\")) || {};\n\n  if (!todos[id]) {\n    throw new Error(`item with id ${id} doesn't exist`);\n  }\n\n  todos[id] = { value, done };\n  localStorage.setItem(\"todos\", JSON.stringify(todos))\n}\n\nfunction getTodos() {\n  return JSON.parse(localStorage.getItem(\"todos\")) || {};\n}\n\n\n//# sourceURL=webpack://karate-webpack/./src/js/todosFacade.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateId\": () => (/* binding */ generateId)\n/* harmony export */ });\nfunction generateId() {\n  // Copy pasta-ed\n  return \"_\" + Math.random().toString(36).substr(2, 9);\n}\n\n//# sourceURL=webpack://karate-webpack/./src/js/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;