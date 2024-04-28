import { useCallback, useEffect, useState } from "react";
import CreateRequestModal from "../components/CreateRequestModal";
import axios from "axios";
import { useToastNotification } from "./useToastNotification";
const REQUEST_URL = https://hackaton-9507e74b8c0c.herokuapp.com/ + "/api/v1/requests";
const TAGS_URL = https://hackaton-9507e74b8c0c.herokuapp.com/ + "/api/v1/tags";

export const useCreateRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [request, setReques] = useState({
    title: "",
    body: "",
    photo: "",
    tags: [],
    tags_ids: [],
  });
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
    setReques({});
    setIsOpen(false);
  }, []);

  const onSubmit = useCallback((request) => {
    console.log(request);
    axios
      .post(
        REQUEST_URL,
          { request: { ...request } },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((resp) => {
        toastSuccess("Request created successfully");
        console.log(resp.data);
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
