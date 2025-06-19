import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProjects } from "../features/Projects/projectAPI";
import ProjectList from "../features/Projects/components/ProjectList";

export default function Projects() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch]);

  return (
    <section>
        <div>Projects</div>
        <ProjectList/>
    </section>
  );
}
