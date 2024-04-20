import {useState} from 'react'
import {socket, URL} from './socket'
import './App.css'

import EnterUsername from './components/EnterUsername'
import UserList from './components/UserList'
import ChatMessage from './components/ChatMessage'
import ChatList from './components/ChatList'

function App() {
  // handling user entering the name onChange
  const [userNameInput, setUserNameInput] = useState('')
  // saving user name onClick
  const [userName, setUserName] = useState('')
  // list of all connected users
  const [users, setUsers]=useState([])
    console.log('all users in app: ', users)
  // keeping track of the selected user to chat with
  const [selectedUser, setSelectedUser] = useState(null)

  const [customID, setCustomID]=useState(localStorage.getItem('customID'))

// handling connection error
  socket.on('connect_error', (err) => {
    if(err.message === 'missing username'){
      // if the error is missing username, clear the name from the state so the name input form is rendered again
      setUserName('')
    }
  })

// handling user disconnecting
  socket.on('users', (users) => {
    // sorting array to put the current user first
    users.sort((a, b) => {
      if (a.userName === userName) {
        return -1;
      }
      if (b.userName === userName) {
        return 1;
      }
      return 0;
    });
// setting the users to state
    setUsers([...users])
  })

// handling new user connecting so the existing users will see the newcomer
  socket.on('user connected', (user) => {
    // adding the new user to the list of users
    setUsers((currentUsers) => {
      const userIdx = currentUsers.findIndex(u => u.userId === user.userId)
      if (userIdx === -1) {
        return [...currentUsers, user]
      }else{
        currentUsers[userIdx].userId = user.userId 
        currentUsers[userIdx].connected = user.connected
      }
      return [...currentUsers]
    });
  });



  return (
    <div className='App'>

    <UserList 
    users={users}
    setUsers={setUsers}
    selectedUser={selectedUser}
    setSelectedUser={setSelectedUser} />

    <main>  

    <EnterUsername 
    userName={userName} 
    userNameInput={userNameInput} 
    setUserNameInput={setUserNameInput} 
    socket={socket}
    setUserName={setUserName}
    customID={customID}
    setCustomID={setCustomID}/>

    <ChatList socket={socket} selectedUser={selectedUser}/>

    {(userName && selectedUser) && <ChatMessage socket={socket} selectedUser={selectedUser} />}

    </main>

    </div>
    );
}

export default App;
