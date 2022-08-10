import React from 'react'

export default function Errors({error_list, clicked}) {
  return (
    <ul>
        {
            error_list.map((error, index) => (
                <li className={`${clicked ? "text-red-700" : ""} pl-3 text-xs`} key={index}>*{error}</li>
            ))
        }
    </ul>
  )
}
