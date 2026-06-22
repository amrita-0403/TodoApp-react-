
import './App.css';
import React,{useState} from "react";

function App() {
const [task,setTask]=useState("");
const [tasks,setTasks]=useState([]);

const [filter, setFilter] = useState("All");

const [editIndex, setEditIndex] = useState(null);
const [editText, setEditText] = useState("");

// const addTask=()=>{
//   if(task.trim()==="") return;

//   setTasks([...tasks,task]);
//   setTask("");
// };

const addTask = () => {
  if (task.trim() === "") return;

  setTasks([
    ...tasks,
    {
      text: task,
      completed: false,
    },
  ]);

  setTask("");
};

const toggleComplete = (index) => {
  const updated = [...tasks];

  updated[index].completed =
    !updated[index].completed;

  setTasks(updated);
};



const deleteTask=(index)=>{
  const afterdelete =tasks.filter((_,i)=>
    i!==index
  );
  setTasks(afterdelete);

};
const filteredTasks = tasks.filter((task) => {
  if (filter === "Pending") return !task.completed;
  if (filter === "Completed") return task.completed;
  return true;
});

const startEdit = (index) => {
  setEditIndex(index);
  setEditText(tasks[index].text);
};

const saveEdit = (index) => {
  const updated = [...tasks];

  updated[index].text = editText;

  setTasks(updated);
  setEditIndex(null);
  setEditText("");
};







  return (
    <div className='mainblock'>
    <div className='headings'>
    <h1>My To-Do List</h1>
    <h5>Stay organised. Get things done</h5>
    </div>
    <div className='mainpart'>
    <div>
      <input  
          type="text"
          placeholder="What's on your mind today?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
      />
      <button className='add' onClick={addTask}>
          Add Task
        </button>
    </div>

    <div className="tab-container">
  <button
    className={`tab-btn ${filter === "All" ? "active" : ""}`}
    onClick={() => setFilter("All")}
  >
    All
  </button>

  <button
    className={`tab-btn ${filter === "Pending" ? "active" : ""}`}
    onClick={() => setFilter("Pending")}
  >
    Pending
  </button>

  <button
    className={`tab-btn ${filter === "Completed" ? "active" : ""}`}
    onClick={() => setFilter("Completed")}
  >
    Completed
  </button>
</div>

      





    <div className="task-list">
  {filteredTasks.map((item, index) => (
    <div className="task-card" key={index}>
      <div className="left-section">
        <button
          className={`check-btn ${item.completed ? "completed" : ""}`}
          onClick={() => toggleComplete(index)}
        >
          {item.completed && "✓"}
        </button>

       {editIndex === index ? (
  <input
    className="edit-input"
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        saveEdit(index);
      }
    }}
  />
) : (
  <span className={item.completed ? "task-done" : ""}>
    {item.text}
  </span>
)}

      </div>

      <div className="actions">
       <button
  className="edit-btn"
  onClick={() =>
    editIndex === index
      ? saveEdit(index)
      : startEdit(index)
  }
>
  <i
    className={`bi ${
      editIndex === index
        ? "bi-check-lg"
        : "bi-pencil"
    }`}
  ></i>
</button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(index)}
        >
          <i className="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  ))}
</div>


    </div>
    </div>
  );
}

export default App;


