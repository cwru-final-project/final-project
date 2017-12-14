import axios from "axios";

export default {

	login: function(data)
	{
		return axios.get(`/login/${data.email}/${data.password}`);
	},

	register: function(data)
	{
		return axios.post(`/register`, data);
	},

	findOneByToken: function(data)
	{
		return axios.get(`/find/${data.token}`)
	},

	updateRoom: function(data)
	{
		return axios.post(`/updateroom`, data)
	},

	findAllByRoom: function(data)
	{
		return axios.get(`/findallbyroom/${data}`)
	},

	postMessage: function(data)
	{
		return axios.post(`/message`, data)
	},

	findAllMessages: function(data)
	{
		return axios.get(`/findallmessages/${data}`);
	}
};