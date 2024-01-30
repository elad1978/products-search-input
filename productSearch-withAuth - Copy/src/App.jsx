import { useState, useEffect } from "react";
import ListItem from "./components/ListItem";
import SearchInput from "./components/SearchInput";
import Login from "./components/Login";
import { useSignOut } from "react-auth-kit";
import { useIsAuthenticated } from "react-auth-kit";

function App() {
  const [products, setProducts] = useState([]);
  const isAuthenticated = useIsAuthenticated();
  //console.log(localStorage.getItem("_auth"));

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        setProducts(products);
      });
  }, []);

  const searchResult = (p) => {
    fetch(`http://localhost:3000/api/products/${p}`)
      .then((res) => {
        return res.json();
      })
      .then((searchResult) => {
        setProducts(searchResult);
      });
  };

  const handleRemove = (id) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`http://localhost:3000/api/products/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => setProducts([...data]));
  };

  const singOut = useSignOut();

  if (isAuthenticated()) {
    return (
      <>
        <div className="m-5 row">
          <h1>ToDo List</h1>
          <div className="col-8">
            <SearchInput searchResult={searchResult}> </SearchInput>
            <ListItem
              products={products}
              handleRemove={handleRemove}
            ></ListItem>
          </div>
          <div className="col-4">
            <button
              className="btn btn-primary m-1"
              type="button"
              onClick={singOut}
            >
              SignOut
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="m-5 row">
        <Login />
      </div>
    );
  }
}

export default App;
