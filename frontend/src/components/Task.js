import axios from 'axios';

const Task = ({ id, title, description, setData }) => {
 const handleDelete = async () => {
  const response = await axios.delete(`http://localhost:8000/api/todos/${id}/`);
  const refresh = await axios.get('http://localhost:8000/api/todos/');
  setData(refresh.data);
 };

 return (
  <div>
   <h2>{title}</h2>
   <p>{description}</p>
   <button onClick={handleDelete}>Delete</button>
  </div>
 );
};

export default Task;
