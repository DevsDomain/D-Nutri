import { Router } from "express";
import profileController from "../controllers/profileController";


const ProfileRouter = Router();

ProfileRouter.put("/profile/:id", profileController.updateUserPassword);

export default ProfileRouter;
