import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import styles from "./SideNav.module.css";

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setOpen(!open);
  const navigate = useNavigate();

  return (
    <>
      {/* Hamburger ikon */}
      <div className={styles.hamburgerWrapper}>
        <button onClick={toggleMenu} className={styles.hamburgerBtn}>
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Sidomeny */}
      <div
        className={`${styles.sidenav} ${open ? styles.open : ""}`}
      >
        <div className={styles.menuContent}>
          {user && (
            <div className={styles.userInfo}>
              <img
                src={user.avatar || "https://i.pravatar.cc/200"}
                alt={`${user.username} avatar`}
                className={styles.avatar}
              />
              <span>{user.user}</span>
            </div>
          )}

          <nav className={styles.navLinks}>
            {!user && (
              <>
                <Button
                  onClick={() => {
                      toggleMenu();
                      navigate("/login")
                  }}
                  type="button"
                >
               Logga in
                </Button>
                <Button
                  onClick={() => {
                      toggleMenu();
                      navigate("/register")
                  }}
                  type="button"
                >
                Skapa användarkonto
                </Button>
              </>
            )}

            {user && (
              <>
                <Button
                  onClick={() => {
                    logout();
                    toggleMenu();
                    navigate("/login")
                  }}
                  type="button"
                >
                  Logga ut
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div className={styles.overlay} onClick={toggleMenu} />
      )}
    </>
  );
}
