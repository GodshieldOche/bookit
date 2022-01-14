import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import User from '../../../models/user'
import dbConnect from '../../../config/dbConnect'


export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                dbConnect()
                const { email, password } = credentials;

                // check if email and password is entered
                if (!email || !password) {
                    throw new Error('Please enter email and password')
                }

                // find the email and password in the database
                const user = await User.findOne({ email })
                
                if (!user) {
                    throw new Error('Invalid email or Password')
                }
                const isPasswordMatch = await bcrypt.compare(password, user.password)

                if (!isPasswordMatch) {
                    throw new Error('Invalid email or Password')
                }

                return Promise.resolve(user)
            }
        })
    ],
    callbacks: {
        async jwt ({token, user}) {
            user && (token.user = user)
            return token
        },
        async session ({session, token}) {
            session.user = token.user
            return session
        }
    }
})