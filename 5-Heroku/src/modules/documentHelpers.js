export const getValue = (id) => document.getElementById(id).value
export const setValue = (id, value) => document.getElementById(id).value = value
export const getInnerText = (id) => document.getElementById(id).innerText
export const setInnerText = (id, text) => document.getElementById(id).innerText = text
export const addEvent = (id, eventName, func) => document.getElementById(id).addEventListener(eventName, func)
