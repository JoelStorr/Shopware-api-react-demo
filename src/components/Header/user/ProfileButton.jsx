import React from 'react'

export default function ProfileButton({userData}) {
  console.log('UserData',userData)
  return (
    <button>Hello: {userData.firstName} </button>
  )
}

