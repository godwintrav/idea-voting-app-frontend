import { Button } from "@aws-amplify/ui-react";
import { ReactPropTypes, useEffect, useState } from "react";
import { Link, PathRouteProps } from "react-router-dom";

import { BoardData } from "../../types";
import { useParams } from "react-router-dom";

import API from "../../utils/API";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const ViewBoard = () => {
  const params = useParams(); // inside your component
  const boardId = params.id;

  const [showCreateIdea, setShowCreateIdea] = useState(false);
  const [ideaName, setIdeaName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");

  const [boardData, setBoardData] = useState<BoardData>({
    boardName: "Board Name",
    description: "",
    date: Date.now(),
    id: "",
    owner: "",
    ideas: [],
    public: true,
  });

  const getBoard = async () => {
    const res = await API.get<BoardData>({ path: `/boards/${boardId}` });
    console.log("get board data response", res);
    setBoardData(res);
  };

  const voteOnIdea = async (ideaId: string) => {
    try {
      await API.post({ path: `/ideas/${ideaId}`, data: {} });
      await getBoard();
    } catch (err) {
      console.log(err);
      if ((err as AxiosError).response?.status == 400) {
        const responseData = (err as AxiosError).response?.data as {
          message: string;
        };
        console.log(responseData);
        toast(responseData.message);
      }
    }
  };

  const submitIdea = async () => {
    await API.post({
      path: `/ideas`,
      data: {
        title: ideaName,
        description: ideaDescription,
        boardId,
      },
    });
    setShowCreateIdea(false);
    setIdeaDescription("");
    setIdeaName("");
    await getBoard();
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "30px auto",
      }}
    >
      <h1>{boardData.boardName}</h1>

      <span>{boardData.description}</span>
      <span>Created - {new Date(boardData.date).toDateString()}</span>
      <div id="ideaList">
        {boardData.ideas.map((idea) => {
          return (
            <div className="idea" key={idea.id}>
              <h3>{idea.ideaTitle}</h3>
              <div>{idea.description}</div>
              <hr />
              <div>Votes = {idea.votes}</div>
              <button onClick={() => voteOnIdea(idea.id)}>Vote</button>
            </div>
          );
        })}
      </div>

      <button
        className="showCreateIdea"
        onClick={() => setShowCreateIdea(!showCreateIdea)}
      >
        {showCreateIdea ? 'Hide "Create Idea"' : "Create an idea"}
      </button>

      {showCreateIdea ? (
        <div>
          <h2>Create an Idea</h2>
          <span>Idea Name</span>
          <input
            type="text"
            value={ideaName}
            onChange={(e) => setIdeaName(e.target.value)}
            placeholder="Board Name"
          />
          <span>Description</span>
          <input
            type="text"
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)}
            placeholder="Board Description"
          />
          <button onClick={() => submitIdea()}>Submit Idea</button>
        </div>
      ) : null}
    </div>
  );
};
