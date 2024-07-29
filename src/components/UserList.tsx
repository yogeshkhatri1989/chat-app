import { useContext } from 'react';
import UserItem from './UserItem';
import ChatContext from '../store/ChatContext';
import UserContext from '../store/UserContext';
import useChatUsers from '../services/useChatUsers';

const UserList = () => {

  const { selectedUser, setSelectedUser } = useContext(ChatContext);
  const { user } = useContext(UserContext);

  const { users, loading } = useChatUsers(user);

  return (
    <div className="flex flex-col w-1/3 h-full border-r-gray-300 border-r">
      <div className="bg-base-300 min-h-16 text-2xl flex place-items-center justify-center">
        Users
      </div>
      <hr />
      <ul className="menu bg-base-100 w-full overflow-auto flex-nowrap">
        {loading && <span className="loading loading-lg"></span>}
        {
          users.map((username) => (
            <UserItem
              key={username}
              username={username}
              selected={username === selectedUser}
              onUserSelect={setSelectedUser}
            />
          ))
        }
      </ul>
    </div>
  );
};

export default UserList;