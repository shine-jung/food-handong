import { firebaseAuth } from "../service/firebase";

function Profile() {
  const user = firebaseAuth.currentUser;
  return (
    <div>
      <img src={user.photoURL} alt={user.displayName} width="100px" />
      <p>{user.displayName}</p>
      <p>{user.email}</p>
      <p>{user.emailVerified}</p>
    </div>
  );
}

export default Profile;
