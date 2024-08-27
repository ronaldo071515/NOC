import { LogEntity } from "../../entities/log.entity"
import { SendEmailLogs } from "./send-email-logs"



describe('SendEmailLogs Use Case', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    
    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call sendEmail and saveLog', async () => {

        const result = await sendEmailLogs.execute('rtorres66@misena.edu.co');

        expect( result ).toBe(true);
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith({
            createdAt: expect.any( Date ),
            level: "low",
            message: "Log email sent",
            origin: "send-email-logs.ts",
        });
        
    });


    test('should log in case of error', async () => {

        //sobreescribir el mock del emalservice
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('rtorres66@misena.edu.co');

        expect( result ).toBe(false);
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith({
            createdAt: expect.any( Date ),
            level: "high",
            message: "Error: Email log not sent",
            origin: "send-email-logs.ts",
        });
        
    })


})