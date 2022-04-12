import { createStore } from '../helpers/createStore.js';
import { mapMovie } from '../helpers/mapMovie.js';

export const createModel = () =>
  createStore(
    {
      count: 0,
      results: [],
      error: false,
      searches: [
        'Star Wars',
        'X-men',
        'The Lord of the Rings',
        'Matrix',
        'Terminator'
      ],
    },
    (store) => ({
      search: async (currentState, searchTerm) => {
        store.setState({
          count: 0,
          results: [],
          error: false,
          searches: [searchTerm].concat(
            currentState.searches.filter((term) => term !== searchTerm)
          ),
        });

        try {
          const data = await fetch(
            `http://www.omdbapi.com/?type=movie&apikey=920b7274&s=${searchTerm}`
          ).then((r) => r.json());

          if (data.Response === 'True') {  
            return { 
              count: data.totalResults,
              results: data.Search.map(mapMovie)}   
          } else {
            return {
              error: data.Error 
            }
          }
        } catch (error) {
          return { error };
        }
      },
      removeTag: (currentState, searchTerm) => {
        return {
          searches: currentState.searches.filter((term) => term !== searchTerm),
        };
      },
    })
  );
