import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import styled from "styled-components";

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
    <BaseSelectWrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            styles={customStyles}
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
      {error && <p className="error-message">{error.message}</p>}
    </BaseSelectWrapper>
  );
};

export default BaseSelect;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "var(--radius-md)",
    border: state.isFocused
      ? "1px solid var(--primary-color)"
      : "1px solid #ccc",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid var(--primary-color)",
    },
    height: "36px",
    minHeight: "36px",
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--slate-color)",
    height: "36px",
  }),
};

const BaseSelectWrapper = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    font-size: var(--font-size-md);
    margin-bottom: 4px;
  }

  .error-message {
    color: var(--danger-color);
    margin-top: 4px;
    font-size: var(--font-size-sm);
  }
`;
