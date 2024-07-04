import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './Category.module.css';

function Category() {
  const [listCategory, setlistCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editId, setEditId] = useState(null); // ID da categoria em modo de edição
  const [error, setError] = useState('');

  useEffect(() => {
    // GET Categories
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setlistCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/categories',
        { nome: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setlistCategory([...listCategory, response.data]);
      setCategoryName('');
    } catch (error) {
      setError('Erro ao cadastrar a categoria. Tente novamente.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setlistCategory(listCategory.filter(category => category.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (categoria) => {
    setEditId(categoria.id);
    setCategoryName(categoria.nome);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setCategoryName('');
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/categories/${editId}`,
        { nome: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Atualizar lista de categorias após edição
      const updatedCategories = listCategory.map(category =>
        category.id === editId ? { ...category, nome: categoryName } : category
      );
      setlistCategory(updatedCategories);
      handleCancelEdit(); // Limpar campos de edição
    } catch (error) {
      setError('Erro ao atualizar a categoria. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="description" className={styles.label}>Cadastrar Categoria:</label>
        <input type="text" name="description" id="description" required className={styles.input} value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        {editId ? (
          <>
            <button type="button" onClick={handleUpdate} className={styles.submit}>Atualizar</button>
            <button type="button" onClick={handleCancelEdit} className={styles.cancel}>Cancelar</button>
          </>
        ) : (
          <input type="submit" value="Cadastrar" className={styles.submit} />
        )}
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <div className={styles.categoryContainer}>
        <h2 className={styles.subTitle}>Categorias:</h2>
        <table className={styles.tableCategory}>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listCategory.map((item) => (
              <tr key={item.id}>
                <td>{editId === item.id ? (
                  <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                ) : (
                  item.nome
                )}</td>
                <td className={styles.actions}>
                  {editId === item.id ? (
                    <>
                      <button onClick={handleUpdate}>Salvar</button>
                      <button onClick={handleCancelEdit}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item)}>Editar</button>
                      <button onClick={() => handleDelete(item.id)}>Excluir</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
