import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <div>There are {props.repos.length} repos.</div>
    <div>{props.newRepoCount} repos were updated.</div>
      <ul>
        {props.repos.map((repo, index) => {
          return <RepoListItem key={index} repo={repo} onClick={props.goToRepo}/>
        })}
      </ul>
  </div>
)

export default RepoList;