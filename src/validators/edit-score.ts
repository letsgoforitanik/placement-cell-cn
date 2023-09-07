import { z } from "zod";

function preprocess(val: any) {
    return {
        id: val.id,
        dsa: val.dsa === '' ? null : Number(val.dsa),
        webd: val.webd === '' ? null : Number(val.webd),
        react: val.react === '' ? null : Number(val.react)
    }
}

const zunion = z.union([z.null(), z.number().nonnegative().lte(100)]);

const editScoreValidator = z.preprocess(preprocess, z.object({
    id: z.string().nonempty("Id field can't be blank"),
    dsa: zunion,
    webd: zunion,
    react: zunion
}));

export default editScoreValidator;