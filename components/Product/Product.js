import React, { useState, useEffect } from 'react'
import Styles from './Product.module.css'
import { animated, useSpring } from 'react-spring'
import Button from '@mui/material/Button';
import Link from 'next/link'
import { Pagination } from '@mui/material';
import Image from 'next/image'
import ReactPaginate from 'react-paginate';
import {AddProductToCart} from '/public/store/ProductState'
import MessageDialog from '../Dialog/MessageDialog'
import jwt_decode from 'jwt-decode'
import {useDispatch} from 'react-redux'

function Items({ currentItems }) {

    return (
        <>
            {
                currentItems ?

                    currentItems.map((item, index) => (
                        <div key={index}><Product product={item} /></div>
                    ))
                    :
                    <h1>Loading...</h1>
            }
        </>
    );
}

export default function PaginatedItems({ itemsPerPage, products }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, products]);

    // Invoke when user click to request another page.

    const getPageValue = (type, page, selected) => {
        if (selected == true) {

            let newOffset = (page * itemsPerPage) % products.length;
            setItemOffset(newOffset);       
        }
    }

    
    return (
        <>
            {currentItems?.length != 0
                ? <Items currentItems={currentItems} />
                : <h1>Không có dữ liệu</h1>}
            <div className="w-full flex justify-center">

                {/* <ReactPaginate
                    className={`mx-auto ${Styles.paginateBar}`}
                    breakLabel="..."
                    nextLabel="Trang sau"
                    previousLabel="Trang trước"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                /> */}
                <Pagination
                    color="primary"
                    count={pageCount}
                    //onChange={(e) => handlePageClick(e)}
                    getItemAriaLabel={(type, page, selected) => getPageValue(type, page, selected)}
                    siblingCount={5}
                    />
            </div>
        </>
    );
}



function Product({ product }) {

    const dispatch = useDispatch()


    const addCartProduct = async (id) => {
        const user = window.localStorage.getItem('login-user') == undefined ||
            window.localStorage.getItem('login-user') == ""
            ? null : jwt_decode(window.localStorage.getItem('login-user'))

        const prod = await AddProductToCart(id, user?.username).then(res =>
            res 
        )
        dispatch({
            type: 'cart/add-product',
            payload: prod
        })

    }

    const styles = useSpring({
        
        to: [
            { opacity: 0.05 },
            { opacity: 1 },
        ],
        from: { opacity: 0 },
    })
    


    return (
        <animated.div style={styles} className={Styles.post}>
            <span className={Styles.Statement}>
                {
                    product.state == "sale" ? "Giảm" :
                        product.state == "out-of-stock" ? "Hết hàng" : null
                }
            </span>
            <div className={Styles.productInner}>
                <Link href={`product-detail/${product.product_id}`}>
                    <a>
                        <div className={Styles.body}>
                            <img lazy-load="true" className={Styles.productImg} src={product.imgSrc} />
                        </div>
                        <div className={`text-ellipsis h-12`}>
                            <p>{product.title}</p>
                        </div>
                        <div className={Styles.info}>


                            <span className={`text-red-500 ${Styles.price}`}>{product.price}</span>
                            <span>
                                {/* <Button className={Styles.button_wishList}>
                                    <FaHeart/>
                                </Button> */}
                                <Button variant={"outlined"} color="success" className={Styles.button_buy}>Mua</Button>
                            </span>


                        </div>
                    </a>
                </Link>
                <hr />
                <Button 
                    variant={product.state == "out-of-stock" ? "disabled" : "outlined"} 
                    className={Styles.button_addCart}
                    onClick={() => addCartProduct(product.product_id)}
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>

        </animated.div>
    )
}
