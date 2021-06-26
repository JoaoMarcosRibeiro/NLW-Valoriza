import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";
import { ListUserSendComplimentController } from "./controllers/ListUserSendComplimentController";
import { ListUserReceiveComplimentController } from "./controllers/ListUserReceiveComplimentController";
import { ListTagsComtroller } from "./controllers/ListTagsComtroller";
import { ListUsersComtroller } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentController = new ListUserSendComplimentController();
const listUserReceiveComplimentController = new ListUserReceiveComplimentController();
const listTagsController = new ListTagsComtroller();
const listUsersController = new ListUsersComtroller();


router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticate, ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliment", ensureAuthenticate, createComplimentController.handle);

router.get("/users/compliments/send", ensureAuthenticate, listUserSendComplimentController.handle);
router.get("/users/compliments/receive", ensureAuthenticate, listUserReceiveComplimentController.handle);

router.get("/tags", ensureAuthenticate, listTagsController.handle);

router.get("/users", ensureAuthenticate, listUsersController.handle);

export { router }