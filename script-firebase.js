// script-firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// 🔐 Configure com seus dados do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBk4DEhpSsakwZdumaWS6AO0Lre2CPuicU",
  authDomain: "contafacil-ca62a.firebaseapp.com",
  projectId: "contafacil-ca62a",
  storageBucket: "contafacil-ca62a.firebasestorage.app",
  messagingSenderId: "515706577788",
  appId: "1:515706577788:web:d2425fd6a74ce81acc3af9",
  measurementId: "G-L9Z5T75H9K"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);  // Agora estamos usando o método correto para a autenticação

// 💾 Salvar no Firestore - agora com base no UID do usuário
export async function salvarNoFirestore(caminho, dados) {
  const user = auth.currentUser;  // Obtém o usuário autenticado
  if (!user) {
    console.error("Usuário não autenticado.");
    return;
  }

  try {
    // Criando um caminho único para cada usuário
    const userRef = collection(db, 'usuarios', user.uid, caminho);
    await addDoc(userRef, dados);
    console.log("Salvo com sucesso em", caminho);
  } catch (e) {
    console.error("Erro ao salvar:", e);
  }
}

// 📥 Carregar do Firestore - agora com base no UID do usuário
export async function carregarDoFirestore(caminho) {
  const user = auth.currentUser;  // Obtém o usuário autenticado
  if (!user) {
    console.error("Usuário não autenticado.");
    return [];
  }

  try {
    const userRef = collection(db, 'usuarios', user.uid, caminho);
    const querySnapshot = await getDocs(userRef);
    const lista = [];
    querySnapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    return lista;
  } catch (e) {
    console.error("Erro ao carregar:", e);
    return [];
  }
}

// ✏️ Atualizar documento existente no Firestore
export async function atualizarNoFirestore(caminho, id, dados) {
  try {
    const ref = doc(db, caminho, id);
    await updateDoc(ref, dados);
    console.log(`Atualizado com sucesso: ${caminho}/${id}`);
  } catch (e) {
    console.error("Erro ao atualizar:", e);
  }
}

// ❌ Remover documento do Firestore
export async function removerDoFirestore(caminho, id) {
  try {
    const ref = doc(db, caminho, id);
    await deleteDoc(ref);
    console.log(`Removido com sucesso: ${caminho}/${id}`);
  } catch (e) {
    console.error("Erro ao remover:", e);
  }
}

// 💵 Formatar valor R$
export function formatarReal(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

// 📅 Verifica se data está no intervalo
export function dentroDoPeriodo(data, inicio, fim) {
  const d = new Date(data);
  return d >= new Date(inicio) && d <= new Date(fim);
}

// 🧮 Soma total por campo
export function somarTotal(lista, campo) {
  return lista.reduce((total, item) => total + Number(item[campo] || 0), 0);
}

// 🖼️ Renderizar tabela genérica
export function renderizarTabela(dados, tabelaId, renderizadorLinha) {
  const tbody = document.querySelector(`#${tabelaId} tbody`);
  tbody.innerHTML = "";
  dados.forEach((item, i) => {
    const row = renderizadorLinha(item, i);
    tbody.appendChild(row);
  });
}

// ✏️ Atualizar apenas alguns campos do documento
export async function atualizarCampoFirestore(caminho, id, campos) {
  try {
    const ref = doc(db, caminho, id);
    await updateDoc(ref, campos);
    console.log(`Campos atualizados em ${caminho}/${id}`);
  } catch (e) {
    console.error("Erro ao atualizar campos:", e);
  }
}

export function criarLinhaHTML(campos) {
  const tr = document.createElement("tr");
  campos.forEach(c => {
    const td = document.createElement("td");
    td.innerHTML = c;
    tr.appendChild(td);
  });
  return tr;
}
