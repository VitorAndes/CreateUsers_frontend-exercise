import { useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import "./style.css";

export function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/users");
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/users", {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value,
    });

    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  });

  return (
    <div className="container">
      <form action="" className="container_form">
        <h1 className="form_title">Cadastro de usuários</h1>
        <input
          placeholder="Nome"
          className="form_input"
          name="name"
          type="text"
          ref={inputName}
        />
        <input
          ref={inputAge}
          placeholder="Idade"
          className="form_input"
          name="idade"
          type="number"
        />
        <input
          ref={inputEmail}
          placeholder="Email"
          className="form_input"
          name="email"
          type="email"
        />
        <button className="form_button" onClick={createUsers} type="button">
          Cadastrar
        </button>
      </form>
      <div className="container_users">
        {users.map(({ id, name, email, age }) => (
          <div className="user_card" key={id}>
            <div className="user_card__infos">
              <p className="card_infos">
                Nome: <span> {name}</span>{" "}
              </p>
              <p className="card_infos">
                Idade: <span> {age}</span>{" "}
              </p>
              <p className="card_infos">
                Email: <span> {email}</span>{" "}
              </p>
            </div>
            <div>
              <button
                type="button"
                className="button_delete"
                onClick={() => deleteUsers(id)}
              >
                <img
                  className="button_image"
                  width={30}
                  height={30}
                  src="https://cdn-icons-png.flaticon.com/512/1869/1869668.png"
                  alt="Imagem de lixeira"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
