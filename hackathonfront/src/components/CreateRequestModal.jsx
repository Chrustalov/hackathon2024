import React, { useCallback, useEffect, useRef, useState } from "react";
import TomSelect from "tom-select";

function CreateRequestModal({
  isOpen = false,
  onClose,
  onSubmit,
  request,
  setRequest,
  tags,
}) {
  

  const onChangeTitle = useCallback(
    (e) => {
      setRequest({ ...request, title: e.target.value });
    },
    [request]
  );
  const onChangeDescription = useCallback(
    (e) => {
      setRequest({ ...request, body: e.target.value });
    },
    [request]
  );
  const onTagsChange = useCallback(
    (tags) => {
      setRequest({ ...request, tags });
    },
    [request, tags]
  );

  const onSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit({
      ...request,
      tags: tags
        .filter((tag) => !!request.tags.find((name) => tag.name === name))
        .map((tag) => tag.id),
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal d-block end-0 bottom-0 overflow-hidden "
      tabindex="-1"
      aria-labelledby="createRequestModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog h-100">
        <div className="modal-content " style={{ marginTop: "20%" }}>
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-center">Create request</h1>
          </div>

          <div className="modal-body">
            <form action="" id="create-request">
              <div className="row">
                <div className="col-sm-3">
                  <label htmlFor="title" className="mb-0">
                    Title:
                  </label>
                </div>
                <div className="col-sm-9">
                  <input
                    className="mb-0 bg-transparent w-100 text-truncate border-black rounded"
                    type="text"
                    value={request.title}
                    onChange={onChangeTitle}
                    required
                    id="title"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-3">
                  <label htmlFor="description" className="mb-0">
                    Description:
                  </label>
                </div>
                <div className="col-sm-9">
                  <textarea
                    className="mb-0 bg-transparent w-100 text-truncate border-black rounded "
                    type="text"
                    value={request.body}
                    onChange={onChangeDescription}
                    required
                    rows={4}
                    id="description"
                  ></textarea>
                </div>
              </div>
              <RequestFilter
                initialTags={request.tags}
                onClick={onTagsChange}
                All_tags={tags}
              />
            </form>
          </div>

          <div className="modal-footer d-flex gap-2 ">
            <button
              type="button"
              className="btn btn-outline-dark flex-grow-1"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              form="create-request"
              className="btn btn-outline-dark flex-grow-1 "
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestFilter({ initialTags = [], onClick, All_tags = [] }) {
  const [tags, setTags] = useState(initialTags);

  const selectRef = useRef(null);

  useEffect(() => {
    const selectEl = selectRef.current;
    const select = new TomSelect(selectEl, {
      plugins: ["remove_button"],
      valueField: "value",
      labelField: "label",
      options: All_tags.map((tag) => ({ value: tag.name, label: tag.name })),
      onChange: (values) => {
        console.log(values);
        onClick(values);
      },
      closeAfterSelect: true,
    });

    select.on("dropdown:show", () => {
      setTimeout(() => selectRef.current.focus(), 0);
    });

    return () => {
      select.destroy();
    };
  }, [selectRef, All_tags]);

  return (
    <div className="row mt-3">
      <div className="col-sm-3">
        <label htmlFor="description" className="mb-0">
          Tags:
        </label>
      </div>
      <div className="col-sm-9">
        <select
          className="form-select form-select-sm"
          multiple
          style={{ display: "none" }}
          ref={selectRef}
        ></select>
      </div>
    </div>
  );
}

export default CreateRequestModal;
