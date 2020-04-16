import React from 'react'

const Notification = ({ message }) => {
  let templateStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    align: 'center',
    color: 'green'
  }
  const style = message.type ? templateStyle: { ...templateStyle, color:'red' }
  if(message.body === ''){
    return null
  }
  return(
    <div id='notif-div' style={ style }>
      { message.body }
    </div>
  )
}

export default Notification