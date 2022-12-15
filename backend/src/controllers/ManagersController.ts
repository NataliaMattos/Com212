import AWS from "aws-sdk";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { connect } from "../database/index";
import { v4 as uuid } from 'uuid';
require("dotenv").config();

connect();
const manager = getManager();

export class ManagerController {
  async createManager(request: Request, response: Response) {
    try {
      const id = uuid();
      const body = request.body;
      await manager
        .createQueryBuilder()
        .insert()
        .into("public.managers")
        .values({
          id: id,
          name: body.name,
          lastname: body.lastname,
          email: body.email,
          password: body.password,
          branch: body.branch
        })
        .execute();

        response.status(200).send({
            message: 'Gerente cadastrado com sucesso!'
        })
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }

  async editManager(request: Request, response: Response){
    try {
        const body = request.body;
        const { id } = request.params;
        await manager
          .createQueryBuilder()
          .update('public.managers')
          .set({
            ...body,
          })
          .where('id = :id', { id })
          .execute();
  
          response.status(200).send({
              message: 'Gerente editado com sucesso!'
          })
      } catch (error) {
        return response.status(400).send({
          error: "Houve um erro na aplicação",
          message: error,
        });
      }
  }

  async deleteManager(request: Request, response: Response){
    try {
        const id = request.params.id;
        await manager
          .createQueryBuilder()
          .delete()
          .from('public.managers')
          .where(`id = :id`, { id })
          .execute();
  
          response.status(200).send({
              message: 'Gerente removido com sucesso!'
          })
      } catch (error) {
        return response.status(400).send({
          error: "Houve um erro na aplicação",
          message: error,
        });
      }
  }

  async getManagers(_:Request, response: Response){
    try {
        const managers = await manager
          .createQueryBuilder()
          .select('*')
          .from('public.managers','managers')
          .getRawMany();
  
          response.status(200).send(managers);
      } catch (error) {
        return response.status(400).send({
          error: "Houve um erro na aplicação",
          message: error,
        });
      }
  }

}
