//termina llegando a la bd, es quien gobierna nuestra app cuando se quiere interacturar con la BD

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface logEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    //titne lo que nosotros queremos guardar en BD
    public level: LogSeverityLevel;
    public message: string;
    public origin: string;
    public createdAt: Date;

    constructor(options: logEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    // método de la entidad que me permite crear instancias del json
    static fromJson = (json: string): LogEntity => {
        
        json = (json === ' ') ? '{}' : json;

        const { message, level, createdAt, origin } = JSON.parse( json );
        
        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt
        });
        return log;
    }

    static fromObject = (object: { [key: string]: any }):LogEntity => {
        const { message,level,createdAt,origin } = object;
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        });
        return log;
    }

}