const { Client } = require('pg');
const client = new Client({
  user: 'postgres',        
  host: 'localhost',
  database: 'user',            
  password: 'a123123',     
  port: 5432,                 
});

client.connect(err => {
  if (err) throw err;
  console.log(' Đã kết nối tới cơ sở dữ liệu PostgreSQL')
  client.query('SELECT * FROM nguoi_dung', (err, res) => {
    if (err) throw err;

    console.log('Danh sách nguoi_dung:');
    console.table(res.rows); 
c
    client.end(); 
  });
});
