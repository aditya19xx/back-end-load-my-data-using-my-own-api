
import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch('http://localhost:9000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = { name: name, email: email }

    // send data to the server

    fetch('http://localhost:9000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);
      })

    nameRef.current.value = '';
    emailRef.current.value = '';

    e.preventDefault();
  }
  return (
    <div className="App">
      <h2>Load data: {users.length} </h2>

      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="email" name="" id="" ref={emailRef} placeholder="Email" />
        <input type="submit" value="Submit" />
      </form>

      <ul>
        {
          users.map(user => <li className="user-data">

            {user.name}
            <br />
            {user.age}
            <br />
            {user.city}
            <br />
            {user.country}
          </li>)
        }
      </ul>
    </div>
  );
}

export default App;
