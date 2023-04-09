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
      <strong>total of {total} exercises</strong>
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

export default Course