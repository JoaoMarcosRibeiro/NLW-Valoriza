import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories"


class CreateTagService {
    async execute(name:string){

        const tagsRepository = getCustomRepository(TagsRepositories);
        if (!name) {
            throw new Error("Nome incorreto!");
        }

        const tagAlreadyExists = await tagsRepository.findOne({
            name
        });

        if (tagAlreadyExists) {
            throw new Error("Tag já existe");
            
        }

        const tag = tagsRepository.create({
            name
        })

        await tagsRepository.save(tag);

        return tag;

    }
}

export { CreateTagService }