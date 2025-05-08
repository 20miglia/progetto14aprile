import express from 'express'
import userModel from "../Models/authorschema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import "dotenv/config"


const saltRounds = +process.env.SALT_ROUNDS // numero di cicli per la generazione dell'hash della password
const jwtsecretkey = process.env.JWT_SECRET_KEY // chiave segreta per la generazione del token JWT

const router = express.Router()


//POST registra un nuovo utente
router.post('/register', async (req, res) => {
    const password = req.body.password

    const user = new userModel({
        ...req.body,
        password: await bcrypt.hash(password, saltRounds) //salvo l'hash della password
    })
    const userSave = await user.save() //salvo l'utente nel db
    if (!userSave) {
        return res.status(400).json({ message: 'User not created' })
    }
    res.status(201).json(userSave) //restituisco l'utente appena creato
})


//POST login di un utente
router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {    
        const user = await userModel.findOne({email: email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ 
            id: user._id,
            name: user.name, 
            lastname: user.lastname,
            email: user.email
        }, jwtsecretkey, { expiresIn: '1y'})

        res.status(200).json(token)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    } 
})



export default router