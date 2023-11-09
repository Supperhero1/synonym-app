import { cleanEnv, port, str } from "envalid";

// this will throw errors if the env variables are malformed or undefined
const env = cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
    ALLOWED_ORIGINS: str(),
})

export default env
