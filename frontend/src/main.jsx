import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-7l74cgz27buzyofz.us.auth0.com"
      clientId="6CPU8BRdncrrT3PeL02NCIoewQJZ92lC"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-7l74cgz27buzyofz.us.auth0.com/api/v2/",
        scope: "openid profile email",
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <StrictMode>
        <App />
      </StrictMode>
      ,
    </Auth0Provider>
  </BrowserRouter>
);
