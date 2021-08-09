import React from "react"
import "./display_styles.css"

const DisplayContents = ({contents, getId, generateKey}) => {

  contents = contents.split("\n")

  return(
    contents.map(text => {
      const id = getId(text)
      return (
        <div onClick={() => handleIdClick(id)} className="content-element" key={generateKey()}>
          <ContentPart
            text={text}
            id={id}
          />
        </div>
      )}
    )
  )
}

const ContentPart = ({text, id}) => {
  if (id && id.length !== 4) return (
    // non-titles have an id with length 4 (if there even is an id in the first place)
    // so if the id exists and the length is not 4 we know that it should be a title
    <h3>
      {text}
    </h3>
  )
  return (
    <div>
      {text}
    </div>
  )
}

function getElement(id) {
  let element
  try {
    element = document.getElementById(id)
  }
  catch (TypeError) {
    
  }
  element = element || document.getElementById("Root")
  return element
}

function vhToPx(vh) {
  return window.outerHeight * vh / 100
}

function getNavHeight() {
  const vh = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height');
  if (vh.includes("7")) return 8
  if (vh.includes("15")) return 17
  if (vh.includes("30")) return 35
  return 50
}

function handleIdClick(id) {
  console.log(id)
  const element = getElement(id)
  const bodyRect = document.body.getBoundingClientRect().top;
  const headeroffsetPixels = vhToPx(getNavHeight())
  const offsetElementPosition = element.getBoundingClientRect().top - headeroffsetPixels - bodyRect

  window.scrollTo({
    top: offsetElementPosition,
    behavior: "smooth"
  })
}


export default DisplayContents