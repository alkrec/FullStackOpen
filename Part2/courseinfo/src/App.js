const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const listParts = parts.map((part) => <Part key={part.id} part={part}></Part>)
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
  //console.log(total)
  return (
    <div>
      {listParts}
      <p>total of {total} exercises</p>
    </div>
  )
}


const Header = (props) => {
  const { title } = props
  return (
    <h2>{title}</h2>
  )
}

const Course = (props) => {
  const { course } = props
  return (
    <div>
      <Header title={course.name}></Header>
      <Content parts={course.parts}></Content>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const displayCourses = courses.map(course => <Course key={course.id} course={course}/>)

  return (
    <div>{displayCourses}</div>
  )
}

export default App