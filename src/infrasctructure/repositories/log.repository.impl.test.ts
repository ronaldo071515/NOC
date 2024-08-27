import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './log.repository.impl'



describe('Test in LogRepositoryImpl.ts', () => {
    
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepositoryImpl = new LogRepositoryImpl( mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('saveLog should call the datasource with arguments', async () => {

        const log = { level: LogSeverityLevel.low, message: 'Hola', origin:'logrepository.impl.test.ts', createdAt: new Date() } as LogEntity;
        await logRepositoryImpl.saveLog(log);
        expect( mockLogDatasource.saveLog ).toHaveBeenCalledWith( log );

    });
    
    
    test('getLogs should call the datasource with arguments', async () => {

        const severityLog = LogSeverityLevel.low;
        await logRepositoryImpl.getLogs( severityLog );
        expect( mockLogDatasource.getLogs ).toHaveBeenCalledWith( severityLog );

    })

})