import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import { getProductById } from "../fetcher";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetail = () => {
    const { addProduct } = useContext(CartContext);
    const [product, setProduct] = useState({ errorMessage: "", data: {} });
    const { productId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const responseObject = await getProductById(productId);
            setProduct(responseObject);
        };
        fetchData();
    }, [productId]);

    const createMarkup = () => {
        return { __html: product.data?.description };
    };

    return (
        <div className="container mt-4">
            {product.errorMessage && (
                <div className="alert alert-danger">{product.errorMessage}</div>
            )}

            <div className="row">
                {/* Product Image */}
                <div className="col-md-5 text-center">
                    <img
                        src={`/assets/${product.data.image}`}
                        alt={product.data.title}
                        className="img-fluid rounded shadow"
                        style={{ maxWidth: "80%" }}
                    />
                </div>

                {/* Product Info */}
                <div className="col-md-7">
                    <h2 className="text-primary">{product.data.title}</h2>
                    <h3 className="text-success">₹{product.data.price}</h3>

                    {product.data.stock > 0 ? (
                        <div className="alert alert-success">In Stock</div>
                    ) : (
                        <div className="alert alert-danger">Out of Stock</div>
                    )}

                    <button
                        className="btn btn-warning mt-3"
                        onClick={() =>
                            addProduct({
                                id: product.data.id,
                                title: product.data.title,
                                price: product.data.price,
                            })
                        }
                    >
                        Add to Basket
                    </button>

                    <div className="mt-3">
                        <h5>Dimensions:</h5>
                        <p>{product.data.specs?.dimensions}</p>

                        {product.data.specs?.capacity && (
                            <>
                                <h5>Capacity:</h5>
                                <p>{product.data.specs.capacity}</p>
                            </>
                        )}

                        <h5>Features:</h5>
                        <ul>
                            {product.data.features?.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-4">
                <h4>Description</h4>
                <p dangerouslySetInnerHTML={createMarkup()}></p>
            </div>
        </div>
    );
};

export default ProductDetail;
