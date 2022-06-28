import React from 'react'
import Image from "next/image";

type TableContentProps = {
    avatar: string;
    description: string;
    issueNumber: number;
    issueTitle: string;
    issueStatus: string;
    issueTime: String;
}

function TableContent({avatar, description, issueNumber, issueTitle, issueStatus, issueTime}: TableContentProps) {
  return (
    <tbody>
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="flex">
                        <Image alt="avatar_image" className=" rounded-full"  src={avatar} width="65px" height="65px"/>                        
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 text-base whitespace-no-wrap">
                <span className="text-gray-900">{description}</span>
                
                </p>
            </td>
            <td className="px-5 border-b border-gray-200 bg-white text-sm">
                <div className='flex flex-col gap-2'>
                <p className="text-gray-900">
                <span className="text-gray-900 text-base whitespace-no-wrap">Issue: {issueNumber} - {issueTitle} </span>
                </p>
                <small className="text-gray-400 text-xs whitespace-no-wrap" >{issueTime}</small>
                </div>
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