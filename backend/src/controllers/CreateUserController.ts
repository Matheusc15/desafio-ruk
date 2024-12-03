import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateUserService } from '../services/CreateUserService'

class CreateUserController{
    async handle (request: FastifyRequest, reply: FastifyReply){
        const {  name, email, password, telephones } = request.body as {
            name: string;
            email: string;
            password: string;
            telephones: Array<{
              number: number;
              area_code: number;
            }>;
        }

        const userService = new CreateUserService()

        const user = await userService.execute({name, email, password, telephones});

        reply.send(user)
    }
}

export { CreateUserController }