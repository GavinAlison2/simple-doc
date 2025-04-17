function load(url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status == 200) {
                resolve(this.response);
            } else {
                reject(this.status);
            }
        };
        request.open('GET', url, true);
        request.send();
    });
}
function getData(url) {
    return `{
        \"message\": \"JavaScript Promise Demo\"} 
    `;
}

const url = 'http://127.0.0.1:5500/es-tutotial/es6/0001/json/api.json';
const btn = document.querySelector('#btnGet');
const msg = document.querySelector('#message');

btn.addEventListener('click', () => {
    new Promise((resolve, reject) => {
        resolve(getData());
    })
        .then((response) => {
            const result = JSON.parse(response);
            msg.innerHTML = result.message;
        })
        .catch((error) => {
            if (error === 0) {
                msg.innerHTML = "无法发送请求，请检查网络连接或CORS配置。";
            } else {
                msg.innerHTML = `Error getting the message, HTTP status: ${error}`;
            }
        })
        .finally(() => {
            console.log('Request completed.');
            msg.innerHTML += '<br>Request completed.';
        });
});
