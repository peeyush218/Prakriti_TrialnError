export const initialState = {
    basket: [],
    history: [],
};

// Selectors
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

export const getBasketItemCount = (basket) =>
  basket?.reduce((count, item) => item.quantity + count, 0);

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            const existingItemIndex = state.basket.findIndex(
                (basketItem) => basketItem.id === action.item.id
            );

            if (existingItemIndex >= 0) {
                // Item exists, just increase quantity
                const updatedBasket = state.basket.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return { ...state, basket: updatedBasket };
            } else {
                // Item is new, add it to the basket with quantity 1
                return {
                    ...state,
                    basket: [...state.basket, { ...action.item, quantity: 1 }],
                };
            }

        case 'INCREASE_QUANTITY':
            return {
                ...state,
                basket: state.basket.map(item =>
                    item.id === action.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case 'DECREASE_QUANTITY':
            const itemToDecrease = state.basket.find(item => item.id === action.id);

            if (itemToDecrease && itemToDecrease.quantity > 1) {
                // Decrease quantity if it's more than 1
                return {
                    ...state,
                    basket: state.basket.map(item =>
                        item.id === action.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                };
            } else {
                // Remove item if quantity is 1
                return {
                    ...state,
                    basket: state.basket.filter(item => item.id !== action.id),
                };
            }

        case "REMOVE_FROM_BASKET":
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id),
            };

        case "ADD_TO_HISTORY":
            return {
                ...state,
                history: [...state.history, ...action.items],
            };
            
        case 'CLEAR_BASKET':
            return {
                ...state,
                basket: [],
            };
            
        default:
            return state;
    }
};

export default reducer;
