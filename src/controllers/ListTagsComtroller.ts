import { Request, Response } from "express";
import { ListTagService } from "../services/ListTagService";

class ListTagsComtroller {
    
    async handle(request: Request, response: Response){
        const { user_id } = request;

        const listTagService = new ListTagService();

        const tags = await listTagService.execute();
        
        return response.json(tags)

    }
}

export { ListTagsComtroller }