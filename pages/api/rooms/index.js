import nc from 'next-connect'
import { allRooms, newRoom } from '../../../controllers/roomControllers'
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middleware/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../middleware/auth';


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}

const handler = nc({onError});

dbConnect()
handler.get(allRooms)
handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .post(newRoom)


export default handler 