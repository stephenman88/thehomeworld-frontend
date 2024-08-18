import './PriceRow.scss';
import {useRef, useEffect, useState} from 'react';

export default function PriceRow({isColumnTitle, card, setLowPriceState, setMarketPriceState, identity}){
    const [cardMain, setCardMain] = useState({'name': ''})
    const [editions, setEditions] = useState([])
    const [activeEdition, setActiveEdition] = useState(null)
    const [activeEditionIndex, setActiveEditionIndex] = useState(null)
    const [isFoilViewing, setIsFoilViewing] = useState(false)

    useEffect(() => {
        if(card && !isColumnTitle && !activeEdition){
            setEditions(card['editions']);
            let lowestPriceCard = null;
            card['editions'].forEach((edition, index) => {
                console.log(Object.keys(edition))
                console.log(Object.values(edition))
                if(!lowestPriceCard){
                    lowestPriceCard = {
                        'edition': edition,
                        'index': index,
                        'isFoilCheaper': false,
                        'price': null,
                        'market_price': null
                    }
                    if(edition['tcg_low_foil'] && edition['tcg_low_nonfoil']){
                        if(edition['tcg_low_nonfoil'] > edition['tcg_low_foil']){
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
                        if(edition['tcg_low_nonfoil'] > edition['tcg_low_foil']){
                            if (lowestPriceCard['price'] && lowestPriceCard['price'] > edition['tcg_low_nonfoil']){
                                lowestPriceCard['card'] = edition;
                                lowestPriceCard['index'] = index;
                                lowestPriceCard['isFoilCheaper'] = false
                                lowestPriceCard['price'] = edition['tcg_low_nonfoil']
                                lowestPriceCard['market_price'] = edition['tcg_market_nonfoil']
                            }
                        }else{
                            if (lowestPriceCard['price'] && lowestPriceCard['price'] > edition['tcg_low_foil']){
                                lowestPriceCard['card'] = edition;
                                lowestPriceCard['index'] = index;
                                lowestPriceCard['isFoilCheaper'] = true
                                lowestPriceCard['price'] = edition['tcg_low_foil']
                                lowestPriceCard['market_price'] = edition['tcg_market_foil']
                            }
                        }
                    }else if(edition['tcg_low_foil']){
                        if (lowestPriceCard['price'] && lowestPriceCard['price'] > edition['tcg_low_foil']){
                            lowestPriceCard['card'] = edition;
                            lowestPriceCard['index'] = index;
                            lowestPriceCard['isFoilCheaper'] = true
                            lowestPriceCard['price'] = edition['tcg_low_foil']
                            lowestPriceCard['market_price'] = edition['tcg_market_foil']
                        }
                    }else if (edition['tcg_low_nonfoil']){
                        if (lowestPriceCard['price'] && lowestPriceCard['price'] > edition['tcg_low_nonfoil']){
                            lowestPriceCard['card'] = edition;
                            lowestPriceCard['index'] = index;
                            lowestPriceCard['isFoilCheaper'] = false
                            lowestPriceCard['price'] = edition['tcg_low_nonfoil']
                            lowestPriceCard['market_price'] = edition['tcg_market_nonfoil']
                        }
                    }
                }
            });

            setCardMain({
                'name': card['name']
            })
            setActiveEditionIndex(lowestPriceCard['index'])
            setActiveEdition(lowestPriceCard['edition']);
            setIsFoilViewing(lowestPriceCard['isFoilCheaper']);
            setLowPriceState({
                'identity': identity,
                'price': lowestPriceCard['price']
            });
            setMarketPriceState(setMarketPriceState({
                'identity': identity,
                'price': lowestPriceCard['market_price']
            }));
        }
    })

    useEffect((isFoilViewing) => {
        if(isColumnTitle){return}

        if(activeEdition)
            {if(isFoilViewing){
                if(activeEdition['tcg_low_foil'] )
                    {setLowPriceState({
                        'identity': identity,
                        'price': activeEdition['tcg_low_foil']
                    })}
                if(activeEdition['tcg_market_foil'] )
                    {setMarketPriceState({
                        'identity': identity,
                        'price': activeEdition['tcg_market_foil']
                    })}
            }else{
                if(activeEdition['tcg_low_nonfoil'] )
                    {setLowPriceState({
                        'identity': identity,
                        'price': activeEdition['tcg_low_nonfoil']
                    })}
                if(activeEdition['tcg_market_nonfoil'] )
                    {setMarketPriceState({
                        'identity': identity,
                        'price': activeEdition['tcg_market_nonfoil']
                    })}
            }}
    })

    useEffect((activeEdition) => {
        if(isColumnTitle){return}
        if(activeEdition){
            if(isFoilViewing){
                if(activeEdition['tcg_low_foil'] )
                    {setLowPriceState({
                        'identity': identity,
                        'price': activeEdition['tcg_low_foil']
                    })}
                if(activeEdition['tcg_market_foil'] )
                    {setMarketPriceState({
                        'identity': identity,
                        'price': activeEdition['tcg_market_foil']
                    })}
            }else{
                if(activeEdition['tcg_low_nonfoil'] )
                    {setLowPriceState({
                        'identity': identity,
                        'price': activeEdition['tcg_low_nonfoil']
                    })}
                if(activeEdition['tcg_market_nonfoil'] )
                    {setMarketPriceState({
                        'identity': identity,
                        'price': activeEdition['tcg_market_nonfoil']
                    })}
            }
        }
    })

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

    function onFoilViewingSelect(event){
        setIsFoilViewing(event.target.value)
    }

    function onEditionSelected(event){
        setActiveEditionIndex(event.target.value)
        setActiveEdition(editions[event.target.value])
    }

    if(!activeEdition){
        return (<div className='pricerow row'></div>)
    }

    return(
        <div className='pricerow row'>
            <div className='col-span-15'><hr className='pricerow_seperator'/></div>
            <div className='col-span-5'>
                <span className='lineitem'><img alt={activeEdition['slug']/*.split('-').map(word => {
                    if(word.toLowerCase() == 'cur'){return 'CUR'}
                    if(word.toLowerCase() == 'csr'){return 'CSR'}
                    return word[0].toUpperCase() + word.slice(1).toLowerCase();
                }).join(' ')*/} src={`${process.env.REACT_APP_INDEX_IMAGE_BASE_URL + activeEdition.slug}.jpg`}/></span>
                <span className='lineitem'>{cardMain['name']}</span>
            </div>
            <div className='col-span-3'>
                <select name='is_foil' onChange={onFoilViewingSelect}>
                    <option value={true}>Foil</option>
                    <option value={false}>Nonfoil</option>
                </select>
            </div>
            <div className='col-span-3'>
                <select name='version_selected' onChange={onEditionSelected}>
                    {editions.map((edition, index) => {
                        if(index === activeEditionIndex){
                            return (<option value={index} selected>{edition.set_name}</option>)
                        }
                        return (<option value={index}>{edition.set_name}</option>)
                    })}
                </select>
            </div>
            <div className='col-span-2'>{isFoilViewing ? 
                (activeEdition['tcg_low_foil'] ? activeEdition['tcg_low_foil'] : "Could not find TCGPlayer Low") : 
                (activeEdition['tcg_low_nonfoil'] ? activeEdition['tcg_low_nonfoil'] : "Could not find TCGPlayer Low")}</div>
            <div className='col-span-2'>{isFoilViewing ? 
                (activeEdition['tcg_market_foil'] ? activeEdition['tcg_market_foil'] : "Could not find TCGPlayer Market Price") : 
                (activeEdition['tcg_market_nonfoil'] ? activeEdition['tcg_market_nonfoil'] : "Could not find TCGPlayer Market Price")}</div>
        </div>
    )
}