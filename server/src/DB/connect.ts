import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();
let schemaeName = process.env.DATABASE_NAME
let username = process.env.USER_NAME_DATABASE
let password = process.env.PASSWORD_DATABASE

const sequelize = new Sequelize(schemaeName as string, username as string, password as string, {
    host: 'localhost',
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

 export async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      console.log("All models were synchronized successfully.");
    } catch (error) {
      console.error('Unable to connect to the database:', error, schemaeName, username, password);
    }
  }


export default sequelize