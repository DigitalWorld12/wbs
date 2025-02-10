import Head from "next/head";
import styles from "../styles/TalentDashboard.module.css";
import React, { useEffect } from "react";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";

import Talent_Earning from "../src/components/Talent Earning/talent_earning";
import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";

function Talent_Earning_Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const data = reactLocalStorage.getObject("loginAuth");
    if (Object.keys(data).length === 0) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          <Talent_Earning />
        </div>

        <Footer></Footer>
      </div>
    </>
  );
}
export default Talent_Earning_Dashboard;
