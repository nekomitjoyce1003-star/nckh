import dotenv from "dotenv";
dotenv.config();

console.log("DB1:", process.env.PG1_DATABASE);
console.log("DB2:", process.env.PG2_DATABASE);
