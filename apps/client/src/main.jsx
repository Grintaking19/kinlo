import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
// import { dark } from "@clerk/ui/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// const clerkAppearance = {
//   theme: dark,
//   variables: {
//     colorPrimary: "#8B5CF6",
//     colorBackground: "#17171C",
//     colorInputBackground: "#1E1E26",
//     colorInputText: "#FAFAFA",
//     colorText: "#FAFAFA",
//     colorTextSecondary: "#A1A1AA",
//     colorDanger: "#EF4444",
//     borderRadius: "0.625rem", // 10px, matches this button's actual cornerRadius
//     fontFamily: "Inter, sans-serif",
//   },
//   elements: {
//     formButtonPrimary:
//       "bg-gradient-to-r from-gradient-save-start to-gradient-save-end text-white font-semibold rounded-[10px] hover:opacity-90",
//     card: "bg-surface border border-border shadow-lg",

//     formFieldInput: "bg-surface-2 border border-border rounded-md",
//     footerActionLink: "text-primary hover:text-primary-400",
//   },
// };

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk publishable key.");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      // appearance={clerkAppearance}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
