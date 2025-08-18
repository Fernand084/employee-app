import React from 'react'
import { useParams } from 'react-router-dom';
import DepartmentEmployees from '../components/DepartmentEmployees'

const DepartmentEmployees_page = () => {
    const { id } = useParams<{ id: string }>();
    //const deptId = id;
  return (
    <div>
      <DepartmentEmployees id={id}/>
    </div>
  )
}

export default DepartmentEmployees_page
