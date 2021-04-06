import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  UpdateProfileService,
  ShowProfileService,
} from '@modules/users/services';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({
      user_id,
    });
    delete user.password_hash;
    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, old_password, password } = req.body;
    const user_id = req.user.id;
    const updateProfileService = container.resolve(UpdateProfileService);
    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });
    delete user.password_hash;
    return res.json(user);
  }
}

export default ProfileController;
