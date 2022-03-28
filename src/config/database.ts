import { DataSource } from 'typeorm';
import path from "path";

const entityPath = path.resolve(__dirname, "../entity/**/*{.js,.ts}");
const migrationPath = path.resolve(__dirname, "../migration/**/*{.js,.ts}");

export class Database {
    private static _instance: Database;

    public dataSource: DataSource;

    constructor() {

        this.dataSource = new DataSource(
            {
                type: "mariadb",
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB,
                logging: false,
                synchronize: true,
                entities: [
                    entityPath
                ],
                migrations: [
                    migrationPath
                ],
                subscribers: [
                    "src/subscriber/**/*.ts"
                ]
            })
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public async connect() {
        await this.dataSource.initialize();
    }


}