import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Checkout = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        shippingAddress1: "",
        touched: {
            name: false,
            email: false,
            shippingAddress1: false,
        },
    });

    const errors = {
        name: form.name.length === 0,
        email: form.email.length === 0,
        shippingAddress1: form.shippingAddress1.length === 0,
    };

    const disabled = Object.values(errors).some((error) => error);

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleBlur = (ev) => {
        const { name } = ev.target;
        setForm((prevState) => ({
            ...prevState,
            touched: { ...prevState.touched, [name]: true },
        }));
    };

    const handleSubmit = (ev) => {
        if (disabled) {
            ev.preventDefault();
            return;
        }
        navigate("/orderconfirmation");
    };

    const showError = (field) => errors[field] && form.touched[field];

    return (
        <div className="container my-4">
            <div className="card p-4 shadow">
                <h2 className="text-center text-dark">Shopping Checkout</h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Personal Details Section */}
                    <h4 className="mt-4">Your Details</h4>
                    <hr />
                    
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className={`form-control ${showError("name") ? "is-invalid" : ""}`}
                                placeholder="Enter your name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {showError("name") && <div className="invalid-feedback">Name is required.</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${showError("email") ? "is-invalid" : ""}`}
                                placeholder="Enter your email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {showError("email") && <div className="invalid-feedback">Email is required.</div>}
                        </div>
                    </div>

                    {/* Address Details Section */}
                    <h4 className="mt-4">Address Details</h4>
                    <hr />

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="copyAddress" />
                        <label className="form-check-label" htmlFor="copyAddress">
                            Copy to shipping
                        </label>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Billing Address</label>
                            <input type="text" name="billingAddress1" className="form-control mb-2" placeholder="Billing Address Line 1" />
                            <input type="text" name="billingAddress2" className="form-control mb-2" placeholder="Billing Address Line 2" />
                            <input type="text" name="billingCity" className="form-control" placeholder="City" />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Shipping Address</label>
                            <input
                                type="text"
                                name="shippingAddress1"
                                className={`form-control mb-2 ${showError("shippingAddress1") ? "is-invalid" : ""}`}
                                placeholder="Shipping Address Line 1"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {showError("shippingAddress1") && <div className="invalid-feedback">Shipping address is required.</div>}
                            <input type="text" name="shippingAddress2" className="form-control mb-2" placeholder="Shipping Address Line 2" />
                            <input type="text" name="shippingCity" className="form-control" placeholder="City" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-outline-dark px-4" onClick={() => navigate("/basket")}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary px-4" disabled={disabled}>
                            Confirm Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
