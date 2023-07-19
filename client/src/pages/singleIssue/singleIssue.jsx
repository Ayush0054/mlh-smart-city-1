import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./singleIssue.css";
import axios from "axios";
import { BASE_URL, API } from "../../utils/APIRoutes";
import { getReadableTime, localStorageUser } from "../../utils/globalConstants";
import styled from "styled-components";
import MakeUpdate from "../../components/postUpdate/makeUpdate";
import Navbar from "../../components/navbar/navbar";

const Section = styled.div`
  /* border: 1px solid red; */
  padding: 4rem;
  padding-top: 0;
`;

const SingleIssueCont = styled.div`
  background: linear-gradient(114.88deg, #351678 -1.12%, #251644 98.88%);
  backdrop-filter: blur(25px);
  border-radius: 18px;
`;

const IssueDescription = styled.div`
  /* border: 1px solid red; */
  display: flex;
  padding-top: 2rem;
`;

const ImageContainer = styled.div`
  width: 45vw;
  height: 50vh;
  margin: 0 5vw;
  border-radius: 10px;

  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
`;
const DescriptionBox = styled.div`
  margin: 0 5vw;
  width: 35vw;
  text-align: left;

  p {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    /* padding-top: 1rem; */
  }

  h3,
  h4,
  h5 {
    font-weight: 500;
  }

  h4 {
    margin-bottom: 0.5rem;
    text-decoration: underline;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const Updates = styled.div`
  /* border: 1px solid red; */

  h2 {
    margin-bottom: 1.5rem;
  }

  padding: 2.5rem 5vw;
  text-align: left;
`;

const UpdateList = styled.li`
  list-style: none;
`;

const UpdateItem = styled.div`
  /* border: 1px solid red; */
  border-radius: 12px;
  padding: 0.6rem 1rem;
  margin-bottom: 2rem;
  -webkit-box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.75);
`;

const UpdatedBy = styled.div`
  display: flex;
  margin-bottom: 0.6rem;
  /* border: 1px solid red; */

  h4 {
    font-size: 1rem;
  }

  h3,
  h4,
  h5 {
    font-weight: 400;
    line-height: 1;
  }

  div {
    /* border: 1px solid red; */
    h3,
    h4 {
      margin: 0;
      margin-left: 0.5rem;
    }
    h3 {
      margin-bottom: 0.3rem;
      font-size: 1.3rem;
    }
    h4 {
      font-size: 1rem;
    }
  }
`;

const Content = styled.div``;
const UserImage = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  /* border: 1px solid red; */

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin-right: 1rem;
  }
`;

const ContentImg = styled.div`
  width: 90vw;
  height: 40vh;
  /* border: 1px solid red; */

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Comments = styled.div``;

function SingleIssue() {
  const [issueId, setIssueId] = useState();
  const [issue, setIssue] = useState();

  useEffect(() => {
    console.log(window.location.pathname);
    const path = window.location.pathname;
    const id = path.slice(8);
    console.log(id);
    setIssueId(id);
  }, []);

  async function getIssue() {
    const { data } = await axios.get(`${BASE_URL}${API}/issue/${issueId}`);
    console.log(data.issue);
    setIssue(data.issue);
  }

  useEffect(() => {
    if (issueId) {
      getIssue();
    }
  }, [issueId]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(localStorage.getItem(localStorageUser));
      setUserData(data);
      console.log(data);
    }
    fetchUserData();
  }, []);

  return issue ? (
    <>
     <Navbar /> 
    <Section>
    {userData.isHelper ?
      <MakeUpdate token={userData.token} issueId={issueId} /> : null}
      <SingleIssueCont>
        <IssueDescription>
          <ImageContainer>
            <img src={issue.issuePics} alt='' />
          </ImageContainer>
          <DescriptionBox>
            <h4>Description :-</h4>
            <p>{issue.issueContent}</p>
            <h4>Location :-</h4>
            <h3>
              {issue.locationAddressFirstLine} {issue.locationAddressSecondLine}, {issue.locationCity},{" "}
              {issue.postalCode}
            </h3>
            <h4>Raised By :-</h4>
            <h3>{issue.issueRaisedBy.name}</h3>
          </DescriptionBox>
        </IssueDescription>
        <Updates>
          <h2>Updates :-</h2>
          <UpdateList>
            {issue.issueUpdates.map((update, index) => {
              return (
                <UpdateItem>
                  <UpdatedBy>
                    <UserImage>
                      <img src={update.updatedBy.photo} alt='' />
                    </UserImage>
                    <div>
                      <h3>{update.updatedBy.name}</h3>
                      <h4>{getReadableTime(update.createdAt)}</h4>
                    </div>
                  </UpdatedBy>
                  <Content>
                    <p>{update.updateContent}</p>
                    {update.updateImages ? (
                      <ContentImg>
                        <img src={update.updateImages} alt='' />
                      </ContentImg>
                    ) : null}
                  </Content>
                </UpdateItem>
              );
            })}
          </UpdateList>
        </Updates>
      </SingleIssueCont>
    </Section>
            </>
  ) : (
    <h2>Loading.......Waits!!....</h2>
  );
}

export default SingleIssue;
