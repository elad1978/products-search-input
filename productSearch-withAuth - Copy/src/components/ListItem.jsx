import React from "react";
import { useState, useEffect } from "react";

const ListItem = (props) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({})
  console.log(user);

  useEffect(() => {
    setToken(localStorage.getItem("_auth"));
    //console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const options = {
      method:'GET',
      headers,
    };
    fetch("http://localhost:3000/api/users/getUser",options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
        
      });
      console.log(user);
  }, [token]);

  return (
    <>
      <h2>result</h2>
      <div>
        {props.products instanceof Array ? (
          <ul className="list-group m-1">
            {props.products.map((p) => (
              <li className="list-group-item" key={p.id}>
                <span>Product: {p.name} </span>
                {user.role == "admin"?<button type="button" className="btn btn-primary m-1" onClick={()=>props.handleRemove(p.id)}>✖️</button>:<span></span>}
                
              </li>
            ))}
          </ul>
        ) : (
          <h2>{props.products.text}</h2>
        )}
      </div>
    </>
  );
};

export default ListItem;
