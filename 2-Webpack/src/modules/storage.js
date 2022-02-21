const TODOList = 'TODO-List'
function start(){
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

    todoMap[id]=item
    localStorage.setItem(TODOList,JSON.stringify(todoMap))
}
function removeItemFromLocalstorage(id){
    start()
    const todoListString = localStorage.getItem(TODOList)
    const todoMap = JSON.parse(todoListString)

    delete todoMap[id]
    localStorage.setItem(TODOList,JSON.stringify(todoMap))
}
function getAllItemsFromStorage(){
    start()
    return JSON.parse(localStorage.getItem(TODOList))
}
function getItemFromLocalstorage(id){
    const todoMap = getAllItemsFromStorage()
    return todoMap[id]
}

module.exports ={
    'set':setItemToLocalstorage,
    'get':getItemFromLocalstorage,
    'getAll':getAllItemsFromStorage,
    'remove':removeItemFromLocalstorage,
}