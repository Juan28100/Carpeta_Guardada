import React from 'react';

export const NumericInput = ({ value, onChange, min = 1, max, onInvalidInput }) => {
  const handleKeyDown = (e) => {
    if (['e', 'E', '+', '-', '.', ','].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
      if (onInvalidInput) onInvalidInput("Solo se permiten números enteros positivos.");
    }
  };

  const handleChange = (e) => {
    const valStr = e.target.value;
    if (valStr === '') {
      onChange('');
      return;
    }

    let val = parseInt(valStr, 10);
    if (isNaN(val) || val < 1) {
      val = 1;
    }

    if (max && val > max) {
      val = max;
      if (onInvalidInput) onInvalidInput("Este es el máximo de producto disponible en stock");
    }

    onChange(val);
  };

  return (
    <input
      type="number"
      min={min}
      max={max}
      value={value}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onChange={handleChange}
      onWheel={(e) => e.target.blur()}
      style={{ width: '60px', textAlign: 'center', padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
  );
};