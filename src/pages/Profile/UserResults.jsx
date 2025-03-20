import React, { useState } from "react";
import { useEffect } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getMyResults } from "../../store/actions/testActions";
import { useTranslation } from "react-i18next";

const UserResults = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const columns = [
    {
      accessorKey: "test_type_unique_name",
      header: t("test_type"),
      cell: ({ getValue }) => {
        return t(getValue());
      },
    },
    {
      accessorKey: "date",
      header: t("test_period"),
      cell: ({ row }) => {
        const startDate = new Date(row.original.started_at);
        const finishDate = new Date(row.original.finished_at);
        const diffTime = finishDate.getTime() - startDate.getTime();
        const diffDays = (diffTime / (1000 * 60)).toFixed(2); // Convert milliseconds to days
        return `${diffDays}`;
      },
    },
    {
      accessorKey: "score",
      header: t("test_result"),
    },
  ];

  const myResults = useSelector((state) => state.test.myResults) || [];
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  async function fetchData() {
    setLoading(true);

    await dispatch(getMyResults({ page, page_size: pageSize }));
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <Table columns={columns} data={myResults.results} loading={loading} />
      {myResults.count / pageSize > 1 && !loading && (
        <Pagination page={page} setPage={setPage} count={myResults.count} />
      )}
    </>
  );
};

export default UserResults;
