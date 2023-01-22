import './wrapper.css'

function Wrapper({  children }) {
    return (
        <div className="wrapper">
            <div className="wrapper-inner">
                {children}
            </div>
        </div>
    )
}

export default Wrapper