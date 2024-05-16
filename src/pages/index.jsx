import React, { useState } from "react";
import PedidosForm from "../component/PedidosForm";

export default function Home() {
  return (
    <div className="flex justify-center flex-col">
      <h1 className="text-lg text-center mx-auto font-bold py-2 px-8 bg-transparent text-black rounded-lg shadow-md inline-block">
        Minha Agenda
      </h1>
      <PedidosForm />
      <footer className="bg-slate-400 text-white text-center py-1">
        <p>© 2024 by Elano Silva.</p>
      </footer>
    </div>
  );
}
