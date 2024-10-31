import { useParams } from "react-router-dom";

export default function User() {
    const { id } = useParams();
    return (
      <div>
        <h1>Usuário {id}</h1>
      </div>
    );
  }