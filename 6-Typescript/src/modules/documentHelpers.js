function getValue(id){
    return document.getElementById(id).value
}
function setValue(id,value){
    document.getElementById(id).value = value
}
function getInnerText(id){
    return document.getElementById(id).innerText
}
function setInnerText(id,text){
    document.getElementById(id).innerText = text
}
function addEvent(id,eventName,func){
    document.getElementById(id).addEventListener(eventName, func)
}
export default{
    getValue: (id) => document.getElementById(id).value,
    setValue: (id,value) => document.getElementById(id).value = value,
    getInnerText: (id) => document.getElementById(id).innerText,
    setInnerText:(id,text) => document.getElementById(id).innerText = text,
    addEvent: (id,eventName,func) => document.getElementById(id).addEventListener(eventName, func)
}
