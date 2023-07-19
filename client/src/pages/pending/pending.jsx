import axios from "axios";
import { API, BASE_URL } from "../../utils/APIRoutes";
import "./pending.css";

import React, { useEffect, useState } from "react";
import Card from "../../components/card/card";
import Navbar from "../../components/navbar/navbar";

const Pending = () => {
  const [approvedIssues, setApprovedIssues] = useState([]);

  async function getUnapprovedIssues() {
    const { data } = await axios.get(`${BASE_URL}${API}/issue/approved`);
    console.log(data);
    setApprovedIssues(data.approvedIssues);
  }

  useEffect(() => {
    getUnapprovedIssues();
  }, []);
  return (
    <>
     <Navbar /> 
      <div className='issues'>
        {approvedIssues.map((issue, index) => {
          return <Card key={index} issue={issue} />;
        })}
      </div>
    </>
  );
};

export default Pending;
