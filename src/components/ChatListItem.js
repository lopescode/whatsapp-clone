import React from "react";
import "./ChatListItem.css";

export default ({ onClick, active, data }) => {
  return (
    <div className={`chatListItem ${active ? "active" : ""}`} onClick={onClick}>
      <img className="chatListItem--avatar" src={data.image} alt="avatar"></img>
      <div className="chatListItem--lines">
        <div className="chatListItem--line">
          <div className="chatListItem--name">{data.title}</div>
          <div className="chatListItem--date">04:20</div>
        </div>
        <div className="chatListItem--line">
          <div className="chatListItem--lastMsg">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
