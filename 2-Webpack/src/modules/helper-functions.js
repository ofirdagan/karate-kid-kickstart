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
module.exports ={
    'getValue':getValue,
    'setValue':setValue,
    'getInnerText':getInnerText,
    'setInnerText':setInnerText
}
