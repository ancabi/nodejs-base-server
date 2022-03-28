import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "../routes";

export class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public passport: any;

    constructor() {

        this.port = 2000;
        this.app = express();

    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public async start() {

        // Call midlewares
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json());

        //Set all routes from routes folder
        this.app.use("/", routes);

        this.app.listen(2000, () => {
            console.log("Server started on port 2000!");
        });
    }


}