

function Header() {
    return (
        <div>
            <header
                style={{
                    width: "100%",
                    height: "120px",
                    backgroundColor: "rgb(46, 55, 70)",
                    color: "white",
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 20px',
                    justifyContent: "center",
                    boxSizing: 'border-box'

                }}
            ><h1
                style={{
                    fontSize: "70px",
                    padding: '20px',
                    fontFamily: "inherit"
                }}
            >CHATIFY</h1>
            </header>
        </div>
    )
}

export default Header