import React, { useEffect, useState } from 'react';
import TicketCard from './TicketCard';

const PRIORITY_LEVELS = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No Priority'
};

const KanbanBoard = ({ tickets = [], users = [], groupBy, sortBy }) => {
    const [columns, setColumns] = useState(tickets);
    
    useEffect(() => {
        setColumns(groupTickets(tickets));
    }, [tickets]);

    const getUserNameById = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const groupTickets = (tickets) => {
        const grouped = {};
        tickets.forEach(ticket => {
            const groupKey = groupBy === 'status' ? ticket.status
                : groupBy === 'user' ? getUserNameById(ticket.userId)
                : groupBy === 'priority' ? ticket.priority
                : 'Uncategorized';

            if (!grouped[groupKey]) grouped[groupKey] = [];
            grouped[groupKey].push(ticket);
        });
        return grouped;
    };

    const sortedTickets = (groupedTickets) => {
        Object.keys(groupedTickets).forEach(group => {
            groupedTickets[group].sort((a, b) => {
                if (sortBy === 'priority') {
                    return b.priority - a.priority;
                }
                if (sortBy === 'title') {
                    return a.title.localeCompare(b.title);
                }
                return 0;
            });
        });
        return groupedTickets;
    };

    const handleTicketAction = (action, groupKey) => {
        const updatedColumns = { ...columns };
        if (action === 'done') {
            updatedColumns[groupKey] = updatedColumns[groupKey].filter(ticket => ticket.status !== 'done');
            setColumns(updatedColumns);
        }
        if (action === 'cancel') {
            updatedColumns[groupKey] = updatedColumns[groupKey].filter(ticket => ticket.status !== 'cancel');
            setColumns(updatedColumns);
        }
    };

    const handleAddTicket = (groupKey) => {
        const newTicket = {
            id: Math.random().toString(36).substr(2, 9), 
            title: 'New Ticket',
            priority: 1,
            status: groupKey,
            userId: null
        };
        const updatedColumns = { ...columns };
        updatedColumns[groupKey].push(newTicket);
        setColumns(updatedColumns);
    };

    const groupedTickets = groupTickets(tickets);
    const displayedTickets = sortedTickets(groupedTickets);

    return (
        <div className="kanban-board">
            {Object.keys(displayedTickets).length > 0 ? (
                Object.keys(displayedTickets).map(group => (
                    <div key={group} className="kanban-column">
                        <div className="kanban-column-header">
                            {groupBy === 'priority'
                                ? `${PRIORITY_LEVELS[group]} Priority (${displayedTickets[group].length})`
                                : `${group} (${displayedTickets[group].length})`}
                            <div className="column-controls">
                                <button onClick={() => handleAddTicket(group)}>+</button>
                                <div className="dropdown">
                                    <button className="dropdown-toggle">...</button>
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleTicketAction('done', group)} disabled>Mark as Done</button>
                                        <button onClick={() => handleTicketAction('cancel', group)} disabled>Cancel Ticket</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {displayedTickets[group].map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                ))
            ) : (
                <div>No tickets to display</div>
            )}
        </div>
    );
};

export default KanbanBoard;
