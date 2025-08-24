import Register from "./Register"

function Account() {
    const loggedIn = false;

    return <div className="flex flex-col gap-2 m-4">
        {
            loggedIn ? (
                <>
                    </>
            ) : (
                <>
                    <h1 className="italic text-shadow-sm text-red-600">
                        {"Вы не вошли в аккаунт"}
                    </h1>

                    <Register /> 
                </>
            )
        }
    </div>
}

export default Account
