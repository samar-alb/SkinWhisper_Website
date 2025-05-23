import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./problemContent.css";
import { MapImage } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const ProblemContent = ({ category }) => {
  const [problemData, setProblemData] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/SkinProblem/list"
        );
        setProblemData(response.data.data);
      } catch (error) {
        console.error("Error fetching problem data:", error);
      }
    };

    fetchProblemData();
  }, []);

  useEffect(() => {
    if (category !== "All") {
      const foundProblem = problemData.find(
        (item) => item.SkinProblem === category
      );
      setSelectedProblem(foundProblem || null);

      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setSelectedProblem(null);
    }
  }, [category, problemData]);

  const getImageForCategory = (categoryName) => {
    const foundImage = MapImage.find(
      (item) => item.menu_name.toLowerCase() === categoryName.toLowerCase()
    );
    return foundImage ? foundImage.menu_image : null;
  };

  const handleImageClick = () => {
    navigate("/product");
  };

  return (
    <div className="interactive-container">
      <div ref={contentRef} className="content-section">
        {selectedProblem ? (
          <div className="interactive-layout">
            {/* Image Section */}
            <img
              src={getImageForCategory(selectedProblem.SkinProblem)}
              alt={selectedProblem.SkinProblem || "Skin Problem"}
              className="interactive-photo"
              onClick={handleImageClick}
            />
            {/* Text Section */}
            <div className="text-section">
              <h1 className="problem-title">{selectedProblem.SkinProblem}</h1>
              <p className="problem-description">
                {selectedProblem.ProblemDescription}
              </p>
              <div className="solution-section">
                <h2 className="solution-title">Solution</h2>
                <p className="solution-text">{selectedProblem.Solution}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="placeholder">
            <h2>Welcome to SkinWhisper</h2>
            <p>Select a skin problem to explore details and solutions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemContent;
