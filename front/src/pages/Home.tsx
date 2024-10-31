import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username')
  const [items, setItems] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/auth/protected', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        navigate('/login'); 
      } else {
        const res = await response.json();
        setItems(res)
        console.log(res);
      }
    };

    if (token) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  function handleLogout(){
    localStorage.clear()
    navigate('/');
  }

  return (
    <div>
      <h1>Página inicial, login com sucesso!</h1>
      <h2>Logado com sucesso {username}</h2>

      <p>Faça logout: <button className="border-gray-800 rounded shadow ml-2 p-2"  onClick={handleLogout}>Logout</button></p>
    
      <div>
        <p>users: </p><br />

        {}

      </div>
    
    </div>
  );
}
