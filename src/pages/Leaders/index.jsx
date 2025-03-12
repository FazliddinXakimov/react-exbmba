import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaseButton from "../../components/BaseComponents/BaseButton";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import FilterImage from "../../assets/images/filter.png";
import { getLeaders } from "../../store/actions/userActions";
import { getRegions, getSubjects } from "../../store/actions/referencesActions";
import { useDispatch, useSelector } from "react-redux";
import { setLeadersFilterModal } from "../../store/slices/modalSlice";

import Avatar from "../../assets/images/avatar.png";
import LeadersFilterModal from "../../components/Modals/LeadersFilterModal";
import { SUBJECT_API_TYPES } from "../../utils/constants";

export default function Leaders() {
  const dispatch = useDispatch();
  const leaders = useSelector((state) => state.user.leaders?.results || []);
  const totalCount = useSelector((state) => state.user.leaders?.count || 0);
  const regions = useSelector((state) => state.references.regions);
  const subjects = useSelector((state) => state.references.mainSubjects);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({}); // Store applied filters

  const pageSize = 10;
  const totalPages = Math.ceil(totalCount / pageSize);

  const columns = [
    {
      accessorKey: "full_name",
      header: "Full Name",
      cell: ({ row }) => {
        const { first_name, last_name, image } = row.original;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              className="avatar"
              src={image ? image : Avatar}
              style={{ padding: image ? "" : "7px" }}
              alt={first_name}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "var(--font-size-sm)" }}>
                {first_name}
              </div>
              <div style={{ fontSize: "var(--font-size-sm)" }}>{last_name}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "score_sum",
      header: "Score Sum",
      cell: ({ getValue }) => (
        <span style={{ fontSize: "var(--font-size-sm)" }}>
          {getValue().toFixed(1)}
        </span>
      ),
    },
    {
      accessorKey: "accuracy_avg",
      header: "Accuracy Avg",
      cell: ({ getValue }) => (
        <span style={{ fontSize: "var(--font-size-sm)" }}>{getValue()} %</span>
      ),
    },
  ];

  const fetchLeaders = async (currentPage, currentPageSize, filters = {}) => {
    setLoading(true);
    try {
      await dispatch(
        getLeaders({
          page: currentPage,
          page_size: currentPageSize,
          ...filters,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getRegions());
    dispatch(
      getSubjects({
        apiType: SUBJECT_API_TYPES.MAIN_SUBJECTS,
        params: { is_main_for_block: true },
      })
    );
  }, []);

  useEffect(() => {
    fetchLeaders(page, pageSize, filters);
  }, [page, pageSize, filters]);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset pagination when applying filters
  };

  return (
    <>
      <LeadersWrapper>
        <div className="page-header">
          <div className="title">Leaders</div>
          <BaseButton
            onClick={() => dispatch(setLeadersFilterModal(true))}
            color="primary"
            isOutlined={true}
          >
            <img className="filter-img" src={FilterImage} alt="Filter" />
          </BaseButton>
        </div>

        <div className="filter-list">
          {/* here is badge for all filters must be show as alist and have feature with remove it  */}
        </div>

        <Table columns={columns} data={leaders} loading={loading} />

        {totalPages > 1 && (
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        )}
      </LeadersWrapper>

      <LeadersFilterModal
        regionsOptions={regions}
        subjectsOptions={subjects}
        onApplyFilters={applyFilters}
        loading={loading}
      />
    </>
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

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
