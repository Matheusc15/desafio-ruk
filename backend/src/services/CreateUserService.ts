import prismaClient from "../prisma";

interface Telephone {
    number: number;
    area_code: number;
  }

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
    telephones: Telephone[];
  }
class CreateUserService{
    async execute({ name, email, password, telephones} : CreateUserProps){
        
        const existingUser = await prismaClient.user.findUnique({
          where: { email },
        });
    
        if (existingUser) {
          throw new Error("Este e-mail já está em uso");
        }
  
        if(!name || !email || !password || !telephones){
            throw new Error("Preencha os campos corretamente")    
        }

        const user = await prismaClient.user.create({
            data:{
                name,
                email,
                password,
                telephones: {
                    create: telephones,
                  }
            }
        })

        return {
            id: user.id,
            created_at: user.created_at,
            modified_at: user.modified_at,
          };
    }
}

export { CreateUserService }