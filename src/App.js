import './App.css';
import Autocomplete from './components/Autocomplete';
function App() {
  const url ='https://pokeapi.co/api/v2/pokemon?limit=100&offset=200'
  let pokeArray = []
  async function pokemonData (){
    const resp = await fetch (url); //Here, you fetch the url
    const data = await resp.json(); //The data is converted to json
    data.results.forEach(element => {
      pokeArray.push(element.name)
    });
};
pokemonData();
  return (
   <div className='wrapper'>
     <h1>React Autocomplete component in ES6</h1>
      <Autocomplete options={pokeArray} />
   </div>
  );
}

export default App;
