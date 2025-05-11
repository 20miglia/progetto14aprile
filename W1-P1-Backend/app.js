import express from "express";  //Importo Express
const app = express();           //Creo un'applicazione Express
import "dotenv/config";
import cors from "cors"
import start from "./db.js";
import authorsRouter from './Routers/authors.route.js'
import postsRouter from './Routers/posts.route.js'
import authRouter from './Routers/auth.route.js'
import usersRouter from './Routers/users.route.js'
import passport from "passport";
import googleStrategy from './middlewares/oauthmiddleware.js'




// Middleware
app.use(express.json())
app.use(cors())
app.use('/authors', authorsRouter)
app.use('/blogPosts', postsRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
passport.use('google', googleStrategy)

// Connessione al DB
start();
  
                                                    
app.get("/", (req, res) =>{                                                                      
    res.send("App Connessa: Benvenuto!");
})




//Per startare il server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)})