import { container } from 'tsyringe';

import { DiskStorageProvider } from '@shared/container/providers/StorageProvider/implementations';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);
