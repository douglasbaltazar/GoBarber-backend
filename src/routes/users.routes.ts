import { Router } from 'express'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body
        const createUser = new CreateUserService();
        const user = await createUser.execute({
            name,
            email,
            password
        });
        const userview = {
            name,
            email,
            created_at: user.created_at,
            id: user.id,
            updated_at: user.updated_at,
        }
        return response.json(userview);
    } catch(err) {
        return response.status(400).json({ error: err.message })
    }
})

export default usersRouter;

