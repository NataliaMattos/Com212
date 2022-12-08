import { Router } from "express";
import { getManager } from "typeorm";
import { AuthController } from "../controllers/AuthController";
import { OrderController } from "../controllers/OrderController";
import { UserController } from "../controllers/UsersController";
import { connect } from "../database/index";


connect();
const manager = getManager();

const routes = Router();

/////////////// AUTENTICAÇÃO
routes.route("/login").post(new AuthController().login);
///////////////////////////////////////////////////////////////////////

/////////////// CRUD DE DEMANDAS
routes.route("/orders").get(new OrderController().getFilesAvailable);
routes.route("/order").post(new OrderController().createOrder);
routes.route('/order/:id').delete(new OrderController().deleteFiles);
routes.route('/order/:id').patch(new OrderController().editFiles);
///////////////////////////////////////////////////////////////////////

/////////////// CRUD DE USUÁRIOS
routes.route("/users").get(new UserController().getUsers);
routes.route("/user").post(new UserController().createUser);
routes.route('/user/:id').delete(new UserController().deleteUser);
routes.route('/user/:id').patch(new UserController().editUser);
///////////////////////////////////////////////////////////////////////

export { routes };

