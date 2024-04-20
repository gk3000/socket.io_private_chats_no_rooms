import React from 'react'

export default function UserList({users, setUsers, selectedUser, setSelectedUser}) {



	const renderUsers = () => 
	users.map((user,idx) => {
		return <li 
		className={selectedUser===user.userId ? 'highlightUser' : ''} 
		key={user.userId} 
		onClick={()=>setSelectedUser(user.userId)}>
		<span>{user.userName} {idx===0&& "(you)"}</span> <span className='smallText'>{user.connected?"🟢 online":"🔴 offline"}</span>
		</li>
	})

	return (
		<aside>
		<h2>Users</h2>
		<ul>
		{renderUsers()}
		</ul>
		</aside>
		)
}