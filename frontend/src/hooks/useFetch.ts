import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from '../types';

interface UseFetchOptions {
  immediate?: boolean;
  dependencies?: any[];
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setData: (data: T | null) => void;
}

export const useFetch = <T>(
  fetchFunction: () => Promise<ApiResponse<T>>,
  options: UseFetchOptions = {}
): UseFetchResult<T> => {
  const { immediate = true, dependencies = [] } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchFunction();
      
      if (response.success && response.data !== undefined) {
        setData(response.data);
      } else {
        setError(response.error || 'Failed to fetch data');
        setData(null);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData, ...dependencies]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    setData,
  };
};

export default useFetch;