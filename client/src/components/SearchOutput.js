import React, { Fragment } from "react";

const SearchOutput = ({ user: { username, email, age, country } }) => {
  return (
    <Fragment>
      <div>
        <h3>User: </h3>
        {username && <div>Username: {username} </div>}
        {email && <div>Email: {email} </div>}
        {age && <div>Age: {age}</div>}

        {country && <div>Country: {country}</div>}
      </div>
    </Fragment>
  );
};

export default SearchOutput;
