import './App.css';
import { useState, useEffect } from 'react';
import rogueimg from './img/rogue_2.png'
import heroimg from './img/hero.png'
import vigimg from './img/vig.png'
import vilimg from './img/villain.png'
import { Progress, getShoppingList, renderShoppingList } from './progress'
import Modal from './Modal'

const moralityMerit = 'ALIGNMENT';
const rewardMerits = 'MERITS';
const astralMerit = 'ASTRAL';
const incarnateThreads = 'THREADS';
const hero = 'hero';
const villain = 'villain';
const vig = 'vigilante';
const rogue = 'rogue';

function App({ characterStore }) {
  //localStorage.setItem('characters', JSON.stringify([]));
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

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
      setModalOpen(false);
  };
  const handleModalOpen = () => {
      setModalOpen(true);
  };
  
  return (
    <div className="App">
      <div className="panel-body">
          {characters.map( c => 
            <>
              <div align="left">
                <button type="button" class="btn" onClick={() => {c.show=!c.show; setCharacters([...characters]);}}>
                  {c.show &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                  }
                  {!c.show &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                    </svg>
                  }
                </button>
                {c.name}
                <button type="button" class="btn" onClick={ handleModalOpen }>
                  Generate Shopping List
                </button>
                <Modal isOpen={modalOpen} onClose={ handleModalClose }>
                  {modalOpen && renderShoppingList(getShoppingList(c.progress))}
                </Modal>
              </div>
              {c.show && 
              <table className="table table-bordered table-responsive">
                <thead>
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
              }
            </>
          )}
          <input
            value={charName}
            onChange={c => setCharName(c.target.value)}
          />
          <button onClick={() => {
            setCharacters([
              ...characters,
              { name: charName, progress: new Progress(), show: true }
            ]);
          }}>Add Character</button>
      </div>
    </div>
  );
}

export default App;
