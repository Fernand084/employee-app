// src/components/ListaUsuarios.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Usuario = {
  id: number;
  name: string;
  email: string;
};

const ListaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Usuario[]>('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsuarios(res.data);
        setCargando(false);
      })
      .catch(err => {
        setError('Error al cargar usuarios');
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.name} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaUsuarios;
