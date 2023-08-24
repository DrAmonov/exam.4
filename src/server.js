require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config.js');

// Initialize Express app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.error(err));

// Define routes
// const authRoutes = require('./routes/auth.js');
const departmentsRoutes = require('./routes/departments.js');
const directionsRoutes = require('./routes/directions.js');
const positionsRoutes = require('./routes/positions.js');
const centersRoutes = require('./routes/centers.js');
const groupsRoutes = require('./routes/groups.js');
const usersRoutes = require('./routes/users.js');
const checksRoutes = require('./routes/checks.js');
const incomesRoutes = require('./routes/incomes.js');
const outlaysRoutes = require('./routes/outs.js');

// app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentsRoutes);
app.use('/api/directions', directionsRoutes);
app.use('/api/positions', positionsRoutes);
app.use('/api/centers', centersRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/checks', checksRoutes);
app.use('/api/incomes', incomesRoutes);
app.use('/api/outlays', outlaysRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
