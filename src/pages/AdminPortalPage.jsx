import React, { useState } from "react";
import { useProductsContext } from "../context/ProductsContext";
import ProductForm from "../components/ProductForm";

function AdminPortalPage() {
    const { products, addProduct, updateProduct, deleteProduct } =
        useProductsContext();
    const [editingId, setEditingId] = useState("");

    const editingProduct = products.find((p) => p.id === Number(editingId));

    function handleAdd(formData) {
        addProduct(formData);
    }

    function handleUpdate(formData) {
        updateProduct(editingProduct.id, formData);
        setEditingId("");
    }

    function handleDelete() {
        deleteProduct(editingProduct.id);
        setEditingId("");
    }

    return (
        <main className="admin-portal">
            <h1>Admin Portal</h1>

            <section>
                <h2>Add New Fish</h2>
                <ProductForm onSubmit={handleAdd} submitLabel="Submit" />
            </section>

            <section>
                <h2>Edit or Remove Existing Fish</h2>
                <select
                    value={editingId}
                    onChange={(e) => setEditingId(e.target.value)}
                >
                    <option value="">Select a fish...</option>
                    {products.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                {editingProduct && (
                    <div>
                        <ProductForm
                            key={editingProduct.id}
                            initialData={editingProduct}
                            onSubmit={handleUpdate}
                            submitLabel="Save Changes"
                        />
                        <button onClick={handleDelete}>Delete Fish</button>
                    </div>
                )}
            </section>
        </main>
    );
}

export default AdminPortalPage;
