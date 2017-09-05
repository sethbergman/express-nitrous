import React from "react";
import {QueryRenderer, graphql} from "react-relay";
import environment from "../createRelayEnvironment";
import {withRouter, Link} from "react-router-dom";
import CreatePostMutation from "../mutations/CreatePostMutation";

const CreatePageViewerQuery = graphql
  query CreatePageViewerQuery {
    require('es6-promise').polyfill()
    require('isomorphic-fetch')

function getItems() {`
    return fetch('https://api.graph.cool/relay/v1/cj75ec9v102v70156883dzior', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_AUTH_TOKEN'
      },
      body: {"query":"# Welcome to Graphcool's custom GraphiQL ✌\n#\n# GraphiQL is an in-browser IDE for writing, validating, and\n# testing GraphQL queries.\n#\n# In Graphcool's custom GraphiQL you can additionally generate\n# code examples and download the result JSON.\n#\n# Type queries into this side of the screen, and you will\n# see intelligent typeaheads aware of the current GraphQL type schema and\n# live syntax and validation errors highlighted within the text.\n#\n# To bring up the auto-complete at any point, just press Ctrl-Space.\n#\n# Press the run button above, or Cmd-Enter to execute the query, and the result\n# will appear in the pane to the right.\n\n"},
    })
  }
  viewer {
    id
  }
};`

class CreatePage extends React.Component {
	state = {
		description: "",
		imageUrl: ""
	};

	render() {
		return (
			<QueryRenderer environment={environment} query={CreatePageViewerQuery} render={({error, props}) => {
				if (error) {
					return <div>{error.message}</div>;
				} else if (props) {
					return (
						<div className="w-100 pa4 flex justify-center">
							<div style={{
								maxWidth: 400
							}} className="">
								<input className="w-100 pa3 mv2" value={this.state.description} placeholder="Description" onChange={e => this.setState({description: e.target.value})}/>
								<input className="w-100 pa3 mv2" value={this.state.imageUrl} placeholder="Image Url" onChange={e => this.setState({imageUrl: e.target.value})}/> {this.state.imageUrl && (<img src={this.state.imageUrl} alt={this.state.description} className="w-100 mv3"/>)}
								{this.state.description && this.state.imageUrl && (
									<button className="pa3 bg-black-10 bn dim ttu pointer" onClick={() => this._handlePost(props.viewer.id)}>
										Post
									</button>
								)}
								<div style={{
									textAlign: "center",
									color: "red"
								}}>
									<Link to="/">Cancel</Link>
								</div>
							</div>
						</div>
					);
				}
				return <div>loading</div>;
			}}/>
		);
	}

	_handlePost = viewerId => {
		const {description, imageUrl} = this.state;
		CreatePostMutation(description, imageUrl, viewerId, () => this.props.history.replace("/"));
	};
}

export default withRouter(CreatePage);
