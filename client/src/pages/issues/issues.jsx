import React, { useEffect, useState } from "react";
import Card from "../../components/card/card";
import PostIssue from "../../components/postIssue/postIssue";
import axios from "axios";
import { API, BASE_URL } from "../../utils/APIRoutes";
import "./issues.css";
import Navbar from "../../components/navbar/navbar";

function Issues() {
  const [issues, setIssues] = useState([]);

  async function fetchUnApprovedIssues() {
    const { data } = await axios.get(`${BASE_URL}${API}/issue/unapproved`);
    console.log(data);
    setIssues(data.unapprovedIssues);
  }

  useEffect(() => {
    fetchUnApprovedIssues();
  }, []);

  return (
    <>
     <Navbar /> 
    <div className='issues-page'>
      <PostIssue />
      <div className='issues'>
        {issues &&
          issues.map((issue, index) => {
            return <Card key={index} issue={issue} />;
          })}
        <Card />
      </div>
    </div>
          </>
  );
}

export default Issues;
