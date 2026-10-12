import { appLogo } from "../../pages/StaffManual";

const APP_STORE_URL = "https://apps.apple.com/app/id6761427493";
const PLAY_URL = "https://play.google.com/apps/internaltest/4701370585570930551";


export default function AppBanner() {
  return (
    <div className="sm-app">
      <div className="sm-app-top">
        <div className="sm-app-icon" aria-hidden="true">
          {/* <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7l9-4 9 4-9 4-9-4z" />
            <path d="M3 12l9 4 9-4M3 17l9 4 9-4" />
          </svg> */}


          <img
            className="sm-app-logo"
            src={appLogo}
            alt="Owlverload"
            width="44"
            height="44"
          />
        </div>
        <div>
          <p className="sm-app-title">Owlverload Application</p>
          <p className="sm-app-text">Our stock-check app</p>
          <p className="sm-app-note">
            If interested, send your Gmail address to Jimmy (night shift) — once you're added,
            this link will open the app.
          </p>
        </div>
      </div>
      <div className="sm-app-links">
        {/* <a className="sm-store" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
          <span className="sm-store-sub">iPhone</span>
          <span className="sm-store-main">App Store</span>
        </a> */}
        <a className="sm-store" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
          <span className="sm-store-sub">Android</span>
          <span className="sm-store-main">Google Play</span>
        </a>
      </div>
    </div>
  );
}