import '../styles/App.css'
import { Link } from 'react-router-dom'


function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Food Freshness Tracker</h1>
      <p className="app-subtitle">React is working!</p>

      <Link to="/anju" className="app-link">Go to Anju's Page</Link>
    </div>
  )
}

export default App


{/* 
  Frontend Deverlopers: To verify your local environement is wroking: 
  1. Create a file: src/pages/[YourName].jsx
  2. Replace YourName with your actual name. Reference Anju.jsx and App.jsx to accomplish this
  3. Add your route to main.jsx
  4. Push to your own branch
  5. Send a screenshot of your working page in the frontend channel

  */ }