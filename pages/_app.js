import "../styles/globals.css";
import "../styles/AllCategories.module.css";
import "../styles/ArtistNotifications.module.css";
import "../styles/ArtistOrder.module.css";
import "../styles/ArtistPackages.module.css";
import "../styles/ArtistProfile.module.css";
import "../styles/ArtistRecording.module.css";
import "../styles/ArtistRequest.module.css";
import "../styles/ArtistSelectService.module.css";
import "../styles/ArtistServiceCharges.module.css";
import "../styles/ArtistSignup.module.css";
import "../styles/Dashboard.module.css";
import "../styles/EditProfile.module.css";
import "../styles/Footer.module.css";
import "../styles/Home.module.css";
import "../styles/HowItsWork.module.css";
import "../styles/Login.module.css";
import "../styles/PaymentMethod.module.css";
import "../styles/PromoteBussiness.module.css";
import "../styles/TalentDashboard.module.css";
import "../styles/TermAndCondition.module.css";
import "../styles/TrackOrder.module.css";
import store from "../src/redux/Store";
import { Provider } from "react-redux";
store.subscribe(() => console.log(store.getState()));
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <main>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
