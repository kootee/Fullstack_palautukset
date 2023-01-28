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

const remove = id => {
    console.log(`Axios remove ${baseUrl}${id}`)
    const request = axios.delete(`${baseUrl}${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log(`Axios put ${baseUrl}${id}`)
    console.log(newObject)
    const request = axios.put(`${baseUrl}${id}`, newObject)
    return request.then(response => response.data)
}

const exportedObject = {
    getAll,
    create,
    remove,
    update
}

export default exportedObject