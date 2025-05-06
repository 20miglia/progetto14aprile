import express from "express";  //Importo Express
const app = express();           //Creo un'applicazione Express
import "dotenv/config";
import cors from "cors"
import start from "./db.js";
import authorsRouter from './Routers/authors.route.js'
import postsRouter from './Routers/posts.route.js'



// Middleware
app.use(express.json())
app.use(cors())
app.use('/authors', authorsRouter)
app.use('/blogPosts', postsRouter)


start();
  
                                                    
app.get("/", (req, res) =>{                                                                      
    res.send("App Connessa: Benvenuto!");
})





app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)})