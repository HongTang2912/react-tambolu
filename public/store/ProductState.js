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
      await data.push({...rec.get(0).properties, product_id: rec._fields[0]?.identity?.low});
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

export const getQueryById = async (pd_id) => {
  const driver = neo4j.driver(PATH, neo4j.auth.basic(USERNAME, PASSWORD));
  const session = driver.session();
  try {
    const data = await session.run(
      `MATCH (n:Product) <-[r:REVIEW_OF]- (m:ProductReview) where ID(n) = $id return {product: n, review: m}`, 
      {
        id: pd_id,
      }
    );

    if (data?.records[0]?._fields[0]) {
      let prod = {
        ...data?.records[0]?._fields[0]?.product?.properties,
        ...data?.records[0]?._fields[0]?.review?.properties
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
            id: (ids[i]*1),
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

export const createComment = async(comment, username, pid) => {
  
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
      (p: User {username: $username}) 
      where ID(n) = $id
      create (p) -[:COMMENT]-> (n) return n,p`,
      {
        id: id,
        username: username
      }
    );

    const data3 = await session.run(
      `match (n: ProductReview {product_id: $pid})
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

export const loginUser = async(username) => {
  const driver = neo4j.driver(PATH, neo4j.auth.basic(USERNAME, PASSWORD));
  const session = driver.session();
  let data;
  try {
    let result = await session.run(
      `match (n:User {username: $username}) return n`,
      {
        username: username
      }
    );
    
    let result2 = await session.run(
      `match (n:User {email: $email}) return n`,
      {
        email: username
      }
    );

  
    
    return {
      status: "success",
      ...result?.records[0]?._fields[0].properties, 
      ...result2?.records[0]?._fields[0].properties
    }
    // await console.log(data);
  } catch (err) {
    await console.error(err);
  } finally {
    await session.close();
  }

  // on application exit:
  await driver.close();
 
}


export const RegisterUser = async(user) => {
  const driver = neo4j.driver(PATH, neo4j.auth.basic(USERNAME, PASSWORD));
  const session = driver.session();
  let data;
  try {

    const User = await session.run(
      `match (n:User) 
      Where n.username = $username OR n.email = $email
      return count(n)`,
      {
        username: user.username,
        email: user.email,
      }
    );
    if (User?.records[0]?._fields[0].low == 0){
      const result = await session.run(
        `merge (n:User {
          username: $username,
          email: $email,
          password: $password,
          phone_number: $tel
        }) return n`,
        {
          username: user.username,
          email: user.email,
          password: user.password,
          tel: user.tel
        }
      );
      data = {
        status: "success",
        ...result?.records[0]?._fields[0].properties
      }
    }
    else {
      data = {
        status: "failed",
        message: ["Tài khoản đã tồn tại"]
      }
    }

    // await console.log(data);
  } catch (err) {
    await console.error(err);
  } finally {
    await session.close();
  }

  // on application exit:
  await driver.close();
  return data
}


export const AddProductToCart = async(prod_id, username) => {
  const driver = neo4j.driver(PATH, neo4j.auth.basic(USERNAME, PASSWORD));
  const session = driver.session();
  try {

    const query = await session.run (
      `MATCH (n:User {username: $username}), (m:Product) 
      where ID(m) = $prod_id
      merge (n) -[r:ADD_TO_CART]-> (m)
      set r.quantity = 1
      RETURN r`,
      {
        prod_id: prod_id,
        username: username
      }
    )
   

    if (query?.records[0]?._fields[0].properties)
      return query?.records[0]?._fields[0].properties
    return;
    // await console.log(data);
  } catch (err) {
    await console.error(err);
  } finally {
    await session.close();
  }

  // on application exit:
  await driver.close();
}


export const ViewProductsInCart = async(username) => {
  const driver = neo4j.driver(PATH, neo4j.auth.basic(USERNAME, PASSWORD));
  const session = driver.session();
  try {

    const query = await session.run (
      `MATCH (p:User)-[r:ADD_TO_CART]->(m:Product) 
      where p.username = $username 
      RETURN {user: p, products: m, quantity: r}`,
      {
        username: username
      }
    )
   

    if (query) {
      let data = [];
      query?.records?.forEach(node => {
        data.push(node.map((item) => {
            return {

              products: item.products.properties,
              user: item.user.properties,
              quantity: item.quantity.properties
            }
          }
        ))
      })
      return data;
    }
    return;
    // await console.log(data);
  } catch (err) {
    await console.error(err);
  } finally {
    await session.close();
  }

  // on application exit:
  await driver.close();
}

