
type UserItemProps = {
  username: string;
  selected?: boolean;
  onUserSelect: (username: string) => void;
};

const UserItem = ({ username, selected, onUserSelect }: UserItemProps) => {
  return (
    <li className="border-b-2 border-gray-200">
      <a
        className={`p-4 ${selected ? 'active' : ''}`}
        onClick={() => onUserSelect(username)}
      >{username}</a>
    </li>
  );
};

export default UserItem;