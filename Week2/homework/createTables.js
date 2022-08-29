export const createAuthorsTable = `
CREATE TABLE IF NOT EXISTS authors(
    author_no INT PRIMARY KEY,
    author_name VARCHAR(50),
    university VARCHAR(60), 
    date_of_birth DATE, 
    h_index INT, 
    gender  ENUM('M','F','O')
)`;
export const createResearchPapersTable = `
CREATE TABLE IF NOT EXISTS research_papers(
    paper_id INT PRIMARY KEY, 
    paper_title TEXT, 
    conference BOOLEAN, 
    publish_date DATE
)
`;
export const createJunctionTable = `
CREATE TABLE IF NOT EXISTS authors_papers(
    id INT PRIMARY KEY,
    author_no INT,
    paper_id  INT,
    FOREIGN KEY (author_no) REFERENCES authors(author_no),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
)`;
export const alterAuthorsTable = `ALTER TABLE authors
ADD mentor INT,
ADD FOREIGN KEY (mentor) REFERENCES authors(author_no);
`;
