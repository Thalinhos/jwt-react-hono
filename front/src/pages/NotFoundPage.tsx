import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <div className="flex h-screen">
                <div className="m-auto">
                    <h1>page not found - 404</h1>
                    <p className="text-center"> <Link to='/'> voltar </Link> </p>
                </div>
            </div>
        </>
    )
}