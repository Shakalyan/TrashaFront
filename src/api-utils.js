export const backendHost = "http://back:5000";

export async function sendQuery(url, method, token = '') {
    return await fetch(url, {
        method: method,
        headers: {
            'Authorization': token
        }
    });
}

export async function sendJSONQuery(url, method, body, token = '') {
    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    });
}
