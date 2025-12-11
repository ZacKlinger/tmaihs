import { createRoot } from "react-dom/client";
import "@fontsource/crimson-pro/400.css";
import "@fontsource/crimson-pro/600.css";
import "@fontsource/crimson-pro/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
