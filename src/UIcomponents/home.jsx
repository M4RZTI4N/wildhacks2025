import React from 'react';
import "../css/home.css";

function Home(){
  return (
    <div className="home">
      <h1 style={{ color: 'darkblue', fontSize: '48px' }}>Ready to learn</h1>
      <p style={{ color: 'darkgreen', fontSize: '24px' }}>Start decreasing inactive brain cells today.</p>
      <div className="button-group">
        <button className="learn-now">Get started</button>
        <button className="more">More about us</button>
      </div>
    </div>
  );
}

export default Home;