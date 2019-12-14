import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  return axios.get(baseUrl);
}

const create = newObject => {
  return axios.post(baseUrl, newObject);
}

const update = (id, newNumber) => {
  return axios.put(`${baseUrl}/${id}`, newNumber);
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`);
}

export default {
  getAll,
  create,
  update,
  deletePerson
}
