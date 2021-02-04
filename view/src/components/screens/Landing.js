import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
             <div className="text-center">

<div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
  <header className="masthead mb-auto">
    <div className="inner">
      <h3 className="masthead-brand">Cover</h3>
      <nav className="nav nav-masthead justify-content-center">
        <a className="nav-link active" href="#">Home</a>
        <a className="nav-link" href="#">Features</a>
        <a className="nav-link" href="#">Contact</a>
      </nav>
    </div>
  </header>

  <main role="main" className="inner cover">
    <h1 className="cover-heading">Cover your page.</h1>
    <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
    <p className="lead">
      <a href="#" className="btn btn-lg btn-secondary">Learn more</a>
    </p>
  </main>

  <footer className="mastfoot mt-auto">
    <div className="inner">
    </div>
  </footer>
</div>


</div>

<div>
                Basic explanation
            </div>
            Register as a:
            <div>
                <Link to='/signup/mentor'>Mentor</Link>
                <br/>
                <Link to='/signup/mentee'>Mentee</Link>
            </div>
            <div><Link to='/signin'>Login</Link></div>
            <Link to="/home">Go to home page</Link>

 
  </div>






            
   
    );
};

export default Landing;