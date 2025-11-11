import { useMemo } from 'react';
import { DataProviderFactory } from '../providers';

/**
 * Custom hook to access the data provider
 * Returns a memoized instance of the current data provider
 */
export const useDataProvider = () => {
  const dataProvider = useMemo(() => DataProviderFactory.getProvider(), []);
  return dataProvider;
};
