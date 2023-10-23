import { Text } from "@fluentui/react";
import { Settings24Regular } from "@fluentui/react-icons";

import styles from "./SettingsButton.module.css";

interface Props {
    className?: string;
    onClick: () => void;
}

export const SettingsButton = ({ className, onClick }: Props) => {
    return (
        <div className={`${styles.container} ${className ?? ""}`} onClick={onClick}>
            <Settings24Regular style={{ color: "black", marginTop: "2vh" }} />
            <Text style={{ color: "white", fontSize: "2vh", marginTop: "2vh" }}>{"Developer settings"}</Text>
        </div>
    );
};
