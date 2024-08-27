import { CronService } from "./cron-service"


describe('Test in cron-service.ts', () => {

    const mockTick = jest.fn();

    //jes.clearAllMocks

    test('shuld create a job', (done) => {

        const job = CronService.createJob('* * * * * *', mockTick);

        setTimeout(() => {

            expect(mockTick).toHaveBeenCalledTimes(2);

            job.stop();
            
            done();
        }, 2000);

    })

})