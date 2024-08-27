import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";


describe('logDataSource', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'Message test',
        level: LogSeverityLevel.low
    })

    //preparar mock para la clase abstrac
    class MockLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }
    
    test('Should test the abstract class', async() => {

        const mockLogDatasource = new MockLogDatasource();

        expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );
        expect( typeof mockLogDatasource.saveLog ).toBe('function');
        expect( typeof mockLogDatasource.getLogs ).toBe('function');

        await mockLogDatasource.saveLog(newLog);

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf( LogEntity );

    })

})