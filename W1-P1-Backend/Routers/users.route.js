import express from 'express'
import "dotenv/config"
import { authMiddleware } from '../middlewares/auth.js'


const router = express.Router()

router.get('/me', authMiddleware, async (req, res) => {

    try {
        // Controlla se l'utente è autenticato
        const {_id, name, lastname, email, birthdate, avatar} = req.user
        res.status(200).json({_id, name, lastname, email, birthdate, avatar})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }

})






export default router