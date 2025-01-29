import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Host_Grotesk } from 'next/font/google';
const hostGrotesk = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );


const Modal = ( { isOpen, closeModal, title, text, children } ) =>
{
    if ( !isOpen ) return null; // Se la modale è chiusa, non renderizzarla

    const handleOver = ( e ) =>
    {
        if ( e.target === e.currentTarget )
        {
            closeModal();
        }
    };

    useEffect( () =>
    {
        if ( isOpen )
        {
            document.body.classList.add( "modal-open" );
        } else
        {
            document.body.classList.remove( "modal-open" );
        }

        return () =>
        {
            document.body.classList.remove( "modal-open" );
        };
    }, [ isOpen ] );

    return ReactDOM.createPortal(
        <div onClick={ handleOver } className="modal-overlay">
            <div className={ hostGrotesk.className }>
                <div className="modal-content">
                    <button onClick={ closeModal } className="close-button">X</button>
                    <h2>{ title }</h2>
                    <p>{ text }</p>
                    { children }
                </div>
            </div>
        </div>,
        document.body // 👈 Questo la monta fuori dal contenitore errato
    );
};

export default Modal;
