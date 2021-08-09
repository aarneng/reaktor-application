import React from "react"
import "./display_styles.css"

const DisplayRules = ({ rules, getId, generateKey, search }) => {

  rules = rules.split("\n")

  if (!search) return(
    rules.map(text => {
      if (!text) return null
      const id = getId(text)
      return (
        <div className="rules" key={generateKey()}>
          <RulePart
          text={text}
          id={id}
        />
        </div>
        
      )}
    )
  )
  return(
    <div>
      <h2>Rules that contains the {search.includes(" ") ? "words" : "word"} "{search}" </h2>
      {rules.map(text => {
        const id = getId(text)
        if (!text || (!isTitle(id) && !text.toLowerCase().includes(search.toLowerCase())) ) return null
        return (
          <div className="rules" key={generateKey()}>
            <RulePart
            text={text}
            id={id}
            />
          </div>
          )}
      )}
    </div>
  )
}

function containsKeyword(text, keywords) {
  if (!text) return false
  text = text.toLowerCase()
  for (let keyword of keywords) {
    if (text.includes(keyword.toLowerCase())) return true
  }
  return false
}

function isTitle(id) {
  return id && id.length <= 4
}

const RulePart = ({text, id}) => {
  const keywords = ["Rules", "Glossary", "Credits"]
  if (containsKeyword(id, keywords)) return (
    <h2 id={id}>
      {text}
    </h2>
  )
  if (id && id.length < 4) return (
    // non-titles have an id with length 4 (if there even is an id in the first place)
    // so if the id exists and the length is not 4 we know that it should be a title
    <h3 id={id}>
      {text}
    </h3>
  )
  if (id && id.length === 4) return (
    <h4 id={id}>
      {text}
    </h4>
  )
  // if (isRule) return (
  //   <RulePartAndHighlight text={text} id={id} />
  // )
  return (
    <div id={id}>
      {text}
    </div>
  )
}

// function isRule(text) {
//   if (!text.include("rule")) return false
//   return /^-?\d+$/.test((text.split("rule")[1][2]))
// }

// function extractRulePart(text) {

// }

// const RulePartAndHighlight = ({text, id}) => {
//   const splitText = text.split("rule")
//   return (
//     <div id={id}>
//       {splitText[0]}
//       <div className="rule-highlight">
//         rule{splitText.slice(1)}
//       </div>
//     </div>
//   )
// }

export default DisplayRules