import React, { useEffect } from 'react'
import { useState } from 'react'

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  // function to get the values from input and save it to db.json file
  const saveInfo = () => {
    fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        text: newTodo,
        isCompleted: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data])
        setNewTodo('')
      })
  }

  useEffect(() => {
    fetch('http://localhost:8080/todos')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data)
        // console.log(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      Todos
      <div>
        <div>
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          ></input>
          <button onClick={saveInfo}>+</button>
        </div>
        {todos.map((ele) => (
          <div key={ele.id}>{ele.text}</div>
        ))}
      </div>
    </div>
  )
}

export default Todos
