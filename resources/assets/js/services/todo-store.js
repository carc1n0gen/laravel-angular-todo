export default {
    list() {
        return axios.get('/api/todos')
            .then(res => res.data);
    },

    create(name) {
        return axios.post('/api/todos', { name })
            .then(res => res.data);
    },

    update(id, fields) {
        return axios.patch(`/api/todos/${id}`, fields)
            .then(res => res.data)
    },

    delete(id) {
        return axios.delete(`/api/todos/${id}`);
    }
};