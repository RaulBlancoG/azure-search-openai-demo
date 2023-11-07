// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";

import ProvideAppContext from "./AppContext";
import ErrorMessage from "./ErrorMessage";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import Calendar from "./Calendar";
import NewEvent from "./NewEvent";
//import "bootstrap/dist/css/bootstrap.css";
import Chat from "./pages/chat/Chat";
import Layout from "./pages/layout/Layout";
import OneShot from "./pages/oneshot/OneShot";
import NoPage from "./pages/NoPage";

// <AppPropsSnippet>
type AppProps = {
    pca: IPublicClientApplication;
};
// </AppPropsSnippet>

export default function App({ pca }: AppProps): JSX.Element {
    return (
        <MsalProvider instance={pca}>
            <ProvideAppContext>
                <Router>
                    <NavBar />
                    <Container>
                        <ErrorMessage />
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Chat />} />
                                <Route path="/one" element={<OneShot />} />
                                <Route path="/no" element={<NoPage />} />
                                <Route path="/cal" element={<Calendar />} />
                                {/**</Route> */}
                            </Route>
                        </Routes>
                    </Container>
                </Router>
            </ProvideAppContext>
        </MsalProvider>
    );
}
