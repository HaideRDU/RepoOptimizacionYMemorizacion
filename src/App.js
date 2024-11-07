import React from 'react';
import { useState, useMemo, useCallback } from 'react';

function App() {
  const [numbers, setNumbers] = useState([5, 10, 3, 8, 13, 21, 2, 7]);

  const generateNumbers = useCallback(() => {
    const newNumbers = Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 1);
    setNumbers(newNumbers);
  }, []);

  const NumbersDisplay = React.memo(({ numbers }) => {
    console.log('Rendering NumbersDisplay');
    return (
      <div>
        <h2>Números</h2>
        <ul>
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
    );
  });

  const CombinationsDisplay = React.memo(({ numbers }) => {
    console.log('Rendering CombinationsDisplay');
    const combinations = useMemo(() => findCombinations(numbers, 21), [numbers]);
  
    return (
      <div>
        <h2>Combinaciones</h2>
        <ul>
          {combinations.map((combo, index) => (
            <li key={index}>{combo.join(' + ')}</li>
          ))}
        </ul>
      </div>
    );
  });
  
  function findCombinations(numbers, targetSum) {
    console.log('Calculando...');
    let result = new Set();
    
    function findSubsetSum(arr, subset = [], index = 0, sum = 0) {
      if (sum === targetSum && subset.length > 0) {
        result.add(subset.slice().sort((a, b) => a - b).join('+'));
      }

      if (index >= arr.length || sum > targetSum) return;

      subset.push(arr[index]);
      findSubsetSum(arr, subset, index + 1, sum + arr[index]);
      subset.pop();
      findSubsetSum(arr, subset, index + 1, sum);
    }
    findSubsetSum(numbers);
    return Array.from(result).map(combo => combo.split('+').map(Number));
  }

  return (
    <div>
      <h1>Combinaciones que suman 21</h1>
      <NumbersDisplay numbers={numbers} />
      <CombinationsDisplay numbers={numbers} />
      <button onClick={generateNumbers}>Generar nuevos números</button>
    </div>
  );
}

export default App;
