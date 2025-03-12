import React, { useState } from "react";
import BaseModal from "../BaseComponents/BaseModal";
import BaseButton from "../BaseComponents/BaseButton";
import BaseSelect from "../BaseComponents/BaseSelect";
import { useDispatch, useSelector } from "react-redux";
import { setLeadersFilterModal } from "../../store/slices/modalSlice";
import styled from "styled-components";
import { LEADERS_FILTER_TIME } from "../../utils/constants";

const LeadersFilterModal = ({
  regionsOptions = [],
  subjectsOptions = [],
  onApplyFilters,
  loading = false,
}) => {
  const dispatch = useDispatch();
  const leadersFilterModal = useSelector(
    (state) => state.modal.leadersFilterModal
  );

  const [region, setRegion] = useState(null);
  const [byTime, setByTime] = useState(LEADERS_FILTER_TIME.ALL);
  const [science, setScience] = useState(null);

  const DAILY_FILTERS = [
    { value: LEADERS_FILTER_TIME.ALL, label: "All" },
    { value: LEADERS_FILTER_TIME.DAILY, label: "Daily" },
    { value: LEADERS_FILTER_TIME.WEEKLY, label: "Weekly" },
    { value: LEADERS_FILTER_TIME.MONTHLY, label: "Monthly" },
  ];

  const handleFilter = () => {
    const filters = {
      region: region ? region.id : "",
      subject: science ? science.id : "",
      by_time: byTime,
    };

    onApplyFilters(filters); // Send filters to the Leaders component
    dispatch(setLeadersFilterModal(false)); // Close modal
  };

  return (
    <BaseModal
      isOpen={leadersFilterModal}
      onClose={() => dispatch(setLeadersFilterModal(false))}
      size={"md"}
    >
      <LeaderFilterWrapper>
        <div className="alert-text">Apply Filters</div>

        <BaseSelect
          name="by-time"
          label="By Time"
          options={DAILY_FILTERS}
          value={byTime}
          onChange={setByTime}
        />

        <BaseSelect
          name="region"
          label="Region"
          options={regionsOptions}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option.id}
          value={region}
          onChange={setRegion}
        />

        <BaseSelect
          name="subject"
          label="Subject"
          options={subjectsOptions}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option.id}
          value={science}
          onChange={setScience}
        />

        <BaseButton
          onClick={handleFilter}
          isLoading={loading}
          color="primary"
          fullwidth
        >
          Apply Filter
        </BaseButton>
      </LeaderFilterWrapper>
    </BaseModal>
  );
};

export default LeadersFilterModal;

const LeaderFilterWrapper = styled.div`
  .alert-text {
    font-size: var(--font-size-md);
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
  }
`;
