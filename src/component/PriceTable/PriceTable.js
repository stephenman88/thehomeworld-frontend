import './PriceTable.scss'
import PriceRow from '../PriceRow/PriceRow'
import {useEffect, useState} from 'react'
import {v4} from 'uuid'

export default function PriceTable({DeckJson}){
    const[lowPrices, setLowPrices] = useState([])
    const[marketPrices, setMarketPrices] = useState([])
    const[cardList, setCardList] = useState(DeckJson)

    function setLowPriceState(identityPriceObject){
        let oldLows =Object.assign([], lowPrices)
        const existingIndex = oldLows.findIndex(object => {
            return object['identity'] === identityPriceObject['identity']
        })
        if(existingIndex >= 0){
            oldLows.splice(existingIndex)
        }
        oldLows.push(identityPriceObject)
        setLowPrices(oldLows)
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
                    return (<PriceRow isColumnTitle={false} card={card} setLowPriceState={setLowPriceState} setMarketPriceState={setMarketPriceState} identity={index}/>)
                })}
                <div className='pricetable-table-total'>
                    <div className='pricetable-table-total_divider'><hr/></div>
                    <div className='pricetable-table-total_filler col-span-8'></div>
                    <div className='pricetable-table-total_label col-span-3'>Total:</div>
                    <div className='pricetable-table-total_low col-span-2'>{calculateTotal(lowPrices)}</div>
                    <div className='pricetable-table-total_market col-span-2'>{calculateTotal(marketPrices)}</div>
                </div>
            </div>
        </div>
    )
}