import { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseWithLocals, UserOpaque } from "../types/types";
import prisma from "../utils/prisma";

export async function myAlarm (req : NextApiRequest, res : NextApiResponseWithLocals) {
    const {user_id : userId} = res.locals.user as UserOpaque

    const userAlarms = await prisma.alarm.findMany({
       where : {
        owner_id : userId
       }
    })

    return res.status(200).send({message: "Alarm fetched", response : userAlarms})
}

export async function createAlarm (req : NextApiRequest, res : NextApiResponseWithLocals) {
    const {user_id} = res.locals.user as UserOpaque
    const {Title, Description, Difficulty, Hour, Minute} = req.body;

    const existingAlarm = await prisma.alarm.findFirst({
        where : {
         owner_id : user_id,
         Hour,
         Minute
        }
     })

     if (existingAlarm) {
        return res.status(400).send({message : "Alarm already exists"})
     }

    const createdAlarm = await prisma.alarm.create({
        data : {
            owner_id : user_id,
            Title,
            Description,
            Difficulty,
            Minute,
            Hour 
        }
    })

    return res.status(200).send({message: "Alarm created", response : createdAlarm})

}

export async function deleteAlarm (req : NextApiRequest, res : NextApiResponseWithLocals) {
    const {alarmId} = req.body;

    const alarmToDelete = await prisma.alarm.findUnique({
        where : {
            alarm_id : alarmId
        }
    })

    if (alarmToDelete === undefined || alarmToDelete === null) {
        return res.status(200).send({message : "Alarm doesn't exist", error : "alarmNotExist"})
    }

    const deletedAlarm = await prisma.alarm.delete({
        where : {
            alarm_id : alarmId
        }
    })

    return res.status(200).send({message: "Alarm deleted", response : deletedAlarm})
}
