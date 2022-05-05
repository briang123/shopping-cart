import { useEffect, useReducer } from 'react';

const fetchReducer = (state, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case 'IDLE': {
      return { ...state, status: 'IDLE' };
    }
    case 'PENDING': {
      return { ...state, status: 'PENDING' };
    }
    case 'SUCCESS': {
      return { ...state, results: payload, status: 'resolved' };
    }
    case 'ERROR': {
      return { ...state, results: payload, error, status: 'rejected' };
    }
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

export default function useFetch(url) {
  const [{ results, status }, dispatch] = useReducer(fetchReducer, {
    results: null,
    status: 'IDLE',
    endpoint: url,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetch(url);
        const json = await result.json();
        dispatch({ type: 'SUCCESS', payload: json });
      } catch (error) {
        dispatch({ type: 'ERROR', error, payload: [] });
      }
    };
    getData();
  }, [url]);

  const isLoading = ['IDLE', 'PENDING'].includes(status);
  return { results, isLoading, status };
}
