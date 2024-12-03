import { FastifyRequest, FastifyReply } from 'fastify';
import prismaClient from '../prisma';

interface JwtPayload {
    id: string;
    email: string;
}

class GetUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {

            const user = await request.jwtVerify<JwtPayload>();

            const foundUser = await prismaClient.user.findUnique({
                where: { id: user.id },
                include: { telephones: true }, 
            });

            if (!foundUser) {
                return reply.status(404).send({ error: "Usuário não encontrado." });
            }


            return reply.send({
                id: foundUser.id,
                email: foundUser.email,
                telephones: foundUser.telephones,
                created_at: foundUser.created_at,
                modified_at: foundUser.modified_at,
            });

        } catch (error) {
            return reply.status(401).send({ error: "Token inválido ou expirado." });
        }
    }
}

export { GetUserController };
