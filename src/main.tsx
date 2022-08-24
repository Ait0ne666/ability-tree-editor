import "./index.css";


import React from "react";
import ReactDOM from "react-dom";

import App from "./App";


import "@darksun/logger";
import { LoggerConsoleOutput } from "@darksun/logger-console-output";

log.registerOutput(new LoggerConsoleOutput());




ReactDOM.render(
    <React.StrictMode>

        <App />

    </React.StrictMode>,
    document.getElementById("root")
);
