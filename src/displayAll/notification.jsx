import React from "react"
import "./display_styles.css"

const Notification = ({notification}) => {
  if (!notification) return null
  return (
    <div className="notification">
      {notification}
    </div>
  )
}

export default Notification