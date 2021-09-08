import React, { useState, useEffect } from "react";
import "./NewChat.css";

/* ICONS */
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

/* COMPONENTS */
import Api from "../Api";

export default ({ user, chatlist, show, setShow }) => {
  /* useStates */
  const [list, setList] = useState([]);

  /* useEffect */
  useEffect(() => {
    const getList = async () => {
      if(user !== null) {
        let results = await Api.getContactList(user.id)
        setList(results)
      }
    }
    getList();
  }, [user])

  /* handles */
  const handleClose = () => {
    setShow(false);
  }

  const addNewChat = async (user2) => {
    await Api.addNewChat(user, user2);

    handleClose();
  }

  return (
    <div className="newChat" style={{left: show?0:-415}}>
      <div className="newChat--head">
        <div onClick={handleClose} className="newChat--backbutton">
          <ArrowBackIcon style={{ color: "FFF" }} />
        </div>
        <div className="newChat--headtitle">Nova conversa</div>
      </div>
      <div className="newChat--list">
        {list.map((item, key) => (
          <div onClick={()=> addNewChat(item)} className="newChat--item" key={key}>
            <img
              className="newChat--itemavatar"
              src={item.avatar}
              alt="avatar"
            />
            <div className="newChat--itemname">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
