import React from "react";
import { Outlet, Link } from "react-router-dom";
import { HomeIcon, CartIcon } from "./icons";
import Search from "./search";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ categories }) => {
    return (
        <div className="container-fluid">
            {/* Header */}
            <header className="bg-primary m-0 text-white p-3 d-flex align-items-center justify-content-between">
                <Link to="/" className="text-white">
                    <HomeIcon width={40} />
                </Link>
                <Search />
                <h2 className="m-0">Our Store</h2>
                <Link to="/basket" className="text-white">
                    <CartIcon width={40} />
                </Link>
            </header>

            {/* Main Content */}
            <div className="row mt-3">
                {/* Sidebar */}
                <nav className="col-md-3 col-lg-2 bg-light p-3">
                    {categories.errorMessage && (
                        <div className="alert alert-danger">{categories.errorMessage}</div>
                    )}
                    <ul className="list-group">
                        {categories.data &&
                            categories.data.map((c) => (
                                <li key={c.id} className="list-group-item">
                                    <Link to={`/categories/${c.id}`} className="text-dark">
                                        {c.title}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </nav>

                {/* Main Content Area */}
                <main className="col-md-9 col-lg-10 p-3">
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-4">
                <Link to="/" className="text-white me-3">Home</Link>
                <Link to="/basket" className="text-white">Basket</Link>
            </footer>
        </div>
    );
};

export default Layout;
