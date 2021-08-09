// import fullRules from "./rules.txt"
import React, { useState, useEffect, useRef } from 'react';
import "./style.css"
import DisplayContents from "./displayAll/displayContents";
import DisplayRules from "./displayAll/displayRules";
import DisplayCredits from "./displayAll/displayCredits";
import DisplayGlossary from "./displayAll/displayGlossary";
import NavbarSearch from "./displayAll/navbar_search";
import NavbarNewRules from './displayAll/navbar_new_rules';
import Notification from './displayAll/notification';
import ruleService from "./services/rules"
import newRuleService from "./services/get_new_rules"

function App() {
  /* eslint-disable-next-line no-unused-vars*/
  const [introText, setIntroText] = useState("")
  const [contents, setContents] = useState("")
  const [rules, setRules] = useState("")
  const [glossary, setGlossary] = useState("")
  const [credits, setCredits] = useState("")
  const [search, setSearch] = useState("")
  const [notification, setNotification] = useState("")
  const searchRef = useRef()
  const [urlSearch, setUrlSearch] = useState("")
  const searchUrlRef = useRef()
  
  // let idsAndActiveStatus = {}

  useEffect(() => {
    ruleService.getRules().then(rules => {
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
    })
  })

  function getId(rule) {
    const ruleNumber = rule.split(" ")[0].trim()
    // if (!idsAndActiveStatus.ruleNumber) idsAndActiveStatus.ruleNumber = true
    return ruleNumber ? ruleNumber : null
  }

  function generateKey() {
    // with our ≈ 10 000 unique keys there is an approximate 0.0000008% chance of overlap using this method, which i find acceptable
    const length = 1000000000000
    return Math.floor(length * Math.random())
  }

  return (
    <div>
      <div className="navbar">
        <ul className="navbar-nav">
          <div className="navbar-element" onClick={ () => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top
          </div>
          <NavbarSearch search={search} setSearch={setSearch} searchRef={searchRef} />
          <NavbarNewRules 
            urlSearch={urlSearch} 
            setUrlSearch={setUrlSearch} 
            searchUrlRef={searchUrlRef} 
            newRuleService={newRuleService} 
            setNotification={setNotification} 
            setIntroText={setIntroText} 
            setContents={setContents} 
            setRules={setRules} 
            setGlossary={setGlossary} 
            setCredits={setCredits}
          />
        </ul>
      </div>
      <div className="grid everything">
        <div className="contents-outer">
          <div className="contents-inner">
            <DisplayContents contents={contents} getId={getId} generateKey={generateKey}/>
          </div>
        </div>
        <div id="Root" className="rules">
          <Notification notification={notification} />
          <DisplayRules rules={rules}            getId={getId} generateKey={generateKey} search={search} />
          <DisplayGlossary glossary={glossary}   getId={getId} generateKey={generateKey} search={search} />
          <DisplayCredits credits={credits}      getId={getId} generateKey={generateKey}/>
        </div>
      </div>
    </div>
  );
}

export default App;
