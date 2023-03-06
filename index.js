const express = require("express");
const cors = require("cors")
require("dotenv").config();

const app = express();
app.use(express.json());


// IMPORTANT IN DEV MODE
app.use(cors())
app.use(require("./middleware/header"));


require("./config/db/mongoose")(app);
require("./config/routes/rout-handler")(app);

app.listen(5000, () => {console.log("5000");});
