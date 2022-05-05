import React from 'react';

export const LoadingIndicator = ({ isLoading }) => {
  return isLoading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <div style={{ color: 'var(--shade4)', fontWeight: 700, fontSize: '2.5rem' }}>
        Fetching Products...
      </div>
    </div>
  ) : null;
};
