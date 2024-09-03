import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

const TagManagement = () => {
  const [incomeTags, setIncomeTags] = useState([]);
  const [expenseTags, setExpenseTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [isRecurrent, setIsRecurrent] = useState(false);

  const loadTags = async () => {
    try {
      // Fetching income and expense tags
      const incomeResponse = await axios.get(
        "http://localhost:3000/incometags/tags"
      );
      const expenseResponse = await axios.get(
        "http://localhost:3000/expensetags/tags"
      );

      // Directly set the arrays returned by the backend
      setIncomeTags(incomeResponse.data);
      setExpenseTags(expenseResponse.data);

      // Log responses to verify
      console.log("Income Tags:", incomeResponse.data);
      console.log("Expense Tags:", expenseResponse.data);
    } catch (error) {
      console.error("Failed to fetch tags", error);
      setIncomeTags([]); // Fallback to empty array on error
      setExpenseTags([]); // Fallback to empty array on error
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  const handleAddTag = async (type) => {
    try {
      if (type === "income") {
        await axios.post("http://localhost:3000/incometags/add", {
          name: newTagName,
          is_recurrent: isRecurrent,
        });
      } else if (type === "expense") {
        await axios.post("http://localhost:3000/expensetags/add", {
          name: newTagName,
          is_recurrent: isRecurrent,
        });
      }
      setNewTagName("");
      setIsRecurrent(false);
      loadTags(); // Refresh the tag list
    } catch (error) {
      console.error("Failed to add tag", error);
    }
  };

  const handleDeleteTag = async (id, type) => {
    try {
      if (type === "income") {
        await axios.delete(`http://localhost:3000/incometags/delete/${id}`);
      } else if (type === "expense") {
        await axios.delete(`http://localhost:3000/expensetags/delete/${id}`);
      }
      loadTags(); // Refresh the tag list
    } catch (error) {
      console.error("Failed to delete tag", error);
    }
  };

  return (
    <div className="tag-management">
      <h2>Manage Tags</h2>

      {/* Add New Tag Section */}
      <div className="add-tag">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="New tag name"
        />
        <label>
          <input
            type="checkbox"
            checked={isRecurrent}
            onChange={(e) => setIsRecurrent(e.target.checked)}
          />
          Recurrent
        </label>
        <button onClick={() => handleAddTag("income")}>
          <FontAwesomeIcon icon={faPlus} /> Add Income Tag
        </button>
        <button onClick={() => handleAddTag("expense")}>
          <FontAwesomeIcon icon={faPlus} /> Add Expense Tag
        </button>
      </div>

      {/* Income Tags Section */}
      <div className="income-tags">
        <h3>Income Tags</h3>
        <ul>
          {incomeTags.length > 0 ? (
            incomeTags.map((tag) => (
              <li key={tag.id}>
                <span>{tag.name}</span>
                {tag.is_recurrent && <FontAwesomeIcon icon={faCheckSquare} />}
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-icon"
                  onClick={() => handleDeleteTag(tag.id, "income")}
                />
              </li>
            ))
          ) : (
            <li>No income tags found.</li>
          )}
        </ul>
      </div>

      {/* Expense Tags Section */}
      <div className="expense-tags">
        <h3>Expense Tags</h3>
        <ul>
          {expenseTags.length > 0 ? (
            expenseTags.map((tag) => (
              <li key={tag.id}>
                <span>{tag.name}</span>
                {tag.is_recurrent && <FontAwesomeIcon icon={faCheckSquare} />}
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-icon"
                  onClick={() => handleDeleteTag(tag.id, "expense")}
                />
              </li>
            ))
          ) : (
            <li>No expense tags found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TagManagement;
