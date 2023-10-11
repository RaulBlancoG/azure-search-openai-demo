import { Text } from "@fluentui/react";
import { Delete24Regular } from "@fluentui/react-icons";

import styles from "./ClearChatButton.module.css";

interface Props {
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}

export const ClearChatButton = ({ className, disabled, onClick }: Props) => {
    return (
        <div className={`${styles.container} ${className ?? ""} ${disabled && styles.disabled}`} onClick={onClick}>
            <Delete24Regular style={{ color: "black", marginTop: "2vh" }}/>
            <Text style={{ color: "white", fontSize: "2vh", marginTop: "2vh" }}>{"Clear chat"}</Text>
        </div>
    );
};
