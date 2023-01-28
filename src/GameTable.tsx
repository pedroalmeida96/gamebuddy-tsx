import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';
import './gameTable.css';

interface Game {
    id: number;
    name: string;
    location: string;
}

const GamesTable: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [newGame, setNewGame] = useState<Game>({ id: 0, name: '', location: '' });

    useEffect(() => {
        axios.get<Game[]>('http://localhost:8080/games')
            .then(response => setGames(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post<Game>('http://localhost:8080/games', newGame)
            .then(response => {
                setGames([...games, response.data]);
                setNewGame({ id: 0, name: '', location: '' });
            })
            .catch(error => console.log(error));
    }

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:8080/games/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setGames(games.filter(game => game.id !== id));
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h2>All Games</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game.id}>
                            <td>{game.id}</td>
                            <td>{game.name}</td>
                            <td>{game.location}</td>
                            <td>

                                <Button variant="danger" onClick={() => handleDelete(game.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="add-new-game">
                <h2>Add new Game</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={newGame.name} onChange={(event) => setNewGame({ ...newGame, name: event.target.value })} placeholder="Enter game name" required />
                    </Form.Group>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" value={newGame.location} onChange={(event) => setNewGame({ ...newGame, location: event.target.value })} placeholder="Enter game location" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="add-button">Add</Button>
                </Form>
            </div>
        </div>
    );
}

export default GamesTable;