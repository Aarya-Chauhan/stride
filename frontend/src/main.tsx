// import React from "react";
// import ReactDOM from "react-dom/client";
// import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.tsx";
// import { AuthProvider } from "./context/AuthContext";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <ChakraProvider value={defaultSystem}>
//       <BrowserRouter>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </BrowserRouter>
//     </ChakraProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import { ScrollToTop } from "./components/ScrollToTop";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <ScrollToTop>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ScrollToTop>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
