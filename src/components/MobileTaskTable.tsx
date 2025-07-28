"use client";
import React, { useState } from "react";
import styles from "../styles/MobileView.module.css";
import DropDown from "./DropDown";
import ActionButton from "./ActionButton";
import { Task, useTaskContext } from "../context/TaskContext";

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks = [] }) => {
  const { editTask, deleteTask } = useTaskContext();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className={styles.accordionContainer}>
      {tasks.map((task, index) => (
        <div key={task.id} className={styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => toggleRow(index)}
          >
            <div className={styles.accordionHeaderContent}>
              <p>
                <strong>SL.No</strong > <strong  style={{ color: "#171717" }}>{index + 1}</strong>
              </p>
              <p>
                <strong>Title</strong> <strong style={{ color: "#171717" }}>{task.name}</strong>
              </p>
            </div>
            <span className={styles.arrow}>
              {expandedRow === index ? "▲" : "▼"}
            </span>
          </div>

          {expandedRow === index && (
            <div className={styles.accordionBody}>
              {/* <div className={styles.row}>
                <strong>SL.No</strong> <span>{index + 1}</span>
              </div>
              <div className={styles.row}>
                <strong>Title</strong> <span>{task.name}</span>
              </div> */}
              <div className={styles.row}>
                <strong>Description</strong> <span>{task.description}</span>
              </div>
              <div className={styles.row}>
                <strong>Due Date</strong> <span>{task.dueDate}</span>
              </div>
              <div className={styles.row}>
                <strong>Status</strong>
                <span
                  className={`${styles.status} ${
                    styles[task.status.toLowerCase().replace(" ", "-")]
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className={styles.row}>
                <strong>Priority</strong>
                <DropDown
                  onChange={(priority) =>
                    editTask(task.id, { ...task, priority })
                  }
                  initialPriority={task.priority}
                />
              </div>
              <div className={styles.actionsContainer}>
                <ActionButton task={task} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskTable;
