import 'reflect-metadata'
import express from 'express';
import routes from './routes'
import appointmentRoutes from './routes/appointments.routes'

import './database';

const app = express();

app.use(express.json());
app.use('/', routes);
app.use('/appointments', appointmentRoutes)

app.listen(3333, () => {
    console.log('Server started on port 3333')
})