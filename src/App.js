import { useContext } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import UserContext, { UserProvider } from "./contexts/UserContext";
import { PokemonsProvider } from "./contexts/PokemonsContext";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PokemonList from "./pages/PokemonList";
import Pokemon from "./pages/Pokemon";
import MyPokemons from "./pages/MyPokemons";
import Chat from "./pages/Chat";

export default function App() {
    return (
        <>
            <UserProvider>
                <PokemonsProvider>
                    <Router>
                        <Switch>
                            <UnprotectedRoute path="/login" exact>
                                <Login />
                            </UnprotectedRoute>

                            <UnprotectedRoute path="/sign-up" exact>
                                <SignUp />
                            </UnprotectedRoute>

                            <ProtectedRoute path="/pokemon/:id" exact>
                                <Pokemon />
                            </ProtectedRoute>

                            <ProtectedRoute path="/" exact>
                                <PokemonList />
                            </ProtectedRoute>

                            <ProtectedRoute path="/my-pokemons" exact>
                                <MyPokemons />
                            </ProtectedRoute>

                            <ProtectedRoute path="/chat" exact>
                                <Chat />
                            </ProtectedRoute>
                        </Switch>
                    </Router>
                </PokemonsProvider>
            </UserProvider>
        </>
    );
}

function ProtectedRoute({ redirect = "/login", ...props }) {
    const { token } = useContext(UserContext);

    if (!token) {
        return (
            <Redirect to={redirect} />
        );
    }

    return (
        <Route {...props} />
    );
}

function UnprotectedRoute({ redirect = "/", ...props }) {
    const { token } = useContext(UserContext);

    if (token) {
        return (
            <Redirect to={redirect} />
        );
    }

    return (
        <Route {...props} />
    );
}
