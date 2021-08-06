import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatMessage from "../components/ChatMessage";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";


export default function Chat() {

    const { token } = useContext(UserContext);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        loadMessages();
    }, [token]);

    async function sendMessage(e) {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/chat`, { text: newMessage }, { headers: { Authorization: `Bearer ${token.token}` } });
        setNewMessage("");
        loadMessages();
    }

    async function loadMessages() {
        const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/chat`, { headers: { Authorization: `Bearer ${token.token}` } });
        setMessages(result.data);
    }

    return (
        <>
            <Header />

            <Container>
                <ChatContainer>
                    <div> Espaço para conversar anonimamente sobre Pokémons!  </div>
                    {messages.map(m => <ChatMessage key={m.id} message={m} />)}
                    <InputContainer onSubmit={sendMessage}>
                        <input type="text" placeholder="Digite aqui para enviar uma mensagem" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                        <button type="submit">Enviar</button>
                    </InputContainer>
                </ChatContainer>
            </Container>

            <Footer currentPage="chat" />
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 85px 0 65px;
    padding: 25px 0;
    background-color: #F2F2F2;
    min-height: calc(100vh - 150px);
    align-items: flex-start;
    align-content: flex-start;
`;

const ChatContainer = styled.div`
    background-color: #FAFAFA;
    margin: 10px auto;
    min-width: 300px;
    max-width: 600px;
    width: 80%;
    height: 690px;
    box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.2);
    border: 1px solid rgba(0,0,0,0.1);
    overflow-y: scroll;
    padding-bottom: 30px;
    position: relative;
    
    div:first-of-type{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid rgba(0,0,0,0.2);
    }
`;

const InputContainer = styled.form`
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 0;
    left: 0;

    padding: 20px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        outline: none;
        border: none;
        border-radius: 10px;
        background-color: #E44141;
        color: white;
        height: 30px;
        width: 70px;
        font-weight: bold;
        cursor: pointer;
    }

    input {
        ::placeholder{
            color: #E44141;
        }
        color: black;
        outline: none;
        border: 2px solid #E44141;
        border-radius: 10px;
        padding: 5px;
        width: 80%;
    }
`;