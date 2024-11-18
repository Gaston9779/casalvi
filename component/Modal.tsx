

const Modal = ( { isOpen, closeModal, title, text,  } ) =>
{
    if ( !isOpen ) return null;  // Non renderizzare nulla se il modal non è aperto

    const handleOver = ( e ) =>
    {
        if ( e.target === e.currentTarget )
        {
            return closeModal()
        }
    }
    return (
        <div onClick={ ( e ) => handleOver( e ) } className="modal-overlay">
            <div className="modal-content">
                <button onClick={ closeModal } className="close-button">
                    X
                </button>
                <h2>{ title }</h2>
                <p>{ text }</p>

            </div>

        </div>
    );
};
export default Modal;