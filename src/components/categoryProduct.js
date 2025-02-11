import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryProduct = ({ id, title, image, specs, features, price, stock }) => {
    const navigate = useNavigate();
    const { addProduct } = useContext(CartContext);

    return (
        <div className="container my-3">
            <div className="card shadow-sm p-3">
                {/* Product Title */}
                <h4 className="text-center text-dark fw-bold">{title}</h4>

                {/* Product Image */}
                <div className="text-center">
                    <img src={`/assets/${image}`} alt={title} className="img-fluid rounded" style={{ maxWidth: "60%" }} />
                </div>

                {/* Product Details */}
                <div className="row mt-3">
                    {/* Specifications & Features */}
                    <div className="col-md-6">
                        <h6 className="fw-bold text-secondary">Dimensions:</h6>
                        <p>{specs?.dimensions || "N/A"}</p>

                        {specs?.capacity && (
                            <>
                                <h6 className="fw-bold text-secondary">Capacity:</h6>
                                <p>{specs.capacity}</p>
                            </>
                        )}

                        <h6 className="fw-bold text-secondary">Features:</h6>
                        <ul className="list-unstyled">
                            {features?.map((f, i) => (
                                <li key={`feature${i}`} className="text-muted">✔ {f}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Pricing & Stock */}
                    <div className="col-md-6 text-center">
                        <h3 className="text-primary fw-bold">₹{price}</h3>

                        <div className="alert alert-secondary p-2">
                            <p className="mb-1">Stock Level: {stock}</p>
                            <p className="mb-0 text-success fw-bold">FREE Delivery</p>
                        </div>

                        {/* Action Buttons */}
                        <button className="btn btn-outline-dark w-100 mb-2" onClick={() => navigate(`/products/${id}`)}>
                            View Product
                        </button>
                        <button className="btn btn-warning w-100" onClick={() => addProduct({ id, title, price })}>
                            Add to Basket 🛒
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
