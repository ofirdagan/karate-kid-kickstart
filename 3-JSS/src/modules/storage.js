const TODOList = 'TODO-List'
function start(){
    //set an empty map if not-existent
    if(localStorage.getItem(TODOList)==null){
        const todoMap = JSON.stringify({})
        localStorage.setItem(TODOList,todoMap)
    }
}
function setItemToLocalstorage(id, title, content){
    start()
    const item = {
        "title": title,
        "content": content
    }
    const todoListString = localStorage.getItem(TODOList)
    const todoMap = JSON.parse(todoListString)
    //inset item to todo map
    todoMap[id]=item
    localStorage.setItem(TODOList,JSON.stringify(todoMap))
}
function removeItemFromLocalstorage(id){
    start()
    const todoListString = localStorage.getItem(TODOList)
    const todoMap = JSON.parse(todoListString)
    //delete item to todo map
    delete todoMap[id]
    localStorage.setItem(TODOList,JSON.stringify(todoMap))
}
function getAllItemsFromStorage(){
    start()
    return JSON.parse(localStorage.getItem(TODOList))
}
function getItemFromLocalstorage(id){
    start()
    const todoListString = localStorage.getItem(TODOList)
    const todoMap = JSON.parse(todoListString)
    return todoMap[key]
}
function clearItemsFromItemList(){
    localStorage.setItem(TODOList,{})
}
function clearTODOListFromStorage(){
    localStorage.removeItem(TODOList)
}
module.exports ={
    'set':setItemToLocalstorage,
    'get':getItemFromLocalstorage,
    'getAll':getAllItemsFromStorage,
    'remove':removeItemFromLocalstorage,
    'clear': clearItemsFromItemList,
    'clearStorage':clearTODOListFromStorage
}