import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      success: function(data) {
        //update repos with data from db
        console.log(data);
      },
      error: function(error) {
        console.log(error);
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    // should send a post request to /repos
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      data: {username: term},
      success: function(data) {
        console.log(data);
      },
      error: function(error) {
        console.log(error);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));