import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Protected from "./components/AuthLayout.jsx";
import Signup from "./pages/Signup.jsx";

import ImageCenter from "./pages/ImageCenter.jsx";
import Image from "./pages/Image.jsx";
import BrowseImages from "./pages/BrowseImages.jsx";
import TextToImage from "./pages/TextToImage.jsx";

const router = createBrowserRouter([
  {
    path: "/imagey/",
    element: <App />,
    children: [
      {
        path: "/imagey/",
        element: <Home />,
      },
      {
        path: "/imagey/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/imagey/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/imagey/browse-images",
        element: (
          <Protected authentication>
            <BrowseImages />
          </Protected>
        ),
      },
      {
        path: "/imagey/image-center",
        element: (
          <Protected authentication>
            <ImageCenter />
          </Protected>
        ),
        children: [
          {
            path: "/imagey/image-center/:imageID",
            element: (
              <Protected authentication>
                <ImageCenter />
              </Protected>
            ),
          },
        ],
      },
      {
        path: "/imagey/image/:imageID",
        element: (
          <Protected authentication>
            <Image />
          </Protected>
        ),
      },
      {
        path: "/imagey/text-to-image",
        element: (
          <Protected authentication>
            <TextToImage />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
