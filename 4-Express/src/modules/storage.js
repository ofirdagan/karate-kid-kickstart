const axios = require('axios')
const {serverBaseURL} = require('./constants')
const TODOList = 'TODO-List'

function set(id, title, content){
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

function remove(id){
    const config = {
        method: 'delete',
        url: serverBaseURL+'storage/delete/'+id,   
    };
    axios(config)
        .catch(function (error) {
            alert(`item deletion is denied, ${error}`);
        });
}

async function getAll(){
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

async function get(id){
    const config = {
        method: 'get',
        url: serverBaseURL+'storage/get/'+id,
    };
    await axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return todoMap[id]
        });
    return todoMap[id]
}

export {set,get,getAll,remove}