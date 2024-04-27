import React, { useState, useEffect, useRef } from 'react';
import TomSelect from 'tom-select';

function RequestFilter({ initialTags, onTagClick, All_tags }) {
  const [tags, setTags] = useState(initialTags || []);
  
  const selectRef = useRef(null);

  useEffect(() => {
    const selectEl = selectRef.current;
    const select = new TomSelect(selectEl, {
      plugins: ['remove_button'],
      valueField: 'value',
      labelField: 'label',
      options: All_tags.map(tag => ({ value: tag, label: tag })),
      onChange: (values) => {
        setTags(values);
      },
      closeAfterSelect: true 
    });

    select.on('dropdown:show', () => {
      // Встановлення фокусу на елементі після відкриття дропдауну
      setTimeout(() => selectRef.current.focus(), 0);
    });

    return () => {
      select.destroy();
    };
  }, []);
  async function handleClick() {
    setTags(tags); // Оновлення тегів перед викликом
    await onTagClick(tags); // Виклик фільтрації після оновлення тегів
  };
  

  return (
    <div>
      <label htmlFor="tags">Оберіть теги:</label>
      <select id="tags" multiple ref={selectRef} />
      <div>
        Вибрані теги: {tags.join(', ')}
      </div>
      <button onClick={handleClick}>Застосувати фільтр</button>
    </div>
  );
}

export default RequestFilter;
