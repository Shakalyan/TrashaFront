import React from 'react';

import { useSelector } from 'react-redux';

export default function TranslatorOutput() {
    const translatedWord = useSelector((state) => state.translatedWord);
    return (
        <textarea className="TranslateInput" value={ translatedWord } readOnly="readonly" />
    );
}