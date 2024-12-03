import { FastifyRequest, FastifyReply } from 'fastify';
import prismaClient from "../prisma";

class LoginController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as { email: string; password: string };

    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return reply.status(401).send({ error: "Email ou senha incorretos. Tente novamente." });
    }

    const token = await reply.jwtSign({
      id: user.id,
      email: user.email,
    });

    return reply.send({ token });
  }
}

export { LoginController };
