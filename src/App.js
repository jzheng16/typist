import Navbar from './Navbar';
import './App.css';
import Game from './Game';

function App() {

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Game />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Joey Zheng</p>
          <div>
            <a href="https://iconscout.com/icons/keyboard" target="_blank" rel="noreferrer">Keyboard Icon</a> &nbsp;by&nbsp; <a href="https://iconscout.com/contributors/kiran-shastry">Kiran Shastry</a>&nbsp;on&nbsp;<a href="https://iconscout.com">Iconscout</a>
          </div>
        </div>
      </footer>

    </div >
  )
}


export default App;
