import React from 'react'
export const DELETE_TYPE="bg-danger"
export const READ_TYPE="bg-success"
export const EDIT_TYPE="bg-primary"
export const ADD_TYPE="bg-warning"
export const CANCEL_TYPE="bg-secondary"

const CustomButton = ({title,onClick,type}) => {

    

  return (
    <button onClick={onClick} className={`btn ${type}`}>{title}</button>
  )
}

export default CustomButton