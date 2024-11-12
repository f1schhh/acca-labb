"use client";
import React, { createContext, useState, useContext } from "react";

interface AlertContextType {
  showAlert: boolean;
  alertMsg: string;
  error: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMsg: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [error, setError] = useState(false);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        alertMsg,
        error,
        setShowAlert,
        setAlertMsg,
        setError,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
