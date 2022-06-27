import { useEffect, useState } from "react";
import Header from '../components/Header';
import Modal from "../components/Modal";
import axios, { AxiosResponse } from "axios";
import ReactPaginate from "react-paginate";
import TableContent from "../components/TableContent";
import TableHeader from "../components/TableHeader";
import InputSearch from "../components/InputSearch";
import Head from "next/head";

const Home = () => {   
    const itemsPerPage = 4;
    const [issues, setIssues] = useState<any[]>([]);
    const [issueNameFiltered, setIssueNameFiltered] = useState('');
    const [currentItems, setCurrentItems] = useState<any[]>([]);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);

    const url = "https://api.github.com/repos/KleytonFSantos/Todo-Page/issues";

    useEffect(() => {
        axios(url, {
        headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_GITHUB_TOKEN,
        "scope":"repo,gist",
        "token_type":"bearer"
        }
        })
        .then((response: AxiosResponse) => setIssues(response.data))        
    }, []);

    const lowerFilteredIssues = issueNameFiltered.toLocaleLowerCase()

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
        <Head>
            <title>Todo-Page</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />  
        <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                <h2 className="text-2xl leading-tight text-zinc-100">
                    Task List
                </h2>
                <InputSearch 
                onChange={e => setIssueNameFiltered(e.currentTarget.value)}
                value={issueNameFiltered}
                />                    
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                         <table className="min-w-full leading-normal">
                            <TableHeader />          
                            {filteredIssues?.map((issue) => (   
                                <TableContent
                                key={issue.id} 
                                avatar={issue.user.avatar_url}
                                name={issue.assignees[0].login}
                                description={issue.body}
                                issueNumber={issue.number}
                                issueTitle={issue.title}
                                issueStatus={issue.state.toUpperCase()}                                
                                />                                 
                            ))}                              
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
                                pageLinkClassName="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                                previousLinkClassName="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100 rounded-l-xl"
                                nextLinkClassName="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100 rounded-r-xl"
                                activeLinkClassName="w-full px-4 py-2 border-t border-b text-base text-purple-600 bg-gray-50 hover:bg-gray-100 "                            
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
