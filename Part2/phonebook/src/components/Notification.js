const Notification = (props) => {
    const { message, isError } = props

    const notificationSuccessStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        borderStyle: 'solid'
    }

    const notificationFailureStyle = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 16,
        borderStyle: 'solid'
    }

    if (message === null) {
        return null
    }

    if(isError === true) {
        return (
            <div style={notificationFailureStyle}>
                <strong>{message}</strong>
            </div>
        )
    } else {
        return (
            <div style={notificationSuccessStyle}>
                <strong>{message}</strong>
            </div>
        )
    }

}

export default Notification