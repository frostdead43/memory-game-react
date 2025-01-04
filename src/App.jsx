import { useState } from 'react'
import './App.css'
import "./reset.css"

const data = [
  { number: 1, id: crypto.randomUUID(), matched: false },
  { number: 2, id: crypto.randomUUID(), matched: false },
  { number: 3, id: crypto.randomUUID(), matched: false },
  { number: 4, id: crypto.randomUUID(), matched: false },
  { number: 5, id: crypto.randomUUID(), matched: false },
  { number: 6, id: crypto.randomUUID(), matched: false },
  { number: 7, id: crypto.randomUUID(), matched: false },
  { number: 8, id: crypto.randomUUID(), matched: false },
  { number: 1, id: crypto.randomUUID(), matched: false },
  { number: 2, id: crypto.randomUUID(), matched: false },
  { number: 3, id: crypto.randomUUID(), matched: false },
  { number: 4, id: crypto.randomUUID(), matched: false },
  { number: 5, id: crypto.randomUUID(), matched: false },
  { number: 6, id: crypto.randomUUID(), matched: false },
  { number: 7, id: crypto.randomUUID(), matched: false },
  { number: 8, id: crypto.randomUUID(), matched: false },
  
] 

data.sort(() => Math.random() - 0.5);

function Header() {
  return (
    <header className="header">
      <h1>memory</h1>
      <button>Menu</button>
    </header>
  );
}

function App() {
  const [dataState, setDataState] = useState(data)
  const [selectedCards, setSelectedCards] = useState([]);


  return (
    <div className="container">
      <Header />
      <Game data = {dataState} setData={setDataState} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />
    </div>
  )
}


function Game({data, setData, selectedCards, setSelectedCards}) {

  
  function handleClick(clickedCard) {
    console.log(clickedCard);
      if (selectedCards.length >= 2) {
        return
      }
      
    const newCard = {
      id: clickedCard.id,
      number: clickedCard.number,
    }

    const updatedCards = [...selectedCards,newCard];
    setSelectedCards(updatedCards);
    // console.log(updatedCards);
    // console.log(newCard);

    if (updatedCards.length === 2) {
      const [firstCard,secondCard] = updatedCards;
      if (firstCard.number === secondCard.number) {
        const updatedData = data.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id ? { ...card, matched: true }: card
        );
        setData(updatedData);
        setSelectedCards([]);
        console.log(updatedCards)
        console.log(!updatedCards);
      }else {
       setTimeout(() => {
        setSelectedCards([]);
       }, 1000);
      }
    }
  }

  const items = data.map((x) => <div className={`circles ${selectedCards.some(card => card.id === x.id) ? 'selected' : ''} ${x.matched ? 'matched': ''}`} onClick={() => handleClick(x)}key={x.id}>{x.number}</div>)

  return(
  <div className='game-area'>
    {items}
  </div>
  )

}


export default App


// const items = data.map((x) => <div className='circles' onClick={() => handleClick(x)} key={x.id}>{x.number}</div>)
