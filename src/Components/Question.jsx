// import React from "react";
// import { Card, Radio, Button } from "antd";

// const Question = ({ question, selectedOption, onOptionChange, onSubmit }) => {
//   return (
//     <Card title={`Question ${question.id}`} bordered={false} style={{ width: "60%" }}>
//       <h5>{question.question}</h5>
//       <form onSubmit={onSubmit} >
//         <Radio.Group onChange={onOptionChange} value={selectedOption} style={{ display: "flex", flexDirection: "column" }}>
//           {question.options.map((option, index) => (
//             <Radio key={index} value={option}>
//               {option}
//             </Radio>
//           ))}
//         </Radio.Group>
        
//         <Button type="primary" htmlType="submit" className="mt-2">
//           Submit
//         </Button>
//       </form>
//     </Card>
//   );
// };

// export default Question;





// import React from "react";
// import { Card, Radio, Button } from "antd";

// const Question = ({ question, selectedOption, onOptionChange, onNext,onSubmit, isLastQuestion }) => {
//   return (
//     <Card title={`Question ${question.id}`} bordered={false} style={{ width: "60%" }}>
//       <h5>{question.question}</h5>
//       <Radio.Group onChange={onOptionChange} value={selectedOption} style={{ display: "flex", flexDirection: "column" }}>
//         {question.options.map((option, index) => (
//           <Radio key={index} value={option}>
//             {option}
//           </Radio>
//         ))}
//       </Radio.Group>
      
//       <div style={{ marginTop: "16px" }}>
//         {isLastQuestion ? (
//           <Button type="primary" onClick={onSubmit}>
//             Submit
//           </Button>
//         ) : (
//           <Button type="primary" onClick={onNext} disabled={!selectedOption}>
//             Next
//           </Button>
//         )}
//       </div>
//     </Card>
//   );
// };

// export default Question;









import React, { useState, useEffect } from "react";
import { Card, Radio, Button } from "antd";

const Question = ({ question, selectedOption, onOptionChange, onNext, onSubmit, isLastQuestion }) => {
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setStartTime(Date.now()); // Reset start time when question changes
  }, [question]);

  const handleNext = () => {
    const timeTaken = (Date.now() - startTime) / 1000; // Calculate time in seconds
    onNext(timeTaken);
  };

  return (
    <Card title={`Question ${question.id}`} bordered={false} style={{ width: "60%" }}>
      <h5>{question.question}</h5>
      <Radio.Group onChange={onOptionChange} value={selectedOption} style={{ display: "flex", flexDirection: "column" }}>
        {question.options.map((option, index) => (
          <Radio key={index} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>

      <div style={{ marginTop: "16px" }}>
        {isLastQuestion ? (
          <Button type="primary" onClick={() => onSubmit((Date.now() - startTime) / 1000)}>
            Submit
          </Button>
        ) : (
          <Button type="primary" onClick={handleNext} disabled={!selectedOption}>
            Next
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Question;







// import React, { useState, useEffect } from "react";
// import { Card, Radio, Button, message } from "antd";
// import axios from "axios";

// const Question = ({ question, selectedOption, onOptionChange, onNext, isLastQuestion, user }) => {
//   const [startTime, setStartTime] = useState(Date.now());
//   const [score, setScore] = useState(0);
//   const [timeTaken, setTimeTaken] = useState(0);
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     setStartTime(Date.now());
//   }, [question]);

//   const handleNext = () => {
//     const timeSpent = (Date.now() - startTime) / 1000;
//     setTimeTaken((prev) => prev + timeSpent);
//     if (selectedOption === question.correctAnswer) {
//       setScore((prev) => prev + 1);
//     }
//     onNext(timeSpent);
//   };

//   const handleSubmit = async () => {
//     const totalTime = (Date.now() - startTime) / 1000 + timeTaken;
//     const finalScore = score + (selectedOption === question.correctAnswer ? 1 : 0);
    
//     const data = {
//       name: user.name,
//       score: finalScore,
//       time_taken: totalTime.toFixed(2),
//     };
    
//     try {
//       await axios.post("http://127.0.0.1:8000/submit-score", data);
//       message.success(`Score: ${finalScore}, Time Taken: ${totalTime.toFixed(2)}s`);
//       setSubmitted(true);
//     } catch (error) {
//       message.error("Failed to submit score.");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <Card title={`Question ${question.id}`} bordered={false} style={{ width: "60%" }}>
//       <h5>{question.question}</h5>
//       <Radio.Group onChange={onOptionChange} value={selectedOption} style={{ display: "flex", flexDirection: "column" }}>
//         {question.options.map((option, index) => (
//           <Radio key={index} value={option}>
//             {option}
//           </Radio>
//         ))}
//       </Radio.Group>

//       <div style={{ marginTop: "16px" }}>
//         {isLastQuestion ? (
//           <Button type="primary" onClick={handleSubmit} disabled={submitted}>
//             Submit
//           </Button>
//         ) : (
//           <Button type="primary" onClick={handleNext} disabled={!selectedOption}>
//             Next
//           </Button>
//         )}
//       </div>
//     </Card>
//   );
// };

// export default Question;
