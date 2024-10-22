import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const TicketCard = ({ ticket }) => {
    return (
        <div className="ticket-card">
            <div className="ticket-header">
                <div className="ticket-id">
                    <span>{ticket.id}</span>
                </div>
                <div className="ticket-priority">
                    <FontAwesomeIcon icon={faFlag} /> {ticket.priority}
                </div>
            </div>

            <div className="ticket-body">
                <h3 className="ticket-title">{ticket.title}</h3>
                <div className="ticket-type">
                    <span className="ticket-label">Feature Request</span>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
