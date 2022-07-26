import {getSession} from '/public/store/ProductState.js'


async function readData() {
    const session = getSession().session();
    let data = []
    try {
      const result = await session.run(
        'MATCH (a:Product) return a'
      )
      const records = result.records
      records.forEach(async (rec) => {
        await data.push(rec.get(0).properties)
      })
  
      // await console.log(data);
    }
    catch (err) {
      await console.error(err);
    }
    finally {
      await session.close()
  
    }
  
    // on application exit:
    await getSession().close()
    return data;
}




export default function handler(req, res) {
    readData()
    .then(function (result) {
      res.send(result)
    })
}

