import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAutheticateRequest {
    email:string;
    password:string;
}

class AuthenticateUserService {

    async execute({email, password} : IAutheticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);


        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email ou Senha Incorreto");            
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email ou Senha Incorreto");
        }

        const token = sign({
            email: user.password
        },
        "75b0b12872327f8b2bc43348c4d77237",
        {
            subject:user.id,
            expiresIn:"1d"
        });

        return token;

    }
    
}


export { AuthenticateUserService }