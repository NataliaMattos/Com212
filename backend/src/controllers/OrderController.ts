import axios from "axios";
import { Request, Response } from "express";
import fs from "fs";
import { getManager } from "typeorm";
import { connect } from "../database/index";
require("dotenv").config();

connect();
const manager = getManager();

export class OrderController {
  async createOrder(request: Request, response: Response) {
    try {
      console.log("entrou insertFiles");
      const body = request.body;
      console.log(body);
      const extension = body.file.split(";")[0].split("/")[1];

      await manager
        .createQueryBuilder()
        .insert()
        .into("public.demandas")
        .values({
          id: `${body.fileId}`,
          filename: body.fileName,
          category: body.category,
          extension: extension,
          path: body.file,
          user_id: body.user_id,
        })
        .execute();

      const demandas = await manager.createQueryBuilder().select('*').from('public.demandas', 'demandas').getRawMany();

      // fs.writeFile(
      //   `D:\\com242\\media\\${body.fileId}.${extension}`,
      //   base64Data,
      //   "base64",
      //   function (err) {
      //     console.log(err);
      //   }
      // );

      response.status(200).send(demandas);
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }
  async deleteFiles(request: Request, response: Response) {
    try {
      console.log("entrou deleteFiles");
      const id = request.params.id;
      console.log(id);

      await manager
        .createQueryBuilder()
        .delete()
        .from("public.demandas")
        .where(`id = '${id}'`)
        .execute();

      response.status(200).send({
        message: 'Demanda excluída com sucesso!'
      });
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }

  async editFiles(request: Request, response: Response) {
    try {
      console.log("entrou deleteFiles");
      const id = request.params.id;
      const body = request.body;
      console.log(id);

      const extension = body.file.split(";")[0].split("/")[1];
      const base64Data = body.file.split(`base64,`)[1];



      await manager
        .createQueryBuilder()
        .update()
        .set({
          ...body,
          path: base64Data,
          extension
        })
        .where(`id = '${id}'`)
        .execute();

      response.status(200).send({
        message: 'Demanda editada com sucesso!'
      });
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }



  async getFilesAvailable(request: Request, response: Response) {
    try {
      const files = await manager
        .createQueryBuilder()
        .select()
        .from("demandas", "demandas")
        .where('user_id = :userId',{userId: request.query.userId})
        .getRawMany();

      response.status(200).send(files);
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }

  async notifyRequest(request: Request, response: Response) {
    try {
      console.log("entrou notifyRequest");
      const body = request.body;

      await axios({
        method: "post",
        url: "http://127.0.0.1:5000/requestFile",
        data: {
          fileId: body.fileId,
          ip: process.env.PUBLIC_IP,
          port: process.env.PUBLIC_PORT,
        },
      })
        .then(() => {
          response.status(200).send({
            message: "OK",
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: error,
          });
        });
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }

  async downloadFile(request: Request, response: Response) {
    try {
      console.log("entrou downloadFile");
      const body = request.body;

      console.log(body);

      fs.writeFile(
        `D:\\com242\\media\\${body.fileId}.${body.extension}`,
        body.path,
        "base64",
        async function (err) {
          if (err) {
            response.status(400).send(err);
          } else {
            await manager
              .createQueryBuilder()
              .update("demandas")
              .set({
                path: body.path,
              })
              .where(`id = '${body.fileId}'`)
              .execute();
            // chama o broker: subscriptiion na fila (id do arquivo) e publish no tópico (categoria)
            await axios({
              method: "post",
              url: "http://127.0.0.1:5000/newFile",
              data: {
                fileId: body.fileId,
                fileName: body.fileName,
                category: body.category,
                extension: body.extension,
              },
            }).catch((error) => {
              response.status(400).send({
                message: error,
              });
            });

            response.status(200).send({
              message: "ok",
            });
          }
        }
      );
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }

  async transferFile(request: Request, response: Response) {
    try {
      console.log("entrou transferFile");
      const body = request.body;

      const file = await manager
        .createQueryBuilder()
        .select("*")
        .from("demandas", "demandas")
        .where(`id = '${body.fileId}'`)
        .getRawOne();

      console.log(file);

      await axios({
        method: "post",
        url: `http://${body.ip}:${body.port}/downloadFile`,
        data: {
          fileId: body.fileId,
          path: file.path,
          category: file.category,
          fileName: file.filename,
          extension: file.extension,
        },
      }).catch((error) => {
        response.status(400).send({
          message: error,
        });
      });

      response.status(200).send({
        message: "ok",
      });
    } catch (error) {
      return response.status(400).send({
        error: "Houve um erro na aplicação",
        message: error,
      });
    }
  }
}
