import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'
import onError from '../../../../middleware/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middleware/auth'
import { allAdminUsers } from '../../../../controllers/authControllers'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(allAdminUsers)

export default handler;