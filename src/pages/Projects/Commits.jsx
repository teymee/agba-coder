import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectCommits } from "../../features/Projects/projectAPI";
import { useDispatch } from "react-redux";

export default function Commits() {
  const { projectId } = useParams();
  console.log(projectId, "projectId");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectCommits(projectId));
  }, [dispatch, projectId]);

  return <div>Commits</div>;
}
