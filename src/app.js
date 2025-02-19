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


// MIddleWare
// app.use('/test', (req, res, next) => {
//     console.log("1st Handler");
//     // res.send("You are on 1st Route");
//     next()
// }, (req, res, next) => {
//     console.log("2nd Handler");
//     // res.send("You are on 2nd Route");
//     next()

// }, (req, res, next) => {
//     console.log("3rd Handler");
//     res.send("You are on 3rd Route");

// }
// )

// Auth Middleware

// const { adminAuth, userAuth } = require('./middleware/auth');

// // app.use('/admin', adminAuth);

// app.get('/user', userAuth, (req, res) => {
//     res.send("User Data Send")
// })


// app.get('/admin/getAllData', (req, res) => {
//     res.send("All Data Send!")
// })

// app.get('/admin/deleteAllData', (req, res) => {
//     res.send("All Data Deleted!")
// })


// Error Handling

app.use('/', (err, req, res, next) => {
    if(err){
        // Log Your error Message
        res.status(500).send("Something Went Wrong!")
    }
})

app.get("/user", (req, res) => {
    
    try{
        //Logic of DB Call & Get User Data

        throw new Error("dbbshhss");
        res.send("User Data Sent")
    }catch(err){
        res.status(500).send("some Error contact support team")
    }
   
})




app.listen(5555, () => {
    console.log("Server is running on port 5555")
})