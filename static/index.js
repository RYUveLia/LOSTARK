var ws = new WebSocket("ws://localhost:8000/ws");
ws.onmessage = function (event) {
    var messages = document.getElementById('messages')
    var message = document.createElement('li')
    var content = document.createTextNode(event.data)
    message.appendChild(content)
    messages.appendChild(message)
};
function sendMessage(event) {
    ws.send(JSON.stringify(jsonArray))
    //event.preventDefault()
};

const submit = document.getElementById("submit");

const getFormData = () => {
    const form = document.getElementById("form");
    return new FormData(form);
}

const toJson = function (event) {
    const formData = getFormData();
    console.log(formData)
    event.preventDefault();

    let object = {};

    formData.forEach((value, key) => {
        if (!Reflect.has(object, key)) {
            object[key] = value;
            return;
        }
        if (!Array.isArray(object[key])) {
            object[key] = [object[key]];
        }
        object[key].push(value);
    });

    let json = JSON.stringify(object);
    ws.send(json)
};

submit.addEventListener("click", toJson);
