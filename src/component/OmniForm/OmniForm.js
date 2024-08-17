import './OmniForm.scss'
import {useRef, useState} from 'react'

function OmniForm({onSubmit, onCancel}){
    const matDeck = useRef()
    const mainDeck = useRef()
    const sideDeck = useRef()

    function onPaste(e){

    }

    return(
        <div className='omniform page-boundaries'>
            <form className="omniform-form" onSubmit={(e) => onSubmit(e)}>
                <h3 className='omniform_title'>Put your decklist here in Omnidex Format</h3>
                <div className='omniform-form-inputarea'>
                    <div className='omniform-form-inputarea-inputset'>
                        <label className="omniform-form-inputarea-inputset_label" htmlFor='omniform-mat-deck'>Material Deck</label>
                        <textarea className="omniform-form-inputarea-inputset_textarea" ref={matDeck} onPaste={(e)=>{onPaste(e)}} rows='7' id='omniform-mat-deck' name="mat_deck"></textarea>  
                    </div>
                    <div className='omniform-form-inputarea-inputset'>
                        <label className="omniform-form-inputarea-inputset_label" htmlFor='omniform-main-deck'>Main Deck</label>
                        <textarea className="omniform-form-inputarea-inputset_textarea" ref={mainDeck} onPaste={(e)=>{onPaste(e)}} rows='7' id='omniform-main-deck' name="main_deck"></textarea>
                    </div>
                    <div className='omniform-form-inputarea-inputset'>
                        <label className="omniform-form-inputarea-inputset_label" htmlFor='omniform-side-deck'>Side Deck</label>
                        <textarea className="omniform-form-inputarea-inputset_textarea" ref={sideDeck} onPaste={(e)=>{onPaste(e)}} rows='7' id='omniform-side-deck' name="side_deck"></textarea>
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