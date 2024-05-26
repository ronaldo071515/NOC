//datasources = contiene los origenes de los datos
import { LogEntity, LogSeverityLevel } from "../entities/log.entiy";


export abstract class LogDatasource { // se crea abstracta para que no se pueda crear instancias de la clase
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}