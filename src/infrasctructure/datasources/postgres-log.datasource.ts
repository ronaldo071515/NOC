import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entiy";

const prismaClient = new PrismaClient();


const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}


export class PostgresLogDatasource implements LogDatasource {
    
    async saveLog(log: LogEntity): Promise<void> {
        
        const level = severityEnum[log.level];

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level
            }
        })
        // await newLog.save();
        console.log('Postgres Log Created', newLog.id);
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = severityEnum[severityLevel];

        const dbLogs = await prismaClient.logModel.findMany({
            where: {
                level
            }
        });
        return dbLogs.map( LogEntity.fromObject );
        // return dbLogs.map( postgreslog => LogEntity.fromObject(postgreslog) );
    }

}