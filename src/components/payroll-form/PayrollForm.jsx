import React, { Component } from 'react';
import './PayrollForm.css'
import profile1 from '../../assets/images/Ellipse 1.png'
import profile3 from '../../assets/images/Ellipse -3.png'
import profile7 from '../../assets/images/Ellipse -7.png'
import profile8 from '../../assets/images/Ellipse -8.png'
import EmployeeService from '../../service/EmployeeService';


class PayrollForm extends Component {

    
    constructor(props){
        super(props);

        this.state = {
            name:"",
            profilePic:"",
            gender:"",
            departments: [],
            salary: "400000",
            notes: "",
            day:"",
            month:"",
            year:"",
            submitMsg:"",
            nameError:"",
            isUpdate: false,
        }   
    }

    getEmployeeById = (empId) => {
        EmployeeService.getEmployeeById(empId).then( (response) => {
            console.log("get emp by id called")
            let date = response.data.data.startDate.split('-');
            //{year, month, day } = response.data.data.startDate.slice('-');
            this.setState({
                name:response.data.data.name,
                profilePic:response.data.data.profilePic,
                gender:response.data.data.gender,
                departments: response.data.data.departments,
                salary: response.data.data.salary,
                notes: response.data.data.note,
                day:date[2],
                month:date[1],
                year:date[0],
                
            })
            
            console.log(this.state.departments)
        })
    }

