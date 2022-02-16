const axios = require('axios')
const {serverBaseURL} = require('./IDs')
const TODOList = 'TODO-List'

function setItemToServerStorage(id, title, content){
    const data = {
        id: id,
        title: title,
        content : content
    }
    const config = {
        method: 'post',
        data : data,
        url: serverBaseURL+'storage/set',
        
    };
    axios(config)
        .then(function (response) {
            if(response.status==201){
                console.log(`item no: ${id} is  updated`)
            }else{
                alert(`item update is denied, server status ${response.status}`)
            }
        })
        .catch(function (error) {
            alert(`item update is denied, ${error}`);
        });
}

function removeItemFromServerStorage(id){
    const config = {
        method: 'delete',
        url: serverBaseURL+'storage/delete/'+id,   
    };
    axios(config)
        .catch(function (error) {
            alert(`item deletion is denied, ${error}`);
        });
}

async function getAllItemsFromServerStorage(){
    let todoMap = {}
    const config = {
        method: 'get',
        url: serverBaseURL+'storage/all',
    };
    await axios(config)
        .then(function (response) {
            todoMap = response.data
        })
        .catch(function (error) {
            return todoMap
        });
    return todoMap
}

async function getItemFromServerStorage(id){
    // const todoMap = getAllItemsFromStorage()

    const config = {
        method: 'get',
        url: serverBaseURL+'storage/get/'+id,
    };
    await axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return todoMap
        });
    return todoMap
    return todoMap[id]
}

module.exports ={
    'set':setItemToServerStorage,
    'get':getItemFromServerStorage,
    'getAll':getAllItemsFromServerStorage,
    'remove':removeItemFromServerStorage,
}