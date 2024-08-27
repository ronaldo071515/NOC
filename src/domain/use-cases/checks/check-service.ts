import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
//caso de uso
interface CheckServiceUseCase {
    execute(url: string):Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    /* inject dependencies */
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) {}

    async execute(url: string):Promise<boolean> {
        try {
            const req = await fetch( url );
            if( !req.ok ) {
                throw new Error(`Error on check seervice ${ url }`);
            }
            const log = new LogEntity({
                level: LogSeverityLevel.low, 
                message: `Service ${ url } working`, 
                origin: __filename.slice(__dirname.length + 1) 
            });

            this.logRepository.saveLog( log )
            this.successCallback && this.successCallback();

            return true;
        } catch (error) {
            const errorMessage = `${ url } is not ok, ${ error }`
            const log = new LogEntity({
                level: LogSeverityLevel.high, 
                message: `Service ${ url } working`, 
                origin: __filename.slice(__dirname.length + 1)  
            });
            this.logRepository.saveLog( log );
            
            this.errorCallback && this.errorCallback(`${ errorMessage }`);
            return false;
        }
    }

}