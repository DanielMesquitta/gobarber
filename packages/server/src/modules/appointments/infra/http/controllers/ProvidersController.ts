import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProvidersService } from '@modules/appointments/services';

class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const loggedUserId = req.user.id;
    const listProviders = container.resolve(ListProvidersService);
    const providers = await listProviders.execute({
      not_included_user_id: loggedUserId,
    });
    return res.json(providers);
  }
}

export default ProvidersController;
