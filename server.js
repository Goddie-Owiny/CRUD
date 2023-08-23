const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const bodyParser = require("body-parser")
const expressSession = require("express-session")
const app = express()


require("dotenv").config()

//express session
app.use(expressSession({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));


//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())



app.set('views', './views')
app.set('view engine', 'ejs')


app.get("/", (req,res) =>{
res.render("home.ejs")
})


// importing all user Routes
const registerRoute = require("../CRUD/routes/registerRoute"); 
app.use('/register', registerRoute)

const loginRoute = require("../CRUD/routes/loginRoute"); 
app.use('/login', loginRoute);


app.get("/login", (req, res) =>{
    res.render("login.ejs")
})

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})


app.get("/register", (req, res) =>{
    res.render("register.ejs")
})


const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 8585

//mongoose connection to DB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Successfully connected to MongoDB"))
.catch((error) => console.log("MongoDB connection failed: ", error.message))


app.listen(port, (req, res) =>{
    console.log(`Running on port: ${port}`)
})
