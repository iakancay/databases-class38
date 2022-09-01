import mysql from "mysql";
const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    //QUERY For Injection
    `SELECT Population FROM ${Country} WHERE Name = ${name} and code = ${code}`,
    //`SELECT Population FROM ${Country} WHERE Name = ? and code = ?`,
    // [name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}
conn.connect();
//getPopulation("country", `Turkey`, `TUR`, console.log);
// For injection values
getPopulation("country", `'Turkey' or 1=1`, `'TUR' or 1=1`, console.log);
conn.end();
