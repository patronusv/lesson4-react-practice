import axios from 'axios';
export default class ApiServicesClass {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:3001';
  }
  getSpending() {
    return axios
      .get('spending')
      .then(response => response.data)
      .catch(error => error);
  }
  getIncome() {
    return axios
      .get('income')
      .then(response => response.data)
      .catch(error => error);
  }
  post(category, data) {
    return axios
      .post(category, data)
      .then(response => response.data)
      .catch(error => error);
  }
  patch(category, data, id) {
    return axios
      .patch(`${category}/${id}`, data)
      .then(response => response.data)
      .catch(error => error);
  }
  getSpendingOpts() {
    return axios
      .get('spending-opts')
      .then(response => response.data)
      .catch(error => error);
  }
  getIncomeOpts() {
    return axios
      .get('income-opts')
      .then(response => response.data)
      .catch(error => error);
  }
  postOpts(category, data) {
    return axios
      .post(`${category}-opts`, data)
      .then(response => response.data)
      .catch(error => error);
  }
  patchOpts(category, data, id) {
    return axios
      .patch(`${category}-opts/${id}`, data)
      .then(response => response.data)
      .catch(error => error);
  } 
}
