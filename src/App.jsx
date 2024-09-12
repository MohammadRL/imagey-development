import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import authService from "./appwrite/auth";
export const imageContext = createContext();
function App() {
  const [instaFilterIndex, setinstaFilterIndex] = useState(0);
  const [image, setImage] = useState(null);
  const [genImage, setGenImage] = useState(null);
  const imageRef = useRef(null);
  const uploadedImageFile = useRef(null);
  const [toggleEditWindow, setToggleEditWindow] = useState({
    toggle: false,
    tool: "",
  });
  const [filteredImage, setFilteredImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customFilters, setCustomFilters] = useState({
    contrast: 100,
    brightness: 100,
    saturate: 100,
    sepia: 0,
    gray: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <imageContext.Provider
      value={{
        instaFilterIndex,
        setinstaFilterIndex,
        image,
        setImage,
        imageRef,
        toggleEditWindow,
        setToggleEditWindow,
        filteredImage,
        setFilteredImage,
        uploadedImageFile,
        genImage,
        setGenImage,
        customFilters,
        setCustomFilters,
      }}
    >
      <>
        <div className="w-full block">
          <Header />
        </div>
        <main className="bg-[#141414] h-screen">
          <Outlet />
        </main>
      </>
    </imageContext.Provider>
  ) : null;
}
export default App;
