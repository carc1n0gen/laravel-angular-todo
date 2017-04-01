export default {
	currentUser() {
		return axios.get('/api/current-user')
			.then(res => res.data);
	},

	logout() {
		return axios.post('/logout')
			.then(() => window.location = '/login');
	},

	status() {
		return axios.get('/status');
	}
}