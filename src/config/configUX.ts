import { Urgency } from "../types/types";

const configUX = {
    urgencyToRound : {
        high : 3,
        med : 2,
        low : 1

    } as Record<Urgency, number>
}

export default configUX;