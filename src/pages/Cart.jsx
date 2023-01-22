import { useSelector } from "react-redux"

import Helmet from "../components/Helmet/Helmet"
import CartContents from "../components/CartContents/CartContents"

function Cart() {
    const { currency } = useSelector(state => state.data)
    const { cartContents, cartPrice } = useSelector(state => state.cart)

    return (
        <>
            <Helmet title={'Cart'} />
            <section className="slide-up">
                <CartContents currency={currency} cartContents={cartContents} cartPrice={cartPrice} />
            </section>
        </>
    )
}

export default Cart