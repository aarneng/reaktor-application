import axios from "axios"
const baseUrl = process.env.REACT_APP_RULES_URL

const getRules = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const exported = {
  getRules
}

export default exported
