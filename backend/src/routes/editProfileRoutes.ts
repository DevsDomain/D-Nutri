import { Router } from "express";
import editProfileController from "../controllers/editProfileController";


const EditProfileRouter = Router();

EditProfileRouter.put("/edit-profile/:id", editProfileController.updateUser);

export default EditProfileRouter;
