import React from 'react';

class RepoListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={this.props.repo.avatar} height='40' width='40'></img>
        <div>
          <a href={this.props.repo.repoUrl}>{this.props.repo.name}</a>
        </div>
        <div>Forks: {this.props.repo.forks}</div>
      </div>
    )
  }
}


export default RepoListItem;

