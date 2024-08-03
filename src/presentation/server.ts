import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrasctructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrasctructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { envs } from "../config/plugins/env.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { LogRepository } from '../domain/repository/log.repository';

//instancia de las implementaciones repository
const fileSytemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

const emailService = new EmailService();

export class Server {
    
    public static start() {
        console.log('Server started...');

        // console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);
        console.log('Server Started...');
        //TODO: enviar emails
        // new SendEmailLogs(emailService, fileSytemLogRepository).execute(['rtorres66@misena.edu.co'])
        // emailService.sendEmailWithFileSystemLogs(['rtorres66@misena.edu.co']);
        // emailService.sendEmail({
        //     to: 'rtorres66@misena.edu.co',
        //     subject: 'Hola',
        //     htmlBody: `
        //         <h3>Hola Mundo, mail desde nodemailer</h3>
        //         </p>Pariatur ad reprehenderit Lorem non minim irure enim quis exercitation.<p/>
        //         <p>Ver los adjuntos...</p>
        //     `
        // });

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'http://google.com'
        //         new CheckService(
        //             fileSytemLogRepository,
        //             // undefined,
        //             // undefined,
        //             () => console.log(`${url} is Ok`),
        //             (error) => console.log(error)
        //         ).execute( url );
        //         // new CheckService().execute('http://localhost:3000');
        //     }
        // );
    }

}