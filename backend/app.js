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
app.use(cookieParser);


app.use('/api/auth', authRoutes);
app.use('/api/operations', operationRoutes);

app.get('/api/test', (req, res) => {
    res.send('Backend is working');
});

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
