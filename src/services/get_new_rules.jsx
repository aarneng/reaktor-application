import axios from "axios"

const getNewRules = async (url) => {
  const response = await axios.get(url)
  return response.data
}

const exported = {
  getNewRules
}

export default exported
