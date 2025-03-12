import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import styled from "styled-components";

const BaseSelect = ({
  className,
  name,
  label,
  options = [],
  value,
  onChange,
  control,
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
  noOptionsMessage = "There are no options",
  getOptionValue = (option) => option.value,
  getOptionLabel = (option) => option.label,
  error,
}) => {
  const getValue = (val) =>
    options.find((option) => getOptionValue(option) === val) || null;

  const renderSelect = (field) => (
    <Select
      styles={customStyles}
      className={className}
      value={getValue(field?.value ?? value)}
      defaultValue={defaultValue ? getValue(defaultValue) : null}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isRtl={isRtl}
      isSearchable={isSearchable}
      options={options}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      defaultMenuIsOpen={defaultMenuIsOpen}
      closeMenuOnSelect={closeMenuOnSelect}
      closeMenuOnScroll={closeMenuOnScroll}
      menuPlacement={menuPlacement}
      noOptionsMessage={() => noOptionsMessage}
      onChange={(selected) => {
        const newValue = selected ? getOptionValue(selected) : "";
        field?.onChange?.(newValue); // For react-hook-form
        onChange?.(newValue); // For external use
      }}
    />
  );

  return (
    <BaseSelectWrapper>
      {label && <label htmlFor={name}>{label}</label>}
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => renderSelect(field)}
        />
      ) : (
        renderSelect({ value, onChange })
      )}
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
  input {
    font-size: var(--font-size-sm);
  }
  .error-message {
    color: var(--danger-color);
    margin-top: 4px;
    font-size: var(--font-size-sm);
  }
`;
