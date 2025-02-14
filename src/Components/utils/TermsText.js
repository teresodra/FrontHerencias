import React, { useState, useEffect } from "react";
import termsFile from "../../assets/terms/terms.txt"
import ReactMarkdown from "react-markdown";

const TermsText = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/assets/terms/terms.txt") // Update with your actual filename
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load file");
        }
        return response.text();
      })
      .then((data) => setText(data))
      .catch((error) => console.error("Error loading the file:", error));
  }, []);

  const handleFileUpload = (event) => {
    const file = termsFile
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

//   const getClass = (line) => {
//     if (line.startsWith("##")) return "terms-subheader"; // Subheadings
//     if (line.startsWith("#")) return "terms-header"; // Main Headings
//     if (line.length < 50) return "terms-shorter-lines"; // Shorter lines
//     return "terms-default-text"; // Default text size
//   }

//   const getFontSize = (line) => {
//     if (line.startsWith("##")) return "22px"; // Subheadings
//     if (line.startsWith("#")) return "26px"; // Main Headings
//     if (line.length < 50) return "18px"; // Shorter lines
//     return "14px"; // Default text size
//   };

  return (
    <div className="terms-container">
    {/* <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}> */}
      {/* <h2>Terms and Conditions</h2> */}
      {/* <input type="file" accept=".txt" onChange={handleFileUpload} /> */}
      <div className="terms-text">
      {/* <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px", overflowY: "auto", height: "400px" }}> */}
        {text ? (
            <ReactMarkdown>{text}</ReactMarkdown>
        
        //   text.split("\n").map((line, index) => (
        //     <p key={index} className={getClass(line)} >
        //         {line.replace(/^#+/, "").replace} {/* Remove # symbols for clean formatting */}
        //     </p>
        
        //   ))
        ) : (
          <p>Please upload a Terms & Conditions file.</p>
        )}
      </div>
    </div>
  );
};

export default TermsText;
