import React, { useEffect, useState } from "react";
import "./card.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { API, BASE_URL } from "../../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { localStorageUser } from "../../utils/globalConstants";
import { getHeaders } from "../../utils/helperFunction";

function Card(props) {
  const issue = props.issue;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(localStorage.getItem(localStorageUser));
      setUserData(data);
    }
    fetchUserData();
  }, []);

  const approveIssueHandler = async (e) => {
    const { data } = await axios.patch(
      `${BASE_URL}${API}/issue/${issue._id}/approve`,
      {},
      {
        headers: getHeaders(userData.token),
      }
    );
    console.log(data);
     console.log(BASE_URL);
    if (data.status === "success") {
      window.location.reload();
    }
  };

  const closeissueHandler = async (e) => {
    // e.preventDefauslt();
    const { data } = await axios.patch(
      `${BASE_URL}${API}/issue/${issue._id}/close`,
      {},
      {
        headers: getHeaders(userData.token),
      }
    );
    console.log(data);
    if (data.status === "success") {
      window.location.reload();
    }
  };

  const navigate = useNavigate();
  const singlePageNavigator = () => {
    navigate(`/issues/${issue._id}`);
  };

  return issue === undefined ? null : (
    <div className='card'>
      <div className='issue-content' onClick={singlePageNavigator}>
        <div className='issue-img'>
          <img src={issue.issuePics} alt='' />
        </div>
        <p>{issue.issueContent}</p>
      </div>
      <div className='location' onClick={singlePageNavigator}>
        <span>
          <FaMapMarkerAlt />
        </span>
        <h4>
          {issue.locationAddressFirstLine} {issue.locationAddressSecondLine}, {issue.locationCity}, {issue.postalCode}
        </h4>
      </div>
      <div className='author-details' onClick={singlePageNavigator}>
        <h5>Raised By :-</h5>
        <div className='author'>
          <div className='img-container'>
            <img src={issue.issueRaisedBy.photo} alt='' />
          </div>
          <h3>{issue.issueRaisedBy.name}</h3>
        </div>
      </div>

      {issue.isIssueApproved ? (
        <div className='approved-by' onClick={singlePageNavigator}>
          <h5>Approved By :-</h5>
          <div className='author'>
            <div className='img-container'>
              <img src={issue.issueApprovedBy.photo} alt='' />
            </div>
            <h3>{issue.issueApprovedBy.name}</h3>
          </div>
        </div>
      ) : null}
      {issue.isIssueResolved ? (
        <div className='closedBy' onClick={singlePageNavigator}>
          <h5>Closed By :-</h5>
          <div className='author'>
            <div className='img-container'>
              <img src={issue.issueClosedBy.photo} alt='' />
            </div>
            <h3>{issue.issueClosedBy.name}</h3>
          </div>
        </div>
      ) : null}
      {!issue.isIssueApproved && userData.isHelper ? (
        <button onClick={approveIssueHandler}>Approve Issue</button>
      ) : null}
      {issue.isIssueApproved && !issue.isIssueResolved && userData.isHelper && issue.issueUpdates.length > 0 ? (
        <button onClick={closeissueHandler}>Close Issue</button>
      ) : null}
    </div>
  );
}

export default Card;
