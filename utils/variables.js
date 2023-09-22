import dotenv from "dotenv";

dotenv.config({
    path: new URL("../"+process.env.NODE_ENV, import.meta.url)
})

const variables= {
    EXPRESS_HOST: process.env.EXPRESS_HOST,
    EXPRESS_PORT: process.env.EXPRESS_PORT,
    MONGO_INSTANCE: process.env.MONGO_INSTANCE,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    TOKEN_SECRETO: process.env.TOKEN_SECRETO
}

export {variables}