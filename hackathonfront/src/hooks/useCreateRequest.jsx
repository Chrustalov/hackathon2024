import { useCallback, useEffect, useState } from "react";
import CreateRequestModal from "../components/CreateRequestModal";
import axios from "axios";
import { useToastNotification } from "./useToastNotification";
const REQUEST_URL = process.env.REACT_APP_API + "/api/v1/requests";
const TAGS_URL = process.env.REACT_APP_API + "/api/v1/tags";

export const useCreateRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [request, setReques] = useState({});
  const [tags, setTags] = useState([]);
  const { toastSuccess, toastError } = useToastNotification();
  useEffect(() => {
    const fetchTags = async () => {
      axios
        .get(TAGS_URL)
        .then((resp) => setTags(resp.data))
        .catch((err) => console.log(err));
    };
    fetchTags();
  }, []);

  const setRequest = useCallback((request) => {
    setReques(request);
  }, []);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSubmit = useCallback((request) => {
    axios
      .post(REQUEST_URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: request,
      })
      .then((resp) => {
        toastSuccess("Request created successfully");
        close();
      })
      .catch((err) => toastError(err.response?.data?.message));
  }, []);

  const modal = (
    <CreateRequestModal
      isOpen={isOpen}
      onClose={close}
      onSubmit={onSubmit}
      request={request}
      setRequest={setRequest}
      tags={tags}
    />
  );

  return { open, close, modal, setRequest };
};
