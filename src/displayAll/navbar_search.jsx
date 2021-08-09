import React from "react"
import "../style.css"

const NavbarSearch = ({search, setSearch, searchRef}) => {
  function handleSubmit(e) {
    e.preventDefault()
    setSearch(searchRef.current.value)
    searchRef.current.value = ""
  }
  return (
    <div className="navbar-element">
      <form onSubmit={handleSubmit}>
        <div>
          Search for a rule 
          <input
            type="text"
            ref={searchRef}
            name="Username"
            id="username"
            style={{marginLeft: "10px"}}
          />
          <button
            id="login-button"
            type="submit"
            >
          search
          </button>
        </div>
      </form>
    </div>
  )
}

export default NavbarSearch