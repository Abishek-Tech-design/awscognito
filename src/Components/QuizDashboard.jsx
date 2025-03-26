import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TrophyOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Question from './Question';
import QuestionBank from './QuestionBank';
import Score from "./Score";
import { useNavigate } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import UserManagement from './UserManagement';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(1);  
  const navigate = useNavigate();
  const [showScore, setShowScore] = useState(false);



  useEffect(() => {
    if (currentQuestionIndex === QuestionBank.length) {
      navigate("/score", { state: { score } }); // Now `score` will be the latest
    }
  }, [currentQuestionIndex, navigate, score]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("Submit button clicked");

    console.log('score', score);
    
    
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


  const renderContent = () => {
    switch (selectedKey) {
      case 'quiz':
        return <Question
          question={QuestionBank[currentQuestionIndex]}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isLastQuestion={currentQuestionIndex === QuestionBank.length - 1}

        />;





      case 'leaderboard':
        return <Leaderboard />;
      case 'logout':
        return < UserManagement />;
      default:
        return <h2>Welcome!</h2>;
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          items={[
            {
              key: 'quiz',
              icon: <UserOutlined />, // You can change the icon
              label: 'Quiz',
            },
            {
              key: 'leaderboard',
              icon: <TrophyOutlined />,
              label: 'Leaderboard',
            },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Usermanagement',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;




// //side and content only 

// import React, { useState } from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UserOutlined,
//   TrophyOutlined,
//   LogoutOutlined,
// } from '@ant-design/icons';
// import { Button, Layout, Menu, theme } from 'antd';
// import { useNavigate } from 'react-router-dom';

// const { Header, Sider, Content } = Layout;

// const App = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedKey, setSelectedKey] = useState('quiz');
//   const navigate = useNavigate();

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const renderContent = () => {
//     switch (selectedKey) {
//       case 'quiz':
//         return <h2>Quiz Page</h2>;
//       case 'leaderboard':
//         return <h2>Leaderboard</h2>;
//       case 'logout':
//         return <h2>Logout Page</h2>;
//       default:
//         return <h2>Welcome!</h2>;
//     }
//   };

//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[selectedKey]}
//           onClick={(e) => setSelectedKey(e.key)}
//           items={[
//             { key: 'quiz', icon: <UserOutlined />, label: 'Quiz' },
//             { key: 'leaderboard', icon: <TrophyOutlined />, label: 'Leaderboard' },
//             { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
//           ]}
//         />
//       </Sider>
//       <Layout>
//         <Header style={{ padding: 0, background: colorBgContainer }}>
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{ fontSize: '16px', width: 64, height: 64 }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           {renderContent()}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default App;
