import React from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { getProjectStore } from "../projectSlice";
import { Link } from "react-router-dom";

export default function ProjectList() {
  const { projectList } = useSelector(getProjectStore);

  const projects = projectList?.data?.data;
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

    {
      field: "",
      header: "Actions",
      body: (rowData) => {
        const { id, name } = rowData || {};
        return (
          <Link to={`/project/${name}/${id}`}>
            <button className="px-2 py-1 rounded-md">View commits</button>
          </Link>
        );
      },
    },
  ];

  console.log(projectList, "list");
  return (
    <section>
      <h1>Project list</h1>

      {projectList.isLoading && <p>Loading...</p>}

      {!projectList.isLoading && (
        <DataTable value={projects || []} tableStyle={{ minWidth: "50rem" }}>
          {columns?.map((col) => {
            const { field, header, body } = col ?? {};
            return (
              <Column key={field} field={field} header={header} body={body} />
            );
          })}
        </DataTable>
      )}
    </section>
  );
}
