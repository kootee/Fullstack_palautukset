const Course = ({ course }) => { 
  const total = course.parts.reduce(function (total, part) {
    return total + part.exercises
  }, 0)

  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map(part =>
          <Display key={part.id} part={part} />
        )}
    </ul>
    <p>Of total {total} exercises</p>
    </div>
  )
}

const Display =({ part }) => {
  console.log("from Display", part)

  return (
    <div>
      <li>{part.name} {part.exercises}</li>
    </div>
  )
} 

export default Course