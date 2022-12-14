import { NextApiResponse } from "next";
import type { User, UserOpaque} from "../types/types"
import serverConfig from "../config";
import jwt from 'jsonwebtoken'

function createJWT (user : User) {
    const {keyGeneratingJWT, issuer, expireTime} = serverConfig.jwt;
    const expires = new Date(Date.now() + expireTime)
    try {
        const token = jwt.sign({...user, password : undefined} as UserOpaque, keyGeneratingJWT, {
            algorithm : "HS256",
            expiresIn : "1d", issuer
        })
        return {error : null, response : token}
    }
    catch (error) {
        return {error, response : undefined}
    }
}

export default createJWT;