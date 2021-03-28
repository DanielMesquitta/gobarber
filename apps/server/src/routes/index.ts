import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/appointments', appointmentsRouter);
router.use('/sessions', sessionsRouter);
router.use('/users', usersRouter);

export default router;
