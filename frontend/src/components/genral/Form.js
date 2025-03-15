import React, { useState } from "react";

const FormComponent = ({ fields, initialState, onSubmit, buttonText }) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            {fields.map((field) => (
                <div className="mb-3" key={field.name}>
                    <label htmlFor={field.name} className="form-label">
                        {field.label}
                    </label>
                    {field.type === "textarea" ? (
                        <textarea
                            name={field.name}
                            id={field.name}
                            className="form-control"
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                        />
                    ) : (
                        <input
                            name={field.name}
                            id={field.name}
                            type={field.type}
                            className="form-control"
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                        />
                    )}
                </div>
            ))}
            <button type="submit" className="btn btn-success">{buttonText}</button>
        </form>
    );
};

export default FormComponent;
