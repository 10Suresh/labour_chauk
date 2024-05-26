// import node module libraries
import { useReducer } from 'react';

// import context file
import { CartContext } from 'context/Context';

// import reducer file
import { CartReducer } from 'reducers/CartReducer';

const CartProvider = ({ children }) => {
	const [CartState, CartDispatch] = useReducer(CartReducer, {
		cartItems: [
			{
				id: 1,
				productID: 1,
				quantity: 2,
				colors: 'Orange',
				size: 10,
				price: 10.0,
				totalPrice: 20.0
			},
			{
				id: 2,
				productID: 2,
				quantity: 2,
				colors: 'Orange',
				size: 10,
				price: 49.0,
				totalPrice: 98.0
			},
			{
				id: 3,
				productID: 3,
				quantity: 2,
				colors: 'Orange',
				size: 10,
				price: 49.0,
				totalPrice: 98.0
			}
		],
		cartSummary: {
			subTotal: 0,
			discount: 0,
			coupon: '',
			shipping: 50,
			tax: 18, // Tax in percentage}
			taxAmount: 0
		},
		// test coupon codes
		couponCodes: [
			{ code: 'GKDIS5', discount: 5 },
			{ code: 'GKDIS10', discount: 10 },
			{ code: 'GKDIS15', discount: 15 }
		],
		totalQuantity: 0
	});

	return (
		<CartContext.Provider value={{ CartState, CartDispatch }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
