import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCeKQOD-GrJOIos8m-J-mrXHqwg1WyPT-g",
  authDomain: "cru-nacos-vote.firebaseapp.com",
  projectId: "cru-nacos-vote",
  storageBucket: "cru-nacos-vote.appspot.com",
  messagingSenderId: "771005751339",
  appId: "1:771005751339:web:dcb783f1e35f7d65b8ca6e",
  measurementId: "G-MXTZ1LFZ1T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const positionInput = document.getElementById("positionName");
const contestantInput = document.getElementById("contestantName");
const positionSelect = document.getElementById("positionSelect");
const positionsContainer = document.getElementById("positionsContainer");

// Fetch and display positions and contestants from Firestore
function loadPositions() {
  const positionsCollection = collection(db, "positions");
  onSnapshot(positionsCollection, (snapshot) => {
    positionsContainer.innerHTML = "";
    positionSelect.innerHTML = "<option value=''>Select Position</option>";
    snapshot.forEach((doc) => {
      const position = doc.data();
      renderPosition(doc.id, position);
    });
  });
}

function renderPosition(id, position) {
  const positionDiv = document.createElement("div");
  positionDiv.innerHTML = `
    <h3>${position.name} 
      <button onclick="deletePosition('${id}')">Delete</button>
    </h3>
    <ul id="contestants-${id}"></ul>
  `;
  positionsContainer.appendChild(positionDiv);
  positionSelect.innerHTML += `<option value="${id}">${position.name}</option>`;

  position.contestants.forEach((contestant, index) => {
    const contestantItem = document.createElement("li");
    contestantItem.innerHTML = `
      ${contestant.name} - Votes: ${contestant.votes}
      <button onclick="deleteContestant('${id}', ${index})">Delete</button>
    `;
    document.getElementById(`contestants-${id}`).appendChild(contestantItem);
  });
}

// Add a new position
async function addPosition() {
  const positionName = positionInput.value.trim();
  if (positionName) {
    await addDoc(collection(db, "positions"), {
      name: positionName,
      contestants: [],
    });
    positionInput.value = "";
  }
}

// Add a new contestant to the selected position
async function addContestant() {
  const positionId = positionSelect.value;
  const contestantName = contestantInput.value.trim();
  if (positionId && contestantName) {
    const positionRef = doc(db, "positions", positionId);
    const positionSnapshot = await getDoc(positionRef);
    const positionData = positionSnapshot.data();
    const updatedContestants = [
      ...positionData.contestants,
      { name: contestantName, votes: 0 },
    ];
    await updateDoc(positionRef, { contestants: updatedContestants });
    contestantInput.value = "";
  }
}

// Delete a position
async function deletePosition(id) {
  await deleteDoc(doc(db, "positions", id));
}

// Delete a contestant from a position
async function deleteContestant(positionId, contestantIndex) {
  const positionRef = doc(db, "positions", positionId);
  const positionSnapshot = await getDoc(positionRef);
  const positionData = positionSnapshot.data();
  const updatedContestants = positionData.contestants.filter(
    (_, index) => index !== contestantIndex
  );
  await updateDoc(positionRef, { contestants: updatedContestants });
}

loadPositions();
