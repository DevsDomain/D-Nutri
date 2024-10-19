import { Router } from "express";
import editProfileController from "../controllers/editProfileController";

const EditProfileRouter = Router();

EditProfileRouter.put("/edit-profile/:id", editProfileController.updateUser);
EditProfileRouter.put(
  "/edit-profile-password/:id",
  editProfileController.updateUserPassword
);

export default EditProfileRouter;
