"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { JobApplicationTypes } from "../../../../types";

interface ApplicationsContextProps {
  applications: JobApplicationTypes[];
  refreshApplications: () => void;
  loading: boolean;
  setCurrentPage: (page: number) => void;
  totalCount: number;
}

const ApplicationsContext = createContext<ApplicationsContextProps | undefined>(
  undefined
);

export const ApplicationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [applications, setApplications] = useState<JobApplicationTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pathname = usePathname();

  const fetchApplications = async (
    limit: number,
    page: number,
    loadLazy?: boolean
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/applications?limit=${limit}&page=${page}`
      );
      const data = await response.json();
      setApplications(data?.data || []);
      setTotalCount(data?.totalCount || 0);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      if (loadLazy) {
        setTimeout(() => {
          setLoading(false);
        }, 400);
      } else {
        setLoading(false);
      }
    }
  };

  const refreshApplications = async () => {
    setLoading(true);
    const limit = pathname === "/dashboard" ? 5 : 10;
    await fetchApplications(limit, currentPage);
  };

  useEffect(() => {
    const limit = pathname === "/dashboard" ? 5 : 10;
    const lazyStatus = pathname === "/dashboard" ? false : true;
    fetchApplications(limit, currentPage, lazyStatus);
  }, [pathname, currentPage]);

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        refreshApplications,
        loading,
        setCurrentPage,
        totalCount,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error(
      "useApplications must be used within an ApplicationsProvider"
    );
  }
  return context;
};
