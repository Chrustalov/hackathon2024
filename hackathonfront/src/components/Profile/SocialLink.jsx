import React, { useCallback, useEffect, useState } from "react";
import { getIcon } from "../icons";

function SocialLink({ link, onEditLink, onRemoveLink, isNew = false}) {
  
  const [copyLink, setCopyLink] = useState(link);
  const [isEditing, setIsEditing] = useState(false);
  
  const onChange = useCallback((e) => {
    setCopyLink(e.target.value);
  }, []);

  const onEnter = useCallback((e) => {
    if (e.key === "Enter" || e.key === "Escape" || e.key === "Tab") {
      setIsEditing(false);
      if (copyLink === "") {
        onRemoveLink();
      } else {
        onEditLink(e.target.value);
      }
    }
  }, [copyLink]);

  const onDoubleClick = useCallback(() => {
    console.log("onDoubleClick");
    setIsEditing(true);
  }, []);

  useEffect(() => {
    if (isNew) {
      setIsEditing(true);
    }
  }, [isNew]);

  return (
    <li
      onDoubleClick={onDoubleClick}
      className="list-group-item d-flex justify-content-between align-items-center p-3"
    >
      {getIcon(link)}
      <input
        className="mb-0 bg-transparent w-75 text-truncate  border-black"
        style={{ outline : "0",borderWidth: isEditing ? " 0 0 2px" : "0" }}
        type="text"
        disabled={!isEditing}
        value={copyLink}
        onChange={onChange}
        onKeyDown={onEnter}
      />
    </li>
  );
}

export default SocialLink;
