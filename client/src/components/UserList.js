// 
import React from 'react'

export default function UserList({ users, selectedUser, setSelectedUser }) {

	const renderUsers = () =>
	// mapping through the users and rendering them
	users.map((user, idx) => {
			return <li
			// highlighting the selected user
				className={selectedUser === user.userId ? 'highlightUser' : ''}
				key={user.userId}
				// setting the selected user to the state
				onClick={() => setSelectedUser(user.userId)}>
				<span>{user.userName} {idx === 0 && "(you)"}</span> <span className='smallText'>{user.connected ? "🟢 online" : "🔴 offline"}</span>
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