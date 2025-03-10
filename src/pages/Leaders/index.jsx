import React, { useEffect } from "react";
import styled from "styled-components";
import BaseButton from "../../components/BaseComponents/BaseButton";
import Table from "../../components/Table";
import FilterImage from "../../assets/images/filter.png";
import { getLeaders } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function Leaders() {
  const dispatch = useDispatch();

  const leaders = useSelector((state) => state.user.leaders?.results);

  const columns = [
    { accessorKey: "full_name", header: "Full Name" },
    { accessorKey: "score_sum", header: "Score Sum" },
    { accessorKey: "accuracy_avg", header: "Accuracy Avg" },
  ];

  useEffect(() => {
    const fetchLeaders = async () => {
      const results = await dispatch(getLeaders());
      console.log("results", results);
    };

    fetchLeaders();
  }, [dispatch]);

  return (
    <LeadersWrapper>
      <div className="page-header">
        <div className="title">Leaders</div>
        <BaseButton color="primary" isOutlined={true}>
          {/* Filter
           */}
          <img className="filter-img" src={FilterImage} alt="Filter" />
        </BaseButton>
      </div>

      <Table columns={columns} data={leaders} />
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

  .filter-img {
    width: 20px;
    height: 20px;
  }
`;
