
// script-firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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

// 💾 Salvar no Firestore
export async function salvarNoFirestore(caminho, dados) {
  try {
    await addDoc(collection(db, caminho), dados);
    console.log("Salvo com sucesso em", caminho);
  } catch (e) {
    console.error("Erro ao salvar:", e);
  }
}

// 📥 Carregar do Firestore
export async function carregarDoFirestore(caminho) {
  try {
    const querySnapshot = await getDocs(collection(db, caminho));
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
export async function atualizarNoFirestore(caminho, id, dadosAtualizados) {
  try {
    const ref = doc(db, caminho, id);
    await updateDoc(ref, dadosAtualizados);
    console.log("Atualizado com sucesso:", id);
  } catch (e) {
    console.error("Erro ao atualizar:", e);
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

export function criarLinhaHTML(campos) {
  const tr = document.createElement("tr");
  campos.forEach(c => {
    const td = document.createElement("td");
    td.innerHTML = c;
    tr.appendChild(td);
  });
  return tr;
}
