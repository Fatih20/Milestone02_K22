import next, { NextApiRequest } from "next";
import { NextApiResponseWithLocals } from "../types/types";
import type { UserOpaque } from "../types/types"
import serverConfig from "../config";
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";


export default async function extractJWT (req : NextApiRequest, res : NextApiResponseWithLocals, next : any) {
    const {jwt : {keyGeneratingJWT}, cookieSettings} = serverConfig;
    let token = req.cookies.token;

    res.locals = {};
    if (token) {
        token = token as string;
        jwt.verify(token, keyGeneratingJWT, (error, user) => {
            if (!error) {
                res.locals.user = user as UserOpaque;
            } else { 
                res.locals.user = undefined;
            }
        }) 
        return next();
    }

    res.locals.user = undefined;
    return next();
}