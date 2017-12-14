import axios from "axios";

export default {

	login: function(data)
	{
		console.log("Getting email!")
		return axios.get(`/login/${data.email}/${data.password}`);
	},

	register: function(data)
	{
		return axios.post(`/register`, data);
	},

	findOneByToken: function(data)
	{
		return axios.get(`/find/${data.token}`)
	}

/*  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }*/
};