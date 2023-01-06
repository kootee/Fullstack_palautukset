const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log(props)
    return (
      <div>
        <Part part={props.part1} exercises={props.exercises1} />
        <Part part={props.part2} exercises={props.exercises2} />
        <Part part={props.part3} exercises={props.exercises3} />
      </div>
    )
  }
  
  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>{props.part} {props.exercises} </p>
      </div>
    )
  }
  
  const Total = (props) => {
    console.log(props)
    return (
      <div>
        {props.exercises1 + props.exercises2 + props.exercises3}
      </div>
    )
  }
  
  return (
    <div>
        <Header course={course} />
        <Content part1={course.parts[0].name} part2={course.parts[1].name} part3={course.parts[2].name} exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
        <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
    </div>
    )
  }

export default App
