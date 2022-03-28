import "reflect-metadata";

import dotenv from "dotenv";
dotenv.config();
import { Server } from './config/express';
import { Database } from './config/database';



try {

  const server = Server.instance;
  const database = Database.instance;

  database.connect().then(() => {
    server.start();
  });

} catch (error) { console.log(error) };
