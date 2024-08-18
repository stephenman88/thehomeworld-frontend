import logo from './logo.svg';
import './App.scss';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
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
        const tempCardList = []
            
            if(response.data['mat_deck']){
                for (let i = 0; i < response.data['mat_deck'].length; i++){
                    tempCardList.push(response.data['mat_deck'][i])
                }
            }
            if(response.data['main_deck']){
                for (let i = 0; i < response.data['main_deck'].length; i++){
                    tempCardList.push(response.data['main_deck'][i])
                }
            }
            if(response.data['side_deck']){
                for (let i = 0; i < response.data['side_deck'].length; i++){
                    tempCardList.push(response.data['side_deck'][i])
                }
            }
        setDeckList(tempCardList)
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
      <Footer />
    </div>
  );
}

export default App;
