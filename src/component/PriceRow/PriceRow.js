import './PriceRow.scss';
import {useRef, useEffect, useState} from 'react';

function findLowestPriceEdition(editionsArray){
    let lowestPriceCard = null;
    editionsArray.forEach((edition, index) => {
        if(!lowestPriceCard){
            lowestPriceCard = {
                'edition': edition,
                'index': index,
                'isFoilCheaper': false,
                'price': null,
                'market_price': null
            }
            if(edition['tcg_low_foil'] && edition['tcg_low_nonfoil']){
                if(edition['tcg_low_nonfoil'] >= edition['tcg_low_foil']){
                    lowestPriceCard['isFoilCheaper'] = false
                    lowestPriceCard['price'] = edition['tcg_low_nonfoil']
                    lowestPriceCard['market_price'] = edition['tcg_market_nonfoil']
                }else{
                    lowestPriceCard['isFoilCheaper'] = true
                    lowestPriceCard['price'] = edition['tcg_low_foil']
                    lowestPriceCard['market_price'] = edition['tcg_market_foil']
                }
            }else if(edition['tcg_low_foil']){
                lowestPriceCard['isFoilCheaper'] = true
                lowestPriceCard['price'] = edition['tcg_low_foil']
                lowestPriceCard['market_price'] = edition['tcg_market_foil']
            }else if (edition['tcg_low_nonfoil']){
                lowestPriceCard['isFoilCheaper'] = false
                lowestPriceCard['price'] = edition['tcg_low_nonfoil']
                lowestPriceCard['market_price'] = edition['tcg_market_nonfoil']
            }else{
                lowestPriceCard['isFoilCheaper'] = false
                lowestPriceCard['price'] = null
                lowestPriceCard['market_price'] = null
            }
        }else{
            if(edition['tcg_low_foil'] && edition['tcg_low_nonfoil']){
                if(edition['tcg_low_nonfoil'] <= edition['tcg_low_foil']){
                    if (!lowestPriceCard['price'] || lowestPriceCard['price'] > edition['tcg_low_nonfoil']){
                        lowestPriceCard['card'] = edition;
                        lowestPriceCard['index'] = index;
                        lowestPriceCard['isFoilCheaper'] = false
                        lowestPriceCard['price'] = edition['tcg_low_nonfoil']
                        lowestPriceCard['market_price'] = edition['tcg_market_nonfoil']
                    }
                }else{
                    if (!lowestPriceCard['price'] || lowestPriceCard['price'] > edition['tcg_low_foil']){
                        lowestPriceCard['card'] = edition;
                        lowestPriceCard['index'] = index;
                        lowestPriceCard['isFoilCheaper'] = true
                        lowestPriceCard['price'] = edition['tcg_low_foil']
                        lowestPriceCard['market_price'] = edition['tcg_market_foil']
                    }
                }
            }else if(edition['tcg_low_foil']){
                if (!lowestPriceCard['price'] || lowestPriceCard['price'] > edition['tcg_low_foil']){
                    lowestPriceCard['card'] = edition;
                    lowestPriceCard['index'] = index;
                    lowestPriceCard['isFoilCheaper'] = true
                    lowestPriceCard['price'] = edition['tcg_low_foil']
                    lowestPriceCard['market_price'] = edition['tcg_market_foil']
                }
            }else if (edition['tcg_low_nonfoil']){
                if (!lowestPriceCard['price'] || lowestPriceCard['price'] > edition['tcg_low_nonfoil']){
                    lowestPriceCard['card'] = edition;
                    lowestPriceCard['index'] = index;
                    lowestPriceCard['isFoilCheaper'] = false
                    lowestPriceCard['price'] = edition['tcg_low_nonfoil']
                    lowestPriceCard['market_price'] = edition['tcg_market_nonfoil']
                }
            }
        }
    });
    return lowestPriceCard;
}

