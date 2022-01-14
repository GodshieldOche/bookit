import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'
import onError from '../../../../middleware/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middleware/auth'
import { deleteBooking } from '../../../../controllers/bookingControllers'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .delete(deleteBooking)

export default handler;