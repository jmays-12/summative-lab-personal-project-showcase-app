import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { renderHook, act } from "@testing-library/react";

import App from "../App";
import { CartProvider, useCartContext } from "../context/CartContext";
import {
    ProductsProvider,
    useProductsContext,
} from "../context/ProductsContext";
import useSearch from "../hooks/useSearch";

// ─── Shared mock data ────────────────────────────────────────────────────────

const mockProducts = [
    {
        id: 1,
        name: "Clownfish",
        species: "Amphiprioninae",
        price: 29.99,
        salePercentage: 0,
        image: "",
        shortDescription: "A classic reef fish.",
        extendedDescription: "Great for beginners.",
    },
];

function renderApp(initialPath = "/") {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
            <App />
        </MemoryRouter>,
    );
}

beforeEach(() => {
    localStorage.clear();
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProducts),
    });
});

afterEach(() => vi.restoreAllMocks());

// ─── Custom hook: useSearch ───────────────────────────────────────────────────

describe("useSearch (custom hook)", () => {
    it("filters items by search term", () => {
        const { result } = renderHook(() => useSearch(mockProducts, ["name"]));
        act(() => result.current.setSearchTerm("clown"));
        expect(result.current.filteredItems).toHaveLength(1);
        expect(result.current.filteredItems[0].name).toBe("Clownfish");
    });
});

// ─── Standard hook: CartContext (useState) ────────────────────────────────────

describe("useCartContext (standard hook)", () => {
    function CartConsumer() {
        const { cart, cartCount, addToCart, removeFromCart, shipping } =
            useCartContext();
        const product = mockProducts[0];
        return (
            <div>
                <span data-testid="count">{cartCount}</span>
                <span data-testid="shipping">{shipping.toFixed(2)}</span>
                <button onClick={() => addToCart(product)}>add</button>
                <button onClick={() => removeFromCart(product.id)}>
                    remove
                </button>
            </div>
        );
    }

    function renderCart() {
        return render(
            <CartProvider>
                <CartConsumer />
            </CartProvider>,
        );
    }

    it("adds an item and increments cart count", async () => {
        renderCart();
        await userEvent.click(screen.getByText("add"));
        expect(screen.getByTestId("count").textContent).toBe("1");
    });

    it("removes an item from the cart", async () => {
        renderCart();
        await userEvent.click(screen.getByText("add"));
        await userEvent.click(screen.getByText("remove"));
        expect(screen.getByTestId("count").textContent).toBe("0");
    });

    it("shipping is free when subtotal >= $75", async () => {
        localStorage.setItem(
            "cart",
            JSON.stringify([{ ...mockProducts[0], quantity: 3 }]), // 3 × $29.99 = $89.97
        );
        renderCart();
        expect(screen.getByTestId("shipping").textContent).toBe("0.00");
    });
});

// ─── CRUD ─────────────────────────────────────────────────────────────────────

describe("CRUD via ProductsContext", () => {
    function CRUDConsumer() {
        const {
            products,
            isLoading,
            addProduct,
            updateProduct,
            deleteProduct,
        } = useProductsContext();
        if (isLoading) return <p>Loading...</p>;
        const newProduct = {
            id: 2,
            name: "Seahorse",
            price: 19.99,
            salePercentage: 0,
        };
        return (
            <>
                <ul>
                    {products.map((p) => (
                        <li key={p.id} data-testid="product">
                            {p.name}
                        </li>
                    ))}
                </ul>
                <button onClick={() => addProduct(newProduct)}>add</button>
                <button
                    onClick={() =>
                        updateProduct(1, { name: "Clownfish (Updated)" })
                    }
                >
                    update
                </button>
                <button onClick={() => deleteProduct(1)}>delete</button>
            </>
        );
    }

    it("READ — fetches and displays products", async () => {
        render(
            <ProductsProvider>
                <CRUDConsumer />
            </ProductsProvider>,
        );
        expect(await screen.findByText("Clownfish")).toBeInTheDocument();
    });

    it("CREATE — addProduct adds a new product", async () => {
        const newProduct = {
            id: 2,
            name: "Seahorse",
            price: 19.99,
            salePercentage: 0,
        };
        global.fetch
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockProducts),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(newProduct),
            });

        render(
            <ProductsProvider>
                <CRUDConsumer />
            </ProductsProvider>,
        );
        await screen.findByText("add");
        await userEvent.click(screen.getByText("add"));
        await waitFor(() =>
            expect(screen.getAllByTestId("product")).toHaveLength(2),
        );
        expect(screen.getByText("Seahorse")).toBeInTheDocument();
    });

    it("UPDATE — updateProduct updates a product in state", async () => {
        const updated = { ...mockProducts[0], name: "Clownfish (Updated)" };
        global.fetch
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockProducts),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(updated),
            });

        render(
            <ProductsProvider>
                <CRUDConsumer />
            </ProductsProvider>,
        );
        await screen.findByText("update");
        await userEvent.click(screen.getByText("update"));
        expect(
            await screen.findByText("Clownfish (Updated)"),
        ).toBeInTheDocument();
    });

    it("DELETE — deleteProduct removes a product from state", async () => {
        global.fetch
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockProducts),
            })
            .mockResolvedValueOnce({ ok: true });

        render(
            <ProductsProvider>
                <CRUDConsumer />
            </ProductsProvider>,
        );
        await screen.findByText("delete");
        await userEvent.click(screen.getByText("delete"));
        await waitFor(() =>
            expect(screen.queryByText("Clownfish")).not.toBeInTheDocument(),
        );
    });
});

// ─── Client-side routing ──────────────────────────────────────────────────────

describe("Client-side routing", () => {
    it("renders the home page at /", async () => {
        renderApp("/");
        expect(
            await screen.findByText("The Saltwater Source"),
        ).toBeInTheDocument();
    });

    it("renders the shop page at /shop", async () => {
        renderApp("/shop");
        expect(
            await screen.findByPlaceholderText("Search fish..."),
        ).toBeInTheDocument();
    });

    it("renders the cart page at /cart", async () => {
        renderApp("/cart");
        expect(
            await screen.findByRole("heading", { name: "Your Cart", level: 1 }),
        ).toBeInTheDocument();
    });

    it("renders the admin portal at /admin", async () => {
        renderApp("/admin");
        expect(
            await screen.findByRole("heading", {
                name: "Admin Portal",
                level: 1,
            }),
        ).toBeInTheDocument();
    });

    it("renders the product detail page at /products/:id", async () => {
        renderApp("/products/1");
        expect(
            await screen.findByText("Great for beginners."),
        ).toBeInTheDocument();
    });

    it("navigates between routes via the navbar", async () => {
        renderApp("/");
        await screen.findByText("The Saltwater Source");
        await userEvent.click(screen.getByRole("link", { name: /shop/i }));
        expect(
            await screen.findByPlaceholderText("Search fish..."),
        ).toBeInTheDocument();
    });
});
