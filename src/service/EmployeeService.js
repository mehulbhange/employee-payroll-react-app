import axios from 'axios';

class EmployeeService{
    baseUrl ="http://localhost:8081/employeepayrollservice";

    async addEmployee(data) {
        return axios.post(`${this.baseUrl}/create`, data);
    }

    getAllEmployees() {
        return axios.get(`${this.baseUrl}/get`);
    }
}

export default new EmployeeService();