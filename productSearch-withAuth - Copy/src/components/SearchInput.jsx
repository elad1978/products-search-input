// import React, { useState } from 'react'

const searchInput = (props) => {
  // const [text, setText] = useState("")
  // console.log(text)
  // const submit = (e) => {
  //   e.preventDefault()
  //   //props.searchResult(text)
  //   setText("")
  // }
  const setInput = (e) => {
    // setText(e.target.value)
    props.searchResult(e.target.value);
  };
  return (
    <>
      <h2>Search</h2>
      {/* <form onSubmit={submit}> */}
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          search something
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="search..."
          aria-label="Username"
          aria-describedby="addon-wrapping"
          onInput={setInput}
          // value={text}
          required
        />
      </div>
      {/* <input className='btn btn-primary mt-2' type="submit" value="submit" /> */}
      {/* </form> */}
    </>
  );
};

export default searchInput;
