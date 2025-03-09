import React from "react";
import styled from "styled-components";
import BaseButton from "../../components/BaseComponents/BaseButton";
import Table from "../../components/Table";

export default function Leaders() {
  return (
    <LeadersWrapper>
      <div className="page-header">
        <div className="title">Leaders</div>
        <BaseButton color="primary" isOutlined={true}>
          Filter
        </BaseButton>
      </div>

      <Table />
    </LeadersWrapper>
  );
}

const LeadersWrapper = styled.div`
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: var(--font-size-lg);
    font-weight: 500;
    text-align: center;
  }
`;
