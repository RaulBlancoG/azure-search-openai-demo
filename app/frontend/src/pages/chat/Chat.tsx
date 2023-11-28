import { useRef, useState, useEffect } from "react";
import { Checkbox, Panel, DefaultButton, TextField, SpinButton } from "@fluentui/react";
{
    /*import { SparkleFilled } from "@fluentui/react-icons";*/
}
import gb from "./grupo-bimbo-logo.png";
import styles from "./Chat.module.css";
import imagf from "./imagf.png";

import { chatApi, Approaches, AskResponse, ChatRequest, ChatTurn } from "../../api";
import { Answer, AnswerError, AnswerLoading } from "../../components/Answer";
import { QuestionInput } from "../../components/QuestionInput";
import { ExampleList } from "../../components/Example";
import { UserChatMessage } from "../../components/UserChatMessage";
import { AnalysisPanel, AnalysisPanelTabs } from "../../components/AnalysisPanel";
import { SettingsButton } from "../../components/SettingsButton";
import { ClearChatButton } from "../../components/ClearChatButton";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { AppUser, useAppContext } from "../../AppContext";

const Chat = () => {
    const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
    const [promptTemplate, setPromptTemplate] = useState<string>("");
    const [retrieveCount, setRetrieveCount] = useState<number>(3);
    const [useSemanticRanker, setUseSemanticRanker] = useState<boolean>(true);
    const [useSemanticCaptions, setUseSemanticCaptions] = useState<boolean>(false);
    const [excludeCategory, setExcludeCategory] = useState<string>("");
    const [useSuggestFollowupQuestions, setUseSuggestFollowupQuestions] = useState<boolean>(false);

    const lastQuestionRef = useRef<string>("");
    const chatMessageStreamEnd = useRef<HTMLDivElement | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>();

    const [activeCitation, setActiveCitation] = useState<string>();
    const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<AnalysisPanelTabs | undefined>(undefined);

    const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
    const [answers, setAnswers] = useState<[user: string, response: AskResponse][]>([]);

    const makeApiRequest = async (question: string) => {
        lastQuestionRef.current = question;

        error && setError(undefined);
        setIsLoading(true);
        setActiveCitation(undefined);
        setActiveAnalysisPanelTab(undefined);

        try {
            const history: ChatTurn[] = answers.map(a => ({ user: a[0], bot: a[1].answer }));
            const request: ChatRequest = {
                history: [...history, { user: question, bot: undefined }],
                approach: Approaches.ReadRetrieveRead,
                overrides: {
                    promptTemplate: promptTemplate.length === 0 ? undefined : promptTemplate,
                    excludeCategory: excludeCategory.length === 0 ? undefined : excludeCategory,
                    top: retrieveCount,
                    semanticRanker: useSemanticRanker,
                    semanticCaptions: useSemanticCaptions,
                    suggestFollowupQuestions: useSuggestFollowupQuestions
                }
            };
            const result = await chatApi(request);
            setAnswers([...answers, [question, result]]);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        lastQuestionRef.current = "";
        error && setError(undefined);
        setActiveCitation(undefined);
        setActiveAnalysisPanelTab(undefined);
        setAnswers([]);
    };

    useEffect(() => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" }), [isLoading]);

    const onPromptTemplateChange = (_ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setPromptTemplate(newValue || "");
    };

    const onRetrieveCountChange = (_ev?: React.SyntheticEvent<HTMLElement, Event>, newValue?: string) => {
        setRetrieveCount(parseInt(newValue || "3"));
    };

    const onUseSemanticRankerChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseSemanticRanker(!!checked);
    };

    const onUseSemanticCaptionsChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseSemanticCaptions(!!checked);
    };

    const onExcludeCategoryChanged = (_ev?: React.FormEvent, newValue?: string) => {
        setExcludeCategory(newValue || "");
    };

    const onUseSuggestFollowupQuestionsChange = (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        setUseSuggestFollowupQuestions(!!checked);
    };

    const onExampleClicked = (example: string) => {
        makeApiRequest(example);
    };

    const onShowCitation = (citation: string, index: number) => {
        if (activeCitation === citation && activeAnalysisPanelTab === AnalysisPanelTabs.CitationTab && selectedAnswer === index) {
            setActiveAnalysisPanelTab(undefined);
        } else {
            setActiveCitation(citation);
            setActiveAnalysisPanelTab(AnalysisPanelTabs.CitationTab);
        }

        setSelectedAnswer(index);
    };

    const onToggleTab = (tab: AnalysisPanelTabs, index: number) => {
        if (activeAnalysisPanelTab === tab && selectedAnswer === index) {
            setActiveAnalysisPanelTab(undefined);
        } else {
            setActiveAnalysisPanelTab(tab);
        }

        setSelectedAnswer(index);
    };
    const app = useAppContext();
    const user = app.user || { displayName: "", email: "" };
    return (
        <>
            <AuthenticatedTemplate>
                <div className={styles.container}>
                    <div className={styles.commandsContainer}>
                        <ClearChatButton className={styles.commandButton} onClick={clearChat} disabled={!lastQuestionRef.current || isLoading} />
                        <SettingsButton className={styles.commandButton} onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)} />
                    </div>
                    <div className={styles.chatRoot}>
                        <img
                            src={imagf}
                            style={{
                                width: "15vw",
                                height: "30vh", // Haz que la altura se ajuste automáticamente
                                marginTop: "-80px",
                                marginLeft: "5%", // Ajusta según tus necesidades
                                marginRight: "-10%", // Ajusta según tus necesidades
                                borderRadius: "50%",
                                position: "absolute"
                            }}
                            alt="Descripción de la imagen"
                        />
                        <div className={styles.chatContainer}>
                            {!lastQuestionRef.current ? (
                                <div className={styles.chatEmptyState}>
                                    {/*  <SparkleFilled fontSize={"120px"} primaryFill={"rgba(115, 118, 225, 1)"} aria-hidden="true" aria-label="Chat logo" />   */}
                                    <img src={gb} alt="Diamond" height="120" />
                                    <h1 className={styles.chatEmptyStateTitle}>Chat with GB AI expert</h1>
                                    <h2 className={styles.chatEmptyStateSubtitle}>Ask any question about the General Global Policies or try an example</h2>
                                    <h3 className={styles.chatContactEmptyStateSubtitle}> Contact <a style={{color:'white'}} href="mailto:internalcontroldepartment@grupobimbo.com">internalcontroldepartment@grupobimbo.com</a> for any additional questions </h3>

                                    <ExampleList onExampleClicked={onExampleClicked} />
                                </div>
                            ) : (
                                <div className={styles.chatMessageStream}>
                                    {answers.map((answer, index) => (
                                        <div key={index}>
                                            <UserChatMessage message={answer[0]} />
                                            <div className={styles.chatMessageGpt}>
                                                <Answer
                                                    key={index}
                                                    answer={answer[1]}
                                                    isSelected={selectedAnswer === index && activeAnalysisPanelTab !== undefined}
                                                    onCitationClicked={c => onShowCitation(c, index)}
                                                    onThoughtProcessClicked={() => onToggleTab(AnalysisPanelTabs.ThoughtProcessTab, index)}
                                                    onSupportingContentClicked={() => onToggleTab(AnalysisPanelTabs.SupportingContentTab, index)}
                                                    onFollowupQuestionClicked={q => makeApiRequest(q)}
                                                    showFollowupQuestions={useSuggestFollowupQuestions && answers.length - 1 === index}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <>
                                            <UserChatMessage message={lastQuestionRef.current} />
                                            <div className={styles.chatMessageGptMinWidth}>
                                                <AnswerLoading />
                                            </div>
                                        </>
                                    )}
                                    {error ? (
                                        <>
                                            <UserChatMessage message={lastQuestionRef.current} />
                                            <div className={styles.chatMessageGptMinWidth}>
                                                <AnswerError error={error.toString()} onRetry={() => makeApiRequest(lastQuestionRef.current)} />
                                            </div>
                                        </>
                                    ) : null}
                                    <div ref={chatMessageStreamEnd} />
                                </div>
                            )}

                            <div className={styles.chatInput}>
                                <QuestionInput
                                    clearOnSend
                                    placeholder="The more exact your word or phrase is, the more you will help me find documents related to your question."
                                    disabled={isLoading}
                                    onSend={question => makeApiRequest(question)}
                                />
                            </div>
                        </div>

                        {answers.length > 0 && activeAnalysisPanelTab && (
                            <AnalysisPanel
                                className={styles.chatAnalysisPanel}
                                activeCitation={activeCitation}
                                onActiveTabChanged={x => onToggleTab(x, selectedAnswer)}
                                citationHeight="810px"
                                answer={answers[selectedAnswer][1]}
                                activeTab={activeAnalysisPanelTab}
                            />
                        )}

                        <Panel
                            headerText="Configure answer generation"
                            isOpen={isConfigPanelOpen}
                            isBlocking={false}
                            onDismiss={() => setIsConfigPanelOpen(false)}
                            closeButtonAriaLabel="Close"
                            onRenderFooterContent={() => <DefaultButton onClick={() => setIsConfigPanelOpen(false)}>Close</DefaultButton>}
                            isFooterAtBottom={true}
                        >
                            <TextField
                                className={styles.chatSettingsSeparator}
                                defaultValue={promptTemplate}
                                label="Override prompt template"
                                multiline
                                autoAdjustHeight
                                onChange={onPromptTemplateChange}
                            />

                            <SpinButton
                                className={styles.chatSettingsSeparator}
                                label="Retrieve this many documents from search:"
                                min={1}
                                max={50}
                                defaultValue={retrieveCount.toString()}
                                onChange={onRetrieveCountChange}
                            />
                            <TextField className={styles.chatSettingsSeparator} label="Exclude category" onChange={onExcludeCategoryChanged} />
                            <Checkbox
                                className={styles.chatSettingsSeparator}
                                checked={useSemanticRanker}
                                label="Use semantic ranker for retrieval"
                                onChange={onUseSemanticRankerChange}
                            />
                            <Checkbox
                                className={styles.chatSettingsSeparator}
                                checked={useSemanticCaptions}
                                label="Use query-contextual summaries instead of whole documents"
                                onChange={onUseSemanticCaptionsChange}
                                disabled={!useSemanticRanker}
                            />
                            <Checkbox
                                className={styles.chatSettingsSeparator}
                                checked={useSuggestFollowupQuestions}
                                label="Suggest follow-up questions"
                                onChange={onUseSuggestFollowupQuestionsChange}
                            />
                        </Panel>
                    </div>
                </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <div className={styles.chatEmptyState}>
                    <img src={gb} alt="Diamond" height="150" />
                    {/**<img src={gb} alt="Diamond" height="20%" width="20%" style={{ marginLeft: "720px", marginTop: "70px" }} /> */}
                    <h1 className={styles.chatEmptyStateTitle}>Chat with GB AI expert</h1>
                    <h2 className={styles.chatEmptyStateSubtitle}>
                        <div>
                            {/* <button onClick={app.signIn!}>
                                <h2 className={styles.chatEmptyStateSubtitle}>
                                    * <img src={mic} height="26" style={{ marginTop: "5px", color: "black" }} />
                                    Sign In
                                </h2>
                            </button> */}
                            <div className={styles.bskcontainer}>
                                <button onClick={app.signIn!} className={styles.loginbutton}>
                                    <object
                                        type="image/svg+xml"
                                        data="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
                                    />
                                    Sign in with Microsoft
                                </button>
                            </div>
                        </div>
                    </h2>
                </div>
            </UnauthenticatedTemplate>
        </>
    );
};

export default Chat;
