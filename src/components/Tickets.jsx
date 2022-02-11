import React, {useEffect, useState} from 'react';
import {Panel} from "rsuite";
import TicketTable from "./TicketTable";

const Tickets = () => {
    const wss = new WebSocket('ws://localhost:9898');
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        wss.onopen = function () {
            console.log('WebSocket Client Connected');
        };
        wss.onmessage = function (e) {
            const data = JSON.parse(e.data);
            // console.log("DATA ==>",data);
            const oldTickets = JSON.parse(JSON.stringify(tickets));
            if(oldTickets.length > 0){
                if(data.time && data.ticket){
                    console.log("TIME WAS DIFFERENT")
                    console.log(data.ticket)
                    oldTickets.forEach(ticket => {
                        if(ticket.title.toString() === data.ticket.title.toString()){
                            ticket.container = data.ticket.container
                        } else {
                            oldTickets.push(data.ticket)
                        }
                    })
                    setTickets(oldTickets);
                }
                if(data.new && data.ticket){
                    oldTickets.forEach(ticket => {
                        if(ticket.title.toString() === data.ticket.title.toString()){
                            ticket.container = data.ticket.container
                        } else {
                            oldTickets.push(data.ticket)
                        }
                    })
                    console.log("DATA WAS DIFFERENT")
                    console.log(data.ticket)
                    // oldTickets.container.push(data.ticket.container[0])
                    setTickets(oldTickets)
                }
               if (!data.new && !data.time &&!data.old &&!data.message){
                    console.log("NEW")
                    oldTickets.push(data.ticket)
                    setTickets(oldTickets)
                }
            } else {
                console.log("FRESH")
                console.log(data)
                if(!data.message){
                    oldTickets.push(data.ticket)
                    setTickets(oldTickets)
                }

            }

        }
    })
    // console.log("==TICKETS==",tickets)
    const sendToWidget = (id, sec, row, seats, title, message) => {
        const buttonMessage = JSON.stringify({sec, row, seats, title, message})
        const oldTickets = JSON.parse(JSON.stringify(tickets));
        if (oldTickets.length > 0) {
            oldTickets.forEach(ticket => {
                if(ticket.title ? ticket.title.toString() === title.toString() : ticket.TITLE.toString() === title.toString()){
                    // console.log(ticket.container.filter(item => ((item.sec === sec) && (item.row === row) && (item.seats === seats))))
                    ticket.container = ticket.container.filter(item => !((item.SEC === sec) && (item.ROW === row) && (item.SEAT === seats)));
                }
            })

            let updatedTickets = oldTickets.filter(ticket => ticket.container.length > 0)
            setTickets(updatedTickets);
        }
        wss.send(buttonMessage);
        // console.log('Button clicked');
    };

    const renderTitle = (title) => (
        <h5>{title}</h5>
    );
    console.log("TICKETS HERE ===> ",tickets)
    return (
        <div className="container mt-5">
            <div className="row mt-4">
                {tickets.length === 0 &&
                    <div className="jumbotron text-center">
                    <h1 className="display-4">No Ticket Available Right Now</h1>
                </div>
                }
                {tickets.map(item => (
                    <Panel header={renderTitle(item.title || item.TITLE)} shaded key={item.title} className="mb-4">
                        <TicketTable title={item.title || item.TITLE} sendToWidget={sendToWidget} wss={wss} data={item.container}/>
                    </Panel>
                ))}

            </div>
        </div>
    );
};

export default Tickets;