function PriceRow({isColumnTitle, card, setLowPriceState, setMarketPriceState, identity}){
    const [cardMain, setCardMain] = useState({'name': ''})
    const [editions, setEditions] = useState([])
    const [activeEdition, setActiveEdition] = useState(null)
    const [activeEditionIndex, setActiveEditionIndex] = useState(null)
    const [isFoilViewing, setIsFoilViewing] = useState(false)

    if(card && !isColumnTitle && !activeEdition){
        setEditions(card['editions']);
        const lowestPriceCard = findLowestPriceEdition(card['editions']);

        setCardMain({
            'name': card['name']
        })
        setActiveEditionIndex(lowestPriceCard['index'])
        setActiveEdition(card['editions'][lowestPriceCard['index']]);
        setIsFoilViewing(lowestPriceCard['isFoilCheaper']);
    }

    useEffect(()=>{
        relayCurrentPrices(activeEdition)
    }, [activeEdition, isFoilViewing])
    

    if (isColumnTitle){
        return(
            <div className='pricerow--title row'>
                <div className='col-span-5'>Card</div>
                <div className='col-span-3'>Print</div>
                <div className='col-span-3'>Edition</div>
                <div className='col-span-2'>Low Price</div>
                <div className='col-span-2'>Market Price</div>
            </div>
        )
    }

    function relayCurrentPrices(newEdition){
        if(newEdition){
            if(isFoilViewing){
                if(newEdition )
                    {
                        setLowPriceState({
                        'identity': identity,
                        'price': newEdition['tcg_low_foil']
                    })}
                if(newEdition )
                    {
                        setMarketPriceState({
                        'identity': identity,
                        'price': newEdition['tcg_market_foil']
                    })}
            }else{
                if(newEdition )
                    {setLowPriceState({
                        'identity': identity,
                        'price': newEdition['tcg_low_nonfoil']
                    })}
                if(newEdition)
                    {setMarketPriceState({
                        'identity': identity,
                        'price': newEdition['tcg_market_nonfoil']
                    })}
            }}
    }

    function onEditionSelected(event){
        setActiveEditionIndex(event.target.value)
        setActiveEdition(editions[event.target.value])
        relayCurrentPrices(editions[event.target.value])
    }

    if(!activeEdition){
        return (<div className='pricerow row'></div>)
    }

    return(
        <div className='pricerow row'>
            <div className='pricerow-line col-span-15'><hr className='pricerow_seperator'/></div>
            <div className='pricerow-card-container col-span-5'>
                <span className='pricerow-card-container-span lineitem'><img className='pricerow-card-container_image' alt={activeEdition['slug']/*.split('-').map(word => {
                    if(word.toLowerCase() == 'cur'){return 'CUR'}
                    if(word.toLowerCase() == 'csr'){return 'CSR'}
                    return word[0].toUpperCase() + word.slice(1).toLowerCase();
                }).join(' ')*/} src={`${process.env.REACT_APP_INDEX_IMAGE_BASE_URL}${activeEdition.slug}.jpg`}/></span>
                <span className='pricerow-card-container_name lineitem' >{cardMain['name']}</span>
            </div>
            <div className='pricerow-card-container col-span-3'>
                <select className='pricerow-card-container_foil' name='is_foil' onChange={(e)=>{setIsFoilViewing(e.target.value === "foil"); relayCurrentPrices(activeEdition)}} defaultValue={isFoilViewing ? "foil" : "nonfoil"}>
                    <option value="foil">Foil</option>
                    <option value="nonfoil">Nonfoil</option>
                </select>
            </div>
            <div className='pricerow-card-container col-span-3'>
                <select className='pricerow-card-container_edition' name='version_selected' onChange={(e) => {onEditionSelected(e)}} defaultValue={activeEditionIndex}>
                    {editions.map((edition, index) => {
                        return (<option value={index} key={index}>{edition.set_name}</option>)
                    })}
                </select>
            </div>
            <div className='pricerow-card-container_low col-span-2'>
            <span className='mobile-only'>TCG Lowest Price: </span>
                {isFoilViewing ?
            (activeEdition['tcg_low_foil'] ? activeEdition['tcg_low_foil'] : "Could not find TCGPlayer Low") : 
            (activeEdition['tcg_low_nonfoil'] ? activeEdition['tcg_low_nonfoil'] : "Could not find TCGPlayer Low")}</div>
            <div className='pricerow-card-container_market col-span-2'>
                <span className='mobile-only'>TCG Market Price: </span>
                {isFoilViewing ? 
                (activeEdition['tcg_market_foil'] ? activeEdition['tcg_market_foil'] : "Could not find TCGPlayer Market Price") : 
                (activeEdition['tcg_market_nonfoil'] ? activeEdition['tcg_market_nonfoil'] : "Could not find TCGPlayer Market Price")}</div>
        </div>
    )
}

export {PriceRow, findLowestPriceEdition}