    componentDidMount(){
        if(this.props.location.state){
            this.getEmployeeById(this.props.location.state.employeeId);
            this.setState({
                isUpdate:true,
            })
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        let empObject = {
            name : this.state.name,
            profilePic : this.state.profilePic,
            gender : this.state.gender,
            departments : this.state.departments,
            salary : this.state.salary,
            startDate : `${this.state.day} ${this.state.month} ${this.state.year}`,
            note : this.state.notes,            
        } 
        
        if( this.state.isUpdate){
            EmployeeService.updateEmployee(this.props.location.state.employeeId, empObject).then(() =>{
                this.setState({
                    submitMsg: "Employee updated successfully"
                })     
                setInterval(() => {
                    this.setState({
                        submitMsg: ""
                    })    
                },10000)
                
            }).catch( () =>{
                this.setState({
                    submitMsg: "error Something went wrong! Record not updated"
                })    
                setInterval(() => {
                    this.setState({
                        submitMsg: ""
                    })    
                },10000)    
            })
        }else{
            EmployeeService.addEmployee(empObject).then( (response) =>{

                this.setState({
                    submitMsg: "Employee added successfully"
                })
                
                setInterval(() => {
                    this.setState({
                        submitMsg: ""
                    })    
                },10000)
            }).catch( (error) =>{
                
                this.setState({
                    submitMsg: "error Something went wrong! Record not added"
                })
    
                console.log(error)
    
                setInterval(() => {
                    this.setState({
                        submitMsg: ""
                    })    
                },10000)
            })
        }
        
    }

    onValueChange = (event) => {
        
        const nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
        if( event.target.name == "name"){
            if(nameRegex.test(event.target.value)){
                this.setState({
                    nameError:''
                })    
            }else{
                this.setState({
                    nameError:"Invalid name"
                })
            }
        }

        this.setState({
            [event.target.name] : event.target.value 
        });
        this.setState({
            "startDate":`${this.state.day} ${this.state.month} ${this.state.year}`,
        });
        console.log('value for', [event.target.name] , event.target.value);
        
    }

    onCheckboxChange = (event) =>{
        let deptArray = [...this.state.departments]
        if(event.target.checked){
            deptArray.push(event.target.value);
        }else{
            let index = deptArray.indexOf(event.target.value);
            deptArray.splice(index,1);
        }
        //console.log("departments : "+ deptArray);
        this.setState({
            departments : deptArray,
        })
    }

    onReset = (event) => {
        this.setState({
            name:"",
            profilePic:"",
            gender:"",
            departments: [],
            salary: "400000",
            notes: "",
            day:"",
            month:"",
            year:"",
            submitMsg:"",
        })
    }
    
    render() {
        return (
            <div>
                
                <div className="form-content">

                    <form className="form" action="" onSubmit={this.onSubmit} onReset={this.onReset}>

                        <div className="form-head">
                            Employee Payroll Form
                        </div>

                        <div className="row-content">
                            <label className="label text" htmlFor="name"> Name : </label>
                            <input className="input" onChange={this.onValueChange} value={this.state.name} type="text" name="name" id="name" placeholder="Your name." required />
                            <span className='error-output'> {this.state.nameError} </span>
                        </div>

                        <div className="row-content">
                            <label htmlFor="profile" className="label text">Profile image</label>
                            <div className="profile-radio-content">
                                <label>
                                    <input type="radio" onChange={this.onValueChange} name="profilePic" id="profile1" value="../../assets/images/Ellipse -3.png" checked={this.state.profilePic == "../../assets/images/Ellipse -3.png" } required />
                                    <img src={profile3} className="profile" alt="" />
                                </label>
                                <label>
                                    <input type="radio" onChange={this.onValueChange} name="profilePic" id="profile2" value="../../assets/images/Ellipse 1.png" checked={this.state.profilePic == "../../assets/images/Ellipse 1.png"} required />
                                    <img src={profile1} className="profile" alt="" />
                                </label>
                                <label>
                                    <input type="radio" onChange={this.onValueChange} name="profilePic" id="profile3" value="../../assets/images/Ellipse -8.png" checked={this.state.profilePic == "../../assets/images/Ellipse -8.png"} required />
                                    <img src={profile8} className="profile" alt="" />
                                </label>
                                <label>
                                    <input type="radio" onChange={this.onValueChange} name="profilePic" id="profile4" value="../../assets/images/Ellipse -7.png" checked={this.state.profilePic == "../../assets/images/Ellipse -7.png"} required />
                                    <img src={profile7} className="profile" alt="" />
                                </label>
                            </div>
                        </div>

                        <div className="row-content">
                            <label htmlFor="gender" className="label text">Gender</label>
                            <div>
                                <input type="radio" onChange={this.onValueChange} checked={this.state.gender == "male"} name="gender" id="male" value="male" required />
                                <label htmlFor="male" className="text">Male</label>
                                <input type="radio" onChange={this.onValueChange} checked={this.state.gender == "female"} name="gender" id="female" value="female" required/>
                                <label htmlFor="female" className="text">Female</label>
                            </div>
                        </div>

                        <div className="row-content">
                            <label htmlFor="department" name="department" className="label text">Department</label>
                            <div>
                                <input type="checkbox" checked={this.state.departments.includes("HR")} onChange={this.onCheckboxChange} className="checkbox" name="hr" id="hr" value="HR" />
                                <label htmlFor="hr" className="text">HR</label>   
                                <input type="checkbox" checked={this.state.departments.includes("Sales")} onChange={this.onCheckboxChange} className="checkbox" name="sales" id="sales" value="Sales" />
                                <label htmlFor="sales" className="text">Sales</label>
                                <input type="checkbox" checked={this.state.departments.includes("Finance")} onChange={this.onCheckboxChange} className="checkbox" name="finance" id="finance" value="Finance" />
                                <label htmlFor="finance" className="text">Finance</label>
                                <input type="checkbox" checked={this.state.departments.includes("Engineer")} onChange={this.onCheckboxChange} className="checkbox" name="engineer" id="engineer" value="Engineer" />
                                <label htmlFor="engineer" className="text">Engineer</label> 
                                <input type="checkbox" checked={this.state.departments.includes("Others")} onChange={this.onCheckboxChange} className="checkbox" name="others" id="others" value="Others" />
                                <label htmlFor="others" className="text">Others</label>            
                            </div>
                        </div>

                        <div className="row-content">
                            <label htmlFor="salary" className="label text">Choose your salary: </label>
                            <input type="range" onChange={this.onValueChange} name="salary" id="salary" className="input" min="300000" max="500000" value={this.state.salary} defaultValue="400000"/>
                            <output className="salary-output text" htmlFor="salary" id="salaryOutput">{this.state.salary}</output>
                        </div>

                        <div className="row-content">
                            <label htmlFor="startDate" className="label text">Start Date</label>
                            <div onChange={this.onValueChange}>
                                <select name="day" id="day" value={this.state.day}>
                                    <option>Day</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                                <select name="month" id="month" value={this.state.month} >
                                    <option>Month</option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select name="year" id="year" value={this.state.year}>
                                    <option>Year</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                </select>
                            </div>
                        </div>

                        <div className="row-content">
                            <label htmlFor="notes" className="label text">Notes</label>
                            <textarea name="notes" id="notes" className="input" onChange={this.onValueChange} value={this.state.notes} required></textarea>
                        </div>

                        <div>
                
                            {
                                this.state.submitMsg.startsWith("error")? <span className='errorMsg'>{this.state.submitMsg.substring(6)}</span> : <span className='successMsg'>{this.state.submitMsg}</span>
                            }
                        </div>

                        <div className="buttonParent">
                            <a href='/home' className="button cancelButton">Cancel</a>
                            <div className="submit-reset">
                                <button type="submit" className="button submitButton" id="submitButton">Submit</button>
                                <button type="reset" className="resetButton button">Reset</button>
                            </div>
                        </div>

                    </form>

                </div>
                
            </div>
        );
    }
}

export default PayrollForm;