const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

//catch all routes that are not caught in 'public' - e.g localhost:3000/create
app.get("*", (req, res) => {
	res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
	console.log("Express server is up");
});
