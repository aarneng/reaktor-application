import React from "react"

const DisplayGlossary = ({ glossary, getId, generateKey, search }) => {
  if (!glossary) return null
  
  glossary = glossary.split("\n\n\n")
  let glossaryToUse = [glossary[0]]
  glossaryToUse.push(glossary[1].split("\n\n"))
  glossaryToUse = glossaryToUse.flat()
  if (!search) return (
    glossaryToUse.map((text, index) => {
      if (!text) return null
      const glosssaryTitle = text.split("\n")[0]
      const glossaryText   = text.split("\n").slice(1)
      const id = getId(text)
      return (
        <div className="glossary" key={generateKey()}>
          <GlossaryPart
            text={glosssaryTitle}
            isTitle={true}
            id={id}
          />
          <GlossaryPart
            text={glossaryText}
            isTitle={false}
            id={id}
            generateKey={generateKey}
          />
        </div>
      )}
    )
  )
  return (
    <div>
      <h2>Glossary items that contains the {search.includes(" ") ? "words" : "word"} "{search}" </h2>
      {glossary.map((text, index) => {
        if (!text|| !text.toLowerCase().includes(search.toLowerCase()) ) return null
        const glosssaryTitle = text.split("\n")[0]
        const glossaryText   = text.split("\n").slice(1)
        const id = getId(text)
        return (
          <div className="glossary" key={generateKey()}>
            <GlossaryPart
              text={glosssaryTitle}
              isTitle={true}
              id={id}
            />
            <GlossaryPart
              text={glossaryText}
              isTitle={false}
              id={id}
              generateKey={generateKey}
            />
          </div>
        )}
      )}
    </div>
  )
}

const GlossaryPart = ({text, id, isTitle, generateKey}) => {
  if (!text) return null
  if (typeof text === "string" && text.toLowerCase().includes("glossary")) return (
    <h2 id={id}>
      {text}
    </h2>
  )
  if (isTitle) return (
    <h3 id={id}>
      {text}
    </h3>
  )
  return (
    text.map(i => {
      return (
        <div id={id} key={generateKey()}>
          {i}
        </div>
      )
    })
  )
}

export default DisplayGlossary