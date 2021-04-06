import { Router } from 'express';

import {
  ForgotPasswordController,
  ResetPasswordController,
} from '../controllers';

const sessionsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

sessionsRouter.post('/forgot', forgotPasswordController.create);

sessionsRouter.post('/reset', resetPasswordController.create);

export default sessionsRouter;
