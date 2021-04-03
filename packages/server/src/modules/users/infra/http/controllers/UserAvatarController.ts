import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarService } from '@modules/users/services';

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatarService.execute({
      user_id: req.user.id,
      filename: req.file.filename,
    });
    return res.json(user);
  }
}

export default UserAvatarController;
