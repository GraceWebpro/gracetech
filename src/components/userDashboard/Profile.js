import { useAuth } from "../../server/AuthProvider";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h3>Profile</h3>
      <p>Name: {currentUser.displayName}</p>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};

export default Profile;
