import logo from './logo.svg';
import './App.scss';
import Header from './component/Header/Header';
import OmniForm from './component/OmniForm/OmniForm';
import {useEffect, useState} from 'react';
import axios from 'axios';
import PriceTable from './component/PriceTable/PriceTable';

function App() {
  const [isOmniFormVisible, setIsOmniFormVisible] = useState(true)
  const [deckList, setDeckList] = useState(null)

  function onOmniFormSubmitted(event, matDeckString, mainDeckString, sideDeckString){
    (async () => {
      matDeckString = matDeckString.split('\n').join('$$$$$')
      mainDeckString = mainDeckString.split('\n').join('$$$$$')
      sideDeckString = sideDeckString.split('\n').join('$$$$$')
      const urlString = `${process.env.REACT_APP_BACKEND_URL}/api/decklist?mat_deck=${matDeckString}&main_deck=${mainDeckString}&side_deck=${sideDeckString}`
      try{
        const response = await axios.get(urlString)
        console.log(response.data)
        setDeckList(response.data)
        setIsOmniFormVisible(false)
      }catch(exception){
        console.error(exception)
      }
    })()
  }
  function onOmniFormCancelled(){
    setIsOmniFormVisible(false)
  }
  function showOmniForm(){setIsOmniFormVisible(true)}

  return (
    <div className="home">
      <Header />
      {isOmniFormVisible ? <OmniForm onSubmit={onOmniFormSubmitted} onCancel={onOmniFormCancelled}/> : ''}
      <main className="home-main page-boundaries">
        <button onClick={showOmniForm}>Click here to enter your decklist.</button>
        {deckList ? <PriceTable DeckJson={deckList} />: ''}
      </main>
    </div>
  );
}

export default App;
