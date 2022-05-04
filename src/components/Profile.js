import { firebaseAuth } from "../service/firebase";

function Profile() {
  const user = firebaseAuth.currentUser;
  return (
    <div>
      <img
        src={user.photoURL}
        alt={user.displayName}
        width="100px"
        height="100px"
        background-size="contain"
        overflow="hidden"
      />
      <p>{user.displayName}</p>
      <p>{user.email}</p>
      <p>{user.emailVerified}</p>
    </div>
  );
}

export default Profile;
