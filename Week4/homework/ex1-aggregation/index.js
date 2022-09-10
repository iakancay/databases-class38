const { MongoClient } = require("mongodb");
const csvtojson = require("csvtojson");
const dotenv = require("dotenv");
dotenv.config();

const db = "databaseWeek4";
const collection = "world_population";

//Connection to ATLAS mongodb
const main = async () => {
  const client = new MongoClient(process.env.URI);
  try {
    await insertData(client);
    await calculatePopulationCountryGroupByYears(client, "Turkey");
    await calculatePopulationContinentsForAgeAndYear(client, "100+", "2020");
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

const insertData = async (client) => {
  const jsonData = await csvtojson().fromFile(
    "population_pyramid_1950-2022.csv"
  );
  await client.db(db).collection(collection).deleteMany();
  const result = await client
    .db(db)
    .collection(collection)
    .insertMany(jsonData);
  console.log(`${result.insertedCount} documents were added to database`);
};

const calculatePopulationCountryGroupByYears = async (client, country) => {
  const agg = [
    {
      $match: {
        Country: country,
      },
    },
    {
      $group: {
        _id: "$Year",
        countPopulation: {
          $sum: {
            $add: [
              {
                $toInt: "$M",
              },
              {
                $toInt: "$F",
              },
            ],
          },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const cursor = await client.db(db).collection(collection).aggregate(agg);
  const results = await cursor.toArray();
  results.forEach((result) => console.log(result));
};
const calculatePopulationContinentsForAgeAndYear = async (
  client,
  age,
  year
) => {
  const agg = [
    {
      $match: {
        Country: {
          $in: [
            "AFRICA",
            "ASIA",
            "EUROPE",
            "LATIN AMERICA AND THE CARIBBEAN",
            "NORTHERN AMERICA",
            "OCEANIA",
          ],
        },
        Year: year,
        Age: age,
      },
    },
    {
      $addFields: {
        TotalPopulation: {
          $add: [
            {
              $toInt: "$M",
            },
            {
              $toInt: "$F",
            },
          ],
        },
      },
    },
  ];

  const cursor = await client.db(db).collection(collection).aggregate(agg);
  const results = await cursor.toArray();
  results.forEach((result) => console.log(result));
};

main().catch((err) => console.log(err));
