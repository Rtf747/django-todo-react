import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Task from './components/Task';

const Button = styled.button`
 margin: 20px;
 padding: 10px;
 background-color: #96be25;
`;

const initialForm = {
 title: '',
 description: '',
 complete: false,
};

function App() {
 const [form, setForm] = useState(initialForm);
 const [data, setData] = useState(null);

 const handleSubmit = (e) => {
  e.preventDefault();
  const postData = async () => {
   const response = await axios.post('http://localhost:8000/api/todos/', form);
   setData((data) => [...data, response.data]);
   console.log(response);
  };
  postData();
  setForm(initialForm);
 };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({
   ...form,
   [name]: value,
  });
 };

 useEffect(() => {
  const getData = async () => {
   const result = await axios.get('http://localhost:8000/api/todos/');
   setData(result.data);
  };
  getData();
 }, []);

 return (
  <>
   <h1>Testing Django</h1>
   {data &&
    data.map((el) => (
     <Task
      key={el.id}
      id={el.id}
      title={el.title}
      description={el.description}
      setData={setData}
     />
    ))}
   <form onSubmit={handleSubmit}>
    <input
     type='text'
     name='title'
     placeholder='Title'
     onChange={handleChange}
     value={form.title}
     required
    />
    <input
     type='text'
     name='description'
     placeholder='Description'
     onChange={handleChange}
     value={form.description}
     required
    />
    <Button>Add task</Button>
   </form>
  </>
 );
}

export default App;
