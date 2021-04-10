import { Router } from 'express';

import {
  ForgotPasswordController,
  ResetPasswordController,
} from '@modules/users/infra/http/controllers';

const sessionsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

sessionsRouter.post('/forgot', forgotPasswordController.create);

sessionsRouter.patch('/reset', resetPasswordController.create);

export default sessionsRouter;
