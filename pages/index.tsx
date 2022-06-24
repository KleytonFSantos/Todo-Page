import { GetServerSideProps } from "next";
import { getAllTodos, Todo } from "../lib/db";
import Header from '../components/Header';
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async () => 
{
  const todos = await getAllTodos();
  return {
    props: {
      todos,
    },  
  };
};

interface PostProps {
  todos: Todo[];
}

//delete todos 
export const deleteTodo = async (id: number) => {
   console.log("delete todos", id);
    await fetch(`/api/deleteTodos/${id}`, {
        method: "DELETE",
    })
}



  const Home = ({ todos }: PostProps) => {
    const [issues, setIssues] = useState<any[]>([]);

    useEffect(() => {
        fetch(`https://api.github.com/repos/KleytonFSantos/Todo-Page/issues`)
        .then((response) => response.json())
        .then((data) => {
            setIssues(data)
    })}, []);

    
  return (
    <>
    <Header />  

    <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
        <div className="py-8">
            <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                <h2 className="text-2xl leading-tight text-zinc-100">
                    Task List
                </h2>
                <div className="text-end">
                    <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                        <div className=" relative ">
                            <input type="text" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Nome"/>
                            </div>
                            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                                Filtrar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold">
                                        Responsável
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                                        Descrição
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold">
                                        Título/Issue
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold">
                                        status
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map((issue) => (
                                    
                                <tr key={issue.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="flex gap-2 items-center">
                                                <Image alt="avatar_image" className=" rounded-full"  src={issue.user.avatar_url} width="80px" height="80px"/>
                                                <p className="text-gray-900 text-base whitespace-no-wrap">
                                                    <span className="text-gray-900">{issue.assignees[0].login}</span>
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 text-base whitespace-no-wrap">
                                        <span className="text-gray-900">{issue.body}</span>
                                        
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 text-base whitespace-no-wrap">
                                       <span className="text-gray-900">Issue: {issue.number} - {issue.title} </span>
                                        
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                            </span>
                                            <span className="relative text-base">
                                                {issue.state.toUpperCase()}
                                            </span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button 
                                        type="button" 
                                        className="text-indigo-600 hover:text-indigo-900 text-base"
                                        onClick={()=> deleteTodo(issue.id)}
                                        >
                                            Apagar
                                        </button>
                                    </td>
                                </tr>
                                ))}  
                            </tbody>
                        </table>
                        <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="flex items-center">
                                <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                        </path>
                                    </svg>
                                </button>
                                <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                                    1
                                </button>
                                <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                    2
                                </button>
                                <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                                    3
                                </button>
                                <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                    4
                                </button>
                                <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                        </path>
                                    </svg>
                                </button>
                                
                            </div>
                            <Modal />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home
