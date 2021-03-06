const React = require('react');
// const { Link, Route } = require('react-router-dom');
const { connect } = require('react-redux');
const qs = require('qs');
const actions = require('./actions');
const Item = require('./item');
const styles = require('./styles.css');

class Search extends React.Component {

  componentDidMount(){
    this.props.getInitialData(this.props.match, this.props.searchQuery);
  }

  componentWillReceiveProps(nextProps){
    nextProps.getInitialData(nextProps.match, nextProps.searchQuery);
  }

  render() {
    const results = this.props.results && this.props.results.length > 0 ? this.props.results : null;
    return (
      <div className={styles.container}>
        { this.props.fetching ? <div key="uniq">buscando</div> : null }
        <ul>
          { results ? results.map(result => <Item key={result.id} {...result} />) : null }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  appData: state.appData,
  searchQuery: qs.parse(ownProps.location.search.substr(1)),
  fetching: state.search.fetching,
  results: state.search.results
});

module.exports = connect(mapStateToProps, actions)(Search);