const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
  // port : 3307
});
connection.connect();
let create_query = [
  "create table if not exists Invitee(invitee_no int,invitee_name text,invited_by text)",
  "create table if not exists Room(room_no int,room_name text,floor_name text)",
  "create table if not exists Meeting(meeting_no int,meeting_title text,starting_time Time,ending_time Time,room_no int)",
];

let insert_query = [
  "delete from Invitee",
  "delete from Room",
  "delete from Meeting",
  "insert into Invitee values(1,'Fede','ibrahim')",
  "insert into Invitee values(2,'Wouter','ibrahim')",
  "insert into Invitee values(3,'Rob','Fede')",
  "insert into Invitee values(4,'Unmesh','Fede')",
  "insert into Invitee values(5,'Bilal','Unmesh')",
  "insert into Room values(101,'Room1',1)",
  "insert into Room values(102,'Room2',1)",
  "insert into Room values(203,'Room3',2)",
  "insert into Room values(201,'Room4',2)",
  "insert into Room values(301,'Room5',3)",
  "insert into Meeting values(1,'Holiday','10:00','12:00',101)",
  "insert into Meeting values(2,'Companies Relation','13:00','14:00',201)",
  "insert into Meeting values(3,'Curriculum','09:00','12:00',301)",
  "insert into Meeting values(4,'Graduation','15:00','17:00',203)",
  "insert into Meeting values(5,'New Classes','10:00','11:00',102)",
];

create_query.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("table created");
  });
});

insert_query.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("data added into tables");
  });
});

connection.end();
