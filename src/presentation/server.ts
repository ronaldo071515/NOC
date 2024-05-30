import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrasctructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrasctructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

//instancia de las implementaciones repository
const fileSytemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

export class Server {
    
    public static start() {
        console.log('Server started...');

        // TODO: enviar emails

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