const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")


function initialize(passport, getUserBystudentCode){
    //function to authenticate users
    const authenticateUsers = async (studentCode, password, done) => {
        // Get users by codes
        const user = getUserBystudentCode(studentCode)
        if(user == null){
            return done(null, false, {message: "No user found By this code"})
        }
        try{
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done (null, false, {message: "Password incorrect"})
            }
        }catch (e) {
            console.log(e);
           return done(e) 
        }
    }

    passport.use(new LocalStrategy({usernameField: 'studentCode'}, authenticateUsers))
    passport.serializeUser((user, done) =>done(null, user.id))
    passport.deserializeUser((id, done) =>{
        return done(null, getUserById(id))
    })
}
   


   