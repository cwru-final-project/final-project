import axios from "axios";

export default {

	login: function(email)
	{
		console.log("Getting email!")
		return axios.get("/login/"+email);
	},

/*  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }*/
};