import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrasctructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrasctructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { envs } from "../config/plugins/env.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { LogRepository } from '../domain/repository/log.repository';
import { MongoLogDatasource } from "../infrasctructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entiy";
import { PostgresLogDatasource } from "../infrasctructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

//instancia de las implementaciones repository
const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    // new MongoLogDatasource()
    // new PostgresLogDatasource(),
);
const mongoLogRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    new MongoLogDatasource()
    // new PostgresLogDatasource(),
);
const pgLogRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    // new MongoLogDatasource()
    new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {
    
    public static async start() {
        console.log('Server started...');

        // console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);
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

        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);

        // const logs = await logRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs);


        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://google.com'
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, pgLogRepository],
                    // undefined,
                    // undefined,
                    () => console.log(`${url} is Ok`),
                    (error) => console.log(error)
                ).execute( url );
                // new CheckService().execute('http://localhost:3000');
            }
        );
    }

}