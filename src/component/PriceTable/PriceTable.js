import './PriceTable.scss'
import {PriceRow, findLowestPriceEdition} from '../PriceRow/PriceRow'
import {useEffect, useState} from 'react'
import {v4} from 'uuid'

export default function PriceTable({cardList}){

    function setLowPriceState(identityPriceObject){
        let oldLows = [...lowPrices]
        const existingIndex = oldLows.findIndex(object => {
            return object['identity'] === identityPriceObject['identity']
        })
        if(existingIndex >= 0){
            oldLows.splice(existingIndex, 1)
        }
        oldLows.push(identityPriceObject)
        setLowPrices(oldLows)
    }

    function setMarketPriceState(identityPriceObject){
        let oldLows =[...marketPrices]
        const existingIndex = oldLows.findIndex(object => {
            return object['identity'] === identityPriceObject['identity']
        })
        if(existingIndex >= 0){
            oldLows.splice(existingIndex, 1)
        }
        oldLows.push(identityPriceObject)
        setMarketPrices(oldLows)
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

    let initialMarketPrices = []
    let initialLowPrices = []

    function appendInitialLow(identityPriceObject){
        const existingIndex = initialLowPrices.findIndex(object => {
            return object['identity'] === identityPriceObject['identity']
        })
        if(existingIndex >= 0){
            initialLowPrices.splice(existingIndex)
        }
        initialLowPrices.push(identityPriceObject)
    }

    function appendInitialMarket(identityPriceObject){
        const existingIndex = initialMarketPrices.findIndex(object => {
            return object['identity'] === identityPriceObject['identity']
        })
        if(existingIndex >= 0){
            initialMarketPrices.splice(existingIndex)
        }
        initialMarketPrices.push(identityPriceObject)
        
    }

    cardList.forEach((card, index) => {
        let lowestPriceEdition = findLowestPriceEdition(card.editions)
        if(lowestPriceEdition){
            if(lowestPriceEdition['isFoilCheaper']){
                console.log(index)
                        appendInitialLow({
                        'identity': index,
                        'price': card['editions'][lowestPriceEdition.index]['tcg_low_foil']
                    })
                        appendInitialMarket({
                        'identity': index,
                        'price': card['editions'][lowestPriceEdition.index]['tcg_market_foil']
                    })
            }else{
                        appendInitialLow({
                        'identity': index,
                        'price': card['editions'][lowestPriceEdition.index]['tcg_low_nonfoil']
                    })
                        appendInitialMarket({
                        'identity': index,
                        'price': card['editions'][lowestPriceEdition.index]['tcg_market_nonfoil']
                    })
            }}
    })

    const[lowPrices, setLowPrices] = useState(initialLowPrices)
    const[marketPrices, setMarketPrices] = useState(initialMarketPrices)
    const[totalLow, setLow] = useState(Math.round(calculateTotal(lowPrices) * 100)/100)
    const[totalMarket, setMarket] = useState(Math.round(calculateTotal(lowPrices) * 100)/100)

    useEffect(() => {
        setLow(Math.round(calculateTotal(lowPrices) * 100)/100)
    }, [lowPrices])

    useEffect(() => {
        setMarket(Math.round(calculateTotal(marketPrices) * 100)/100)
    }, [marketPrices])

    return(
        <div className="pricetable">
            <div className='pricetable-table'>
                <PriceRow isColumnTitle={true} card={null} setLowPriceState={setLowPriceState} setMarketPriceState={setMarketPriceState} identity={v4()} key={v4()}/>
                {cardList.map((card, index)=>{
                    return (<PriceRow isColumnTitle={false} card={card} setLowPriceState={setLowPriceState} setMarketPriceState={setMarketPriceState} identity={index} key={index}/>)
                })}
                <div className='pricetable-table-total'>
                    <div className='pricetable-table-total_divider'><hr/></div>
                    <div className='pricetable-table-total_filler col-span-8'></div>
                    <div className='pricetable-table-total_label col-span-3'>Total:</div>
                    <div className='pricetable-table-total_low col-span-2'>{totalLow}</div>
                    <div className='pricetable-table-total_market col-span-2'>{totalMarket}</div>
                </div>
            </div>
        </div>
    )
}