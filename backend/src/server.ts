import fastify from "fastify";
import { routes } from "./routes";
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt';

const app = fastify({logger: true})

const start = async () => {

    await app.register(cors);
    
    await app.register(routes);

    await app.register(fastifyJwt, {
      secret: process.env.JWT_SECRET || 'chavesecretajwt',
    });
      

    try{
        await app.listen({port:3333})
    }catch(err){
        process.exit(1)
    }
} 

start();
