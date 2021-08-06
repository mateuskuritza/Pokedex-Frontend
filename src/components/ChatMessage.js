import styled from 'styled-components';
import dayjs from 'dayjs';

export default function ChatMessage({ message }) {
    return (
        <Message>
            <strong> {dayjs(message.date).format("DD/MM/YYYY HH:MM:ss")} </strong>
            <span> {message.text} </span>
        </Message>
    )
}

const Message = styled.div`
    padding: 6px;
    border-top: 1px solid rgba(0,0,0,0.08);
    border-bottom: 1px solid rgba(0,0,0,0.08);
    span{
        margin-left: 5px;
    }
`;