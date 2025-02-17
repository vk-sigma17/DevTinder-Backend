const adminAuth = (req, res, next) => {
    console.log("Admin Auth is Getting Checked!!");
    const token ='xyz';
    const isAdminAuthorized = token === 'xyz';
    if(!isAdminAuthorized){
        res.status(401).send("UnAuthorized Request!!")
    }else{

        next()
    }
}

const userAuth = (req, res, next) => {
    console.log("User Auth is Getting Checked!!");
    const token = "abc";
    const isAdminAuthorized = token === 'abc';
    if(!isAdminAuthorized){
        res.status(401).send("UnAuthorized Request!!")
    }else{

        next()
    }
}

module.exports = { adminAuth, userAuth }