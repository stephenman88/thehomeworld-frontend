import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="home">
      <header className="home-header">
        <h1 className="home-header_title">The HomeWorld</h1>
      </header>
      <main className="home-main">
        <form className="home-main-form" >
          <label className="home-main-form_label" >
            Material Deck
            <textarea className="home-main-form_textarea" name="mat_deck"></textarea>  
          </label>
          <label className="home-main-form_label" >
            Main Deck
            <textarea className="home-main-form_textarea" name="main_deck"></textarea>  
          </label>
          <label className="home-main-form_label" >
            Side Deck
            <textarea className="home-main-form_textarea" name="side_deck"></textarea>  
          </label>
        </form>
      </main>
    </div>
  );
}

export default App;
