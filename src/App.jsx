import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [catFact, setCatFact] = useState('');
  const [catImageUrl, setCatImageUrl] = useState('');

   useEffect (() => { // define un efecto que se ejecuta cuando elcomponente se ha renderizado
    const fetchCatFact = async() => {
        try {
          const response = await fetch('http://catfact.ninja/fact');
          const data = await response.json();
          setCatFact(data.fact);
        } catch (error){
          console.error(error);
        }
    };

    fetchCatFact();
  },[]); //array vacio: el efecto  se ejecutara solamente una vez, cuando elcomando 

  useEffect(() => {  /*Definir un segundo efecto de texto se ejecuta cada vez que cambia*/

    if(catFact){   //si catFact no esta vacio
      const generateCatImage = async() => {
       try{
        const firstWord = catFact.split('  ', 3).join ('  ');
        const response = await fetch(`https://cataas.com/cat/says/${firstWord}`) ;  //comillas con alt+96
        if(response.ok){
          const data = await response.blob();
          const imageUrl = URL.createObjectURL(data);
          setCatImageUrl(imageUrl);
        }else{
            console.error('Error fecthing cat image:  ', response.statusText);
        }
        }catch(error){
         console.error(error);
        }
       };
       generateCatImage();
      }

    },[catFact]);  //el efecto se ejecuta cada vez que catFact cambie

    return(
      <>
      <h1>Random Cat Fact</h1>
      {catFact && <p> {catFact}  </p>}
      {catImageUrl && (<img src={catImageUrl} alt ="random cat" width={350} height={350} />)}
      {catImageUrl && <p> Image generated based on the first word of the fact. </p>}
      </>
    );
  }
  
export default App
