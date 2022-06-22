import { prisma } from "./prisma";

export interface Todo {
    id: number;
    name: string;
    description: string;
    title: string;   
}

export async function getAllTodos(){
    const data = await prisma.todo.findMany();
    return data;
}

export async function createTodo(name:string, description: string, title:string){
    await prisma.todo.create({
        data: {
            name,
            description,
            title,
        },
    });
}

export async function getOneTodo(){
 const data = await prisma.todo.findOne();
    return data;
}
