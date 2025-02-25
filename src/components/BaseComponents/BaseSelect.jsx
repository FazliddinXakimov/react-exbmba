import React from "react";
import Select from "react-select";

const BaseSelect = ({
  className,
  name,
  options = [],
  defaultValue,
  isDisabled = false,
  isLoading = false,
  isClearable = false,
  isRtl = false,
  isSearchable = false,
  defaultMenuIsOpen = false,
  closeMenuOnSelect = false,
  closeMenuOnScroll = false,
  menuPlacement = "auto",
  noOptionsMessage = "There is no options",
}) => {
  return (
    <>
      {name}
      {/* {options} */}
      <Select
        className={className}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name={name}
        options={options}
        defaultMenuIsOpen={defaultMenuIsOpen}
        closeMenuOnSelect={closeMenuOnSelect}
        closeMenuOnScroll={closeMenuOnScroll}
        aria-invalid={false}
        menuPlacement={menuPlacement}
        noOptionsMessage={noOptionsMessage}
      />
    </>
  );
};

export default BaseSelect;
