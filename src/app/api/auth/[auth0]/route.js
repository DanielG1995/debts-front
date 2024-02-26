import { mutationLogin } from '@/app/lib/querys/users';
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import request from 'graphql-request';

const afterCallback = async (req, session) => {

    try {
        const graphqlUser = {
            email: session.user.email,
            img: session.user.picture,
            name: session.user.name
        }
       
        const response = await request(process.env.BASE_URL, mutationLogin, { loginInput: graphqlUser });
        session.user._id=response.login.user.id
    } catch (error) {
        console.error(error)
    }

    return session

};

export const GET = handleAuth({
    callback: handleCallback({ afterCallback }),


});
