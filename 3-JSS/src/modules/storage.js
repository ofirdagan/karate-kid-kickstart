const TODOList = 'TODO-List'
function start(){
    if(localStorage.getItem(TODOList)==null){
        const todoMap = JSON.stringify({})
        localStorage.setItem(TODOList,todoMap)
    }
}
function set(id, title, content){
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
function remove(id){
    start()
    const todoListString = localStorage.getItem(TODOList)
    const todoMap = JSON.parse(todoListString)
    delete todoMap[id]
    localStorage.setItem(TODOList,JSON.stringify(todoMap))
}
function getAll(){
    start()
    return JSON.parse(localStorage.getItem(TODOList))
}
function get(id){
    const todoMap = getAllItemsFromStorage()
    return todoMap[id]
}

export {set,get,remove,getAll}