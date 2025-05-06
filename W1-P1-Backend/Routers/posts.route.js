import express from "express";
import postModel from "../Models/blogpostschema.js"
import cloudUploader from "../cloud/cloudinary.js";


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


// PATCH: Route per il caricamento dell'immagine per il post specificato dall'ID

router.patch("/:blogPostId/cover", cloudUploader.single("cover"), async(req,res,next)=>{

  try{

        const blogPostId = req.params.blogPostId
        const updateCover = await postModel.findByIdAndUpdate(
          blogPostId,
          {cover: req.file.path},
          {new: true}

       )

     

       res.status(200).json(updateCover)

   }

    catch(err){
       res.json({error: err.message})
   }


}

)





router.post("/:id", async (req, res) => {
    try {
      const post = await postModel.findById(req.params.id);
      if (!post) {
        return res.status(404).send("Post non trovato");
      }
  
      const newComment = {
        text: req.body.text,
        author: req.body.author,
        createdAt: req.body.createdAt
      };
  
      post.comments.push(newComment);
      await post.save();
  
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });










export default router