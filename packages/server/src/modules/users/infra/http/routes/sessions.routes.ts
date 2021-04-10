import { Router } from 'express';

import { SessionsController } from '@modules/users/infra/http/controllers';

const passwordsRouter = Router();
const passwordsController = new SessionsController();

passwordsRouter.post('/', passwordsController.create);

export default passwordsRouter;
