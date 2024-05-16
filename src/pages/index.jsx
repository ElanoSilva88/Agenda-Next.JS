import React, { useState } from "react";
import PedidosForm from "../component/PedidosForm";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-lg text-center mx-auto font-bold py-2 px-8 bg-transparent text-black rounded-lg shadow-md inline-block mt-2 mb-4">
        Minha Agenda
      </h1>
      <PedidosForm />
      <footer className="rounded-lg bg-transparent text-black text-center px-4 py-[2px] shadow-md inline-block">
        <p>© 2024 by Elano Silva.</p>
      </footer>
    </div>
  );
}
