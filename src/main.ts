import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';

let app: any = null;
const server = express();

export const createServer = async () => {
  if (app) return app;

  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  nestApp.enableCors();
  await nestApp.init();
  app = nestApp;
  return app;
};

export default async (req: any, res: any) => {
  await createServer();
  server(req, res);
};
