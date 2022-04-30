import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ auth }) {
  const navigate = useNavigate();
  const onLogin = () => {
    auth.login().then((data) => goToHome(data.user.uid));
  };
  const goToHome = (userId) => {
    navigate({ pathname: "/home", state: { id: userId } });
  };
  useEffect(() => {
    auth.onAuthChange((user) => {
      user && goToHome(user.uid);
    });
  });
  return (
    <div>
      <h1>Login</h1>

      <button onClick={onLogin}>Google</button>
    </div>
  );
}

export default Login;
