import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";  // Your main app component
import { LayoutProvider } from "./context/LayoutContext";  // Import LayoutProvider
import { UserProvider } from "./context/UserContext"; // Assuming you already have this
import { BrowserRouter } from "react-router-dom"; // Router setup
import { ThemeProvider, CssBaseline } from "@mui/material"; // MUI Theme and global styling
import defaultTheme from "./themes/theme"; // Your theme file

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline /> {/* Ensures consistent global styling */}
      <BrowserRouter>
        <UserProvider>
          <LayoutProvider> {/* Wrap the App with LayoutProvider */}
            <App />
          </LayoutProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);


