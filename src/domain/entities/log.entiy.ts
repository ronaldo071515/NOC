//termina llegando a la bd, es quien gobierna nuestra app cuando se quiere interacturar con la BD

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class LogEntity {
    //titne lo que nosotros queremos guardar en BD
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    // método de la entidad que me permite crear instancias del json
    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse( json );
        
        const log = new LogEntity(message,level);
        log.createdAt = new Date(createdAt);
        return log;
    }

}