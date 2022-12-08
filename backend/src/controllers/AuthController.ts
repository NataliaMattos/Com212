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

export class AuthController {
  async login(request: Request, response: Response) {
    try {
      const body = request.body;

      const user = await manager.createQueryBuilder().select('password').from('public.users','users').where(`email = ${body.email}`).getRawOne();

      if(!user){
        response.status(400).send({
            code: 400,
            message: 'Email e/ou senha incorretos'
        });
      }

      if(body.password !== user.password){
        response.status(400).send({
            code: 400,
            message: 'Email e/ou senha incorretos'
        })
      }

      response.status(200).send({
        message: 'OK'
      });
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }
}
