import "./index.css";

import { routes } from "@generouted/react-router";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import PhotinoChannel from "./photino/photino-channel";

const router = createHashRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);

const channel = new PhotinoChannel<string>("PHOTINO_TEST_CHANNEL");
channel.sendMessage("ping").then(console.log);
