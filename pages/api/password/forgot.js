import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { forgotPassword } from '../../../controllers/authControllers';
import onError from '../../../middleware/errors'


const handler = nc({ onError });

dbConnect()

handler.post(forgotPassword)

export default handler;