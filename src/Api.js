import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";

import firebaseConfig from "./config/security/firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default {
  /* Método de autenticação Facebook */
  fbPopup: async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    let result = await firebaseApp.auth().signInWithPopup(provider);
    return result;
  },

  /* Adiciona usuários no banco de dados */
  addUser: async (u) => {
    await db.collection("users").doc(u.id).set(
      {
        name: u.name,
        avatar: u.avatar,
      },
      { marge: true }
    );
  },

  /* Busca lista de contatos */
  getContactList: async (userId) => {
    let list = [];

    let results = await db.collection("users").get();
    results.forEach((result) => {
      let data = result.data();

      if (result.id !== userId) {
        list.push({
          id: result.id,
          name: data.name,
          avatar: data.avatar,
        });
      }
    });

    return list;
  },

  /* Iniciar Chat */
  addNewChat: async(user, user2) => {
    let newChat = await db.collection('chats').add({
      messages: [],
      users: [user.id, user2.id]
    });

    /** Referenciando chat pro usuario 1 */
    db.collection('users').doc(user.id).update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: user2.name,
        image: user2.avatar,
        with: user2.id
      })
    });

    /** Referenciando chat pro usuario 2 */
    db.collection('users').doc(user2.id).update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: user.name,
        image: user.avatar,
        with: user.id
      })
    });
  },

  /* Monitorar mensagens em tempo real */
  onChatList: (userId, setChatList) => {
    return db.collection('users').doc(userId).onSnapshot((doc)=>{
      /* Verificando se o usuário existe */
      if(doc.exists) {
        let data = doc.data();

        /* Verificando se o usuário possui Chats */
        if(data.chats) {
          setChatList(data.chats);
        }
      }
    });
  }
};
