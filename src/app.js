const express = require('express');
const app = express();

app.use('/test', (req, res) => {
    res.send("Test page")
})

app.use('/main', (req, res) => {
    res.send("Another Route")
})


app.listen(5555, () => {
    console.log("Server is running on port 5555")
})