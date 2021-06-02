import axios from "axios";
import React, { Fragment, useState } from "react";

import SearchOutput from "./SearchOutput";

const Search = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);

  const makeSearch = async (e) => {
    e.preventDefault();

    if (key === "gt" || key === "lt") {
      await axios.get(`/user/find/age/${value}/${key}`).then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
    } else if (key === "totalAge") {
      await axios.get(`/user/find/${key}`).then((res) => {
        setUsers(res.data);
      });
    } else if (key === "username" || key === "country") {
      const valueUp = value.charAt(0).toUpperCase() + value.slice(1);
      await axios.get(`/user/find/${key}/${valueUp}`).then((res) => {
        setUsers(res.data);
      });
    } else {
      await axios.get(`/user/find/${key}/${value}`).then((res) => {
        setUsers(res.data);
      });
    }

    setValue("");
  };

  return (
    <Fragment>
      <h2>you can search here!</h2>
      <form onSubmit={makeSearch}>
        <input
          type="text"
          name="key"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <select name="searches" onChange={(e) => setKey(e.target.value)}>
          <option value="">--Please choose an option--</option>
          <option value="email">email</option>
          <option value="age">age</option>
          <option value="username">Username</option>
          <option value="country">Country</option>
          <option value="gt">Greater than age</option>
          <option value="lt">Less than</option>
          <option value="totalAge">Total Age</option>
          <option value="avgAge">Average Age</option>
          <option value="min">Minimum Age</option>
          <option value="max">Max Age</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {<div>{users.msg}</div>}

      {users.length > 0 ? (
        <div>
          {users.map((user) => {
            return <SearchOutput user={user} key={user._id} />;
          })}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Search;
