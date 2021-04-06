import { Router } from 'express';

import { SessionsController } from '../controllers';

const passwordsRouter = Router();
const passwordsController = new SessionsController();

passwordsRouter.post('/', passwordsController.create);

export default passwordsRouter;
