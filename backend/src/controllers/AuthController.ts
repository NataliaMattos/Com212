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

      const user = await manager
        .createQueryBuilder()
        .select()
        .from("users", "users")
        .where(`email = '${body.email}'`)
        .getRawOne();
      const user_manager = await manager
        .createQueryBuilder()
        .select()
        .from("managers", "managers")
        .where(`email = '${body.email}'`)
        .getRawOne();
      const admin = await manager
        .createQueryBuilder()
        .select()
        .from("admins", "admins")
        .where(`email = '${body.email}'`)
        .getRawOne();

      if (!user && !user_manager && !admin) {
        return response.status(400).send({
          code: 400,
          message: "Email e/ou senha incorretos",
        });
      }


      if(user && (body.password === user.password)){
        return response.status(200).send({
          message: "OK",
          code: "user",
          user,
        });
      } else if(user_manager && (body.password === user_manager.password)){
        return response.status(200).send({
          message: "OK",
          code: "manager",
          user_manager,
        });
      } else if(admin && (body.password === admin.password)){
        return response.status(200).send({
          message: "OK",
          code: "admin",
          admin,
        });
      } else {
        return response.status(400).send({
          code: 400,
          message: "Email e/ou senha incorretos",
        });
      }

    } catch (error) {
      console.log(error);
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }
}
