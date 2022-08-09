import React from 'react'
import Styles from './Categories.module.css';
import {AiFillCaretDown} from 'react-icons/ai'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link'

export default function Categories() {

    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipe: false,
        variableWidth: true,
      };

    const items = [
        { 
            url: "/",
            name: "Quần áo",
            type: "item"
        },
        { 
            url: "/",
            name: "Sản phẩm công nghệ",
            type: "item"
        },
        { 
            url: "/",
            name: "Phụ kiện",
            type: "sub-item"
        },
        { 
            url: "/",
            name: "Sản phẩm tiện ích",
            type: "item"
        },
        { 
            url: "/",
            name: "Đồ chơi",
            type: "item"
        }, 
        { 
            url: "/",
            name: "Máy tính & Điện thoại",
            type: "item"
        },
        { 
            url: "/",
            name: "Hàng nhập khẩu",
            type: "item"
        },
        { 
            url: "/",
            name: "Máy tính & Điện thoại",
            type: "item"
        },
        { 
            url: "/",
            name: "Máy tính & Điện thoại",
            type: "item"
        }, 
        { 
            url: "/",
            name: "Máy tính & Điện thoại",
            type: "item"
        }

    ];

    return (
        <div className="w-fit container">
            <div className={`${Styles.listCategories}`}>
                <Slider {...settings}>
                    {
                        items.map((item, index)=> (

                            <div className={Styles.item} key={index}>
                                <Link href={item.url}>
                                    <div key={index}>
                                        <p className={Styles.iconTypo}>
                                            {item.name.toUpperCase()}
                                            {item.type == "item" ? null : <AiFillCaretDown className={Styles.icon}/>}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </Slider>
           
            </div>
        </div>
    )
}
