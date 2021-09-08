import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import "./ChatWindow.css";

/* COMPONENTS */
import MessageItem from "./MessageItem";

/* ICONS */
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";

export default ({ user }) => {

  /* useRef */
  const body = useRef();

  {
    /* SpeechRecognition props */
  }
  let recognition = null;
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
    recognition.lang = "pt";
  }

  {
    /* useStates */
  }
  const [text, setText] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([]);

  {
    /* handles */
  }
  const handleEmojiClick = (e, emojiObject) => {
    setText(text + emojiObject.emoji);
  };
  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };
  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };
  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      };

      recognition.start();
    }
  };
  const handleSendClick = () => {};

  /* useEffects */
  /* Scrollbar props */
  useEffect(() => {
    // Verificando se o conteudo é maior que a altura do body
    if( body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [list])

  return (
    <div className="chatWindow">
      <div className="chatWindow--header">
        <div className="chatWindow--headerinfo">
          <img
            className="chatWindow--avatar"
            src="https://www.w3schools.com/howto/img_avatar2.png"
            alt="Avatar"
          />
          <div className="chatWindow--name">Leonardo Lopes</div>
        </div>

        <div className="chatWindow--headerbuttons">
          <div className="chatWindow--btn">
            <SearchIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <AttachFileIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <MoreVertIcon style={{ color: "#919191" }} />
          </div>
        </div>
      </div>
      <div ref={body} className="chatWindow--body">
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>
      <div
        className="chatWindow--emojiarea"
        style={{ height: emojiOpen ? "200px" : "0px" }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>
      <div className="chatWindow--footer">
        <div className="chatWindow--pre">
          {/* Exibir botão de fechar emojis */}
          <div
            className="chatWindow--btn"
            onClick={handleCloseEmoji}
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <CloseIcon style={{ color: "#919191" }} />
          </div>

          {/* Alterar a cor do icone emoji */}
          <div className="chatWindow--btn" onClick={handleOpenEmoji}>
            <InsertEmoticonIcon
              style={{ color: emojiOpen ? "#009688" : "#919191" }}
            />
          </div>
        </div>
        <div className="chatWindow--inputarea">
          {/* Enviar o que está sendo digitado ao input */}
          <input
            className="chatWindow--input"
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {/* Se o texto estiver vazio, mostrar icone do microfone */}
        {text === "" && (
          <div onClick={handleMicClick} className="chatWindow--pos">
            <MicIcon style={{ color: listening ? "#126ECE" : "#919191" }} />
          </div>
        )}
        {/* Se o texto não estiver vazio, mostrar icone de enviar */}
        {text !== "" && (
          <div onClick={handleSendClick} className="chatWindow--pos">
            <SendIcon style={{ color: "#919191" }} />
          </div>
        )}
      </div>
    </div>
  );
};
