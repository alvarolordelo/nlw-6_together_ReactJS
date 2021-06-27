import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuthHook } from '../hooks/UseAuth';
import { FormEvent, useState } from 'react';
import { dbFirebase } from '../services/firebase';

export function NewRoom() {

    const { user } = useAuthHook();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = dbFirebase.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt='ilustração logo' />
                <strong>
                    Crie salas de Q&amp;A ao vivo.
                </strong>
                <p>
                    Tire as dúvidas da sua audiencia em tempo real.
                </p>
            </aside>
            <main>

                <div className="main-content">
                    <img src={logoImg} alt='LetMeAsk' />
                    <h2>Crie uma nova sala, {user?.name}</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            required
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/" >Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}