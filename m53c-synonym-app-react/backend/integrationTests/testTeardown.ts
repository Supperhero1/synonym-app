import 'tsconfig-paths/register';

const teardown = () => {
    if(!(global as any).M53C_TEST_SERVER_INSTANCE) {
        throw new Error('Jest setup error, attempting to tear down but no server reference present')
    }

    (global as any).M53C_TEST_SERVER_INSTANCE.close()
}

export default teardown
