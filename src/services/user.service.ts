import connection from "@/configs/database";
import { MysqlError } from "mysql";
import User from "@/types/user";

const getUsers = async () => {
    return new Promise<User[]>((resolve, reject) => {
        try {
            connection.connect();
            connection.query(
                "select * from users",
                function (error: MysqlError, results: User[]) {
                    if (error) {
                        console.log("Mysql Error: ", error.sqlMessage);
                        reject(error.message)
                        connection.end();
                    }

                    resolve(results)
                }
            );
            connection.end();
        } catch {
            connection.end()
        }
    })
}

const insertUser = async () => {

}

export { getUsers }