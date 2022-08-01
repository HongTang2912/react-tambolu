import axios from "axios";
import neo4j from "neo4j-driver";
import config from "../config.json";

// console.log(session);
const PATH = config.NEO4J_DB_CONFIG.PATH;
const USERNAME = config.NEO4J_DB_CONFIG.USERNAME;
const PASSWORD = config.NEO4J_DB_CONFIG.PASSWORD;

export async function readData(page) {
  const driver = neo4j.driver(PATH, neo4j.auth.basic(USERNAME, PASSWORD));
  const session = driver.session();
  let data = [];
  try {
    const result = await session.run(`match (n:Product) return n`);
    const records = result.records;
    records.forEach(async (rec) => {
      await data.push(rec.get(0).properties);
    });

    // await console.log(data);
  } catch (err) {
    await console.error(err);
  } finally {
    await session.close();
  }

  // on application exit:
  await driver.close();
  return data;
}

export const getQueryByTitle = async (pd_title) => {
  const driver = neo4j.driver(PATH, neo4j.auth.basic(USERNAME, PASSWORD));
  const session = driver.session();
  try {
    const data = await session.run(`MATCH (n:Product {id: $id}) return n`, {
      id: pd_title,
    });
    const data2 = await session.run(
      `MATCH (n:ProductReview {id: $id}) return n`,
      {
        id: pd_title,
      }
    );

    if (data?.records[0]?._fields[0]?.properties) {
      let prod = {
        ...data?.records[0]?._fields[0]?.properties,
        ...data2?.records[0]?._fields[0]?.properties,
      };
      return prod;
    }
  } catch (err) {
    await console.error(err);
  } finally {
    await session.close();
  }
  await driver.close();
};

export const getCommentById = async (ids) => {
  const driver = neo4j.driver(PATH, neo4j.auth.basic(USERNAME, PASSWORD));
  const session = driver.session();
  try {
    let list = [];
    for (var i = 0; i < ids.length; i++) {
      const data = await session.run(
        `match (c: Comment) where ID(c) = $id return c.content`,
        {
          id: ids[i].low,
        }
      );
      list.push(data?.records[0]?._fields[0]);
    }
    return list;
  } catch (err) {
    await console.error(err);
  } finally {
    await session.close();
  }
  await driver.close();
};


