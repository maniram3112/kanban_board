import React, { useEffect } from 'react';
import TicketCard from './TicketCard';

const KanbanBoard = ({ tickets = [], users = [], groupBy, sortBy }) => {
    useEffect(() => {
        console.log('Tickets:', tickets);
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

    const priorityOrder = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No priority'
    };

    const sortedTickets = (groupedTickets) => {
        Object.keys(groupedTickets).forEach(group => {
            groupedTickets[group].sort((a, b) => {
                if (groupBy === 'priority' || sortBy === 'priority') {
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                } 
                if (sortBy === 'title') {
                    return a.title.localeCompare(b.title);
                }
                return 0;
            });
        });
        return groupedTickets;
    };

    const groupedTickets = groupTickets(tickets);
    const displayedTickets = sortedTickets(groupedTickets);

    return (
        <div className="kanban-board">
            {Object.keys(displayedTickets).length > 0 ? (
                Object.keys(displayedTickets).map(group => (
                    <div key={group} className="kanban-column">
                        <h2 className="kanban-column-header">
                            {groupBy === 'priority'
                                ? `${priorityOrder[group]} ${displayedTickets[group].length}`
                                : `${group} ${displayedTickets[group].length}`
                            }
                        </h2>
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
