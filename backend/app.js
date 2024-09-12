const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const operationRoutes = require('./routes/operations');
const cors = require('cors');
const cookieParser = require('cookie-parser');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/operations', operationRoutes);

app.get('/api', (req, res) => {
    console.log("send working");
    res.status(200);
    res.send('Backend is working');
});

const PORT =  5000;
app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));
