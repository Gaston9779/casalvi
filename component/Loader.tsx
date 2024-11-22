const Loader = () =>
{
    return (
        <div className="loading" style={ { width: '100vw', height: '100%', position: 'fixed', zIndex:3, backgroundColor: '#0000004d', display:'flex', justifyContent:'center'  } }>
            <span className="loader"></span>
        </div>
    )
}
export default Loader;