import React from 'react'

export default function EnterUsername({userName,setUserNameInput,userNameInput,socket,setUserName
}) {
	// handling user submitting the name
	const submitUserName = (e) => {
		e.preventDefault()
    // setting user name to state
		setUserName(userNameInput)
    // setting user name to socket auth
		socket.auth = {userName: userNameInput}
    // connecting to the server
		socket.connect()
    // clearing the input
		setUserNameInput('')
	}
	return (
		<section>
		{!userName ? <form onSubmit={submitUserName}>
		<label>Please enter your name: </label>
		<input onChange={(e)=>{setUserNameInput(e.target.value)}} value={userNameInput}></input>
		<button>Ok</button>
		</form>:
		<p>Your name is: {userName}</p>}
		</section>
		)
}