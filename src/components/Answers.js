import React from 'react';
import Answer from './Answer';

const Answers = (props) => {
  return (
    <div className="c-grid__answer">
    {props.answers.map((value, index) => {
      return <Answer content={value.content} key={index.toString()} select={props.select} nextId={value.nextId} />;
    })}
    </div>
  );
}

export default Answers;
