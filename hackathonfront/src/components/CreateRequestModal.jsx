import React, { useCallback, useEffect, useRef, useState } from "react";
import TomSelect from "tom-select";
import DropFoto from "./DropFoto";

function CreateRequestModal({
  isOpen = false,
  onClose,
  onSubmit,
  request,
  setRequest,
  tags,
}) {
  const contentRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onClose();
    }
  };

  const onChangeTitle = useCallback(
    (e) => {
      console.log("change title", request);
      return setRequest({ ...request, title: e.target.value });
    },
    [request, setRequest]
  );
  const onChangeDescription = useCallback(
    (e) => {
      console.log("change description", request);
      return setRequest({ ...request, body: e.target.value });
    },
    [request, setRequest]
  );
  const onTagsChange = useCallback(
    (tags) => {
      console.log(tags, request, "tags request");
      setRequest({ ...request, tags: tags });
    },
    [request, setRequest]
  );

  const onPhotoChange = useCallback(
    (photo) => {
      console.log("change photo", request);
      setRequest({ ...request, photo: photo });
    },
    [request, setRequest]
  );

  const onSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = document.getElementById("create-request");
    if (form.checkValidity()) {
      onSubmit({
        ...request,
        tag_ids: tags
          .filter((tag) => !!request?.tags?.find((name) => tag.name === name))
          .map((tag) => tag.id),
      });
    } else {
      form.reportValidity();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal d-block end-0 bottom-0"
      aria-labelledby="createRequestModalLabel"
      aria-hidden="true"
      onClick={handleOutsideClick}
    >
      <div className="modal-dialog  modal-dialog-scrollable">
        <div
          className="modal-content "
          style={{ marginTop: "20%" }}
          ref={contentRef}
        >
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
              <DropFoto setFile={onPhotoChange} file={request.photo} />
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

function RequestFilter({ initialTags = [], onClick, All_tags = []}) {
  const selectRef = useRef(null);

  useEffect(() => {
    const selectEl = selectRef.current;
    const select = new TomSelect(selectEl, {
      plugins: ["remove_button"],
      valueField: "value",
      labelField: "label",
      options: All_tags.map((tag) => ({ value: tag.name, label: tag.name })),
      onChange: (values) => {
        onClick(values);
      },
      items: initialTags,
      closeAfterSelect: true,
    });

    select.on("dropdown:show", () => {
      setTimeout(() => selectRef.current.focus(), 0);
    });

    return () => {
      select.destroy();
    };
  });

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
