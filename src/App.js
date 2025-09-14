import './App.css';
import { useState, useEffect } from 'react';
import rogueimg from './img/rogue_2.png'
import heroimg from './img/hero.png'
import vigimg from './img/vig.png'
import vilimg from './img/villain.png'
import { Progress } from './progress'

const moralityMerit = 'ALIGNMENT';
const rewardMerits = 'MERITS';
const astralMerit = 'ASTRAL';
const incarnateThreads = 'THREADS';
const hero = 'hero';
const villain = 'villain';
const vig = 'vigilante';
const rogue = 'rogue';

function App({ characterStore }) {
  localStorage.setItem('characters', JSON.stringify([]));
  const [characters, setCharacters] = useState(() => {
    const json = localStorage.getItem('characters');
    const savedCharacters = JSON.parse(json);
    if (savedCharacters) {
      return savedCharacters;
    }
    else return [];
  });

  useEffect(() => {
    const json = JSON.stringify(characters);
    localStorage.setItem('characters', json);
  }, [characters]);
  
  const [charName, setCharName] = useState('');

  const [progress, setProgress] = useState(() => {
    const json = localStorage.getItem('progress');
    const storedProgress = JSON.parse(json);
    if (storedProgress) {
      return storedProgress;
    }
    else return [];
  });

  useEffect(() => {
    const json = JSON.stringify(progress);
    localStorage.setItem('progress', json);
  }, [progress]);

  return (
    <div className="App">
      <header className="App-header">
        <center>
          {characters.map( c => 
            <table class="table table-bordered">
              <thead>
                <tr><center>{c.name}</center></tr>
                <tr>
                  <th scope="col" align="center">Invention Type</th>
                  <th scope="col" class="text-center" colSpan="2">Level 10</th>
                  <th scope="col" class="text-center" colSpan="2">Level 15</th>
                  <th scope="col" class="text-center" colSpan="2">Level 20</th>
                  <th scope="col" class="text-center" colSpan="2">Level 25</th>
                  <th scope="col" class="text-center" colSpan="2">Level 30</th>
                  <th scope="col" class="text-center" colSpan="2">Level 35</th>
                  <th scope="col" class="text-center" colSpan="2">Level 40</th>
                  <th scope="col" class="text-center" colSpan="2">Level 45</th>
                  <th scope="col" class="text-center" colSpan="2">Level 50</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(c.progress.Badges).map( badge => (
                  <tr scope="row" key={c.name + badge}>
                    <td>{badge}</td>
                    
                    {Object.keys(c.progress.Badges[badge]).map( level => (
                      <>
                      <td>
                        <div>
                          <label class="form-label" for="typeNumber">Crafted
                          <input type="number" id="typeNumber" class="form-control"
                           value={c.progress.Badges[badge][level]["crafted"]}
                            onChange={(e) => {c.progress.Badges[badge][level]["crafted"] = e.target.value; setCharacters([...characters]);}}/>
                          </label>
                        </div>
                      </td>
                      <td>Needed: {c.progress.Badges[badge][level]["total_needed"] - c.progress.Badges[badge][level]["crafted"]}</td>
                      </>
                    ))}
                  </tr>
                  ))
                }
              </tbody>
            </table>
          )}
          <input
            value={charName}
            onChange={c => setCharName(c.target.value)}
          />
          <button onClick={() => {
            setCharacters([
              ...characters,
              { name: charName, progress: new Progress() }
             ]);
          }}>Add Character</button>
        </center>
      </header>
    </div>
  );
}

export default App;
