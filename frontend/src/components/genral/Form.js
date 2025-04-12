import React, { useState } from "react";
import "../../styles/form.css";

const FormComponent = ({ fields, initialState, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] })); // only first file
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // send raw object, let parent handle FormData
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate encType="multipart/form-data">
        {fields.map((field) => (
          <div className="mb-3" key={field.name}>
            <label htmlFor={field.name} className="form-label" style={{ fontSize: "20px", fontWeight: "bold" }}>
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
                style={{
                  border: "1px solid black",
                  color: "green",
                  fontWeight: "800",
                  fontSize: "18px"
                }}
              />
            ) : field.type === "file" ? (
              <input
                name={field.name}
                id={field.name}
                type="file"
                className="form-control"
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
                style={{
                  border: "1px solid black",
                  color: "green",
                  fontWeight: "800",
                  fontSize: "18px"
                }}
              />
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-success" style={{ fontSize: "20px", fontWeight: "800" }}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
