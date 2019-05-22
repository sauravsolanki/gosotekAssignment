import 'dotenv/config';
import App from './app';
import MedicinesController from './medicines/medicines.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new MedicinesController(),
  ],
);

app.listen();
