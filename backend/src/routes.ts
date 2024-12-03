import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from './controllers/CreateUserController'
import { LoginController } from './controllers/LoginController';
import { GetUserController } from './controllers/GetUserController';


export async function routes (fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/teste", async (request : FastifyRequest, reply: FastifyReply) => {
        return { ok: true}
    })

    fastify.post("/register", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply)
    } )

    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return new LoginController().handle(request, reply);
      });

    fastify.get("/search", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUserController().handle(request, reply);
    });

    }
