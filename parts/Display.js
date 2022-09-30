import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import AddUser from "./AddUser";
import { getStorage, ref, deleteObject } from "firebase/storage";

let allContacts = [];
const Display = ({ id }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showClass, setShowClass] = useState("contactBox");
  const [currentClass, setCurrentClass] = useState("display");
  const [showForm, setShowForm] = useState("display");
  const [currentId, setCurrentId] = useState(0);

  const [imgURL, setImgURL] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNo, setContactNo] = useState("");

  const [cards, setCards] = useState([]);

  let profile = {};
  let allCards = [];
  useEffect(() => {
    getUserData();
    getdata();
  }, []);

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function getdata() {
    const firestore = getFirestore();
    const values = query(
      collection(firestore, "contacts"),
      where("user_id", "==", id)
    );
    const querySnapshot1 = await getDocs(values);
    querySnapshot1.forEach((doc) => {
      allContacts.push(doc.data());
    });

    for (let i = 0; i < allContacts.length; i++) {
      allCards.push(
        <div
          key={allContacts[i].id}
          className="card"
          onClick={() => {
            change(
              allContacts[i].imageURL,
              allContacts[i].name,
              allContacts[i].phone,
              allContacts[i].id
            );
          }}
        >
          <img src={allContacts[i].imageURL} className="cardImg" />
        </div>
      );
    }
    setCards(allCards);
  }

  allCards = [];
  async function getUserData() {
    const firestore = getFirestore();
    const q = query(collection(firestore, "profile"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      profile = doc.data();
      setName(profile.name);
      setEmail(profile.email);
    });
  }
  const exitForm = () => {
    setShowForm("display");
    setShowClass("contactBox");
  };
  const openForm = () => {
    setShowClass("display");
    setShowForm("contactBox");
  };
  const change = (img, name, phone, id) => {
    setCurrentId(id);
    setContactName(name);
    setImgURL(img);
    setContactNo(phone);
    setCurrentClass("contact");
    setShowClass("display");
  };
  const back = () => {
    setCurrentClass("display");
    setShowClass("contactBox");
  };
  async function remContact() {
    const firestore = getFirestore();
    await deleteDoc(doc(firestore, "contacts", currentId)).then(() => {
      const storage = getStorage();
      const imglocation = "images/" + currentId + "/avatar";
      const desertRef = ref(storage, imglocation);
      deleteObject(desertRef)
        .then(() => {
          window.location.href = "/home";
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  return (
    <div className="App">
      {/* Home Screen */}
      <div className={showClass}>
        <h1>{name}</h1>
        <p>{email}</p>
        <div className="line"></div>
        <div onClick={openForm} className="addBtn">
          <i className="fas fa-plus"></i>
        </div>
        <div className="line"></div>
        <p>All contacts appear here</p>
        <div className="allCards">{cards}</div>
      </div>
      {/* Screen For Contact Call */}
      <div className={currentClass}>
        <div className="remBtn" onClick={remContact}>
          <i className="fas fa-trash"></i>
        </div>
        <img className="bigImg" src={imgURL} />

        <div className="line"></div>
        <div className="showName">{contactName}</div>
        <div className="showNumber">{contactNo}</div>
        <div className="back" onClick={back}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <a className="call" href={contactNo}>
          <i className="fas fa-phone"></i>
        </a>
      </div>
      {/* Screen For Add Contact Form */}
      <div className={showForm}>
        <AddUser />
        <div>
          <div className="back" onClick={exitForm}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <div onClick={logout} className="logoutBtn">
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
