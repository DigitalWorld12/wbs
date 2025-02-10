import { useEffect, useState } from "react";
import styles from "../../../styles/ArtistRequest.module.css";

const Private = ({ setOrderData, orderData }) => {
  const [is_private, setPrivate] = useState(1);

  useEffect(
    () => {
      setOrderData({ ...orderData, is_private: is_private });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [is_private]
  );

  // console.log(orderData);
  return (
    <div className={styles.new}>
      <form>
        <div class={styles.form_group}>
          <input
            type="checkbox"
            id="html"
            value={1}
            onChange={(e) => setPrivate(e.target.value)}
          />
          <label for="html">Do you want to make it private</label>
        </div>
      </form>
    </div>
  );
};

export default Private;
