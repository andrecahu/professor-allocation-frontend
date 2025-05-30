import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';

interface Department {
    id: number;
    name: string;
}

function DepartmentList() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        const response = await api.get('/departments');
        setDepartments(response.data);
    };

    const createDepartment = async () => {
        await api.post('/departments', { name });
        setName('');
        fetchDepartments();
    };

    return (
        <div>
            <h2>Departamentos</h2>
            <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={createDepartment} variant="contained">Criar</Button>

            <List>
                {departments.map((dept) => (
                    <ListItem key={dept.id}>
                        <ListItemText primary={dept.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default DepartmentList;
