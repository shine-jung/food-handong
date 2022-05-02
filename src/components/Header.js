import styles from "./Header.module.css";

function Header({ onLogout }) {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <img
          src={process.env.PUBLIC_URL + "/logo1024.png"}
          alt="logo"
          width="64px"
        />
        <nav className={styles.navigation}>
          <ul>
            <li>메뉴 1</li>
            <li>{onLogout && <button onClick={onLogout}>Logout</button>}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
