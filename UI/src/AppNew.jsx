import { GlobalContextProvider } from "./assets/Context/GeneralContext";
import LandingPage from "./assets/LandingPage/LadingPage";
import NavBar from "./assets/NavBar/Navbar";

export default function AppNew() {
  return (
    <GlobalContextProvider>
      <div class="flex flex-row">
        <NavBar />

        <main class="w-full h-screen ">
          <LandingPage />
        </main>
      </div>
    </GlobalContextProvider>
  );
}
