import { container } from 'tsyringe';

import { DiskStorageProvider } from '@shared/container/providers/StorageProvider/implementations';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations';
import { IMailProvider } from '@shared/container/providers/MailProvider/models';
import { HandlebarsMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/implementations';
import { IMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/models';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
);
