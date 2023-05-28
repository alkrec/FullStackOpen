import { useState } from 'react'

const Togglable = (props) => {
  const {buttonLabel} = props
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''} // when visible is true then display: 'none'. When visible false display then display: ''
  const showWhenVisible = { display: visible ? '' : 'none'} // when visible is true then display: ''. When visible false display then display: 'none'

  const toggleVisibility = () => {
    setVisible(!visible) //switch visible from true to false, and from false to true
  }


  return(
    <div>
      <div style={hideWhenVisible}> {/* Hidden when visible is true .  Displayed when visible is false*/}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}> {/* Displayed when visible is true. Hidden when visible is false */}
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable