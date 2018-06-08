import axios from 'axios';

export function drop(url, object)
{
    console.log("deleting object: " + JSON.stringify(object));
    return fetch(url + "/" + object._id, {
        method: 'DELETE'
    }).then(response => {
        console.log("response" + response);
    }).catch(error => {
        console.log("error: " +  error.response)
    });
}
