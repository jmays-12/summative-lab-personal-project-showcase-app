import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";

//make sure to add your .env file with your api!
const API_URL = import.meta.env.VITE_API_URL;
const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }

                return res.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch(() => {
                setError("Couldn't load products.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const addProduct = useCallback((newProductData) => {
        return fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProductData),
        })
            .then((res) => res.json())
            .then((newProduct) => {
                setProducts((prev) => [...prev, newProduct]);
                return newProduct;
            });
    }, []);

    const updateProduct = useCallback((id, updates) => {
        return fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        })
            .then((res) => res.json())
            .then((updated) => {
                setProducts((prev) =>
                    prev.map((p) => (p.id === updated.id ? updated : p)),
                );
                return updated;
            });
    }, []);

    const deleteProduct = useCallback((id) => {
        return fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => {
            setProducts((prev) => prev.filter((p) => p.id !== id));
        });
    }, []);

    const value = {
        products,
        isLoading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProductsContext() {
    const context = useContext(ProductsContext);

    if (!context)
        throw new Error(
            "useProductsContext must be used within a ProductsProvider",
        );

    return context;
}
