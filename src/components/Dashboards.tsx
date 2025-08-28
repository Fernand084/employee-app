import { useEffect, useState } from "react";
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
                setDataSet(Array.isArray(res.data) ? res.data : [])
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
                <Cell key={`cell-${index}`} fill={COLORS[entry.gender, index % COLORS.length]} />
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
                setDepartments(Array.isArray(res.data) ? res.data : []);
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
                setAverageSalary(Array.isArray(res.data) ? res.data : []);
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
                <Bar dataKey="averageSalary" fill="#e9ec0bff" animationDuration={1500} />
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
                setTitleHistory(Array.isArray(res.data) ? res.data : []);
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
                setSalary(Array.isArray(res.data) ? res.data : []);
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
    const [averageSalary,setAverageSalary] = useState<averageSalary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchData = async () => {
            try {
                axios
                    .get<topSalaries[]>(`${API_URL}/salary/${id}/highest`)
                    .then(res => {
                        setTopSalaries(Array.isArray(res.data) ? res.data : []);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);
                    });
                axios
                    .get<averageSalary[]>(`${API_URL}/salary/average-by-department`)
                    .then(res => {
                        setAverageSalary(Array.isArray(res.data) ? res.data : []);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);
                    });
                
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

    const departmentAvgSalary = averageSalary.filter((avg) => avg.deptName == topSalaries.find((s) => s.department_id == id)?.dept_name);

    return(
        <Container fluid className="py-5 bg-light min-vh-100">
            <Row className="justify-content-center">
                <Col xl={10}>
                    {/* Card principal */}
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        {/* Header del card */}
                        <div className="card-header bg-gradient bg-primary text-white border-0 py-4">
                            <div className="d-flex align-items-center">
                                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                                    <i className="bi bi-currency-dollar fs-2 text-white"></i>
                                </div>
                                <div>
                                    <h1 className="h3 mb-0 fw-bold">Top Salaries Analysis</h1>
                                    <p className="mb-0 opacity-75">High-performing employees above department average</p>
                                </div>
                            </div>
                        </div>

                        {/* Body del card */}
                        <div className="card-body p-4 p-lg-5">
                            {/* Información del departamento */}
                            <Row className="mb-4">
                                <Col>
                                    {departmentAvgSalary.filter((avg) => avg.deptName == topSalaries.find((s) => s.department_id == id)?.dept_name).map(a => 
                                        <div key={a.departmentId}>
                                            <div className="alert alert-info border-0 rounded-3 bg-info bg-opacity-10" role="alert">
                                                <div className="d-flex align-items-start">
                                                    <i className="bi bi-info-circle-fill text-info fs-4 me-3 mt-1"></i>
                                                    <div>
                                                        <h6 className="fw-bold text-info mb-2">Department Insight</h6>
                                                        <p className="mb-0">
                                                            Employees from <span className="badge bg-primary rounded-pill px-3 py-2 fs-6">{topSalaries.find((s) => s.department_id == id)?.dept_name}</span> department that earn above the department average of <span className="text-success fw-bold fs-5">{formatCurrency(a.averageSalary)}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Col>
                            </Row>

                            {/* stats */}
                            <Row className="g-4 mb-5">
                                <Col md={4}>
                                    <div className="text-center p-4 bg-success bg-opacity-10 rounded-3">
                                        <i className="bi bi-people-fill text-success fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-success mb-1">{topSalaries.filter(ts => ts.amount >= departmentAvgSalary.find((d) => d.departmentId = id)?.averageSalary!).length}</h4>
                                        <p className="text-muted mb-0">Top Performers</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="text-center p-4 bg-warning bg-opacity-10 rounded-3">
                                        <i className="bi bi-graph-up text-warning fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-warning mb-1">
                                            {formatCurrency(Math.max(...topSalaries.map(ts => ts.amount)))}
                                        </h4>
                                        <p className="text-muted mb-0">Highest Salary</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="text-center p-4 bg-info bg-opacity-10 rounded-3">
                                        <i className="bi bi-calculator text-info fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-info mb-1">
                                            {formatCurrency(topSalaries.reduce((acc, ts) => acc + ts.amount, 0) / topSalaries.length)}
                                        </h4>
                                        <p className="text-muted mb-0">Average</p>
                                    </div>
                                </Col>
                            </Row>
                            
                            {/* charts */}
                            <div className="bg-white rounded-3 border p-4 shadow-sm">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h5 className="fw-bold mb-0 text-primary">
                                        <i className="bi bi-bar-chart-fill me-2"></i>
                                        Salary Distribution
                                    </h5>
                                    <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                        <i className="bi bi-graph-up-arrow me-1"></i>
                                        Above Average
                                    </span>
                                </div>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart 
                                        data={topSalaries.filter(ts => ts.amount >= departmentAvgSalary.find((d) => d.departmentId = id)?.averageSalary!)}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" strokeOpacity={0.8} />
                                        <XAxis 
                                            dataKey="employee_id" 
                                            angle={-45} 
                                            textAnchor="end" 
                                            height={100}
                                            stroke="#6c757d"
                                            fontSize={12}
                                        />
                                        <YAxis stroke="#6c757d" fontSize={12} />
                                        <Tooltip content={CurrencyTooltip} />
                                        <Bar 
                                            dataKey="amount" 
                                            fill="url(#colorGradient)" 
                                            animationDuration={1500}
                                            radius={[8, 8, 0, 0]}
                                        />
                                        <defs>
                                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#0d6efd" stopOpacity={0.8}/>
                                                <stop offset="100%" stopColor="#0d6efd" stopOpacity={0.3}/>
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Footer del card */}
                        <div className="card-footer bg-light border-0 py-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <small className="text-muted">
                                    <i className="bi bi-clock me-1"></i>
                                    Last updated: {new Date().toLocaleDateString()}
                                </small>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-outline-primary btn-sm">
                                        <i className="bi bi-download me-1"></i>Export
                                    </button>
                                    <button type="button" className="btn btn-outline-secondary btn-sm">
                                        <i className="bi bi-share me-1"></i>Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        
    )
}
