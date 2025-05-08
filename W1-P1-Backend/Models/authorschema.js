import mongoose from "mongoose";


const userSet = new mongoose.Schema({
    name: {type: "string", required: true},
    lastname: {type: "string", required: true},
    email: {type: "string", required: true},
    birthdate: {type: "string", required: true},
    avatar: {type: "string", required: true},
    password: { type: "string", required: true },
    verified: { type: "string", required: true, default: false }
})

const userModel = mongoose.model("Authors", userSet)  //abbiamo creato l'oggetto in grado di interagire con il DataBase che nello specifico è il "model" in giallino Nelle parentesi gli dico che avremo una "collection" di nome "Users" all'interno di MongoDB con forma "userSet"

export default userModel