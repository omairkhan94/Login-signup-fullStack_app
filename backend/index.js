const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const UserModel = require('./Models/User');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8070;


app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.get('/allusers', async (req, res) => {
    try {
        const allUsers = await UserModel.find({});
        res.status(200).json(allUsers); 
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users' }); 
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})