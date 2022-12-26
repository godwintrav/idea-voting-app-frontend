import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { AuthEventData, CognitoUserAmplify } from '@aws-amplify/ui';
import { Home } from './views/Home';
import { CreateBoard } from './views/CreateBoard';
import { ViewBoard } from './views/Board';
import { ViewBoards } from './views/ViewBoards';

interface Props extends React.PropsWithChildren {
  user: CognitoUserAmplify | undefined;
  signOut: ((data?: AuthEventData | undefined) => void) | undefined;
}

function AppRoutes(props: Props) {
  return (
    <div>
      <div className="nav">
        <Link to="/">
          <button>Home</button>
        </Link>

        <h1>Idea Voting App</h1>

        <button onClick={props.signOut}>Sign Out</button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards" element={<ViewBoards />} />
        <Route path="/boards/:id" element={<ViewBoard />} />

        <Route path="/createboard/" element={<CreateBoard />} />
      </Routes>
    </div>
  );
}

// TODO create Idea
// TODO vote

export default AppRoutes;
