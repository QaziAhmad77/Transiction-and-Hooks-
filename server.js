const express = require('express');
const app = express();
require("./models/index");
const userRouter = require("./routes/user")
const port = process.env.port || 3000;

app.use(express.json());

app.use("/users", userRouter);

app.use((req, res) => {
    return res.status(404).send("Error 404, Route not found");
  });

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

