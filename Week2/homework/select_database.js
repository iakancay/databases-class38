import mysql from "mysql";
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "researchers_db",
});

connection.connect();
const selectQueries = [
  {
    view: "names of all authors and their corresponding mentors",
    queryText: `SELECT a.author_name AS mentor_name,authors.author_name 
        FROM authors AS a
        JOIN authors ON a.author_no=authors.mentor`,
  },
  {
    view: "all columns of authors and their published paper_title",
    queryText: `SELECT a.author_no, a.author_name,p.paper_title 
        FROM authors AS a
        LEFT JOIN authors_papers AS ap ON a.author_no=ap.author_no
        LEFT JOIN research_papers AS p ON ap.paper_id=p.paper_id 
        ORDER BY a.author_no`,
  },
  {
    view: "All research papers and the number of authors that wrote that paper.",
    queryText: `SELECT p.paper_title,COUNT(ap.author_no) 
        FROM research_papers AS p
        JOIN authors_papers AS ap ON ap.paper_id=p.paper_id 
        GROUP BY(p.paper_title)`,
  },
  {
    view: "Sum of the research papers published by all female authors.",
    queryText: `SELECT  count(distinct(p.paper_title)) 
        FROM authors AS a
        JOIN authors_papers AS ap ON ap.author_no=a.author_no 
        JOIN research_papers AS p ON ap.paper_id=p.paper_id
        WHERE gender='F'; `,
  },
  {
    view: "Average of the h-index of all authors per university.",
    queryText: `SELECT  AVG(h_index),university 
        FROM authors 
        GROUP BY university;`,
  },
  {
    view: "Sum of the research papers of the authors per university.",
    queryText: `SELECT  a.university,count(p.paper_title)
        FROM authors AS a
        JOIN authors_papers AS ap ON a.author_no=ap.author_no
        JOIN research_papers AS p ON ap.paper_id=p.paper_id
        GROUP BY a.university `,
  },
  {
    view: "Minimum and maximum of the h-index of all authors per university.",
    queryText: `SELECT  university,min(h_index),max(h_index)
         FROM authors
         GROUP BY university `,
  },
];
selectQueries.forEach((query) => {
  connection.query(query.queryText, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(query.view);
    console.table(results);
  });
});
connection.end();
