import React from 'react'
import { ChatEngine } from 'react-chat-engine'

function AdminChat() {
  return (
    <ChatEngine 
      projectID={"a760508d-04d8-4331-84b7-781fc9371f90"}
      userName='GetThatJobAdmin'
      userSecret='GetThatJobAdmin'
      height='calc(100vh - 12px)'
    />
  )
}

export default AdminChat