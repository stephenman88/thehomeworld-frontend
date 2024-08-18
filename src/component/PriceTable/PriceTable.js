import './PriceTable.scss'
import PriceRow from '../PriceRow/PriceRow'
import {useEffect, useState} from 'react'
import {v4} from 'uuid'

export default function PriceTable({DeckJson}){
    const[lowPrices, setLowPrices] = useState([])
    const[marketPrices, setMarketPrices] = useState([])
    const[cardList, setCardList] = useState([])

    useEffect(() => {
        if(DeckJson){
            const tempCardList = []
            
            if(DeckJson['mat_deck']){
                for (let i = 0; i < DeckJson['mat_deck'].length; i++){
                    tempCardList.push(DeckJson['mat_deck'][i])
                }
            }
            if(DeckJson['main_deck']){
                for (let i = 0; i < DeckJson['main_deck'].length; i++){
                    tempCardList.push(DeckJson['main_deck'][i])
                }
            }
            if(DeckJson['side_deck']){
                for (let i = 0; i < DeckJson['side_deck'].length; i++){
                    tempCardList.push(DeckJson['side_deck'][i])
                }
            }
            setCardList(tempCardList)
        }
    })

    function setLowPriceState(identityPriceObject){
        const existingIndex = lowPrices.findIndex(object => {
            if(!object || !object['identity']){return false;}
            return object['identity'] === identityPriceObject['identity']
        })
        if(existingIndex < 0){
            lowPrices.splice(existingIndex)
        }
        lowPrices.push(identityPriceObject)
        const newLows = Object.assign([], lowPrices)
        setLowPrices(newLows)
    }

    function setMarketPriceState(identityPriceObject){
        const existingIndex = marketPrices.findIndex(object => {
            if(!object || !object['identity']){return false;}
            return object['identity'] === identityPriceObject['identity']
        })
        if(existingIndex < 0){marketPrices.splice(existingIndex)}
        const newMarket = Object.assign([], marketPrices)
        setMarketPrices(newMarket)
    }

    function calculateTotal(priceStateList){
        let totalPrice = 0;
        priceStateList.forEach((identityPriceObject, index) => {
            if(identityPriceObject && identityPriceObject['price'] && typeof identityPriceObject['price'] === 'number'){
                totalPrice += identityPriceObject['price']
            }
        })
        return totalPrice
    }

    return(
        <div className="pricetable">
            <div className='pricetable-table'>
                <PriceRow isColumnTitle={true} card={null} setLowPriceState={setLowPriceState} setMarketPriceState={setMarketPriceState} identity={v4()}/>
                {cardList.map((card, index)=>{
                    return (<PriceRow isColumnTitle={false} card={card} setLowPriceState={setLowPriceState} setMarketPriceState={setMarketPriceState} identity={v4()}/>)
                })}
                <div className='pricetable-table-total'>
                    <div className='pricetable-table-total_label'>Total:</div>
                    <div className='pricetable-table-total_low'>{calculateTotal(lowPrices)}</div>
                    <div className='pricetable-table-total_market'>{calculateTotal(marketPrices)}</div>
                </div>
            </div>
        </div>
    )
}