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

  getNewData() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      success: (data) => {
        this.setState({repos: data});
      },
      error: function(error) {
        console.log(error);
      }
    })
  }

  componentDidMount() {
    this.getNewData();
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      data: {username: term},
      success: (data) => {
        this.getNewData();
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