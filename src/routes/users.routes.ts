import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)


usersRouter.post('/', async (request, response) => {
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
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename
    })
    return response.json(user)

})

export default usersRouter;

