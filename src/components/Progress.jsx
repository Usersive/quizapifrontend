import React from "react";

const Progress = ({ questionIndex, matricNum, numQuestions }) => {
  return (
    <header className="progress">
      <progress max={numQuestions} value={questionIndex + 1} />
      <p>
        Question <strong>{questionIndex + 1}</strong> / {numQuestions}
      </p>

      <p>
        Hi, <strong style={{ textTransform: "uppercase" }}>{matricNum}</strong>
      </p>
    </header>
  );
};

export default Progress;
