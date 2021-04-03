import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@configs';
import {
  UserAvatarController,
  UsersController,
} from '@modules/users/infra/http/controllers';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.use(ensureAuthenticated);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRouter;
