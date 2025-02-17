const express = require('express');
const app = express();

// app.use('/test', (req, res) => {
//     res.send("Test page")
// })

// app.get('/test', (req, res) => {
//     res.send({fName: "vikash", lastName: "khowal"})
// })
// app.post('/test', (req, res) => {
//     res.send("Date Added Successfully!")
// })
// app.delete('/test', (req, res) => {
//     res.send("Data Deleted Successfully!")
// })

app.use('/test', (req, res, next) => {
    console.log("1st Handler");
    // res.send("You are on 1st Route");
    next()
}, (req, res, next) => {
    console.log("2nd Handler");
    // res.send("You are on 2nd Route");
    next()

}, (req, res, next) => {
    console.log("3rd Handler");
    res.send("You are on 3rd Route");

}
)


app.listen(5555, () => {
    console.log("Server is running on port 5555")
})