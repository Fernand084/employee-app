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
    <Container fluid className="py-5 bg-light min-vh-100">
        <Row className="justify-content-center">
            <Col xl={12}>
                {/* Card principal */}
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                    {/* Header del card */}
                    <div className="card-header bg-gradient bg-primary text-white border-0 py-4">
                        <div className="d-flex align-items-center">
                            <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                                <i className="bi bi-gender-ambiguous fs-2 text-white"></i>
                            </div>
                            <div>
                                <h1 className="h3 mb-0 fw-bold">Gender Distribution</h1>
                                <p className="mb-0 opacity-75">Workforce diversity and gender balance analysis</p>
                            </div>
                        </div>
                    </div>

                    {/* Body del card */}
                    <div className="card-body p-4 p-lg-5">
                        {/* Información contextual */}
                        <Row className="mb-4">
                            <Col>
                                <div className="alert alert-info border-0 rounded-3 bg-info bg-opacity-10" role="alert">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-info-circle-fill text-info fs-4 me-3 mt-1"></i>
                                        <div>
                                            <h6 className="fw-bold text-info mb-2">Diversity & Inclusion Metrics</h6>
                                            <p className="mb-0">
                                                Analysis of gender representation across the organization, providing insights into workforce diversity and helping track inclusion initiatives and balance goals
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* Stats cards */}
                        <Row className="g-4 mb-5">
                            <Col md={3}>
                                <div className="text-center p-4 bg-success bg-opacity-10 rounded-3">
                                    <i className="bi bi-people text-success fs-1 mb-3"></i>
                                    <h4 className="fw-bold text-success mb-1">
                                        {genderData && genderData.length > 0 ? 
                                            genderData.reduce((acc, item) => acc + item.count!, 0) : 
                                            'N/A'
                                        }
                                    </h4>
                                    <p className="text-muted mb-0">Total Employees</p>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="text-center p-4 bg-primary bg-opacity-10 rounded-3">
                                    <i className="bi bi-gender-male text-primary fs-1 mb-3"></i>
                                    <h4 className="fw-bold text-primary mb-1">
                                        {genderData && genderData.length > 0 ? 
                                            genderData.find(item => item.gender === 'M')?.count || '0' : 
                                            'N/A'
                                        }
                                    </h4>
                                    <p className="text-muted mb-0">Male</p>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="text-center p-4 bg-danger bg-opacity-10 rounded-3">
                                    <i className="bi bi-gender-female text-danger fs-1 mb-3"></i>
                                    <h4 className="fw-bold text-danger mb-1">
                                        {genderData && genderData.length > 0 ? 
                                            genderData.find(item => item.gender === 'F')?.count || '0' : 
                                            'N/A'
                                        }
                                    </h4>
                                    <p className="text-muted mb-0">Female</p>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="text-center p-4 bg-warning bg-opacity-10 rounded-3">
                                    <i className="bi bi-percent text-warning fs-1 mb-3"></i>
                                    <h4 className="fw-bold text-warning mb-1">
                                        {genderData && genderData.length > 0 ? 
                                            `${Math.abs(((genderData.find(item => item.gender === 'M')?.count || 0) - (genderData.find(item => item.gender === 'F')?.count || 0)) / genderData.reduce((acc, item) => acc + item.count!, 0) * 100).toFixed(1)}%` : 
                                            'N/A'
                                        }
                                    </h4>
                                    <p className="text-muted mb-0">Balance Gap</p>
                                </div>
                            </Col>
                        </Row>

                        {/* Gender Breakdown Cards */}
                        {genderData && genderData.length > 0 && (
                            <Row className="g-4 mb-5">
                                <Col md={6}>
                                    <div className="bg-primary bg-opacity-5 border border-primary border-opacity-25 rounded-3 p-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <i className="bi bi-gender-male text-primary fs-4 me-2"></i>
                                            <h6 className="fw-bold text-primary mb-0">Male Representation</h6>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="fw-medium">Count</span>
                                            <span className="badge bg-primary rounded-pill px-3 py-2">
                                                {genderData.find(item => item.gender === 'M')?.count || 0}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-medium">Percentage</span>
                                            <span className="text-primary fw-bold">
                                                {((genderData.find(item => item.gender === 'M')?.count || 0) / genderData.reduce((acc, item) => acc + item.count!, 0) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="bg-danger bg-opacity-5 border border-danger border-opacity-25 rounded-3 p-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <i className="bi bi-gender-female text-danger fs-4 me-2"></i>
                                            <h6 className="fw-bold text-danger mb-0">Female Representation</h6>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="fw-medium">Count</span>
                                            <span className="badge bg-danger rounded-pill px-3 py-2">
                                                {genderData.find(item => item.gender === 'F')?.count || 0}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-medium">Percentage</span>
                                            <span className="text-danger fw-bold">
                                                {((genderData.find(item => item.gender === 'F')?.count || 0) / genderData.reduce((acc, item) => acc + item.count!, 0) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )}

                        {/* Diversity Insight */}
                        {genderData && genderData.length > 0 && (
                            <div className="alert alert-light border border-secondary border-opacity-25 rounded-3 mb-5">
                                <div className="d-flex align-items-start">
                                    <i className="bi bi-lightbulb text-secondary fs-4 me-3 mt-1"></i>
                                    <div>
                                        <h6 className="fw-bold text-secondary mb-2">Diversity Insight</h6>
                                        <p className="mb-0">
                                            {(() => {
                                                const maleCount = genderData.find(item => item.gender === 'M')?.count || 0;
                                                const femaleCount = genderData.find(item => item.gender === 'F')?.count || 0;
                                                const total = maleCount + femaleCount;
                                                const balanceGap = Math.abs((maleCount - femaleCount) / total * 100);
                                                
                                                if (balanceGap < 10) {
                                                    return "Excellent gender balance! The organization shows strong diversity with minimal gender gap.";
                                                } else if (balanceGap < 20) {
                                                    return "Good gender representation with room for continued improvement in balance.";
                                                } else {
                                                    return "Significant opportunity to improve gender balance and enhance workforce diversity.";
                                                }
                                            })()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Chart section */}
                        <div className="bg-white rounded-3 border p-4 shadow-sm">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="fw-bold mb-0 text-primary">
                                    <i className="bi bi-pie-chart me-2"></i>
                                    Gender Distribution Chart
                                </h5>
                                <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                    <i className="bi bi-diagram-3 me-1"></i>
                                    Diversity Analytics
                                </span>
                            </div>
                            
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={genderData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="count"
                                        nameKey="gender"
                                        label={({ gender, count, percent }) => 
                                            `${gender}: ${count} (${(percent! * 100).toFixed(1)}%)`
                                        }
                                        animationDuration={1500}
                                        stroke="#fff"
                                        strokeWidth={3}
                                    >
                                        {genderData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={entry.gender === 'M' ? '#0d6efd' : entry.gender === 'F' ? '#dc3545' : '#6c757d'} 
                                            />
                                        ))}
                                    </Pie>
                                    <Legend 
                                        verticalAlign="bottom" 
                                        height={36}
                                        formatter={(value) => value === 'M' ? 'Male' : value === 'F' ? 'Female' : value}
                                    />
                                </PieChart>
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
        <Container fluid className="py-5 bg-light min-vh-100">
            <Row className="justify-content-center">
                <Col xl={12}>
                    {/* Card principal */}
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        {/* Header del card */}
                        <div className="card-header bg-gradient bg-primary text-white border-0 py-4">
                            <div className="d-flex align-items-center">
                                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                                    <i className="bi bi-people-fill fs-2 text-white"></i>
                                </div>
                                <div>
                                    <h1 className="h3 mb-0 fw-bold">Employees by Department</h1>
                                    <p className="mb-0 opacity-75">Active workforce distribution across organizational departments</p>
                                </div>
                            </div>
                        </div>

                        {/* Body del card */}
                        <div className="card-body p-4 p-lg-5">
                            {/* Información contextual */}
                            <Row className="mb-4">
                                <Col>
                                    <div className="alert alert-info border-0 rounded-3 bg-info bg-opacity-10" role="alert">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-info-circle-fill text-info fs-4 me-3 mt-1"></i>
                                            <div>
                                                <h6 className="fw-bold text-info mb-2">Workforce Distribution Analysis</h6>
                                                <p className="mb-0">
                                                    Overview of active employee distribution across all departments, showing organizational structure and team sizes to identify resource allocation patterns
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/* Stats cards */}
                            <Row className="g-4 mb-5">
                                <Col md={3}>
                                    <div className="text-center p-4 bg-success bg-opacity-10 rounded-3">
                                        <i className="bi bi-person-badge text-success fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-success mb-1">
                                            {departments && departments.length > 0 ? 
                                                departments.reduce((acc, dept) => acc + dept.employeeCount, 0) : 
                                                'N/A'
                                            }
                                        </h4>
                                        <p className="text-muted mb-0">Total Employees</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="text-center p-4 bg-warning bg-opacity-10 rounded-3">
                                        <i className="bi bi-buildings text-warning fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-warning mb-1">
                                            {departments && departments.length > 0 ? departments.length : 'N/A'}
                                        </h4>
                                        <p className="text-muted mb-0">Active Departments</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="text-center p-4 bg-info bg-opacity-10 rounded-3">
                                        <i className="bi bi-calculator text-info fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-info mb-1">
                                            {departments && departments.length > 0 ? 
                                                Math.round(departments.reduce((acc, dept) => acc + dept.employeeCount, 0) / departments.length) : 
                                                'N/A'
                                            }
                                        </h4>
                                        <p className="text-muted mb-0">Avg per Dept</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="text-center p-4 bg-danger bg-opacity-10 rounded-3">
                                        <i className="bi bi-trophy text-danger fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-danger mb-1">
                                            {departments && departments.length > 0 ? 
                                                Math.max(...departments.map(dept => dept.employeeCount)) : 
                                                'N/A'
                                            }
                                        </h4>
                                        <p className="text-muted mb-0">Largest Dept</p>
                                    </div>
                                </Col>
                            </Row>

                            {/* Top/Bottom Departments */}
                            {departments && departments.length > 0 && (
                                <Row className="g-4 mb-5">
                                    <Col md={6}>
                                        <div className="bg-primary bg-opacity-5 border border-primary border-opacity-25 rounded-3 p-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <i className="bi bi-award-fill text-primary fs-4 me-2"></i>
                                                <h6 className="fw-bold text-primary mb-0">Largest Department</h6>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-medium">
                                                    {departments.reduce((prev, current) => 
                                                        (prev.employeeCount > current.employeeCount) ? prev : current
                                                    ).deptName}
                                                </span>
                                                <span className="badge bg-primary rounded-pill px-3 py-2">
                                                    {Math.max(...departments.map(dept => dept.employeeCount))} employees
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="bg-secondary bg-opacity-5 border border-secondary border-opacity-25 rounded-3 p-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <i className="bi bi-gem text-secondary fs-4 me-2"></i>
                                                <h6 className="fw-bold text-secondary mb-0">Most Specialized</h6>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-medium">
                                                    {departments.reduce((prev, current) => 
                                                        (prev.employeeCount < current.employeeCount) ? prev : current
                                                    ).deptName}
                                                </span>
                                                <span className="badge bg-secondary rounded-pill px-3 py-2">
                                                    {Math.min(...departments.map(dept => dept.employeeCount))} employees
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            )}

                            {/* Department Size Distribution */}
                            {departments && departments.length > 0 && (
                                <div className="bg-light rounded-3 p-4 mb-5">
                                    <h6 className="fw-bold text-primary mb-3">
                                        <i className="bi bi-pie-chart me-2"></i>
                                        Department Size Categories
                                    </h6>
                                    <Row className="g-3">
                                        <Col md={4}>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-success rounded-circle me-2" style={{width: '12px', height: '12px'}}></div>
                                                <span className="small">
                                                    <strong>Large (50+ employees):</strong> {departments.filter(d => d.employeeCount >= 50).length}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-warning rounded-circle me-2" style={{width: '12px', height: '12px'}}></div>
                                                <span className="small">
                                                    <strong>Medium (20-49 employees):</strong> {departments.filter(d => d.employeeCount >= 20 && d.employeeCount < 50).length}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="d-flex align-items-center">
                                                <div className="bg-info rounded-circle me-2" style={{width: '12px', height: '12px'}}></div>
                                                <span className="small">
                                                    <strong>Small (1-19 employees):</strong> {departments.filter(d => d.employeeCount < 20).length}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                            
                            {/* Chart section */}
                            <div className="bg-white rounded-3 border p-4 shadow-sm">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h5 className="fw-bold mb-0 text-primary">
                                        <i className="bi bi-bar-chart-fill me-2"></i>
                                        Department Size Comparison
                                    </h5>
                                    <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                        <i className="bi bi-people me-1"></i>
                                        Active Workforce
                                    </span>
                                </div>
                                
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart 
                                        data={departments.map(m => ({
                                            depto_id: m.id,
                                            departamento: m.deptName,
                                            empleados: m.employeeCount,
                                        }))}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" strokeOpacity={0.8} />
                                        <XAxis 
                                            dataKey="departamento" 
                                            angle={-45} 
                                            textAnchor="end" 
                                            interval={0} 
                                            height={100}
                                            stroke="#6c757d"
                                            fontSize={12}
                                        />
                                        <YAxis 
                                            stroke="#6c757d" 
                                            fontSize={12}
                                        />
                                        <Tooltip content={NumberTooltip}/>
                                        <Bar 
                                            dataKey="empleados" 
                                            fill="url(#employeeGradient)" 
                                            animationDuration={1500}
                                            radius={[8, 8, 0, 0]}
                                        />
                                        <defs>
                                            <linearGradient id="employeeGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#0d96e6" stopOpacity={0.9}/>
                                                <stop offset="50%" stopColor="#4dabf7" stopOpacity={0.7}/>
                                                <stop offset="100%" stopColor="#74c0fc" stopOpacity={0.8}/>
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
        <Container fluid className="py-5 bg-light min-vh-100">
            <Row className="justify-content-center">
                <Col xl={12}>
                    {/* Card principal */}
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        {/* Header del card */}
                        <div className="card-header bg-gradient bg-primary text-white border-0 py-4">
                            <div className="d-flex align-items-center">
                                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                                    <i className="bi bi-building fs-2 text-white"></i>
                                </div>
                                <div>
                                    <h1 className="h3 mb-0 fw-bold">Average Salary by Department</h1>
                                    <p className="mb-0 opacity-75">Compensation analysis across organizational departments</p>
                                </div>
                            </div>
                        </div>

                        {/* Body del card */}
                        <div className="card-body p-4 p-lg-5">
                            {/* Información contextual */}
                            <Row className="mb-4">
                                <Col>
                                    <div className="alert alert-info border-0 rounded-3 bg-info bg-opacity-10" role="alert">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-info-circle-fill text-info fs-4 me-3 mt-1"></i>
                                            <div>
                                                <h6 className="fw-bold text-info mb-2">Department Salary Analysis</h6>
                                                <p className="mb-0">
                                                    Comparative analysis of average salaries across all departments, highlighting compensation patterns and departmental value distribution within the organization
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/* Stats cards */}
                            <Row className="g-4 mb-5">
                                <Col md={3}>
                                    <div className="text-center p-4 bg-success bg-opacity-10 rounded-3">
                                        <i className="bi bi-buildings text-success fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-success mb-1">
                                            {averageSalary && averageSalary.length > 0 ? averageSalary.length : 'N/A'}
                                        </h4>
                                        <p className="text-muted mb-0">Departments</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="text-center p-4 bg-warning bg-opacity-10 rounded-3">
                                        <i className="bi bi-trophy text-warning fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-warning mb-1">
                                            {averageSalary && averageSalary.length > 0 ? 
                                                formatCurrency(Math.max(...averageSalary.map(dept => dept.averageSalary))) : 
                                                'N/A'
                                            }
                                        </h4>
                                        <p className="text-muted mb-0">Highest Avg</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="text-center p-4 bg-info bg-opacity-10 rounded-3">
                                        <i className="bi bi-calculator text-info fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-info mb-1">
                                            {averageSalary && averageSalary.length > 0 ? 
                                                formatCurrency(averageSalary.reduce((acc, dept) => acc + dept.averageSalary, 0) / averageSalary.length) : 
                                                'N/A'
                                            }
                                        </h4>
                                        <p className="text-muted mb-0">Overall Avg</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="text-center p-4 bg-danger bg-opacity-10 rounded-3">
                                        <i className="bi bi-bar-chart text-danger fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-danger mb-1">
                                            {averageSalary && averageSalary.length > 0 ? 
                                                `${((Math.max(...averageSalary.map(dept => dept.averageSalary)) - Math.min(...averageSalary.map(dept => dept.averageSalary))) / Math.min(...averageSalary.map(dept => dept.averageSalary)) * 100).toFixed(1)}%` : 
                                                'N/A'
                                            }
                                        </h4>
                                        <p className="text-muted mb-0">Salary Range</p>
                                    </div>
                                </Col>
                            </Row>

                            {/* Top/Bottom Departments */}
                            {averageSalary && averageSalary.length > 0 && (
                                <Row className="g-4 mb-5">
                                    <Col md={6}>
                                        <div className="bg-success bg-opacity-5 border border-success border-opacity-25 rounded-3 p-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <i className="bi bi-arrow-up-circle text-success fs-4 me-2"></i>
                                                <h6 className="fw-bold text-success mb-0">Highest Paying Department</h6>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-medium">
                                                    {averageSalary.reduce((prev, current) => 
                                                        (prev.averageSalary > current.averageSalary) ? prev : current
                                                    ).deptName}
                                                </span>
                                                <span className="badge bg-success rounded-pill px-3 py-2">
                                                    {formatCurrency(Math.max(...averageSalary.map(dept => dept.averageSalary)))}
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="bg-warning bg-opacity-5 border border-warning border-opacity-25 rounded-3 p-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <i className="bi bi-arrow-down-circle text-warning fs-4 me-2"></i>
                                                <h6 className="fw-bold text-warning mb-0">Entry Level Department</h6>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-medium">
                                                    {averageSalary.reduce((prev, current) => 
                                                        (prev.averageSalary < current.averageSalary) ? prev : current
                                                    ).deptName}
                                                </span>
                                                <span className="badge bg-warning rounded-pill px-3 py-2">
                                                    {formatCurrency(Math.min(...averageSalary.map(dept => dept.averageSalary)))}
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            )}
                            
                            {/* Chart section */}
                            <div className="bg-white rounded-3 border p-4 shadow-sm">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h5 className="fw-bold mb-0 text-primary">
                                        <i className="bi bi-bar-chart-fill me-2"></i>
                                        Salary Comparison Chart
                                    </h5>
                                    <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                        <i className="bi bi-currency-dollar me-1"></i>
                                        Department Analysis
                                    </span>
                                </div>
                                
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart 
                                        data={averageSalary}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" strokeOpacity={0.8} />
                                        <XAxis 
                                            dataKey="deptName" 
                                            angle={-45} 
                                            textAnchor="end" 
                                            interval={0} 
                                            height={100}
                                            stroke="#6c757d"
                                            fontSize={12}
                                        />
                                        <YAxis 
                                            stroke="#6c757d" 
                                            fontSize={12}
                                        />
                                        <Tooltip content={CurrencyTooltip}/>
                                        <Bar 
                                            dataKey="averageSalary" 
                                            fill="url(#salaryGradient)" 
                                            animationDuration={1500}
                                            radius={[8, 8, 0, 0]}
                                        />
                                        <defs>
                                            <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#ffd700" stopOpacity={0.9}/>
                                                <stop offset="50%" stopColor="#ffed4e" stopOpacity={0.7}/>
                                                <stop offset="100%" stopColor="#e9ec0b" stopOpacity={0.8}/>
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
        <Container fluid className="py-5 bg-light min-vh-100">
            <Row className="justify-content-center">
                <Col xl={12}>
                    {/* Card principal */}
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        {/* Header del card */}
                        <div className="card-header bg-gradient bg-primary text-white border-0 py-4">
                            <div className="d-flex align-items-center">
                                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                                    <i className="bi bi-award fs-2 text-white"></i>
                                </div>
                                <div>
                                    <h1 className="h3 mb-0 fw-bold">Title History Analysis</h1>
                                    <p className="mb-0 opacity-75">Evolution of job titles and career progression over time</p>
                                </div>
                            </div>
                        </div>

                        {/* Body del card */}
                        <div className="card-body p-4 p-lg-5">
                            {/* Información contextual */}
                            <Row className="mb-4">
                                <Col>
                                    <div className="alert alert-info border-0 rounded-3 bg-info bg-opacity-10" role="alert">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-info-circle-fill text-info fs-4 me-3 mt-1"></i>
                                            <div>
                                                <h6 className="fw-bold text-info mb-2">Career Path Analytics</h6>
                                                <p className="mb-0">
                                                    Tracking the distribution and evolution of job titles across the organization, showing career progression patterns and organizational structure changes over time
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/* Stats cards */}
                            <Row className="g-4 mb-5">
                                <Col md={3}>
                                    <div className="text-center p-4 bg-success bg-opacity-10 rounded-3">
                                        <i className="bi bi-people text-success fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-success mb-1">7</h4>
                                        <p className="text-muted mb-0">Job Titles</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="text-center p-4 bg-warning bg-opacity-10 rounded-3">
                                        <i className="bi bi-graph-up text-warning fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-warning mb-1">
                                            {pivot && pivot.length > 0 ? `${pivot.length}` : 'N/A'}
                                        </h4>
                                        <p className="text-muted mb-0">Years Tracked</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="text-center p-4 bg-info bg-opacity-10 rounded-3">
                                        <i className="bi bi-briefcase text-info fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-info mb-1">Manager</h4>
                                        <p className="text-muted mb-0">Leadership Role</p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="text-center p-4 bg-danger bg-opacity-10 rounded-3">
                                        <i className="bi bi-tools text-danger fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-danger mb-1">Engineer</h4>
                                        <p className="text-muted mb-0">Technical Role</p>
                                    </div>
                                </Col>
                            </Row>

                            {/* Legend Section */}
                            <div className="bg-light rounded-3 p-4 mb-4">
                                <h6 className="fw-bold text-primary mb-3">
                                    <i className="bi bi-palette me-2"></i>
                                    Job Title Legend
                                </h6>
                                <Row className="g-3">
                                    <Col md={6} lg={4}>
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle me-2" style={{width: '12px', height: '12px', backgroundColor: '#11e4d2'}}></div>
                                            <span className="small fw-medium">Assistant Engineer</span>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle me-2" style={{width: '12px', height: '12px', backgroundColor: '#11bae4'}}></div>
                                            <span className="small fw-medium">Engineer</span>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle me-2" style={{width: '12px', height: '12px', backgroundColor: '#1197e4'}}></div>
                                            <span className="small fw-medium">Senior Engineer</span>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle me-2" style={{width: '12px', height: '12px', backgroundColor: '#18e411'}}></div>
                                            <span className="small fw-medium">Technique Leader</span>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle me-2" style={{width: '12px', height: '12px', backgroundColor: '#cb11e4'}}></div>
                                            <span className="small fw-medium">Staff</span>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle me-2" style={{width: '12px', height: '12px', backgroundColor: '#e44d11'}}></div>
                                            <span className="small fw-medium">Senior Staff</span>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle me-2" style={{width: '12px', height: '12px', backgroundColor: '#e4e011'}}></div>
                                            <span className="small fw-medium">Manager</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            
                            {/* Chart section */}
                            <div className="bg-white rounded-3 border p-4 shadow-sm">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h5 className="fw-bold mb-0 text-primary">
                                        <i className="bi bi-bar-chart-line me-2"></i>
                                        Title Distribution Over Time
                                    </h5>
                                    <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                        <i className="bi bi-timeline me-1"></i>
                                        Multi-Series Analysis
                                    </span>
                                </div>
                                
                                <ResponsiveContainer width="100%" height={450}>
                                    <LineChart 
                                        data={pivot}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" strokeOpacity={0.8} />
                                        <XAxis 
                                            dataKey="year" 
                                            stroke="#6c757d"
                                            fontSize={12}
                                        />
                                        <YAxis 
                                            stroke="#6c757d" 
                                            fontSize={12}
                                        />
                                        <Tooltip content={NumberTooltip}/>
                                        <Legend />
                                        <Line 
                                            type="monotone" 
                                            dataKey="Assistant Engineer" 
                                            stroke="#11e4d2" 
                                            strokeWidth={2}
                                            dot={{ fill: '#11e4d2', strokeWidth: 1, r: 4 }}
                                            activeDot={{ r: 6, fill: '#11e4d2', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="Engineer" 
                                            stroke="#11bae4" 
                                            strokeWidth={2}
                                            dot={{ fill: '#11bae4', strokeWidth: 1, r: 4 }}
                                            activeDot={{ r: 6, fill: '#11bae4', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="Senior Engineer" 
                                            stroke="#1197e4" 
                                            strokeWidth={2}
                                            dot={{ fill: '#1197e4', strokeWidth: 1, r: 4 }}
                                            activeDot={{ r: 6, fill: '#1197e4', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="Technique Leader" 
                                            stroke="#18e411" 
                                            strokeWidth={2}
                                            dot={{ fill: '#18e411', strokeWidth: 1, r: 4 }}
                                            activeDot={{ r: 6, fill: '#18e411', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="Staff" 
                                            stroke="#cb11e4" 
                                            strokeWidth={2}
                                            dot={{ fill: '#cb11e4', strokeWidth: 1, r: 4 }}
                                            activeDot={{ r: 6, fill: '#cb11e4', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="Senior Staff" 
                                            stroke="#e44d11" 
                                            strokeWidth={2}
                                            dot={{ fill: '#e44d11', strokeWidth: 1, r: 4 }}
                                            activeDot={{ r: 6, fill: '#e44d11', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="Manager" 
                                            stroke="#e4e011" 
                                            strokeWidth={2}
                                            dot={{ fill: '#e4e011', strokeWidth: 1, r: 4 }}
                                            activeDot={{ r: 6, fill: '#e4e011', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                    </LineChart>
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

    const pivot = years.map(y => ({
        year: y,
        amount: salaries.find((s) => s.fromDate[0] == y && s.id == id)?.amount
    })).filter(p => p.amount !== undefined);


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
                                    <i className="bi bi-graph-up-arrow fs-2 text-white"></i>
                                </div>
                                <div>
                                    <h1 className="h3 mb-0 fw-bold">Employee Salary History</h1>
                                    <p className="mb-0 opacity-75">Salary progression and career development over time</p>
                                </div>
                            </div>
                        </div>

                        {/* Body del card */}
                        <div className="card-body p-4 p-lg-5">
                            {/* Información contextual */}
                            <Row className="mb-4">
                                <Col>
                                    <div className="alert alert-info border-0 rounded-3 bg-info bg-opacity-10" role="alert">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-info-circle-fill text-info fs-4 me-3 mt-1"></i>
                                            <div>
                                                <h6 className="fw-bold text-info mb-2">Salary Evolution Tracking</h6>
                                                <p className="mb-0">
                                                    Complete salary history showing career progression and compensation changes throughout employment period
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/* Stats cards */}
                            <Row className="g-4 mb-5">
                                <Col md={4}>
                                    <div className="text-center p-4 bg-success bg-opacity-10 rounded-3">
                                        <i className="bi bi-calendar-range text-success fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-success mb-1">
                                            {pivot && pivot.length > 0 ? `${pivot.length} Years` : 'N/A'}
                                        </h4>
                                        <p className="text-muted mb-0">Years of Data</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="text-center p-4 bg-warning bg-opacity-10 rounded-3">
                                        <i className="bi bi-trending-up text-warning fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-warning mb-1">
                                            {pivot && pivot.length > 0 ? 
                                                `${formatCurrency(Math.max(...pivot.map(p => p.amount ?? 0)))}` : 
                                                'N/A'
                                            }
                                        </h4>
                                        <p className="text-muted mb-0">Peak Salary</p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="text-center p-4 bg-info bg-opacity-10 rounded-3">
                                        <i className="bi bi-arrow-up-right text-info fs-1 mb-3"></i>
                                        <h4 className="fw-bold text-info mb-1">
                                            {pivot && pivot.length > 1 && pivot[0].amount !== undefined && pivot[pivot.length - 1].amount !== undefined
                                                ? `+${(((pivot[pivot.length - 1].amount! - pivot[0].amount!) / pivot[0].amount!) * 100).toFixed(1)}%`
                                                : 'N/A'
                                            }
                                        </h4>
                                        <p className="text-muted mb-0">Total Growth</p>
                                    </div>
                                </Col>
                            </Row>
                            
                            {/* Chart section */}
                            <div className="bg-white rounded-3 border p-4 shadow-sm">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h5 className="fw-bold mb-0 text-primary">
                                        <i className="bi bi-graph-up me-2"></i>
                                        Salary Progression Chart
                                    </h5>
                                    <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                                        <i className="bi bi-clock-history me-1"></i>
                                        Historical Data
                                    </span>
                                </div>
                                
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart 
                                        data={pivot}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" strokeOpacity={0.8} />
                                        <XAxis 
                                            dataKey="year" 
                                            stroke="#6c757d"
                                            fontSize={12}
                                        />
                                        <YAxis 
                                            stroke="#6c757d" 
                                            fontSize={12}
                                        />
                                        <Tooltip content={CurrencyTooltip} />
                                        <Legend />
                                        <Line 
                                            type="monotone" 
                                            dataKey="amount" 
                                            stroke="url(#salaryGradient)" 
                                            strokeWidth={3}
                                            dot={{ fill: '#0d6efd', strokeWidth: 2, r: 6 }}
                                            activeDot={{ r: 8, fill: '#0d6efd', stroke: '#fff', strokeWidth: 3 }}
                                            animationDuration={1500}
                                        />
                                        <defs>
                                            <linearGradient id="salaryGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#0d6efd" stopOpacity={0.8}/>
                                                <stop offset="50%" stopColor="#6f42c1" stopOpacity={0.8}/>
                                                <stop offset="100%" stopColor="#d63384" stopOpacity={0.8}/>
                                            </linearGradient>
                                        </defs>
                                    </LineChart>
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
