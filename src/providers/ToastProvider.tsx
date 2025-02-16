"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

interface ToastContextProps {
  showToast: (
    message: string,
    severity?: "success" | "error" | "warning" | "info"
  ) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const showToast = (
    msg: string,
    sev: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
