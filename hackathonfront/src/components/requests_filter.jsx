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
      // Set focus to the element after dropdown is shown
      setTimeout(() => selectRef.current.focus(), 0);
    });

    return () => {
      select.destroy();
    };
  }, []);

  async function handleClick() {
    // Update tags before invoking onTagClick
    setTags(tags);
    await onTagClick(tags);
  }

  return (
      <div>
        <label htmlFor="tags">Оберіть теги:</label>
        <select id="tags" className="form-select form-select-sm" multiple ref={selectRef} />
        <button className="btn btn-outline-dark mt-4" onClick={handleClick}>Застосувати фільтр</button>
      </div>
  );
}

export default RequestFilter;
