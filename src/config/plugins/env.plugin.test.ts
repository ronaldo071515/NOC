import { envs } from "./env.plugin";


describe('envs.plugin.ts', () => {

    test('should return env options', () => {

        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'caceresderonaldo2015@gmail.com',
            MAILER_SECRET_KEY: 'obnlbewzmmvhckbo',
            PROD: true,
            MONGO_URL: 'mongodb://ronaldo:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'ronaldo',
            MONGO_PASS: '123456789'
          })

    })

    test('should return error if not found env', async () => {
        jest.resetModules();//asegurar que se resetee el modulo
        process.env.PORT = 'ABC';
        console.log(envs);

        try {
            await import('./env.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain(`"PORT" should be a valid integer`)
        }

    })

})