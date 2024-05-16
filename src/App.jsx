import { useEffect, useState } from "react";
import "./App.css";
import useCrud from "./hooks/useCrud";
import FormUser from "./components/FormUser";
import UserCard from "./components/UserCard";

function App() {
  const [userSelected, setUserSelected] = useState();
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [users, getUsers, createUser, deleteUsers, updateUser] =
    useCrud("/users/");

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpenForm = () => {
    setFormIsOpen(true)
  }

  return (
    <div>
      
      <header>
        <h1 className="title">
          <i className="bx bx-user-pin">
            <span className="text">Users</span>
          </i>
        </h1>
        <button className="btn-create" onClick={handleOpenForm}><i className='bx bxs-user-plus'> Create New User</i></button>
      </header>

      <FormUser
        createUser={createUser}
        userSelected={userSelected}
        updateUser={updateUser}
        setUserSelected={setUserSelected}
        formIsOpen={formIsOpen}
        setFormIsOpen={setFormIsOpen}
      />
      <div className="user-container">
        {users?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            deleteUsers={deleteUsers}
            setUserSelected={setUserSelected}
            setFormIsOpen={setFormIsOpen}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
