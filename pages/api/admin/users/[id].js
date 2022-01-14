import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'
import onError from '../../../../middleware/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middleware/auth'
import { deleteUser, getUserDetails, updateUser } from '../../../../controllers/authControllers'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(getUserDetails)
handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .put(updateUser)
handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .delete(deleteUser)

export default handler;