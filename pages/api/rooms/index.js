import nc from 'next-connect'
import { allRooms, newRoom } from '../../../controllers/roomControllers'
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middleware/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../middleware/auth';

const handler = nc({onError});

dbConnect()
handler.get(allRooms)
handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .post(newRoom)


export default handler 