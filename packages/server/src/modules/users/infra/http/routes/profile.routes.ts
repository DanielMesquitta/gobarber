import { Router } from 'express';

import { ProfileController } from '@modules/users/infra/http/controllers';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put('/', profileController.update);

export default profileRouter;
