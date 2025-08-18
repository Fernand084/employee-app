import React from 'react'
import { useParams } from 'react-router-dom';
import EmployeeDetails from '../components/EmployeeDetails';


const EmployeeDetails_page = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id) : NaN;

  return (
    <div>
      <EmployeeDetails id={numericId} />
    </div>
  );
};

export default EmployeeDetails_page;
