// Component to enter the user name and establish a socket connection
import React, { useEffect } from 'react'
import { v4 as uuid } from 'uuid'

export default function EnterUsername({ userName, customID, setCustomID, setUserNameInput, userNameInput, socket, setUserName
}) {
	// handling user submitting the name
	const submitUserName = (e) => {
		e.preventDefault()
		// setting user name to state
		setUserName(userNameInput)
		// saving userName in the session storage
		const customID = userNameInput + uuid()
		localStorage.setItem('userName', userNameInput)
		localStorage.setItem('customID', customID)
		setCustomID(customID)
		// connecting to the socket in the server
		connect(userNameInput, customID)
		// clearing the input
		setUserNameInput('')
	}

	// establishing a connection
	const connect = (user, customID) => {
		// setting user name to socket auth
		console.log('customid in connect ', customID)
		socket.auth = { userName: user, customID }
		// connecting to the server
		socket.connect()
	}

	// checking if the user name is saved in the session storage
	useEffect(() => {
		const userName = localStorage.getItem('userName')
		if (userName) {
			setUserName(userName)
			connect(userName, customID)
		}
	}, [])


	return (
		<section>
			{!userName ? <form onSubmit={submitUserName}>
				<label>Please enter your name: </label>
				<input onChange={(e) => { setUserNameInput(e.target.value) }} value={userNameInput}></input>
				<button>Ok</button>
			</form> :
				<h2>Logged in as: {userName}</h2>}
		</section>
	)
}