import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddUser = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(true);
  const [file, setFile] = useState("");
  const [showMessage, setShowMessage] = useState("");

  async function addContact() {
    setShowMessage("Creating Contact . . .");
    const storage = getStorage();
    const auth = getAuth();
    const firestore = getFirestore();
    const docRef = await addDoc(collection(firestore, "contacts"), {
      name: name,
      phone: "tel: " + phone,
      imageURL: "",
      user_id: auth.currentUser.uid,
      id: "",
    }).then((docRef) => {
      setShowMessage("Uploading Image . . .");
      setName("");
      setPhone("");
      setValid(true);
      const refrence = "images/" + docRef.id + "/avatar";
      console.log(refrence);
      const metadata = {
        contentType: "image/jpeg",
      };
      const storageRef = ref(storage, refrence);
      const uploadTask = uploadBytes(storageRef, file, metadata).then(() => {
        getDownloadURL(ref(storage, refrence)).then((url) => {
          updateDoc(doc(firestore, "contacts", docRef.id), {
            imageURL: url,
            id: docRef.id,
          })
            .then(() => {
              setShowMessage("Contact Created ");
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    });
  }
  useEffect(() => {
    if (name.length > 2 && phone.length > 9 && file) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [name, phone, file]);
  return (
    <div className="signupBox">
      <h1>Add Contact</h1>
      <label>
        Contact Name <span>*</span>
      </label>
      <input
        type="text"
        placeholder="Contact Name"
        value={name}
        onChange={(ev) => {
          setName(ev.target.value);
        }}
      ></input>
      <label>
        Phone Number <span>*</span>
      </label>
      <input
        type="number"
        placeholder="Phone Number"
        value={phone}
        onChange={(ev) => {
          setPhone(ev.target.value);
        }}
      ></input>
      <label>
        Upload Image <span>*</span>
      </label>
      <input
        type="file"
        placeholder="Upload Image"
        accept="image/*"
        onChange={(ev) => {
          setFile(ev.target.files[0]);
        }}
      ></input>
      <button type="submit" disabled={valid} onClick={addContact}>
        Add User
      </button>
      <p>{showMessage}</p>
    </div>
  );
};

export default AddUser;
