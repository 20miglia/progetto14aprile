import mongoose from "mongoose";
import "dotenv/config";


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

export default start