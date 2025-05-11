import "dotenv/config";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import jwt from 'jsonwebtoken'
const jwtsecretkey = process.env.JWT_SECRET_KEY
import userModel from "../Models/authorschema.js";


const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async function(accessToken, refreshToken, profile, passportNext) {
    try{
        // profile è l'oggetto che mi restituisce google con i dati dell'utente loggato
        console.log("PROFILE: ", profile)

         //destrutturo le info di google
        const {email, given_name, family_name, picture, email_verified} = profile._json

        // Cerco nel mio DB se è presente un utente registrato con la mail che mi invia google
        const user = await userModel.findOne({email})

        //se presente utitlizzo i dati per creare il token 
        if(user){
            const token = jwt.sign({ 
                id: user._id,
                name: user.name, 
                lastname: user.lastname,
                email: user.email
            }, jwtsecretkey, { expiresIn: '1y'})
            passportNext(null, {accessToken})
        }

        else{

        //se l'utente non è presente nel db lo salvo e genero il token
        const newUser = new userModel({
                    name: given_name,
                    lastname: family_name,
                    birthdate: '-',
                    avatar: picture,
                    email: email,
                    password: '-',
                    verified: email_verified
                })

        // Salvo il nuovo utente nel mio DB
        const createUser = await newUser.save();

        // Creo il token JWT 
                const token = jwt.sign({ 
                id: createUser._id,
                name: createUser.name, 
                lastname: createUser.lastname,
                email: createUser.email
            }, jwtsecretkey, { expiresIn: '1y'})
            passportNext(null, {accessToken})
        }
        
        
    } catch(error) {
        passportNext(error)
    }
}
);


export default googleStrategy