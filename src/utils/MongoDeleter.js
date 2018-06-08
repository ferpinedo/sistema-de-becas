


export function drop(url, object)
{
    console.log("Row: " + JSON.stringify(object))
    console.log("Row: " + object["_original"]._id)
    let request = new Request(url+"/" + object["_original"]._id, {
        method: 'DELETE',
        cache: 'no-cache',
        mode:'cors'
    });
        // return fetch(url+"/" + object["_original"]._id, {
        //     method: 'DELETE',
        //     body: object
        // }).then(response => response.json());

    return fetch(request).then(response => response.json());

}
