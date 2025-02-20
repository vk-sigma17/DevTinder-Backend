// const express = require('express');
// const app = express();

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

// app.use('/', (err, req, res, next) => {
//     if(err){
//         // Log Your error Message
//         res.status(500).send("Something Went Wrong!")
//     }
// })

// app.get("/user", (req, res) => {
    
//     try{
//         //Logic of DB Call & Get User Data

//         throw new Error("dbbshhss");
//         res.send("User Data Sent")
//     }catch(err){
//         res.status(500).send("some Error contact support team")
//     }
   
// })


//  Connecting Node with database(Mongoose)
const express = require('express');
const connectDB = require('./config/database');
const Test = require('./models/user')
const { signupValidationData } = require('./utils/validation.js')
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json())

// ADD Document to collection
app.post('/signup', async (req, res) => {

    try{
        //Validation of Data
        signupValidationData(req)
    
        const { firstName, lastName, email, password, gender, age } = req.body;
    
        // hashing of password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // console.log(req.body)
        const test = new Test(
            // req.body
    
            // OR
    
            // {
            // firstName: "vikash",
            // lastName: "khowal",
            // email: "khowal123@gmail.com",
            // password: "vikash123"
        // }
    
            // OR
            {firstName, lastName, email, password: hashedPassword, gender, age } 
    
    )
        await test.save();
        res.send("Data Sent Successfully !")
    }
    catch(err) {
        console.log(err)
        res.status(400).send("Error Occured :" + err.message)
    }

})

//  LogIn API
app.post('/login', (req, res) => {
    try{

        const { email, password } = req.body;
    
        const user = Test.findOne({email: email});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = bcrypt.compare(password, user.password)
        if(isPasswordValid){
            res.send("Account Login Successfully!!")
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.status(400).send(`ERROR: ${err.message}`)
    }
})


    //user API to find the single user by by email
    app.get('/userTest', async(req, res) => {
        const userEmail = req.body.email;
        console.log(userEmail);
        try{
            // const users = await User.find({emailId: userEmail});
            const users = await Test.findOne({email: userEmail});
           if(users.length === 0){
            res.status(404).send("User Not Found!")
           }else{
    
               res.send(users);
           }
        }
        catch(err){
            res.status(400).send("Something Went Wrong")
        }
    
    }) 
    //user API to find the All user 
    app.get('/userAll', async(req, res) => {
        
        try{
            // const users = await User.find({emailId: userEmail});
            const users = await Test.find({});
           if(users.length === 0){
            res.status(404).send("User Not Found!")
           }else{
    
               res.send(users);
           }
        }
        catch(err){
            res.status(400).send("Something Went Wrong")
        }
    
    }) 
   
    // //delete user API - deleting a user by its id
    app.delete('/deleteUser', async (req, res) => {
        const userId = req.body._id;
        console.log(userId)
        const deletedUser = await Test.findByIdAndDelete({_id: userId});
        try{
            console.log("One User Deleteed!")
             res.send(deletedUser)
        }
        catch(err){
            console.error("something Went wrong!!")
        }
    })
    // patch user API - updating the data of user
    app.patch('/updateUser/:userId', async (req, res) => {
        // const userID = req.body._id;
        const userID = req.params?.userId;
        const data = req.body;

        try{
            const ALLOWED_UPDATES = [
                "photoURL",
                "about",
                "gender",
                "skills",
                "firstName",
                "lastName",
                "age"
            ];
            const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

            if(!isUpdateAllowed){
                throw new Error("update not allowed");
            }

            if(data?.skills.length > 10){
              throw new Error("Skills Cannot be more than 10");
          }
            const updateUser = await Test.findByIdAndUpdate({_id: userID}, data, {runValidators: true});
            
            // if (!updateUser) {
            //     return res.status(404).send("User not found!");
            //   }
    
            res.send("user Updated Successfully!")
        }catch(err){
            res.status(400).send("Something went wrong!!")
        }

    })

connectDB()
    .then(() => {
        console.log("Database Connection Established!!")
        app.listen(5555, () => {
            console.log("Server is running on port 5555")
        })
    })
    .catch((err) => 
        {
            console.error("DataBase Connection Failed!" + err.message)
        }
    )