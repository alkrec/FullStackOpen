const Notification = (props) => {
  const { info } = props

  if (!info) {
    return null
  }

  const style = {
    color: info.type ==='error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }



  return (
    <div style={style} id="notification">
      {info.message}
    </div>
  )
}

export default Notification