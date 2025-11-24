import '../styles/Home.css'

function Home() {
  //Add a clickable function
  const handleClick = () => 
  {
    window.location.href = '\signup';
  }

  return (
    <div className="home-wrapper">
      <div className="home-container" onClick={handleClick}>
        <h1></h1>
      </div>
    </div>
  )
}

export default Home