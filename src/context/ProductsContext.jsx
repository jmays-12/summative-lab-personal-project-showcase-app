import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";

const BASE_URL = "http://localhost:6001/products";
const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            });
    }, []);

    const addProduct = useCallback((newProductData) => {
        return fetch(BASE_URL, {
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
        return fetch(`${BASE_URL}/${id}`, {
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
        return fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then(() => {
            setProducts((prev) => prev.filter((p) => p.id !== id));
        });
    }, []);

    const value = {
        products,
        isLoading,
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
