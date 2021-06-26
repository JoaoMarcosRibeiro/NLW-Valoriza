import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
    name:string;
    email:string;
    admin?:boolean
    password:string;
}

class CreateUserService {
    async execute({name, email, admin = false, password} : IUserRequest){

        const userRepository = getCustomRepository(UsersRepositories)

        if (!email) {
            throw new Error("Email Incorreto");
            
        }

        const passwordHash = await hash(password, 8)

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new Error("Usuário já existe");
            
        }

        const user = userRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        })

        await userRepository.save(user);

        return user;

    }
}

export { CreateUserService }