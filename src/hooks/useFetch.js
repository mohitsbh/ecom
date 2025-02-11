import React, { useState, useEffect } from 'react';

// Custom hook to fetch data
const useFetch = () => {
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (url !== null) fetchData();
  }, [url]); // Re-fetch when the URL changes

  return {
    data,
    loading,
    error,
    setUrl,
  };
};

// Custom hook for fetching categories
export const useCategories = () => {
  const { data: categories, loading, error, setUrl: getCategories } = useFetch();

  useEffect(() => {
    // Fetch categories when component mounts
    getCategories('https://ecom-1npbnxdsl-mohitsbhs-projects.vercel.app/categories');
  }, [getCategories]); // Only call once when component mounts

  return {
    categories,
    loading,
    error,
  };
};

// Custom hook for fetching products by category ID
export const useProducts = (id) => {
  const { data: products, loading, error, setUrl: getProducts } = useFetch();

  useEffect(() => {
    if (id) {
      // Fetch products when `id` changes
      getProducts('https://ecom-1npbnxdsl-mohitsbhs-projects.vercel.app/products?catId=' + id);
    }
  }, [id, getProducts]); // Only call when `id` or `getProducts` changes

  return {
    products,
    loading,
    error,
  };
};
