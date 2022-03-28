import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from '../config/express';
import { Database } from '../config/database';
import dotenv from "dotenv";
import { Response } from 'express';
dotenv.config();

chai.use(chaiHttp);
chai.should();

var app: any;

before(async () => {
    // process.env.NODE_ENV = 'test';
    const database = Database.instance;
    const s = Server.instance;
    await database.connect()
    await s.start();
    app = s.app;

});

describe("Index Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });
});

describe("Prueba", () => {

    const nombre = 'Andres';

    it('Parametro nombre OK', function (done) {
        chai.request(app)
            .post('/prueba')
            .send({
                nombre
            })
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.nombre).to.be.an('string');
                expect(res.body.nombre).to.be.eq(nombre);
                done();
            })

    });

    it('Parametro nombre not found', function (done) {
        chai.request(app)
            .post('/prueba')
            .send({
                nombr: 'Andres'
            })
            .end((err, res: Response) => {
                if (err) done(err);
                expect(res.status).to.be.eq(500);
                done();
            })

    });
})