import React, { useEffect, useState } from "react";
import {
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import type { Department } from "../models/DepartmentModel";
import { API_URL } from "../api/config";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import type { Salary } from "../models/SalaryModel";
import { createCustomTooltip, formatCurrency, formatNumber } from "./Utils";



const COLORS = ["#2795d4ff", "#27e4abff"];

const CurrencyTooltip = createCustomTooltip(formatCurrency);
const NumberTooltip = createCustomTooltip(formatNumber);

interface genderDataset {
    deptId:string;
    departmentName:string;
    gender:string;
    count:number;
};

interface Props {
  id: string;
};

interface SalaryProps {
    id: number;
}

interface averageSalary {
  departmentId: string;
  deptName: string;
  averageSalary: number;
}

interface topSalaries {
    employee_id: number;
    department_id: string;
    amount: number;
    dept_name: string;
}

interface titleHistory {
  total: number;
  title: string;
  year: number;
}

const years = [
      1985,
      1986,
      1987,
      1988,
      1989,
      1990,
      1991,
      1992,
      1993,
      1994,
      1995,
      1996,
      1997,
      1998,
      1999,
      2000,
      2001,
      2002      
    ]


export default function GenderDistribution({id}:Props) {
    const [genderDataset, setDataSet] = useState<genderDataset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchGenderData = async () => {
            try {
                const res = await axios.get<genderDataset[]>(`${API_URL}/stats/gender-distribution`);
                setDataSet(res.data)
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError
                setLoading(false);
            }
        };
        fetchGenderData();
    },[id]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>

    const genderData = [
        {gender:genderDataset.find((ds)=>ds.deptId == id && ds.gender == 'M')?.gender, 
                                count:genderDataset.find((ds)=>ds.deptId==id && ds.gender=='M')?.count},
        {gender:genderDataset.find((ds)=>ds.deptId == id && ds.gender == 'F')?.gender, 
                                count:genderDataset.find((ds)=>ds.deptId==id && ds.gender=='F')?.count}
    ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      
      
      {/* Gráfico de pastel */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Gender Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={genderData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
              nameKey="gender"
              label
              animationDuration={1200}
            >
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      

    </div>
  );
}

export function ActiveEmployeesByDepartment(){
    const [departments,setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await axios.get<Department[]>(`${API_URL}/stats/employees-per-department`);
                setDepartments(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    
    return(
        <Container fluid>
            <br />
            <Row>
                <Col md={{ span: 8, order: 1 }}>
                    <h2 className="text-xl font-semibold mb-4">Employees by department</h2>
                </Col>
            </Row>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departments.map(m => ({
                            depto_id: m.id,
                            departamento: m.deptName,
                            empleados: m.employeeCount,
                            }))}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis  dataKey="departamento" angle={-45} textAnchor="end" interval={0} height={115} />
                <YAxis />
                <Tooltip content={NumberTooltip}/>
                <Bar dataKey="empleados" fill="#0d96e6ff" animationDuration={1500} />
            </BarChart>
            </ResponsiveContainer>
        </Container>
    )
}

export function AverageSalaryByDepartment(){
    const [averageSalary,setAverageSalary] = useState<averageSalary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await axios.get<averageSalary[]>(`${API_URL}/salary/average-by-department`);
                setAverageSalary(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    
    return(
        <Container fluid>
            <br />
            <Row>
                <Col md={{ span: 8, order: 1 }}>
                    <h2 className="text-xl font-semibold mb-4">Avergage Salary by Department</h2>
                </Col>
            </Row>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={averageSalary}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis  dataKey="deptName" angle={-45} textAnchor="end" interval={0} height={115} />
                <YAxis />
                <Tooltip content={CurrencyTooltip}/>
                <Bar dataKey="averageSalary" fill="#67b94eff" animationDuration={1500} />
            </BarChart>
            </ResponsiveContainer>
        </Container>
    )
}


export function TitlesHistoryByDepartment(){
    const [titleHistory, setTitleHistory] = useState<titleHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await axios.get<titleHistory[]>(`${API_URL}/stats/titles-history`);
                setTitleHistory(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>

    const pivot = years.map(y => 
      ({
          year: y, 
          "Assistant Engineer": titleHistory.find((t) => t.title == "Assistant Engineer" && t.year == y)?.total,
          "Engineer": titleHistory.find((t) => t.title == "Engineer" && t.year == y)?.total,
          "Senior Engineer": titleHistory.find((t) => t.title == "Senior Engineer" && t.year == y)?.total,
          "Technique Leader": titleHistory.find((t) => t.title == "Technique Leader" && t.year == y)?.total,
          "Staff": titleHistory.find((t) => t.title == "Staff" && t.year == y)?.total,
          "Senior Staff": titleHistory.find((t) => t.title == "Senior Staff" && t.year == y)?.total,
          "Manager": titleHistory.find((t) => t.title == "Manager" && t.year == y)?.total
      })
    )

    return(
        <Container fluid>
            <br />
            <Row>
                <Col md={{ span: 8, order: 1 }}>
                    <h2 className="text-xl font-semibold mb-4">Title History</h2>
                </Col>
            </Row>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pivot}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={NumberTooltip}/>
                <Legend />
                <Line type="monotone" dataKey="Assistant Engineer" stroke="#11e4d2ff" />
                <Line type="monotone" dataKey="Engineer" stroke="#11bae4ff" />
                <Line type="monotone" dataKey="Senior Engineer" stroke="#1197e4ff" />
                <Line type="monotone" dataKey="Technique Leader" stroke="#18e411ff" />
                <Line type="monotone" dataKey="Staff" stroke="#cb11e4ff" />
                <Line type="monotone" dataKey="Senior Staff" stroke="#e44d11ff" />
                <Line type="monotone" dataKey="Manager" stroke="#e4e011ff" />
              </LineChart>
            </ResponsiveContainer>
        </Container>
        
    )
}


export function EmployeeSalaryHistory({id}: SalaryProps){
    const [salaries, setSalary] = useState<Salary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await axios.get<Salary[]>(`${API_URL}/employees/${id}/salaries`);
                setSalary(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError
                setLoading(false);
            }
        };
        fetchData();
    },[id]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>

    const pivot = years.map(y =>
    (
        {
        year:y,
        amount: salaries.find((s) => s.fromDate[0] == y && s.id == id)?.amount
    }));


    return(
        <Container fluid>
            <br />
            <h2 className="text-xl font-semibold mb-4">Employee Salaries History</h2>
            <Row>
                
                <Col>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={pivot}>
                        
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip content={CurrencyTooltip} />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="#11e4d2ff" />
                    </LineChart>
                </ResponsiveContainer>
                </Col>
            </Row>
            
        </Container>
        
    )
}

export function TopSalariesByDepartmentId({id}: Props){
    const [topSalaries, setTopSalaries] = useState<topSalaries[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await axios.get<topSalaries[]>(`${API_URL}/salary/${id}/highest`);
                setTopSalaries(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError
                setLoading(false);
            }
        };
        fetchData();
    },[id]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>


    return(
        <Container fluid>
            <br />
            <Row>
                <Col md={{ span: 6, order: 1 }}>
                    <h2 className="text-xl font-semibold mb-4">Top Salaries</h2>
                    {topSalaries.find((s) => s.department_id == id)?.dept_name}
                    
                </Col>
            </Row>
            <br />
            <ResponsiveContainer width="150%" height={300}>
            <BarChart data={topSalaries}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis  dataKey="employee_id" angle={-90} textAnchor="end" interval={1} height={115} />
                <YAxis />
                <Tooltip content={CurrencyTooltip}/>
                <Bar dataKey="amount" fill="#31e60dff" animationDuration={1500} />
            </BarChart>
            </ResponsiveContainer>
        </Container>
        
    )
}
