
export function drop(url, object, deleteCallback)
{
    url = url+"/" + object["_original"]._id;
    console.log("Row: " + JSON.stringify(object));
    console.log("Row: " + object["_original"]._id);
    let request = new Request(url, {
        method: 'DELETE'
    });
    return fetch(request).then(response => {
        console.log("Response: " + response.toString());
        deleteCallback();
    });
}
