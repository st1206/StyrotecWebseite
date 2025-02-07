import {writable } from "svelte/store";

export const lang = writable(localStorage.getItem("lang") || "de");

lang.subscribe((value) => {
    localStorage.setItem("lang",value);
})