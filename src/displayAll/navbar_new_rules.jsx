import React from "react"
import "../style.css"

const NavbarNewRules = ({urlSearch, setUrlSearch, searchUrlRef, newRuleService, setNotification, setIntroText, setContents, setRules, setGlossary, setCredits}) => {
  function handleGettingRules(url) {
    newRuleService.getNewRules(url).then(rules => {
      let splitAt = "If you have questions, you can get the answers from us at Support.Wizards.com."
      let splitRules = rules.split(splitAt)
      setIntroText(splitRules[0] + splitAt)
      
      splitAt = "Credits"
      splitRules = splitRules[1].split(splitAt)
      setContents(splitRules[0] + splitAt + "\n")
      
      splitAt = "Glossary"
      splitRules = splitRules[1].split(splitAt)
      setRules("Rules\n" + splitRules[0])
      setGlossary(splitAt + "\n" + splitRules[1])
      
      setCredits("Credits\n" + rules.split("Credits")[2])
    }).catch (e => {
      console.log(e)
      setNotification("Oh no! an error occured! :( " + e.name + ": " + e.message)
      setTimeout(() => setNotification(null), 150000)
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const valNow = searchUrlRef.current.value
    setUrlSearch(valNow)
    handleGettingRules(valNow)
    searchUrlRef.current.value = ""
  }
  return (
    <div className="navbar-element">
      <form onSubmit={handleSubmit}>
        <div>
          (BETA) Input url for new set of rules
          <input
            type="text"
            ref={searchUrlRef}
            name="Username"
            id="username"
            style={{marginLeft: "10px"}}
          />
          <button
            id="search-url-button"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
      <div className="note">
        (made sure that the site only has plaintext and is very similar to the original in terms of formatting)
      </div>
    </div>
  )
}

export default NavbarNewRules
