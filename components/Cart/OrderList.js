import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import TextField from '@mui/joy/TextField';
import IconButton from '@mui/joy/IconButton';
import { FaPlus, FaMinus } from 'react-icons/fa'

function Quantity({ value, setValue, increment, decrement }) {

    const buttonStyle = `border bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold`;

    return (
        <>
            <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                border: '1px solid #bae1ff',
                padding: 1,
                borderRadius: 16,
                width: 'min-content'
            }}>
                <IconButton
                    variant="solid"
                    className={buttonStyle}
                    onClick={() => decrement()}
                >
                    <FaMinus />
                </IconButton>
                <input
                    className={`w-12 focus:outline-none text-center`}
                    size="sm"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value * 1)}
                />

                <IconButton
                    variant="solid"
                    className={buttonStyle}
                    onClick={() => increment()}
                >
                    <FaPlus />
                </IconButton>
            </Box>

        </>
    );

}

export default function OrderList({cart_product}) {
    const [value, setValue] = React.useState(cart_product.quantity.quantity.low * 1);
    function increment() {
        setValue(value + 1);
    }

    function decrement() {
        setValue(value => value < 0 ? 0 : value - 1)
    }
    return (
        <>
            <Card
                variant="outlined"
                row
                sx={{
                    minWidth: '320px',
                    gap: 2,
                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                    border: 'none'
                }}
            >
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                        src={cart_product.products.imgSrc}
                        alt=""
                    />
                </AspectRatio>
                
                <Box sx={{ ml: 0.5 }}>
                    <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
                        {cart_product.products.title}
                    </Typography>

                    {/* <Link
                overlay
                underline="none"
                href="#interactive-card"
                sx={{ color: 'text.tertiary' }}
                >
                
                </Link> */}
                    
                        
                    <Quantity
                    
                        value={value}
                        setValue={setValue}
                        increment={increment}
                        decrement={decrement}
                    />
                    
                    <Chip
                        variant="outlined"
                        color="primary"
                        size="sm"
                        sx={{ pointerEvents: 'none' }}
                    >
                        {cart_product.products.price}
                    </Chip>
                </Box>
               
            </Card>
        </>
    )
}