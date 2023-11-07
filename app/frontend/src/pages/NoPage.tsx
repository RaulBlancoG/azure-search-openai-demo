import { AuthenticatedTemplate } from "@azure/msal-react";
const NoPage = () => {
    return (
        <AuthenticatedTemplate>
            <h1>404</h1>;
        </AuthenticatedTemplate>
    );
};

export default NoPage;
