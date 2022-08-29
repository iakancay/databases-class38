const createFakeAuthors = (numberOfAuthors) => {
  const authors = [];

  for (let i = 1; i < numberOfAuthors + 1; i++) {
    authors.push({
      author_no: i,
      author_name: `Author${i}`,
      university: `University${(i % 6) + 1}`,
      date_of_birth: `197${i % 10}-${(i % 12) + 1}-${i % 30}`,
      h_index: 4 * i,
      gender: `${i % 2 == 0 ? "M" : "F"}`,
      mentor: ((i % 4) + 1) * 3,
    });
  }
  return authors;
};

const createFakePapers = (numberOfAuthors) => {
  const papers = [];

  for (let i = 1; i < numberOfAuthors + 1; i++) {
    papers.push({
      paper_id: i,
      paper_title: `Paper${i}`,
      conference: i % 2 == 0 ? true : false,
      publish_date: `200${i % 10}-${(i % 12) + 1}-${i % 31}`,
    });
  }
  return papers;
};

export const fakeAuthors = createFakeAuthors(15);
export const fakePapers = createFakePapers(30);
export const junctionValues = [
  {
    id: 1,
    author_no: 13,
    paper_id: 1,
  },
  {
    id: 2,
    author_no: 1,
    paper_id: 2,
  },
  {
    id: 3,
    author_no: 2,
    paper_id: 3,
  },
  {
    id: 4,
    author_no: 10,
    paper_id: 4,
  },
  {
    id: 5,
    author_no: 3,
    paper_id: 5,
  },
  {
    id: 6,
    author_no: 11,
    paper_id: 6,
  },
  {
    id: 7,
    author_no: 15,
    paper_id: 7,
  },
  {
    id: 8,
    author_no: 14,
    paper_id: 8,
  },
  {
    id: 9,
    author_no: 8,
    paper_id: 9,
  },
  {
    id: 10,
    author_no: 10,
    paper_id: 10,
  },
  {
    id: 11,
    author_no: 1,
    paper_id: 11,
  },
  {
    id: 12,
    author_no: 5,
    paper_id: 12,
  },
  {
    id: 13,
    author_no: 2,
    paper_id: 13,
  },
  {
    id: 14,
    author_no: 2,
    paper_id: 14,
  },
  {
    id: 15,
    author_no: 4,
    paper_id: 15,
  },
  {
    id: 16,
    author_no: 15,
    paper_id: 16,
  },
  {
    id: 17,
    author_no: 14,
    paper_id: 17,
  },
  {
    id: 18,
    author_no: 13,
    paper_id: 18,
  },
  {
    id: 19,
    author_no: 12,
    paper_id: 19,
  },
  {
    id: 20,
    author_no: 11,
    paper_id: 20,
  },
  {
    id: 21,
    author_no: 10,
    paper_id: 21,
  },
  {
    id: 22,
    author_no: 9,
    paper_id: 22,
  },
  {
    id: 23,
    author_no: 8,
    paper_id: 23,
  },
  {
    id: 24,
    author_no: 1,
    paper_id: 24,
  },
  {
    id: 25,
    author_no: 6,
    paper_id: 25,
  },
  {
    id: 26,
    author_no: 5,
    paper_id: 26,
  },
  {
    id: 27,
    author_no: 4,
    paper_id: 27,
  },
  {
    id: 28,
    author_no: 3,
    paper_id: 28,
  },
  {
    id: 29,
    author_no: 2,
    paper_id: 29,
  },
  {
    id: 30,
    author_no: 1,
    paper_id: 30,
  },
  {
    id: 31,
    author_no: 15,
    paper_id: 3,
  },
  {
    id: 32,
    author_no: 4,
    paper_id: 6,
  },
  {
    id: 33,
    author_no: 6,
    paper_id: 9,
  },
  {
    id: 34,
    author_no: 8,
    paper_id: 12,
  },
  {
    id: 35,
    author_no: 10,
    paper_id: 15,
  },
  {
    id: 36,
    author_no: 12,
    paper_id: 18,
  },
  {
    id: 37,
    author_no: 14,
    paper_id: 21,
  },
  {
    id: 38,
    author_no: 15,
    paper_id: 24,
  },
  {
    id: 39,
    author_no: 1,
    paper_id: 27,
  },
  {
    id: 40,
    author_no: 3,
    paper_id: 29,
  },
];
