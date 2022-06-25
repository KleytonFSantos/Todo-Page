import axios from "axios";
import React, { useState } from "react";
import process from "process";

export default function Modal() {

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  
  const url = "https://api.github.com/repos/KleytonFSantos/Todo-Page/issues";
    
    
   const addTask  = async () => {
    
   await axios.post(url, {
          title: title,
          body: description,
          assignees: [
            name
            ],
      }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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",
      }
    });
  window.location.reload();
  setShowModal(false);
  };



  return (
    <>
      <button
        className="flex-shrink-0 px-4 py-2 mt-8 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 ease-linear transition-all duration-300" 
        type="button"
        onClick={() => setShowModal(true)}
      >
        Nova Task
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Cadastre uma nova task:
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                 <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Responsável
                            </label>
                            <input 
                            className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            type="text" 
                            placeholder="Digite o responsável pela tarefa"
                            value={name}
                            onChange={e => setName(e.currentTarget.value)}
                            />
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Descrição
                            </label>
                            <input 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text" 
                            placeholder="Digite a descrição da tarefa" 
                            value={description}
                            onChange={e => setDescription(e.currentTarget.value)}
                            />
                        </div>
                        <div className="w-full px-3 mt-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Título/Issue
                            </label>
                            <input 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            type="text" 
                            placeholder="Digite o título da tarefa" 
                            value={title}
                            onChange={e => setTitle(e.currentTarget.value)}
                            />
                        </div>
                    </div>
                 </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => addTask()}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}