import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
    const [resultColor, setResultColor] = useState({ name: '', hex: '' });
    const [showResult, setShowResult] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const [leftColor, setLeftColor] = useState('');
    const [rightColor, setRightColor] = useState('');
    const navigate = useNavigate();

    const handleMix = (colorName, resultHex, leftHex, rightHex) => {
        setLeftColor(leftHex);
        setRightColor(rightHex);
        setResultColor({ name: colorName, hex: resultHex });
        setShowResult(true);
        setTrigger((prev) => prev + 1);
    };

    return (
        <div className="app-container">
            <div className="controls">
                <button onClick={() => handleMix('Yellow', '#ffff00', '#ff0000', '#00ff00')}>R + G</button>
                <button onClick={() => handleMix('Cyan', '#00ffff', '#00ff00', '#0000ff')}>G + B</button>
                <button onClick={() => handleMix('Magenta', '#ff00ff', '#ff0000', '#0000ff')}>R + B</button>
            </div>

            <div className="circle-container" key={trigger}>
                {showResult && (
                    <>
                        <div className="big-circle circle-left" style={{ backgroundColor: leftColor }}></div>
                        <div className="big-circle circle-right" style={{ backgroundColor: rightColor }}></div>
                        <div className="big-circle center-circle" style={{ backgroundColor: resultColor.hex }}>
                            <span className="color-name">{resultColor.name}</span>
                        </div>
                    </>
                )}
            </div>

            <div className="controls">
                <button onClick={() => handleMix('Blue', '#0000ff', '#00ffff', '#ff00ff')}>C + M</button>
                <button onClick={() => handleMix('Green', '#00ff00', '#ff00ff', '#ffff00')}>M + Y</button>
                <button onClick={() => handleMix('Red', '#ff0000', '#00ffff', '#ffff00')}>C + Y</button>
            </div>

            <button className="quiz-button" onClick={() => navigate('/quiz')}>Start Quiz</button>
        </div>
    );
}

export default App;
