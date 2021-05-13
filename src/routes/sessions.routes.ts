import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService';
import usersRouter from './users.routes';


const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();
    const { user, token } = await authenticateUser.execute({
        email,
        password
    });
    const userview = {
        name: user.name,
        email,
        created_at: user.created_at,
        id: user.id,
        updated_at: user.updated_at,
    }

    return response.json({ userview, token });
})

export default sessionsRouter;

