import { useHistory } from 'react-router';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuthHook } from '../hooks/UseAuth';
import { FormEvent, useState } from 'react';
import { dbFirebase } from '../services/firebase';


export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuthHook();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await dbFirebase.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        history.push(`/rooms/${roomCode}`);
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleImg} alt="logo" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">
                        Ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            required
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}