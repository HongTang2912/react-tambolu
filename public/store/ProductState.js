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
    const result = await session.run(
      `match (n:Product) WITH n LIMIT 100 return n`
    );
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
  if (ids) {
    const driver = neo4j.driver(PATH, neo4j.auth.basic(USERNAME, PASSWORD));
    const session = driver.session();
    try {
      let list = [];
      for (var i = 0; i < ids.length; i++) {
        const data = await session.run(
          `match (n:Comment) <-[:COMMENT]- (u:User) WHERE ID(n) = $id RETURN {user: u,comment: n}`,
          {
            id: ids[i]*1,
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
  } else {
    return [];
  }
};

export const createComment = async(comment, pid) => {
  
  const driver = neo4j.driver(PATH, neo4j.auth.basic(USERNAME, PASSWORD));
  const session = driver.session();
  try {

    const data = await session.run(
      `create (n: Comment {rating_point: $rating_point, content: $content, time: $time}) return n`,
      {
        rating_point: comment.rating_point,
        content: comment.content,
        time: comment.time.toDateString(),
      }
    );
    
    const id = data?.records[0]?._fields[0]?.identity.low
      
    const data2 = await session.run(
      `match (n: Comment) , 
      (p: User {username: "Pinkguy"}) 
      where ID(n) = $id
      create (p) -[:COMMENT]-> (n) return n,p`,
      {
        id: id
      }
    );

    const data3 = await session.run(
      `match (n: ProductReview {id: $pid})
      set n.comment_id = n.comment_id + $id
      return n`,
      {
        pid: pid,
        id: id.toString()
      }
    );
    
   
  } catch (err) {
    await console.error(err);
  } finally {
    await session.close();
  }
  await driver.close();
  
}
