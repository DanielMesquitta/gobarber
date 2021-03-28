import 'reflect-metadata';

import cors from 'cors';
import express from 'express';

import './database';

import { uploadConfig } from './configs';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.dest));
app.use(routes);

app.listen(process.env.PORT || 3333);
