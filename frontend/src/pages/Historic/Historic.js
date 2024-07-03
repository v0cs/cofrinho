import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Historic.module.css';

function Historic() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // GET Categorias
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/categorias', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategorias(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/historico', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          dataInicio,
          dataFim,
          categoriaId
        }
      });
      setMovimentacoes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Histórico de Movimentações</h1>
      <form className={styles.form} onSubmit={handleSearch}>
        <div className={styles.formGroup}>
          <label htmlFor="dataInicio" className={styles.label}>Data de Início:</label>
          <input
            type="date"
            id="dataInicio"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dataFim" className={styles.label}>Data de Fim:</label>
          <input
            type="date"
            id="dataFim"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="categoria" className={styles.label}>Categoria:</label>
          <select
            id="categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className={styles.select}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
            ))}
          </select>
        </div>
        <input type="submit" value="Filtrar" className={styles.submit} />
      </form>
      <div className={styles.movimentacoesContainer}>
        <h2 className={styles.subTitle}>Lista de Movimentações:</h2>
        <table className={styles.tableMovimentacoes}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Tipo</th>
              <th className={styles.tableHeader}>Descrição</th>
              <th className={styles.tableHeader}>Data</th>
              <th className={styles.tableHeader}>Valor</th>
              <th className={styles.tableHeader}>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((movimentacao) => (
              <tr key={movimentacao.id}>
                <td className={styles.tableData}>{movimentacao.tipo}</td>
                <td className={styles.tableData}>{movimentacao.descricao}</td>
                <td className={styles.tableData}>{new Date(movimentacao.data).toLocaleDateString()}</td>
                <td className={styles.tableData}>{movimentacao.valor}</td>
                <td className={styles.tableData}>{movimentacao.Category ? movimentacao.Category.nome : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Historic;
