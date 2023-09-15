import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    {
        text: "How can I report any violation on the global policies?",
        value: "How can I report any violation on the global policies?"
    },
    { text: "Puedo rentar un auto cuando viajo?", value: "Puedo rentar un auto cuando viajo?" },
    { text: "Posso receber presentes de um fornecedor?", value: "Posso receber presentes de um fornecedor?" }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
