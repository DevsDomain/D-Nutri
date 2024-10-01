import { Router } from 'express';
import profileController from '../controllers/profileController';

const ProfileRouter = Router();

ProfileRouter.put('/users/:id', profileController.updateUser);

export default ProfileRouter;
