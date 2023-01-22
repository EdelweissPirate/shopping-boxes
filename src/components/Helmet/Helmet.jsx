function Helmet(props) {
    document.title = 'SUPERAMAZINGMART - ' + props.title

    return (
        <div className="w-fill">{props.children}</div>
    )
}

export default Helmet