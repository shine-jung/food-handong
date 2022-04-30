function Header({ onLogout }) {
  return (
    <header>
      {onLogout && <button onClick={onLogout}>Logout</button>}
      <h1>한슐랭 가이드</h1>
    </header>
  );
}

export default Header;
