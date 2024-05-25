// src/components/TrackRepair.js
import React, { useState } from 'react';
import axios from 'axios';

const TrackRepair = () => {
  const [repairId, setRepairId] = useState('');
  const [repairStatus, setRepairStatus] = useState(null);
  const [error, setError] = useState('');

  const trackRepair = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/repairs/${repairId}`);
      setRepairStatus(response.data);
      setError('');
    } catch (error) {
      setError('Reparación no encontrada. Por favor, verifique el ID.');
      setRepairStatus(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Seguimiento de Reparaciones</h1>
      <input
        type="text"
        placeholder="Ingrese el ID de Reparación"
        value={repairId}
        onChange={(e) => setRepairId(e.target.value)}
        style={styles.input}
      />
      <button onClick={trackRepair} style={styles.button}>Rastrear Reparación</button>
      {error && <p style={styles.error}>{error}</p>}
      {repairStatus && (
        <div style={styles.statusContainer}>
          <p>Nombre del Cliente: {repairStatus.customerName}</p>
          <p>Dispositivo: {repairStatus.device}</p>
          <p>Problema: {repairStatus.issue}</p>
          <p>Estado: {repairStatus.status}</p>
          <p>Actualizado en: {new Date(repairStatus.updatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#fff',
  },
  input: {
    height: '40px',
    borderColor: 'gray',
    borderWidth: '1px',
    marginBottom: '16px',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  statusContainer: {
    marginTop: '16px',
    padding: '16px',
    borderColor: 'gray',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  error: {
    color: 'red',
    marginTop: '16px',
  },
};

export default TrackRepair;
