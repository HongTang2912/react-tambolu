import React from 'react'
import Styles from './Logo.module.css'

export default function Tambolu() {
  return (
    <strong className={`text-4xl ${Styles['title-font']}`}>
    <span className="text-indigo-500">Tam</span>
    <span className="text-orange-600">bo</span>
    <span className="text-green-700">lu</span>
  </strong>
  )
}
