function Form(props) {
    const { text, children } = props;
    return (
        <form>
            <h2 className="text-center text-2xl font-semibold">{text}</h2>
            {children}
        </form>
    )
}

export default Form