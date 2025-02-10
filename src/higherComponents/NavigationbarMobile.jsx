import React, { useState } from "react";
import styles from "../../styles/DropDown.module.css";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={toggleDropdown}>
            <MenuIcon />
          </button>
          <div
            className={
              isOpen ? styles.dropdown_content_open : styles.dropdown_content
            }
          >
            <Link href="/">
              <h3 className={styles.sub_heading}>Home</h3>
            </Link>
            <Link href="/artist_categories">
              <h3 className={styles.sub_heading}>Categories</h3>
            </Link>
            <Link href="/how_its_work">
              <h3 className={styles.sub_heading}>How It Works</h3>
            </Link>
            <Link href="/promote_your_business">
              <h3 className={styles.sub_heading}>For Business</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
