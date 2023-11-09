import React from 'react';
import styles from './App.module.scss';
import InputWithButton from "./components/InputWithButton/InputWithButton";
import SynonymList from "./components/SynonymList/SynonymList";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import NoDataMessage from "./components/NoDataMessage/NoDataMessage";
import FlavorMessage from "./components/FlavorMessage/FlavorMessage";
import Footer from "./components/Footer/Footer"
import { useApp } from "./App.service";

function App({ forceConsistency = false }) {
    const service = useApp()

    return (
        <>
            <main className={styles.App}>
                <h1>THE SYNONYM APP</h1>
                <FlavorMessage dependency={service.wordToDisplay} forceConsistency={forceConsistency}/>
                <InputWithButton
                    buttonText={'Get synonyms'}
                    value={service.wordToCheck}
                    setValue={service.inputHandler}
                    onClick={service.fetchData}
                    placeholder={'enter word to check'}
                    id={'button1'}
                />
                <InputWithButton
                    buttonText={'Set new synonym'}
                    value={service.synonym}
                    setValue={service.synonymInputHandler}
                    onClick={service.sendNewSynonym}
                    placeholder={'enter a synonym'}
                    id={'button2'}
                />
                {
                    service.wordToDisplay
                        ? <SynonymList
                            originalWord={service.wordToDisplay}
                            synonyms={service.data}
                            deleteHandler={service.deleteHandler}
                        />
                        : <NoDataMessage />
                }
                {service.error && <ErrorMessage message={service.error} />}
            </main>
            <Footer />
        </>
    );
}

export default App;
