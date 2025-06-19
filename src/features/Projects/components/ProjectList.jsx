import React from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { getProjectStore } from "../projectSlice";

export default function ProjectList() {
    const {projectList} = useSelector(getProjectStore) 

    const projects = projectList?.data?.data
  const columns = [
    {
      field: "name",
      header: "Name",
    },

    {
      field: "created_at",
      header: "Creation date",
    },

    {
      field: "human_readable_last_heartbeat_at",
      header: "First push",
    },
  ];

  
  console.log(projectList, 'list')
  return (
    <section>
      <h1>Project list</h1>
      <DataTable value={projects || []}  tableStyle={{ minWidth: "50rem" }}>
        {columns?.map((col) => {
          const { field, header } = col ?? {};
          return <Column key={field} field={field} header={header} />;
        })}
      </DataTable>
    </section>
  );
}
