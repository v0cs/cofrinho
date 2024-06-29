import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Movimentation.module.css';

function Movimentation() {
  const [movimentation, setMovimentation] = useState([]);
  const [tipo, setTipo] = useState('Despesa');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // GET Categorias
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/categories', {
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

    // GET Movimentações
    const fetchMovimentation = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/movimentation', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMovimentation(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovimentation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/movimentation', 
        { tipo, descricao, data, valor, categoria_id: categoriaId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Atualizar lista de movimentações após adicionar
      const response = await axios.get('http://localhost:5000/api/movimentation', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMovimentation(response.data);
      setTipo('Despesa');
      setDescricao('');
      setData('');
      setValor('');
      setCategoriaId('');
    } catch (error) {
      setError('Erro ao cadastrar a movimentação. Tente novamente.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/movimentation/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMovimentation(movimentation.filter(movimentacao => movimentacao.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className={styles.select}
        >
          <option value="Despesa">Despesa</option>
          <option value="Receita">Receita</option>
        </select>
        <label htmlFor="descricao">Descrição:</label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className={styles.input}
        />
        <label htmlFor="data">Data:</label>
        <input
          type="date"
          id="data"
          name="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className={styles.input}
        />
        <label htmlFor="valor">Valor:</label>
        <input
          type="number"
          id="valor"
          name="valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className={styles.input}
        />
        <label htmlFor="categoria">Categoria:</label>
        <select
          id="categoria"
          name="categoria"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className={styles.select}
        >
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
          ))}
        </select>
        <input type="submit" value="Registrar Movimentação" className={styles.submit} />
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <div>
        <h2>Movimentações Registradas:</h2>
        <table className={styles.tableMovimentation}>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {movimentation.map((movimentacao) => (
              <tr key={movimentacao.id}>
                <td>{movimentacao.tipo}</td>
                <td>{movimentacao.descricao}</td>
                <td>{new Date(movimentacao.data).toLocaleDateString()}</td>
                <td>{movimentacao.valor}</td>
                <td>{movimentacao.Category ? movimentacao.Category.nome : '-'}</td>
                <td className={styles.actions}>
                  <button onClick={() => handleDelete(movimentacao.id)}>Excluir</button>
                  {/* Implementação da edição pode ser adicionada aqui */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Movimentation;
