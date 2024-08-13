# Proyecto NOC

El objetivo es crear una serie de tareas usando arquitectura limpia con Typescript

# dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando ```npm install```.
4. Levantar las bases de datos con el comando
    ```
    docker compose up -d
    ```
5. Eecutar el comando
    ```
    npx prisma dev
    ```
6. Ejecutar ```npm run dev```



# Notas
Crear una colección = tabla y documento = registro
```
const newLog = await LogModel.create({
    message: 'Test Message, desde mongo',
    origin: 'app.ts',
    level: 'low'
});
await newLog.save();
console.log(newLog);
```
``const logs = await LogModel.find();``
``console.log(logs[1].message);``