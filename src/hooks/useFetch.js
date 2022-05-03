import { useEffect, useState, useReducer } from 'react';

const fetchReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'idle': {
      return { ...state, status: 'idle' };
    }
    case 'pending': {
      return { ...state, status: 'pending' };
    }
    case 'success': {
      return { ...state, results: payload, status: 'resolved' };
    }
    case 'error': {
      return { ...state, results: payload, status: 'rejected' };
    }
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};
export default function useFetch(url) {
  // const [data, setData] = useState([]);
  const [{ results, status }, dispatch] = useReducer(fetchReducer, {
    results: null,
    status: 'idle',
    endpoint: url,
  });

  useEffect(() => {
    const getData = async () => {
      const result = await fetch(url);
      const json = await result.json();
      dispatch({ type: 'success', payload: json });
      //setData(json);
    };
    getData();
  }, [url]);

  const isLoading = ['idle', 'pending'].includes(status);
  return { results, isLoading, status };
}
