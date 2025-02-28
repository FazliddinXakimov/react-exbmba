import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const BaseSelect = ({
  className,
  name,
  label,
  options = [],
  defaultValue,
  isDisabled = false,
  isLoading = false,
  isClearable = false,
  isRtl = false,
  isSearchable = false,
  defaultMenuIsOpen = false,
  closeMenuOnSelect = true,
  closeMenuOnScroll = false,
  menuPlacement = "auto",
  noOptionsMessage = "There is no options",
  control,
  error,

  getOptionValue,
  getOptionLabel,

  onChange,
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            className={className}
            defaultValue={defaultValue}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            options={options}
            defaultMenuIsOpen={defaultMenuIsOpen}
            closeMenuOnSelect={closeMenuOnSelect}
            closeMenuOnScroll={closeMenuOnScroll}
            aria-invalid={!!error}
            menuPlacement={menuPlacement}
            noOptionsMessage={() => noOptionsMessage}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
            onChange={onChange}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

export default BaseSelect;
