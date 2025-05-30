import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Professor Allocation
                </Typography>

                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/professors">
                    Professores
                </Button>
                <Button color="inherit" component={Link} to="/courses">
                    Cursos
                </Button>
                <Button color="inherit" component={Link} to="/departments">
                    Departamentos
                </Button>
                <Button color="inherit" component={Link} to="/allocations">
                    Alocações
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
