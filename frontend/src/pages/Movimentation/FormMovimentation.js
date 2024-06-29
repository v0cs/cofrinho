import React, { useEffect, useState } from "react";
import styles from './FormMovimentation.module.css';

function FormMovimentation({ onSubmit }) {
    const [tipo, setTipo] = useState('Despesa');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [valor, setValor] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        // Aqui você pode buscar as categorias do seu backend ao invés da API externa
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit({ tipo, descricao, data, valor, categoria_id: categoriaId });
            // Limpar campos após submissão bem-sucedida
            setTipo('Despesa');
            setDescricao('');
            setData('');
            setValor('');
            setCategoriaId('');
        } catch (error) {
            console.error('Erro ao cadastrar movimentação:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="type">Tipo</label>
                <select
                    id="type"
                    name="type"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                    className={styles.input}
                >
                    <option value="Despesa">Despesa</option>
                    <option value="Receita">Receita</option>
                </select>
                <label className={styles.label} htmlFor="category">Categoria</label>
                <select
                    id="category"
                    name="category"
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    required
                    className={styles.input}
                >
                    <option value="" disabled>Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                    ))}
                </select>

                <label className={styles.label} htmlFor="description">Descrição</label>
                <input
                    type="textarea"
                    name="description"
                    id="description"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                    className={styles.input}
                />
                <label className={styles.label} htmlFor="date">Data</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                    className={styles.input}
                />
                <label className={styles.label} htmlFor="value">Valor</label>
                <input
                    type="number"
                    name="value"
                    id="value"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    min={0}
                    required
                    className={styles.input}
                />
                <input type="submit" value={"Registrar"} className={styles.submit} />
            </form>
        </div>
    );
}

export default FormMovimentation;
