import { Children, createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: ( newItem: ProductProps) => void
}

interface CartProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

interface CartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {

    const [cart, setCart] = useState<CartProps[]>([])

    function addItemCart(newItem: ProductProps){
        const indexItem = cart.findIndex(item => item.id === newItem.id ) //Percorre todos os itens em cart e verifica a condicao 
        // Se encontra devolve a posicao, se nao devolve -1
        if(indexItem !== -1){ //item duplicado
            // Se entrou soma um item e calcula total do carrinho
            let cartList = cart; //salva em uma variavel nova todos os items
            cartList[indexItem].amount = cartList[indexItem].amount + 1 // adiciona mais um em quantidade no mesmo item
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price
            setCart(cartList)
            return;
        } 

        // Adiconar item novo
        let data = {
            ...newItem, //recebe o novo item
            amount: 1, // amount 1 pois primeira vez
            total: newItem.price //preco
        }
        
        setCart(products => [...products, data]) //recebe todos os produtor e adiciona o novo data
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                cartAmount: cart.length,
                addItemCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;