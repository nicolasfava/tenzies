import React from "react"
import Dado from "./components/Dado"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

/*
  1) populo lo state dadi con numeri random da 1 a 6
  2) implemento funzione che alla premuto del dado
     quest'ultimo si colori di verde e si freeze
  3) implemento il bottone tira dadi che cambia il numero
     dei dadi che non sono premuti
  4) implemento un controllo per verificare quando
     il giocatore ha vinto
*/


  //creo lo state dadi che verrà inizializzato attraverso la funzione nuoviDadi
  const [dadi, setDadi] = React.useState(generatoreDadi())

  //creo lo state tenzies che mi servirà a capire quando il gioco è terminato
  const [tenzies, setTenzies] = React.useState(false)

  //funzione per generare nuovi dadi
    //so che i dadi saranno 10 quindi provvedo a creare un'arrey
    //lo riempio con 10 numeri random da 1 a 6
    //e lo ritorno
  function generatoreDadi() {
    const randomDado = []
    for (let i=0; i<10; i++) {
      randomDado.push({
        id: nanoid(),
        value: Math.ceil(Math.random()*6),
        isHeld: false
        
      })
    }
    return randomDado
  }
  console.log(dadi)


  //creo funzione per cambiare il valore di isHeld
  //ogniqual'volta il dado venga premuto
  //la funzione riceve come paramentro l'id
  //del dado premuto
    //controlla tutti i dadi per vedere quale ha l'id 
    //uguale a quello ricevuto come paramentro
    //quando lo incontra al suo posto pone un nuovo oggetto
    //con i valori uguali a quello precendente a parte
    //per il valore di isHeld che lo pone opposto
  function held(id) {
    setDadi(vecchiDadi => vecchiDadi.map(dado => {
      return dado.id === id ? {...dado, isHeld: !dado.isHeld} : dado
    }))
  } 


  //creo la funzione tiraDadi() per permettere di cambiare
  //il valore dei dadi che non sono premuti
    //cicliamo lo state dadi per verificare se isHeld sia true o false
  function tiraDadi() {
    if(!tenzies) {
      setDadi(vecchiDadi => vecchiDadi.map(dado => {
        return dado.isHeld ? dado : {...dado, 
          id: nanoid(),
          value: Math.ceil(Math.random()*6)}
        }))
    }
    else {
      setTenzies(false)
      setDadi(generatoreDadi())
    }
    
  }


  //creo uno useEffect che controlla se tutti gli elementi di dadi
  //sono premuti e hanno lo stesso valore
  //poniamo a questo useEffect come dipendenza lo state dadi
  //quindi ad ogni modifica di dadi questo useEffect parte
    //per farlo utilizzo il metodo every()
    //Se le due consizioni sono vere allora cambiamo
    //il valore dello state tenzies in true
  React.useEffect(() => {
    const allHeld = dadi.every(dado => dado.isHeld)
    const primoDado = dadi[0].value
    const allEquals = dadi.every(dado => dado.value === primoDado)

    if(allEquals && allHeld) {
      setTenzies(true)
      console.log("Hai vinto!")
    }
  }, dadi)

  //provvedo a generare un'arrey mappando i valori dello state dadi
  //per generare per ogni elemento un componente <Dado />
  const elementoDado = dadi.map(dado => <Dado key={dado.id} value={dado.value} isHeld={dado.isHeld} held={() => held(dado.id)}/>)

  return(
    <main className="wrapp-tenzies">
      {tenzies && <Confetti />}
      <div className="tenzies-regole">
        <h1>
          Tenzies
        </h1>
        <p>
          Tira finchè tutti i dadi solo uguali. Clicca su un dato per bloccarlo al suo valore attuale
        </p>
      </div>
      <div className="tenzies-campo-gioco">
         {elementoDado}
      </div>
      <button className="tenzies-tira-dato" onClick={tiraDadi}>
          {tenzies ? "Nuova partita" : "Tira i dadi"}
      </button>
    </main>
  )
}