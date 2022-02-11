import nc from 'next-connect'
import { deleteRoom, getSingleRoom, updateRoom } from '../../../controllers/roomControllers'
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middleware/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../middleware/auth';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '100mb',
        },
    },
}

const handler = nc({onError})

dbConnect()
handler.get(getSingleRoom)
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateRoom)
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteRoom)


export default handler