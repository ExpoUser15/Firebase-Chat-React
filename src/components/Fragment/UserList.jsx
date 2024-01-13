

function UserList(props) {
    const { data, event } = props;
    return (
        <ul className='p-3 max-h-80 overflow-auto'>
            {data.map(user => (
                <li onClick={event} className='p-2 border cursor-pointer' data-id={user.id} key={user.id}>{user.data.username}</li>
            ))}
        </ul>
    )
}

export default UserList