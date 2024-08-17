import './OmniForm.scss'
import {useRef, useState} from 'react'

function OmniForm({onSubmit, onCancel}){
    const matDeck = useRef()
    const mainDeck = useRef()
    const sideDeck = useRef()

    const [matDeckState, setMatDeckState] = useState("")
    const [mainDeckState, setMainDeckState] = useState("")
    const [sideDeckState, setSideDeckState] = useState("")

    function onPaste(e){
        let validDeckPasted = false
        const clipboardText = e.clipboardData.getData('text/plain')
        const clipboardList = clipboardText.split('#')
        clipboardList.forEach(segment => {
            if(segment.startsWith(' Material Deck\r')){
                const segmentArray = segment.split('\n')
                let filteredArray = segmentArray.filter((line) => {return line.match('^[0-9]')})
                let deckList = filteredArray.join('\n')
                setMatDeckState(deckList)
                validDeckPasted = true;
            }
            if(segment.startsWith(' Main Deck\r')){
                const segmentArray = segment.split('\n')
                let filteredArray = segmentArray.filter((line) => {return line.match('^[0-9]')})
                let deckList = filteredArray.join('\n')
                setMainDeckState(deckList)
                validDeckPasted = true;
            }
            if(segment.startsWith(' Sideboard\r')){
                const segmentArray = segment.split('\n')
                let filteredArray = segmentArray.filter((line) => {return line.match('^[0-9]')})
                let deckList = filteredArray.join('\n')
                setSideDeckState(deckList)
                validDeckPasted = true;
            }
        });
        if (validDeckPasted){
            e.preventDefault()
        }
    }

    return(
        <div className='omniform page-boundaries'>
            <form className="omniform-form" onSubmit={(e) => onSubmit(e)}>
                <h3 className='omniform_title'>Put your decklist here in Omnidex Format</h3>
                <div className='omniform-form-inputarea'>
                    <div className='omniform-form-inputarea-inputset'>
                        <label className="omniform-form-inputarea-inputset_label" htmlFor='omniform-mat-deck'>Material Deck</label>
                        <textarea className="omniform-form-inputarea-inputset_textarea" onChange={(e)=>{setMatDeckState(e.target.value)}} ref={matDeck} onPaste={(e)=>{onPaste(e)}} rows='7' id='omniform-mat-deck' name="mat_deck" value={matDeckState}></textarea>  
                    </div>
                    <div className='omniform-form-inputarea-inputset'>
                        <label className="omniform-form-inputarea-inputset_label" htmlFor='omniform-main-deck'>Main Deck</label>
                        <textarea className="omniform-form-inputarea-inputset_textarea" onChange={(e)=>{setMainDeckState(e.target.value)}} ref={mainDeck} onPaste={(e)=>{onPaste(e)}} rows='7' id='omniform-main-deck' name="main_deck" value={mainDeckState}></textarea>
                    </div>
                    <div className='omniform-form-inputarea-inputset'>
                        <label className="omniform-form-inputarea-inputset_label" htmlFor='omniform-side-deck'>Sideboard</label>
                        <textarea className="omniform-form-inputarea-inputset_textarea" onChange={(e)=>{setSideDeckState(e.target.value)}} ref={sideDeck} onPaste={(e)=>{onPaste(e)}} rows='7' id='omniform-side-deck' name="side_deck" value={sideDeckState}></textarea>
                    </div>
                </div>
                <div className='omniform-form-buttons'>
                    <button className='omniform-form-buttons_submit' type='submit'>Submit</button>
                    <button className='omniform-form-buttons_cancel' onClick={(e) => onCancel(e)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default OmniForm;