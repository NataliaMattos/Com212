import { connect } from "../database/index";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import AWS from "aws-sdk";
const s3 = new AWS.S3({ signatureVersion: "v4" });
import { getConnectionManager, getManager, getConnection } from "typeorm";
import axios from "axios";
require("dotenv").config();
import moment from "moment-timezone";

connect();
const manager = getManager();

export class UserController {
  async createUser(request: Request, response: Response) {
    try {
      const body = request.body;
      await manager
        .createQueryBuilder()
        .insert()
        .into("public.users")
        .values({
          body,
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
        const id = request.params.id;
        await manager
          .createQueryBuilder()
          .update('public.users')
          .set({
            body,
          })
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
          .where(`id = ${id}`)
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

  async getUsers(response: Response){
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
