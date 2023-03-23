const { csv_to_json } = require('./utils')
var DbConnection = require('./db');

async function create_table() {
    const create_query = `
        CREATE TABLE if not exists public.users (
            "name" varchar NOT NULL,
            age int4 NOT NULL,
            address jsonb NULL,
            additional_info jsonb NULL,
            id serial4 NOT NULL
        );
    `;

    const truncate_query = `
        truncate table public.users;
    `;

    try {
        let db = await DbConnection.Get();
        db.query(create_query, (err, res) => {
            console.log(err, res)
        });

        db.query(truncate_query, (err, res) => {
            console.log(err, res)
            db.end()
        });
    } catch (e) {
        return e;
    }
}

create_table()

console.log(process.env.CSV_FILE_PATH)
const jsonData = csv_to_json(process.env.CSV_FILE_PATH, false)