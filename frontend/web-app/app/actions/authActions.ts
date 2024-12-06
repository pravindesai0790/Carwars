'use server'

import { auth } from "@/auth"

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function getCurrentUser() {
    try {
        const session = await auth();

        if(!session) return null;

        return session.user;
    } catch (error) {
        return null;
    }
}