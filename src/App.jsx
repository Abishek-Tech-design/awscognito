// import { useState } from 'react'
// import reactLogo from './images/react.svg'
// import viteLogo from './images/vite.svg'
// import './App.css'




// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginForm from "./Login/LoginForm";
// import SignupForm from "./Signup/SignupForm";
// import Forgotpassword from "./Login/Forgotpassword/Forgotpassword";
// import Roleselection from "./Role/Roleselection";
// import Platformadmin from "./Role/Platformadmin";
// import Roles from "./Role/Roles";

// import Drmodule from "./Role/Drmodule"



// function App() {
//   return (
//     <>
//     <div className="app-container">
//       <Router>
//         <Routes>
//           <Route path="/" element={<LoginForm />} />
//           <Route path="/signup" element={<SignupForm />} />
//           <Route path="/forgot-password" element={<Forgotpassword />} />
//           <Route path="/role-selection" element={<Roleselection/>} /> 
//           <Route path="/dashboard"  element={<Platformadmin/>} />
//           <Route path="/roles" element={<Roles/>} />
//           <Route path="/drmodule" element={<Drmodule/>} />
          
          
//         </Routes>
//       </Router>
//     </div>

//     {/* <Router>
//       <Routes>
        
//       </Routes>
//     </Router> */}


//     </>
//   );
// }

// export default App;








// ------------------------------------------------
import React, { useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Question from "./Components/Question";
import QuestionBank from "./Components/QuestionBank";
import LoginForm from "./Login/LoginForm";
import SignupForm from "./Signup/SignupForm";
import Forgotpassword from "./Login/Forgotpassword/Forgotpassword";
import Roleselection from "./Role/Roleselection";
import Platformadmin from "./Role/Platformadmin";
import Roles from "./Role/Roles";
import QuizDashboard from "./Components/QuizDashboard";
import Score from "../src/Components/Score";
import Leaderboard from "./Components/Leaderboard";
import UserManagement from "./Components/UserManagement";
// import Projects from "./Components/Projects";


const { Content } = Layout;

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("Submit button clicked");
    
    // e.preventDefault();
    if (selectedOption === QuestionBank[currentQuestionIndex].answer) {
      // setScore(score + 1);
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedOption(null);

    if (currentQuestionIndex < QuestionBank.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/score", { state: { score: score } });
    }
  };

  const handleNext = () => {
    console.log(`Selected Option: ${selectedOption}`);
    console.log(`Correct Answer: ${QuestionBank[currentQuestionIndex].answer}`);

    if (selectedOption === QuestionBank[currentQuestionIndex].answer) {
      setScore((prevScore) => prevScore + 1); // Ensures correct async update
    }

    setSelectedOption(null);

    if (currentQuestionIndex < QuestionBank.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/score", { state: { score: score } });
    }
  };



// const handleNext = () => {
//     console.log("Next button clicked");
// };

  return (
    <Layout style={{ minHeight: "100vh", padding: "2rem" }}>
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/role-selection" element={<Roleselection />} />
          <Route path="/dashboard" element={<Platformadmin />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/score" element={<Score  score={score}/>} />
          <Route path="/quizdashboard" element={<QuizDashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/usermanagement" element={< UserManagement />} />
          {/* <Route path="api//projectss" element={< Projects />} /> */}


          <Route
          path="/quiz"
          element={
            
            <Question
              question={QuestionBank[currentQuestionIndex]}
              selectedOption={selectedOption}
              onOptionChange={handleOptionChange}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isLastQuestion={currentQuestionIndex === QuestionBank.length - 1}
            />
          }
        />

         
          {/* <Route
            path="/quiz"
            element={
              !showScore ? (
                <Question
                  question={QuestionBank[currentQuestionIndex]}
                  selectedOption={selectedOption}
                  onOptionChange={handleOptionChange}
                  onSubmit={handleSubmit}
                />
              ) : (
                <Score score={score} />
              )
            }
          /> */}


          
        </Routes>
      {/* </Router> */}
    </Layout>
  );
};

export default App;




// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// import Score from "../src/Components/Score";
// import QuestionBank from "../src/Components/QuestionBank";
// import Question from "./Components/Question";

// const Quiz = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);
//   const navigate = useNavigate();

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleNext = () => {
//     if (selectedOption === QuestionBank[currentQuestionIndex].answer) {
//       setScore(score + 1);
//     }
//     setSelectedOption(null);
    
//     if (currentQuestionIndex < QuestionBank.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       navigate("/score"); // Navigate to Score page
//     }
//   };

//   return (
//     <Question
//       question={QuestionBank[currentQuestionIndex]}
//       selectedOption={selectedOption}
//       onOptionChange={handleOptionChange}
//       onNext={handleNext}
//       isLastQuestion={currentQuestionIndex === QuestionBank.length - 1}
//     />
//   );
// };

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Quiz />} />
//       <Route path="/score" element={<Score />} />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   </Router>
// );

// export default App;
