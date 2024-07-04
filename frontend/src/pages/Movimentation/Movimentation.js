// Movimentation.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Movimentation.module.css';

function Movimentation() {
  const [movimentations, setMovimentations] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tipo, setTipo] = useState('Despesa');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [editId, setEditId] = useState(null); // ID da movimentação em modo de edição
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovimentations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/movimentation', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMovimentations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

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

    fetchMovimentations();
    fetchCategorias();
  }, []);

  const handleEdit = (movimentacao) => {
    setEditId(movimentacao.id);
    setTipo(movimentacao.tipo);
    setDescricao(movimentacao.descricao);
    setData(movimentacao.data);
    setValor(movimentacao.valor);
    setCategoriaId(movimentacao.categoria_id);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTipo('Despesa');
    setDescricao('');
    setData('');
    setValor('');
    setCategoriaId('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/movimentation/${editId}`, {
        tipo,
        descricao,
        data,
        valor,
        categoria_id: categoriaId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Atualizar lista de movimentações após edição
      const response = await axios.get('http://localhost:5000/api/movimentation', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMovimentations(response.data);
      handleCancelEdit(); // Limpar campos de edição
    } catch (error) {
      setError('Erro ao atualizar a movimentação. Tente novamente.');
      console.error(error);
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
      setMovimentations(movimentations.filter(movimentacao => movimentacao.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCadastro = async (e) => {
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
      setMovimentations(response.data);
      setTipo('Despesa');
      setDescricao('');
      setData('');
      setValor('');
      setCategoriaId('');
    } catch (error) {
      setError('Erro ao cadastrar a movimentação. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="tipo" className={styles.label}>Tipo:</label>
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
        <label htmlFor="descricao" className={styles.label}>Descrição:</label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className={styles.input}
        />
        <label htmlFor="data" className={styles.label}>Data:</label>
        <input
          type="date"
          id="data"
          name="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className={styles.input}
        />
        <label htmlFor="valor" className={styles.label}>Valor:</label>
        <input
          type="number"
          id="valor"
          name="valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className={styles.input}
        />
        <label htmlFor="categoria" className={styles.label}>Categoria:</label>
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
        <div className={styles.buttons}>
          {editId ? (
            <>
              <input type="submit" value="Atualizar Movimentação" className={styles.submit} />
              <button type="button" onClick={handleCancelEdit} className={styles.cancel}>Cancelar</button>
            </>
          ) : (
            <input type="submit" value="Registrar Movimentação" className={styles.submit} onClick={handleCadastro} />
          )}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <div className={styles.movimentacoesContainer}>
        <h2 className={styles.subTitle}>Movimentações Registradas:</h2>
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
            {movimentations.map((movimentacao) => (
              <tr key={movimentacao.id}>
                <td>{movimentacao.tipo}</td>
                <td>{movimentacao.descricao}</td>
                <td>{new Date(movimentacao.data).toLocaleDateString()}</td>
                <td>{movimentacao.valor}</td>
                <td>{movimentacao.Category ? movimentacao.Category.nome : '-'}</td>
                <td className={styles.actions}>
                  <button onClick={() => handleEdit(movimentacao)}>Editar</button>
                  <button onClick={() => handleDelete(movimentacao.id)}>Excluir</button>
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
