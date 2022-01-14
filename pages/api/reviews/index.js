import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { createRoomReview, deleteReview, getRoomReviews } from '../../../controllers/roomControllers';
import onError from '../../../middleware/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../middleware/auth'

const handler = nc({ onError });

dbConnect()
handler.use(isAuthenticatedUser).post(createRoomReview)

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(getRoomReviews)


handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .delete(deleteReview)

export default handler