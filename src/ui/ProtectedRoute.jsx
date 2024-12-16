import styled from "styled-components";
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
    height:100vh;
    background-color: var(--color-grey-50);
    display:flex;
    justify-content:center;
    align-items:center;
`

function ProtectedRoute({ children }) {

    const { isAuthenticated, isFetching } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !isFetching) {
            navigate('/login');
        }
    }, [isFetching, isAuthenticated, navigate])

    if (isFetching) {
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        )
    }

    if (isAuthenticated) return children
}

export default ProtectedRoute;
