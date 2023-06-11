import { useEffect, useState } from "react";
import Porta from "../../../components/Porta";
import { atualizarPortas, criarPortas } from "../../../functions/portas";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../../styles/Jogo.module.css";
import PortaModel from "../../../model/porta";

export default function jogo() {
  const router = useRouter();
  const [valido, setValido] = useState<boolean>(false)
  const [portas, setPortas] = useState<PortaModel[]>([]);

  useEffect(() => {
    const portas = +router.query.portas;
    const temPresente = +router.query.temPresente;
    const qtdePortasValiddo =  portas >= 3 && portas <= 100
    const temPresenteValido = temPresente >= 1 && temPresente <= portas

    setValido(qtdePortasValiddo && temPresenteValido)
  }, [portas])

  useEffect(() => {
    const portas = +router.query.portas;
    const temPresente = +router.query.temPresente;
    setPortas(criarPortas(portas, temPresente));
  }, [router?.query]);

  function renderizarPortas() {
    return portas.map((porta) => {
      return <Porta
        key={porta.numero}
        value={porta}
        onChange={(novaPorta) => {
          const novasPortas = atualizarPortas(portas, novaPorta);
          setPortas(novasPortas);
        }}
      />;
    });
  }

  return (
    <div id={styles.jogo}>
      <div className={styles.portas}>
        {valido
          ? renderizarPortas()
          : <h2>Valores inválidos</h2>
        }
      </div>
      <div className={styles.botoes}>
        <Link href="/">
          <button>Reiniciar jogo</button>
        </Link>
      </div>
    </div>
  );
}
