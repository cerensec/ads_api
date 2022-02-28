import React from 'react';
import {Link} from 'react-router-dom';


export default class Header extends React.Component {
	constructor(props){
		super(props);

	}
	// Header pour diriger la navigation
	render(){
		return (
			<div>
				<nav style={{backgroundColor:"black", height:"40px",display:"flex",justifyContent:"center",alignItems:"center"}}>
					<Link style={{textDecoration:"none",color:"white",paddingRight:"20px"}} to="/">Home</Link>
					<Link style={{textDecoration:"none",color:"white",paddingRight:"20px"}} to="/form">Formulaire</Link>
					<Link style={{textDecoration:"none",color:"white",paddingRight:"20px"}} to="/admin">Admin</Link>
				</nav>
			</div>
		)
	}
}