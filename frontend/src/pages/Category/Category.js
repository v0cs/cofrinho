import { useEffect, useState } from "react";
import axios from 'axios';
import styles from './Category.module.css';

function Category() {
  const [listCategory, setlistCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
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

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="description" className={styles.label}>Cadastrar Categoria:</label>
        <input type="text" name="description" id="description" required className={styles.input} value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
        <input type="submit" value="Cadastrar" className={styles.submit} />
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <div>
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
                <td>{item.nome}</td>
                <td className={styles.actions}>
                  <button onClick={() => handleDelete(item.id)}>Excluir</button>
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

export default Category;
