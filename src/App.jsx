import { useState } from 'react';
import './App.css';

function App() {
  const [bmi, setBmi] = useState(null);
  const [input, setInput] = useState({ weight: '', height: '' });
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');

  // Handle BMI calculation
  const handleCalc = () => {
    const { weight, height } = input;

    // Validate input
    if (!weight || !height || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      setError('Please enter valid weight and height values.');
      setShowResult(false);
      return;
    }

    // Reset error if valid input
    setError('');

    // Calculate BMI
    const heightInMeters = height / 100; // Convert height from cm to meters
    const calculatedBmi = (weight / (heightInMeters ** 2)).toFixed(2);
    setBmi(calculatedBmi);
    setShowResult(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
   <div className='container'>
      <div className="app">
        <h1 className="title">BMI Calculator</h1>
        <div className="card">
          <div className="form">
            <div className="input-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                name="weight"
                type="number"
                value={input.weight}
                onChange={handleInputChange}
                placeholder="Enter weight in kg"
              />
            </div>
  
            <div className="input-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                id="height"
                name="height"
                type="number"
                value={input.height}
                onChange={handleInputChange}
                placeholder="Enter height in cm"
              />
            </div>
  
            {error && <p className="error">{error}</p>}
  
            <button onClick={handleCalc} className="calculate-btn">
              Calculate BMI
            </button>
  
            {showResult && (
              <div className="result">
                <h3>BMI: {bmi}</h3>
                <p className="bmi-category">
                  {bmi < 18.5
                    ? 'Underweight'
                    : bmi >= 18.5 && bmi <= 24.9
                    ? 'Normal weight'
                    : bmi >= 25 && bmi <= 29.9
                    ? 'Overweight'
                    : 'Obese'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
   </div>
  );
}

export default App;
