import React, { useState } from 'react';
import './ColorConverter.css'

const hexToRgb = (hex: string): string | null => {
  
  // Удаляем решётку, если она есть
  hex = hex.replace(/^#/, '');

  // Проверяем валидность HEX-кода
  if (hex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return null;
  }

  // Преобразуем HEX в RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
};

export const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [rgb, setRgb] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);

    // Ждём полного ввода (7 символов включая #)
    if (value.length === 7) {
      const rgbValue = hexToRgb(value);
      if (rgbValue) {
        setRgb(rgbValue);
        setError(null);
      } else {
        setRgb(null);
        setError('Ошибка!');
      }
    } else {
      setRgb(null);
      setError(null);
    }
  };

  return (
    <div className='block' style={{ backgroundColor: rgb ?? '#FFFFFF' }}>
      <input
      className='block-input'
        type="text"
        value={hex}
        onChange={handleChange}
        placeholder="#000000"
        maxLength={7}
      />
      {error && <div className='block-info'>{error}</div>}
      {rgb && <div className='block-info'>{rgb}</div>}
    </div>
  );
};

