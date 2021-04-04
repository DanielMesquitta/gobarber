import { container } from 'tsyringe';

import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations';
import { IHashProvider } from '@modules/users/providers/HashProvider/models';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
