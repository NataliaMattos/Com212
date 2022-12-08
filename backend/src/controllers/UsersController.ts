import AWS from "aws-sdk";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { connect } from "../database/index";
import { uuid } from 'uuidv4';
require("dotenv").config();

connect();
const manager = getManager();

export class UserController {
  async createUser(request: Request, response: Response) {
    try {
      const id = uuid();
      const body = request.body;
      await manager
        .createQueryBuilder()
        .insert()
        .into("public.users")
        .values({
          id: id,
          name: body.name,
          lastname: body.lastname,
          email: body.email,
          password: body.password
        })
        .execute();

        response.status(200).send({
            message: 'Usuário cadastrado com sucesso!'
        })
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }

  async editUser(request: Request, response: Response){
    try {
        const body = request.body;
        const { id } = request.params;
        await manager
          .createQueryBuilder()
          .update('public.users')
          .set({
            ...body,
          })
          .where('id = :id', { id })
          .execute();
  
          response.status(200).send({
              message: 'Usuário editado com sucesso!'
          })
      } catch (error) {
        return response.status(400).send({
          error: "Houve um erro na aplicação",
          message: error,
        });
      }
  }

  async deleteUser(request: Request, response: Response){
    try {
        const id = request.params.id;
        await manager
          .createQueryBuilder()
          .delete()
          .from('public.users')
          .where(`id = :id`, { id })
          .execute();
  
          response.status(200).send({
              message: 'Usuário excluído com sucesso!'
          })
      } catch (error) {
        return response.status(400).send({
          error: "Houve um erro na aplicação",
          message: error,
        });
      }
  }

  async getUsers(_:Request, response: Response){
    try {
        const users = await manager
          .createQueryBuilder()
          .select('*')
          .from('public.users','users')
          .getRawMany();
  
          response.status(200).send(users);
      } catch (error) {
        return response.status(400).send({
          error: "Houve um erro na aplicação",
          message: error,
        });
      }
  }

}
