import { cleanEnv, port, str, url } from "envalid";

const env = cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
    ALLOWED_ORIGINS: str(),
})

export default env
