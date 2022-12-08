import { Router } from "express";
import { connect } from "../database/index";
import { getConnectionManager, getManager, getConnection } from "typeorm";
import { OrderController } from "../controllers/OrderController";
import { UserController } from "../controllers/UsersController";
import { AuthController } from "../controllers/AuthController";


connect();
const manager = getManager();

const routes = Router();

/////////////// AUTENTICAÇÃO
routes.route("/login").post(new AuthController().login);
///////////////////////////////////////////////////////////////////////

/////////////// CRUD DE DEMANDAS
routes.route("/orders").get(new OrderController().getFilesAvailable);
routes.route("/order").post(new OrderController().createOrder);
routes.route('/order').delete(new OrderController().deleteFiles);
routes.route('/order').patch(new OrderController().editFiles);
///////////////////////////////////////////////////////////////////////

/////////////// CRUD DE USUÁRIOS
routes.route("/users").get(new UserController().getUsers);
routes.route("/user").post(new UserController().createUser);
routes.route('/user').delete(new UserController().deleteUser);
routes.route('/user').patch(new UserController().editUser);
///////////////////////////////////////////////////////////////////////

export { routes };
