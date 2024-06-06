import { useEffect, useState } from "react";
import styles from './FormMovimentation.module.css';

function FormMovimentation() {
    const [listType, setListType] = useState([]);

    useEffect(() => {
        // GET CATEGORY
        fetch('https://brasilapi.com.br/api/ibge/uf/v1')
            .then((response) => response.json())
            .then((data) => {
                setListType(data);
            })
    }, []);

    return (
        <div>
            <form>
                <label>Tipo</label>
                <select id="type" name="type" required>
                    <option value="Despesa">Despesa</option>
                    <option value="Receita">Receita</option>
                </select>
                <label>Categoria</label>
                <select id="category" name="category" required>
                    <option value="" disabled selected>Selecione uma categoria</option>
                    {listType.map((i) => (
                        <option key={i.id} value={i.id}>{i.sigla}</option>
                    ))}
                </select>

                <label>Descrição</label>
                <input type="textarea" name="description" id="description" required />
                <label>Data</label>
                <input type="date" name="date" id="date" required />
                <label>Valor</label>
                <input type="number" name="value" id="value" min={0} required />
                <input type="submit" value={"Registrar"} />
            </form>
        </div>
    )
}

export default FormMovimentation;