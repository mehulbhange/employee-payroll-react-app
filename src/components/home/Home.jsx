import React, { Component } from 'react';
import './Home.css'
import addIcon from '../../assets/icons/add-24px.svg'
import editIcon from '../../assets/icons/create-black-18dp.svg';
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import EmployeeService from '../../service/EmployeeService';

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            employeeList : [],
        }
    }

    

    fetchData() {
        EmployeeService.getAllEmployees().then((response) => {
            console.log(response.data.data);

            this.setState({ 
                employeeList  : response.data.data
            });
                
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    
    render() {
        return (
            
            <div className="main-content">
                <div className="header-content">
                    <div className="emp-detail-text">
                        Employee Details<div className="emp-count">{this.state.employeeList.length}</div>
                    </div>
                    <a href='/payroll-form' className='add-button'>
                    <img src={addIcon} alt="" /> Add User</a>
                </div>

                <div className="table-main">
                    <table id="table-display" className="table">
                        
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Start Date</th>
                            <th>Actions</th>
                        </tr>
                        
                        {
                            this.state.employeeList.map( (employee) => {
                                console.log("Employee details" + JSON.stringify(employee));
                                console.log("Employee profile :"+ employee.profilePic);
                                let pp = employee.profilePic
                                return(
                                <tr key={employee.id}>
                                    <td><img src={employee.profilePic} alt="ProfilePic" /></td>
                                    <td>{employee.name}</td>
                                    <td>{employee.gender}</td>
                                    <td>
                                        {employee.departments.map(dept =>
                                            <div className="dept-label" id="dept"> {dept} </div>
                                        )}
                                    </td>
                                    
                                    <td>{employee.salary}</td>
									<td>{employee.startDate}</td>

                                    <td>
                                        <img id={employee.id} 
                                        onClick=""
                                        src={editIcon}
                                        alt="delete"/>
                                        
                                        <img id={employee.id} onClick="" src={deleteIcon} alt="edit"/>
                                    </td>

                                </tr>
                                )  
                            })
                        }
                        
                    </table>
                                    
                </div>
            </div>
        );
    }
}

export default Home;