import { Router } from 'express';

import { ensureAuthenticated } from '~/middlewares';
import { CreateUserService } from '~/services';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.use(ensureAuthenticated);

export default usersRouter;
