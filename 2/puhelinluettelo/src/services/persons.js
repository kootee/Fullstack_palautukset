import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {
        console.log(response)
        return response.data
    })
}

const remove = personId => {
    console.log(`Axios remove ${baseUrl}/${personId}`)
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

const exportedObject = {
    getAll,
    create,
    remove
}

export default exportedObject