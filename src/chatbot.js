const express = require('express');
const app = express();

// Middleware
app.use(express.json());

function findArrayValue(array, word) {
    const min = 1;
    const max = 1080;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = randomNumber; i < array.length; i++) {
        if (array[i].includes(word)) {
            console.log(array)
            return array[i];
        }
    }
    return "not_found";
}

// Routes

app.get('/', (req, res) => {
    const query = req.query.message.toLowerCase();
    const messageArray = require("./respuestas.json").phrases;
    let message;

    if (query) {

        if(query === "hello") message = result;

        const result = 
        findArrayValue(messageArray, query);
        if (result !== "not_found") {
            message = result;
        } else {
            const messageRandom = Math.floor(Math.random() * messageArray.length);
            message = messageArray[messageRandom];
        }
    } else {
        const messageRandom = Math.floor(Math.random() * messageArray.length);
        message = messageArray[messageRandom];
    }

    res.json({
        message: message
    });
});

module.exports = app;
