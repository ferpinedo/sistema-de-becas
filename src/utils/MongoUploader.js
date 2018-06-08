import axios from 'axios';

export function push(url, object, pushCallBack)
{
    console.log("object: " + JSON.stringify(object));
    axios.post(url, object)
        .then(response => {
            console.log(response);
            pushCallBack();
        })
        .catch(error => {
            console.log(error.response)
        });
}
