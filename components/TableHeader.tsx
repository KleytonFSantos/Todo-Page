import React from 'react'

function TableHeader() {
  return (
    <thead>
        <tr>
            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold">
                Responsável
            </th>
            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Descrição
            </th>
            <th scope="col" className="flex gap-4 items-center px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold">
                Issue
            </th>
            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold">
                status
            </th>
        </tr>
    </thead>
  )
}

export default TableHeader