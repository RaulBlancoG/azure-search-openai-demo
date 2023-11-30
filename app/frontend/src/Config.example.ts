// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const config = {
    appId: "84577f1a-cfbb-430f-8b19-627f579c439d",
    authority: "https://login.microsoftonline.com/973ba820-4a58-4246-84bf-170e50b3152a",
    redirectUri: "https://policyai.bimboconnect.com/",
    // https://policyai.bimboconnect.com/
    // http://localhost:5000/ Test URL
    scopes: ["user.read", "mailboxsettings.read", "calendars.readwrite"]
};
// Tenant 973ba820-4a58-4246-84bf-170e50b3152a
export default config;
