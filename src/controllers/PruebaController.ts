import { Request, Response } from 'express';


export class PruebaController {

    static prueba = (req: Request, res: Response) => {

        const nombre: string = req.body.nombre;

        if (!nombre) {
            res.status(500).end("El campo nombre es obligatorio");
            return;
        }

        res.send(req.body);


    }



}