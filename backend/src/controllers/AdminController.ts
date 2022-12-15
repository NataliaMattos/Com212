import AWS from "aws-sdk";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { connect } from "../database/index";
import { v4 as uuid } from 'uuid';
require("dotenv").config();

connect();
const manager = getManager();

export class AdminController {
  async createAdmin(request: Request, response: Response) {
    try {
      const id = uuid();
      const body = request.body;
      await manager
        .createQueryBuilder()
        .insert()
        .into("public.admins")
        .values({
          id: id,
          name: body.name,
          lastname: body.lastname,
          email: body.email,
          password: body.password,
          branch: body.branch,
          department: body.department
        })
        .execute();

        response.status(200).send({
            message: 'Administrador cadastrado com sucesso!'
        })
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }

  async editAdmin(request: Request, response: Response){
    try {
        const body = request.body;
        const { id } = request.params;
        await manager
          .createQueryBuilder()
          .update('public.admins')
          .set({
            ...body,
          })
          .where('id = :id', { id })
          .execute();
  
          response.status(200).send({
              message: 'Administrador editado com sucesso!'
          })
      } catch (error) {
        return response.status(400).send({
          error: "Houve um erro na aplicação",
          message: error,
        });
      }
  }

  async deleteAdmin(request: Request, response: Response){
    try {
        const id = request.params.id;
        await manager
          .createQueryBuilder()
          .delete()
          .from('public.admins')
          .where(`id = :id`, { id })
          .execute();
  
          response.status(200).send({
              message: 'Administrador excluído com sucesso!'
          })
      } catch (error) {
        return response.status(400).send({
          error: "Houve um erro na aplicação",
          message: error,
        });
      }
  }

  async getAdmins(_:Request, response: Response){
    try {
        const admins = await manager
          .createQueryBuilder()
          .select('*')
          .from('public.admins','admins')
          .getRawMany();
  
          response.status(200).send(admins);
      } catch (error) {
        return response.status(400).send({
          error: "Houve um erro na aplicação",
          message: error,
        });
      }
  }

}
