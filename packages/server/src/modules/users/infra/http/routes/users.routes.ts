import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import { uploadConfig } from '@configs';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import {
  CreateUserService,
  UpdateUserAvatarService,
} from '@modules/users/services';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const createUserService = container.resolve(CreateUserService);
  const user = await createUserService.execute({ name, email, password });
  return res.json(user);
});

usersRouter.use(ensureAuthenticated);

usersRouter.patch('/avatar', upload.single('avatar'), async (req, res) => {
  const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
  const user = await updateUserAvatarService.execute({
    user_id: req.user.id,
    filename: req.file.filename,
  });
  return res.json(user);
});

export default usersRouter;
