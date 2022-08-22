import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id) 
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) {return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }} else {
                    return cartProduct
                }
            })
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart.`)
    }

    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id) 
        setCartItems(newCartItems)
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
    }


    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        let newCartItems = [...cartItems]
        if(value === 'inc') {
            
            newCartItems.splice(index, 1, {...foundProduct, quantity: foundProduct.quantity + 1})
            setCartItems(newCartItems);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price );
            setTotalQuantities((prevTotalQuantities) =>  prevTotalQuantities + 1)
        } else if(value === 'dec') {
            if (foundProduct.quantity > 1) {
                newCartItems.splice(index, 1, {...foundProduct, quantity: foundProduct.quantity - 1})
                setCartItems(newCartItems);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price );
                setTotalQuantities((prevTotalQuantities) =>  prevTotalQuantities - 1)
            }
        }
    }

    const incQty = () => {
        setQty((prevQty)=> prevQty + 1)
    }

    const decQty = () => {
        setQty((prevQty)=> prevQty < 2 ? 1 : prevQty - 1)
    }

    return (
        <Context.Provider 
            value = {{
                showCart, 
                setShowCart, 
                cartItems, 
                setCartItems,
                totalPrice, 
                setTotalPrice,
                totalQuantities, 
                setTotalQuantities,
                qty, 
                setQty,
                incQty, 
                decQty, 
                onAdd, 
                toggleCartItemQuantity,
                onRemove
                }}
        >
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context)