import React from "react"


const DisplayCredits = ({ credits, getId, generateKey }) => {

  credits = credits.split("\n").filter(i => {if (i) return i; else return null})

  return(
    credits.map((text, index) => {
      if (!text) return null
      const id = getId(text)
      return (
        <div className="credits" key={generateKey()}>
          <CreditsPart
            text={text}
            id={id}
          />
        </div>
      )}
    )
  )
}

const CreditsPart = ({text, id}) => {
  if (text.toLowerCase().includes("credits")) return (
    <h2 id={id}>
      {text}
    </h2>
  )
  return (
    <div id={id}>
      {text}
    </div>
  )
}

export default DisplayCredits