import React from 'react';

// This is a stateless functional component
const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

// Add PropTypes to typechack the props in a component
Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}

export default Header;
