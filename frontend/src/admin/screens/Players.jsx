import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaSearch } from "react-icons/fa";
import "../styles/players.css";

const Players = () => {

    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [search, setSearch] = useState("");

    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchPlayers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                "http://localhost:3000/api/admin/players",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setPlayers(res.data.players);
            setFilteredPlayers(res.data.players);
        } catch (err) {
            console.log(err);
        }
    };

    const handleView = (player) => {
        setSelectedPlayer(player);
        setShowModal(true);
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    useEffect(() => {

        const filtered = players.filter((player) =>
            player.username.toLowerCase().includes(search.toLowerCase()) ||
            player.email.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredPlayers(filtered);

    }, [search, players]);

    const deletePlayer = async (id) => {
        try {
            const confirmDelete = window.confirm(
                "Are you sure you want to delete this player?"
            );

            if (!confirmDelete) return;

            const token = localStorage.getItem("token")
            await axios.delete(
                `http://localhost:3000/api/admin/player/${id}`,
                {
                    headers: {
                        Authorization: `bearer ${token}`

                    }
                }
            )
            setPlayers((prev) => prev.filter((player) => player._id !== id))

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="container-fluid py-4">

            <div className="mb-4">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h2 className="text-white mb-1">
                            Players
                        </h2>

                        <p className="text-secondary m-0">
                            {filteredPlayers.length} Registered Players
                        </p>

                    </div>

                </div>

                <div className="search-box mt-4">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search by username or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            <div className="row g-4">

                {filteredPlayers.map((player) => (

                    <div className="col-xl-5 col-lg-6" key={player._id}>

                        <div className="card player-card h-100">

                            <div className="card-body">

                                <div className="d-flex align-items-center mb-3">

                                    <div className="player-avatar">

                                        {player.username.charAt(0).toUpperCase()}

                                    </div>

                                    <div className="ms-3">

                                        <h5 className="mb-1 text-white">
                                            {player.username}
                                        </h5>

                                        <small className="text-secondary">
                                            {player.email}
                                        </small>

                                    </div>

                                </div>

                                <div className="player-info">
                                    <p>
                                        <span>Joined</span>
                                        <strong>
                                            {new Date(player.createdAt).toLocaleDateString()}
                                        </strong>

                                    </p>

                                    <p>

                                        <span>Role</span>
                                        <strong>{player.role}</strong>

                                    </p>

                                </div>

                                <div className="d-flex gap-2 mt-4">

                                    <button
                                        className="btn btn-view flex-fill"
                                        onClick={() => handleView(player)}
                                    >
                                        <FaEye className="me-2" />
                                    </button>
                                    <button
                                        className="btn btn-delete flex-fill"
                                        onClick={() => deletePlayer(player._id)}
                                    >
                                        <FaTrash className="me-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            {showModal && selectedPlayer && (

                <div className="player-modal-overlay">

                    <div className="player-modal">

                        <button
                            className="close-btn"
                            onClick={() => setShowModal(false)}
                        >  ✕</button>

                        <div className="modal-avatar">
                            {selectedPlayer.username.charAt(0).toUpperCase()}
                        </div>

                        <h3 className="text-center mt-3">
                            {selectedPlayer.username}
                        </h3>

                        <div className="player-details">

                            <div>
                                <span>Email</span>
                                <p>{selectedPlayer.email}</p>
                            </div>

                            <div>
                                <span>Role</span>
                                <p>{selectedPlayer.role}</p>
                            </div>

                            <div>
                                <span>Joined</span>
                                <p>
                                    {new Date(selectedPlayer.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <span>Player ID</span>
                                <p>{selectedPlayer._id}</p>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Players;