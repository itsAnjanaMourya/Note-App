import React, { useState, useContext } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';

const Home = () => {
  const { currentUser, isAuthenticated, login} = useContext(AuthContext);
  const [note, setNote] = useState({ title: "", description: "", status: "" });
  const [list, setList] = useState([])
  const [editIndex, setEditIndex] = useState(null);

  // console.log("current user name", currentUser.username)
  const handleGetNote = async (e) => {
    let token;
    document.cookie.split(";").map(s => { token = s.startsWith("access") ? s.substring("access_token=".length) : "" });
    try {
      await axios.get("http://localhost:3200/notes/getNotes", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log("get response", res.data)
          if (res && Array.isArray(res.data)) {
            console.log("Fetched notes:", res.data);
            setList(res.data); // Set the entire list of notes
          } else {
            console.error("Notes data is not in the expected format.");
          }
        })

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      handleGetNote();
    }
    else{
      login()
      handleGetNote();
    }
  }, [isAuthenticated]);



  const handleAddNote = async (e) => {
    e.preventDefault();

    let token;
    document.cookie.split(";").map(s => { token = s.startsWith("access") ? s.substring("access_token=".length) : "" });
    try {
      if (editIndex !== null) {
        await axios.put(`http://localhost:3200/notes/updateNote/${list[editIndex]._id}`, {
          title: note.title,
          description: note.description,
          status: note.status
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(async (res) => {
          console.log(res)
          await handleGetNote()
          setNote({ title: "", description: "", status: "" })
          setEditIndex(null)
        })

      } else {
        await axios.post("http://localhost:3200/notes/addNote", { title: note.title, description: note.description, status: note.status }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        ).then(async (res) => {
          console.log("create response", res.data.note)
          if (res && res.data.note) {
            console.log("New note added:", res.data.note);
            setList((prevList) => [...prevList, res.data.note]);
          }
          setNote({ title: "", description: "", status: "" });
        })
      }
    } catch (error) {
      console.log(error)
    }

  }

  const handleEdit = (index) => {
    const actualIndex = list.length - 1 - index;
    setEditIndex(actualIndex);
    setNote(list[actualIndex]);
  };

  const handleDelete = async (index) => {
    const actualIndex = list.length - 1 - index;
    let token;
    document.cookie.split(";").map(s => { token = s.startsWith("access") ? s.substring("access_token=".length) : "" });
    try {
      axios.delete(`http://localhost:3200/notes/deleteNote/${list[actualIndex]._id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
        .then(async (res) => {
          await handleGetNote();
          console.log("note del", res)
        })
    } catch (error) {

    }
  }

  return (
    <>
      <div className="outer">
        <div className="TodoWrapper">

          <h2
            style={{ marginTop: "8%", marginBottom: "4%", color: "black" }}
          >Welcome, {isAuthenticated && currentUser ? `${currentUser.username} !` : "user ! please login"}
          </h2>
          {isAuthenticated &&
            <>
              <form onSubmit={handleAddNote} className="TodoForm">
                <label htmlFor="todo-input"></label>
                <input
                  type="text"
                  className="todo-input"
                  id="task"
                  name="title"
                  placeholder="Add a note..."
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
                <label htmlFor="todo-input"></label>
                <input
                  type="text"
                  className="todo-input"
                  id="task"
                  name="desc"
                  placeholder="Add description..."
                  value={note.description}
                  onChange={(e) => setNote({ ...note, description: e.target.value })}
                />

                <select
                  id="taskstatus"
                  name="taskstatus"
                  className="todo-btn"
                  defaultValue={"default"}
                  onChange={(e) => setNote({ ...note, status: e.target.value })}
                >
                  <option value="default" disabled>
                    Select Status
                  </option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <button type="submit" className="todo-btn">
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </form>
            </>
          }
          <div>
            {Array.isArray(list) && list.slice().reverse().map((data, i) => {
              if (!data) return null;

              return (
                <div key={i} className="Todo">
                  <div className="TodoTask">
                    <p className="show-task">Title: {data.title} </p>
                    <p className="show-task">Description:{data.description}</p>
                    <p className="show-status">Status: {data.status}</p>
                    <div>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: "white" }}
                        onClick={() => handleEdit(i)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="fa-trash"
                        style={{ color: "red" }}
                        onClick={() => handleDelete(i)}
                      />
                    </div>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
