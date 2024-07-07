
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV:string
        // App
        PORT:number
        // Db
        DB_TYPE: string;
        DB_HOST: string;
        DB_PASSWORD: string;
        DB_USERNAME: string;
        DB_PORT: number;
        DB_NAME: string;
        // Secret key
        JWT_TOKEN_SECRET:string
    }
}