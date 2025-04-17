import express from "express";  //Importo Express
const app = express();           //Creo un'applicazione Express
import "dotenv/config";
import mongoose from "mongoose"; //Importo Mongoose

// Middleware

app.use(express.json())


const userSet = new mongoose.Schema({
    name: {type: "string", required: true},
    lastname: {type: "string", required: true},
    email: {type: "string", required: true},
    birthdate: {type: "string", required: true},
    avatar: {type: "string", required: true},
})


const userModel = mongoose.model("Authors", userSet)  //abbiamo creato l'oggetto in grado di interagire con il DataBase
                                                    //che nello specifico è il "model" in giallino
app.get("/", (req, res) =>{                  //Nelle parentesi gli dico che avremo una "collection" di nome "Users" all'interno di MongoDB con forma "userSet"                                                    
    res.send("App Connessa: Benvenuto!");
})



app.get("/authors", async (req, res) =>{
   const authors = await userModel.find()
   res.json(authors)
})


app.get("/authors/:id", async (req, res) =>{
    const identificativo = req.params.id; //dove id in azzurro deve essere uguale a id in arancione alla riga di sopra
    try {
    const author = await userModel.findById(identificativo)
    res.json(author)
     } 
     catch (err) {
        res.status(500).json(err.message)
     }
 })


 app.post("/authors", async (req, res) =>{
    const elementoInviatoClient = req.body;
    const nuovoElementoInviato = new userModel(elementoInviatoClient)
    const salvoElementoInDb = nuovoElementoInviato.save()
    res.status(201).json(salvoElementoInDb)
 })

























async function start() {
    try{
        await mongoose.connect(process.env.MONGO_URI)  //.connect permette la connessiona al database accetta due parametri,
        //app.listen(process.env.PORT, () => { //il primo è process.env.MONGO_URI e il secondo che è un oggetto che in questo caso possiamo togliere
           // console.log(`listening on port ${process.env.PORT}`)
        //})
        console.log("mongo connesso")
    } catch(err) {
        console.error(err)
    }
}

start();

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)})