// repository = como vamos a llamar nuestro datasource
import { LogEntity, LogSeverityLevel } from "../entities/log.entiy";


export abstract class LogRepository { // se crea abstracta para que no se pueda crear instancias de la clase
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}