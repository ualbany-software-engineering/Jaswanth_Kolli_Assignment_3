const express = require('express');
const cors = require("cors");
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3005;
const userRouter = require('./Routes/v1/users.route');
const { dbConnect, connectToServer } = require('./Utils/dbConnect');
const jwt = require('jsonwebtoken');
// using middlewire
const corsConfig = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))
app.use(express.json());

connectToServer((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } else {
        console.log(err);
    }
});


app.use('/api/v1/users', userRouter);


app.get('/', (req, res) => {
    res.send('Hello World!')
})