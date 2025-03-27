import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './stq.css';

const StartQuiz = () => {
    const [dictionary, setDictionary] = useState({});
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDictionary = async () => {
            try {
                const response = await axios.get('http://localhost:3002/dictionary');
                setDictionary(response.data);
            } catch (error) {
                console.error('Error fetching dictionary:', error);
                alert('Failed to load quiz data. Please try again.');
            }
        };

        fetchDictionary();
    }, []);

    const handleNewQuestion = () => {
        const keys = Object.keys(dictionary);
        if (keys.length === 0) {
            setQuestion('No entries available.');
            return;
        }

        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        setQuestion(randomKey);
        setAnswer('');
        setResult('');
    };

    const handleCheckAnswer = () => {
        if (!question) return;

        if (dictionary[question].trim().toLowerCase() === answer.trim().toLowerCase()) {
            setResult('✅ Correct!');
        } else {
            setResult(`❌ Incorrect! Correct answer: ${dictionary[question]}`);
        }

        setTimeout(handleNewQuestion, 3000);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCheckAnswer();
        }
    };

    return (
        <div className="start-quiz-container">
            <h2 className="title">Start Quiz</h2>

            <div className="question-box">
                <p>{question || "Click 'New Question' to start!"}</p>
            </div>

            <div className="input-box">
                <input
                    type="text"
                    
                    placeholder="Enter answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="button-box">
                <button onClick={handleNewQuestion}>New Question</button>
            </div>

            <div className="result-box">
                <p>{result}</p>
            </div>

            {/* Go Back Button at Bottom Left */}
            <div className="go-back-box">
                <button className="go-back-btn" onClick={() => navigate('/')}>Go Back</button>
            </div>
        </div>
    );
};

export default StartQuiz;
