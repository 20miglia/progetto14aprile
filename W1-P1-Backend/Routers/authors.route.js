import express from "express";
import userModel from "../Models/authorschema.js";
import cloudUploader from "../cloud/cloudinary.js";
import { authMiddleware } from '../middlewares/auth.js'

const router = express.Router()



router.get("/", async (req, res) =>{  
    const size = req.query.size;
    const skip = (req.query.page-1) * size; 
    const prop = req.query.prop;
        
    try{
    const filterUser = await userModel.find().limit(size).skip(skip)
    res.status(200).json(filterUser)
    }
    catch(err){
        res.status(500).json({message: "Errore nel recupero degli autori"})
    }
 })

 //.sort({[prop]:1})
 
 
 router.get("/:id", async (req, res) =>{
     const identificativo = req.params.id; //dove id in azzurro deve essere uguale a id in arancione alla riga di sopra
     try {
     const author = await userModel.findById(identificativo)
     res.json(author)
      } 
      catch (err) {
         res.status(500).json({error: err.message})
      }
  })
 
 
  router.post("/", async (req, res) =>{
     const elementoInviatoClient = req.body;
     const nuovoElementoInviato = new userModel(elementoInviatoClient)
     const salvoElementoInDb = nuovoElementoInviato.save()
     res.status(201).json(salvoElementoInDb)
  })
 
 
 router.put("/:id", async (req, res) =>{
     const identificativo = req.params.id;
     const elementoInviatoClient = req.body;
     try {
         const putAuthor = await userModel.findByIdAndUpdate(identificativo, elementoInviatoClient)
         res.status(200).json(putAuthor)
     }
     catch(err){
         res.status(500).json({error: err.message})
     }
 })
 
 
 router.delete("/:id", async (req, res) =>{
     const identificativo = req.params.id;
     try{
         await userModel.findByIdAndDelete(identificativo)
         res.status(200).json({message: "User deleted!"})
     }
     catch(err){
         res.status(500).json({error: err.message})
     }
 })

 
// PATCH: Route per il caricamento dell'immagine dell'autore

router.patch("/:authorId/avatar", cloudUploader.single("avatar"), async(req,res,next)=>{

        try{

              const authorId = req.params.authorId
              const updateAuthor = await userModel.findByIdAndUpdate(
                authorId,
                {avatar: req.file.path},
                {new: true}

             )

           

             res.status(200).json(updateAuthor)

         }

          catch(err){
             res.json({error: err.message})
         }


    }

)





export default router