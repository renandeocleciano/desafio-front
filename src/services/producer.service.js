import http from '../commons/httpAxios';

class ProducerService {
  
  getAll() {
    return http.get('/producers');
  }

  get(id) {
    return http.get(`/producers/${id}`);
  }

  getGroupedBy(column) {
    return http.get(`/producers/dashboard/?column=${column}`);
  }

  create(data) {
    return http.post('/producers', data);
  }

  update(id, data) {
    return http.put(`/producers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/producers/${id}`);
  }

}

export default new ProducerService();
