import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderConfirmation = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card text-center shadow p-4">
                <div className="card-body">
                    <h2 className="card-title text-success">Order Confirmed!</h2>
                    <p className="card-text">Thank you for your order. Your items will be shipped soon.</p>
                    <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
