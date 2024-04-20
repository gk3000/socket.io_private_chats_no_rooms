import React,{useEffect} from 'react'

export default function EnterUsername({userName,setUserNameInput,userNameInput,socket,setUserName
}) {
	// handling user submitting the name
	const submitUserName = (e) => {
		e.preventDefault()
    // setting user name to state
		setUserName(userNameInput)
		// connecting to the socket in the server
		connect(userNameInput)
    // clearing the input
		setUserNameInput('')
		// saving userName in the session storage
		sessionStorage.setItem('userName', userNameInput)
	}

	// establishing a connection
	const connect = (user) => {
    // setting user name to socket auth
		socket.auth = {userName: user}
    // connecting to the server
		socket.connect()
	}

	// checking if the user name is saved in the session storage
	useEffect(()=>{
		const userName = sessionStorage.getItem('userName')
		if(userName){
			setUserName(userName)
			connect(userName)
		}
	},[])


	return (
		<section>
		{!userName ? <form onSubmit={submitUserName}>
		<label>Please enter your name: </label>
		<input onChange={(e)=>{setUserNameInput(e.target.value)}} value={userNameInput}></input>
		<button>Ok</button>
		</form>:
		<h2>Logged in as: {userName}</h2>}
		</section>
		)
}