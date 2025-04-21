import express from "express";
import postModel from "../Models/blogpostschema.js"


const router = express.Router()


router.get("/", async (req, res) =>{
    const blogPosts = await postModel.find()
    res.json(blogPosts)
 })
 
 
 router.get("/:id", async (req, res) =>{
     const identificativo = req.params.id; //dove id in azzurro deve essere uguale a id in arancione alla riga di sopra
     try {
     const blogPost = await postModel.findById(identificativo)
     res.json(blogPost)
      } 
      catch (err) {
         res.status(500).json({error: err.message})
      }
  })


  router.post("/", async (req, res) =>{
    const elementoInviatoClient = req.body;
    const nuovoElementoInviato = new postModel(elementoInviatoClient)
    const salvoElementoInDb = nuovoElementoInviato.save()
    res.status(201).json(salvoElementoInDb)
 })


router.put("/:id", async (req, res) =>{
    const identificativo = req.params.id;
    const elementoInviatoClient = req.body;
    try {
        const putPost = await postModel.findByIdAndUpdate(identificativo, elementoInviatoClient)
        res.status(200).json(putPost)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
})


router.delete("/:id", async (req, res) =>{
    const identificativo = req.params.id;
    try{
        await postModel.findByIdAndDelete(identificativo)
        res.status(200).json({message: "User deleted!"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
})


export default router