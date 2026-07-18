import React, { useState, useId } from "react";

function ProductForm({ initialData, onSubmit, submitLabel }) {
    const [formData, setFormData] = useState(
        initialData || {
            name: "",
            species: "",
            description: "",
            image: "",
            price: "",
            salePercentage: 0,
        },
    );
    const [errors, setErrors] = useState({});

    const nameId = useId();
    const speciesId = useId();
    const descriptionId = useId();
    const imageId = useId();
    const priceId = useId();
    const saleId = useId();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function validate() {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.price || Number(formData.price) <= 0)
            newErrors.price = "Enter a valid price.";
        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        onSubmit({
            ...formData,
            price: Number(formData.price),
            salePercentage: Number(formData.salePercentage) || 0,
        });
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <label htmlFor={nameId}>Name</label>
            <input
                id={nameId}
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <label htmlFor={speciesId}>Species</label>
            <input
                id={speciesId}
                name="species"
                value={formData.species}
                onChange={handleChange}
            />

            <label htmlFor={descriptionId}>Description</label>
            <input
                id={descriptionId}
                name="description"
                value={formData.description}
                onChange={handleChange}
            />

            <label htmlFor={imageId}>Image URL</label>
            <input
                id={imageId}
                name="image"
                value={formData.image}
                onChange={handleChange}
            />

            <label htmlFor={priceId}>Price</label>
            <input
                id={priceId}
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
            />
            {errors.price && <p className="error-text">{errors.price}</p>}

            <label htmlFor={saleId}>Sale Percentage</label>
            <input
                id={saleId}
                name="salePercentage"
                type="number"
                min="0"
                max="100"
                value={formData.salePercentage}
                onChange={handleChange}
            />

            <button type="submit">{submitLabel}</button>
        </form>
    );
}

export default ProductForm;
