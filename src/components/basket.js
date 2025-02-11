import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import { TrashIcon, UpIcon, DownIcon } from "./icons";
import { formatNumber } from "../utils";
import "bootstrap/dist/css/bootstrap.min.css";

const Basket = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const { getCartItems, removeProduct, increaseQuantity, decreaseQuantity, clearBasket } = useContext(CartContext);

    useEffect(() => {
        setCartItems(getCartItems());
    }, [getCartItems]);

    const renderCart = () => {
        if (cartItems.length > 0) {
            return cartItems.map((p) => (
                <tr key={p.id}>
                    <td>
                        <Link to={`/products/${p.id}`} className="text-decoration-none text-dark">{p.title}</Link>
                    </td>
                    <td className="d-flex align-items-center">
                        <button className="btn btn-light p-1 mx-1" onClick={() => setCartItems(increaseQuantity({ id: p.id }))}>
                            <UpIcon width={20} />
                        </button>
                        {p.quantity}
                        <button className="btn btn-light p-1 mx-1" onClick={() => setCartItems(decreaseQuantity({ id: p.id }))}>
                            <DownIcon width={20} />
                        </button>
                        <button className="btn btn-danger p-1 ms-2" onClick={() => setCartItems(removeProduct({ id: p.id }))}>
                            <TrashIcon width={20} />
                        </button>
                    </td>
                    <td>{formatNumber(p.price)}</td>
                </tr>
            ));
        } else {
            return (
                <tr>
                    <td colSpan="3" className="text-center text-muted">
                        The basket is currently empty
                    </td>
                </tr>
            );
        }
    };

    const renderTotal = () => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return total;
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-3">Shopping Basket</h2>

            <table className="table table-bordered table-responsive-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{renderCart()}</tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-warning" onClick={() => navigate("/checkout")}>
                    Proceed to Checkout
                </button>
                <button className="btn btn-danger" onClick={() => setCartItems(clearBasket())}>
                    Clear Basket
                </button>
            </div>

            <h4 className="mt-3 text-end">Total: {formatNumber(renderTotal())}</h4>
        </div>
    );
};

export default Basket;
