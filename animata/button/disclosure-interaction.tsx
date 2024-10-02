import React, { useState } from "react";

const DisclosureInteraction: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleSheet = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="disclosure-interaction-container">
      <button className={`main-button ${isExpanded ? "hidden" : ""}`} onClick={toggleSheet}>
        Create New +
      </button>

      <div className={`disclosure-sheet ${isExpanded ? "expanded" : "collapsed"}`}>
        <div className="sheet-header">
          <span>Create New</span>
          <button className="close-button" onClick={toggleSheet}>
            X
          </button>
        </div>
        <div className="sheet-body">
          <div className="icon-group">
            <button className="sheet-btn">
              <i className="icon">📁</i>
              <span>Project</span>
            </button>
            <button className="sheet-btn">
              <i className="icon">📝</i>
              <span>Task</span>
            </button>
            <button className="sheet-btn">
              <i className="icon">🗒️</i>
              <span>Note</span>
            </button>
          </div>
          <div className="icon-group">
            <button className="sheet-btn">
              <i className="icon">🏆</i>
              <span>Goal</span>
            </button>
            <button className="sheet-btn">
              <i className="icon">🚩</i>
              <span>Milestone</span>
            </button>
            <button className="sheet-btn">
              <i className="icon">📅</i>
              <span>Reminder</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .disclosure-interaction-container {
          position: relative;
          display: inline-block;
        }

        .main-button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 8px;
          background-color: #f5f5f5;
          border: none;
          color: #333;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: opacity 0.3s ease-in-out;
        }

        .main-button.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .disclosure-sheet {
          position: absolute;
          top: 0;
          width: 250px;
          height: 0;
          overflow: hidden;
          padding: 0;
          background-color: #f8f5f0; 
          border-radius: 16px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          opacity: 0;
          transition: all 0.4s ease-in-out;
        }

        .disclosure-sheet.expanded {
          height: 200px; 
        //   padding: 5px;
          opacity: 1;
        }

        .disclosure-sheet.collapsed {
          height: 0;
          padding: 0;
          opacity: 0;
        }

        .sheet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-weight: bold;
          color: #333; 
          font-size: 16px;
          padding:15px;
        }

        .close-button {
          background-color: transparent;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #999;
        }

        .sheet-body {
        width: 250px;
        height: 180px;
          background-color: white;
          border-radius: 25px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .icon-group {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .sheet-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px;
          font-size: 12px;
          cursor: pointer;
          background-color: transparent;
          border: none;
          width: 80px; /* Fixed width to match the icons */
        }

        .sheet-btn i.icon {
          font-size: 24px;
          margin-bottom: 5px;
          color: #666; /* Light gray icons */
        }

        .sheet-btn span {
          font-size: 12px;
          color: #666; /* Light gray text */
        }

        /* Hover effects for buttons */
        .sheet-btn:hover i.icon, .sheet-btn:hover span {
          color: #333; /* Darker hover effect */
        }
      `}</style>
    </div>
  );
};

export default DisclosureInteraction;
