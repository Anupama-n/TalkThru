'use server';
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams){
    const { uid, name, email} = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return{
                success: false,
                message: "User already exists."
            }
        }
        await db.collection('users').doc(uid).set({
            name,
            email,
        })
        return {
            success: true,
            message: "User created successfully."
        }

    }catch (e: any) {
        console.error('Error creating a user', e);
        if (e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: "This email is already in use."
            };
        }

        return {
            success: false,
            message: "Something went wrong."
        };
    }

}

export async function signIn(params: SignInParams){
    const { email, idToken } = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return {
                success: false,
                message: "User does not exist."
            }
        }
        await setSessionCookie(idToken);

        return {
            success: true,
            message: "Signed in successfully."
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: "something went wrong."
        }
    }


}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000,
    })
    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })
}