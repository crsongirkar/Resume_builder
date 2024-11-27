
import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom"; // Importing useNavigate for routing
// import classicTemplateImg from "../components/Image/Img1.jpeg";
// import JohnDe from "../components/Image/Img2.jpeg";

const templates = [
  {
    id: 1,
    description: "Single Column",
    img: classicTemplateImg,
  },
  {
    id: 2,
    description: "Double Column",
    img: JohnDe,
  },
];

function FillForm() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to the next page

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleProceed = () => {
    if (!selectedTemplate) {
      alert("Please select a template to proceed.");
    } else {
      // Navigate to the editor page and pass the selected template's image
     // navigate("./Edit", { state: { selectedTemplate } });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? "#121212" : "#f9f9f9",
    color: isDarkMode ? "#ffffff" : "#333",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        ...themeStyles,
        padding: "30px",
        fontFamily: "'Roboto', sans-serif",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Select Your Resume Template</h1>
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: isDarkMode ? "#333" : "#007BFF",
            color: "#fff",
            padding: "10px 15px",
            fontSize: "14px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "background-color 0.3s ease",
          }}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "200px",
          marginTop: "2px",
          flexWrap: "wrap",
        }}
      >
        {templates.map((template) => (
          <div
            key={template.id}
            style={{
              width: "30%",
              backgroundColor:
                selectedTemplate === template.id
                  ? isDarkMode
                    ? "#C1C4C8FF"
                    : "#C0C3C7FF"
                  : isDarkMode
                  ? "#333"
                  : "#fff",
              color:
                selectedTemplate === template.id
                  ? "#fff"
                  : isDarkMode
                  ? "#bbb"
                  : "#333",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(10, 0, 0, 0.1)",
              padding: "0px",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div
              style={{
                marginBottom: "1px",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={template.img}
                alt={template.description}
                style={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <h3 style={{ marginBottom: "10px" }}>{template.description}</h3>
            {selectedTemplate === template.id && (
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 20px",
                  backgroundColor: "#3479E0FF",
                  color: "#fff",
                  borderRadius: "18px",
                  fontSize: "12px",
                }}
              >
                Selected
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handleProceed}
          style={{
            backgroundColor: isDarkMode ? "#28a745" : "#007BFF",
            color: "#fff",
            padding: "12px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.2s",
          }}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default FillForm;
