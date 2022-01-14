import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'

import { allAdminRooms } from '../../../../controllers/roomControllers'

import onError from '../../../../middleware/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middleware/auth'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(allAdminRooms)

export default handler;