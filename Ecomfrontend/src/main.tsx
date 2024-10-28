import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { BrowserRouter } from "react-router-dom";
import RoutingConfig from "./config/router.config";



const htmlRoot: HTMLElement = document.getElementById('root') as HTMLElement

const RootElement = ReactDOM.createRoot(htmlRoot)

RootElement.render(
<React.StrictMode>
   
      <BrowserRouter>
         <RoutingConfig />
      </BrowserRouter>
   
</React.StrictMode>
)
