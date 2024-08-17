import logo from './logo.svg';
import './App.scss';
import Header from './component/Header/Header';
import OmniForm from './component/OmniForm/OmniForm';

function App() {
  function onOmniFormSubmitted(){}

  return (
    <div className="home">
      <Header />
      <OmniForm onSubmit={onOmniFormSubmitted} />
      <main className="home-main page-boundaries">
        
      </main>
    </div>
  );
}

export default App;
