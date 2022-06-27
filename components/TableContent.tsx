import React from 'react'
import Image from "next/image";

type TableContentProps = {
    avatar: string;
    name: string;
    description: string;
    issueNumber: number;
    issueTitle: string;
    issueStatus: string;
}

function TableContent({avatar, name, description, issueNumber, issueTitle, issueStatus}: TableContentProps) {
  return (
    <tbody>
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="flex gap-2 items-center">
                        <Image alt="avatar_image" className=" rounded-full"  src={avatar} width="80px" height="80px"/>
                        <p className="text-gray-900 text-base whitespace-no-wrap">
                            <span className="text-gray-900">{name}</span>
                            
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 text-base whitespace-no-wrap">
                <span className="text-gray-900">{description}</span>
                
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 text-base whitespace-no-wrap">
            <span className="text-gray-900">Issue: {issueNumber} - {issueTitle} </span>
                
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                    </span>
                    <span className="relative text-base">
                        {issueStatus}
                    </span>
                </span>
            </td>
        </tr>
    </tbody>
  )
}

export default TableContent