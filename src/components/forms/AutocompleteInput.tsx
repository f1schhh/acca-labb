import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import React, { useState } from "react";
import { Box } from "@mui/material";

export interface JobOption {
  id?: number;
  job_title: string;
}
export type SavedJobs = {
  movieData: Array<JobOption>;
  onAction: (message?: string, error?: boolean) => void;
  message?: string;
};

interface SavedJobsDataProps
  extends AutocompleteProps<JobOption, boolean, boolean, true> {
  options: JobOption[];
}

const AutocompleteInput = (props: SavedJobsDataProps) => {
  const { options, loading, defaultValue, ...rest } = props;
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  return (
    <Autocomplete
      {...rest}
      disablePortal
      freeSolo
      options={options}
      loading={loading}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.job_title
      }
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            {...optionProps}
          >
            {option.job_title}
          </Box>
        );
      }}
      onChange={(event, value) => {
        setSelectedValue(value as string);
      }}
      value={selectedValue}
    />
  );
};

export default AutocompleteInput;
