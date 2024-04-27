import React, { useEffect } from "react";
import UserInfoElement from "./UserInfoElement";

const initialState = {
  first_name: "",
  last_name: "",
  phone_number: "",
  city: "",
  about_me: "",
  avatar: {
    url: "/uploads/profile/avatar/1/avatar.png",
  },
};

function UserInfo({ profile, onEditProfile, isEditing, onCancel }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    if (profile) {
      dispatch({ type: "SET_STATE", payload: profile });
    }
  }, [profile]);

  return (
    <div className="col-lg-8">
      <div className=" mb-4">
        <div className="card-body">
          <UserInfoElement
            name={"First name"}
            value={state.first_name}
            isEditing={isEditing}
            onChange={(e) => {
              dispatch({ type: "SET_FIRST_NAME", payload: e.target.value });
            }}
          />
          <hr />
          <UserInfoElement
            name={"Last name"}
            value={state.last_name}
            isEditing={isEditing}
            onChange={(e) => {
              dispatch({ type: "SET_LAST_NAME", payload: e.target.value });
            }}
          />
          <hr />
          <UserInfoElement
            name={"Phone"}
            value={state.phone_number}
            isEditing={isEditing}
            onChange={(e) => {
              dispatch({ type: "SET_PHONE_NUMBER", payload: e.target.value });
            }}
          />
          <hr />
          <UserInfoElement
            name={"Sity"}
            value={state.city}
            isEditing={isEditing}
            onChange={(e) => {
              dispatch({ type: "SET_CITY", payload: e.target.value });
            }}
          />
          <hr />
          <UserInfoElement
            name={"About me"}
            value={state.about_me}
            isEditing={isEditing}
            onChange={(e) => {
              dispatch({ type: "SET_ABOUT_ME", payload: e.target.value });
            }}
          />
        </div>
        {isEditing && (
          <div className="card-footer mt-5 d-flex justify-content-end gap-3">
            <button
              className="btn btn-outline-dark flex-grow-1 "
              onClick={() => {
                dispatch({ type: "SET_STATE", payload: profile });
                onCancel();
              }}
            >
              Cancel
            </button>

            <button
              className="btn btn-outline-dark flex-grow-1 "
              onClick={() => onEditProfile(state)}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "SET_FIRST_NAME":
      return { ...state, first_name: action.payload };
    case "SET_LAST_NAME":
      return { ...state, last_name: action.payload };
    case "SET_PHONE_NUMBER":
      return { ...state, phone_number: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_ABOUT_ME":
      return { ...state, about_me: action.payload };
    default:
      return state;
  }
}

export default UserInfo;
