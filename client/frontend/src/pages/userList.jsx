import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, InputGroup, FormControl, Container } from 'react-bootstrap';
import * as FaIcons from "react-icons/fa";

const UserList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('firstName');
    const [clickedEmployee, setClickedEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedRole, setSelectedRole] = useState('all');
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:3001/users');
            const data = await response.json();
            const employeeList = data.filter(employee => employee.role === 'hospital' || employee.role === 'patient' || employee.role === 'insurance' || employee.role === 'admin');
            setEmployees(employeeList);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3001/users/${employeeId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    console.log('Employee deleted successfully.');
                    fetchEmployees();
                } else {
                    console.error('Error deleting employee.');
                }
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const filteredEmployees = employees.filter((employee) => {
        const fullName = `${employee.email}`;
        return (
            fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedRole === 'all' || employee.role === selectedRole)
        );
    });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleFirstNameClick = (employee) => {
        if (clickedEmployee === employee) {
            setClickedEmployee(null);
        } else {
            setClickedEmployee(employee);
        }
    };

    const sortedEmployees = [...filteredEmployees];
    sortedEmployees.sort((a, b) => {
        const columnA = a[sortColumn]; // Get the actual value
        const columnB = b[sortColumn]; // Get the actual value

        // Custom comparison for dates
        if (sortColumn === 'dob') {
            const dateA = new Date(columnA);
            const dateB = new Date(columnB);

            if (sortOrder === 'asc') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        }

        // Default comparison for strings
        if (sortOrder === 'asc') {
            return String(columnA).localeCompare(String(columnB));
        } else {
            return String(columnB).localeCompare(String(columnA));
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedEmployees.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
        setCurrentPage(1);
    };

    return (
        <Container fluid>
            <div className="card p-3">
                <div className="list-container">
                    <div className="employee-list">
                        <div className='d-flex justify-content-between m-2'>
                            <h2 className="header-emp-list">User List</h2>
                            <Button variant="outline-primary" className="edit-emp-button" onClick={() => navigate(`/user-create`)}>Add User</Button>
                        </div>
                        <div className="search-bar d-flex">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Search User"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <select id="role" value={selectedRole} onChange={handleRoleChange} className="form-control ml-2">
                                    <option value="all">- - Select User Type - -</option>
                                    <option value="patient">Patient</option>
                                    <option value="hospital">Hospital</option>
                                    <option value="insurance">Insurance</option>
                                </select>
                            </InputGroup>
                        </div>
                        <Table striped bordered hover responsive className="mt-3">
                            <thead>
                                <tr>
                                    <th style={{ width: '150px' }}>
                                        Name
                                    </th>
                                    <th style={{ width: '150px' }}>
                                        Email
                                    </th>
                                    <th style={{ width: '150px' }}>
                                        Role
                                    </th>
                                    <th style={{ width: '150px' }}>
                                        Phone
                                    </th>
                                    <th style={{ width: '150px' }}>
                                        Address
                                    </th>
                                    <th style={{ width: '130px' }}>
                                        Date of Birth
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((employee) => (
                                    <tr key={employee._id}>
                                        <td>
                                            <div className='action' onClick={() => handleFirstNameClick(employee)}>
                                                <FaIcons.FaInfoCircle style={{ marginRight: '10px' }} />
                                                {employee.name}
                                            </div>

                                            {clickedEmployee === employee && (
                                                <div className="action-dropdown">
                                                    <Button
                                                        variant="outline-primary"
                                                        className="edit-emp-button"
                                                        onClick={() => navigate(`/user/${employee._id}/edit`)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        className="delete-emp-button"
                                                        onClick={() => handleDelete(employee._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                        <td>{employee.email}</td>
                                        <td>{employee.role}</td>
                                        <td>{employee.phone}</td>
                                        <td>{employee.address}</td>
                                        <td>{employee.dob ? new Date(employee.dob).toLocaleDateString() : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(sortedEmployees.length / itemsPerPage) }, (_, index) => (
                                <Button key={index + 1} variant="outline-secondary" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UserList;
