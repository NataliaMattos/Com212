import { Request, Response } from "express";
import { getManager } from "typeorm";
import { connect } from "../database/index";
import { Users } from "../database/models/Users";
require("dotenv").config();

connect();
const manager = getManager();

export class AuthController {
  async login(request: Request, response: Response) {
    try {
      const body = request.body;
      const user = await manager.createQueryBuilder().select().from("users",'users').where(`email = '${body.email}'`).getRawOne();

      if(!user){
        return response.status(400).send({
            code: 400,
            message: 'Email e/ou senha incorretos'
        });
      }

      if(body.password !== user.password){
        return response.status(400).send({
            code: 400,
            message: 'Email e/ou senha incorretos'
        })
      }

      return response.status(200).send({
        message: 'OK',
        user
      });
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }
}
