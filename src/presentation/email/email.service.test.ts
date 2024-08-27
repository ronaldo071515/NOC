import { EmailService, sendMailOptions } from './email.service';
import nodemailer from 'nodemailer';

describe('Test email.service.ts', () => {


    const mockSendMail = jest.fn();

    // mock al create transport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })

    const emailService = new EmailService();

    test('should send email', async() => {


        const options: sendMailOptions = {
            to: 'rtorres66@misena.edu.co',
            subject: 'test mail service',
            htmlBody: `<h1>Hola test</h1>`
        }

        const emailSent =await emailService.sendEmail( options );

        expect( mockSendMail ).toHaveBeenCalledWith({
            attachments: expect.any( Array ),
            html: `<h1>Hola test</h1>`,
            subject: 'test mail service',
            to: 'rtorres66@misena.edu.co',
        })

    })


    test('should send email with attachements', async() => {
        
        const email = 'rtorres66@misena.edu.co';
        await emailService.sendEmailWithFileSystemLogs( email );

        expect( mockSendMail ).toHaveBeenCalledWith({
            to: email,
            subject: 'Test mail service with attachements',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            ])
        });
        
    })

})