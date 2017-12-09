const path = require("path");
const router = require("express").Router();
const userConstructor = require("../controllers/userController")
/*const articleController = require("../controllers/articleController");

router.route("/api")
  .get(articleController.findAll)
  .post(articleController.create)
  .delete(articleController.remove);

router.route("/api/:title")
	.delete(articleController.remove)
*/
// If no API routes are hit, send the React app
router.use(function(req, res) 
{
  	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
