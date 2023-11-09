require('dotenv').config()
import 'tsconfig-paths/register';
import app from "@/expressApp";

const setup = () => {
    if((global as any).M53C_TEST_SERVER_INSTANCE) {
        throw new Error('Jest setup error, global variable occupied')
    }

    (global as any).M53C_TEST_SERVER_INSTANCE = app.listen(4002)
}

export default setup
