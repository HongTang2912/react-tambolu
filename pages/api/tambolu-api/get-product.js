import {getSession} from '/public/store/ProductState'

const getQueryByTitle = async(pd_title) => {
    const session = getSession().session()
    try{
        const data = await session.run(
            `MATCH (n:Product {id: $id}) return n`,
            {
            id: pd_title
            }
        )
        if (data?.records[0]?._fields[0]?.properties){
            let prod = data?.records[0]?._fields[0]?.properties
            return {
                id: prod.id,
                title: prod.title,
                price: prod.price,
                status: prod.status,
                imgSrc: "https://linhkienlammusic.com/thumbs/600x600x1"+prod.imgSrc.slice(45),
                refund: prod.refund
            }
        }
    }
    catch(err) {
        await console.error(err)
    }
    finally {
        await session.close()
    }
    await getSession().close()

}



export default function handler(req, res) {
    
    let data = req.body;
    
    getQueryByTitle(data)
    .then(function (result) {
        res.send(result)
    })
}
