import logo from './logo.svg';
import './App.scss';
import Header from './component/Header/Header';

function App() {
  return (
    <div className="home">
      <Header />
      <main className="home-main">
        <form className="home-main-form">
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
          <button type='submit'>Submit</button>
        </form>
      </main>
    </div>
  );
}

export default App;
