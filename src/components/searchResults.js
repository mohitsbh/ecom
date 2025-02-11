import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByQuery } from "../fetcher";
import CategoryProduct from "./categoryProduct";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchResults = () => {
    const [products, setProducts] = useState({
        errorMessage: "",
        data: [],
        loading: true,
    });

    let [searchParams] = useSearchParams();
    let query = searchParams.get("s");

    useEffect(() => {
        const fetchData = async () => {
            setProducts((prev) => ({ ...prev, loading: true })); // Show loading state
            const responseObject = await getProductsByQuery(query);
            setProducts({ ...responseObject, loading: false });
        };
        fetchData();
    }, [query]);

    const renderProducts = () => {
        if (products.loading) {
            return <div className="text-center my-3">Loading products...</div>;
        }

        if (products.data.length > 0) {
            return (
                <div className="row">
                    {products.data.map((p) => (
                        <div key={p.id} className="col-md-4 mb-3">
                            <CategoryProduct {...p}>{p.title}</CategoryProduct>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="alert alert-warning text-center">
                    No results found for <strong>"{query}"</strong>.
                </div>
            );
        }
    };

    return (
        <div className="container my-4">
            {products.errorMessage && (
                <div className="alert alert-danger">Error: {products.errorMessage}</div>
            )}
            {renderProducts()}
        </div>
    );
};

export default SearchResults;
