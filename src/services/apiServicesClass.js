import axios from 'axios';
export default class ApiServicesClass {
  constructor() {
    // axios.defaults.baseURL = 'http://localhost:3001';
    axios.defaults.baseURL = 'https://patronusv-goit-hw-07-phonebook-default-rtdb.firebaseio.com/';
  }
  convertData = data => {
    return !data ? [] : Object.entries(data).map(([id, item]) => ({ ...item, id }));
  };
  convertItem = (item, id) => {
    return { ...item, id };
  };
  getSpending() {
    return axios
      .get('spending.json')
      .then(response => this.convertData(response.data))
      .catch(error => error);
  }
  getIncome() {
    return axios
      .get('income.json')
      .then(response => this.convertData(response.data))
      .catch(error => error);
  }
  post(category, data) {
    return axios
      .post(`${category}.json`, data)
      .then(response => this.convertItem(data, response.data.name))
      .catch(error => error);
  }
  patch(category, data, id) {
    return axios
      .patch(`${category}/${id}.json`, data)
      .then(response => this.convertItem(response.data, id))
      .catch(error => error);
  }
  delete(category, id) {
    return axios
      .delete(`${category}/${id}.json`)
      .then(response => {
        if (response.data === null) {
          return id;
        }
      })
      .catch(error => error);
  }
  getSpendingOpts() {
    return axios
      .get('spending-opts.json')
      .then(response => this.convertData(response.data))
      .catch(error => error);
  }
  getIncomeOpts() {
    return axios
      .get('income-opts.json')
      .then(response => this.convertData(response.data))
      .catch(error => error);
  }
  postOpts(category, data) {
    return axios
      .post(`${category}-opts.json`, data)
      .then(response => this.convertItem(data, response.data.name))
      .catch(error => {
        throw new Error(error);
      });
  }
  patchOpts(category, data, id) {
    return axios
      .patch(`${category}-opts/${id}.json`, data)
      .then(response => this.convertItem(response.data, id))
      .catch(error => error);
  }
  deleteOpts(category, id) {
    return axios
      .delete(`${category}-opts/${id}.json`)
      .then(response => {
        if (response.data === null) {
          return id;
        }
      })
      .catch(error => error);
  }
}
