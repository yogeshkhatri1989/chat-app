import React, { useContext, useState } from 'react';
import UserContext from '../store/UserContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

type SetUserNameModalProps = {
  open: boolean;
};

const SetUserNameModal = ({ open }: SetUserNameModalProps) => {

  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {

      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      const username = formJson.username;
      await setDoc(doc(db, "users", username), { username });
      setUser(username);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <form onSubmit={onSubmit}>
          <h3 className="font-bold text-lg">Enter your username</h3>
          <input type="text" name="username" className="input input-primary" />
          <div className="modal-action">
            {loading && <span className="loading loading-lg"></span>}
            <button className='btn' type="submit" disabled={loading}>Save</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SetUserNameModal;