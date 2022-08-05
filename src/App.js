import "./App.css";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState([]);

  const debounce = (func, timer) => {
    let timeId = null;
    return (...args) => {
      if (timeId) clearTimeout(timeId);
      timeId = setTimeout(() => func(...args), timer);
    };
  };

  const handleChange = e => {
    const { value } = e.target;
    fetch(` https://demo.dataverse.org/api/search?q=${value}`)
      .then(res => res.json())
      .then(json => setSearch(json.data.items));
  };

  const debouncedHandleChange = debounce(handleChange, 500);

  return (
    <div className='App'>
      <h1>Hello Ninja</h1>
      <input
        type='text'
        name='search'
        placeholder='search...'
        onChange={debouncedHandleChange}
      />
      {search?.length > 0 && (
        <div>
          {search?.map((el, i) => (
            <div key={i}>
              <span>{el.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
