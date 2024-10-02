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
          width: 300px;
          height: 150px;
          overflow: hidden;
          padding: 0;
          background-color: #fdfdfd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          z-index: 1000;
          opacity: 0;
          transition: all 0.4s ease-in-out;
        }

        .disclosure-sheet.expanded {
          height: 200px;
          padding: 15px;
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
          color: #555;
        }

        .close-button {
          background-color: transparent;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #999;
        }

        .sheet-body {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .icon-group {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .sheet-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px;
          font-size: 12px;
          cursor: pointer;
          background-color: #f5f5f5;
          border-radius: 8px;
          border: 1px solid #ddd;
          width: 100px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: background-color 0.2s;
        }

        .sheet-btn:hover {
          background-color: #ebebeb;
        }

        .sheet-btn i.icon {
          font-size: 24px;
          margin-bottom: 5px;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default DisclosureInteraction;
