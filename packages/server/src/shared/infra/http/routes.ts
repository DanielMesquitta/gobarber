import { Router } from 'express';

import { appointmentsRouter } from '@modules/appointments/infra/http/routes';
import {
  sessionsRouter,
  usersRouter,
  passwordRouter,
  profileRouter,
} from '@modules/users/infra/http/routes';

const router = Router();

router.use('/appointments', appointmentsRouter);
router.use('/sessions', sessionsRouter);
router.use('/users', usersRouter);
router.use('/passwords', passwordRouter);
router.use('/profile', profileRouter);

export default router;
