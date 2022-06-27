import { GetServerSideProps } from "next";
import { getAllTodos, Todo } from "../lib/db";
import { ReactEventHandler, useEffect, useState } from "react";
import Header from '../components/Header';
import Modal from "../components/Modal";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import ReactPaginate from "react-paginate";

export const getServerSideProps: GetServerSideProps = async () => 
{
  const todos = await getAllTodos();
  return {
    props: {
      todos,
    },  
  };
};
interface IssueProps {
  todos: Todo[];
}

const Home = ({ todos }: IssueProps) => {   
const itemsPerPage = 4;
const [issues, setIssues] = useState<any[]>([]);
const [issueName, setIssueName] = useState('');
const [currentItems, setCurrentItems] = useState<any[]>([]);
const [pageCount, setPageCount] = useState(0);

const [itemOffset, setItemOffset] = useState(0);

const url = "https://api.github.com/repos/KleytonFSantos/Todo-Page/issues";

useEffect(() => {
    axios(url)
    .then((response: AxiosResponse) => setIssues(response.data))        
}, []);

const lowerFilteredIssues = issueName.toLocaleLowerCase()

const filteredIssues = currentItems.filter(issue => issue.title.toLowerCase().includes(lowerFilteredIssues));

useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(issues.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(issues.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, issues]);


const handlePageClick = (e: any) => {
    const newOffset = (e.selected * itemsPerPage) % issues.length;
    setItemOffset(newOffset);
};


  
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
                            <input 
                            type="text" 
                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                            placeholder="Digite o título da issue aqui..."
                            value={issueName}
                            onChange={e => setIssueName(e.currentTarget.value)}
                            />
                            </div>                                            
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
                                </tr>
                            </thead>
                            <tbody>
                            
                            {filteredIssues.map((issue) => (                                    
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
                                    
                                </tr>
                                ))}  
                            </tbody>
                        </table>
                        <div className="px-5 bg-white py-5 flex flex-col text- xs:flex-row items-center xs:justify-between">                            
                             <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="<"
                                renderOnZeroPageCount={null as any}
                                containerClassName="flex items-center"
                                pageLinkClassName="w-full px-4 py-2 border text-sm text-gray-600 bg-white hover:bg-gray-100"
                                previousLinkClassName="w-full px-4 py-2 border-t border-b text-sm text-gray-600 bg-white hover:bg-gray-100 rounded-l-xl"
                                nextLinkClassName="w-full px-4 py-2 border-t border-b text-sm text-gray-600 bg-white hover:bg-gray-100 rounded-r-xl"
                                activeLinkClassName="w-full px-4 py-2 border-t border-b text-sm text-purple-600 bg-gray-50 hover:bg-gray-100 "                             
                             />
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
