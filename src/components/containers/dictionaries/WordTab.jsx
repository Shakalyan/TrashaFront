export default function WordTab({word, translation, id, onMouseDownCallback}) {

    return (
        <div className="WordTab" onMouseDown={(event) => onMouseDownCallback(event, id)}>
            <div className="WordTranslationContainer">
                <p className="WordTranslation">{word}</p>
                <p className="WordTranslation">{translation}</p>
            </div>
        </div>
    );

}