const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const usersRoutes = require("./routes/user.routes");
const connectDB = require("./configs/database.js");

dotenv.config()
const app = express();

const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };
  app.use(cors(corsOptions));

const PORT = process.env.PORT || 3001;

connectDB(process.env.MONGO_URI)

app.use(express.json());
app.use("/users", usersRoutes);



app.get("/", (req, res) => {
    res.status(200).json({ message: "server is up and running" });
});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});