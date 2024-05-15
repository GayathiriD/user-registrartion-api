import express from "express";
import router from './router/userrouter'
const port = process.env.PORT || 3000;
import './db/index'
const app = express();

app.use(express.json());

app.use('/api/users', router);

app.listen(port, () => {
    console.log( 'Server is running on port 3000');
})