import React, { useState } from "react";
import { useProductsContext } from "../context/ProductsContext";
import ProductForm from "../components/ProductForm";

function AdminPortalPage() {
    const { products, addProduct, updateProduct, deleteProduct } =
        useProductsContext();

    const [editingId, setEditingId] = useState("");
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const editingProduct = products.find((p) => p.id === editingId);

    function handleAdd(formData) {
        addProduct(formData);
    }

    function handleUpdate(formData) {
        updateProduct(editingProduct.id, formData);
        setEditingId("");
    }

    function handleDelete() {
        if (!confirmingDelete) {
            setConfirmingDelete(true);
            return;
        }
        deleteProduct(editingProduct.id);
        setEditingId("");
        setConfirmingDelete(false);
    }

    function handleSelectChange(e) {
        setEditingId(e.target.value);
        setConfirmingDelete(false);
    }

    return (
        <main className="admin-portal">
            <h1>Admin Portal</h1>

            <section className="admin-section">
                <h2>Add New Fish</h2>
                <ProductForm onSubmit={handleAdd} submitLabel="Add Fish" />
            </section>

            <section className="admin-section">
                <h2>Edit Existing Fish</h2>

                <select value={editingId} onChange={handleSelectChange}>
                    <option value="">Select a fish...</option>
                    {products.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                {editingProduct && (
                    <div className="admin-edit-area">
                        <ProductForm
                            key={editingProduct.id}
                            initialData={editingProduct}
                            onSubmit={handleUpdate}
                            submitLabel="Save Changes"
                        />

                        <button
                            className="delete-button"
                            onClick={handleDelete}
                        >
                            {confirmingDelete
                                ? "Click again to confirm delete"
                                : "Delete Fish"}
                        </button>

                        {confirmingDelete && (
                            <button onClick={() => setConfirmingDelete(false)}>
                                Cancel
                            </button>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}

export default AdminPortalPage;
