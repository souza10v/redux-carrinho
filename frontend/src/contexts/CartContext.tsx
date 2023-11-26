import { Children, createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void
    removeItemCart: (product: CartProps) => void; //nao retorna nada
    total : string
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

    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState("");

    function addItemCart(newItem: ProductProps) {
        const indexItem = cart.findIndex(item => item.id === newItem.id) //Percorre todos os itens em cart e verifica a condicao 
        // Se encontra devolve a posicao, se nao devolve -1
        if (indexItem !== -1) { //item duplicado
            // Se entrou soma um item e calcula total do carrinho
            let cartList = cart; //salva em uma variavel nova todos os items
            cartList[indexItem].amount = cartList[indexItem].amount + 1 // adiciona mais um em quantidade no mesmo item
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price
            setCart(cartList)
            totalResultCart(cartList)
            return;
        }

        // Adiconar item novo
        let data = {
            ...newItem, //recebe o novo item
            amount: 1, // amount 1 pois primeira vez
            total: newItem.price //preco
        }

        setCart(products => [...products, data]) //recebe todos os produtos e adiciona o novo data
        totalResultCart([...cart, data])
    }

    function removeItemCart(product: CartProps) {

        const indexItem = cart.findIndex(item => item.id === product.id)

        if (cart[indexItem]?.amount > 1) { //Diminuir quantidade
            let cartList = cart;
            
            cartList[indexItem].amount = cartList[indexItem].amount -1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price
            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        //remove items
        const removeItem = cart.filter(item => item.id !== product.id) //se diferente, coloca dentro da variavel removeitem, se igual nao coloca

        setCart(removeItem)
        totalResultCart(removeItem)
    }

    function totalResultCart(items: CartProps[]) { //somando
        let myCart = items;
        let result = myCart.reduce((acc, obj) => { return acc + obj.total }, 0) // accumulador e obejeto. para por todos e soma acc + objeto atual
        const resutlFormated = result.toLocaleString("pt-BR", {style: "currency", currency:"BRL"})
        setTotal(resutlFormated)
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                cartAmount: cart.length,
                addItemCart,
                removeItemCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;