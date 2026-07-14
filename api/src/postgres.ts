import {Pool} from 'pg';

const pool = new Pool({
    user:'mediaflow_dev',
    host:'postgresql.selfmade.ninja',
    database:'mediaflow_dev_db',
    password:'Qwaszxopklnm06#',
    port: 5432,
})

export default pool;