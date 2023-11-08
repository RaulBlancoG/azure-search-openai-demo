import { useRef, useState, useEffect } from "react";
import { Checkbox, Panel, DefaultButton, TextField, SpinButton } from "@fluentui/react";
{
    /*import { SparkleFilled } from "@fluentui/react-icons";*/
}
import gb from "./grupo-bimbo-logo.png";
import styles from "../src/pages/chat/Chat.module.css";

//import imagf from "./imagf.png";
import imagf from "../src/pages/chat/imagf.png";

import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { chatApi, Approaches, AskResponse, ChatRequest, ChatTurn } from "./api";
import { Answer, AnswerError, AnswerLoading } from "./components/Answer";
import { QuestionInput } from "./components/QuestionInput";
import { ExampleList } from "./components/Example";
import { UserChatMessage } from "./components/UserChatMessage";
import { AnalysisPanel, AnalysisPanelTabs } from "./components/AnalysisPanel";
import { SettingsButton } from "./components/SettingsButton";
import { ClearChatButton } from "./components/ClearChatButton";

import { AppUser, useAppContext } from "./AppContext";
interface UserAvatarProps {
    user: AppUser;
}

const login = () => {
    const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
    const chatMessageStreamEnd = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" }), [isLoading]);
    const app = useAppContext();
    const user = app.user || { displayName: "", email: "" };
    return (
        <>
            <UnauthenticatedTemplate>
                <div className={styles.container}>
                    <div className={styles.commandsContainer}>
                        <SettingsButton className={styles.commandButton} onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)} />
                    </div>
                    <div className={styles.chatRoot}>
                        <img
                            src={imagf}
                            height="350"
                            style={{
                                marginTop: "-120px",
                                marginLeft: "55px",
                                marginRight: "-360px",
                                borderRadius: "150px",
                                flexDirection: "column",
                                display: "flex"
                            }}
                        />{" "}
                    </div>
                    <div>
                        <div>
                            <button onClick={app.signIn!}> Iniciar Sesion </button>
                        </div>
                    </div>
                </div>
            </UnauthenticatedTemplate>
        </>
    );
};

export default login;
