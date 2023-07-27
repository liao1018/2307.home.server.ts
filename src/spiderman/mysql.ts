import mysql, { RowDataPacket } from "mysql2/promise";

interface Database {
  connect(): Promise<void>;
  query(sql: string): Promise<RowDataPacket>;
}

const createDatabase = (): Database => {
  let connection: mysql.Connection;

  const connect = async (): Promise<void> => {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "sa730919",
      database: "home",
    });
  };

  const query = async (sql: string): Promise<RowDataPacket> => {
    const [result] = (await connection.query(sql)) as RowDataPacket[];
    return result;
  };

  return {
    connect,
    query,
  };
};

export default createDatabase;
