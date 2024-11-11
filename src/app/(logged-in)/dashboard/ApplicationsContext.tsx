"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { JobApplicationTypes } from "../../../../types";

interface ApplicationsContextProps {
  applications: JobApplicationTypes[];
  refreshApplications: () => void;
  loading: boolean;
}

const ApplicationsContext = createContext<ApplicationsContextProps | undefined>(
  undefined
);

export const ApplicationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [applications, setApplications] = useState<JobApplicationTypes[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      setApplications(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshApplications = async () => {
    setLoading(true);
    await fetchApplications();
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <ApplicationsContext.Provider
      value={{ applications, refreshApplications, loading }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error(
      "useApplications måste användas inom en ApplicationsProvider"
    );
  }
  return context;
};
