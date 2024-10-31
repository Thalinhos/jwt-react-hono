import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginFormComponent() {

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/auth/authWithUserAndPass", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "identity": nome, "password": senha })
        });

        const res = await response.json();
        
        
        if (!response.ok) {
            setMensagem(res.message || "Erro ao enviar dados")
        } else {
            if (res.token){
                localStorage.setItem('token', res.token);
                localStorage.setItem('username', nome);
            navigate('/')
            }
            else{
                setMensagem(res.message || "Erro ao enviar dados")
            }
        }
    };

    return (
        <div className="flex h-screen">
            <div className="m-auto bg-gray-200 rounded-md p-16 transition duration-300 hover:shadow-lg">
                <div className="m-auto text-center">
                    <form className="flex flex-col gap-2" onSubmit={handleLogin}>
                        <label htmlFor="usuario">Usuário</label>
                        <input 
                            type="text" 
                            name="usuario" 
                            id="usuario"  
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} 
                            className="p-2 border border-gray-200 rounded transition duration-300 hover:shadow-lg" 
                        />
                        <label htmlFor="senha">Senha</label>
                        <input 
                            type="password" 
                            name="senha" 
                            id="senha"  
                            value={senha} 
                            onChange={(e) => setSenha(e.target.value)} 
                            className="p-2 border border-gray-200 rounded transition duration-300 hover:shadow-lg" 
                        />
                        <button 
                            type="submit" 
                            className="m-auto mt-2 p-2 w-20 border border-gray-300 rounded transition duration-300 hover:shadow-lg"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            {mensagem && <p className="text-center">{mensagem}</p>}
            </div>
        </div>
    );
}
