const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});
connection.connect();
const select_queries = [
  "select name from country where Population>8000000",
  "select name from country where Name like '%land%' ",
  "select name from city where Population between 500000 and 1000000",
  "select name from country where Continent='europe' ",
  "select name from country order by SurfaceArea desc ",
  "select name from city where CountryCode=(select code from country where name='Netherlands')",
  "select population from city where Name='Rotterdam' ",
  "select name from country order by SurfaceArea desc limit 10",
  "select name from city order by Population desc limit 10",
  "select sum(population) from country ",
];

select_queries.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(`Query${select_queries.indexOf(query) + 1}: `, result);
  });
});
connection.end();
